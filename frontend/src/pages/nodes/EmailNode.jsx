import React from 'react';
import { Handle, Position } from 'reactflow';
import { Mail } from 'lucide-react';

export function EmailNode({ data }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-blue-200 min-w-[200px]">
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center gap-2">
        <Mail className="w-5 h-5 text-blue-500" />
        <div className="font-medium">Cold Email</div>
      </div>
      <div className="mt-2">
        <select className="w-full p-2 border rounded">
          <option value="">Select Template...</option>
          <option value="template1">Welcome Email</option>
          <option value="template2">Follow Up</option>
          <option value="template3">Product Update</option>
        </select>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}