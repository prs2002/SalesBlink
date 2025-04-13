import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Plus, Trash2, Edit } from 'lucide-react';
const BASE_URL = import.meta.env.VITE_API_URL;

function EmailTemplates() {
  const [templates, setTemplates] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    subject: '',
    content: ''
  });

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/email`,{
            withCredentials: true, // <-- Important!
          });
    setTemplates(response.data);
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  const handleAddTemplate = async () => {
    try {
      await axios.post(`${BASE_URL}/api/email/add-email`,newTemplate , {
        withCredentials: true, // <-- Important!
      });
      setNewTemplate({ name: '', subject: '', content: '' });
      setShowAddForm(false);
      fetchTemplates();
    } catch (error) {
      console.error('Error adding template:', error);
    }
  };

  const handleUpdateTemplate = async () => {
    if (!editingTemplate) return;
    try {
      await axios.put(`${BASE_URL}/api/email/${editingTemplate._id}`, editingTemplate,{
        withCredentials: true, // <-- Important!
      });
      setEditingTemplate(null);
      fetchTemplates();
    } catch (error) {
      console.error('Error updating template:', error);
    }
  };

  const handleDeleteTemplate = async (templateId) => {
    try {
      await axios.delete(`${BASE_URL}/api/email/${templateId}`,{
        withCredentials: true, // <-- Important!
      });
      fetchTemplates();
    } catch (error) {
      console.error('Error deleting template:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Mail className="w-8 h-8" />
            Email Templates
          </h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Template
          </button>
        </div>

        {(showAddForm || editingTemplate) && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingTemplate ? 'Edit Template' : 'Add New Template'}
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Template Name"
                className="w-full p-2 border rounded"
                value={editingTemplate ? editingTemplate.name : newTemplate.name}
                onChange={(e) => 
                  editingTemplate 
                    ? setEditingTemplate({ ...editingTemplate, name: e.target.value })
                    : setNewTemplate({ ...newTemplate, name: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Subject"
                className="w-full p-2 border rounded"
                value={editingTemplate ? editingTemplate.subject : newTemplate.subject}
                onChange={(e) => 
                  editingTemplate 
                    ? setEditingTemplate({ ...editingTemplate, subject: e.target.value })
                    : setNewTemplate({ ...newTemplate, subject: e.target.value })
                }
              />
              <textarea
                placeholder="Email Content"
                className="w-full p-2 border rounded h-32"
                value={editingTemplate ? editingTemplate.content : newTemplate.content}
                onChange={(e) => 
                  editingTemplate 
                    ? setEditingTemplate({ ...editingTemplate, content: e.target.value })
                    : setNewTemplate({ ...newTemplate, content: e.target.value })
                }
              />
              <div className="flex gap-2">
                <button
                  onClick={editingTemplate ? handleUpdateTemplate : handleAddTemplate}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  {editingTemplate ? 'Update Template' : 'Add Template'}
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingTemplate(null);
                  }}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {templates.map((template) => (
                <tr key={template._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{template.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{template.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => setEditingTemplate(template)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteTemplate(template._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EmailTemplates;