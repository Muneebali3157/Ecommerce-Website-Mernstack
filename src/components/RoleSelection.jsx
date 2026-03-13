import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, User, ShoppingBag, ArrowRight } from 'lucide-react'; // 👈 All icons here

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    if (role === 'admin') {
      navigate('/admin/login');
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Welcome to MK Store</h1>
          <p className="text-xl text-blue-200">Please select your role to continue</p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Admin Card */}
          <div 
            onClick={() => handleRoleSelect('admin')}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 cursor-pointer transform transition-all hover:scale-105 hover:bg-white/20 border-2 border-transparent hover:border-blue-400 group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-blue-500/50 transition">
                <Shield size={48} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">Admin</h2>
              <p className="text-blue-200 mb-6">
                Manage products, users, orders, and view analytics. Full control over the store.
              </p>
              <div className="flex items-center text-white bg-blue-600 px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 transition">
                <span className="mr-2">Continue as Admin</span>
                <ArrowRight size={18} />
              </div>
            </div>

            {/* Features List */}
            <div className="mt-8 space-y-3 text-blue-200">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                <span>Dashboard with analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                <span>User management</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                <span>Order tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                <span>Product management</span>
              </div>
            </div>
          </div>

          {/* User Card */}
          <div 
            onClick={() => handleRoleSelect('user')}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 cursor-pointer transform transition-all hover:scale-105 hover:bg-white/20 border-2 border-transparent hover:border-green-400 group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-green-500/50 transition">
                <User size={48} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">Customer</h2>
              <p className="text-blue-200 mb-6">
                Shop for products, manage your cart, and track your orders.
              </p>
              <div className="flex items-center text-white bg-green-600 px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 transition">
                <span className="mr-2">Continue as Customer</span>
                <ArrowRight size={18} />
              </div>
            </div>

            {/* Features List */}
            <div className="mt-8 space-y-3 text-blue-200">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span>Browse products</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span>Shopping cart</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span>Wishlist</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span>Order tracking</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-blue-300 text-sm">
          <p>Already have an account? Login through your selected role</p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;