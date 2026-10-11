import React, { useState } from 'react';
import { ELENA_VANCE_PROFILE, INITIAL_JOB_MATCHES } from '../data/mockData';
import { JobMatch } from '../types';
import { ReIndexModal, JobScoutModal } from './Modals';

export const JobSeekerFeedView: React.FC = () => {
  const [jobs, setJobs] = useState<JobMatch[]>(INITIAL_JOB_MATCHES);
  const [selectedJob, setSelectedJob] = useState<JobMatch>(INITIAL_JOB_MATCHES[0]);
  const [searchQuery, setSearchQuery] = useState(
    'Senior MLOps Engineer building distributed PyTorch training pipelines in Kubernetes, remote, $180k+'
  );
  const [rankingMode, setRankingMode] = useState<'semantic' | 'exact'>('semantic');
  const [isParsing, setIsParsing] = useState(false);
  const [latency, setLatency] = useState(18);

  // Filters
  const [filters, setFilters] = useState([
    { id: 'f-1', label: 'Remote: US & Canada', icon: 'pin_drop', color: 'text-[#c0c1ff]' },
    { id: 'f-2', label: 'Match Score > 85%', icon: 'tune', color: 'text-[#4edea3]' },
    { id: 'f-3', label: 'Level: Staff / Lead / Principal', icon: 'military_tech', color: 'text-[#c0c1ff]' },
    { id: 'f-4', label: 'Target Comp: $180k+', icon: 'payments', color: 'text-[#ffb95f]' },
  ]);

  // Discovery calibration toggles
  const [excludeNonRemote, setExcludeNonRemote] = useState(true);
  const [highlightEquity, setHighlightEquity] = useState(true);
  const [autoSuppressNda, setAutoSuppressNda] = useState(false);

  // Modals
  const [reIndexModalOpen, setReIndexModalOpen] = useState(false);
  const [jobScoutOpen, setJobScoutOpen] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [showApplyToast, setShowApplyToast] = useState(false);

  const handleReParse = () => {
    setIsParsing(true);
    setTimeout(() => {
      setIsParsing(false);
      setLatency(Math.floor(Math.random() * 12) + 14);
    }, 450);
  };

  const removeFilter = (id: string) => {
    setFilters((prev) => prev.filter((f) => f.id !== id));
  };

  const handleApply = (jobId: string) => {
    if (!appliedJobs.includes(jobId)) {
      setAppliedJobs((prev) => [...prev, jobId]);
      setShowApplyToast(true);
      setTimeout(() => setShowApplyToast(false), 3000);
    }
  };

  const toggleBookmark = (jobId: string) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, bookmarked: !j.bookmarked } : j))
    );
    if (selectedJob.id === jobId) {
      setSelectedJob((prev) => ({ ...prev, bookmarked: !prev.bookmarked }));
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Semantic Query & Vector Filtering Chassis */}
      <section className="w-full mb-5 flex flex-col gap-3.5">
        <div className="relative w-full rounded-xl bg-[#222a3d]/90 p-3.5 sm:p-4 shadow-xl backdrop-blur-xl border border-[#464554]/25">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3.5">
            <div className="flex items-center gap-2 pl-1 text-[#c0c1ff] flex-shrink-0">
              <span className="material-symbols-outlined text-[24px]">psychology</span>
              <span className="font-['Inter'] text-[11px] font-semibold uppercase tracking-wider text-[#c0c1ff]">
                NLP Query Bar
              </span>
            </div>

            <div className="relative flex-grow flex items-center">
              <input
                className="w-full bg-[#060e20]/80 text-[#dae2fd] placeholder:text-[#908fa0] font-['Inter'] text-xs sm:text-[13px] px-3.5 py-2.5 rounded-lg outline-none transition-all shadow-inner border border-transparent focus:border-[#c0c1ff]/50 pr-40 sm:pr-48"
                id="nlp-search-input"
                placeholder="Describe your ideal role in natural conversational language..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleReParse()}
              />
              <div className="absolute right-2 hidden sm:flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#171f33] text-[#4edea3] font-mono text-[11px] tracking-tight border border-[#4edea3]/20">
                  Embedding 1536-D
                </span>
                <button
                  onClick={handleReParse}
                  className="px-2.5 py-1 rounded bg-[#c0c1ff] text-[#1000a9] font-['Inter'] text-xs font-semibold hover:bg-[#e1e0ff] transition-colors flex items-center gap-1 shadow-sm cursor-pointer"
                  type="button"
                >
                  <span
                    className={`material-symbols-outlined text-[16px] ${
                      isParsing ? 'animate-spin' : ''
                    }`}
                  >
                    sync
                  </span>
                  <span>Re-Parse</span>
                </button>
              </div>
            </div>

            {/* Metric Speed Indicator */}
            <div className="flex items-center justify-between lg:justify-end gap-3 text-[#c7c4d7] flex-shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#4edea3]"></span>
                <span className="font-mono text-xs text-[#4edea3] font-medium">
                  Latency: {latency}ms
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#131b2e] px-2.5 py-1 rounded-lg border border-[#464554]/25">
                <span className="material-symbols-outlined text-[16px] text-[#ffb95f]">bolt</span>
                <span className="font-['Inter'] text-xs text-[#ffb95f] font-semibold">
                  Cosine Top-K: 48
                </span>
              </div>
            </div>
          </div>

          {/* Semantic Dynamic Tag Rail */}
          <div className="mt-3.5 pt-2 flex flex-wrap items-center gap-2 border-t border-[#464554]/20">
            <span className="font-['Inter'] text-[11px] uppercase text-[#908fa0] mr-1 tracking-wider font-semibold">
              Extracted Filters:
            </span>

            {filters.map((f) => (
              <div
                key={f.id}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#171f33] text-[#dae2fd] font-['Inter'] text-xs border border-[#464554]/30"
              >
                <span className={`material-symbols-outlined text-[14px] ${f.color}`}>
                  {f.icon}
                </span>
                <span>{f.label}</span>
                <button
                  onClick={() => removeFilter(f.id)}
                  className="material-symbols-outlined text-[14px] text-[#908fa0] hover:text-[#ffb4ab] cursor-pointer ml-0.5"
                >
                  close
                </button>
              </div>
            ))}

            <div className="ml-auto hidden xl:flex items-center gap-2">
              <span className="font-['Inter'] text-xs text-[#908fa0]">Ranking Mode:</span>
              <div className="inline-flex rounded-lg p-0.5 bg-[#060e20]">
                <button
                  onClick={() => setRankingMode('semantic')}
                  className={`px-2.5 py-1 rounded text-xs font-['Inter'] transition-all cursor-pointer ${
                    rankingMode === 'semantic'
                      ? 'text-[#c0c1ff] font-semibold bg-[#222a3d] shadow-sm'
                      : 'text-[#908fa0] hover:text-[#dae2fd]'
                  }`}
                  type="button"
                >
                  Semantic Vector
                </button>
                <button
                  onClick={() => setRankingMode('exact')}
                  className={`px-2.5 py-1 rounded text-xs font-['Inter'] transition-all cursor-pointer ${
                    rankingMode === 'exact'
                      ? 'text-[#c0c1ff] font-semibold bg-[#222a3d] shadow-sm'
                      : 'text-[#908fa0] hover:text-[#dae2fd]'
                  }`}
                  type="button"
                >
                  Exact Keyword
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Column Dense Layout System: Vector Profile / Feed / Deep Inspector */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT PANEL (Cols 3): Candidate Resume Vector Node */}
        <aside className="lg:col-span-3 flex flex-col gap-4">
          {/* Resume Index Health Card */}
          <div className="rounded-xl bg-[#131b2e] p-4 shadow-lg border border-[#464554]/25 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  className="w-12 h-12 rounded-full object-cover shadow-md ring-2 ring-[#4edea3]/40"
                  alt="Dr Elena Vance portrait"
                  src={ELENA_VANCE_PROFILE.avatar}
                />
                <div className="flex flex-col">
                  <span className="font-['Plus+Jakarta+Sans'] text-sm font-semibold text-[#dae2fd]">
                    {ELENA_VANCE_PROFILE.name}
                  </span>
                  <span className="font-['Inter'] text-xs text-[#c0c1ff]">
                    {ELENA_VANCE_PROFILE.title}
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#4edea3] text-[20px]">verified</span>
            </div>

            {/* Vector Density Metric Banner */}
            <div className="p-3 rounded-lg bg-[#060e20] flex items-center justify-between border border-[#464554]/20">
              <div className="flex flex-col">
                <span className="font-['Inter'] text-[11px] text-[#908fa0]">Vector Fidelity</span>
                <span className="font-['Plus+Jakarta+Sans'] text-lg font-bold text-[#4edea3]">
                  {ELENA_VANCE_PROFILE.vectorFidelity}%
                </span>
              </div>
              <div className="w-16 h-10 flex items-end gap-1">
                <div className="w-2.5 h-6 bg-[#4edea3]/30 rounded-t-sm"></div>
                <div className="w-2.5 h-8 bg-[#4edea3]/50 rounded-t-sm"></div>
                <div className="w-2.5 h-5 bg-[#4edea3]/40 rounded-t-sm"></div>
                <div className="w-2.5 h-10 bg-[#4edea3] rounded-t-sm"></div>
                <div className="w-2.5 h-9 bg-[#4edea3]/80 rounded-t-sm"></div>
              </div>
            </div>

            {/* Extracted Semantic Clusters */}
            <div className="flex flex-col gap-2.5">
              <span className="font-['Inter'] text-[11px] uppercase tracking-wider text-[#c7c4d7] font-semibold">
                Active Semantic Clusters
              </span>
              <div className="flex flex-col gap-2.5 pt-1">
                {ELENA_VANCE_PROFILE.activeClusters.map((cluster, i) => (
                  <div key={i}>
                    <div className="flex justify-between font-['Inter'] text-xs mb-1">
                      <span className="text-[#dae2fd]">{cluster.name}</span>
                      <span
                        className={`font-mono text-xs font-semibold ${
                          cluster.color === 'secondary' ? 'text-[#4edea3]' : 'text-[#c0c1ff]'
                        }`}
                      >
                        {cluster.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-[#2d3449] h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          cluster.color === 'secondary' ? 'bg-[#4edea3]' : 'bg-[#8083ff]'
                        }`}
                        style={{ width: `${cluster.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Model Context Information */}
            <div className="pt-1 flex flex-col gap-1 text-[11px] text-[#908fa0] font-mono border-t border-[#464554]/20">
              <div className="flex justify-between">
                <span>Model:</span>
                <span className="text-[#c7c4d7]">{ELENA_VANCE_PROFILE.model}</span>
              </div>
              <div className="flex justify-between">
                <span>Last Sync:</span>
                <span className="text-[#c7c4d7]">{ELENA_VANCE_PROFILE.lastSync}</span>
              </div>
              <div className="flex justify-between">
                <span>Cosine Seed:</span>
                <span className="text-[#c7c4d7]">{ELENA_VANCE_PROFILE.cosineSeed}</span>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => setReIndexModalOpen(true)}
              className="w-full py-2 px-3 rounded-lg bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] font-['Inter'] text-xs font-medium transition-all flex items-center justify-center gap-2 shadow-sm border border-[#464554]/30 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] text-[#c0c1ff]">upload_file</span>
              <span>Re-Index New CV / Resume</span>
            </button>
          </div>

          {/* Algorithmic Preferences Module */}
          <div className="rounded-xl bg-[#131b2e] p-4 shadow-lg border border-[#464554]/25 flex flex-col gap-2">
            <span className="font-['Inter'] text-[11px] uppercase tracking-wider text-[#908fa0] font-semibold mb-1">
              Discovery Calibration
            </span>

            <div className="flex items-center justify-between py-1">
              <span className="font-['Inter'] text-xs text-[#dae2fd]">Exclude Non-Remote</span>
              <button
                onClick={() => setExcludeNonRemote(!excludeNonRemote)}
                className={`w-8 h-4 rounded-full flex items-center px-0.5 transition-colors cursor-pointer ${
                  excludeNonRemote ? 'bg-[#4edea3] justify-end' : 'bg-[#2d3449] justify-start'
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    excludeNonRemote ? 'bg-[#060e20]' : 'bg-[#908fa0]'
                  }`}
                ></div>
              </button>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="font-['Inter'] text-xs text-[#dae2fd]">Highlight Equity Heavy</span>
              <button
                onClick={() => setHighlightEquity(!highlightEquity)}
                className={`w-8 h-4 rounded-full flex items-center px-0.5 transition-colors cursor-pointer ${
                  highlightEquity ? 'bg-[#4edea3] justify-end' : 'bg-[#2d3449] justify-start'
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    highlightEquity ? 'bg-[#060e20]' : 'bg-[#908fa0]'
                  }`}
                ></div>
              </button>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="font-['Inter'] text-xs text-[#dae2fd]">Auto-Suppress NDA Roles</span>
              <button
                onClick={() => setAutoSuppressNda(!autoSuppressNda)}
                className={`w-8 h-4 rounded-full flex items-center px-0.5 transition-colors cursor-pointer ${
                  autoSuppressNda ? 'bg-[#4edea3] justify-end' : 'bg-[#2d3449] justify-start'
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    autoSuppressNda ? 'bg-[#060e20]' : 'bg-[#908fa0]'
                  }`}
                ></div>
              </button>
            </div>

            {/* Semantic Drift Alert */}
            <div className="mt-2 p-2.5 rounded-lg bg-[#2d3449]/60 flex items-start gap-2 border border-[#ffb95f]/20">
              <span className="material-symbols-outlined text-[16px] text-[#ffb95f] flex-shrink-0 mt-0.5">
                info
              </span>
              <span className="font-['Inter'] text-[11px] text-[#c7c4d7] leading-snug">
                Your semantic cluster matches {ELENA_VANCE_PROFILE.matchedOpportunitiesCount} open
                opportunities across tier-1 AI labs this week.
              </span>
            </div>
          </div>
        </aside>

        {/* CENTER FEED (Cols 5): High-Yield Semantic Job Match Stream */}
        <main className="lg:col-span-5 flex flex-col gap-4">
          {/* Stream Header Controls */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="font-['Plus+Jakarta+Sans'] text-base font-semibold text-[#dae2fd]">
                Vector Ranked Feed
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#8083ff]/20 text-[#c0c1ff] font-mono text-xs font-semibold">
                38 Top Matches
              </span>
            </div>
            <div className="flex items-center gap-1 text-[#908fa0] text-xs">
              <span className="material-symbols-outlined text-[18px]">sort</span>
              <span>Sort: Cosine Similarity</span>
            </div>
          </div>

          {/* Job cards stream */}
          <div className="flex flex-col gap-3.5">
            {jobs.map((job) => {
              const isSelected = selectedJob.id === job.id;
              return (
                <article
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className={`relative rounded-xl bg-[#131b2e] hover:bg-[#171f33] transition-all p-4 shadow-xl flex flex-col gap-3.5 cursor-pointer border ${
                    isSelected
                      ? 'border-[#8083ff] ring-1 ring-[#8083ff]/60 shadow-[0_0_24px_-4px_rgba(128,131,255,0.25)]'
                      : 'border-[#464554]/25 hover:border-[#464554]/50'
                  }`}
                >
                  {/* Algorithmic Score Ribbon */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-11 h-11 rounded-lg bg-[#2d3449] flex items-center justify-center font-['Plus+Jakarta+Sans'] text-lg font-bold shadow-md ${job.avatarLetterColor}`}
                      >
                        {job.avatarLetter}
                      </div>
                      <div className="flex flex-col">
                        <h3 className="font-['Plus+Jakarta+Sans'] text-sm sm:text-base font-semibold text-[#dae2fd] hover:text-[#c0c1ff] transition-colors">
                          {job.title}
                        </h3>
                        <span className="font-['Inter'] text-xs text-[#c7c4d7]">
                          {job.company} • {job.location}
                        </span>
                      </div>
                    </div>

                    {/* Semantic Badge */}
                    <div className="flex flex-col items-end flex-shrink-0">
                      <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00a572]/20 text-[#4edea3]">
                        <span className="material-symbols-outlined text-[16px]">verified</span>
                        <span className="font-['Plus+Jakarta+Sans'] text-sm font-bold">
                          {job.score}%
                        </span>
                      </div>
                      <span className="font-['Inter'] text-[10px] text-[#4edea3] mt-0.5 uppercase tracking-wide font-semibold">
                        {job.matchTier}
                      </span>
                    </div>
                  </div>

                  {/* Algorithmic Similarity Vector Breakdown */}
                  <div className="grid grid-cols-3 gap-2 p-2 rounded-lg bg-[#060e20] text-center border border-[#464554]/20">
                    <div className="flex flex-col">
                      <span className="font-['Inter'] text-[10px] text-[#908fa0]">Skill Vector</span>
                      <span className="font-mono text-xs text-[#4edea3] font-semibold">
                        {job.skillVector}%
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-['Inter'] text-[10px] text-[#908fa0]">
                        Experience Match
                      </span>
                      <span className="font-mono text-xs text-[#4edea3] font-semibold">
                        {job.experienceMatch}%
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-['Inter'] text-[10px] text-[#908fa0]">
                        Domain Alignment
                      </span>
                      <span className="font-mono text-xs text-[#c0c1ff] font-semibold">
                        {job.domainAlignment}%
                      </span>
                    </div>
                  </div>

                  {/* Semantic Highlighted Keywords Chips */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between font-['Inter'] text-[11px] text-[#908fa0]">
                      <span>High-Affinity Vector Matches</span>
                      <span className="text-[#4edea3] font-mono">
                        {job.exactTokenCount} exact token overlaps
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {job.highAffinityTokens.map((token, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-[#222a3d] text-[#4edea3] font-['Inter'] text-xs flex items-center gap-1 border border-[#4edea3]/20"
                        >
                          <span className="material-symbols-outlined text-[12px]">done_all</span>{' '}
                          {token}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Missing / Delta Suggestion Pill if present */}
                  {job.resumeGap && (
                    <div className="px-2.5 py-1 rounded-lg bg-[#ca8100]/20 text-[#ffb95f] font-['Inter'] text-xs flex items-center justify-between border border-[#ca8100]/30">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px]">trending_up</span>
                        <span>Resume Gap: {job.resumeGap.skill}</span>
                      </div>
                      <span className="font-mono text-[11px] font-bold">
                        {job.resumeGap.boost}
                      </span>
                    </div>
                  )}

                  {/* Card Footer Metas and CTAs */}
                  <div className="flex items-center justify-between pt-1 text-[#c7c4d7] font-['Inter'] text-xs">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-[#dae2fd]">
                        {job.compensation} • {job.equity}
                      </span>
                      <span className="text-[#908fa0] hidden sm:inline">{job.postedAgo}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(job.id);
                        }}
                        aria-label="Save"
                        className="p-1 rounded hover:bg-[#222a3d] text-[#908fa0] hover:text-[#dae2fd] cursor-pointer"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {job.bookmarked ? 'bookmark' : 'bookmark_border'}
                        </span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedJob(job);
                        }}
                        className={`px-3 py-1 rounded font-['Inter'] text-xs font-semibold transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#c0c1ff] text-[#1000a9] hover:bg-[#e1e0ff]'
                            : 'bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd]'
                        }`}
                        type="button"
                      >
                        Inspect Role
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </main>

        {/* RIGHT PANEL (Cols 4): Semantic Vector Deep Inspector Drawer */}
        <aside className="lg:col-span-4 flex flex-col gap-4">
          <div className="rounded-xl bg-[#131b2e] p-4 shadow-xl border border-[#464554]/25 flex flex-col gap-4">
            {/* Inspector Head & Employer Brand Feature */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-[#00a572]/20 text-[#4edea3] font-['Inter'] text-[11px] uppercase tracking-wider font-semibold border border-[#4edea3]/20">
                  Live Vector Inspector
                </span>
                <span className="font-mono text-xs text-[#908fa0]">ID: #{selectedJob.id}</span>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <img
                  className="w-14 h-14 rounded-lg object-cover shadow-sm flex-shrink-0 ring-1 ring-[#464554]/40"
                  alt={`${selectedJob.company} office`}
                  src={selectedJob.companyImage}
                />
                <div className="flex flex-col">
                  <h2 className="font-['Plus+Jakarta+Sans'] text-base font-semibold text-[#dae2fd] leading-tight">
                    {selectedJob.title}
                  </h2>
                  <span className="font-['Inter'] text-xs text-[#c0c1ff] font-medium mt-0.5">
                    {selectedJob.company} • {selectedJob.department}
                  </span>
                </div>
              </div>
            </div>

            {/* "Why NLP Matched You" AI Explainability Node */}
            <div className="rounded-lg bg-[#2d3449] p-3.5 flex flex-col gap-1.5 shadow-inner border border-[#464554]/20">
              <div className="flex items-center gap-1.5 text-[#c0c1ff]">
                <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                <span className="font-['Inter'] text-[11px] font-semibold uppercase tracking-wider">
                  Semantic Match Rationale
                </span>
              </div>
              <p className="font-['Inter'] text-xs text-[#c7c4d7] leading-relaxed">
                {selectedJob.rationale}
              </p>
              <div className="mt-1 flex items-center justify-between text-[11px] font-mono text-[#908fa0] border-t border-[#464554]/30 pt-1.5">
                <span>Cosine Distance: {selectedJob.cosineDistance.toFixed(3)}</span>
                <span className="text-[#4edea3]">High Statistical Significance</span>
              </div>
            </div>

            {/* Semantic Skill Gap Matrix */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-['Plus+Jakarta+Sans'] text-xs font-semibold text-[#dae2fd]">
                  Vector Skills Breakdown
                </span>
                <span className="font-['Inter'] text-[11px] text-[#908fa0]">
                  {selectedJob.vectorSkills.filter((s) => !s.isGap).length} of{' '}
                  {selectedJob.vectorSkills.length} Matched
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                {selectedJob.vectorSkills.map((sk, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded bg-[#171f33] flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`material-symbols-outlined text-[16px] ${
                          sk.isGap ? 'text-[#ffb95f]' : 'text-[#4edea3]'
                        }`}
                      >
                        {sk.isGap ? 'warning' : 'check_circle'}
                      </span>
                      <span className="text-[#dae2fd] font-medium">{sk.name}</span>
                    </div>
                    <span
                      className={`font-mono text-[11px] ${
                        sk.isGap ? 'text-[#ffb95f]' : 'text-[#4edea3]'
                      }`}
                    >
                      {sk.isGap ? 'Gap Identified' : `${sk.proximity}% Proximity`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Role Core Compensation & Team Attributes */}
            <div className="grid grid-cols-2 gap-2 p-2.5 rounded-lg bg-[#060e20] border border-[#464554]/20">
              <div className="flex flex-col">
                <span className="font-['Inter'] text-[11px] text-[#908fa0]">Total Rewards</span>
                <span className="font-['Plus+Jakarta+Sans'] text-xs font-semibold text-[#dae2fd] mt-0.5">
                  {selectedJob.totalRewards}
                </span>
                <span className="font-['Inter'] text-[10px] text-[#4edea3]">
                  {selectedJob.equityType}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-['Inter'] text-[11px] text-[#908fa0]">Team Topology</span>
                <span className="font-['Plus+Jakarta+Sans'] text-xs font-semibold text-[#dae2fd] mt-0.5">
                  {selectedJob.teamTopology}
                </span>
                <span className="font-['Inter'] text-[10px] text-[#c7c4d7]">
                  {selectedJob.reportingTo}
                </span>
              </div>
            </div>

            {/* Tech Stack Vector Graph (Inline SVG Visualization) */}
            <div className="flex flex-col gap-1.5">
              <span className="font-['Inter'] text-[11px] uppercase tracking-wider text-[#908fa0] font-semibold">
                Semantic Latent Space Proximity
              </span>
              <div className="w-full h-24 rounded-lg bg-[#060e20] flex items-center justify-center p-2 border border-[#464554]/20">
                <svg
                  className="w-full h-full text-[#c0c1ff]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 320 80"
                >
                  <line
                    stroke="currentColor"
                    strokeOpacity="0.25"
                    strokeWidth="1.5"
                    x1="60"
                    x2="160"
                    y1="40"
                    y2="25"
                  ></line>
                  <line
                    stroke="currentColor"
                    strokeOpacity="0.25"
                    strokeWidth="1.5"
                    x1="160"
                    x2="260"
                    y1="25"
                    y2="45"
                  ></line>
                  <line
                    stroke="currentColor"
                    strokeOpacity="0.1"
                    strokeWidth="1"
                    x1="60"
                    x2="260"
                    y1="40"
                    y2="45"
                  ></line>
                  <line
                    stroke="currentColor"
                    strokeOpacity="0.3"
                    strokeWidth="1.5"
                    x1="160"
                    x2="190"
                    y1="25"
                    y2="65"
                  ></line>

                  {/* Candidate Vector Node */}
                  <circle
                    cx="60"
                    cy="40"
                    fill="#4edea3"
                    fillOpacity="0.25"
                    r="10"
                    stroke="#4edea3"
                    strokeWidth="2"
                  ></circle>
                  <circle cx="60" cy="40" fill="#4edea3" r="4"></circle>
                  <text
                    fill="#dae2fd"
                    fontFamily="Inter"
                    fontSize="9"
                    textAnchor="middle"
                    x="60"
                    y="65"
                  >
                    Candidate
                  </text>

                  {/* Central Job Node */}
                  <circle
                    cx="160"
                    cy="25"
                    fill="#8083ff"
                    fillOpacity="0.3"
                    r="14"
                    stroke="#8083ff"
                    strokeWidth="2"
                  ></circle>
                  <circle cx="160" cy="25" fill="#c0c1ff" r="5"></circle>
                  <text
                    fill="#c0c1ff"
                    fontFamily="Inter"
                    fontSize="9"
                    textAnchor="middle"
                    x="160"
                    y="10"
                  >
                    Job Vector Target
                  </text>

                  {/* Adjacent Nodes */}
                  <circle
                    cx="260"
                    cy="45"
                    fill="#2d3449"
                    r="8"
                    stroke="#908fa0"
                    strokeWidth="1.5"
                  ></circle>
                  <text
                    fill="#908fa0"
                    fontFamily="Inter"
                    fontSize="8"
                    textAnchor="middle"
                    x="260"
                    y="65"
                  >
                    {selectedJob.company} Stack
                  </text>

                  <circle
                    cx="190"
                    cy="65"
                    fill="#ffb95f"
                    fillOpacity="0.3"
                    r="6"
                    stroke="#ffb95f"
                    strokeWidth="1.5"
                  ></circle>
                  <text
                    fill="#ffb95f"
                    fontFamily="Inter"
                    fontSize="8"
                    textAnchor="middle"
                    x="190"
                    y="78"
                  >
                    Delta Gap
                  </text>
                </svg>
              </div>
            </div>

            {/* Primary Action Triggers */}
            <div className="flex flex-col gap-2.5 pt-1">
              <button
                onClick={() => handleApply(selectedJob.id)}
                className={`w-full py-2.5 px-4 rounded-lg font-['Plus+Jakarta+Sans'] text-sm transition-all shadow-lg flex items-center justify-center gap-2 font-semibold cursor-pointer ${
                  appliedJobs.includes(selectedJob.id)
                    ? 'bg-[#4edea3] text-[#002113]'
                    : 'bg-[#c0c1ff] hover:bg-[#e1e0ff] text-[#1000a9]'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {appliedJobs.includes(selectedJob.id) ? 'check_circle' : 'bolt'}
                </span>
                <span>
                  {appliedJobs.includes(selectedJob.id)
                    ? 'Application Vector Transmitted'
                    : 'Instant Apply via Semantic Vector'}
                </span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setJobScoutOpen(true)}
                  className="py-2 px-2 rounded-lg bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] font-['Inter'] text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm border border-[#464554]/30 cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#4edea3]">
                    chat
                  </span>
                  <span>Ask AI Job Scout</span>
                </button>
                <button
                  onClick={() => alert(`Comparing ${selectedJob.title} against your top 3 profile target vectors`)}
                  className="py-2 px-2 rounded-lg bg-[#222a3d] hover:bg-[#31394d] text-[#dae2fd] font-['Inter'] text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm border border-[#464554]/30 cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#c0c1ff]">
                    compare_arrows
                  </span>
                  <span>Side-by-Side</span>
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Toast Notification */}
      {showApplyToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#171f33] border border-[#4edea3] text-[#dae2fd] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <span className="material-symbols-outlined text-[#4edea3] text-[24px]">verified</span>
          <div>
            <div className="text-xs font-semibold text-[#4edea3]">Vector Transmitted</div>
            <div className="text-[11px] text-[#c7c4d7]">
              Anonymized candidate vector dispatched to {selectedJob.company} hiring API.
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <ReIndexModal
        isOpen={reIndexModalOpen}
        onClose={() => setReIndexModalOpen(false)}
        onReIndexed={() => {
          alert('CV Vectorization completed: 1,536 embeddings refreshed.');
        }}
      />

      <JobScoutModal
        job={selectedJob}
        isOpen={jobScoutOpen}
        onClose={() => setJobScoutOpen(false)}
      />
    </div>
  );
};
