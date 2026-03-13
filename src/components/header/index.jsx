import React, { useContext, useState, useEffect } from "react";
import Navigation from "./navigation";
import img from "../../images/mk-logo.jpg";
import { Search } from "../search";
import Badge from "@mui/material/Badge";
import { MdOutlineShoppingCart, MdDelete } from "react-icons/md";
import { GoGitCompare } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Checkout from "../product/Checkout";
import OrderForm from "../order/OrderForm";
import { CartContext } from "../../context/CartContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal,
    getCartCount,
    clearCart 
  } = useContext(CartContext);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [orderType, setOrderType] = useState('single');
  const [displayName, setDisplayName] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      const name = user.name || user.email?.split('@')[0] || 'User';
      setDisplayName(name);
    }
  }, [user]);

  const cartCount = getCartCount();
  const cartTotal = getCartTotal();

  const handleOrderNow = (item) => {
    if (!user) {
      alert("Please login to continue");
      setIsCartOpen(false);
      navigate("/login", { 
        state: { from: { pathname: location.pathname } }
      });
      return;
    }
    
    setSelectedItem(item);
    setOrderType('single');
    setShowOrderForm(true);
    setIsCartOpen(false);
  };

  const handleOrderAll = () => {
    if (!user) {
      alert("Please login to continue");
      setIsCartOpen(false);
      navigate("/login", { 
        state: { from: { pathname: location.pathname } }
      });
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setOrderType('all');
    setShowOrderForm(true);
    setIsCartOpen(false);
  };

  const handleOrderComplete = (orderData) => {
    alert("Order placed successfully!");
    
    if (orderType === 'all') {
      clearCart();
    } else if (selectedItem) {
      removeFromCart(selectedItem.id);
    }
    
    setShowOrderForm(false);
    setSelectedItem(null);
  };

  const handleCloseOrderForm = () => {
    setShowOrderForm(false);
    setSelectedItem(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="w-full">
      {/* Top Strip */}
      <div className="top-strip py-2 border-t-1 border-b-2 border-gray-200">
        <div className="container flex items-center justify-between">
          <p className="text-[14px] font-[500] -ml-14">
            Get upto 65% off new season style, limited time only
          </p>
          <ul className="flex items-center gap-6 !-mr-10">
            <li>
              <Link to="/help-center" className="text-[13px] font-[500] hover:text-blue-500">
                Help Center
              </Link>
            </li>
            <li>
              <Link to="/order-tracking" className="text-[13px] font-[500] hover:text-blue-500">
                Order Tracking
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Header */}
      <div className="header border-b-2 border-gray-200">
        <div className="container flex items-center justify-between py-3">
          {/* Logo */}
          <div className="w-[12%]">
            <Link to="/"><img src={img} alt="MK Store Logo" /></Link>
          </div>

          {/* Search */}
          <div className="w-[60%] ml-24">
            <Search />
          </div>

          {/* Right Icons */}
          <div className="w-[30%] flex items-center justify-end gap-7 !-mr-7">
            <ul className="flex items-center gap-6 w-full">
              {/* Login/Register OR User */}
              <li className="flex gap-2">
                {user ? (
                  <>
                    <span className="text-[14px] font-[550]">
                      Welcome {displayName}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="text-[14px] font-[550] hover:text-red-500 ml-2"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="text-[14px] font-[550] hover:text-blue-500">
                      Login
                    </Link>
                    /
                    <Link to="/signup" className="text-[14px] font-[550] hover:text-blue-500">
                      Register
                    </Link>
                  </>
                )}
              </li>

              {/* Compare */}
              <li>
                <Tooltip title="Compare" placement="bottom">
                  <Badge badgeContent={4} color="primary">
                    <GoGitCompare className="text-[24px] text-gray-800 hover:text-blue-500 cursor-pointer" />
                  </Badge>
                </Tooltip>
              </li>

              {/* Wishlist */}
              <li>
                <Tooltip title="Wishlist" placement="bottom">
                  <Badge badgeContent={4} color="primary">
                    <FaRegHeart className="text-[24px] text-gray-800 hover:text-blue-500 cursor-pointer" />
                  </Badge>
                </Tooltip>
              </li>

              {/* Cart */}
              <li className="relative">
                <Tooltip title="Cart" placement="bottom">
                  <Badge badgeContent={cartCount} color="primary">
                    <MdOutlineShoppingCart
                      className="text-[24px] text-gray-800 hover:text-blue-500 cursor-pointer"
                      onClick={() => setIsCartOpen(!isCartOpen)}
                    />
                  </Badge>
                </Tooltip>

                {/* Cart Dropdown */}
                {isCartOpen && (
                  <div className="absolute right-0 top-full mt-2 w-96 bg-white shadow-lg border border-gray-200 rounded-lg z-50">
                    {/* Cart Header */}
                    <div className="p-4 border-b">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-lg">Shopping Cart</h3>
                        <span className="text-sm text-gray-500">
                          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                        </span>
                      </div>
                    </div>

                    {/* Cart Items */}
                    <div className="max-h-96 overflow-y-auto">
                      {cartItems.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                          <MdOutlineShoppingCart className="text-5xl mx-auto mb-3 text-gray-300" />
                          <p>Your cart is empty</p>
                          <button
                            onClick={() => setIsCartOpen(false)}
                            className="mt-3 text-blue-500 hover:underline"
                          >
                            Continue Shopping
                          </button>
                        </div>
                      ) : (
                        <div className="divide-y">
                          {cartItems.map((item) => (
                            <div key={item.id} className="p-4 flex gap-3 hover:bg-gray-50">
                              {/* Product Image */}
                              <div className="w-16 h-16 flex-shrink-0">
                                <img
                                  src={item.img}
                                  alt={item.title}
                                  className="w-full h-full object-cover rounded"
                                />
                              </div>

                              {/* Product Details */}
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between">
                                  <span className="font-medium text-sm">
                                    {item.title}
                                  </span>
                                  <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-gray-400 hover:text-red-500 ml-2"
                                  >
                                    <MdDelete size={18} />
                                  </button>
                                </div>

                                <div className="text-sm text-gray-600 mt-1">
                                  ${item.price} × {item.quantity}
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex items-center gap-2 mt-2">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="w-6 h-6 flex items-center justify-center border rounded hover:bg-gray-100"
                                  >
                                    -
                                  </button>
                                  <span className="text-sm w-8 text-center">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="w-6 h-6 flex items-center justify-center border rounded hover:bg-gray-100"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>

                              {/* Item Total and Order Button */}
                              <div className="text-right flex-shrink-0">
                                <div className="font-medium text-sm mb-2">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </div>
                                <button
                                  onClick={() => handleOrderNow(item)}
                                  className="bg-green-500 text-white text-xs px-3 py-1 rounded hover:bg-green-600 transition whitespace-nowrap"
                                >
                                  Order Now
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Cart Footer */}
                    {cartItems.length > 0 && (
                      <div className="p-4 border-t bg-gray-50 rounded-b-lg">
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-medium">Subtotal:</span>
                          <span className="font-bold text-green-600">
                            ${cartTotal.toFixed(2)}
                          </span>
                        </div>
                        <button
                          onClick={handleOrderAll}
                          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition font-medium"
                        >
                          Order All Items (${cartTotal.toFixed(2)})
                        </button>
                        <div className="text-center mt-3">
                          <button
                            onClick={() => setIsCartOpen(false)}
                            className="text-sm text-blue-500 hover:underline"
                          >
                            Continue Shopping
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Navigation />

      {/* Checkout Modal */}
      {showCheckout && selectedItem && (
        <Checkout 
          product={selectedItem}
          quantity={selectedItem.quantity}
          onClose={() => setShowCheckout(false)}
        />
      )}

      {/* Order Form Modal */}
      {showOrderForm && (
        <OrderForm
          items={orderType === 'single' ? [selectedItem] : cartItems}
          user={user}
          onClose={handleCloseOrderForm}
          onOrderComplete={handleOrderComplete}
          orderType={orderType}
        />
      )}
    </header>
  );
};

export default Header;