import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Users,
  ShoppingBag,
  DollarSign,
  Activity,
  TrendingUp,
  LogOut,
  Menu,
  Package,
  UserCircle,
  Settings,
  Eye,
  Clock,
  AlertCircle,
  Filter,
  Search,
  X,
  ChevronRight
} from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    activeUsers: 0,
    totalProducts: 0,
    lowStockCount: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/admin/login');
        return;
      }

      const res = await axios.get('http://localhost:5000/api/admin/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setStats(res.data.stats);
      setRecentOrders(res.data.recentOrders || []);
      setPopularProducts(res.data.popularProducts || []);
      setLowStockProducts(res.data.lowStockProducts || []);
      setError('');
    } catch (error) {
      console.error('Error fetching dashboard:', error);
      setError('Failed to load dashboard data');
      if (error.response?.status === 403 || error.response?.status === 401) {
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const viewOrderDetails = async (order) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/admin/orders/${order._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSelectedOrder(res.data);
      setShowOrderModal(true);
    } catch (error) {
      console.error('Error fetching order details:', error);
      alert('Failed to load order details');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg ${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300`}>
        <div className="p-4 flex justify-between items-center border-b">
          {sidebarOpen ? (
            <h1 className="text-xl font-bold text-blue-600">MK Admin</h1>
          ) : (
            <h1 className="text-xl font-bold text-blue-600 mx-auto">M</h1>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 hover:bg-gray-100 rounded">
            <Menu size={20} />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <button 
                className={`w-full flex items-center gap-3 p-3 rounded-lg bg-blue-50 text-blue-600 ${sidebarOpen ? '' : 'justify-center'}`}
              >
                <Activity size={20} />
                {sidebarOpen && <span>Dashboard</span>}
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigate('/admin/products')}
                className={`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 ${sidebarOpen ? '' : 'justify-center'}`}
              >
                <Package size={20} />
                {sidebarOpen && <span>Products</span>}
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigate('/admin/orders')}
                className={`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 ${sidebarOpen ? '' : 'justify-center'}`}
              >
                <ShoppingBag size={20} />
                {sidebarOpen && <span>Orders</span>}
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigate('/admin/users')}
                className={`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 ${sidebarOpen ? '' : 'justify-center'}`}
              >
                <Users size={20} />
                {sidebarOpen && <span>Users</span>}
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigate('/admin/settings')}
                className={`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 ${sidebarOpen ? '' : 'justify-center'}`}
              >
                <Settings size={20} />
                {sidebarOpen && <span>Settings</span>}
              </button>
            </li>
          </ul>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 text-red-600 ${sidebarOpen ? '' : 'justify-center'}`}
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Dashboard Overview
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <UserCircle size={32} className="text-gray-600" />
              <div className="text-sm">
                <p className="font-medium">Admin User</p>
                <p className="text-gray-500">Administrator</p>
              </div>
            </div>
          </div>
        </header>

        {/* Error Message */}
        {error && (
          <div className="p-6">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Users</p>
                  <p className="text-3xl font-bold mt-1">{stats.totalUsers}</p>
                  <p className="text-green-500 text-sm mt-2 flex items-center gap-1">
                    <TrendingUp size={16} /> Active: {stats.activeUsers}
                  </p>
                </div>
                <div className="bg-blue-100 p-4 rounded-full">
                  <Users className="text-blue-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Orders</p>
                  <p className="text-3xl font-bold mt-1">{stats.totalOrders}</p>
                </div>
                <div className="bg-green-100 p-4 rounded-full">
                  <ShoppingBag className="text-green-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Revenue</p>
                  <p className="text-3xl font-bold mt-1">${stats.totalRevenue.toFixed(2)}</p>
                </div>
                <div className="bg-purple-100 p-4 rounded-full">
                  <DollarSign className="text-purple-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Products</p>
                  <p className="text-3xl font-bold mt-1">{stats.totalProducts || 0}</p>
                  {stats.lowStockCount > 0 && (
                    <p className="text-red-500 text-sm mt-2">
                      {stats.lowStockCount} low stock
                    </p>
                  )}
                </div>
                <div className="bg-orange-100 p-4 rounded-full">
                  <Package className="text-orange-600" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Low Stock Alert */}
          {lowStockProducts.length > 0 && (
            <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="text-yellow-600" size={24} />
                <div className="flex-1">
                  <h3 className="font-semibold text-yellow-800">Low Stock Alert</h3>
                  <p className="text-yellow-700">
                    {lowStockProducts.length} products are running low on stock
                  </p>
                </div>
                <button
                  onClick={() => navigate('/admin/products')}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                  View Products
                </button>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <button
              onClick={() => navigate('/admin/products')}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Package className="text-blue-600" size={20} />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Manage Products</p>
                  <p className="text-sm text-gray-500">Add, edit, or remove products</p>
                </div>
              </div>
              <ChevronRight className="text-gray-400 group-hover:text-blue-600 transition" size={20} />
            </button>

            <button
              onClick={() => navigate('/admin/orders')}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-3 rounded-full">
                  <ShoppingBag className="text-green-600" size={20} />
                </div>
                <div className="text-left">
                  <p className="font-semibold">View Orders</p>
                  <p className="text-sm text-gray-500">Track and manage orders</p>
                </div>
              </div>
              <ChevronRight className="text-gray-400 group-hover:text-green-600 transition" size={20} />
            </button>

            <button
              onClick={() => navigate('/admin/users')}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Users className="text-purple-600" size={20} />
                </div>
                <div className="text-left">
                  <p className="font-semibold">User Management</p>
                  <p className="text-sm text-gray-500">View and manage users</p>
                </div>
              </div>
              <ChevronRight className="text-gray-400 group-hover:text-purple-600 transition" size={20} />
            </button>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Recent Orders</h3>
              <button 
                onClick={() => navigate('/admin/orders')}
                className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
              >
                View All <ChevronRight size={16} />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentOrders.length > 0 ? (
                    recentOrders.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{order.orderId}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{order.userId?.name || order.userName}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">${order.total?.toFixed(2)}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.orderStatus)}`}>
                            {order.orderStatus}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => viewOrderDetails(order)}
                            className="text-blue-500 hover:text-blue-700 p-1 hover:bg-blue-50 rounded"
                            title="View Details"
                          >
                            <Eye size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                        No recent orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Popular Products */}
          {popularProducts.length > 0 && (
            <div className="mt-6 bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Popular Products</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {popularProducts.map((product) => (
                  <div 
                    key={product._id} 
                    className="border rounded-lg p-3 hover:shadow-lg transition cursor-pointer"
                    onClick={() => navigate('/admin/products')}
                  >
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-32 object-cover rounded"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                      }}
                    />
                    <h4 className="font-medium mt-2 truncate">{product.title}</h4>
                    <p className="text-gray-600 text-sm">${product.price}</p>
                    <p className="text-green-600 text-sm mt-1">
                      Sold: {product.totalSold}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Order Details - {selectedOrder.orderId}</h3>
              <button onClick={() => setShowOrderModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Customer Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Customer Information</h4>
                <p><span className="text-gray-600">Name:</span> {selectedOrder.userName}</p>
                <p><span className="text-gray-600">Email:</span> {selectedOrder.userEmail}</p>
                {selectedOrder.shippingAddress?.phone && (
                  <p><span className="text-gray-600">Phone:</span> {selectedOrder.shippingAddress.phone}</p>
                )}
              </div>

              {/* Shipping Address */}
              {selectedOrder.shippingAddress && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Shipping Address</h4>
                  <p>{selectedOrder.shippingAddress.fullName}</p>
                  <p>{selectedOrder.shippingAddress.address}</p>
                  <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.zipCode}</p>
                </div>
              )}

              {/* Order Items */}
              <div>
                <h4 className="font-semibold mb-2">Order Items</h4>
                <div className="space-y-2">
                  {selectedOrder.items?.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 border-b pb-2">
                      <img src={item.image} alt={item.productTitle} className="w-12 h-12 object-cover rounded" />
                      <div className="flex-1">
                        <p className="font-medium">{item.productTitle}</p>
                        <p className="text-sm text-gray-600">${item.price} × {item.quantity}</p>
                      </div>
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Order Summary</h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${selectedOrder.subtotal?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>${selectedOrder.shipping?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>${selectedOrder.tax?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t">
                    <span>Total:</span>
                    <span className="text-green-600">${selectedOrder.total?.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Payment Information</h4>
                <p><span className="text-gray-600">Method:</span> {selectedOrder.paymentMethod}</p>
                <p><span className="text-gray-600">Status:</span> 
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                    selectedOrder.paymentStatus === 'completed' ? 'bg-green-100 text-green-800' :
                    selectedOrder.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {selectedOrder.paymentStatus}
                  </span>
                </p>
                {selectedOrder.cardDetails && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Card: **** **** **** {selectedOrder.cardDetails.cardNumber}</p>
                    <p className="text-sm text-gray-600">Holder: {selectedOrder.cardDetails.cardHolderName}</p>
                  </div>
                )}
                {selectedOrder.bankDetails && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Bank: {selectedOrder.bankDetails.bankName}</p>
                    <p className="text-sm text-gray-600">Account: **** {selectedOrder.bankDetails.accountNumber}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;