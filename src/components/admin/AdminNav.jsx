import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  Package,           // 👈 Added for Products
  Settings, 
  LogOut 
} from 'lucide-react';

const AdminNav = () => {
  const navigate = useNavigate();
  
  // Get current user for displaying name
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link to="/admin/dashboard" className="text-xl font-bold text-blue-600">
              MK Admin
            </Link>
            
            <div className="hidden md:flex space-x-1">
              <Link 
                to="/admin/dashboard" 
                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
              
              <Link 
                to="/admin/users" 
                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
              >
                <Users size={18} />
                Users
              </Link>
              
              <Link 
                to="/admin/products"    // 👈 Added Products link
                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
              >
                <Package size={18} />
                Products
              </Link>
              
              <Link 
                to="/admin/orders" 
                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
              >
                <ShoppingBag size={18} />
                Orders
              </Link>
              
              <Link 
                to="/admin/settings" 
                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
              >
                <Settings size={18} />
                Settings
              </Link>
            </div>
          </div>

          {/* Admin User Info & Logout */}
          <div className="flex items-center gap-4">
            {user && (
              <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-700">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
              </div>
            )}
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
              title="Logout"
            >
              <LogOut size={18} />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation (for small screens) */}
        <div className="md:hidden flex overflow-x-auto py-2 space-x-2">
          <Link 
            to="/admin/dashboard" 
            className="flex items-center gap-1 px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg whitespace-nowrap"
          >
            <LayoutDashboard size={16} />
            Dashboard
          </Link>
          
          <Link 
            to="/admin/users" 
            className="flex items-center gap-1 px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg whitespace-nowrap"
          >
            <Users size={16} />
            Users
          </Link>
          
          <Link 
            to="/admin/AdminProducts"    // 👈 Added Products for mobile too
            className="flex items-center gap-1 px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg whitespace-nowrap"
          >
            <Package size={16} />
            Products
          </Link>
          
          <Link 
            to="/admin/orders" 
            className="flex items-center gap-1 px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg whitespace-nowrap"
          >
            <ShoppingBag size={16} />
            Orders
          </Link>
          
          <Link 
            to="/admin/settings" 
            className="flex items-center gap-1 px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg whitespace-nowrap"
          >
            <Settings size={16} />
            Settings
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AdminNav;