import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  items: [{
    productId: String,
    productTitle: String,
    price: Number,
    quantity: Number,
    image: String,
    addedAt: { 
      type: Date, 
      default: Date.now 
    }
  }],
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;