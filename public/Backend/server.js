import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Order from './models/Order.js';
import Session from './models/Session.js';
import Cart from './models/Cart.js';
import Product from './models/Product.js';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

// Import User model
import User from './models/User.js';

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// MongoDB connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

// Test route
app.get('/api/users/test', (req, res) => {
  res.json({ message: '✅ Server is working!' });
});

// ==================== AUTH ROUTES ====================

// Login route
app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('📝 Login attempt for:', email);

    // Find user
    const user = await User.findOne({ email }).lean();
    
    if (!user) {
      console.log('❌ User not found');
      return res.status(400).json({ message: "User not found" });
    }

    console.log('✅ User found in DB:', { 
      email: user.email, 
      role: user.role || 'not set',
      hasRole: !!user.role 
    });

    // Verify password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // FORCE admin role for your email
    let userRole = user.role || 'user';
    if (email === 'muneeb3157@gmail.com') {
      userRole = 'admin';
      console.log('🔴 FORCING ADMIN ROLE FOR YOUR EMAIL');
    }

    console.log('✅ Final role being used:', userRole);

    const token = jwt.sign(
      { id: user._id, email: user.email, role: userRole },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Track login session
    try {
      await Session.create({
        userId: user._id,
        token,
        ipAddress: req.ip || req.connection.remoteAddress,
        userAgent: req.headers['user-agent'],
        loginTime: new Date(),
        lastActivity: new Date(),
        isActive: true
      });
      console.log('✅ Session tracked');
    } catch (e) {
      console.error('Failed to track login:', e);
    }

    const responseData = {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: userRole
      }
    };

    console.log('📤 Sending response with role:', userRole);
    res.json(responseData);

  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ message: err.message });
  }
});

// Signup route
app.post('/api/users/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log('📝 Signup attempt:', email);
    
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    
    // Create user with role
    const user = await User.create({
      name,
      email,
      password: hashed,
      role: 'user',
      isActive: true
    });

    console.log('✅ New user created:', { email: user.email, role: user.role });

    res.status(201).json({ 
      message: "User created successfully",
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('❌ Signup error:', err);
    res.status(500).json({ message: err.message });
  }
});

// ==================== ADMIN DASHBOARD ROUTES ====================

// Get dashboard stats
app.get('/api/admin/dashboard', async (req, res) => {
  try {
    // Get total users
    const totalUsers = await User.countDocuments();
    
    // Get total orders
    const totalOrders = await Order.countDocuments();
    
    // Get total revenue
    const revenueResult = await Order.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);
    const totalRevenue = revenueResult[0]?.total || 0;
    
    // Get active users (last 30 minutes)
    const thirtyMinsAgo = new Date(Date.now() - 30 * 60 * 1000);
    const activeUsers = await Session.countDocuments({
      isActive: true,
      lastActivity: { $gt: thirtyMinsAgo }
    });
    
    // Get recent orders
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('userId', 'name email');
    
    // Get popular products
    const popularProducts = await Order.aggregate([
      { $unwind: '$items' },
      { $group: {
          _id: '$items.productId',
          title: { $first: '$items.productTitle' },
          image: { $first: '$items.image' },
          price: { $first: '$items.price' },
          totalSold: { $sum: '$items.quantity' }
      }},
      { $sort: { totalSold: -1 } },
      { $limit: 10 }
    ]);
    
    // Get low stock products
    const lowStockProducts = await Product.find({ stock: { $lt: 10 } }).limit(5);
    
    res.json({
      stats: {
        totalUsers,
        totalOrders,
        totalRevenue,
        activeUsers,
        totalProducts: await Product.countDocuments(),
        lowStockCount: lowStockProducts.length
      },
      recentOrders,
      popularProducts,
      lowStockProducts
    });
    
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get all users with activity
app.get('/api/admin/users', async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    
    const thirtyMinsAgo = new Date(Date.now() - 30 * 60 * 1000);
    
    // Get active sessions
    const activeSessions = await Session.find({
      isActive: true,
      lastActivity: { $gt: thirtyMinsAgo }
    });
    
    const activeUserIds = activeSessions.map(s => s.userId.toString());
    
    // Get user stats
    const usersWithStats = await Promise.all(users.map(async (user) => {
      const orderCount = await Order.countDocuments({ userId: user._id });
      const totalSpent = await Order.aggregate([
        { $match: { userId: user._id, paymentStatus: 'completed' } },
        { $group: { _id: null, total: { $sum: '$total' } } }
      ]);
      
      const cart = await Cart.findOne({ userId: user._id });
      const lastSession = await Session.findOne({ userId: user._id }).sort({ loginTime: -1 });
      
      return {
        ...user.toObject(),
        isOnline: activeUserIds.includes(user._id.toString()),
        orderCount,
        totalSpent: totalSpent[0]?.total || 0,
        cartItems: cart?.items?.length || 0,
        lastLogin: lastSession?.loginTime || user.lastLogin
      };
    }));
    
    res.json(usersWithStats);
    
  } catch (error) {
    console.error('Users error:', error);
    res.status(500).json({ message: error.message });
  }
});

