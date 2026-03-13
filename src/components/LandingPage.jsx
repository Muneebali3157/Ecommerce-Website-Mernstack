import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Store, Shield, Users, ShoppingBag, TrendingUp, 
  Package, Truck, CreditCard, User
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [showRoleModal, setShowRoleModal] = useState(false);

  useEffect(() => {
    // Show role selection modal after 2 seconds
    const timer = setTimeout(() => {
      setShowRoleModal(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleRoleSelect = (role) => {
    setShowRoleModal(false);
    if (role === 'admin') {
      navigate('/admin/login');
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 py-20">
          <div className="flex items-center justify-between">
            <div className="max-w-2xl">
              <h1 className="text-6xl font-bold mb-6">Welcome to MK Store</h1>
              <p className="text-xl mb-8 text-blue-100">
                Your one-stop destination for all your shopping needs. From electronics to fashion, we've got it all!
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleRoleSelect('user')}
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center gap-2"
                >
                  <ShoppingBag size={20} />
                  Start Shopping
                </button>
                <button
                  onClick={() => handleRoleSelect('admin')}
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition flex items-center gap-2"
                >
                  <Shield size={20} />
                  Admin Login
                </button>
              </div>
            </div>
            <div className="hidden lg:block">
              <Store size={200} className="text-white/20" />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose MK Store?</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
            <p className="text-gray-600">Thousands of products across multiple categories</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="text-green-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Free shipping on orders over $50</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="text-purple-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
            <p className="text-gray-600">Multiple payment options with 100% security</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">10K+</div>
              <div className="text-gray-600">Products</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">100+</div>
              <div className="text-gray-600">Brands</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Role Selection Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8">
            <h2 className="text-3xl font-bold text-center mb-8">How would you like to continue?</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Admin Option */}
              <div 
                onClick={() => handleRoleSelect('admin')}
                className="border-2 rounded-xl p-6 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-500 group-hover:text-white transition">
                    <Shield size={40} className="text-blue-600 group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Admin</h3>
                  <p className="text-gray-600 text-sm">
                    Manage store, view analytics, handle orders and users
                  </p>
                </div>
              </div>

              {/* Customer Option */}
              <div 
                onClick={() => handleRoleSelect('user')}
                className="border-2 rounded-xl p-6 cursor-pointer hover:border-green-500 hover:bg-green-50 transition group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-500 group-hover:text-white transition">
                    <User size={40} className="text-green-600 group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Customer</h3>
                  <p className="text-gray-600 text-sm">
                    Shop products, manage cart, track orders
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowRoleModal(false)}
              className="mt-6 w-full text-gray-500 hover:text-gray-700"
            >
              Maybe later
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;