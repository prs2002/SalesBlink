import Campaign from '../models/Campaign.js';
import asyncHandler from '../middlewares/asyncHandler.js' 

export const createCampaign = async (req, res) => {
  const { name, status, contactIds, emailTemplateId, nodes, edges } = req.body;
  try {
    const campaign = new Campaign({
      userId: req.user._id,
      name,
      status,
      contactIds,
      emailTemplateId,
      nodes,
      edges
    });
    await campaign.save();
    res.status(201).json(campaign);
  } catch (error) {
    res.status(500).json({ message: 'Error creating campaign', error });
  }
};

export const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ userId: req.user._id }).populate('emailTemplateId contactIds');
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching campaigns', error });
  }
};

export const deleteCampaign = asyncHandler(async (req, res) => {
  const campaign = await Campaign.findByIdAndDelete(req.params.id);

  if (!campaign) {
    return res.status(404).json({ message: 'Campaign not found' });
  }

  res.status(200).json({ message: 'Campaign deleted successfully' });
});