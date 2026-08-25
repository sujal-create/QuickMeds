import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import jobRoutes from './routes/jobRoutes.js';
import userRoutes from './routes/userRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import paymentRoute from './routes/paymentRoutes.js';

dotenv.config();

const app = express();

// =====================================================
// __dirname setup for ES Modules
// =====================================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// =====================================================
// MIDDLEWARE
// =====================================================

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:5173',
      'https://quick-meds-copy-r1q7.vercel.app',
    ],
    credentials: true,
  })
);

app.use(express.json());


// =====================================================
// STATIC FILES
// =====================================================

app.use(
  '/uploads/resumes',
  express.static(
    path.join(__dirname, 'uploads/resumes')
  )
);


// =====================================================
// MONGODB
// =====================================================

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error(
      'MongoDB connection error:',
      err
    );
  });


// =====================================================
// ROUTES
// =====================================================

app.use('/api/jobs', jobRoutes);

app.use('/api/users', userRoutes);

app.use('/api/doctors', doctorRoutes);

app.use('/api/contact', contactRoutes);

app.use('/api/payment', paymentRoute);


// =====================================================
// DEFAULT ROUTE
// =====================================================

app.get('/', (req, res) => {
  res.json({
    message: 'QuickMeds API is running...',
  });
});


// =====================================================
// START SERVER
// =====================================================

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(
    `QuickMeds server running on port ${PORT}`
  );
});