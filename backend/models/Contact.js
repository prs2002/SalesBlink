import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;