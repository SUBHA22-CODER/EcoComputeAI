# 🌱 EcoCompute AI

<div align="center">

![EcoCompute AI Banner](https://img.shields.io/badge/EcoCompute-AI-00C853?style=for-the-badge&logo=leaf&logoColor=white)

**Sustainable AI Training Optimizer**

A real-time sustainability cockpit for AI researchers and ML engineers to visualize and optimize the environmental impact of their AI pipelines.

[![Live Demo](https://img.shields.io/badge/Demo-Live-00C853?style=flat-square&logo=vercel)](https://eco-compute-ai.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=flat-square&logo=github)](https://github.com/SUBHA22-CODER/EcoComputeAI)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)

[Live Demo](https://eco-compute-ai.vercel.app/) • [Documentation](#-documentation) • [Features](#-key-features) • [Installation](#-installation)

</div>

---

## 📋 Table of Contents

- [The Problem](#-the-problem)
- [Our Solution](#-our-solution)
- [Key Features](#-key-features)
- [Technical Architecture](#-technical-architecture)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 The Problem

Training and running Large Language Models (LLMs) and complex AI architectures requires **massive computational power**, leading to:

- 🔥 **Immense carbon footprints** from data center operations
- 💰 **High energy costs** that scale with model complexity
- 📊 **Lack of visibility** into environmental impact during development
- ⚖️ **No framework** for balancing accuracy vs. sustainability

Currently, developers lack real-time tools to optimize for sustainability without sacrificing model performance, making "Green AI" an afterthought rather than a design principle.

---

## 💡 Our Solution

**EcoCompute AI** is a lightweight, real-time sustainability dashboard that empowers AI teams to build "Greener AI" through:

✅ **Real-time visualization** of energy consumption vs. model accuracy trade-offs  
✅ **Simulation of optimization techniques** (8-bit Quantization, Layer Pruning)  
✅ **Interactive metrics** showing carbon intensity and inference costs  
✅ **Historical logging** of optimization experiments  
✅ **Mobile battery impact** simulations for edge computing scenarios  

The platform demonstrates how **minimal compromises** in model precision (< 1% accuracy loss) can yield **massive reductions** (~74%) in carbon intensity and operational costs.

---

## 🚀 Key Features

### 1. **Real-Time EcoScore Gauge** 🎯
- Dynamic ring gauge calculating weighted sustainability scores
- **Formula**: `EcoScore = (Accuracy Retention × 40%) + (Energy Reduction × 60%)`
- Beautiful animated visualization with instant feedback
- Color-coded grading system (Poor → Excellent)

### 2. **Live Model Comparison Dashboard** 📊
- Side-by-side comparison: Baseline vs. Optimized Model
- Real-time metrics:
  - GPU Utilization (%)
  - Memory Footprint (GB)
  - CO2 Intensity (kg CO2e)
  - Inference Costs (INR/1000 requests)
- Instant percentage change calculations

### 3. **Energy vs. Accuracy Visualizer** 📈
- Interactive Recharts-powered correlation graphs
- Visual proof of sustainability gains:
  - ~74% energy reduction
  - < 1% accuracy loss
- Customizable data points and time ranges

### 4. **Mobile Battery Impact Simulator** 🔋
- Side-by-side visual battery drain comparison
- Demonstrates **5.3x more inferences** per charge with optimized models
- Critical for edge computing and mobile deployment scenarios

### 5. **Historical Efficiency Logging** 📝
- Auto-logging every optimization experiment
- Real-time timestamps and version tracking
- Exportable data table for research documentation
- Searchable experiment history

### 6. **Premium Dark/Light Mode** 🌗
- Smooth theme transitions powered by CSS variables
- Persistent user preference storage
- Fully accessible contrast ratios (WCAG AAA compliant)

### 7. **Global Experiment Search** 🔍
- Instant search across all logged experiments
- Auto-navigation to filtered results
- Real-time filtering with debouncing

---

## 🏗️ Technical Architecture

### **Frontend Stack**

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Framework | 18.x |
| **Vite** | Build Tool & Dev Server | Latest |
| **Tailwind CSS** | Utility-First Styling | v4 (CSS Variables) |
| **Framer Motion** | Animation Library | Latest |
| **Recharts** | Data Visualization | Latest |
| **Lucide React** | Icon System | Latest |

### **Key Libraries**

```json
{
  "dependencies": {
    "react": "^18.x",
    "framer-motion": "^x.x.x",
    "recharts": "^x.x.x",
    "lucide-react": "^x.x.x"
  }
}
```

### **Deployment**

- **Platform**: Vercel (Edge Network)
- **CI/CD**: Automatic deployments on push to `main`
- **Performance**: Sub-second TTI (Time to Interactive)

---

## 📦 Installation

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 or **yarn** >= 1.22.0
- **Git**

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/SUBHA22-CODER/EcoComputeAI.git
   cd EcoComputeAI
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   ```
   Navigate to http://localhost:5173
   ```

### Build for Production

```bash
npm run build
npm run preview  # Preview production build locally
```

---

## 🎮 Usage

### Running Your First Simulation

1. **Navigate to the Dashboard**: View real-time baseline metrics
2. **Adjust Optimization Parameters**: 
   - Enable quantization (8-bit)
   - Configure layer pruning percentage
3. **Generate Sustainability Model**: Click "Optimize" to run simulation
4. **Analyze Results**: 
   - Check EcoScore improvement
   - Review energy vs. accuracy trade-offs
   - Examine battery impact on mobile devices
5. **Log Experiment**: Save results to historical data table

### Interpreting the EcoScore

| Score Range | Grade | Interpretation |
|-------------|-------|----------------|
| 90-100 | Excellent | Optimal sustainability with minimal accuracy loss |
| 75-89 | Good | Strong balance of efficiency and performance |
| 60-74 | Fair | Moderate optimization, room for improvement |
| < 60 | Poor | Significant trade-offs, reconsider strategy |

---

## 📁 Project Structure

```
EcoComputeAI/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── Dashboard.jsx
│   │   ├── EcoScoreGauge.jsx
│   │   ├── EnergyChart.jsx
│   │   ├── BatterySimulator.jsx
│   │   └── HistoryTable.jsx
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Helper functions
│   │   └── calculations.js
│   ├── styles/          # Global styles
│   ├── App.jsx          # Root component
│   └── main.jsx         # Entry point
├── .gitignore
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 📸 Screenshots

### Dashboard Overview
![Dashboard](https://via.placeholder.com/800x450?text=Dashboard+Screenshot)

### Energy vs. Accuracy Visualization
![Energy Chart](https://via.placeholder.com/800x450?text=Energy+Chart+Screenshot)

### Mobile Battery Impact
![Battery Simulator](https://via.placeholder.com/800x450?text=Battery+Simulator+Screenshot)

*Add your actual screenshots here*

---

## 🗺️ Roadmap

### Phase 1: Current Features ✅
- [x] Real-time EcoScore calculation
- [x] Interactive visualizations
- [x] Historical experiment logging
- [x] Dark/Light mode theming

### Phase 2: Upcoming Features 🚧
- [ ] **Integration with real ML frameworks** (TensorFlow, PyTorch)
- [ ] **Export reports** to PDF/CSV formats
- [ ] **Multi-model comparisons** (GPT, BERT, ViT)
- [ ] **Cloud provider cost calculator** (AWS, GCP, Azure)
- [ ] **Team collaboration features** (shared dashboards)

### Phase 3: Advanced Features 🔮
- [ ] **Real-time GPU monitoring** via APIs
- [ ] **Carbon offset recommendations**
- [ ] **Automated optimization suggestions** using ML
- [ ] **Blockchain-verified carbon credits**

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style (ESLint + Prettier)
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👤 Contact

**Subha Coder**

- GitHub: [@SUBHA22-CODER](https://github.com/SUBHA22-CODER)
- Project Link: [https://github.com/SUBHA22-CODER/EcoComputeAI](https://github.com/SUBHA22-CODER/EcoComputeAI)
- Live Demo: [https://eco-compute-ai.vercel.app/](https://eco-compute-ai.vercel.app/)

---

## 🙏 Acknowledgments

- Inspired by the Green AI movement
- Built with modern web technologies
- Deployed on Vercel's edge network
- Icons by [Lucide](https://lucide.dev/)
- Charts powered by [Recharts](https://recharts.org/)

---

<div align="center">

**Made with 💚 for a sustainable AI future**

[![Star this repo](https://img.shields.io/github/stars/SUBHA22-CODER/EcoComputeAI?style=social)](https://github.com/SUBHA22-CODER/EcoComputeAI)

</div>

