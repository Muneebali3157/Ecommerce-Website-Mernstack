import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ product, quantity, onClose }) => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    // Shipping Information
    fullName: '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
    email: '',
    
    // Card Information
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    
    // Bank Information
    bankName: '',
    accountNumber: '',
    routingNumber: ''
  });

  // Calculate prices
  const subtotal = product.price * quantity;
  const shipping = 5.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayment = (e) => {
    e.preventDefault();
    
    // Validate form based on payment method
    if (paymentMethod === 'card') {
      if (!formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvv) {
        alert('Please fill in all card details');
        return;
      }
    } else {
      if (!formData.bankName || !formData.accountNumber || !formData.routingNumber) {
        alert('Please fill in all bank details');
        return;
      }
    }

    if (!formData.fullName || !formData.address || !formData.city || !formData.zipCode || !formData.phone || !formData.email) {
      alert('Please fill in all shipping information');
      return;
    }

    // Here you would typically send this to your backend
    console.log('Processing payment:', {
      product,
      quantity,
      total,
      paymentMethod,
      shippingInfo: {
        fullName: formData.fullName,
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode,
        phone: formData.phone,
        email: formData.email
      },
      paymentDetails: paymentMethod === 'card' ? {
        cardNumber: formData.cardNumber.slice(-4),
        cardName: formData.cardName,
        expiryDate: formData.expiryDate
      } : {
        bankName: formData.bankName,
        accountNumber: formData.accountNumber.slice(-4),
        routingNumber: formData.routingNumber
      }
    });

    // Show success message
    alert(`✅ Payment Successful!\n\nAmount: $${total.toFixed(2)}\nThank you for your purchase!`);
    
    // Close checkout and redirect to home or order confirmation
    onClose();
    navigate('/');
  };

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-10 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-[95%] max-w-4xl relative p-6 my-10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl font-bold hover:text-red-500 z-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Secure Checkout</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Product & Order Summary */}
          <div className="md:border-r md:pr-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2">1</span>
              Order Summary
            </h3>
            
            {/* Product Details */}
            <div className="flex gap-4 mb-6 bg-gray-50 p-4 rounded-lg">
              <img 
                src={product.img} 
                alt={product.title}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{product.title}</h4>
                <p className="text-gray-600 text-sm mt-1">Price: ${product.price}</p>
                <p className="text-gray-600 text-sm">Quantity: {quantity}</p>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h4 className="font-semibold mb-3 text-gray-700">Price Breakdown</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Price per item:</span>
                  <span className="font-medium">${product.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Quantity:</span>
                  <span className="font-medium">{quantity}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-blue-200">
                  <span className="font-semibold">Subtotal:</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping:</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-blue-200 text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-green-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Calculation Formula */}
            <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-600">
              <p className="font-medium mb-1">How we calculated:</p>
              <p>• {quantity} × ${product.price} = ${subtotal.toFixed(2)}</p>
              <p>• + Shipping: ${shipping.toFixed(2)}</p>
              <p>• + Tax: ${tax.toFixed(2)}</p>
              <p className="font-medium mt-1">= Final Amount: ${total.toFixed(2)}</p>
            </div>
          </div>

          {/* Right Column - Shipping & Payment */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2">2</span>
              Shipping & Payment
            </h3>

            <form onSubmit={handlePayment} className="space-y-4">
              {/* Shipping Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3 text-gray-700">Shipping Information</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Street Address"
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      required
                    />
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="ZIP Code"
                      className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      required
                    />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  />
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3 text-gray-700">Payment Method</h4>
                <div className="flex gap-4 mb-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`flex-1 py-2 rounded border font-medium transition ${
                      paymentMethod === 'card' 
                        ? 'bg-blue-500 text-white border-blue-500' 
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    Credit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`flex-1 py-2 rounded border font-medium transition ${
                      paymentMethod === 'bank' 
                        ? 'bg-blue-500 text-white border-blue-500' 
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    Bank Transfer
                  </button>
                </div>

                {paymentMethod === 'card' ? (
                  // Card Payment Form
                  <div className="space-y-3">
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={(e) => {
                        const formatted = formatCardNumber(e.target.value);
                        setFormData(prev => ({ ...prev, cardNumber: formatted }));
                      }}
                      placeholder="Card Number"
                      maxLength="19"
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      required
                    />
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      placeholder="Cardholder Name"
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      required
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        maxLength="5"
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        required
                      />
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="CVV"
                        maxLength="3"
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        required
                      />
                    </div>
                  </div>
                ) : (
                  // Bank Transfer Form
                  <div className="space-y-3">
                    <input
                      type="text"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleInputChange}
                      placeholder="Bank Name"
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      required
                    />
                    <input
                      type="text"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleInputChange}
                      placeholder="Account Number"
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      required
                    />
                    <input
                      type="text"
                      name="routingNumber"
                      value={formData.routingNumber}
                      onChange={handleInputChange}
                      placeholder="Routing Number"
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      required
                    />
                    
                    {/* Bank Transfer Instructions */}
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="font-semibold text-sm mb-2">🏦 Bank Transfer Instructions:</p>
                      <p className="text-xs mb-1">Please transfer exactly:</p>
                      <p className="font-bold text-green-600 text-lg">${total.toFixed(2)}</p>
                      <p className="text-xs mt-2">to the following account:</p>
                      <div className="mt-2 text-xs font-mono bg-white p-2 rounded">
                        <p>Bank: XYZ Bank</p>
                        <p>Account: 1234567890</p>
                        <p>Routing: 987654321</p>
                      </div>
                      <p className="text-xs mt-2 text-gray-600">
                        Your order will be processed after payment confirmation
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition shadow-lg hover:shadow-xl"
              >
                Pay ${total.toFixed(2)} Now
              </button>

              {/* Security Note */}
              <p className="text-xs text-gray-500 text-center flex items-center justify-center gap-1">
                <span>🔒</span> Your payment information is secure and encrypted
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;