// ==================== USER MANAGEMENT ROUTES ====================

// Get single user details
app.get('/api/admin/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Get user's orders with full details
    const orders = await Order.find({ userId: user._id })
      .sort({ createdAt: -1 })
      .select('+cardDetails +bankDetails'); // Include payment details
    
    // Get user's cart
    const cart = await Cart.findOne({ userId: user._id });
    
    // Get user's sessions
    const sessions = await Session.find({ userId: user._id })
      .sort({ loginTime: -1 })
      .limit(10);
    
    // Mask sensitive data
    const maskedOrders = orders.map(order => ({
      ...order.toObject(),
      cardDetails: order.cardDetails ? {
        cardHolderName: order.cardDetails.cardHolderName,
        cardNumber: order.cardDetails.cardNumber ? '****' + order.cardDetails.cardNumber.slice(-4) : '****',
        expiryDate: order.cardDetails.expiryDate
      } : null,
      bankDetails: order.bankDetails ? {
        bankName: order.bankDetails.bankName,
        accountNumber: order.bankDetails.accountNumber ? '****' + order.bankDetails.accountNumber.slice(-4) : '****',
        routingNumber: order.bankDetails.routingNumber ? '****' + order.bankDetails.routingNumber.slice(-4) : '****'
      } : null
    }));
    
    res.json({
      user,
      stats: {
        totalOrders: orders.length,
        totalSpent: orders.reduce((sum, order) => sum + (order.total || 0), 0),
        cartItems: cart?.items?.length || 0,
        lastLogin: sessions[0]?.loginTime || null
      },
      orders: maskedOrders,
      cart,
      sessions
    });
    
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update user
app.put('/api/admin/users/:id', async (req, res) => {
  try {
    const { name, email, role, phone, address, isActive } = req.body;
    
    // Check if email is already taken by another user
    if (email) {
      const existingUser = await User.findOne({ 
        email, 
        _id: { $ne: req.params.id } 
      });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }
    
    const updateData = {
      ...(name && { name }),
      ...(email && { email }),
      ...(role && { role }),
      ...(phone && { phone }),
      ...(address && { address }),
      ...(isActive !== undefined && { isActive })
    };
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json({ 
      message: "User updated successfully", 
      user 
    });
    
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Delete user
app.delete('/api/admin/users/:id', async (req, res) => {
  try {
    // Delete user
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Delete related data
    await Order.deleteMany({ userId: user._id });
    await Cart.deleteMany({ userId: user._id });
    await Session.deleteMany({ userId: user._id });
    
    res.json({ 
      message: "User and all related data deleted successfully" 
    });
    
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Reset user password (admin only)
app.post('/api/admin/users/:id/reset-password', async (req, res) => {
  try {
    const { newPassword } = req.body;
    
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { password: hashedPassword },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Invalidate all sessions for this user
    await Session.updateMany(
      { userId: user._id, isActive: true },
      { isActive: false, logoutTime: new Date() }
    );
    
    res.json({ 
      message: "Password reset successfully. User will need to login again." 
    });
    
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Toggle user active status
app.patch('/api/admin/users/:id/toggle-status', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    user.isActive = !user.isActive;
    await user.save();
    
    // If deactivating, end all sessions
    if (!user.isActive) {
      await Session.updateMany(
        { userId: user._id, isActive: true },
        { isActive: false, logoutTime: new Date() }
      );
    }
    
    res.json({ 
      message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
      isActive: user.isActive 
    });
    
  } catch (error) {
    console.error('Toggle status error:', error);
    res.status(500).json({ message: error.message });
  }
});

// ==================== ORDER MANAGEMENT ROUTES ====================

// Get all orders
app.get('/api/admin/orders', async (req, res) => {
  try {
    const { status, page = 1, limit = 20, search } = req.query;
    
    const query = {};
    if (status && status !== 'all') {
      query.orderStatus = status;
    }
    
    if (search) {
      query.$or = [
        { orderId: { $regex: search, $options: 'i' } },
        { userEmail: { $regex: search, $options: 'i' } },
        { userName: { $regex: search, $options: 'i' } }
      ];
    }
    
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .populate('userId', 'name email phone');
    
    const total = await Order.countDocuments(query);
    
    // Mask sensitive data
    const maskedOrders = orders.map(order => ({
      ...order.toObject(),
      cardDetails: order.cardDetails ? {
        cardHolderName: order.cardDetails.cardHolderName,
        cardNumber: order.cardDetails.cardNumber ? '****' + order.cardDetails.cardNumber.slice(-4) : '****',
        expiryDate: order.cardDetails.expiryDate
      } : null,
      bankDetails: order.bankDetails ? {
        bankName: order.bankDetails.bankName,
        accountNumber: order.bankDetails.accountNumber ? '****' + order.bankDetails.accountNumber.slice(-4) : '****',
        routingNumber: order.bankDetails.routingNumber ? '****' + order.bankDetails.routingNumber.slice(-4) : '****'
      } : null
    }));
    
    res.json({
      orders: maskedOrders,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });
    
  } catch (error) {
    console.error('Orders error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get single order details
app.get('/api/admin/orders/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('userId', 'name email phone address')
      .select('+cardDetails +bankDetails');
    
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    // Mask sensitive data
    const maskedOrder = {
      ...order.toObject(),
      cardDetails: order.cardDetails ? {
        cardHolderName: order.cardDetails.cardHolderName,
        cardNumber: order.cardDetails.cardNumber ? '****' + order.cardDetails.cardNumber.slice(-4) : '****',
        expiryDate: order.cardDetails.expiryDate
      } : null,
      bankDetails: order.bankDetails ? {
        bankName: order.bankDetails.bankName,
        accountNumber: order.bankDetails.accountNumber ? '****' + order.bankDetails.accountNumber.slice(-4) : '****',
        routingNumber: order.bankDetails.routingNumber ? '****' + order.bankDetails.routingNumber.slice(-4) : '****'
      } : null
    };
    
    res.json(maskedOrder);
    
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update order status
app.put('/api/admin/orders/:id', async (req, res) => {
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
    console.error('Update order error:', error);
    res.status(500).json({ message: error.message });
  }
});

// ==================== PRODUCT ROUTES ====================

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    if (category) {
      query.category = category;
    }
    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get single product
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ id: parseInt(req.params.id) });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Create product (admin only)
app.post('/api/admin/products', async (req, res) => {
  try {
    const productData = req.body;
    
    // Get the highest product id
    const lastProduct = await Product.findOne().sort({ id: -1 });
    const newId = lastProduct ? lastProduct.id + 1 : 46;
    
    const product = await Product.create({
      ...productData,
      id: newId,
      sold: 0,
      rating: 0
    });
    
    res.status(201).json({ 
      message: "Product created successfully", 
      product 
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update product (admin only)
app.put('/api/admin/products/:id', async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    res.json({ 
      message: "Product updated successfully", 
      product 
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Delete product (admin only)
app.delete('/api/admin/products/:id', async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ id: parseInt(req.params.id) });
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    res.json({ 
      message: "Product deleted successfully" 
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Bulk update stock (admin only)
app.put('/api/admin/products/stock/bulk', async (req, res) => {
  try {
    const { updates } = req.body; // [{ id: 1, stock: 50 }]
    
    const operations = updates.map(update => ({
      updateOne: {
        filter: { id: update.id },
        update: { $set: { stock: update.stock } }
      }
    }));
    
    await Product.bulkWrite(operations);
    
    res.json({ 
      message: "Stock updated successfully" 
    });
  } catch (error) {
    console.error('Bulk update error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Initialize products from your existing data (run once)
app.post('/api/admin/init-products', async (req, res) => {
  try {
    const productsData = [
      /* HOME */
      { id:1, category:"home", title:"Modern Table Lamp", price:19.99, img:"https://images.pexels.com/photos/963486/pexels-photo-963486.jpeg", stock:50, sold:0 },
      { id:2, category:"home", title:"Comfort Armchair", price:39.99, img:"https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg", stock:30, sold:0 },
      { id:3, category:"home", title:"Wood Coffee Table", price:59.99, img:"https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg", stock:25, sold:0 },
      { id:4, category:"home", title:"Luxury Sofa", price:99.99, img:"https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg", stock:15, sold:0 },
      { id:5, category:"home", title:"Wall Clock", price:14.99, img:"https://images.pexels.com/photos/2528118/pexels-photo-2528118.jpeg", stock:100, sold:0 },
      
      /* FASHION */
      { id:6, category:"fashion", title:"Men Stylish T-Shirt", price:29.99, img:"https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg", stock:200, sold:0 },
      { id:7, category:"fashion", title:"Women Red Dress", price:49.99, img:"https://images.pexels.com/photos/794062/pexels-photo-794062.jpeg", stock:75, sold:0 },
      { id:8, category:"fashion", title:"Winter Jacket", price:79.99, img:"https://images.pexels.com/photos/52518/jeans-pants-blue-shop-52518.jpeg", stock:40, sold:0 },
      { id:9, category:"fashion", title:"Blue Jeans", price:59.99, img:"https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg", stock:150, sold:0 },
      { id:10, category:"fashion", title:"Stylish Hoodie", price:39.99, img:"https://images.pexels.com/photos/983497/pexels-photo-983497.jpeg", stock:120, sold:0 },
      
      /* ELECTRONICS */
      { id:11, category:"electronics", title:"Wireless Headphones", price:99.99, img:"https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg", stock:60, sold:0 },
      { id:12, category:"electronics", title:"Gaming Laptop", price:899.99, img:"https://images.pexels.com/photos/18105/pexels-photo.jpg", stock:10, sold:0 },
      { id:13, category:"electronics", title:"Smart Watch", price:199.99, img:"https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg", stock:45, sold:0 },
      { id:14, category:"electronics", title:"Mechanical Keyboard", price:49.99, img:"https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg", stock:80, sold:0 },
      { id:15, category:"electronics", title:"Gaming Mouse", price:29.99, img:"https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg", stock:120, sold:0 },
      
      /* BAGS */
      { id:16, category:"bags", title:"Leather Handbag", price:59.99, img:"https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg", stock:35, sold:0 },
      { id:17, category:"bags", title:"Travel Backpack", price:49.99, img:"https://images.pexels.com/photos/2563680/pexels-photo-2563680.jpeg", stock:55, sold:0 },
      { id:18, category:"bags", title:"Laptop Bag", price:39.99, img:"https://images.pexels.com/photos/39439/herschel-bag-backpack-campus-39439.jpeg", stock:40, sold:0 },
      { id:19, category:"bags", title:"Mini Purse", price:29.99, img:"https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg", stock:100, sold:0 },
      { id:20, category:"bags", title:"Shoulder Bag", price:44.99, img:"https://images.pexels.com/photos/1599005/pexels-photo-1599005.jpeg", stock:65, sold:0 },
      
      /* FOOTWEAR */
      { id:21, category:"footwear", title:"Running Sneakers", price:69.99, img:"https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg", stock:85, sold:0 },
      { id:22, category:"footwear", title:"Classic Leather Shoes", price:79.99, img:"https://images.pexels.com/photos/267301/pexels-photo-267301.jpeg", stock:45, sold:0 },
      { id:23, category:"footwear", title:"Comfort Sandals", price:39.99, img:"https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg", stock:70, sold:0 },
      { id:24, category:"footwear", title:"Sports Shoes", price:59.99, img:"https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg", stock:60, sold:0 },
      { id:25, category:"footwear", title:"Casual Sneakers", price:49.99, img:"https://images.pexels.com/photos/1032110/pexels-photo-1032110.jpeg", stock:90, sold:0 },
      
      /* GROCERIES */
      { id:26, category:"groceries", title:"Fresh Vegetables", price:9.99, img:"https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg", stock:500, sold:0 },
      { id:27, category:"groceries", title:"Organic Fruits", price:12.99, img:"https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg", stock:400, sold:0 },
      { id:28, category:"groceries", title:"Healthy Snacks", price:6.99, img:"https://images.pexels.com/photos/41118/pexels-photo-41118.jpeg", stock:300, sold:0 },
      { id:29, category:"groceries", title:"Fresh Bread", price:4.99, img:"https://images.pexels.com/photos/461060/pexels-photo-461060.jpeg", stock:200, sold:0 },
      { id:30, category:"groceries", title:"Fruit Juices", price:7.99, img:"https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg", stock:250, sold:0 },
      
      /* BEAUTY */
      { id:31, category:"beauty", title:"Lipstick Set", price:19.99, img:"https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg", stock:150, sold:0 },
      { id:32, category:"beauty", title:"Face Makeup Kit", price:29.99, img:"https://images.pexels.com/photos/2633986/pexels-photo-2633986.jpeg", stock:80, sold:0 },
      { id:33, category:"beauty", title:"Luxury Perfume", price:49.99, img:"https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg", stock:45, sold:0 },
      { id:34, category:"beauty", title:"Skin Care Cream", price:24.99, img:"https://images.pexels.com/photos/3735657/pexels-photo-3735657.jpeg", stock:120, sold:0 },
      { id:35, category:"beauty", title:"Makeup Brushes", price:14.99, img:"https://images.pexels.com/photos/2533265/pexels-photo-2533265.jpeg", stock:200, sold:0 },
      
      /* WELLNESS */
      { id:36, category:"wellness", title:"Yoga Mat", price:25.99, img:"https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg", stock:60, sold:0 },
      { id:37, category:"wellness", title:"Dumbbells Set", price:35.99, img:"https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg", stock:40, sold:0 },
      { id:38, category:"wellness", title:"Fitness Tracker", price:59.99, img:"https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg", stock:55, sold:0 },
      { id:39, category:"wellness", title:"Protein Powder", price:39.99, img:"https://images.pexels.com/photos/3837787/pexels-photo-3837787.jpeg", stock:100, sold:0 },
      { id:40, category:"wellness", title:"Massage Roller", price:19.99, img:"https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg", stock:80, sold:0 },
      
      /* JEWELRY */
      { id:41, category:"jewelry", title:"Gold Necklace", price:129.99, img:"https://images.pexels.com/photos/1377023/pexels-photo-1377023.jpeg", stock:25, sold:0 },
      { id:42, category:"jewelry", title:"Diamond Ring", price:199.99, img:"https://images.pexels.com/photos/248077/pexels-photo-248077.jpeg", stock:15, sold:0 },
      { id:43, category:"jewelry", title:"Silver Bracelet", price:59.99, img:"https://images.pexels.com/photos/364976/pexels-photo-364976.jpeg", stock:40, sold:0 },
      { id:44, category:"jewelry", title:"Luxury Earrings", price:79.99, img:"https://images.pexels.com/photos/785696/pexels-photo-785696.jpeg", stock:35, sold:0 },
      { id:45, category:"jewelry", title:"Pearl Necklace", price:99.99, img:"https://images.pexels.com/photos/364976/pexels-photo-364976.jpeg", stock:20, sold:0 },
    ];
    
    // Clear existing products
    await Product.deleteMany({});
    
    // Insert new products
    await Product.insertMany(productsData);
    
    res.json({ 
      message: "Products initialized successfully", 
      count: productsData.length 
    });
  } catch (error) {
    console.error('Init products error:', error);
    res.status(500).json({ message: error.message });
  }
});

// ==================== TRACKING ROUTES ====================

// Track user logout
app.post('/api/track/logout', async (req, res) => {
  try {
    const { userId } = req.body;
    
    await Session.updateMany(
      { userId, isActive: true },
      { 
        isActive: false, 
        logoutTime: new Date() 
      }
    );
    
    res.json({ success: true });
    
  } catch (error) {
    console.error('Track logout error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Track cart activity
app.post('/api/track/cart', async (req, res) => {
  try {
    const { userId, items } = req.body;
    
    await Cart.findOneAndUpdate(
      { userId },
      { 
        items, 
        updatedAt: new Date() 
      },
      { upsert: true }
    );
    
    res.json({ success: true });
    
  } catch (error) {
    console.error('Track cart error:', error);
    res.status(500).json({ message: error.message });
  }
});
// Create order// Create order
app.post('/api/orders/create', async (req, res) => {
  try {
    const orderData = req.body;
    console.log('📦 Creating order with data:', JSON.stringify(orderData, null, 2));
    
    // Generate orderId here instead of in the model
    const orderId = 'ORD' + Date.now();
    
    // Create new order with generated orderId
    const order = new Order({
      ...orderData,
      orderId: orderId
    });
    
    // Save to database
    await order.save();
    
    console.log('✅ Order saved successfully with ID:', order.orderId);
    
    res.json({ 
      success: true, 
      orderId: order.orderId 
    });
  } catch (error) {
    console.error('❌ Create order error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));