import Header from './components/header/index';
import Home from './components/pages/home/index';
import Signup from './components/pages/home/signup/Signup';
import Login from './components/pages/home/login/Login';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ProductDetail from './components/productslider/ProductDetail'; // 👈 Add this import
import './App.css';

// Landing Components
import RoleSelection from './components/RoleSelection';
import LandingPage from './components/LandingPage';

// Admin Components
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminUsers from './components/admin/AdminUsers';
import AdminOrders from './components/admin/AdminOrders';
import AdminProducts from './components/admin/AdminProducts';

// Protected Route Component for Admin with return URL
const ProtectedAdminRoute = ({ children }) => {
  const userStr = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  const location = useLocation();
  
  console.log('Checking admin access:', { token, userStr });
  
  if (!token || !userStr) {
    console.log('No token or user - redirecting to admin login');
    // Save the attempted URL for redirect after login
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  
  try {
    const user = JSON.parse(userStr);
    console.log('User role:', user.role);
    
    if (user.role !== 'admin') {
      console.log('User is not admin - redirecting');
      return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }
    
    console.log('Admin access granted');
    return children;
  } catch (error) {
    console.error('Error parsing user:', error);
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
};

// Layout component to conditionally show Header
const AppLayout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isLandingRoute = location.pathname === '/' || location.pathname === '/role-selection';
  
  return (
    <>
      {!isAdminRoute && !isLandingRoute && <Header />}
      {children}
    </>
  );
};

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);

  // Make openProductDetail available globally
  useEffect(() => {
    window.openProductDetail = (product) => {
      setSelectedProduct(product);
      setShowProductModal(true);
    };

    return () => {
      delete window.openProductDetail; // Cleanup
    };
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <AppLayout>
          <Routes>
            {/* Landing/Role Selection Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/role-selection" element={<RoleSelection />} />
            
            {/* Public Routes */}
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedAdminRoute>
                <AdminUsers />
              </ProtectedAdminRoute>
            } />
            <Route path="/admin/orders" element={
              <ProtectedAdminRoute>
                <AdminOrders />
              </ProtectedAdminRoute>
            } />
            <Route path="/admin/products" element={
              <ProtectedAdminRoute>
                <AdminProducts />
              </ProtectedAdminRoute>
            } />
            
            {/* Catch all route - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          {/* Global Product Detail Modal */}
          {showProductModal && selectedProduct && (
            <ProductDetail
              product={selectedProduct}
              isOpen={showProductModal}
              onClose={() => {
                setShowProductModal(false);
                setSelectedProduct(null);
              }}
            />
          )}
        </AppLayout>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;