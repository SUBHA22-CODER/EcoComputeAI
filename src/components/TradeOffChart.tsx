import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Lightbulb } from 'lucide-react';
import { motion } from 'motion/react';

interface TradeOffChartProps {
  metrics?: {
    baseline: { energy: string; accuracy: string };
    optimized: { energy: string; accuracy: string; energyChange?: string };
  };
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const isOptimized = label === 'OPTIMIZED MODEL';
    return (
      <div className="bg-neutral-900 border border-neutral-700 p-4 rounded-lg shadow-xl">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">{label}</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-slate-500"></div>
              <span className="text-sm text-slate-300">Energy</span>
            </div>
            <span className="text-sm font-bold text-white">{payload[0].value} kWh</span>
          </div>
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-primary"></div>
              <span className="text-sm text-slate-300">Accuracy</span>
            </div>
            <span className="text-sm font-bold text-white">{payload[1].value}%</span>
          </div>
          {isOptimized && payload[0].payload.energyChange && (
            <div className="mt-3 pt-3 border-t border-neutral-700">
              <p className="text-[10px] font-bold text-primary uppercase tracking-tighter">Efficiency Gain</p>
              <p className="text-sm text-primary font-bold">{payload[0].payload.energyChange} Energy</p>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export const TradeOffChart: React.FC<TradeOffChartProps> = ({ metrics }) => {
  const chartData = useMemo(() => {
    if (!metrics) return [
      { name: 'BASELINE MODEL', energy: 4.2, accuracy: 92.4 },
      { name: 'OPTIMIZED MODEL', energy: 1.1, accuracy: 91.8, energyChange: '-73.8%' },
    ];
    return [
      {
        name: 'BASELINE MODEL',
        energy: parseFloat(metrics.baseline.energy) || 0,
        accuracy: parseFloat(metrics.baseline.accuracy) || 0
      },
      {
        name: 'OPTIMIZED MODEL',
        energy: parseFloat(metrics.optimized.energy) || 0,
        accuracy: parseFloat(metrics.optimized.accuracy) || 0,
        energyChange: metrics.optimized.energyChange
      },
    ];
  }, [metrics]);

  const energyChangeText = metrics?.optimized.energyChange || "-73.8%";

  return (
    <section className="bg-neutral-800/50 border border-neutral-700 p-8 rounded-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h3 className="text-xl font-bold">Energy vs. Accuracy Trade-off</h3>
          <p className="text-slate-400 text-sm">Visualizing the correlation between power consumption and inference precision.</p>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-sm bg-slate-600"></span>
            <span>Energy (kWh)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-sm bg-primary"></span>
            <span>Accuracy (%)</span>
          </div>
        </div>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            barGap={12}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#244730" vertical={false} />
            <XAxis
              dataKey="name"
              axisLine={{ stroke: '#244730' }}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }}
              dy={10}
            />
            <YAxis hide />
            <Tooltip
              cursor={{ fill: 'rgba(25, 230, 94, 0.05)' }}
              content={<CustomTooltip />}
            />
            <Bar
              dataKey="energy"
              fill="#475569"
              radius={[4, 4, 0, 0]}
              barSize={64}
              isAnimationActive={true}
              animationDuration={1500}
              animationEasing="ease-out"
            />
            <Bar
              dataKey="accuracy"
              fill="#19e65e"
              radius={[4, 4, 0, 0]}
              barSize={64}
              isAnimationActive={true}
              animationDuration={1500}
              animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <motion.div
        key={energyChangeText}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, bounce: 0.5 }}
        className="mt-14 p-4 bg-primary/5 border border-primary/20 rounded-lg flex items-center gap-4"
      >
        <Lightbulb className="text-primary size-6 flex-shrink-0" />
        <p className="text-sm text-slate-300">
          <span className="font-bold text-primary">Insight:</span> By applying 8-bit quantization and 40% pruning, you reduced energy consumption by <span className="text-white font-bold">{energyChangeText.replace('-', '')}</span> while retaining <span className="text-white font-bold">{chartData[1].accuracy}%</span> of the original model accuracy.
        </p>
      </motion.div>
    </section>
  );
};
