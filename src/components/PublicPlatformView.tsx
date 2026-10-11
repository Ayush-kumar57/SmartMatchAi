import React, { useState } from 'react';
import { ActiveScreen } from '../types';

interface PublicPlatformViewProps {
  onNavigate: (screen: ActiveScreen) => void;
}

export const PublicPlatformView: React.FC<PublicPlatformViewProps> = ({ onNavigate }) => {
  const [queryInput, setQueryInput] = useState(
    'Lead Backend Go engineer who loves high-throughput Kafka streaming in fintech'
  );
  const [isVectorizing, setIsVectorizing] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [pilotEmail, setPilotEmail] = useState('');
  const [pilotSubmitted, setPilotSubmitted] = useState(false);

  // Dynamic search results for the interactive playground
  const [results, setResults] = useState([
    {
      id: 'res-1',
      initials: 'MV',
      name: 'Marcus Vance, M.Sc.',
      cosine: '0.021 Cosine Distance',
      domain: 'Fintech / Payment Rails',
      subtitle: 'Principal Distributed Systems Engineer • 8 yrs Go, Kafka 1.2M msg/sec, ClickHouse',
      score: '98.4%',
      badgeIcon: 'verified',
      color: 'text-[#4edea3]',
    },
    {
      id: 'res-2',
      initials: 'SL',
      name: 'Sarah Lin',
      cosine: '0.058 Cosine Distance',
      domain: 'Crypto Clearing & Settlement',
      subtitle: 'Senior Infrastructure Architect • Go, Kafka Event Sourcing, low-latency microservices',
      score: '94.1%',
      badgeIcon: 'speed',
      color: 'text-[#c0c1ff]',
    },
    {
      id: 'res-3',
      initials: 'DA',
      name: 'David Althaus',
      cosine: '0.089 Cosine Distance',
      domain: 'Real-time Telemetry',
      subtitle: 'Staff Platform Engineer • Golang runtime internals, Apache Flink pipelines, gRPC',
      score: '91.6%',
      badgeIcon: 'trending_up',
      color: 'text-[#ffb95f]',
    },
  ]);

  const handleVectorize = (prompt?: string) => {
    const textToRun = prompt || queryInput;
    setIsVectorizing(true);
    setTimeout(() => {
      setIsVectorizing(false);
      if (textToRun.toLowerCase().includes('web3') || textToRun.toLowerCase().includes('design')) {
        setResults([
          {
            id: 'res-w1',
            initials: 'KR',
            name: 'Kira Rhodes',
            cosine: '0.019 Cosine Distance',
            domain: 'Design Systems / Web3',
            subtitle: 'Principal Product Designer • Token architecture, Figma variables, Solana DeFi',
            score: '98.9%',
            badgeIcon: 'verified',
            color: 'text-[#4edea3]',
          },
          {
            id: 'res-w2',
            initials: 'AT',
            name: 'Alex Tanaka',
            cosine: '0.042 Cosine Distance',
            domain: 'Component Libraries',
            subtitle: 'Lead Design Technologist • StencilJS, Tailwind tokens, cross-platform UI',
            score: '95.2%',
            badgeIcon: 'speed',
            color: 'text-[#c0c1ff]',
          },
          {
            id: 'res-w3',
            initials: 'MN',
            name: 'Maya Novak',
            cosine: '0.071 Cosine Distance',
            domain: 'Crypto UX / Brand',
            subtitle: 'Senior Product Designer • Cryptographic custody flows, mobile web3',
            score: '92.4%',
            badgeIcon: 'trending_up',
            color: 'text-[#ffb95f]',
          },
        ]);
      } else if (textToRun.toLowerCase().includes('mlops') || textToRun.toLowerCase().includes('triton')) {
        setResults([
          {
            id: 'res-m1',
            initials: 'EV',
            name: 'Dr. Elena Vance',
            cosine: '0.014 Cosine Distance',
            domain: 'LLM Systems / Scaling',
            subtitle: 'Staff MLOps Architect • Multi-node Ray, Kubernetes GPU, PyTorch 2.0',
            score: '99.1%',
            badgeIcon: 'verified',
            color: 'text-[#4edea3]',
          },
          {
            id: 'res-m2',
            initials: 'MC',
            name: 'Dr. Marcus Chen',
            cosine: '0.038 Cosine Distance',
            domain: 'Kernel Optimization',
            subtitle: 'Senior AI Fellow • FlashAttention-2, DPO, Stanford PhD Distributed Systems',
            score: '97.0%',
            badgeIcon: 'speed',
            color: 'text-[#c0c1ff]',
          },
          {
            id: 'res-m3',
            initials: 'SJ',
            name: 'Sarah Jenkins',
            cosine: '0.065 Cosine Distance',
            domain: 'Streaming Inference',
            subtitle: 'Senior ML Engineer • Triton Inference Server, CMU MS',
            score: '93.5%',
            badgeIcon: 'trending_up',
            color: 'text-[#ffb95f]',
          },
        ]);
      } else {
        setResults([
          {
            id: 'res-1',
            initials: 'MV',
            name: 'Marcus Vance, M.Sc.',
            cosine: '0.021 Cosine Distance',
            domain: 'Fintech / Payment Rails',
            subtitle: 'Principal Distributed Systems Engineer • 8 yrs Go, Kafka 1.2M msg/sec, ClickHouse',
            score: '98.4%',
            badgeIcon: 'verified',
            color: 'text-[#4edea3]',
          },
          {
            id: 'res-2',
            initials: 'SL',
            name: 'Sarah Lin',
            cosine: '0.058 Cosine Distance',
            domain: 'Crypto Clearing & Settlement',
            subtitle: 'Senior Infrastructure Architect • Go, Kafka Event Sourcing, low-latency microservices',
            score: '94.1%',
            badgeIcon: 'speed',
            color: 'text-[#c0c1ff]',
          },
          {
            id: 'res-3',
            initials: 'DA',
            name: 'David Althaus',
            cosine: '0.089 Cosine Distance',
            domain: 'Real-time Telemetry',
            subtitle: 'Staff Platform Engineer • Golang runtime internals, Apache Flink pipelines, gRPC',
            score: '91.6%',
            badgeIcon: 'trending_up',
            color: 'text-[#ffb95f]',
          },
        ]);
      }
    }, 400);
  };

  const handlePresetClick = (prompt: string) => {
    setQueryInput(prompt);
    handleVectorize(prompt);
  };

  const handlePilotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pilotEmail.trim()) return;
    setPilotSubmitted(true);
    setTimeout(() => {
      setPilotSubmitted(false);
      setDemoModalOpen(false);
      setPilotEmail('');
      alert(`Thank you! Your 14-day SmartMatch AI pilot has been provisioned for ${pilotEmail}.`);
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Atmospheric Algorithmic Glow (Local) */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-[#8083ff]/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>
        <div className="absolute top-96 -left-48 w-[500px] h-[500px] bg-[#4edea3]/10 rounded-full blur-[160px] pointer-events-none -z-10"></div>
        <div className="absolute top-[600px] -right-48 w-[600px] h-[500px] bg-[#ffb95f]/10 rounded-full blur-[180px] pointer-events-none -z-10"></div>

        {/* SECTION 1: HERO & LIVE SEMANTIC PARSER INTERACTIVE */}
        <section className="relative w-full pt-10 sm:pt-14 pb-12 flex flex-col items-center">
          {/* Overline Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#222a3d]/70 shadow-sm backdrop-blur-md mb-6 border border-[#464554]/30">
            <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-ping"></span>
            <span className="font-mono text-xs text-[#4edea3] uppercase tracking-wider font-semibold">
              Semantic Match Engine v3.4 Active
            </span>
            <span className="text-[#908fa0]">/</span>
            <span className="font-['Inter'] text-xs text-[#c7c4d7]">Cross-Encoder Architecture</span>
          </div>

          {/* Core Headline */}
          <div className="max-w-4xl text-center px-4">
            <h1 className="font-['Plus+Jakarta+Sans'] text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#dae2fd] tracking-tight mb-4 leading-tight">
              Stop Keyword Searching.{' '}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c0c1ff] via-[#8083ff] to-[#4edea3]">
                Start Semantic Matching.
              </span>
            </h1>

            <p className="font-['Inter'] text-sm sm:text-base text-[#c7c4d7] max-w-2xl mx-auto mb-8 leading-relaxed">
              SmartMatch AI analyzes the deep semantic context of resumes and job descriptions using
              next-generation NLP embeddings—connecting exceptional talent to dream roles with 94%+ precision.
            </p>

            {/* CTA Row */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10">
              <button
                onClick={() => onNavigate('job-seeker-feed')}
                className="px-5 py-3 rounded-lg bg-[#c0c1ff] text-[#1000a9] font-['Inter'] text-xs sm:text-sm font-semibold shadow-lg shadow-[#8083ff]/20 hover:bg-[#e1e0ff] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">person_search</span>
                <span>Explore as Job Seeker</span>
              </button>

              <button
                onClick={() => onNavigate('recruiter-portal')}
                className="px-5 py-3 rounded-lg bg-[#222a3d] text-[#dae2fd] font-['Inter'] text-xs sm:text-sm font-semibold shadow-md hover:bg-[#31394d] transition-all flex items-center gap-2 border border-[#464554]/40 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">work</span>
                <span>Hire Talent as Recruiter</span>
              </button>

              <button
                onClick={() => setDemoModalOpen(true)}
                className="px-5 py-3 rounded-lg text-[#c7c4d7] font-['Inter'] text-xs sm:text-sm hover:text-[#dae2fd] hover:bg-[#131b2e] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">smart_display</span>
                <span>Book Platform Demo</span>
              </button>
            </div>
          </div>

          {/* INTERACTIVE LIVE NLP QUERY BENCH */}
          <div className="w-full max-w-5xl bg-[#131b2e]/90 backdrop-blur-xl rounded-xl p-4 sm:p-6 shadow-2xl relative border border-[#464554]/30">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 mb-4 border-b border-[#464554]/20">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ffb4ab]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffb95f]"></div>
                <div className="w-3 h-3 rounded-full bg-[#4edea3]"></div>
                <span className="ml-2 font-mono text-xs text-[#908fa0]">
                  NLP Query Vector Playground • Embedding Dimension 1,536
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-['Inter'] text-xs text-[#c7c4d7]">Re-ranking model:</span>
                <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#222a3d] text-[#c0c1ff] border border-[#464554]/30 font-semibold">
                  BERT-XL-CrossEncoder
                </span>
              </div>
            </div>

            {/* NLP Query Input Bar */}
            <div className="relative w-full mb-4">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#c0c1ff]">
                <span className="material-symbols-outlined text-[22px]">psychology</span>
              </div>
              <input
                className="w-full pl-11 pr-36 sm:pr-44 py-3 bg-[#060e20] text-[#dae2fd] rounded-lg font-mono text-xs sm:text-[13px] focus:outline-none focus:ring-2 focus:ring-[#8083ff]/40 shadow-inner border border-[#464554]/30"
                id="nlp-query-input"
                placeholder="Type your ideal role or candidate requirement naturally..."
                type="text"
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleVectorize()}
              />
              <div className="absolute inset-y-0 right-1.5 flex items-center">
                <button
                  onClick={() => handleVectorize()}
                  className="px-3.5 py-2 bg-[#8083ff] text-[#0d0096] font-['Inter'] text-xs font-semibold rounded-md flex items-center gap-1.5 shadow-sm hover:bg-[#c0c1ff] transition-all cursor-pointer"
                  id="recompute-btn"
                  type="button"
                >
                  <span
                    className={`material-symbols-outlined text-[16px] ${
                      isVectorizing ? 'animate-spin' : ''
                    }`}
                  >
                    {isVectorizing ? 'sync' : 'neurology'}
                  </span>
                  <span>{isVectorizing ? 'Vectorizing...' : 'Vectorize & Run'}</span>
                </button>
              </div>
            </div>

            {/* Presets Tag Row */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="font-['Inter'] text-xs text-[#908fa0]">Try Prompt Samples:</span>
              <button
                onClick={() =>
                  handlePresetClick(
                    'Senior Product Designer who writes design tokens and scales design systems for Web3'
                  )
                }
                className="px-2.5 py-1 rounded bg-[#222a3d] hover:bg-[#31394d] text-[#c7c4d7] hover:text-white font-mono text-xs transition-colors cursor-pointer border border-[#464554]/30"
              >
                Web3 Design System Lead
              </button>
              <button
                onClick={() =>
                  handlePresetClick(
                    'Staff ML Ops expert building Ray, Triton inference servers with 99.99% uptime'
                  )
                }
                className="px-2.5 py-1 rounded bg-[#222a3d] hover:bg-[#31394d] text-[#c7c4d7] hover:text-white font-mono text-xs transition-colors cursor-pointer border border-[#464554]/30"
              >
                MLOps Triton / Ray Lead
              </button>
              <button
                onClick={() =>
                  handlePresetClick(
                    'Head of Talent Ops experienced in eliminating bias using semantic vector audits'
                  )
                }
                className="px-2.5 py-1 rounded bg-[#222a3d] hover:bg-[#31394d] text-[#c7c4d7] hover:text-white font-mono text-xs transition-colors cursor-pointer border border-[#464554]/30"
              >
                Ethical AI Talent Ops
              </button>
            </div>

            {/* Live Semantic Matches Output Cards */}
            <div className="space-y-2.5" id="matches-container">
              {results.map((res) => (
                <div
                  key={res.id}
                  className="p-3.5 rounded-xl bg-[#171f33] hover:bg-[#222a3d] transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm border border-[#464554]/25"
                >
                  <div className="flex items-start md:items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-[#4edea3]/20 text-[#4edea3] flex items-center justify-center font-['Plus+Jakarta+Sans'] text-sm font-bold flex-shrink-0">
                      {res.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-['Plus+Jakarta+Sans'] text-sm font-semibold text-[#dae2fd] truncate">
                          {res.name}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#060e20] font-mono text-[11px] text-[#4edea3] border border-[#4edea3]/20">
                          {res.cosine}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#060e20] font-['Inter'] text-[11px] text-[#c7c4d7]">
                          {res.domain}
                        </span>
                      </div>
                      <p className="font-['Inter'] text-xs text-[#c7c4d7] truncate mt-0.5">
                        {res.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <span className="font-['Plus+Jakarta+Sans'] text-base font-bold text-[#4edea3]">
                          {res.score}
                        </span>
                        <span className="material-symbols-outlined text-[#4edea3] text-[18px]">
                          {res.badgeIcon}
                        </span>
                      </div>
                      <div className="font-['Inter'] text-[10px] text-[#908fa0]">
                        Semantic Affinity Score
                      </div>
                    </div>

                    <button
                      onClick={() => onNavigate('recruiter-portal')}
                      className="px-3 py-1.5 rounded-lg bg-[#060e20] hover:bg-[#222a3d] text-[#c0c1ff] font-['Inter'] text-xs font-semibold transition-colors flex items-center gap-1 border border-[#464554]/30 cursor-pointer"
                    >
                      <span>Inspect Vector</span>
                      <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Algorithmic Parity Footnote */}
            <div className="mt-4 pt-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-[#908fa0] font-['Inter'] text-xs border-t border-[#464554]/20">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#4edea3]">balance</span>
                <span>Zero Demographic Bias Check: Passed (100% anonymized vector embedding)</span>
              </div>
              <span className="font-mono text-xs text-[#c0c1ff]">Latency: 14.8ms / query</span>
            </div>
          </div>
        </section>

        {/* SECTION 2: SOCIAL PROOF & ENTERPRISE VELOCITY */}
        <section className="w-full py-12 my-4">
          <div className="max-w-6xl mx-auto px-4">
            {/* Key Metrics Strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
              <div className="p-6 rounded-xl bg-[#131b2e] shadow-md border border-[#464554]/25">
                <div className="font-['Plus+Jakarta+Sans'] text-3xl font-extrabold text-[#4edea3] mb-1">
                  1.2M+
                </div>
                <div className="font-['Plus+Jakarta+Sans'] text-base font-bold text-[#dae2fd] mb-1">
                  Semantic Matches Created
                </div>
                <p className="font-['Inter'] text-xs text-[#c7c4d7] leading-relaxed">
                  Validated across 240+ tech enterprises with 94%+ hiring manager acceptance.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-[#131b2e] shadow-md border border-[#464554]/25">
                <div className="font-['Plus+Jakarta+Sans'] text-3xl font-extrabold text-[#c0c1ff] mb-1">
                  4.2x
                </div>
                <div className="font-['Plus+Jakarta+Sans'] text-base font-bold text-[#dae2fd] mb-1">
                  Higher Interview Conversion
                </div>
                <p className="font-['Inter'] text-xs text-[#c7c4d7] leading-relaxed">
                  Drastically reducing interview fatigue by eliminating misleading keyword resumes.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-[#131b2e] shadow-md border border-[#464554]/25">
                <div className="font-['Plus+Jakarta+Sans'] text-3xl font-extrabold text-[#ffb95f] mb-1">
                  88%
                </div>
                <div className="font-['Plus+Jakarta+Sans'] text-base font-bold text-[#dae2fd] mb-1">
                  Time-to-Shortlist Cut
                </div>
                <p className="font-['Inter'] text-xs text-[#c7c4d7] leading-relaxed">
                  Requisitions sourced in 12 minutes rather than 18 days of manual filter scrubbing.
                </p>
              </div>
            </div>

            {/* Trusted Logos Strip */}
            <div className="text-center">
              <div className="font-['Inter'] text-[11px] uppercase tracking-widest text-[#908fa0] mb-5 font-semibold">
                Trusted by Engineering &amp; Talent Leaders At
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-80">
                <div className="flex items-center gap-1.5 font-['Plus+Jakarta+Sans'] text-sm sm:text-base font-bold text-[#dae2fd]">
                  <span className="material-symbols-outlined text-[#c0c1ff] text-[22px]">dataset</span> NEXUS LOGIC
                </div>
                <div className="flex items-center gap-1.5 font-['Plus+Jakarta+Sans'] text-sm sm:text-base font-bold text-[#dae2fd]">
                  <span className="material-symbols-outlined text-[#4edea3] text-[22px]">terminal</span> HYPERSCALE.IO
                </div>
                <div className="flex items-center gap-1.5 font-['Plus+Jakarta+Sans'] text-sm sm:text-base font-bold text-[#dae2fd]">
                  <span className="material-symbols-outlined text-[#ffb95f] text-[22px]">hub</span> KINETIC CLOUD
                </div>
                <div className="flex items-center gap-1.5 font-['Plus+Jakarta+Sans'] text-sm sm:text-base font-bold text-[#dae2fd]">
                  <span className="material-symbols-outlined text-[#c0c1ff] text-[22px]">memory</span> QUANTUM ATS
                </div>
                <div className="flex items-center gap-1.5 font-['Plus+Jakarta+Sans'] text-sm sm:text-base font-bold text-[#dae2fd]">
                  <span className="material-symbols-outlined text-[#4edea3] text-[22px]">token</span> FINFLOW GLOBAL
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: 3 ROLE PILLARS (VALUE PROPOSITIONS BENTO GRID) */}
        <section className="w-full py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="px-3 py-1 rounded bg-[#222a3d] font-['Inter'] text-xs uppercase tracking-wider text-[#c0c1ff] font-semibold border border-[#464554]/30">
                Multi-Sided Platform
              </span>
              <h2 className="font-['Plus+Jakarta+Sans'] text-2xl sm:text-3xl font-bold text-[#dae2fd] mt-2 mb-1">
                Engineered for Every Stakeholder
              </h2>
              <p className="font-['Inter'] text-xs sm:text-sm text-[#c7c4d7]">
                From applicants tired of ATS black holes to recruiters seeking immediate signal clarity.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Pillar 1: Job Seekers */}
              <div className="p-6 rounded-xl bg-[#131b2e] hover:bg-[#171f33] transition-all flex flex-col justify-between shadow-xl border border-[#464554]/25">
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#8083ff]/20 text-[#c0c1ff] flex items-center justify-center mb-5 shadow-sm">
                    <span className="material-symbols-outlined text-[28px]">account_box</span>
                  </div>
                  <span className="font-['Inter'] text-xs uppercase tracking-wider text-[#c0c1ff] font-semibold">
                    For Candidates
                  </span>
                  <h3 className="font-['Plus+Jakarta+Sans'] text-lg sm:text-xl font-bold text-[#dae2fd] mt-1 mb-2">
                    Beyond Keyword Filters
                  </h3>
                  <p className="font-['Inter'] text-xs sm:text-[13px] text-[#c7c4d7] mb-5 leading-relaxed">
                    Never get rejected by dumb ATS keyword matching again. SmartMatch AI recognizes your actual domain competencies, architectural scale, and transferrable intuition.
                  </p>
                  <div className="space-y-2 pt-1">
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[#4edea3] text-[18px]">check_circle</span>
                      <span className="font-['Inter'] text-xs text-[#dae2fd]">Automatic Contextual Skill Gap Analysis</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[#4edea3] text-[18px]">check_circle</span>
                      <span className="font-['Inter'] text-xs text-[#dae2fd]">Natural Language Career Discovery Querying</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[#4edea3] text-[18px]">check_circle</span>
                      <span className="font-['Inter'] text-xs text-[#dae2fd]">Privacy-Preserving Anonymized Vector Mode</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#464554]/20">
                  <button
                    onClick={() => onNavigate('job-seeker-feed')}
                    className="inline-flex items-center gap-1.5 font-['Inter'] text-xs sm:text-sm font-semibold text-[#c0c1ff] hover:text-[#e1e0ff] cursor-pointer"
                  >
                    <span>Browse Candidate Experience</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>

              {/* Pillar 2: Recruiters */}
              <div className="p-6 rounded-xl bg-[#222a3d]/80 backdrop-blur hover:bg-[#222a3d] transition-all flex flex-col justify-between shadow-2xl relative border border-[#4edea3]/40">
                <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded bg-[#4edea3] text-[#002113] font-mono text-[10px] uppercase font-bold tracking-wide shadow-md">
                  Top Velocity
                </div>
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#4edea3]/20 text-[#4edea3] flex items-center justify-center mb-5 shadow-sm">
                    <span className="material-symbols-outlined text-[28px]">target</span>
                  </div>
                  <span className="font-['Inter'] text-xs uppercase tracking-wider text-[#4edea3] font-semibold">
                    For Recruiters
                  </span>
                  <h3 className="font-['Plus+Jakarta+Sans'] text-lg sm:text-xl font-bold text-[#dae2fd] mt-1 mb-2">
                    Instant High-Signal Pipelines
                  </h3>
                  <p className="font-['Inter'] text-xs sm:text-[13px] text-[#c7c4d7] mb-5 leading-relaxed">
                    Paste any unstructured role brief or hiring manager Slack message. The engine vectors your requisition and ranks talent with zero Boolean search gymnastics.
                  </p>
                  <div className="space-y-2 pt-1">
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[#4edea3] text-[18px]">check_circle</span>
                      <span className="font-['Inter'] text-xs text-[#dae2fd]">Sub-second Cross-Encoder Candidate Re-ranking</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[#4edea3] text-[18px]">check_circle</span>
                      <span className="font-['Inter'] text-xs text-[#dae2fd]">Explainable Fit Summaries for Hiring Managers</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[#4edea3] text-[18px]">check_circle</span>
                      <span className="font-['Inter'] text-xs text-[#dae2fd]">Automated Talent Rediscovery from Stale Databases</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#464554]/20">
                  <button
                    onClick={() => onNavigate('recruiter-portal')}
                    className="inline-flex items-center gap-1.5 font-['Inter'] text-xs sm:text-sm font-semibold text-[#4edea3] hover:text-[#6ffbbe] cursor-pointer"
                  >
                    <span>Access Recruiter Suite</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>

              {/* Pillar 3: Enterprise & Admins */}
              <div className="p-6 rounded-xl bg-[#131b2e] hover:bg-[#171f33] transition-all flex flex-col justify-between shadow-xl border border-[#464554]/25">
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#ffb95f]/20 text-[#ffb95f] flex items-center justify-center mb-5 shadow-sm">
                    <span className="material-symbols-outlined text-[28px]">shield_person</span>
                  </div>
                  <span className="font-['Inter'] text-xs uppercase tracking-wider text-[#ffb95f] font-semibold">
                    For Enterprise Ops
                  </span>
                  <h3 className="font-['Plus+Jakarta+Sans'] text-lg sm:text-xl font-bold text-[#dae2fd] mt-1 mb-2">
                    Governed NLP Telemetry
                  </h3>
                  <p className="font-['Inter'] text-xs sm:text-[13px] text-[#c7c4d7] mb-5 leading-relaxed">
                    Audit algorithm equity and compliance. Monitor drift, enforce NYC Local Law 144 compliance, and sync bi-directionally with Greenhouse, Lever, and Workday.
                  </p>
                  <div className="space-y-2 pt-1">
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[#4edea3] text-[18px]">check_circle</span>
                      <span className="font-['Inter'] text-xs text-[#dae2fd]">Statistical Parity &amp; Demographic Parity Monitoring</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[#4edea3] text-[18px]">check_circle</span>
                      <span className="font-['Inter'] text-xs text-[#dae2fd]">Full Audit Trail &amp; Explainable Vector Traces</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[#4edea3] text-[18px]">check_circle</span>
                      <span className="font-['Inter'] text-xs text-[#dae2fd]">SOC2 Type II &amp; GDPR Compliant Vector Vaults</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#464554]/20">
                  <button
                    onClick={() => onNavigate('admin-console')}
                    className="inline-flex items-center gap-1.5 font-['Inter'] text-xs sm:text-sm font-semibold text-[#ffb95f] hover:text-[#ffddb8] cursor-pointer"
                  >
                    <span>View Security &amp; Governance</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: HOW OUR NLP ENGINE WORKS (INTERACTIVE STEP-BY-STEP DIAGRAM) */}
        <section className="w-full py-12 my-6 bg-[#060e20]/60 border-y border-[#464554]/20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <span className="font-mono text-xs text-[#4edea3] uppercase tracking-wider font-semibold">
                  Algorithmic Transparency
                </span>
                <h2 className="font-['Plus+Jakarta+Sans'] text-2xl sm:text-3xl font-bold text-[#dae2fd] mt-1">
                  How Our NLP Engine Works
                </h2>
              </div>
              <p className="font-['Inter'] text-xs sm:text-sm text-[#c7c4d7] max-w-md">
                Click through each pipeline phase to inspect how raw resume text transforms into high-dimensional semantic match telemetry.
              </p>
            </div>

            {/* Interactive Step Selector Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6" id="step-selector-row">
              {[
                { step: 1, label: 'PHASE 01', title: 'Ingest & Tokenize' },
                { step: 2, label: 'PHASE 02', title: 'Vector Embedding' },
                { step: 3, label: 'PHASE 03', title: 'Cross-Encoder Scoring' },
                { step: 4, label: 'PHASE 04', title: 'Explainable Output' },
              ].map((s) => {
                const isActive = activeStep === s.step;
                return (
                  <button
                    key={s.step}
                    onClick={() => setActiveStep(s.step)}
                    className={`text-left p-4 rounded-lg transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-[#222a3d] border-[#8083ff]/50 shadow-md'
                        : 'bg-[#131b2e] hover:bg-[#171f33] border-[#464554]/25'
                    }`}
                  >
                    <span
                      className={`font-mono text-xs font-semibold ${
                        isActive ? 'text-[#c0c1ff]' : 'text-[#908fa0]'
                      }`}
                    >
                      {s.label}
                    </span>
                    <div
                      className={`font-['Plus+Jakarta+Sans'] text-sm sm:text-base font-bold mt-1 ${
                        isActive ? 'text-[#dae2fd]' : 'text-[#c7c4d7]'
                      }`}
                    >
                      {s.title}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Step Inspector Display Box */}
            <div className="p-6 sm:p-8 rounded-xl bg-[#131b2e] shadow-xl border border-[#464554]/25">
              {/* Step 1 Content */}
              {activeStep === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-6">
                    <span className="px-2.5 py-0.5 rounded bg-[#8083ff]/20 text-[#c0c1ff] font-mono text-xs font-semibold">
                      Phase 1 Architecture
                    </span>
                    <h3 className="font-['Plus+Jakarta+Sans'] text-xl font-bold text-[#dae2fd] mt-2 mb-3">
                      Syntax Scrubbing &amp; Subword Tokenization
                    </h3>
                    <p className="font-['Inter'] text-xs sm:text-sm text-[#c7c4d7] mb-5 leading-relaxed">
                      Unstructured PDFs and docx files are parsed. Proprietary entity recognizers identify project scopes, architectural patterns, and engineering impact while stripping candidate demographics to prevent bias.
                    </p>
                    <div className="p-3.5 rounded-lg bg-[#060e20] font-mono text-xs text-[#c7c4d7] border border-[#464554]/20">
                      <span className="text-[#4edea3] font-semibold">[TOKENIZER]</span> Extracted 4,218 tokens • Identified 42 skill entities • 0 demographic attributes retained
                    </div>
                  </div>

                  <div className="lg:col-span-6 bg-[#060e20] p-5 sm:p-6 rounded-xl shadow-inner border border-[#464554]/25">
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#464554]/20">
                      <span className="font-mono text-xs text-[#908fa0]">Token Graph Matrix</span>
                      <span className="font-['Inter'] text-xs text-[#4edea3] font-semibold">Ready</span>
                    </div>
                    <svg className="w-full h-auto text-[#c0c1ff]" viewBox="0 0 400 160">
                      <rect fill="currentColor" fillOpacity="0.1" height="30" rx="4" width="70" x="10" y="20"></rect>
                      <text fill="currentColor" fontFamily="monospace" fontSize="11" textAnchor="middle" x="45" y="40">Go(1048)</text>
                      <rect fill="currentColor" fillOpacity="0.1" height="30" rx="4" width="85" x="100" y="20"></rect>
                      <text fill="currentColor" fontFamily="monospace" fontSize="11" textAnchor="middle" x="142" y="40">Kafka(392)</text>
                      <rect fill="currentColor" fillOpacity="0.1" height="30" rx="4" width="90" x="205" y="20"></rect>
                      <text fill="currentColor" fontFamily="monospace" fontSize="11" textAnchor="middle" x="250" y="40">Throughput</text>
                      <rect fill="currentColor" fillOpacity="0.1" height="30" rx="4" width="75" x="315" y="20"></rect>
                      <text fill="currentColor" fontFamily="monospace" fontSize="11" textAnchor="middle" x="352" y="40">Fintech</text>
                      <path d="M 45 50 L 142 110 M 142 50 L 250 110 M 250 50 L 352 110 M 142 50 L 352 110" stroke="currentColor" strokeDasharray="3 3" strokeOpacity="0.3" strokeWidth="1.5"></path>
                      <circle cx="142" cy="110" fill="#4edea3" fillOpacity="0.2" r="14"></circle>
                      <circle cx="142" cy="110" fill="#4edea3" r="5"></circle>
                      <text fill="#4edea3" fontFamily="monospace" fontSize="10" textAnchor="middle" x="142" y="140">High Scale</text>
                      <circle cx="250" cy="110" fill="#c0c1ff" fillOpacity="0.2" r="14"></circle>
                      <circle cx="250" cy="110" fill="#c0c1ff" r="5"></circle>
                      <text fill="#c0c1ff" fontFamily="monospace" fontSize="10" textAnchor="middle" x="250" y="140">Resiliency</text>
                      <circle cx="352" cy="110" fill="#ffb95f" fillOpacity="0.2" r="14"></circle>
                      <circle cx="352" cy="110" fill="#ffb95f" r="5"></circle>
                      <text fill="#ffb95f" fontFamily="monospace" fontSize="10" textAnchor="middle" x="352" y="140">Ledgers</text>
                    </svg>
                  </div>
                </div>
              )}

              {/* Step 2 Content */}
              {activeStep === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-6">
                    <span className="px-2.5 py-0.5 rounded bg-[#4edea3]/20 text-[#4edea3] font-mono text-xs font-semibold">
                      Phase 2 Architecture
                    </span>
                    <h3 className="font-['Plus+Jakarta+Sans'] text-xl font-bold text-[#dae2fd] mt-2 mb-3">
                      High-Dimensional Vector Embedding
                    </h3>
                    <p className="font-['Inter'] text-xs sm:text-sm text-[#c7c4d7] mb-5 leading-relaxed">
                      Parsed representations are projected into a 1,536-dimensional hyper-space. Words with similar semantic purpose (e.g. &quot;Distributed consensus&quot; and &quot;Raft protocol&quot;) position within tight cosine proximity.
                    </p>
                    <div className="p-3.5 rounded-lg bg-[#060e20] font-mono text-xs text-[#c7c4d7] border border-[#464554]/20">
                      <span className="text-[#c0c1ff] font-semibold">[PROJECTION]</span> Vector coordinates: [-0.0412, 0.9841, -0.1290, ..., 0.4419] • 1,536 float32 dimensions
                    </div>
                  </div>

                  <div className="lg:col-span-6 bg-[#060e20] p-5 sm:p-6 rounded-xl shadow-inner border border-[#464554]/25">
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#464554]/20">
                      <span className="font-mono text-xs text-[#908fa0]">Hyper-Plane Cluster View</span>
                      <span className="font-['Inter'] text-xs text-[#c0c1ff] font-semibold">Dense Latent Space</span>
                    </div>
                    <svg className="w-full h-auto text-[#4edea3]" viewBox="0 0 400 160">
                      <circle cx="200" cy="80" fill="none" r="60" stroke="currentColor" strokeDasharray="4 4" strokeOpacity="0.2" strokeWidth="1"></circle>
                      <circle cx="200" cy="80" fill="none" r="30" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1"></circle>
                      <circle cx="200" cy="80" fill="#4edea3" r="6"></circle>
                      <text fill="#dae2fd" fontFamily="monospace" fontSize="10" textAnchor="middle" x="200" y="65">Job Requisition Vector</text>
                      <circle cx="225" cy="70" fill="#c0c1ff" r="4"></circle>
                      <text fill="#c0c1ff" fontFamily="monospace" fontSize="9" x="245" y="70">Candidate A (0.98)</text>
                      <circle cx="170" cy="95" fill="#c0c1ff" r="4"></circle>
                      <text fill="#c0c1ff" fontFamily="monospace" fontSize="9" x="145" y="112">Candidate B (0.94)</text>
                      <circle cx="310" cy="40" fill="#ffb4ab" r="4"></circle>
                      <text fill="#ffb4ab" fontFamily="monospace" fontSize="9" x="310" y="30">Outlier (0.31)</text>
                      <line stroke="#4edea3" strokeWidth="1.5" x1="200" x2="225" y1="80" y2="70"></line>
                    </svg>
                  </div>
                </div>
              )}

              {/* Step 3 Content */}
              {activeStep === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-6">
                    <span className="px-2.5 py-0.5 rounded bg-[#ffb95f]/20 text-[#ffb95f] font-mono text-xs font-semibold">
                      Phase 3 Architecture
                    </span>
                    <h3 className="font-['Plus+Jakarta+Sans'] text-xl font-bold text-[#dae2fd] mt-2 mb-3">
                      Cross-Encoder Deep Re-Ranking
                    </h3>
                    <p className="font-['Inter'] text-xs sm:text-sm text-[#c7c4d7] mb-5 leading-relaxed">
                      Bi-encoders retrieve candidate pools instantly. Then, heavy full-attention cross-encoders evaluate candidate work history jointly against the job brief, discovering nuances keyword matchers miss entirely.
                    </p>
                    <div className="p-3.5 rounded-lg bg-[#060e20] font-mono text-xs text-[#c7c4d7] border border-[#464554]/20">
                      <span className="text-[#ffb95f] font-semibold">[ATTENTION]</span> Multi-head attention layers: 24 • Cross-attention score computed in 8.2ms
                    </div>
                  </div>

                  <div className="lg:col-span-6 bg-[#060e20] p-5 sm:p-6 rounded-xl shadow-inner border border-[#464554]/25">
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#464554]/20">
                      <span className="font-mono text-xs text-[#908fa0]">Attention Heatmap</span>
                      <span className="font-['Inter'] text-xs text-[#ffb95f] font-semibold">Cross-Attention Active</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="p-2.5 rounded bg-[#171f33] text-center font-mono text-xs text-[#908fa0]">Go concurrency</div>
                      <div className="p-2.5 rounded bg-[#4edea3]/30 text-center font-mono text-xs text-[#4edea3] font-bold">0.99</div>
                      <div className="p-2.5 rounded bg-[#171f33] text-center font-mono text-xs text-[#908fa0]">Kafka partitions</div>
                      <div className="p-2.5 rounded bg-[#4edea3]/30 text-center font-mono text-xs text-[#4edea3] font-bold">0.96</div>
                      <div className="p-2.5 rounded bg-[#171f33] text-center font-mono text-xs text-[#908fa0]">Fintech ledgers</div>
                      <div className="p-2.5 rounded bg-[#8083ff]/30 text-center font-mono text-xs text-[#c0c1ff] font-bold">0.92</div>
                      <div className="p-2.5 rounded bg-[#171f33] text-center font-mono text-xs text-[#908fa0]">Docker / K8s</div>
                      <div className="p-2.5 rounded bg-[#222a3d] text-center font-mono text-xs text-[#dae2fd]">0.88</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4 Content */}
              {activeStep === 4 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-6">
                    <span className="px-2.5 py-0.5 rounded bg-[#4edea3]/20 text-[#4edea3] font-mono text-xs font-semibold">
                      Phase 4 Architecture
                    </span>
                    <h3 className="font-['Plus+Jakarta+Sans'] text-xl font-bold text-[#dae2fd] mt-2 mb-3">
                      Explainable Synthesis &amp; Match Dossier
                    </h3>
                    <p className="font-['Inter'] text-xs sm:text-sm text-[#c7c4d7] mb-5 leading-relaxed">
                      No opaque black boxes. SmartMatch generates an executive justification explaining why this candidate matches, what skill growth they bring, and exact compensation parity expectations.
                    </p>
                    <div className="p-3.5 rounded-lg bg-[#060e20] font-mono text-xs text-[#c7c4d7] border border-[#464554]/20">
                      <span className="text-[#4edea3] font-semibold">[AUDIT VERIFIED]</span> Explainability index: 99.4% • Bias deviation: 0.00% • Export ready
                    </div>
                  </div>

                  <div className="lg:col-span-6 bg-[#060e20] p-5 sm:p-6 rounded-xl shadow-inner border border-[#464554]/25">
                    <div className="flex items-center justify-between pb-2 mb-2">
                      <span className="font-mono text-xs text-[#4edea3] font-semibold">Match Confidence Report</span>
                      <span className="material-symbols-outlined text-[#4edea3] text-[20px]">check_circle</span>
                    </div>
                    <p className="font-['Inter'] text-xs text-[#dae2fd] mb-3 leading-relaxed">
                      &quot;Candidate possesses deep systems programming in Go with verified track record scaling streaming infrastructure to 1M+ event workloads.&quot;
                    </p>
                    <div className="w-full bg-[#171f33] rounded-full h-2 mb-2 overflow-hidden">
                      <div className="bg-[#4edea3] h-2 rounded-full w-[94%]"></div>
                    </div>
                    <div className="flex justify-between font-['Inter'] text-xs text-[#908fa0]">
                      <span>Semantic Fit Probability</span>
                      <span className="text-[#4edea3] font-mono font-semibold">94.8% Match</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 5: CTA CONVERSION PANEL */}
        <section className="w-full py-12">
          <div className="max-w-5xl mx-auto px-4">
            <div className="relative rounded-2xl bg-gradient-to-r from-[#171f33] to-[#222a3d] p-6 sm:p-12 overflow-hidden shadow-2xl border border-[#464554]/30">
              <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#8083ff]/20 blur-[100px] pointer-events-none"></div>

              <div className="relative z-10 max-w-2xl">
                <span className="px-2.5 py-0.5 rounded bg-[#8083ff]/20 font-mono text-xs text-[#c0c1ff] uppercase font-semibold">
                  Modernize Your Talent Engine
                </span>
                <h2 className="font-['Plus+Jakarta+Sans'] text-2xl sm:text-3xl font-extrabold text-[#dae2fd] mt-2 mb-3">
                  Ready to replace keyword queries with neural intelligence?
                </h2>
                <p className="font-['Inter'] text-xs sm:text-sm text-[#c7c4d7] mb-6 leading-relaxed">
                  Connect your existing ATS in 4 minutes or start querying our 500k+ anonymized engineering vector roster today.
                </p>

                <div className="flex flex-wrap items-center gap-3.5">
                  <button
                    onClick={() => setDemoModalOpen(true)}
                    className="px-6 py-3 rounded-lg bg-[#c0c1ff] text-[#1000a9] font-['Inter'] text-xs sm:text-sm font-semibold shadow-lg shadow-[#8083ff]/25 hover:bg-[#e1e0ff] transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Start Free 14-Day Pilot</span>
                    <span className="material-symbols-outlined text-[18px]">bolt</span>
                  </button>

                  <button
                    onClick={() => setDemoModalOpen(true)}
                    className="px-5 py-3 rounded-lg bg-[#060e20] text-[#dae2fd] font-['Inter'] text-xs sm:text-sm font-semibold shadow-md hover:bg-[#131b2e] transition-all flex items-center gap-1.5 border border-[#464554]/30 cursor-pointer"
                  >
                    <span>Schedule Architecture Review</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER EXTENSION: ROLE PORTALS & API SPECS */}
        <div className="w-full pt-10 pb-8 border-t border-[#464554]/20">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="font-['Inter'] text-xs uppercase tracking-wider text-[#908fa0] font-semibold mb-3">
                Role Portals
              </div>
              <ul className="space-y-2 font-['Inter'] text-xs text-[#c7c4d7]">
                <li>
                  <button onClick={() => onNavigate('job-seeker-feed')} className="hover:text-[#c0c1ff] transition-colors cursor-pointer text-left">
                    Job Seeker Vector Feed
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('recruiter-portal')} className="hover:text-[#c0c1ff] transition-colors cursor-pointer text-left">
                    Recruiter Match Console
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('admin-console')} className="hover:text-[#c0c1ff] transition-colors cursor-pointer text-left">
                    Enterprise Talent Ops
                  </button>
                </li>
                <li>
                  <span className="text-[#908fa0]">ATS Sync Connectors</span>
                </li>
              </ul>
            </div>

            <div>
              <div className="font-['Inter'] text-xs uppercase tracking-wider text-[#908fa0] font-semibold mb-3">
                NLP Documentation
              </div>
              <ul className="space-y-2 font-['Inter'] text-xs text-[#c7c4d7]">
                <li><span className="hover:text-[#c0c1ff]">Vector Embedding Model v3.2</span></li>
                <li><span className="hover:text-[#c0c1ff]">REST &amp; GraphQL Vector API</span></li>
                <li><span className="hover:text-[#c0c1ff]">Cosine Distance Benchmarks</span></li>
                <li><span className="hover:text-[#c0c1ff]">Sub-word Tokenizer Specs</span></li>
              </ul>
            </div>

            <div>
              <div className="font-['Inter'] text-xs uppercase tracking-wider text-[#908fa0] font-semibold mb-3">
                Ethics &amp; Governance
              </div>
              <ul className="space-y-2 font-['Inter'] text-xs text-[#c7c4d7]">
                <li><span className="hover:text-[#c0c1ff]">Algorithmic Bias Audits</span></li>
                <li><span className="hover:text-[#c0c1ff]">NYC Local Law 144 Report</span></li>
                <li><span className="hover:text-[#c0c1ff]">Anonymized Processing</span></li>
                <li><span className="hover:text-[#c0c1ff]">SOC2 Type II Attestation</span></li>
              </ul>
            </div>

            <div>
              <div className="font-['Inter'] text-xs uppercase tracking-wider text-[#908fa0] font-semibold mb-3">
                Platform Health
              </div>
              <div className="p-3.5 rounded-lg bg-[#131b2e] shadow-sm border border-[#464554]/25">
                <div className="flex items-center gap-1.5 text-[#4edea3] mb-1 font-semibold text-xs">
                  <span className="w-2 h-2 rounded-full bg-[#4edea3]"></span>
                  <span>Inference Fleet 100%</span>
                </div>
                <div className="font-mono text-xs text-[#908fa0]">Median Latency: 12.4ms</div>
                <div className="font-mono text-xs text-[#908fa0] mt-0.5">Global Shards: 24 active</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Modal */}
      {demoModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#060e20]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#131b2e] rounded-xl p-6 shadow-2xl border border-[#464554]/30 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded bg-[#8083ff]/20 flex items-center justify-center text-[#c0c1ff]">
                  <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
                </div>
                <div>
                  <h3 className="font-['Plus+Jakarta+Sans'] text-base font-semibold text-[#dae2fd]">
                    Start 14-Day Enterprise Pilot
                  </h3>
                  <p className="font-['Inter'] text-xs text-[#c7c4d7]">
                    Experience sub-second cross-encoder semantic matching.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setDemoModalOpen(false)}
                className="p-1 rounded bg-[#171f33] text-[#c7c4d7] hover:text-[#dae2fd] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handlePilotSubmit} className="space-y-3 pt-1">
              <div>
                <label className="text-xs text-[#dae2fd] font-medium block mb-1">
                  Work / Corporate Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="elena@enterprise-tech.ai"
                  value={pilotEmail}
                  onChange={(e) => setPilotEmail(e.target.value)}
                  className="w-full bg-[#171f33] border border-[#464554]/30 rounded-lg p-2.5 text-xs text-[#dae2fd] outline-none focus:border-[#8083ff]"
                />
              </div>

              <div className="p-3 rounded-lg bg-[#060e20] text-xs text-[#c7c4d7] flex items-start gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#4edea3] flex-shrink-0 mt-0.5">
                  lock
                </span>
                <span>
                  SOC2 Type II compliant vector isolation. Integrates with Greenhouse, Lever, and Ashby.
                </span>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setDemoModalOpen(false)}
                  className="px-4 py-2 rounded bg-[#171f33] text-[#dae2fd] text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={pilotSubmitted}
                  className="px-4 py-2 rounded bg-[#8083ff] text-[#0d0096] font-semibold text-xs hover:bg-[#c0c1ff] cursor-pointer disabled:opacity-70"
                >
                  {pilotSubmitted ? 'Provisioning...' : 'Activate Instant Pilot'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
