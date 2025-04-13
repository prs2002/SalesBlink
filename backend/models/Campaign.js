import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  status: { type: String, enum: ['draft', 'active', 'completed', 'paused'], default: 'draft' },
  emailTemplateId: { type: mongoose.Schema.Types.ObjectId, ref: 'EmailTemplate' },
  contactIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }],
  nodes: { type: Array, default: [] }, // Save flow nodes here
  edges: { type: Array, default: [] }, // Save flow edges here
  
}, { timestamps: true });

const Campaign = mongoose.model('Campaign', campaignSchema);
export default Campaign;