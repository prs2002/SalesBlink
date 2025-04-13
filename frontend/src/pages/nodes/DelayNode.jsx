import { Handle, Position } from 'reactflow';
import { Clock } from 'lucide-react';

export function DelayNode({ data }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-green-200 min-w-[200px]">
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center gap-2">
        <Clock className="w-5 h-5 text-green-500" />
        <div className="font-medium">Wait/Delay</div>
      </div>
      <div className="mt-2 space-y-2">
        <input
          type="number"
          className="w-full p-2 border rounded"
          placeholder="Delay amount"
          min="1"
          value={data.delayMinutes || ''}
          onChange={(e) => {
            data.delayMinutes = parseInt(e.target.value);
          }}
        />
        <select 
          className="w-full p-2 border rounded"
          value={data.delayUnit || 'minutes'}
          onChange={(e) => {
            data.delayUnit = e.target.value;
            // Convert to minutes based on unit
            if (e.target.value === 'hours') {
              data.delayMinutes = (data.delayMinutes || 0) * 60;
            } else if (e.target.value === 'days') {
              data.delayMinutes = (data.delayMinutes || 0) * 24 * 60;
            }
          }}
        >
          <option value="minutes">Minutes</option>
          <option value="hours">Hours</option>
          <option value="days">Days</option>
        </select>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}