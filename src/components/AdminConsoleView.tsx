import React, { useState, useEffect } from 'react';
import { INITIAL_QUERY_LOGS } from '../data/mockData';
import { QueryLogItem } from '../types';

export const AdminConsoleView: React.FC = () => {
  // Shard selection
  const [selectedShard, setSelectedShard] = useState<'all' | 'tech' | 'biomed'>('all');

  // Sliders
  const [threshold, setThreshold] = useState(78);
  const [temperature, setTemperature] = useState(15);

  // Toggles
  const [cohereRerank, setCohereRerank] = useState(true);
  const [demographicFilter, setDemographicFilter] = useState(true);

  // Buttons loading feedback
  const [reindexing, setReindexing] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [reportExported, setReportExported] = useState(false);

  // Alias linker
  const [aliasInput, setAliasInput] = useState('');
  const [aliases, setAliases] = useState([
    'vLLM ↔ LLM Serving',
    'LangGraph ↔ Multi-Agent Workflow',
    'RAG ↔ Vector Retrieval Augmented',
  ]);

  // Query logs with live incoming stream simulation
  const [logs, setLogs] = useState<QueryLogItem[]>(INITIAL_QUERY_LOGS);

  // Selected graph node
  const [activeNode, setActiveNode] = useState<string>('GenAI');

  const handleLinkAlias = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!aliasInput.trim()) return;
    setAliases((prev) => [aliasInput.trim(), ...prev]);
    setAliasInput('');
  };

  const removeAlias = (idxToRemove: number) => {
    setAliases((prev) => prev.filter((_, i) => i !== idxToRemove));
  };

  const triggerReindex = () => {
    setReindexing(true);
    setTimeout(() => {
      setReindexing(false);
      alert('Vector Index Re-indexed: 1,248,910 embeddings validated across EU, US, and APAC shards.');
    }, 1500);
  };

  const triggerEval = () => {
    setEvaluating(true);
    setTimeout(() => {
      setEvaluating(false);
      alert('Holdout Benchmark Eval Complete: Top-10 Retrieval Accuracy verified at 94.8% (+2.6%).');
    }, 1500);
  };

  const exportReport = () => {
    setReportExported(true);
    setTimeout(() => setReportExported(false), 2500);
  };

  // Add occasional new simulated query to feed
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');
      const sampleQueries = [
        {
          src: 'Recruiter #3312',
          q: '"Senior Distributed Storage Architect Ceph MinIO NVMe-oF low-latency telemetry"',
          cos: 0.931,
          matches: 11,
          lat: 34,
        },
        {
          src: 'Seeker Session #M44',
          q: '"Compiler Engineer LLVM MLIR Triton GPU code generation remote $220k"',
          cos: 0.954,
          matches: 7,
          lat: 28,
        },
      ];
      const pick = sampleQueries[Math.floor(Math.random() * sampleQueries.length)];
      const newLog: QueryLogItem = {
        id: `log-${Date.now()}`,
        timestamp: timeStr,
        source: pick.src,
        status: 'SUCCESS • RE-RANKED',
        statusType: 'success',
        query: pick.q,
        cosineTheta: pick.cos,
        rankInfo: 'Rank 1/24',
        matchesCount: pick.matches,
        matchesEntity: pick.src.includes('Seeker') ? 'Jobs' : 'Candidates',
        latencyMs: pick.lat,
      };

      setLogs((prev) => [newLog, ...prev.slice(0, 7)]);
    }, 9000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col gap-5 w-full max-w-[1720px] mx-auto pb-10">
      {/* Top Mission Control Subheader & Quick Cluster Status */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-xl bg-[#131b2e] shadow-md relative overflow-hidden border border-[#464554]/25">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#8083ff]/5 blur-3xl pointer-events-none"></div>

        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-lg bg-[#222a3d] text-[#c0c1ff] flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-[28px]">query_stats</span>
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="font-['Plus+Jakarta+Sans'] text-lg font-semibold text-[#dae2fd]">
                NLP Engine Telemetry &amp; Vector Diagnostics
              </span>
              <span className="px-2 py-0.5 rounded bg-[#4edea3]/10 text-[#4edea3] font-mono text-xs flex items-center gap-1 border border-[#4edea3]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse"></span>
                CLUSTER_EU_US_ASIA: NOMINAL
              </span>
            </div>
            <p className="font-['Inter'] text-xs text-[#c7c4d7] mt-0.5">
              Qdrant &amp; Pinecone multi-region index shards / Dense-Sparse cross-encoder orchestration
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={triggerReindex}
            disabled={reindexing}
            className="px-3.5 py-2 rounded bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] font-['Inter'] text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer border border-[#464554]/30 disabled:opacity-70"
            id="btn-reindex"
          >
            <span className={`material-symbols-outlined text-[18px] text-[#ffb95f] ${reindexing ? 'animate-spin' : ''}`}>
              sync
            </span>
            <span>{reindexing ? 'Re-indexing 1.2M Vectors...' : 'Trigger Vector Re-index'}</span>
          </button>

          <button
            onClick={triggerEval}
            disabled={evaluating}
            className="px-3.5 py-2 rounded bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] font-['Inter'] text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer border border-[#464554]/30 disabled:opacity-70"
            id="btn-eval"
          >
            <span className="material-symbols-outlined text-[18px] text-[#c0c1ff]">science</span>
            <span>{evaluating ? 'Evaluating Holdout...' : 'Benchmark Holdout Eval'}</span>
          </button>

          <button
            onClick={exportReport}
            className="px-3.5 py-2 rounded bg-[#c0c1ff] text-[#1000a9] font-['Inter'] text-xs font-semibold flex items-center gap-1.5 hover:bg-[#e1e0ff] transition-all shadow-md cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">file_download</span>
            <span>{reportExported ? 'Report Downloaded!' : 'Export Drift Report'}</span>
          </button>
        </div>
      </div>

      {/* 4 High-Density Vector Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-4 rounded-xl bg-[#171f33] shadow-sm flex flex-col justify-between border border-[#464554]/25 hover:bg-[#222a3d] transition-colors">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-['Inter'] text-[11px] text-[#c7c4d7] uppercase tracking-wider font-semibold">
                Vector Space Health
              </span>
              <span className="font-['Plus+Jakarta+Sans'] text-2xl font-bold text-[#dae2fd] mt-1">
                99.82%
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#4edea3]/10 flex items-center justify-center text-[#4edea3]">
              <span className="material-symbols-outlined text-[22px]">database</span>
            </div>
          </div>
          <div className="mt-4 pt-2 flex items-center justify-between border-t border-[#464554]/20">
            <span className="font-mono text-xs text-[#c7c4d7]">1,248,910 Embeddings</span>
            <span className="font-['Inter'] text-xs text-[#4edea3] flex items-center gap-1 font-semibold">
              <span className="material-symbols-outlined text-[14px]">check_circle</span> Qdrant Live
            </span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-4 rounded-xl bg-[#171f33] shadow-sm flex flex-col justify-between border border-[#464554]/25 hover:bg-[#222a3d] transition-colors">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-['Inter'] text-[11px] text-[#c7c4d7] uppercase tracking-wider font-semibold">
                Mean Cosine Match Acc.
              </span>
              <span className="font-['Plus+Jakarta+Sans'] text-2xl font-bold text-[#dae2fd] mt-1">
                94.6%
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#8083ff]/10 flex items-center justify-center text-[#c0c1ff]">
              <span className="material-symbols-outlined text-[22px]">auto_graph</span>
            </div>
          </div>
          <div className="mt-4 pt-2 flex items-center justify-between border-t border-[#464554]/20">
            <span className="font-['Inter'] text-xs text-[#4edea3] flex items-center gap-0.5 font-semibold">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span> +2.4% vs w-1
            </span>
            <span className="font-mono text-xs text-[#c7c4d7]">Top-k @ 10 Eval</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-4 rounded-xl bg-[#171f33] shadow-sm flex flex-col justify-between border border-[#464554]/25 hover:bg-[#222a3d] transition-colors">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-['Inter'] text-[11px] text-[#c7c4d7] uppercase tracking-wider font-semibold">
                Inference Latency
              </span>
              <span className="font-['Plus+Jakarta+Sans'] text-2xl font-bold text-[#dae2fd] mt-1">
                42<span className="font-['Inter'] text-sm text-[#c7c4d7] font-normal ml-1">ms</span>
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#ffb95f]/10 flex items-center justify-center text-[#ffb95f]">
              <span className="material-symbols-outlined text-[22px]">speed</span>
            </div>
          </div>
          <div className="mt-4 pt-2 flex items-center justify-between border-t border-[#464554]/20">
            <span className="font-mono text-xs text-[#c7c4d7]">P99: 88ms</span>
            <span className="font-['Inter'] text-xs text-[#ffb95f] font-semibold">3 Multi-Region Edge</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-4 rounded-xl bg-[#171f33] shadow-sm flex flex-col justify-between border border-[#464554]/25 hover:bg-[#222a3d] transition-colors">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-['Inter'] text-[11px] text-[#c7c4d7] uppercase tracking-wider font-semibold">
                Daily Semantic Queries
              </span>
              <span className="font-['Plus+Jakarta+Sans'] text-2xl font-bold text-[#dae2fd] mt-1">
                184,290
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#8083ff]/10 flex items-center justify-center text-[#c0c1ff]">
              <span className="material-symbols-outlined text-[22px]">manage_search</span>
            </div>
          </div>
          <div className="mt-4 pt-2 flex items-center justify-between border-t border-[#464554]/20">
            <span className="font-mono text-xs text-[#c7c4d7]">+18.5k from Recruiter API</span>
            <span className="font-['Inter'] text-xs text-[#4edea3] font-semibold">0.002% Errors</span>
          </div>
        </div>
      </div>

      {/* Main Asymmetric Workspace Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* LEFT COLUMN (7 Cols): Analytics, Histograms, Model Tuning */}
        <div className="xl:col-span-7 flex flex-col gap-5">
          {/* Cosine Similarity Distribution Card */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#171f33] shadow-sm flex flex-col gap-4 border border-[#464554]/25">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-[#c0c1ff]">bar_chart</span>
                  <span className="font-['Plus+Jakarta+Sans'] text-base font-semibold text-[#dae2fd]">
                    Model Performance &amp; Cosine Distribution
                  </span>
                </div>
                <p className="font-['Inter'] text-xs text-[#c7c4d7] mt-0.5">
                  Frequency distribution of semantic similarity across 24h paired candidate embeddings
                </p>
              </div>

              <div className="flex items-center gap-1 p-0.5 rounded bg-[#131b2e] border border-[#464554]/30">
                <button
                  onClick={() => setSelectedShard('all')}
                  className={`px-2.5 py-1 rounded font-['Inter'] text-xs transition-colors cursor-pointer ${
                    selectedShard === 'all'
                      ? 'bg-[#2d3449] text-[#dae2fd] font-semibold shadow-sm'
                      : 'text-[#c7c4d7] hover:text-[#dae2fd]'
                  }`}
                >
                  All Shards
                </button>
                <button
                  onClick={() => setSelectedShard('tech')}
                  className={`px-2.5 py-1 rounded font-['Inter'] text-xs transition-colors cursor-pointer ${
                    selectedShard === 'tech'
                      ? 'bg-[#2d3449] text-[#dae2fd] font-semibold shadow-sm'
                      : 'text-[#c7c4d7] hover:text-[#dae2fd]'
                  }`}
                >
                  High-Tech
                </button>
                <button
                  onClick={() => setSelectedShard('biomed')}
                  className={`px-2.5 py-1 rounded font-['Inter'] text-xs transition-colors cursor-pointer ${
                    selectedShard === 'biomed'
                      ? 'bg-[#2d3449] text-[#dae2fd] font-semibold shadow-sm'
                      : 'text-[#c7c4d7] hover:text-[#dae2fd]'
                  }`}
                >
                  BioMed
                </button>
              </div>
            </div>

            {/* Interactive Histogram & Spark Visualization */}
            <div className="p-4 rounded-xl bg-[#131b2e] flex flex-col gap-3.5 border border-[#464554]/20">
              <div className="h-44 w-full flex items-end gap-2 sm:gap-4 pt-6 px-2 relative">
                {/* Reference Grid lines */}
                <div className="absolute inset-x-0 top-6 border-b border-[#464554]/20 pointer-events-none"></div>
                <div className="absolute inset-x-0 top-24 border-b border-[#464554]/20 pointer-events-none"></div>
                <div className="absolute right-2 top-2 font-mono text-xs text-[#c7c4d7]">
                  Density Peak @ 0.892 cos_θ
                </div>

                {/* Bar 1: 50-60% */}
                <div className="flex-1 flex flex-col items-center gap-1 group h-full justify-end">
                  <div
                    className="w-full bg-[#2d3449] rounded-t group-hover:bg-[#908fa0] transition-all duration-300 relative cursor-pointer"
                    style={{ height: '18%' }}
                  >
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-[#31394d] text-[#dae2fd] font-mono text-[11px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap shadow-md">
                      14.2k
                    </div>
                  </div>
                  <span className="font-mono text-xs text-[#c7c4d7] group-hover:text-[#dae2fd]">
                    50-60%
                  </span>
                </div>

                {/* Bar 2: 60-70% */}
                <div className="flex-1 flex flex-col items-center gap-1 group h-full justify-end">
                  <div
                    className="w-full bg-[#2d3449] rounded-t group-hover:bg-[#908fa0] transition-all duration-300 relative cursor-pointer"
                    style={{ height: '38%' }}
                  >
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-[#31394d] text-[#dae2fd] font-mono text-[11px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap shadow-md">
                      31.8k
                    </div>
                  </div>
                  <span className="font-mono text-xs text-[#c7c4d7] group-hover:text-[#dae2fd]">
                    60-70%
                  </span>
                </div>

                {/* Bar 3: 70-80% (Moderate Fit) */}
                <div className="flex-1 flex flex-col items-center gap-1 group h-full justify-end">
                  <div
                    className="w-full bg-[#ca8100]/60 rounded-t group-hover:bg-[#ffb95f] transition-all duration-300 relative cursor-pointer"
                    style={{ height: '64%' }}
                  >
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-[#31394d] text-[#dae2fd] font-mono text-[11px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap shadow-md">
                      52.1k
                    </div>
                  </div>
                  <span className="font-mono text-xs text-[#ffb95f] font-semibold">
                    70-80%
                  </span>
                </div>

                {/* Bar 4: 80-90% (High Semantic Fit) */}
                <div className="flex-1 flex flex-col items-center gap-1 group h-full justify-end">
                  <div
                    className="w-full bg-[#8083ff] rounded-t group-hover:bg-[#c0c1ff] transition-all duration-300 relative shadow-[0_0_16px_rgba(128,131,255,0.35)] cursor-pointer"
                    style={{ height: '92%' }}
                  >
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-[#31394d] text-[#dae2fd] font-mono text-[11px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap shadow-md">
                      68.4k
                    </div>
                  </div>
                  <span className="font-mono text-xs text-[#c0c1ff] font-semibold">
                    80-90%
                  </span>
                </div>

                {/* Bar 5: 90-100% (Elite Vector Overlap) */}
                <div className="flex-1 flex flex-col items-center gap-1 group h-full justify-end">
                  <div
                    className="w-full bg-[#4edea3] rounded-t group-hover:bg-[#6ffbbe] transition-all duration-300 relative shadow-[0_0_20px_rgba(78,222,163,0.35)] cursor-pointer"
                    style={{ height: '48%' }}
                  >
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-[#31394d] text-[#dae2fd] font-mono text-[11px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap shadow-md">
                      38.9k
                    </div>
                  </div>
                  <span className="font-mono text-xs text-[#4edea3] font-semibold">
                    90-100%
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between pt-1 text-[#c7c4d7] font-['Inter'] text-xs border-t border-[#464554]/20">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#2d3449]"></span> Marginal
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#ca8100]"></span> Acceptable Fit
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#8083ff]"></span> Optimal Fit
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#4edea3]"></span> Exact Cluster Match
                  </span>
                </div>
                <span className="font-mono text-xs text-[#c0c1ff]">
                  Kurtosis: 1.14 (Dense Centroid)
                </span>
              </div>
            </div>
          </div>

          {/* Active Model Version & Embedder Configuration */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#171f33] shadow-sm flex flex-col gap-4 border border-[#464554]/25">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#4edea3]">tune</span>
                <span className="font-['Plus+Jakarta+Sans'] text-base font-semibold text-[#dae2fd]">
                  Embedder Runtime &amp; Hyperparameter Control
                </span>
              </div>
              <span className="px-2.5 py-1 rounded bg-[#222a3d] text-[#c0c1ff] font-mono text-xs border border-[#464554]/30">
                VRAM Alloc: 18.2 / 24 GB
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {/* Primary Transformer */}
              <div className="p-3.5 rounded-lg bg-[#131b2e] flex flex-col justify-between border border-[#464554]/20">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-['Inter'] text-[11px] uppercase tracking-wider text-[#c7c4d7]">
                      Primary Semantic Encoder
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#4edea3]"></span>
                  </div>
                  <div className="mt-1 font-['Inter'] text-sm font-semibold text-[#dae2fd]">
                    text-embedding-3-large
                  </div>
                  <div className="font-mono text-xs text-[#c0c1ff] mt-1">
                    3072 Dimensions • 8192 Token Window
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between font-['Inter'] text-xs text-[#c7c4d7]">
                  <span>Normalization: L2 Spherical</span>
                  <span className="text-[#4edea3] font-mono font-semibold">18.4ms avg</span>
                </div>
              </div>

              {/* Fallback Cross Encoder */}
              <div className="p-3.5 rounded-lg bg-[#131b2e] flex flex-col justify-between border border-[#464554]/20">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-['Inter'] text-[11px] uppercase tracking-wider text-[#c7c4d7]">
                      Fallback Dual-Encoder
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#ffb95f]"></span>
                  </div>
                  <div className="mt-1 font-['Inter'] text-sm font-semibold text-[#dae2fd]">
                    Bi-Encoder BERT-v4 Distilled
                  </div>
                  <div className="font-mono text-xs text-[#c7c4d7] mt-1">
                    768 Dimensions • Quantized INT8
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between font-['Inter'] text-xs text-[#c7c4d7]">
                  <span>Triggers: Timeout &gt; 120ms</span>
                  <span className="text-[#ffb95f] font-mono font-semibold">9.1ms avg</span>
                </div>
              </div>
            </div>

            {/* Tuners and Sliders */}
            <div className="space-y-4 p-4 rounded-xl bg-[#131b2e] border border-[#464554]/20">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between font-['Inter'] text-xs font-medium">
                  <span className="text-[#dae2fd]">Cosine Distance Match Threshold (τ)</span>
                  <span className="font-mono text-xs text-[#4edea3] font-semibold">
                    {(threshold / 100).toFixed(3)}
                  </span>
                </div>
                <input
                  className="w-full h-1.5 bg-[#2d3449] rounded-lg appearance-none cursor-pointer accent-[#4edea3]"
                  max="95"
                  min="50"
                  type="range"
                  value={threshold}
                  onChange={(e) => setThreshold(parseInt(e.target.value, 10))}
                />
                <div className="flex justify-between font-mono text-[10px] text-[#908fa0]">
                  <span>0.50 (Loose semantic)</span>
                  <span>Default: 0.78</span>
                  <span>0.95 (Near identical)</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between font-['Inter'] text-xs font-medium">
                  <span className="text-[#dae2fd]">Reranker Temperature (λ)</span>
                  <span className="font-mono text-xs text-[#c0c1ff] font-semibold">
                    {(temperature / 100).toFixed(2)}
                  </span>
                </div>
                <input
                  className="w-full h-1.5 bg-[#2d3449] rounded-lg appearance-none cursor-pointer accent-[#8083ff]"
                  max="100"
                  min="1"
                  type="range"
                  value={temperature}
                  onChange={(e) => setTemperature(parseInt(e.target.value, 10))}
                />
                <div className="flex justify-between font-mono text-[10px] text-[#908fa0]">
                  <span>0.01 (Deterministic)</span>
                  <span>Default: 0.15</span>
                  <span>1.00 (Exploratory)</span>
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1 border-t border-[#464554]/20">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCohereRerank(!cohereRerank)}
                    className={`w-9 h-5 rounded-full flex items-center px-0.5 transition-colors cursor-pointer ${
                      cohereRerank ? 'bg-[#4edea3] justify-end' : 'bg-[#2d3449] justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full bg-white shadow-sm"></div>
                  </button>
                  <div>
                    <span className="font-['Inter'] text-xs font-medium text-[#dae2fd] block">
                      Cohere Rerank v3 Multi-Turn
                    </span>
                    <span className="font-['Inter'] text-[11px] text-[#c7c4d7]">
                      Apply dense cross-attention reranking for candidate top-20
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setDemographicFilter(!demographicFilter)}
                    className={`w-9 h-5 rounded-full flex items-center px-0.5 transition-colors cursor-pointer ${
                      demographicFilter ? 'bg-[#8083ff] justify-end' : 'bg-[#2d3449] justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full bg-white shadow-sm"></div>
                  </button>
                  <div>
                    <span className="font-['Inter'] text-xs font-medium text-[#dae2fd] block">
                      Strict Demographic Parity Filter
                    </span>
                    <span className="font-['Inter'] text-[11px] text-[#c7c4d7]">
                      Debias gendered lexicon vectors
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (5 Cols): Skill Ontology Graph & Real-Time Query Stream */}
        <div className="xl:col-span-5 flex flex-col gap-5">
          {/* Skill Ontology & Taxonomy Graph */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#171f33] shadow-sm flex flex-col gap-4 border border-[#464554]/25">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-[#4edea3]">hub</span>
                  <span className="font-['Plus+Jakarta+Sans'] text-base font-semibold text-[#dae2fd]">
                    Taxonomy &amp; Skill Ontology Graph
                  </span>
                </div>
                <p className="font-['Inter'] text-xs text-[#c7c4d7] mt-0.5">
                  Dynamic clustering of 41,200 skills &amp; aliases in vector space
                </p>
              </div>
              <span className="px-2.5 py-0.5 rounded bg-[#4edea3]/10 text-[#4edea3] font-mono text-xs font-semibold border border-[#4edea3]/30">
                Graph v4.8
              </span>
            </div>

            {/* Inline Node Network Visualization (Interactive Visual Asset) */}
            <div className="w-full h-52 rounded-xl bg-[#131b2e] relative overflow-hidden flex items-center justify-center p-2 border border-[#464554]/25">
              <svg
                className="w-full h-full"
                fill="none"
                viewBox="0 0 460 200"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Edge Connectors */}
                <line
                  className="text-[#464554]/50"
                  stroke="currentColor"
                  strokeDasharray="3 3"
                  strokeWidth="1.5"
                  x1="120"
                  x2="230"
                  y1="100"
                  y2="55"
                ></line>
                <line
                  className="text-[#464554]/50"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  x1="230"
                  x2="340"
                  y1="55"
                  y2="85"
                ></line>
                <line
                  className="text-[#8083ff]/40"
                  stroke="currentColor"
                  strokeWidth="2"
                  x1="230"
                  x2="230"
                  y1="55"
                  y2="145"
                ></line>
                <line
                  className="text-[#464554]/50"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  x1="120"
                  x2="150"
                  y1="100"
                  y2="160"
                ></line>
                <line
                  className="text-[#4edea3]/40"
                  stroke="currentColor"
                  strokeWidth="2"
                  x1="230"
                  x2="350"
                  y1="145"
                  y2="155"
                ></line>
                <line
                  className="text-[#464554]/50"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  x1="340"
                  x2="350"
                  y1="85"
                  y2="155"
                ></line>

                {/* Cluster 1: NLP / GenAI */}
                <g className="cursor-pointer group" onClick={() => setActiveNode('GenAI')}>
                  <circle
                    className="fill-[#8083ff]/20 stroke-[#8083ff]"
                    cx="230"
                    cy="55"
                    r={activeNode === 'GenAI' ? '28' : '24'}
                    strokeWidth="2"
                  ></circle>
                  <circle className="fill-[#8083ff] animate-ping opacity-60" cx="230" cy="55" r="6"></circle>
                  <circle className="fill-[#8083ff]" cx="230" cy="55" r="4"></circle>
                  <text
                    className="fill-[#e1e0ff] font-mono font-bold"
                    fontSize="9"
                    textAnchor="middle"
                    x="230"
                    y="58"
                  >
                    GenAI
                  </text>
                </g>

                {/* Cluster 2: Distributed Systems */}
                <g className="cursor-pointer group" onClick={() => setActiveNode('Dist-Sys')}>
                  <circle
                    className="fill-[#222a3d] stroke-[#908fa0]"
                    cx="120"
                    cy="100"
                    r={activeNode === 'Dist-Sys' ? '22' : '18'}
                    strokeWidth="1.5"
                  ></circle>
                  <circle className="fill-[#908fa0]" cx="120" cy="100" r="3"></circle>
                  <text
                    className="fill-[#c7c4d7] font-mono"
                    fontSize="8"
                    textAnchor="middle"
                    x="120"
                    y="103"
                  >
                    Dist-Sys
                  </text>
                </g>

                {/* Cluster 3: vLLM & Serving */}
                <g className="cursor-pointer group" onClick={() => setActiveNode('vLLM')}>
                  <circle
                    className="fill-[#4edea3]/20 stroke-[#4edea3]"
                    cx="230"
                    cy="145"
                    r={activeNode === 'vLLM' ? '24' : '20'}
                    strokeWidth="1.5"
                  ></circle>
                  <circle className="fill-[#4edea3]" cx="230" cy="145" r="4"></circle>
                  <text
                    className="fill-[#4edea3] font-mono font-bold"
                    fontSize="8"
                    textAnchor="middle"
                    x="230"
                    y="148"
                  >
                    vLLM
                  </text>
                </g>

                {/* Cluster 4: Data Eng */}
                <g className="cursor-pointer group" onClick={() => setActiveNode('DataOps')}>
                  <circle
                    className="fill-[#222a3d] stroke-[#ffb95f]"
                    cx="340"
                    cy="85"
                    r={activeNode === 'DataOps' ? '21' : '17'}
                    strokeWidth="1.5"
                  ></circle>
                  <circle className="fill-[#ffb95f]" cx="340" cy="85" r="3"></circle>
                  <text
                    className="fill-[#c7c4d7] font-mono"
                    fontSize="8"
                    textAnchor="middle"
                    x="340"
                    y="88"
                  >
                    DataOps
                  </text>
                </g>

                {/* Cluster 5: PyTorch / Triton */}
                <g className="cursor-pointer group" onClick={() => setActiveNode('Triton')}>
                  <circle
                    className="fill-[#222a3d] stroke-[#4edea3]"
                    cx="350"
                    cy="155"
                    r={activeNode === 'Triton' ? '20' : '16'}
                    strokeWidth="1.5"
                  ></circle>
                  <text
                    className="fill-[#6ffbbe] font-mono"
                    fontSize="8"
                    textAnchor="middle"
                    x="350"
                    y="158"
                  >
                    Triton
                  </text>
                </g>

                {/* Satellite node */}
                <g className="cursor-pointer group" onClick={() => setActiveNode('CUDA')}>
                  <circle
                    className="fill-[#222a3d] stroke-[#464554]"
                    cx="150"
                    cy="160"
                    r={activeNode === 'CUDA' ? '15' : '12'}
                    strokeWidth="1"
                  ></circle>
                  <text
                    className="fill-[#c7c4d7] font-mono"
                    fontSize="7"
                    textAnchor="middle"
                    x="150"
                    y="163"
                  >
                    CUDA
                  </text>
                </g>
              </svg>

              <div className="absolute bottom-2 left-2 flex items-center gap-2 bg-[#060e20]/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#464554]/20">
                <span className="w-2 h-2 rounded-full bg-[#4edea3]"></span>
                <span className="font-mono text-[11px] text-[#c7c4d7]">
                  Selected: <strong className="text-[#dae2fd]">{activeNode}</strong> (0.912 Cosine Proximity)
                </span>
              </div>
            </div>

            {/* Add Semantic Alias Search Bar */}
            <div className="flex flex-col gap-2">
              <span className="font-['Inter'] text-xs text-[#c7c4d7] font-medium">
                Ontology Synonym &amp; Alias Linker
              </span>
              <form onSubmit={handleLinkAlias} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-[#908fa0]">
                    add_link
                  </span>
                  <input
                    className="w-full pl-9 pr-3 py-2 bg-[#131b2e] rounded-lg text-[#dae2fd] font-['Inter'] text-xs outline-none focus:ring-1 focus:ring-[#8083ff] shadow-inner border border-[#464554]/30"
                    id="alias-input"
                    placeholder="e.g. 'vLLM' → alias of 'High-throughput LLM Serving'"
                    type="text"
                    value={aliasInput}
                    onChange={(e) => setAliasInput(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-lg bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] font-['Inter'] text-xs font-semibold transition-colors flex-shrink-0 border border-[#464554]/30 cursor-pointer"
                  id="alias-submit"
                >
                  Link Alias
                </button>
              </form>

              <div className="flex flex-wrap gap-1.5 mt-1" id="alias-chips">
                {aliases.map((al, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded bg-[#131b2e] text-[#c7c4d7] font-mono text-[11px] flex items-center gap-1.5 border border-[#464554]/25"
                  >
                    <span>{al}</span>
                    <button
                      onClick={() => removeAlias(idx)}
                      className="material-symbols-outlined text-[13px] text-[#908fa0] hover:text-[#ffb4ab] cursor-pointer"
                    >
                      close
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Real-Time NLP Query Log Stream */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#171f33] shadow-sm flex flex-col gap-3.5 flex-1 border border-[#464554]/25">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#c0c1ff]">terminal</span>
                <span className="font-['Plus+Jakarta+Sans'] text-base font-semibold text-[#dae2fd]">
                  Real-Time NLP Inference Feed
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-ping"></span>
                <span className="font-mono text-xs text-[#4edea3] font-semibold">STREAM LIVE</span>
              </div>
            </div>

            {/* Log Table / Stream List */}
            <div className="flex flex-col gap-2 max-h-[380px] overflow-y-auto pr-1" id="query-log-container">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-lg bg-[#131b2e] flex flex-col gap-1.5 hover:bg-[#222a3d] transition-colors border border-[#464554]/20"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-[#c7c4d7] font-medium">
                      {log.timestamp} • {log.source}
                    </span>
                    <span
                      className={`px-1.5 py-0.5 rounded font-mono text-[10px] font-bold ${
                        log.statusType === 'success'
                          ? 'bg-[#4edea3]/15 text-[#4edea3]'
                          : log.statusType === 'direct'
                          ? 'bg-[#8083ff]/15 text-[#c0c1ff]'
                          : 'bg-[#ffb95f]/15 text-[#ffb95f]'
                      }`}
                    >
                      {log.status}
                    </span>
                  </div>
                  <div className="font-['Inter'] text-xs text-[#dae2fd] truncate">
                    {log.query}
                  </div>
                  <div className="flex items-center justify-between text-[#c7c4d7] font-mono text-[11px] pt-1 border-t border-[#464554]/15">
                    <span
                      className={`font-semibold ${
                        log.cosineTheta > 0.9 ? 'text-[#4edea3]' : 'text-[#c0c1ff]'
                      }`}
                    >
                      cos_θ: {log.cosineTheta.toFixed(3)} ({log.rankInfo})
                    </span>
                    <span>Matches: {log.matchesCount} {log.matchesEntity}</span>
                    <span className="text-[#dae2fd]">{log.latencyMs}ms</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
