import { create } from 'zustand';
import { applyNodeChanges, applyEdgeChanges } from 'reactflow';

export const useFlowStore = create((set, get) => ({
  nodes: [],
  edges: [],

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

  saveFlow: () => {
    const { nodes, edges } = get();
    console.log('Saving flow:', { nodes, edges });
  },
}));