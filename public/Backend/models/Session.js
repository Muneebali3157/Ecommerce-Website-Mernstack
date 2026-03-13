import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  token: String,
  ipAddress: String,
  userAgent: String,
  loginTime: { 
    type: Date, 
    default: Date.now 
  },
  lastActivity: { 
    type: Date, 
    default: Date.now 
  },
  logoutTime: Date,
  isActive: { 
    type: Boolean, 
    default: true 
  }
});

const Session = mongoose.model('Session', sessionSchema);
export default Session;