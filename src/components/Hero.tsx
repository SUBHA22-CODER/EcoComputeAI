import React from 'react';
import { TrendingUp, Verified, Trees } from 'lucide-react';
import { Gauge } from './Gauge';

interface HeroProps {
  ecoScore: number;
}

export const Hero: React.FC<HeroProps> = ({ ecoScore }) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-neutral-800/50 border border-neutral-700 p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="space-y-4 relative z-10">
          <h2 className="text-3xl font-bold">System Sustainability</h2>
          <p className="text-slate-400 max-w-md">
            Your AI model optimization has achieved significant energy reductions while maintaining target accuracy thresholds.
          </p>
          <div className="flex gap-4 pt-2">
            <div className="flex items-center gap-2 text-primary bg-primary/10 px-3 py-1.5 rounded-full text-sm font-bold">
              <TrendingUp className="size-4" />
              +12% Efficiency
            </div>
            <div className="flex items-center gap-2 text-slate-300 bg-neutral-700 px-3 py-1.5 rounded-full text-sm font-bold">
              <Verified className="size-4" />
              Verified Optimization
            </div>
          </div>
        </div>
        <Gauge value={ecoScore} label="EcoScore" />
      </div>

      <div className="bg-neutral-800/50 border border-neutral-700 p-8 rounded-xl flex flex-col justify-center gap-6">
        <div>
          <p className="text-slate-400 text-sm font-medium mb-1">Estimated Annual Savings</p>
          <h3 className="text-4xl font-bold text-white tracking-tight">
            ₹11,85,240<span className="text-lg font-normal text-slate-500 ml-2">INR</span>
          </h3>
        </div>
        <div className="h-px bg-neutral-700 w-full"></div>
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
            <Trees className="size-6" />
          </div>
          <div>
            <p className="text-white font-bold">428 Trees</p>
            <p className="text-slate-400 text-sm">Carbon offset equivalent</p>
          </div>
        </div>
      </div>
    </section>
  );
};
