import { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { Users, Eye, Plus, X } from 'lucide-react';
import axios from 'axios';

export function LeadSourceNode({ data, id }) {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/contacts',{
        withCredentials: true, // <-- Important!
      });
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleContactSelect = (contactId) => {
    if (contactId === 'new') {
      setShowCreateForm(true);
      setShowDetails(false);
      return;
    }

    const contact = contacts.find(c => c._id === contactId);
    if (contact) {
      setSelectedContact(contact);
      data.contact = contact;
    }
  };

  const handleCreateContact = async () => {
    try {
      await axios.post('http://localhost:5000/api/contacts/add-contact',newContact, {
        withCredentials: true, // <-- Important!
      });
      setShowCreateForm(false);
      setNewContact({ name: '', email: '' });
      fetchContacts();
    } catch (error) {
      console.error('Error creating contact:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-purple-200 min-w-[300px]">
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-5 h-5 text-purple-500" />
        <div className="font-medium">Lead Source</div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <select
            className="flex-1 p-2 border rounded"
            onChange={(e) => handleContactSelect(e.target.value)}
            value={selectedContact?._id || ''}
          >
            <option value="">Select Contact...</option>
            {contacts.map((contact) => (
              <option key={contact._id} value={contact._id}>
                {contact.name}
              </option>
            ))}
            <option value="new">➕ Add New Contact</option>
          </select>
          {selectedContact && (
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="p-2 text-gray-600 hover:text-purple-500"
              title="View Contact Details"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
        </div>

        {showDetails && selectedContact && (
          <div className="border rounded p-3 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">Contact Details</span>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="text-sm">
              <div><span className="font-medium">Name:</span> {selectedContact.name}</div>
              <div><span className="font-medium">Email:</span> {selectedContact.email}</div>
            </div>
          </div>
        )}

        {showCreateForm && (
          <div className="border rounded p-3 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">New Contact</span>
              <button
                onClick={() => setShowCreateForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Contact Name"
              className="w-full p-2 border rounded"
              value={newContact.name}
              onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-2 border rounded"
              value={newContact.email}
              onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
            />
            <button
              onClick={handleCreateContact}
              className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Contact
            </button>
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}