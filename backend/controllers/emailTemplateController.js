import asyncHandler from '../middlewares/asyncHandler.js';
import EmailTemplate from '../models/EmailTemplate.js';

export const createTemplate = async (req, res) => {
  const { name, subject, content } = req.body;
  try {
    const template = new EmailTemplate({ userId: req.user._id, name, subject, content });
    await template.save();
    res.status(201).json(template);
  } catch (error) {
    res.status(500).json({ message: 'Error creating template', error });
  }
};

export const getTemplates = async (req, res) => {
  try {
    const templates = await EmailTemplate.find({ userId: req.user._id });
    res.json(templates);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching templates', error });
  }
};

export const searchEmailTemplates = asyncHandler(async (req, res) => {
    const { query } = req.query;
  
    const templates = await EmailTemplate.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { subject: { $regex: query, $options: 'i' } }
      ]
    });
  
    res.json(templates);
  });