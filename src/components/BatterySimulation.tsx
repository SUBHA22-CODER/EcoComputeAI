import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BatteryCharging, BatteryWarning, Play, RotateCcw } from 'lucide-react';
import { cn } from '../types';

interface BatterySimulationProps {
    optimizedFactor?: number; // How many times better is the optimized version (e.g., 3.8)
}

export const BatterySimulation: React.FC<BatterySimulationProps> = ({ optimizedFactor = 3.8 }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [simulationKey, setSimulationKey] = useState(0);

    const baselineDuration = 4; // seconds to drain
    const optimizedDuration = baselineDuration * optimizedFactor;

    const handleStart = () => {
        setIsPlaying(true);
        setSimulationKey(prev => prev + 1); // Reset animations
    };

    const handleReset = () => {
        setIsPlaying(false);
    };

    // Auto reset after optimized finishes
    useEffect(() => {
        if (isPlaying) {
            const timer = setTimeout(() => {
                setIsPlaying(false);
            }, optimizedDuration * 1000 + 500);
            return () => clearTimeout(timer);
        }
    }, [isPlaying, optimizedDuration]);

    return (
        <div className="bg-neutral-800/30 border border-neutral-700 p-6 rounded-xl flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="space-y-4 md:w-1/3">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <BatteryCharging className="text-primary size-5" />
                    Mobile Battery Drain
                </h3>
                <p className="text-slate-400 text-sm">
                    See the real-world impact of your optimization on edge devices.
                    The optimized model enables up to <strong className="text-white">{optimizedFactor.toFixed(1)}x more inferences</strong> on a single charge.
                </p>

                {!isPlaying ? (
                    <button
                        onClick={handleStart}
                        className="flex items-center gap-2 bg-primary text-background-dark px-4 py-2 rounded-lg font-bold text-sm hover:bg-primary/90 transition-all"
                    >
                        <Play className="size-4" /> Run Simulation
                    </button>
                ) : (
                    <button
                        onClick={handleReset}
                        className="flex items-center gap-2 bg-neutral-700 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-neutral-600 transition-all"
                    >
                        <RotateCcw className="size-4" /> Reset
                    </button>
                )}
            </div>

            <div className="flex-1 flex gap-8 items-end justify-center w-full">
                {/* Baseline Battery */}
                <div className="flex flex-col items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Baseline</span>
                    <div className="w-24 h-48 bg-neutral-900 border-4 border-neutral-700 rounded-xl relative overflow-hidden flex flex-col justify-end p-1">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-3 bg-neutral-700 rounded-t-sm" />
                        <motion.div
                            key={`base-${simulationKey}`}
                            initial={{ height: '100%', backgroundColor: '#ef4444' }}
                            animate={isPlaying ? { height: '5%', backgroundColor: '#7f1d1d' } : { height: '100%', backgroundColor: '#22c55e' }}
                            transition={{ duration: isPlaying ? baselineDuration : 0.5, ease: 'linear' }}
                            className="w-full rounded-md relative flex items-center justify-center overflow-hidden"
                        >
                            {!isPlaying && <span className="absolute text-background-dark font-black text-xl rotate-90">100%</span>}
                        </motion.div>
                    </div>
                    {isPlaying && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: baselineDuration }}
                            className="flex items-center gap-1 text-red-400 text-xs font-bold bg-red-400/10 px-2 py-1 rounded"
                        >
                            <BatteryWarning className="size-3" /> Dead
                        </motion.div>
                    )}
                </div>

                {/* Optimized Battery */}
                <div className="flex flex-col items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">Sustainability v2</span>
                    <div className="w-24 h-48 bg-neutral-900 border-4 border-primary/40 rounded-xl relative overflow-hidden flex flex-col justify-end p-1 shadow-[0_0_30px_rgba(46,204,113,0.15)]">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-3 bg-primary/40 rounded-t-sm" />

                        {/* Animated charging particles (visible only when not playing) */}
                        {!isPlaying && (
                            <motion.div
                                animate={{ y: [-10, -50], opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute inset-x-0 bottom-0 text-center text-background-dark opacity-50 z-10"
                            >
                                ⚡
                            </motion.div>
                        )}

                        <motion.div
                            key={`opt-${simulationKey}`}
                            initial={{ height: '100%', backgroundColor: '#2ecc71' }}
                            animate={isPlaying ? { height: '5%', backgroundColor: '#f59e0b' } : { height: '100%', backgroundColor: '#2ecc71' }}
                            transition={{ duration: isPlaying ? optimizedDuration : 0.5, ease: 'linear' }}
                            className="w-full rounded-md relative flex items-center justify-center shadow-[inset_0_0_20px_rgba(255,255,255,0.2)]"
                        >
                            {!isPlaying && <span className="absolute text-background-dark font-black text-xl rotate-90">100%</span>}
                        </motion.div>
                    </div>
                    {isPlaying && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: optimizedDuration }}
                            className="flex items-center gap-1 text-yellow-500 text-xs font-bold bg-yellow-500/10 px-2 py-1 rounded"
                        >
                            <BatteryWarning className="size-3" /> Dead
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};
