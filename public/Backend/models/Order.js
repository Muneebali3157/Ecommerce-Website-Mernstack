import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: String,
  userId: String,
  userEmail: String,
  userName: String,
  userPhone: String,
  items: Array,
  shippingAddress: Object,
  paymentMethod: String,
  subtotal: Number,
  shipping: Number,
  tax: Number,
  total: Number,
  notes: String,
  orderStatus: { type: String, default: 'pending' },
  paymentStatus: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

// REMOVE the pre-save hook completely for now
// orderSchema.pre('save', function(next) { ... });

const Order = mongoose.model('Order', orderSchema);
export default Order;