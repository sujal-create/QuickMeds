import express from 'express';
import Contact from '../models/contactModel.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Create new contact message
// @route   POST /api/contact
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    const contact = new Contact({
      name,
      email,
      phone,
      subject,
      message,
    });

    const createdContact = await contact.save();
    res.status(201).json(createdContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
