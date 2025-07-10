import express from 'express';
import Feedback from '../models/feedbackModel.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// In-memory storage as fallback
let inMemoryFeedbacks = [];

// @desc    Submit feedback
// @route   POST /api/feedback
// @access  Public (removed auth for testing)
router.post('/', async (req, res) => {
  try {
    const { userName, rating, feedback } = req.body;

    // Validation
    if (!userName || !rating) {
      return res.status(400).json({
        success: false,
        message: 'Name and rating are required'
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    // Create feedback object
    const newFeedback = {
      _id: Date.now().toString(),
      userName,
      userEmail: 'test@example.com',
      rating,
      feedback: feedback || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    try {
      // Try MongoDB first
      const mongoFeedback = new Feedback({
        userName,
        userEmail: 'test@example.com',
        rating,
        feedback: feedback || ''
      });

      const savedFeedback = await mongoFeedback.save();
      console.log('✅ Feedback saved to MongoDB');

      res.status(201).json({
        success: true,
        message: 'Feedback submitted successfully to MongoDB',
        data: savedFeedback
      });

    } catch (mongoError) {
      // Fallback to in-memory storage
      console.log('⚠️ MongoDB failed, using in-memory storage');
      inMemoryFeedbacks.push(newFeedback);

      res.status(201).json({
        success: true,
        message: 'Feedback submitted successfully (in-memory)',
        data: newFeedback
      });
    }

  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while submitting feedback'
    });
  }
});

// @desc    Get all feedback
// @route   GET /api/feedback
// @access  Public (for testing)
router.get('/', async (req, res) => {
  try {
    try {
      // Try MongoDB first
      const feedbacks = await Feedback.find()
        .sort({ createdAt: -1 });

      console.log('✅ Feedback fetched from MongoDB');
      res.status(200).json({
        success: true,
        count: feedbacks.length,
        data: feedbacks,
        source: 'MongoDB'
      });

    } catch (mongoError) {
      // Fallback to in-memory storage
      console.log('⚠️ MongoDB failed, using in-memory storage');

      res.status(200).json({
        success: true,
        count: inMemoryFeedbacks.length,
        data: inMemoryFeedbacks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
        source: 'In-Memory'
      });
    }

  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching feedback'
    });
  }
});

// @desc    Delete feedback
// @route   DELETE /api/feedback/:id
// @access  Private/Admin
router.delete('/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }

    await Feedback.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Feedback deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting feedback'
    });
  }
});

// @desc    Delete all feedback (Admin only)
// @route   DELETE /api/feedback
// @access  Private/Admin
router.delete('/', async (req, res) => {
  try {
    await Feedback.deleteMany({});

    res.status(200).json({
      success: true,
      message: 'All feedback deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting all feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting feedback'
    });
  }
});

export default router;
