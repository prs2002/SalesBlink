import asyncHandler from '../middlewares/asyncHandler.js';
import Contact from '../models/Contact.js';

export const createContact = async (req, res) => {
  const { userId, name, email } = req.body;
  try {
    const contact = new Contact({ userId, name, email });
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error creating contact', error });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ userId: req.user._id });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts', error });
  }
};

export const searchContacts = asyncHandler(async (req, res) => {
    const { query } = req.query;
  
    const contacts = await Contact.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } }
      ]
    });
  
    res.json(contacts);
  });  