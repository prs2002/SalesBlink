import Campaign from '../models/Campaign.js';

export const createCampaign = async (req, res) => {
  const { name, status, contactIds, emailTemplateId, flowData } = req.body;
  try {
    const campaign = new Campaign({
      userId: req.user._id,
      name,
      status,
      contactIds,
      emailTemplateId,
      flowData
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