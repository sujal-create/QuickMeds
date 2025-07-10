import express from 'express';
import Doctor from '../models/doctorModel.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Fetch all doctors
// @route   GET /api/doctors
// @access  Public
router.get('/', async (req, res) => {
  try {
    const specialty = req.query.specialty;
    let query = {};

    if (specialty) {
      query = { specialty };
    }

    const doctors = await Doctor.find(query);
    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Fetch single doctor
// @route   GET /api/doctors/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (doctor) {
      res.json(doctor);
    } else {
      res.status(404).json({ message: 'Doctor not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
