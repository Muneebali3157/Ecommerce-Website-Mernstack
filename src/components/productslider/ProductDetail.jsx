import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import OrderForm from "../order/OrderForm"; // Import OrderForm

const ProductDetail = ({ product, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    if (!user) {
      alert("Please login or register to continue!");
      return;
    }
    
    const productToAdd = {
      id: product.id,
      title: product.title,
      price: parseFloat(product.price),
      img: product.img,
      category: product.category
    };
    
    addToCart(productToAdd, quantity);
    
    // Show success message
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    toast.textContent = `${product.title} added to cart!`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
    
    onClose();
  };

  const handleOrderNow = () => {
    if (!user) {
      alert("Please login or register to continue!");
      return;
    }
    
    // Create a product item in the same format as cart items
    const orderItem = {
      id: product.id,
      title: product.title,
      price: parseFloat(product.price),
      img: product.img,
      category: product.category,
      quantity: quantity
    };
    
    setShowOrderForm(true);
  };

  const handleOrderComplete = (orderData) => {
    // Show success message
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    toast.textContent = `Order placed successfully! Total: $${orderData.total.toFixed(2)}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
    
    setShowOrderForm(false);
    onClose();
  };

  const handleCloseOrderForm = () => {
    setShowOrderForm(false);
  };

  // Calculate total price
  const totalPrice = product.price * quantity;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-24">
        <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md relative p-6 flex flex-col items-center mt-20">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-2xl font-bold hover:text-red-500"
          >
            &times;
          </button>

          <img
            src={product.img}
            alt={product.title}
            className="w-60 h-50 object-cover rounded-md mb-4 hover:scale-105 transition"
          />

          <h2 className="text-xl font-bold mb-2 text-center">{product.title}</h2>
          <p className="text-gray-700 mb-2 text-center">Price: ${product.price}</p>
          
          {/* Show total price when quantity > 1 */}
          {quantity > 1 && (
            <p className="text-green-600 font-semibold mb-4">
              Total: ${totalPrice.toFixed(2)}
            </p>
          )}

          <div className="flex items-center gap-3 mb-4">
            <label className="font-medium">Quantity:</label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="border rounded w-16 text-center py-1"
            />
          </div>

          <div className="flex gap-3 w-full">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={handleOrderNow}
              className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/* Order Form Modal */}
      {showOrderForm && (
        <OrderForm
          items={[{
            id: product.id,
            title: product.title,
            price: parseFloat(product.price),
            img: product.img,
            category: product.category,
            quantity: quantity
          }]}
          user={user}
          onClose={handleCloseOrderForm}
          onOrderComplete={handleOrderComplete}
          orderType="single"
        />
      )}
    </>
  );
};

export default ProductDetail;