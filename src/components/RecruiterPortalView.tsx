import React, { useState } from 'react';
import { INITIAL_CANDIDATES, INITIAL_TRAIT_WEIGHTS } from '../data/mockData';
import { CandidateProfile, SemanticTraitWeight } from '../types';
import { TuneWeightsModal, CVDebriefModal, ScheduleInterviewModal } from './Modals';

export const RecruiterPortalView: React.FC = () => {
  const [candidates, setCandidates] = useState<CandidateProfile[]>(INITIAL_CANDIDATES);
  const [traitWeights, setTraitWeights] = useState<SemanticTraitWeight[]>(INITIAL_TRAIT_WEIGHTS);
  const [threshold, setThreshold] = useState<number>(85);
  const [rankingMode, setRankingMode] = useState<'vector' | 'keyword'>('vector');
  const [expDepth, setExpDepth] = useState('all');
  const [noticePeriodFilter, setNoticePeriodFilter] = useState('all');

  // Interactive drawer & modals
  const [showCompareDrawer, setShowCompareDrawer] = useState(false);
  const [tuneModalOpen, setTuneModalOpen] = useState(false);
  const [selectedCandidateForDiff, setSelectedCandidateForDiff] = useState<CandidateProfile | null>(null);
  const [selectedCandidateForInterview, setSelectedCandidateForInterview] = useState<CandidateProfile | null>(null);

  // New trait vector input
  const [newTraitInput, setNewTraitInput] = useState('');
  const [isAddingTrait, setIsAddingTrait] = useState(false);

  // Batch action feedbacks
  const [batchToast, setBatchToast] = useState<string | null>(null);

  const handleBatchATS = () => {
    setBatchToast('Top candidates successfully exported to Greenhouse ATS.');
    setTimeout(() => setBatchToast(null), 3000);
  };

  const handleBatchPreScreen = () => {
    setBatchToast('Batch AI pre-screen invitations sent to 4 candidates.');
    setTimeout(() => setBatchToast(null), 3000);
  };

  const toggleShortlist = (candId: string) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candId ? { ...c, shortlisted: !c.shortlisted } : c))
    );
  };

  const handleAddTrait = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTraitInput.trim()) return;
    const newTrait: SemanticTraitWeight = {
      id: `trait-${Date.now()}`,
      label: newTraitInput.trim(),
      weight: 1.0,
      category: 'core',
    };
    setTraitWeights((prev) => [...prev, newTrait]);
    setNewTraitInput('');
    setIsAddingTrait(false);
  };

  const removeTrait = (id: string) => {
    setTraitWeights((prev) => prev.filter((t) => t.id !== id));
  };

  // Filter candidates according to filters
  const filteredCandidates = candidates.filter((c) => {
    if (expDepth === 'staff' && c.yearsExp < 8) return false;
    if (expDepth === 'principal' && c.yearsExp < 10) return false;
    if (noticePeriodFilter === 'immediate' && !c.noticePeriod.toLowerCase().includes('immediate')) return false;
    if (noticePeriodFilter === '30d' && c.noticePeriod.toLowerCase().includes('60')) return false;
    return true;
  });

  const shortlistedCount = candidates.filter((c) => c.shortlisted).length;

  return (
    <div className="flex flex-col w-full gap-5 pb-10">
      {/* Campaign Context & Real-Time Neural Match Banner */}
      <section className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 p-5 sm:p-6 rounded-xl bg-[#131b2e] shadow-xl relative overflow-hidden border border-[#464554]/25">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#8083ff]/5 blur-3xl pointer-events-none"></div>

        <div className="flex flex-col gap-1 relative z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded bg-[#222a3d] text-[#c0c1ff] font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 border border-[#464554]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse"></span>
              Active Campaign Requisition #NLP-809
            </span>
            <span className="text-[#908fa0] font-['Inter'] text-xs">Updated 3 mins ago</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap mt-1">
            <h1 className="font-['Plus+Jakarta+Sans'] text-xl sm:text-2xl font-bold text-[#dae2fd] tracking-tight">
              Staff NLP Research Scientist
            </h1>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#171f33] text-[#c7c4d7] font-['Inter'] text-xs border border-[#464554]/30">
              <span className="material-symbols-outlined text-[16px] text-[#ffb95f]">location_on</span>
              <span>San Francisco / Hybrid</span>
              <span className="material-symbols-outlined text-[14px] text-[#908fa0] ml-1">expand_more</span>
            </div>
          </div>

          <p className="font-['Inter'] text-xs text-[#c7c4d7]">
            Generative Inference &amp; Long-Context Alignment Group • 42 Semantically Ingested Profiles
          </p>
        </div>

        {/* Live Telemetry KPI Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 relative z-10">
          <div className="p-3 rounded-lg bg-[#171f33] flex flex-col justify-center border border-[#464554]/20">
            <span className="font-['Inter'] text-[10px] uppercase tracking-wider text-[#908fa0] font-semibold">
              Ingested Vector
            </span>
            <span className="font-['Plus+Jakarta+Sans'] text-lg font-bold text-[#dae2fd]">42</span>
            <span className="font-mono text-[11px] text-[#4edea3]">100% In Cache</span>
          </div>

          <div className="p-3 rounded-lg bg-[#171f33] flex flex-col justify-center border border-[#464554]/20">
            <span className="font-['Inter'] text-[10px] uppercase tracking-wider text-[#908fa0] font-semibold">
              High Match (&gt;90%)
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-['Plus+Jakarta+Sans'] text-lg font-bold text-[#4edea3]">14</span>
              <span className="font-mono text-xs text-[#908fa0]">/ 42</span>
            </div>
            <span className="font-mono text-[11px] text-[#6ffbbe]">High Confidence</span>
          </div>

          <div className="p-3 rounded-lg bg-[#171f33] flex flex-col justify-center border border-[#464554]/20">
            <span className="font-['Inter'] text-[10px] uppercase tracking-wider text-[#908fa0] font-semibold">
              Pipeline Shortlist
            </span>
            <span className="font-['Plus+Jakarta+Sans'] text-lg font-bold text-[#c0c1ff]">
              {shortlistedCount + 4}
            </span>
            <span className="font-mono text-[11px] text-[#e1e0ff]">2 In Technical Loop</span>
          </div>

          <div className="p-3 rounded-lg bg-[#171f33] flex flex-col justify-center border border-[#464554]/20">
            <span className="font-['Inter'] text-[10px] uppercase tracking-wider text-[#908fa0] font-semibold">
              Avg Vector Latency
            </span>
            <span className="font-['Plus+Jakarta+Sans'] text-lg font-bold text-[#dae2fd]">1.4s</span>
            <span className="font-mono text-[11px] text-[#ffb95f]">Cosine sim. &lt; 0.12</span>
          </div>
        </div>
      </section>

      {/* Semantic Weight Extractor & Control Panel */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Extracted Semantic Concept Lattice (Cols 8) */}
        <div className="lg:col-span-8 p-4 sm:p-5 rounded-xl bg-[#131b2e] flex flex-col justify-between gap-4 shadow-md border border-[#464554]/25">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-[#8083ff]/20 flex items-center justify-center text-[#c0c1ff]">
                <span className="material-symbols-outlined text-[18px]">psychology</span>
              </div>
              <div>
                <h2 className="font-['Plus+Jakarta+Sans'] text-sm sm:text-base font-semibold text-[#dae2fd]">
                  Extracted Semantic Vectors &amp; Requirements
                </h2>
                <p className="font-['Inter'] text-[11px] text-[#c7c4d7]">
                  Extracted from Job Description #809 via Bi-Encoder Core
                </p>
              </div>
            </div>

            <button
              onClick={() => setTuneModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#222a3d] hover:bg-[#31394d] text-[#c0c1ff] font-['Inter'] text-xs font-semibold transition-all shadow-sm border border-[#464554]/30 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">tune</span>
              <span>Tune Semantic Weights &amp; Strictness</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {traitWeights.map((trait) => (
              <div
                key={trait.id}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#171f33] text-[#dae2fd] font-mono text-xs border border-[#464554]/25 group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
                <span>{trait.label}</span>
                <span className="text-[#4edea3] font-semibold ml-0.5">{trait.weight.toFixed(1)}x</span>
                <button
                  onClick={() => removeTrait(trait.id)}
                  className="material-symbols-outlined text-[12px] text-[#908fa0] hover:text-[#ffb4ab] cursor-pointer ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  close
                </button>
              </div>
            ))}

            {isAddingTrait ? (
              <form onSubmit={handleAddTrait} className="flex items-center gap-1">
                <input
                  type="text"
                  autoFocus
                  placeholder="New Trait name..."
                  value={newTraitInput}
                  onChange={(e) => setNewTraitInput(e.target.value)}
                  className="px-2 py-0.5 rounded bg-[#060e20] text-xs text-[#dae2fd] border border-[#8083ff] outline-none"
                />
                <button
                  type="submit"
                  className="px-2 py-0.5 rounded bg-[#4edea3] text-[#002113] text-xs font-semibold cursor-pointer"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingTrait(false)}
                  className="text-xs text-[#908fa0] px-1 hover:text-white"
                >
                  ✕
                </button>
              </form>
            ) : (
              <button
                onClick={() => setIsAddingTrait(true)}
                className="px-2.5 py-1 rounded bg-[#222a3d] hover:bg-[#31394d] text-[#c7c4d7] font-mono text-xs flex items-center gap-1 transition-colors cursor-pointer border border-[#464554]/30"
                type="button"
              >
                <span className="material-symbols-outlined text-[14px]">add</span>
                <span>Add Trait Vector</span>
              </button>
            )}
          </div>

          {/* Keyword vs Vector Match Dual Toggle & Confidence Bar */}
          <div className="pt-2 flex items-center justify-between flex-wrap gap-3 border-t border-[#464554]/20">
            <div className="flex items-center gap-1 bg-[#060e20] p-1 rounded-lg">
              <button
                onClick={() => setRankingMode('vector')}
                className={`px-3 py-1 rounded text-xs font-['Inter'] font-semibold transition-all cursor-pointer ${
                  rankingMode === 'vector'
                    ? 'bg-[#8083ff] text-[#0d0096] shadow-sm'
                    : 'text-[#c7c4d7] hover:text-[#dae2fd]'
                }`}
                type="button"
              >
                Neural Vector Match
              </button>
              <button
                onClick={() => setRankingMode('keyword')}
                className={`px-3 py-1 rounded text-xs font-['Inter'] font-semibold transition-all cursor-pointer ${
                  rankingMode === 'keyword'
                    ? 'bg-[#8083ff] text-[#0d0096] shadow-sm'
                    : 'text-[#c7c4d7] hover:text-[#dae2fd]'
                }`}
                type="button"
              >
                Literal Keyword Match
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="font-['Inter'] text-xs text-[#c7c4d7]">Cosine Distance Metric:</span>
                <span className="font-mono text-xs text-[#4edea3] bg-[#171f33] px-2 py-0.5 rounded border border-[#4edea3]/20">
                  Euclidean L2 Normalized
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-[#ffb95f] font-['Inter'] text-xs">
                <span className="material-symbols-outlined text-[16px]">verified_user</span>
                <span>Zero Demographic Bias Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Threshold & Rapid Filtering Strip (Cols 4) */}
        <div className="lg:col-span-4 p-4 sm:p-5 rounded-xl bg-[#131b2e] flex flex-col justify-between gap-3.5 shadow-md border border-[#464554]/25">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#c0c1ff]">filter_alt</span>
              <span className="font-['Plus+Jakarta+Sans'] text-sm font-semibold text-[#dae2fd]">
                Dynamic Match Filter
              </span>
            </div>
            <span className="font-mono text-xs text-[#4edea3] bg-[#4edea3]/10 px-2 py-0.5 rounded border border-[#4edea3]/20">
              Real-Time
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="font-['Inter'] text-xs text-[#c7c4d7]" htmlFor="thresholdRange">
                NLP Confidence Threshold
              </label>
              <span className="font-mono text-xs text-[#c0c1ff] font-bold">
                {threshold}% Match
              </span>
            </div>
            <input
              className="w-full h-1.5 bg-[#2d3449] rounded-lg appearance-none cursor-pointer accent-[#8083ff]"
              id="thresholdRange"
              max="98"
              min="60"
              type="range"
              value={threshold}
              onChange={(e) => setThreshold(parseInt(e.target.value, 10))}
            />
            <div className="flex justify-between font-['Inter'] text-[11px] text-[#908fa0]">
              <span>60% (Broad)</span>
              <span>98% (Exact)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="flex flex-col gap-1">
              <span className="font-['Inter'] text-[11px] text-[#908fa0]">Exp. Depth</span>
              <select
                value={expDepth}
                onChange={(e) => setExpDepth(e.target.value)}
                className="bg-[#171f33] text-[#dae2fd] font-['Inter'] text-xs rounded-lg px-2 py-1.5 border border-[#464554]/30 outline-none"
              >
                <option value="all">All (&gt;5+ yrs)</option>
                <option value="staff">&gt;8+ yrs (Staff)</option>
                <option value="principal">&gt;10+ yrs (Principal)</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-['Inter'] text-[11px] text-[#908fa0]">Notice Period</span>
              <select
                value={noticePeriodFilter}
                onChange={(e) => setNoticePeriodFilter(e.target.value)}
                className="bg-[#171f33] text-[#dae2fd] font-['Inter'] text-xs rounded-lg px-2 py-1.5 border border-[#464554]/30 outline-none"
              >
                <option value="all">Immediate / &lt;30d</option>
                <option value="immediate">Immediate only</option>
                <option value="30d">Within 60d</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleBatchATS}
              className="w-full py-2 rounded-lg bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] font-['Inter'] text-xs font-semibold flex items-center justify-center gap-1 transition-all border border-[#464554]/30 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">file_upload</span>
              <span>Export Top 5 ATS</span>
            </button>
            <button
              onClick={handleBatchPreScreen}
              className="w-full py-2 rounded-lg bg-[#8083ff] hover:bg-[#c0c1ff] text-[#0d0096] font-['Inter'] text-xs font-semibold flex items-center justify-center gap-1 transition-all shadow-sm cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">outgoing_mail</span>
              <span>Batch Pre-Screen</span>
            </button>
          </div>
        </div>
      </section>

      {/* Side-by-Side Comparison Drawer (Collapsible) */}
      {showCompareDrawer && (
        <section className="rounded-xl bg-[#222a3d] p-5 sm:p-6 shadow-2xl relative transition-all border border-[#8083ff]/40">
          <div className="flex items-center justify-between pb-3 border-b border-[#464554]/30">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#c0c1ff] text-[24px]">compare_arrows</span>
              <div>
                <h3 className="font-['Plus+Jakarta+Sans'] text-base font-semibold text-[#dae2fd]">
                  Semantic Multi-Vector Candidate Comparison
                </h3>
                <p className="font-['Inter'] text-xs text-[#c7c4d7]">
                  Side-by-side dimensional projection against Staff NLP Job Requisition
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowCompareDrawer(false)}
              className="p-1 rounded bg-[#171f33] text-[#c7c4d7] hover:text-[#dae2fd] cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            {/* Target Job Spec Dimensions */}
            <div className="p-4 rounded-lg bg-[#171f33] flex flex-col gap-2 border border-[#464554]/30">
              <span className="font-['Inter'] text-[10px] uppercase tracking-wider text-[#908fa0] font-semibold">
                Target Job Requisition
              </span>
              <div className="font-['Plus+Jakarta+Sans'] text-base font-bold text-[#dae2fd]">
                Staff NLP Scientist
              </div>
              <p className="font-['Inter'] text-xs text-[#c7c4d7]">
                Core priority: KV-Cache latency &amp; distributed RLHF scaling.
              </p>
              <div className="space-y-1.5 pt-1 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-[#908fa0]">Target Weights:</span>
                  <span className="text-[#4edea3]">DPO, FlashAttn</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#908fa0]">Comp Benchmark:</span>
                  <span className="text-[#dae2fd]">$280k - $360k</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#908fa0]">Location Model:</span>
                  <span className="text-[#dae2fd]">Hybrid 3d/wk</span>
                </div>
              </div>
            </div>

            {/* Candidate 1 Compare */}
            <div className="p-4 rounded-lg bg-[#131b2e] flex flex-col gap-2 border border-[#4edea3]/40">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-[#4edea3]/10 text-[#4edea3] font-mono text-xs font-semibold">
                  97% Match (Primary)
                </span>
                <span className="material-symbols-outlined text-[#4edea3] text-[20px]">verified</span>
              </div>
              <div className="font-['Plus+Jakarta+Sans'] text-base font-bold text-[#dae2fd]">
                Marcus Chen, PhD
              </div>
              <span className="font-['Inter'] text-xs text-[#c7c4d7]">Ex-Meta AI • 8 yrs exp</span>
              <div className="space-y-2 pt-1">
                <div>
                  <div className="flex justify-between font-['Inter'] text-xs mb-1">
                    <span className="text-[#c7c4d7]">Research Alignment</span>
                    <span className="text-[#4edea3] font-mono font-semibold">99%</span>
                  </div>
                  <div className="w-full bg-[#171f33] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#4edea3] h-full w-[99%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-['Inter'] text-xs mb-1">
                    <span className="text-[#c7c4d7]">Production Code Vector</span>
                    <span className="text-[#c0c1ff] font-mono font-semibold">94%</span>
                  </div>
                  <div className="w-full bg-[#171f33] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#8083ff] h-full w-[94%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-['Inter'] text-xs mb-1">
                    <span className="text-[#c7c4d7]">KV-Cache &amp; Attention Optim</span>
                    <span className="text-[#4edea3] font-mono font-semibold">98%</span>
                  </div>
                  <div className="w-full bg-[#171f33] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#4edea3] h-full w-[98%]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Candidate 2 Compare */}
            <div className="p-4 rounded-lg bg-[#131b2e] flex flex-col gap-2 border border-[#464554]/30">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-[#4edea3]/10 text-[#4edea3] font-mono text-xs font-semibold">
                  93% Match
                </span>
                <span className="material-symbols-outlined text-[#c0c1ff] text-[20px]">check_circle</span>
              </div>
              <div className="font-['Plus+Jakarta+Sans'] text-base font-bold text-[#dae2fd]">
                Sarah Jenkins
              </div>
              <span className="font-['Inter'] text-xs text-[#c7c4d7]">Senior ML Engineer, Datadog • 6 yrs exp</span>
              <div className="space-y-2 pt-1">
                <div>
                  <div className="flex justify-between font-['Inter'] text-xs mb-1">
                    <span className="text-[#c7c4d7]">System Design &amp; Infra</span>
                    <span className="text-[#4edea3] font-mono font-semibold">96%</span>
                  </div>
                  <div className="w-full bg-[#171f33] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#4edea3] h-full w-[96%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-['Inter'] text-xs mb-1">
                    <span className="text-[#c7c4d7]">Production Code Vector</span>
                    <span className="text-[#4edea3] font-mono font-semibold">92%</span>
                  </div>
                  <div className="w-full bg-[#171f33] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#4edea3] h-full w-[92%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-['Inter'] text-xs mb-1">
                    <span className="text-[#c7c4d7]">RLHF Vector (Delta Gap)</span>
                    <span className="text-[#ffb95f] font-mono font-semibold">74%</span>
                  </div>
                  <div className="w-full bg-[#171f33] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#ffb95f] h-full w-[74%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Candidate Ranking Pipeline Workspace */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <span className="font-['Plus+Jakarta+Sans'] text-base sm:text-lg font-bold text-[#dae2fd]">
              Ranked Candidate Profiles
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#222a3d] text-[#c0c1ff] font-mono text-xs font-semibold border border-[#464554]/30">
              Top {filteredCandidates.length} Matches
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCompareDrawer(!showCompareDrawer)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#131b2e] hover:bg-[#222a3d] text-[#dae2fd] font-['Inter'] text-xs font-medium transition-all shadow-sm border border-[#464554]/30 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px] text-[#c0c1ff]">splitscreen</span>
              <span>{showCompareDrawer ? 'Hide Vector Compare' : 'Open Vector Compare'}</span>
            </button>
          </div>
        </div>

        {/* Candidate Cards */}
        <div className="flex flex-col gap-4">
          {filteredCandidates.map((cand) => {
            const isBelowThreshold = cand.matchScore < threshold;
            return (
              <div
                key={cand.id}
                style={{
                  opacity: isBelowThreshold ? 0.35 : 1.0,
                  transition: 'opacity 0.25s ease',
                }}
                className={`p-4 sm:p-5 rounded-xl bg-[#131b2e] flex flex-col xl:flex-row justify-between gap-5 shadow-xl relative overflow-hidden transition-all hover:bg-[#171f33] border ${
                  cand.shortlisted ? 'border-[#4edea3]/50' : 'border-[#464554]/25'
                }`}
              >
                {/* Left rank colored line */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                    cand.matchScore >= 90 ? 'bg-[#4edea3]' : 'bg-[#8083ff]'
                  }`}
                ></div>

                {/* Profile & Credential Spine */}
                <div className="flex gap-4 min-w-0 xl:w-5/12 pl-1.5">
                  <div className="relative flex-shrink-0">
                    <img
                      className="w-16 h-16 rounded-xl object-cover ring-2 ring-[#4edea3]/40 shadow-md"
                      alt={cand.name}
                      src={cand.avatar}
                    />
                    <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded bg-[#060e20] text-[#4edea3] font-mono text-[11px] font-bold flex items-center gap-0.5 border border-[#4edea3]/30">
                      <span className="w-1 h-1 rounded-full bg-[#4edea3]"></span>#{cand.rank}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-['Plus+Jakarta+Sans'] text-base font-bold text-[#dae2fd] truncate">
                        {cand.name}
                      </h3>
                      <span className="px-2 py-0.5 rounded bg-[#4edea3]/15 text-[#4edea3] font-['Inter'] text-xs font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">auto_awesome</span>
                        {cand.badgeLabel}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#171f33] text-[#908fa0] font-['Inter'] text-[11px]">
                        {cand.companyPast}
                      </span>
                    </div>

                    <p className="font-['Inter'] text-xs text-[#c7c4d7]">
                      {cand.currentRole} • {cand.education}
                    </p>

                    {/* Key Extracted Insights */}
                    <div className="mt-1 p-2.5 rounded-lg bg-[#060e20] text-[#c7c4d7] font-['Inter'] text-xs flex items-start gap-2 border border-[#464554]/20">
                      <span className="material-symbols-outlined text-[16px] text-[#4edea3] flex-shrink-0 mt-0.5">
                        lightbulb
                      </span>
                      <span className="leading-snug">{cand.keyInsight}</span>
                    </div>

                    {/* Semantic Pills */}
                    <div className="flex flex-wrap gap-1 mt-1">
                      {cand.semanticPills.map((pill, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-[#171f33] text-[#dae2fd] font-mono text-[11px] border border-[#464554]/20"
                        >
                          {pill}
                        </span>
                      ))}
                      <span className="px-2 py-0.5 rounded bg-[#171f33] text-[#4edea3] font-mono text-[11px] border border-[#4edea3]/20">
                        +{cand.nlpVectorOverlaps} NLP Vector overlaps
                      </span>
                    </div>
                  </div>
                </div>

                {/* Semantic Cosine Decomposition Breakdown */}
                <div className="xl:w-4/12 flex flex-col justify-center gap-2 py-1">
                  <span className="font-['Inter'] text-[10px] uppercase tracking-wider text-[#908fa0] font-semibold">
                    Semantic Distance Breakdown
                  </span>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2.5 rounded-lg bg-[#171f33] flex flex-col border border-[#464554]/20">
                      <span className="font-['Inter'] text-[10px] text-[#908fa0]">
                        {cand.systemDesign ? 'System Design' : 'Research Align'}
                      </span>
                      <span className="font-['Plus+Jakarta+Sans'] text-base font-bold text-[#4edea3]">
                        {cand.systemDesign || cand.researchAlign}%
                      </span>
                      <div className="w-full bg-[#2d3449] h-1 rounded-full mt-1 overflow-hidden">
                        <div
                          className="bg-[#4edea3] h-full"
                          style={{ width: `${cand.systemDesign || cand.researchAlign}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#171f33] flex flex-col border border-[#464554]/20">
                      <span className="font-['Inter'] text-[10px] text-[#908fa0]">
                        {cand.nlpTooling ? 'NLP Tooling' : 'Code Vector'}
                      </span>
                      <span className="font-['Plus+Jakarta+Sans'] text-base font-bold text-[#c0c1ff]">
                        {cand.nlpTooling || cand.codeVector}%
                      </span>
                      <div className="w-full bg-[#2d3449] h-1 rounded-full mt-1 overflow-hidden">
                        <div
                          className="bg-[#8083ff] h-full"
                          style={{ width: `${cand.nlpTooling || cand.codeVector}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#171f33] flex flex-col border border-[#464554]/20">
                      <span className="font-['Inter'] text-[10px] text-[#908fa0]">
                        {cand.alignmentExp ? 'Alignment Exp' : 'Publication Rel.'}
                      </span>
                      <span
                        className={`font-['Plus+Jakarta+Sans'] text-base font-bold ${
                          (cand.alignmentExp || cand.publicationRel) < 80
                            ? 'text-[#ffb95f]'
                            : 'text-[#4edea3]'
                        }`}
                      >
                        {cand.alignmentExp || cand.publicationRel}%
                      </span>
                      <div className="w-full bg-[#2d3449] h-1 rounded-full mt-1 overflow-hidden">
                        <div
                          className={`h-full ${
                            (cand.alignmentExp || cand.publicationRel) < 80
                              ? 'bg-[#ffb95f]'
                              : 'bg-[#4edea3]'
                          }`}
                          style={{ width: `${cand.alignmentExp || cand.publicationRel}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[#908fa0] font-['Inter'] text-xs">
                    <span>Notice: {cand.noticePeriod}</span>
                    <span className="font-semibold text-[#dae2fd]">Target: {cand.targetComp}</span>
                  </div>
                </div>

                {/* Action Column */}
                <div className="xl:w-3/12 flex flex-col justify-center gap-2">
                  <button
                    onClick={() => setSelectedCandidateForInterview(cand)}
                    className="w-full py-2 rounded-lg bg-[#8083ff] hover:bg-[#c0c1ff] text-[#0d0096] font-['Inter'] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">calendar_add_on</span>
                    <span>Schedule Technical Interview</span>
                  </button>

                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => setSelectedCandidateForDiff(cand)}
                      className="py-1.5 rounded-lg bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] font-['Inter'] text-xs flex items-center justify-center gap-1 transition-all border border-[#464554]/30 cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[15px] text-[#c0c1ff]">
                        difference
                      </span>
                      <span>Semantic CV Diff</span>
                    </button>

                    <button
                      onClick={() => toggleShortlist(cand.id)}
                      className={`py-1.5 rounded-lg font-['Inter'] text-xs flex items-center justify-center gap-1 transition-all border cursor-pointer ${
                        cand.shortlisted
                          ? 'bg-[#4edea3]/20 text-[#4edea3] border-[#4edea3]/40'
                          : 'bg-[#222a3d] hover:bg-[#31394d] text-[#c7c4d7] hover:text-[#dae2fd] border-[#464554]/30'
                      }`}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[15px]">
                        {cand.shortlisted ? 'check' : 'bookmark_add'}
                      </span>
                      <span>{cand.shortlisted ? 'Shortlisted' : 'Shortlist'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Batch Toast */}
      {batchToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#171f33] border border-[#4edea3] text-[#dae2fd] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <span className="material-symbols-outlined text-[#4edea3] text-[24px]">verified</span>
          <div>
            <div className="text-xs font-semibold text-[#4edea3]">Action Executed</div>
            <div className="text-[11px] text-[#c7c4d7]">{batchToast}</div>
          </div>
        </div>
      )}

      {/* Modals */}
      <TuneWeightsModal
        isOpen={tuneModalOpen}
        onClose={() => setTuneModalOpen(false)}
        onApply={(newW) => {
          setTraitWeights((prev) =>
            prev.map((t) => {
              if (t.label.includes('DPO')) return { ...t, weight: newW.dpo };
              if (t.label.includes('RLHF')) return { ...t, weight: newW.rlhf };
              if (t.label.includes('FlashAttention')) return { ...t, weight: newW.flashAttn };
              return t;
            })
          );
        }}
      />

      <CVDebriefModal
        candidate={selectedCandidateForDiff}
        isOpen={Boolean(selectedCandidateForDiff)}
        onClose={() => setSelectedCandidateForDiff(null)}
      />

      <ScheduleInterviewModal
        candidate={selectedCandidateForInterview}
        isOpen={Boolean(selectedCandidateForInterview)}
        onClose={() => setSelectedCandidateForInterview(null)}
        onScheduled={(name, slot) => {
          setBatchToast(`Interview confirmed with ${name} for ${slot}.`);
          setTimeout(() => setBatchToast(null), 3500);
        }}
      />
    </div>
  );
};
