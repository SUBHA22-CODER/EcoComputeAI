import { LucideIcon } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Metric {
  label: string;
  value: string;
  unit?: string;
  change?: string;
  isPositive?: boolean;
}

export interface ModelStats {
  accuracy: string;
  energy: string;
  time: string;
  accuracyChange?: string;
  energyChange?: string;
  timeChange?: string;
}
