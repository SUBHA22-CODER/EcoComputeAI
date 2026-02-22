import React from 'react';
import { cn } from '../types';

export interface HistoryRecord {
  timestamp: string;
  version: string;
  delta: string;
  energy: string;
  status: string;
}

interface HistoryTableProps {
  history: HistoryRecord[];
}

export const HistoryTable: React.FC<HistoryTableProps> = ({ history }) => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-lg font-bold">Historical Efficiency Gains</h3>
        <a href="#" className="text-sm text-primary font-medium hover:underline">View All History</a>
      </div>
      <div className="bg-neutral-800/20 border border-neutral-700 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-800/50 text-slate-500 uppercase text-[10px] font-bold tracking-widest">
            <tr>
              <th className="px-6 py-4">Timestamp</th>
              <th className="px-6 py-4">Version</th>
              <th className="px-6 py-4">Delta Accuracy</th>
              <th className="px-6 py-4">Energy (kWh)</th>
              <th className="px-6 py-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-700">
            {history.map((row, i) => (
              <tr key={i} className="hover:bg-neutral-800/30 transition-colors">
                <td className="px-6 py-4 text-slate-400">{row.timestamp}</td>
                <td className="px-6 py-4 font-medium">{row.version}</td>
                <td className="px-6 py-4 text-primary">{row.delta}</td>
                <td className="px-6 py-4">{row.energy}</td>
                <td className="px-6 py-4 text-right">
                  <span className={cn(
                    "px-2 py-1 rounded text-[10px] font-bold",
                    row.status === 'OPTIMIZED' ? "bg-primary/20 text-primary" : "bg-neutral-700 text-slate-400"
                  )}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
