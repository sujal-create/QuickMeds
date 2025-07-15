import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  title: String,
  location: String,
  type: String,
  experience: String
});

export default mongoose.model('Job', JobSchema);
