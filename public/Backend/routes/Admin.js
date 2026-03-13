import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Session from '../models/Session.js';

const router = express.Router();

// Middleware to verify admin
const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Get dashboard stats
router.get('/dashboard', verifyAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);
    
    const activeSessions = await Session.countDocuments({ 
      isActive: true,
      lastActivity: { $gt: new Date(Date.now() - 30 * 60000) } // Last 30 minutes
    });
    
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('userId', 'name email');
    
    const popularProducts = await Product.find()
      .sort({ sold: -1 })
      .limit(10);

    res.json({
      stats: {
        totalUsers,
        totalOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
        activeSessions
      },
      recentOrders,
      popularProducts
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all users with activity
router.get('/users', verifyAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    
    // Get active sessions for each user
    const usersWithActivity = await Promise.all(users.map(async (user) => {
      const activeSession = await Session.findOne({ 
        userId: user._id, 
        isActive: true 
      });
      
      return {
        ...user.toObject(),
        isOnline: !!activeSession,
        lastActive: activeSession?.lastActivity || user.lastLogin
      };
    }));
    
    res.json(usersWithActivity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all orders
router.get('/orders', verifyAdmin, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    
    const query = status ? { orderStatus: status } : {};
    
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('userId', 'name email');
    
    const total = await Order.countDocuments(query);
    
    res.json({
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update order status
router.put('/orders/:id', verifyAdmin, async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;
    
    const updateData = { updatedAt: Date.now() };
    if (orderStatus) updateData.orderStatus = orderStatus;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;
    if (orderStatus === 'delivered') updateData.deliveredAt = Date.now();
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get analytics data
router.get('/analytics', verifyAdmin, async (req, res) => {
  try {
    const { period = 'week' } = req.query;
    
    let dateFilter;
    const now = new Date();
    
    if (period === 'week') {
      dateFilter = new Date(now.setDate(now.getDate() - 7));
    } else if (period === 'month') {
      dateFilter = new Date(now.setMonth(now.getMonth() - 1));
    } else if (period === 'year') {
      dateFilter = new Date(now.setFullYear(now.getFullYear() - 1));
    }
    
    // Sales by day
    const salesByDay = await Order.aggregate([
      { $match: { createdAt: { $gt: dateFilter }, paymentStatus: 'completed' } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          total: { $sum: '$total' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    // Popular categories
    const popularCategories = await Order.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.category',
          count: { $sum: '$items.quantity' },
          revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    
    // User growth
    const userGrowth = await User.aggregate([
      { $match: { createdAt: { $gt: dateFilter } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    res.json({
      salesByDay,
      popularCategories,
      userGrowth
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;