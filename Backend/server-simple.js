import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Simple in-memory storage for testing
let feedbacks = [];
let appointments = [];
let users = [];

// Root route
app.get('/', (req, res) => {
  res.send('QuickMeds API is running...');
});

// Simple feedback routes for testing
app.post('/api/feedback', (req, res) => {
  const { userName, rating, feedback } = req.body;
  
  const newFeedback = {
    _id: Date.now().toString(),
    userName,
    userEmail: 'test@example.com',
    rating,
    feedback: feedback || '',
    createdAt: new Date().toISOString()
  };
  
  feedbacks.push(newFeedback);
  
  res.status(201).json({
    success: true,
    message: 'Feedback submitted successfully',
    data: newFeedback
  });
});

app.get('/api/feedback', (req, res) => {
  res.status(200).json({
    success: true,
    count: feedbacks.length,
    data: feedbacks
  });
});

app.delete('/api/feedback/:id', (req, res) => {
  const { id } = req.params;
  feedbacks = feedbacks.filter(f => f._id !== id);
  
  res.status(200).json({
    success: true,
    message: 'Feedback deleted successfully'
  });
});

app.delete('/api/feedback', (req, res) => {
  feedbacks = [];
  
  res.status(200).json({
    success: true,
    message: 'All feedback deleted successfully'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 API URL: http://localhost:${PORT}`);
  console.log(`📝 Test feedback: http://localhost:${PORT}/api/feedback`);
});
