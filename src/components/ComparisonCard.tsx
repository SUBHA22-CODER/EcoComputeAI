import React from 'react';
import { cn } from '../types';

interface ComparisonCardProps {
  title: string;
  type: 'baseline' | 'optimized';
  accuracy: string;
  energy: string;
  time: string;
  accuracyChange?: string;
  energyChange?: string;
  timeChange?: string;
  isHighEfficiency?: boolean;
}

export const ComparisonCard: React.FC<ComparisonCardProps> = ({
  title,
  type,
  accuracy,
  energy,
  time,
  accuracyChange,
  energyChange,
  timeChange,
  isHighEfficiency
}) => {
  const isOptimized = type === 'optimized';

  return (
    <div className={cn(
      "p-6 rounded-xl relative group transition-all",
      isOptimized 
        ? "bg-neutral-800/50 border border-primary/30 shadow-lg shadow-primary/5" 
        : "bg-neutral-800/30 border border-neutral-700 hover:border-slate-600"
    )}>
      {isOptimized && (
        <div className="absolute -top-3 right-6 bg-primary text-background-dark px-3 py-1 rounded text-xs font-bold">
          OPTIMIZED
        </div>
      )}
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <span className={cn(
            "size-3 rounded-full",
            isOptimized ? "bg-primary animate-pulse" : "bg-slate-500"
          )}></span>
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
        <span className={cn(
          "text-xs font-bold uppercase tracking-widest",
          isOptimized ? "text-primary" : "text-slate-500"
        )}>
          {isHighEfficiency ? "High Efficiency" : "Standard"}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-1">
          <p className={cn("text-xs font-bold uppercase", isOptimized ? "text-primary/60" : "text-slate-500")}>Accuracy</p>
          <p className={cn("text-2xl font-bold", isOptimized ? "text-white" : "text-slate-100")}>{accuracy}</p>
          {accuracyChange && <p className="text-xs text-red-400 font-medium">{accuracyChange}</p>}
        </div>
        <div className="space-y-1">
          <p className={cn("text-xs font-bold uppercase", isOptimized ? "text-primary/60" : "text-slate-500")}>Energy</p>
          <p className={cn("text-2xl font-bold", isOptimized ? "text-primary" : "text-slate-100")}>
            {energy} <span className={cn("text-sm font-normal", isOptimized ? "opacity-60" : "text-slate-500")}>kWh</span>
          </p>
          {energyChange && <p className="text-xs text-primary font-medium">{energyChange}</p>}
        </div>
        <div className="space-y-1">
          <p className={cn("text-xs font-bold uppercase", isOptimized ? "text-primary/60" : "text-slate-500")}>Time</p>
          <p className={cn("text-2xl font-bold", isOptimized ? "text-white" : "text-slate-100")}>
            {time} <span className={cn("text-sm font-normal", isOptimized ? "opacity-60" : "text-slate-500")}>ms</span>
          </p>
          {timeChange && <p className="text-xs text-primary font-medium">{timeChange}</p>}
        </div>
      </div>
    </div>
  );
};
