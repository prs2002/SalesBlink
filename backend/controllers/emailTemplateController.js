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
    // const templates = await EmailTemplate.find({ userId: req.user._id });
    const templates = await EmailTemplate.find({ userId: req.user._id });
    res.json(templates);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching templates', error });
  }
};

export const deleteEmailTemplate = asyncHandler(async (req, res) => {
  const template = await EmailTemplate.findByIdAndDelete(req.params.id);
  if (!template) {
    return res.status(404).json({ message: 'Template not found' });
  }

  res.status(200).json({ message: 'Email template deleted successfully' });
});

export const updateEmailTemplate = asyncHandler(async (req, res) => {
  const { subject, content } = req.body;

  const template = await EmailTemplate.findById(req.params.id);

  if (!template) {
    return res.status(404).json({ message: 'Template not found' });
  }

  template.subject = subject || template.subject;
  template.content = content || template.content;

  const updatedTemplate = await template.save();
  res.status(200).json(updatedTemplate);
});