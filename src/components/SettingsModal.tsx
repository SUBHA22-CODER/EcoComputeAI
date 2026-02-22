import React from 'react';
import { X, Settings, Database, Cpu, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative bg-neutral-900 border border-neutral-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
                    >
                        <div className="flex items-center justify-between p-6 border-b border-neutral-800">
                            <div className="flex items-center gap-3">
                                <Settings className="text-primary size-5" />
                                <h2 className="text-xl font-bold text-white">Project Settings</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-neutral-800 rounded-lg transition-colors text-slate-400 hover:text-white"
                            >
                                <X className="size-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Optimization Parameters</h3>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-xl border border-neutral-800">
                                        <div className="flex items-center gap-3">
                                            <Cpu className="size-5 text-blue-400" />
                                            <div>
                                                <p className="font-medium text-white text-sm">Quantization Level</p>
                                                <p className="text-xs text-slate-500">INT8 Precision</p>
                                            </div>
                                        </div>
                                        <select className="bg-neutral-900 border-neutral-700 rounded-md text-xs py-1 px-2 text-white outline-none focus:ring-1 focus:ring-primary">
                                            <option>INT8</option>
                                            <option>FP16</option>
                                            <option>BF16</option>
                                        </select>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-xl border border-neutral-800">
                                        <div className="flex items-center gap-3">
                                            <Zap className="size-5 text-yellow-400" />
                                            <div>
                                                <p className="font-medium text-white text-sm">Pruning Rate</p>
                                                <p className="text-xs text-slate-500">Unstructured pruning</p>
                                            </div>
                                        </div>
                                        <input type="range" className="w-24 accent-primary" />
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-xl border border-neutral-800">
                                        <div className="flex items-center gap-3">
                                            <Database className="size-5 text-purple-400" />
                                            <div>
                                                <p className="font-medium text-white text-sm">Caching Tier</p>
                                                <p className="text-xs text-slate-500">Edge distribution</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-4 bg-primary/20 rounded-full relative cursor-pointer">
                                                <div className="absolute right-0 top-0 size-4 bg-primary rounded-full" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    onClick={onClose}
                                    className="flex-1 bg-primary text-background-dark py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition-all"
                                >
                                    Save Changes
                                </button>
                                <button
                                    onClick={onClose}
                                    className="flex-1 bg-neutral-800 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-neutral-700 transition-all border border-neutral-700"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
