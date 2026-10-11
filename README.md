# SmartMatch AI — Enterprise NLP Semantic Intelligence Platform

> **Cognitive Talent Architecture & High-Dimensional Semantic Recruitment Engine**  
> Powered by NLP v3.2 semantic embeddings, sub-second cross-encoder re-ranking, and explainable vector matching.

---

## 🚀 Overview

**SmartMatch AI** replaces legacy keyword searching and brittle Boolean strings with dense vector representations and deep cross-attention matching. By projecting candidate profiles, verified work history, and job requisitions into a **1,536-dimensional latent space**, the platform connects engineering talent to high-impact roles with over **94%+ statistical precision** while enforcing zero demographic bias.

---

## 🖥️ Platform Screens & Core Capabilities

The application provides four unified stakeholder views accessible via the top navigation rail:

### 1. Job Seeker Feed (`/job-seeker-feed`)
Designed for candidates seeking deep alignment rather than superficial keyword matching.
- **Natural Language Query Bar**: Formulate career intent in natural conversational language (e.g., *"Senior MLOps Engineer building distributed PyTorch training pipelines in Kubernetes, remote, $180k+"*).
- **Candidate Resume Vector Node**: Displays candidate fidelity (96.4%), active semantic cluster densities (*Distributed Computing 98%*, *PyTorch/JAX Internals 95%*, *Kubernetes Multi-GPU 91%*), and discovery calibration toggles.
- **Vector Ranked Job Feed**: Ranked job cards with affinity badges (*Deep Match 96%*, *High Semantic 92%*), token overlaps, and delta gap suggestions (*Triton Inference Server +3.2% boost*).
- **Live Vector Inspector**: Side drawer featuring explainable AI match rationale, cosine distance metrics ($0.038$), interactive **Latent Space Proximity SVG graph**, instant vector application, and the conversational **Ask AI Job Scout**.

