import { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { Mail, Plus, Eye, Edit } from 'lucide-react';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_URL;

export function EmailNode({ data, id }) {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
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

  const handleTemplateSelect = async (templateId) => {
    if (templateId === 'new') {
      setShowEditor(true);
      setShowPreview(false);
      return;
    }

    const template = templates.find(t => t._id === templateId);
    if (template) {
      setSelectedTemplate(template);
      data.template = template;
    }
  };

  const handleCreateTemplate = async () => {
    try {
      await axios.post(`${BASE_URL}/api/email/add-email`,newTemplate , {
        withCredentials: true, // <-- Important!
      });
      setShowEditor(false);
      setNewTemplate({ name: '', subject: '', content: '' });
      fetchTemplates();
    } catch (error) {
      console.error('Error creating template:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-blue-200 min-w-[300px]">
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center gap-2 mb-4">
        <Mail className="w-5 h-5 text-blue-500" />
        <div className="font-medium">Cold Email</div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <select
            className="flex-1 p-2 border rounded"
            onChange={(e) => handleTemplateSelect(e.target.value)}
            value={selectedTemplate?._id || ''}
          >
            <option value="">Select Template...</option>
            {templates.map((template) => (
              <option key={template._id} value={template._id}>
                {template.name}
              </option>
            ))}
            <option value="new">➕ Create New Template</option>
          </select>
          {selectedTemplate && (
            <>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="p-2 text-gray-600 hover:text-blue-500"
                title="Preview Template"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowEditor(!showEditor)}
                className="p-2 text-gray-600 hover:text-blue-500"
                title="Edit Template"
              >
                <Edit className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {showPreview && selectedTemplate && (
          <div className="border rounded p-3 space-y-2">
            <div className="font-medium">{selectedTemplate.subject}</div>
            <div className="text-sm text-gray-600">{selectedTemplate.content}</div>
          </div>
        )}

        {showEditor && (
          <div className="border rounded p-3 space-y-3">
            <input
              type="text"
              placeholder="Template Name"
              className="w-full p-2 border rounded"
              value={newTemplate.name}
              onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Subject"
              className="w-full p-2 border rounded"
              value={newTemplate.subject}
              onChange={(e) => setNewTemplate({ ...newTemplate, subject: e.target.value })}
            />
            <textarea
              placeholder="Email Content"
              className="w-full p-2 border rounded h-32"
              value={newTemplate.content}
              onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}
            />
            <button
              onClick={handleCreateTemplate}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Template
            </button>
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}