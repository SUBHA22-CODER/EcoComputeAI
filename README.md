<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
# EcoCompute AI: Sustainable AI Training Optimizer

## The Problem
Training and running Large Language Models (LLMs) and complex AI architectures requires massive computational power, leading to immense carbon footprints and high energy costs. Currently, developers lack real-time visibility into the environmental impact of their AI pipelines, making it impossible to optimize for sustainability without sacrificing accuracy. 

## Our Solution
**EcoCompute AI** is a lightweight, real-time sustainability cockpit designed specifically for AI researchers and ML engineers. It provides a beautiful, interactive dashboard that visualizes the direct trade-offs between model accuracy and energy consumption, empowering teams to build "Greener AI."

It simulates optimization techniques—like **8-bit Quantization** and **Layer Pruning**—to demonstrate how minimal compromises in a model's precision can yield massive reductions in carbon intensity and inference costs.

---

## 🎯 Key Features Demonstrated in the App

### 1. The Real-Time "EcoScore" Gauge
*   **What it does:** A dynamic, beautifully animated ring gauge that calculates a weighted **EcoScore**.
*   **The Math:** It scores the model based on **Accuracy Retention (40%)** and **Energy Reduction (60%)**, immediately showing the user the overall sustainability grade of their current architecture.

### 2. Live Baseline vs. Sustainability Model Comparison
*   **What it does:** Side-by-side metric cards contrasting a standard "Baseline Model" against the newly generated "Sustainability Model v2".
*   **Metrics Tracked:** Shows precise percentage changes for GPU Utilization, Memory Footprint, CO2 Intensity, and Inference Costs (calculated in INR).

### 3. Energy vs. Accuracy Trade-off Visualizer
*   **What it does:** An animated chart (built with Recharts) that maps out the correlation between Power Consumption (kWh) and Inference Precision (%).
*   **Why it matters:** It visually proves to stakeholders that you can slash energy by ~74% while losing less than 1% of model accuracy.

### 4. Interactive Mobile Battery Simulation
*   **What it does:** A side-by-side visual simulation of device battery drain. 
*   **Why it matters:** Edge computing is huge. This shows how "Green AI" directly impacts the end-user. It visually demonstrates that an optimized model allows a mobile device to perform **5.3x more inferences** on a single battery charge.

### 5. Verified Historical Efficiency Logging
*   **What it does:** A dynamic data table that logs every optimization run.
*   **The Tech:** Every time parameters are recalculated, it injects a new row into the table with a **real-time system timestamp** and auto-incrementing version numbers. This proves the dashboard handles live data states.

### 6. Built-in "Dark/Light" Mode
*   **What it does:** A premium UI toggle that smoothly transitions the entire application between a deep, sleek dark mode and a clean, legible light mode.

### 7. Instant Experiment Searching
*   **What it does:** A global search bar in the header. 
*   **The Tech:** Typing an experiment name instantly auto-navigates to the **Experiments** tab and filters the visible logs in real-time. 

---

## 💻 Technical Stack
*   **Frontend Framework:** React 18 with Vite
*   **Styling:** Tailwind CSS v4 using CSS variables for theming
*   **Animations:** `framer-motion` (Motion for React)
*   **Data Visualization:** `recharts` 
*   **Icons:** `lucide-react`
*   **Deployment:** Vercelpm run dev`
