import asyncHandler from '../middlewares/asyncHandler.js';
import Contact from '../models/Contact.js';

export const createContact = async (req, res) => {
  const { name, email } = req.body;
  try {
    const contact = new Contact({ userId: req.user._id, name, email });
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
  
export const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
  
    res.status(200).json({ message: 'Contact deleted successfully' });
  });
  