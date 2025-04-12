import React from 'react';
import { Handle, Position } from 'reactflow';
import { Users } from 'lucide-react';

export function LeadSourceNode({ data }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-purple-200 min-w-[200px]">
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center gap-2">
        <Users className="w-5 h-5 text-purple-500" />
        <div className="font-medium">Lead Source</div>
      </div>
      <div className="mt-2">
        <select className="w-full p-2 border rounded">
          <option value="">Select Source...</option>
          <option value="website">Website</option>
          <option value="linkedin">LinkedIn</option>
          <option value="referral">Referral</option>
        </select>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}