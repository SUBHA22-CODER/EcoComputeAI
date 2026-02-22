import React from 'react';
import { Leaf, Bell, RefreshCw, Search, Moon, Sun } from 'lucide-react';
import { cn } from '../types';

interface HeaderProps {
  onRecalculate: () => void;
  onOpenSettings: () => void;
  isRecalculating?: boolean;
  currentTab: string;
  onTabChange: (tab: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onRecalculate,
  onOpenSettings,
  isRecalculating,
  currentTab,
  onTabChange,
  isDarkMode,
  toggleDarkMode,
  searchQuery,
  onSearchChange
}) => {
  return (
    <header className="border-b border-neutral-700 bg-background-dark sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-1.5 rounded-lg">
            <Leaf className="text-background-dark size-5 fill-current" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">
            EcoCompute <span className="text-primary">AI</span>
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'experiments', label: 'Experiments' },
            { id: 'resources', label: 'Resources' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "text-sm font-medium transition-colors pb-1 border-b-2",
                currentTab === tab.id
                  ? "text-primary border-primary"
                  : "text-slate-400 border-transparent hover:text-primary"
              )}
            >
              {tab.label}
            </button>
          ))}
          <button
            onClick={onOpenSettings}
            className="text-sm font-medium text-slate-400 hover:text-primary transition-colors"
          >
            Settings
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4" />
            <input
              type="text"
              placeholder="Search experiments..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="bg-neutral-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-primary w-64 transition-all"
            />
          </div>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 transition-all text-slate-300"
          >
            {isDarkMode ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </button>
          <button className="p-2 rounded-lg bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 transition-all">
            <Bell className="size-5 text-slate-300" />
          </button>
          <button
            onClick={onRecalculate}
            disabled={isRecalculating}
            className="bg-primary text-background-dark px-4 py-2 rounded-lg font-bold text-sm hover:opacity-90 disabled:opacity-50 transition-all flex items-center gap-2"
          >
            <RefreshCw className={cn("size-4", isRecalculating && "animate-spin")} />
            {isRecalculating ? 'Recalculating...' : 'Recalculate'}
          </button>
        </div>
      </div>
    </header>
  );
};
