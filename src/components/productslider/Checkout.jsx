import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ product, quantity, onClose }) => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    address: '',
    city: '',
    zipCode: '',
    phone: ''
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
    
    // Here you would integrate with a real payment gateway
    console.log('Processing payment:', {
      product,
      quantity,
      total,
      paymentMethod,
      formData
    });

    // Show success message
    alert(`Payment of $${total.toFixed(2)} processed successfully! 
Thank you for your purchase.`);
    
    // Navigate to order confirmation or close
    navigate('/order-confirmation');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-10 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg w-[95%] max-w-4xl relative p-6 mt-32">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl font-bold hover:text-red-500 z-10"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Secure Checkout</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Product & Order Summary */}
          <div className="border-r pr-6">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            
            <div className="flex gap-4 mb-6 bg-gray-50 p-3 rounded">
              <img 
                src={product.img} 
                alt={product.title}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h4 className="font-medium">{product.title}</h4>
                <p className="text-gray-600">Price: ${product.price}</p>
                <p className="text-gray-600">Quantity: {quantity}</p>
              </div>
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Price per item:</span>
                <span>${product.price}</span>
              </div>
              <div className="flex justify-between">
                <span>Quantity:</span>
                <span>{quantity}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Subtotal ({quantity} × ${product.price}):</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                <span>Total Amount:</span>
                <span className="text-green-600">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Price Breakdown Box */}
            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
              <p className="font-semibold mb-2">Price Calculation:</p>
              <p className="text-sm">
                {quantity} × ${product.price} = ${subtotal.toFixed(2)}
              </p>
              <p className="text-sm">+ Shipping: ${shipping.toFixed(2)}</p>
              <p className="text-sm">+ Tax: ${tax.toFixed(2)}</p>
              <p className="text-sm font-bold mt-2 text-blue-600">
                Final Amount: ${total.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Right Column - Payment & Shipping Details */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
            
            {/* Shipping Address */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Shipping Address</h4>
              <div className="space-y-3">
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Street Address"
                  className="w-full border rounded px-3 py-2"
                  required
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="border rounded px-3 py-2"
                    required
                  />
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="ZIP Code"
                    className="border rounded px-3 py-2"
                    required
                  />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Payment Method</h4>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`px-4 py-2 rounded border flex-1 ${
                    paymentMethod === 'card' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  Credit Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank')}
                  className={`px-4 py-2 rounded border flex-1 ${
                    paymentMethod === 'bank' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  Bank Transfer
                </button>
              </div>
            </div>

            <form onSubmit={handlePayment} className="space-y-4">
              {paymentMethod === 'card' ? (
                // Card Payment Form
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full border rounded px-3 py-2"
                      maxLength="19"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className="w-full border rounded px-3 py-2"
                        maxLength="5"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        className="w-full border rounded px-3 py-2"
                        maxLength="3"
                        required
                      />
                    </div>
                  </div>
                </>
              ) : (
                // Bank Transfer Form
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleInputChange}
                      placeholder="Enter bank name"
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Account Number
                    </label>
                    <input
                      type="text"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleInputChange}
                      placeholder="Enter account number"
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Routing Number
                    </label>
                    <input
                      type="text"
                      name="routingNumber"
                      value={formData.routingNumber}
                      onChange={handleInputChange}
                      placeholder="Enter routing number"
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg text-sm">
                    <p className="font-semibold mb-2">Bank Transfer Instructions:</p>
                    <p>Please transfer the exact amount of:</p>
                    <p className="font-bold text-green-600 my-2">${total.toFixed(2)}</p>
                    <p>to the following account:</p>
                    <div className="mt-2 font-mono text-xs">
                      <p>Bank: XYZ Bank</p>
                      <p>Account: 1234567890</p>
                      <p>Routing: 987654321</p>
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full bg-green-500 text-white py-3 rounded font-semibold hover:bg-green-600 transition mt-6"
              >
                Pay ${total.toFixed(2)} Now
              </button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-4">
              🔒 Your payment information is secure and encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;