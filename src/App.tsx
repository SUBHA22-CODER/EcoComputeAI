import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ComparisonCard } from './components/ComparisonCard';
import { TradeOffChart } from './components/TradeOffChart';
import { MetricGrid } from './components/MetricGrid';
import { HistoryTable } from './components/HistoryTable';
import { SettingsModal } from './components/SettingsModal';
import { BatterySimulation } from './components/BatterySimulation';
import { motion } from 'motion/react';
import { cn } from './types';

const mockExperiments = [
  { id: 1025, name: 'Layer Pruning v1', time: 'Completed 2h ago' },
  { id: 1026, name: '8-bit Quantization (INT8)', time: 'Completed 4h ago' },
  { id: 1027, name: 'LoRA Fine-tuning subset', time: 'Completed 1d ago' },
  { id: 1028, name: 'FP16 Baseline Check', time: 'Completed 1d ago' },
  { id: 1029, name: 'Sparse Attention Test', time: 'Completed 2d ago' },
];

export default function App() {
  const [isRecalculating, setIsRecalculating] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedResource, setSelectedResource] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [metrics, setMetrics] = useState({
    baseline: { accuracy: "92.4%", energy: "4.2", time: "1,240" },
    optimized: {
      accuracy: "91.8%",
      energy: "1.1",
      time: "310",
      accuracyChange: "-0.6%",
      energyChange: "-73.8%",
      timeChange: "4x Faster"
    }
  });

  const [historyRecords, setHistoryRecords] = useState([
    {
      timestamp: new Intl.DateTimeFormat('en-US', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date()),
      version: 'v4.0.2-final',
      delta: '-0.6%',
      energy: '1.1',
      status: 'OPTIMIZED'
    }
  ]);

  // Dynamic EcoScore based on accuracy retention and energy reduction
  const ecoScore = (() => {
    const accBase = parseFloat(metrics.baseline.accuracy) || 1;
    const accOpt = parseFloat(metrics.optimized.accuracy) || 0;
    const eneBase = parseFloat(metrics.baseline.energy) || 1;
    const eneOpt = parseFloat(metrics.optimized.energy) || 1;

    const accuracyRetention = (accOpt / accBase);
    const energyReduction = Math.max(0, 1 - (eneOpt / eneBase));

    // Weighted score: 40% accuracy, 60% energy saving
    // Shift energy weight to be more visible (energy is the main focus)
    const score = (accuracyRetention * 40) + (energyReduction * 60);
    return isNaN(score) ? 0 : Math.min(100, Math.max(0, Math.round(score)));
  })();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [isDarkMode]);

  const handleRecalculate = useCallback(() => {
    setIsRecalculating(true);

    setTimeout(() => {
      setMetrics(prev => {
        const energyFloat = parseFloat(prev.optimized.energy);
        // Decrease energy by 5-15% each time for visible changes
        const newEnergy = (energyFloat * (0.85 + Math.random() * 0.1)).toFixed(1);
        const newAccuracy = (parseFloat(prev.optimized.accuracy) * (0.97 + Math.random() * 0.04)).toFixed(1);

        const nextEnergy = newEnergy;
        const nextAccuracy = newAccuracy + "%";
        const nextDelta = `${(((parseFloat(newAccuracy) / parseFloat(prev.baseline.accuracy)) - 1) * 100).toFixed(1)}%`;

        setHistoryRecords(prevHistory => {
          const newRecord = {
            timestamp: new Intl.DateTimeFormat('en-US', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date()),
            version: `v4.0.${prevHistory.length + 2}-run`,
            delta: nextDelta,
            energy: nextEnergy,
            status: 'OPTIMIZED'
          };
          return [newRecord, ...prevHistory].slice(0, 5); // Keep last 5
        });

        return {
          ...prev,
          optimized: {
            ...prev.optimized,
            energy: newEnergy,
            accuracy: nextAccuracy,
            energyChange: `${(((parseFloat(newEnergy) / parseFloat(prev.baseline.energy)) - 1) * 100).toFixed(1)}%`
          }
        };
      });
      setIsRecalculating(false);
    }, 2000);
  }, []);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query && activeTab !== 'experiments') {
      setActiveTab('experiments');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onRecalculate={handleRecalculate}
        onOpenSettings={() => setIsSettingsOpen(true)}
        isRecalculating={isRecalculating}
        currentTab={activeTab}
        onTabChange={setActiveTab}
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(prev => !prev)}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      <main className="max-w-7xl mx-auto px-6 py-8 w-full space-y-8">
        {activeTab === 'overview' && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Hero ecoScore={ecoScore} />
            </motion.div>

            <motion.section
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <ComparisonCard
                title="Baseline Model"
                type="baseline"
                accuracy={metrics.baseline.accuracy}
                energy={metrics.baseline.energy}
                time={metrics.baseline.time}
              />
              <ComparisonCard
                title="Sustainability Model v2"
                type="optimized"
                accuracy={metrics.optimized.accuracy}
                energy={metrics.optimized.energy}
                time={metrics.optimized.time}
                accuracyChange={metrics.optimized.accuracyChange}
                energyChange={metrics.optimized.energyChange}
                timeChange={metrics.optimized.timeChange}
                isHighEfficiency
              />
            </motion.section>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <BatterySimulation optimizedFactor={parseFloat(metrics.baseline.energy) / parseFloat(metrics.optimized.energy)} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <TradeOffChart metrics={metrics} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <MetricGrid />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <HistoryTable history={historyRecords} />
            </motion.div>
          </>
        )}

        {activeTab === 'experiments' && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="bg-neutral-800/30 border border-neutral-700 p-12 rounded-2xl text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Experiment Logs</h2>
            <p className="text-slate-400">Track and manage your sustainability ablation studies here.</p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockExperiments
                .filter(exp =>
                  exp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  exp.id.toString().includes(searchQuery)
                )
                .map(exp => (
                  <div key={exp.id} className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 text-left">
                    <div className="text-xs font-bold text-primary mb-2">RUN #{exp.id}</div>
                    <div className="font-bold mb-1">{exp.name}</div>
                    <div className="text-sm text-slate-500">{exp.time}</div>
                  </div>
                ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'resources' && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col lg:flex-row gap-8"
          >
            <div className="w-full lg:w-1/3 flex flex-col gap-8">
              <div className="bg-neutral-800/30 border border-neutral-700 p-8 rounded-2xl">
                <h2 className="text-xl font-bold mb-4">Documentation</h2>
                <ul className="space-y-4 text-slate-400">
                  <li>
                    <button
                      onClick={() => setSelectedResource('guide')}
                      className={cn("hover:text-primary transition-colors text-left", selectedResource === 'guide' && "text-primary font-bold")}
                    >
                      → EcoCompute Optimization Guide
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setSelectedResource('api')}
                      className={cn("hover:text-primary transition-colors text-left", selectedResource === 'api' && "text-primary font-bold")}
                    >
                      → API Reference for Metrics
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setSelectedResource('method')}
                      className={cn("hover:text-primary transition-colors text-left", selectedResource === 'method' && "text-primary font-bold")}
                    >
                      → Carbon Footprint Calculation
                    </button>
                  </li>
                </ul>
              </div>
              <div className="bg-neutral-800/30 border border-neutral-700 p-8 rounded-2xl">
                <h2 className="text-xl font-bold mb-4">Datasets</h2>
                <ul className="space-y-4 text-slate-400">
                  <li>
                    <button
                      onClick={() => setSelectedResource('dataset-img')}
                      className={cn("hover:text-primary transition-colors text-left", selectedResource === 'dataset-img' && "text-primary font-bold")}
                    >
                      → ImageNet Sustain-v1 (50GB)
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setSelectedResource('dataset-carbon')}
                      className={cn("hover:text-primary transition-colors text-left", selectedResource === 'dataset-carbon' && "text-primary font-bold")}
                    >
                      → CarbonIntensity-Global (Daily)
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full lg:w-2/3 bg-neutral-900 border border-neutral-700 p-8 rounded-2xl min-h-[400px]">
              {!selectedResource ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500">
                  <p>Select a resource from the menu to view details.</p>
                </div>
              ) : (
                <motion.div
                  key={selectedResource}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {selectedResource === 'guide' && (
                    <div>
                      <h2 className="text-2xl font-bold mb-6 text-white">EcoCompute Optimization Guide</h2>
                      <div className="prose prose-invert">
                        <p>Welcome to the EcoCompute optimization guide. This document explains how to integrate our quantization and pruning layers into your PyTorch or TensorFlow pipelines.</p>
                        <h3>Quick Start</h3>
                        <pre className="bg-neutral-950 p-4 rounded-lg overflow-x-auto text-sm my-4 text-green-400"><code>{`import ecocompute as ec
model = load_my_model()
optimized_model = ec.optimize(model, target_accuracy=0.98)`}</code></pre>
                        <p>The <code>optimize</code> function automatically applies INT8 quantization and removes dead weight branches.</p>
                      </div>
                    </div>
                  )}
                  {selectedResource === 'api' && (
                    <div>
                      <h2 className="text-2xl font-bold mb-6 text-white">API Reference for Metrics</h2>
                      <div className="prose prose-invert">
                        <p>Use the REST API to fetch real-time energy consumption data.</p>
                        <div className="bg-neutral-950 border border-neutral-800 p-4 rounded-lg my-4">
                          <p className="font-bold text-primary mb-2">GET /v1/metrics/energy</p>
                          <p className="text-sm text-slate-400">Returns the current kWh consumed by the active inference cluster.</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedResource === 'method' && (
                    <div>
                      <h2 className="text-2xl font-bold mb-6 text-white">Carbon Footprint Methodology</h2>
                      <div className="prose prose-invert">
                        <p>Our carbon tracking uses the <strong>Software Carbon Intensity (SCI)</strong> specification.</p>
                        <ul className="list-disc pl-5 mt-4 text-slate-300">
                          <li>O = Operational emissions (Energy consumed × grid intensity)</li>
                          <li>M = Embodied emissions (Hardware manufacturing overhead)</li>
                          <li>R = Functional unit (e.g., per 1,000 inferences)</li>
                        </ul>
                      </div>
                    </div>
                  )}
                  {selectedResource.startsWith('dataset') && (
                    <div>
                      <h2 className="text-2xl font-bold mb-6 text-white">
                        {selectedResource === 'dataset-img' ? 'ImageNet Sustain-v1' : 'CarbonIntensity-Global'}
                      </h2>
                      <div className="bg-primary/10 border border-primary/20 p-6 rounded-xl flex items-center justify-between">
                        <div>
                          <p className="font-bold text-primary">Dataset Ready for Download</p>
                          <p className="text-sm text-slate-400 mt-1">Size: {selectedResource === 'dataset-img' ? '50.2 GB' : '1.4 GB CSV'}</p>
                        </div>
                        <button className="bg-primary text-background-dark font-bold px-4 py-2 rounded-lg text-sm hover:bg-primary/90">
                          Download
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </main>

      <footer className="max-w-7xl mx-auto px-6 py-8 w-full border-t border-neutral-700 text-slate-500 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© 2024 EcoCompute AI. Sustainability through optimization.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-primary transition-colors">Documentation</a>
          <a href="#" className="hover:text-primary transition-colors">API Reference</a>
          <a href="#" className="hover:text-primary transition-colors">Status</a>
        </div>
      </footer>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}