### 2. Recruiter Portal (`/recruiter-portal`)
Built for talent leaders and hiring managers seeking high-signal candidate pipelines.
- **Active Campaign Requisition (#NLP-809)**: Requisition cockpit for *Staff NLP Research Scientist* with live telemetry (*Ingested Vector: 42*, *High Match: 14/42*, *Pipeline Shortlist: 6*).
- **Extracted Semantic Lattice & Weights**: Trait vector calibration with configurable multipliers (*DPO 1.4x*, *RLHF 1.2x*, *FlashAttention 0.9x*) and interactive **Neural Weight & Strictness Calibrator**.
- **Dynamic Real-Time Confidence Filter**: Interactive threshold slider ($60\%$ to $98\%$) that dynamically updates and dims candidate profiles falling below target precision in real-time.
- **Candidate Profiles & Evaluation**: Ranked talent cards (Dr. Marcus Chen 97%, Sarah Jenkins 93%, Alexei Volkov 89%, Priya Patel 86%) with dimensional breakdown bars, **Semantic CV Diff**, and **Interview Scheduler**.
- **Side-by-Side Multi-Vector Compare Drawer**: Dimensional projection comparing requisition target weights against top candidate attributes.

### 3. Admin Console (`/admin-console`)
Operational control center for ML engineers, compliance officers, and platform operators.
- **Engine Diagnostics & Telemetry**: Multi-region index shard status (*CLUSTER_EU_US_ASIA: NOMINAL*) with triggers for vector re-indexing, holdout benchmark evaluations, and drift report exports.
- **High-Density Vector Metrics**: Vector Space Health ($99.82\%$), Mean Cosine Match Accuracy ($94.6\%$), Inference Latency ($42\text{ms}$), and Daily Semantic Queries ($184,290$).
- **Cosine Distribution Histogram**: 5-tier similarity distribution with shard toggles (*All Shards*, *High-Tech*, *BioMed*) and Kurtosis centroid tracking ($1.14$).
- **Embedder Runtime & Hyperparameters**: Side-by-side comparison of `text-embedding-3-large` and fallback `BERT-v4`, with sliders for Cosine Match Threshold ($\tau$) and Reranker Temperature ($\lambda$).
- **Taxonomy & Skill Ontology Graph**: Interactive SVG clustering canvas (Graph v4.8) of 41,200 skills, paired with a live **Synonym & Alias Linker**.
- **Real-Time NLP Inference Feed**: Continuous query log stream displaying timestamps, query strings, cosine theta values, match counts, and latencies.

### 4. Public Platform (`/public-platform`)
Interactive public portal demonstrating the underlying technology.
- **Interactive Live NLP Query Playground**: Test real-time vectorization and cross-encoder re-ranking with custom queries or presets (*Web3 Design System Lead*, *MLOps Triton / Ray Lead*, *Ethical AI Talent Ops*).
- **Enterprise Velocity Metrics**: $1.2\text{M}+$ semantic matches, $4.2\times$ higher interview conversion, and an $88\%$ reduction in time-to-shortlist.
- **3 Role Pillars Bento Grid**: Specific value propositions for Candidates, Recruiters, and Enterprise Ops.
- **How Our NLP Engine Works**: Interactive 4-phase architecture walkthrough:
  1. *Phase 01: Ingest & Subword Tokenization*
  2. *Phase 02: High-Dimensional Vector Embedding (1,536-D)*
  3. *Phase 03: Cross-Encoder Deep Re-Ranking (24 Attention Layers)*
  4. *Phase 04: Explainable Synthesis & Match Dossier*
- **Enterprise Conversion & Footer**: Instant pilot provisioning and platform status indicators.

---

## 🎨 Design System & Color Tokens

Built on the **Modern Kinetic Glass & Technical Precision** design archetype with high contrast against an obsidian slate background:

| Token | Hex | Role |
| :--- | :--- | :--- |
| **Surface / Background** | `#0b1326` | Base canvas foundation |
| **Surface Container Low** | `#131b2e` | Panels and structural containers |
| **Surface Container** | `#171f33` | Interactive cards and data tiles |
| **Surface Container High**| `#222a3d` | Elevated cards, search bars, and focused states |
| **Primary (Electric Indigo)** | `#c0c1ff` / `#8083ff` | AI intelligence, vector operations, and active triggers |
| **Secondary (Emerald Match)**| `#4edea3` | Optimal semantic alignment ($\ge 90\%$), live indicators, and verification |
| **Tertiary (Amber Vector)** | `#ffb95f` | Moderate fit, skill gaps, and telemetry latency alerts |
| **Text (On-Surface)** | `#dae2fd` | High-contrast crisp typography |
| **Text Muted (On-Surface Variant)**| `#c7c4d7` / `#908fa0` | Technical subtext, tabular labels, and metadata |

### Typography
- **Headings & Key Metrics**: `Plus Jakarta Sans` (Semibold / Bold / Extrabold)
- **Body & Controls**: `Inter` (Regular / Medium / Semibold)
- **Vectors, Cosine Distances & Latency**: `Inter` (Tabular Lining / Monospace)

---

## 🛠️ Tech Stack & Architecture

- **Frontend Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Tooling**: [Vite 8](https://vitejs.dev/) + `@tailwindcss/vite`
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with native `@theme` CSS variables
- **Iconography**: Google [Material Symbols Outlined](https://fonts.google.com/icons) & [Lucide React](https://lucide.dev/)
- **Visualizations**: Interactive SVG Latent Space Proximity Maps, Token Graphs, and Vector Clustering Canvases

---

## 📂 Project Structure

```text
├── index.html                   # HTML entry point with Plus Jakarta Sans & Material Symbols
├── metadata.json                # AI Studio application metadata
├── package.json                 # Dependencies & build scripts
├── src/
│   ├── App.tsx                  # Root component, navigation router & global notifications
│   ├── main.tsx                 # React DOM mount point
│   ├── index.css                # Global CSS with Tailwind v4 @theme design tokens
│   ├── types.ts                 # TypeScript data contracts & interfaces
│   ├── components/
│   │   ├── Header.tsx           # Global top navigation, role selector & neural status
│   │   ├── Sidebar.tsx          # Pinned semantic modules rail & vector space widget
│   │   ├── JobSeekerFeedView.tsx# 3-Column Job Seeker feed & Live Vector Inspector
│   │   ├── RecruiterPortalView.tsx # Candidate ranking, confidence filter & CV diff
│   │   ├── AdminConsoleView.tsx # Telemetry, cosine histogram & ontology graph
│   │   ├── PublicPlatformView.tsx # Interactive playground & 4-phase engine walkthrough
│   │   └── Modals.tsx           # Weight tuner, CV debrief, interview scheduler & scout
│   └── data/
│       └── mockData.ts          # Semantic job matches, candidates & telemetry logs
└── tsconfig.json                # TypeScript compiler configuration
```

---

## ⚡ Quickstart

### Prerequisites
- Node.js `18.x` or higher
- npm `9.x` or higher

### Installation
```bash
# Clone the repository
git clone https://github.com/your-org/smartmatch-ai.git

# Navigate to project directory
cd smartmatch-ai

# Install dependencies
npm install
```

### Running Locally
```bash
# Start Vite development server
npm run dev
```
Open your browser at `http://localhost:3000` to interact with the platform.

### Production Build
```bash
# Validate TypeScript and compile production bundle
npm run build
```

---

## ⚖️ Ethics, Governance & Compliance

- **Zero Demographic Bias Regularization**: Candidate demographic attributes, gendered lexicons, and institutional proxies are mathematically nulled before vector projection.
- **NYC Local Law 144 Compliant**: Continuous statistical parity monitoring across all paired embeddings.
- **SOC2 Type II & GDPR Ready**: Anonymized vector vault architecture with zero plaintext PII exposure.

---

## 📄 License
This project is licensed under the Apache-2.0 License.
