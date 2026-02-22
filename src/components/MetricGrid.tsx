import React from 'react';

interface MetricCardProps {
  label: string;
  value: string;
  change: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, change }) => (
  <div className="bg-neutral-800/30 border border-neutral-700 p-5 rounded-xl">
    <p className="text-xs font-bold text-slate-500 uppercase mb-2">{label}</p>
    <div className="flex items-end justify-between">
      <h4 className="text-2xl font-bold">{value}</h4>
      <span className="text-xs text-primary">{change}</span>
    </div>
  </div>
);

export const MetricGrid: React.FC = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <MetricCard label="GPU Utilization" value="34%" change="-18% v. baseline" />
      <MetricCard label="Memory Footprint" value="1.2GB" change="-2.8GB v. baseline" />
      <MetricCard label="CO2 Intensity" value="120g" change="-340g / 1k runs" />
      <MetricCard label="Inference Cost" value="₹0.17" change="75% Reduction" />
    </section>
  );
};
