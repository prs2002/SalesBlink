import { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Plus, Save, Send } from 'lucide-react';
import { useFlowStore } from "../store/flowStore";
import { EmailNode } from './nodes/EmailNode';
import { DelayNode } from './nodes/DelayNode';
import { LeadSourceNode } from './nodes/LeadSourceNode';

const nodeTypes = {
  emailNode: EmailNode,
  delayNode: DelayNode,
  leadSourceNode: LeadSourceNode,
};

const FlowEditor = () => {

  const {
    nodes,
    edges,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    saveFlow,
    scheduleEmails
  } = useFlowStore();

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      const position = {
        x: event.clientX - 100,
        y: event.clientY - 50,
      };

      addNode(type, position);
    },
    [addNode]
  );

  return (
    <div className="w-screen h-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <Background />
        <Controls />
        <Panel position="top-right" className="space-x-2">
          <button
            onClick={() => addNode('leadSourceNode', { x: 100, y: 300 })}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Leads
          </button>
          <button
            onClick={() => addNode('emailNode', { x: 100, y: 100 })}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Email
          </button>
          <button
            onClick={() => addNode('delayNode', { x: 100, y: 200 })}
            className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Delay
          </button>
          <button
            onClick={saveFlow}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Flow
          </button>
          <button
            onClick={scheduleEmails}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Schedule Emails
          </button>
        </Panel>
      </ReactFlow>
    </div>
  );

};

export default FlowEditor;