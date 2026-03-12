import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import Checkout from "./Checkout";
const ProductDetail = ({ product, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [showCheckout, setShowCheckout] = useState(false);
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    if (!user) {
      alert("Please login or register to continue!");
      return;
    }
    addToCart(product, quantity);
    alert("Product added to cart successfully!");
    onClose();
  };

  const handleBuy = () => {
    if (!user) {
      alert("Please login or register to continue!");
      return;
    }
    // Open checkout modal instead of just adding to cart
    setShowCheckout(true);
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
    onClose(); // Close the product detail modal as well
  };

  // Calculate total price
  const totalPrice = product.price * quantity;

  return (
    <>
      {/* Product Detail Modal */}
      <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-24">
        <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md relative p-6 flex flex-col items-center mt-20 m-5">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-2xl font-bold hover:text-red-500"
          >
            &times;
          </button>

          <img
            src={product.img}
            alt={product.title}
            className="w-70 h-40 object-cover rounded-md mb-4 hover:scale-105 transition"
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

          <div className="flex gap-3">
            <button
              onClick={handleAdd}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuy}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <Checkout 
          product={product}
          quantity={quantity}
          onClose={handleCloseCheckout}
        />
      )}
    </>
  );
};

export default ProductDetail;
