import mongoose from 'mongoose';

const scheduledEmailSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  campaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' },
  contactId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' },
  subject: String,
  body: String,
  sendAt: Date,
  status: { type: String, enum: ['scheduled', 'sent', 'failed'], default: 'scheduled' },
  errorLog: String,
}, { timestamps: true });

const ScheduledEmail = mongoose.model('ScheduledEmail', scheduledEmailSchema);
export default ScheduledEmail;