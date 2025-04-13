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

export const addContactToCampaign = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { contactId } = req.body;

  const campaign = await Campaign.findById(id);
  if (!campaign) {
    return res.status(404).json({ message: 'Campaign not found' });
  }

  // Only add if not already in the list
  if (!campaign.contactIds.includes(contactId)) {
    campaign.contactIds.push(contactId);
    await campaign.save();
  }

  res.json({ message: 'Contact added to campaign', campaign });
});
