import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  line1: {
    type: String,
    required: true,
  },
  line2: {
    type: String,
    required: true,
  },
});

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    specialty: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    fees: {
      type: Number,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    address: addressSchema,
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
