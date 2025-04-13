import { create } from 'zustand';
import { applyNodeChanges, applyEdgeChanges } from 'reactflow';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_API_URL;

export const useFlowStore = create((set, get) => ({
  
  nodes: [],
  edges: [],
  flowId: undefined,

  addNode: (type, position) => {
    const newNode = {
      id: `${type}-${Date.now()}`,
      type,
      position: {
        x: position?.x ?? 100,
        y: position?.y ?? 100
      },
      data: { label: type },
    };

    set((state) => ({
      nodes: [...state.nodes, newNode],
    }));
  },

  onNodesChange: (changes) => {
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    }));
  },

  onEdgesChange: (changes) => {
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    }));
  },

  onConnect: (params) => {
    const newEdge = {
      id: `edge-${Date.now()}`,
      source: params.source,
      target: params.target,
    };

    set((state) => ({
      edges: [...state.edges, newEdge],
    }));
  },

  saveFlow: async () => {
    const { nodes, edges } = get();
    
    // Find email template and contacts from nodes
    const emailNode = nodes.find(node => node.type === 'emailNode');
    const leadSourceNode = nodes.find(node => node.type === 'leadSourceNode');
    
    const flowData = {
      userId: "your-user-id", // Replace with actual user ID
      name: "Email Sequence", // You might want to make this configurable
      status: "draft",
      emailTemplateId: emailNode?.data?.template?._id,
      contactIds: leadSourceNode?.data?.contact ? [leadSourceNode.data.contact._id] : [],
      nodes,
      edges,
    };

    try {
      const response = await axios.post(`${BASE_URL}/api/campaign/add-campaign`, flowData, {
        withCredentials: true, // <-- Important!
      });
      set({ flowId: response.data._id });
      console.log('Flow saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving flow:', error);
    }
  },

  scheduleEmails: async () => {
    const { flowId } = get();
    if (!flowId) {
      console.error('No flow ID available. Please save the flow first.');
      return;
    }

    // Find delay node to get delay minutes
    const delayNode = get().nodes.find(node => node.type === 'delayNode');
    const delayMinutes = delayNode?.data?.delayMinutes || 0;

    const scheduleData = {
      campaignId: flowId,
      createdAt: new Date().toISOString(),
      delayMinutes: delayMinutes
    };

    try {
      const response = await axios.post(`${BASE_URL}/api/schedule/email`, scheduleData, {
        withCredentials: true, // <-- Important!
      });
      console.log('Emails scheduled successfully:', response.data);
    } catch (error) {
      console.error('Error scheduling emails:', error);
    }
  },
}));