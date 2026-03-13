import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = 5001; // Use different port for testing

app.use(cors());
app.use(express.json());

// Simple test route
app.post('/api/test-order', (req, res) => {
  console.log('✅ Test route hit!');
  console.log('Received data:', req.body);
  res.json({ success: true, message: 'Test working!' });
});

app.listen(PORT, () => {
  console.log(`✅ Test server running on port ${PORT}`);
});