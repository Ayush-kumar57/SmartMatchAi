import React, { useState } from 'react';
import { CandidateProfile, JobMatch } from '../types';

interface TuneWeightsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (weights: Record<string, number>) => void;
}

export const TuneWeightsModal: React.FC<TuneWeightsModalProps> = ({ isOpen, onClose, onApply }) => {
  const [dpoWeight, setDpoWeight] = useState(1.4);
  const [rlhfWeight, setRlhfWeight] = useState(1.2);
  const [flashAttnWeight, setFlashAttnWeight] = useState(0.9);
  const [isApplying, setIsApplying] = useState(false);

  if (!isOpen) return null;

  const handleApply = () => {
    setIsApplying(true);
    setTimeout(() => {
      onApply({
        dpo: dpoWeight,
        rlhf: rlhfWeight,
        flashAttn: flashAttnWeight,
      });
      setIsApplying(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#060e20]/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-[#131b2e] rounded-xl p-5 sm:p-6 shadow-2xl border border-[#464554]/30 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-[#8083ff]/20 flex items-center justify-center text-[#c0c1ff]">
              <span className="material-symbols-outlined text-[20px]">tune</span>
            </div>
            <div>
              <h3 className="font-['Plus+Jakarta+Sans'] text-base sm:text-lg font-semibold text-[#dae2fd]">
                Neural Weight &amp; Strictness Calibrator
              </h3>
              <p className="font-['Inter'] text-xs text-[#c7c4d7]">
                Adjust bi-encoder attention penalties and skill variance tolerances.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded bg-[#171f33] text-[#c7c4d7] hover:text-[#dae2fd] cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="space-y-4 py-2">
          <div>
            <div className="flex justify-between font-['Inter'] text-xs mb-1">
              <span className="text-[#dae2fd]">Direct Preference Optimization (DPO) Weight</span>
              <span className="text-[#4edea3] font-mono">{dpoWeight.toFixed(1)}x (High Affinity)</span>
            </div>
            <input
              className="w-full h-1.5 bg-[#171f33] rounded-lg accent-[#4edea3] cursor-pointer"
              max="2"
              min="0"
              step="0.1"
              type="range"
              value={dpoWeight}
              onChange={(e) => setDpoWeight(parseFloat(e.target.value))}
            />
          </div>

          <div>
            <div className="flex justify-between font-['Inter'] text-xs mb-1">
              <span className="text-[#dae2fd]">RLHF &amp; PPO Tuning Weight</span>
              <span className="text-[#4edea3] font-mono">{rlhfWeight.toFixed(1)}x (Preferred)</span>
            </div>
            <input
              className="w-full h-1.5 bg-[#171f33] rounded-lg accent-[#4edea3] cursor-pointer"
              max="2"
              min="0"
              step="0.1"
              type="range"
              value={rlhfWeight}
              onChange={(e) => setRlhfWeight(parseFloat(e.target.value))}
            />
          </div>

          <div>
            <div className="flex justify-between font-['Inter'] text-xs mb-1">
              <span className="text-[#dae2fd]">FlashAttention &amp; Kernel Strictness</span>
              <span className="text-[#c0c1ff] font-mono">{flashAttnWeight.toFixed(1)}x (Flexible)</span>
            </div>
            <input
              className="w-full h-1.5 bg-[#171f33] rounded-lg accent-[#8083ff] cursor-pointer"
              max="2"
              min="0"
              step="0.1"
              type="range"
              value={flashAttnWeight}
              onChange={(e) => setFlashAttnWeight(parseFloat(e.target.value))}
            />
          </div>

          <div>
            <div className="flex justify-between font-['Inter'] text-xs mb-1">
              <span className="text-[#dae2fd]">Demographic Neutrality Regularization</span>
              <span className="text-[#4edea3] font-mono">Max (Active)</span>
            </div>
            <div className="p-3 rounded-lg bg-[#171f33] text-[#4edea3] font-['Inter'] text-xs flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>All demographic, institutional, and gender proxies mathematically suppressed via subspace nulling.</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#464554]/20">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-[#171f33] text-[#dae2fd] hover:bg-[#222a3d] font-['Inter'] text-xs font-medium cursor-pointer"
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            disabled={isApplying}
            className="px-4 py-2 rounded bg-[#8083ff] text-[#0d0096] font-['Inter'] text-xs font-semibold hover:bg-[#c0c1ff] transition-colors shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-70"
            type="button"
          >
            {isApplying ? (
              <>
                <span className="material-symbols-outlined text-[16px] animate-spin">refresh</span>
                <span>Recomputing Embeddings...</span>
              </>
            ) : (
              <span>Recompute Embeddings &amp; Apply</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

interface CVDebriefModalProps {
  candidate: CandidateProfile | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CVDebriefModal: React.FC<CVDebriefModalProps> = ({ candidate, isOpen, onClose }) => {
  if (!isOpen || !candidate) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#060e20]/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-[#131b2e] rounded-xl p-5 sm:p-6 shadow-2xl border border-[#464554]/30 flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-[#464554]/20">
          <div className="flex items-center gap-3">
            <img src={candidate.avatar} alt={candidate.name} className="w-12 h-12 rounded-xl object-cover ring-2 ring-[#4edea3]/40" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-['Plus+Jakarta+Sans'] text-lg font-semibold text-[#dae2fd]">{candidate.name}</h3>
                <span className="px-2 py-0.5 rounded bg-[#4edea3]/15 text-[#4edea3] text-xs font-semibold font-mono">
                  {candidate.badgeLabel}
                </span>
              </div>
              <p className="font-['Inter'] text-xs text-[#c7c4d7]">{candidate.currentRole} • {candidate.companyPast}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded bg-[#171f33] text-[#c7c4d7] hover:text-[#dae2fd] cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Semantic CV Diff Breakdown */}
        <div className="space-y-4">
          <div className="p-3.5 rounded-lg bg-[#060e20] border border-[#4edea3]/30">
            <div className="flex items-center gap-2 text-[#4edea3] text-xs font-semibold uppercase tracking-wider mb-1.5">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              High-Affinity Extracted Vectors (Direct Alignment)
            </div>
            <div className="flex flex-wrap gap-1.5">
              {candidate.semanticPills.map((pill, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded bg-[#222a3d] text-[#4edea3] font-mono text-xs flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">done_all</span>
                  {pill}
                </span>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-[#171f33]">
            <span className="text-xs font-semibold text-[#dae2fd] uppercase tracking-wider block mb-1">
              Algorithmic Semantic Diff Rationale
            </span>
            <p className="text-xs text-[#c7c4d7] leading-relaxed">
              {candidate.keyInsight}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 rounded-lg bg-[#171f33] text-center">
              <span className="text-[11px] text-[#908fa0] block">Research Alignment</span>
              <span className="text-base font-semibold text-[#4edea3] font-mono">{candidate.researchAlign}%</span>
            </div>
            <div className="p-3 rounded-lg bg-[#171f33] text-center">
              <span className="text-[11px] text-[#908fa0] block">Code Vector</span>
              <span className="text-base font-semibold text-[#c0c1ff] font-mono">{candidate.codeVector}%</span>
            </div>
            <div className="p-3 rounded-lg bg-[#171f33] text-center">
              <span className="text-[11px] text-[#908fa0] block">Publication Relevance</span>
              <span className="text-base font-semibold text-[#ffb95f] font-mono">{candidate.publicationRel}%</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t border-[#464554]/20">
          <button onClick={onClose} className="px-4 py-2 rounded bg-[#222a3d] text-[#dae2fd] text-xs font-medium cursor-pointer">
            Close Diff
          </button>
          <button
            onClick={() => {
              alert(`Candidate ${candidate.name} has been added to shortlist!`);
              onClose();
            }}
            className="px-4 py-2 rounded bg-[#8083ff] text-[#0d0096] text-xs font-semibold hover:bg-[#c0c1ff] transition-colors cursor-pointer"
          >
            Add to Requisition Shortlist
          </button>
        </div>
      </div>
    </div>
  );
};

interface ScheduleInterviewModalProps {
  candidate: CandidateProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onScheduled: (candName: string, date: string) => void;
}

export const ScheduleInterviewModal: React.FC<ScheduleInterviewModalProps> = ({
  candidate,
  isOpen,
  onClose,
  onScheduled,
}) => {
  const [selectedDate, setSelectedDate] = useState('2026-10-15');
  const [selectedTime, setSelectedTime] = useState('14:00');
  const [interviewType, setInterviewType] = useState('Distributed Systems Deep Dive');

  if (!isOpen || !candidate) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#060e20]/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#131b2e] rounded-xl p-5 sm:p-6 shadow-2xl border border-[#464554]/30 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-[#4edea3]/20 flex items-center justify-center text-[#4edea3]">
              <span className="material-symbols-outlined text-[20px]">calendar_month</span>
            </div>
            <div>
              <h3 className="font-['Plus+Jakarta+Sans'] text-base font-semibold text-[#dae2fd]">
                Schedule Technical Interview
              </h3>
              <p className="font-['Inter'] text-xs text-[#c7c4d7]">
                With {candidate.name} ({candidate.badgeLabel})
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded bg-[#171f33] text-[#c7c4d7] hover:text-[#dae2fd] cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="space-y-3.5 py-1">
          <div>
            <label className="text-xs text-[#dae2fd] font-medium block mb-1">Interview Module</label>
            <select
              value={interviewType}
              onChange={(e) => setInterviewType(e.target.value)}
              className="w-full bg-[#171f33] border border-[#464554]/30 rounded-lg p-2 text-xs text-[#dae2fd]"
            >
              <option>Distributed Systems &amp; KV-Cache Latency</option>
              <option>PyTorch / Ray Training Pipelines at Scale</option>
              <option>Architectural Culture &amp; Leadership Loop</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-[#dae2fd] font-medium block mb-1">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-[#171f33] border border-[#464554]/30 rounded-lg p-2 text-xs text-[#dae2fd]"
              />
            </div>
            <div>
              <label className="text-xs text-[#dae2fd] font-medium block mb-1">Time (UTC)</label>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full bg-[#171f33] border border-[#464554]/30 rounded-lg p-2 text-xs text-[#dae2fd]"
              />
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#060e20] text-xs text-[#c7c4d7] flex items-start gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#4edea3] flex-shrink-0 mt-0.5">verified</span>
            <span>
              Candidate availability matches notice window: <strong>{candidate.noticePeriod}</strong>. Google Meet link will be generated automatically.
            </span>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2 border-t border-[#464554]/20">
          <button onClick={onClose} className="px-4 py-2 rounded bg-[#171f33] text-[#dae2fd] text-xs cursor-pointer">
            Cancel
          </button>
          <button
            onClick={() => {
              onScheduled(candidate.name, `${selectedDate} at ${selectedTime}`);
              onClose();
            }}
            className="px-4 py-2 rounded bg-[#4edea3] text-[#002113] font-semibold text-xs hover:bg-[#6ffbbe] cursor-pointer"
          >
            Confirm &amp; Send Calendar Invite
          </button>
        </div>
      </div>
    </div>
  );
};

interface ReIndexModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReIndexed: () => void;
}

export const ReIndexModal: React.FC<ReIndexModalProps> = ({ isOpen, onClose, onReIndexed }) => {
  const [resumeText, setResumeText] = useState(
    'Staff MLOps Architect with 9+ years experience designing distributed PyTorch training infrastructure, multi-node Ray orchestrations, Kubernetes GPU clusters, and vLLM low-latency serving stacks.'
  );
  const [model, setModel] = useState('RoBERTa-Recruit-v3');
  const [processing, setProcessing] = useState(false);

  if (!isOpen) return null;

  const handleStart = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onReIndexed();
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#060e20]/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-[#131b2e] rounded-xl p-5 sm:p-6 shadow-2xl border border-[#464554]/30 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-[#8083ff]/20 flex items-center justify-center text-[#c0c1ff]">
              <span className="material-symbols-outlined text-[20px]">upload_file</span>
            </div>
            <div>
              <h3 className="font-['Plus+Jakarta+Sans'] text-base font-semibold text-[#dae2fd]">
                Re-Index CV &amp; Semantic Vector
              </h3>
              <p className="font-['Inter'] text-xs text-[#c7c4d7]">
                Extract 1,536-dimensional embeddings with demographic anonymization.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded bg-[#171f33] text-[#c7c4d7] hover:text-[#dae2fd] cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-[#dae2fd] font-medium block mb-1">Select Embedding Model</label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full bg-[#171f33] border border-[#464554]/30 rounded-lg p-2 text-xs text-[#dae2fd]"
            >
              <option>RoBERTa-Recruit-v3 (Normalized Cosine)</option>
              <option>text-embedding-3-large (3072 dims)</option>
              <option>BERT-XL-CrossEncoder (Joint Attention)</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-[#dae2fd] font-medium block mb-1">Resume / CV Raw Corpus</label>
            <textarea
              rows={4}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="w-full bg-[#060e20] border border-[#464554]/30 rounded-lg p-2.5 text-xs text-[#dae2fd] font-mono"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2 border-t border-[#464554]/20">
          <button onClick={onClose} className="px-4 py-2 rounded bg-[#171f33] text-[#dae2fd] text-xs cursor-pointer">
            Cancel
          </button>
          <button
            onClick={handleStart}
            disabled={processing}
            className="px-4 py-2 rounded bg-[#4edea3] text-[#002113] font-semibold text-xs hover:bg-[#6ffbbe] cursor-pointer disabled:opacity-70 flex items-center gap-1.5"
          >
            {processing ? (
              <>
                <span className="material-symbols-outlined text-[16px] animate-spin">refresh</span>
                <span>Synthesizing Vectors...</span>
              </>
            ) : (
              <span>Start Vector Ingestion</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

interface JobScoutModalProps {
  job: JobMatch | null;
  isOpen: boolean;
  onClose: () => void;
}

export const JobScoutModal: React.FC<JobScoutModalProps> = ({ job, isOpen, onClose }) => {
  const [messages, setMessages] = useState<{ role: 'ai' | 'user'; text: string }[]>([
    {
      role: 'ai',
      text: `Hello Dr. Vance! I analyzed ${job?.company || 'this role'}'s job vector against your profile. You have a 96% match with exceptional overlap in distributed PyTorch and container orchestration. What would you like to explore?`,
    },
  ]);
  const [input, setInput] = useState('');

  if (!isOpen || !job) return null;

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const userMsg = text.trim();
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setInput('');

    setTimeout(() => {
      let reply = `Based on Scale AI's infrastructure vector, your background in low-latency Ray deployments gives you an 88% direct technical advantage. For compensation, their target range is $220k - $250k base with ISO options; with your publication record you can anchor at the upper band.`;
      if (userMsg.toLowerCase().includes('gap') || userMsg.toLowerCase().includes('triton')) {
        reply = `To address the Triton Inference Server gap (+3.2% boost): highlight your TorchScript and vLLM kernel integration experience. The cross-encoder weights Triton as an adjacent serving competency that maps cleanly to your existing C++ tuning background.`;
      }
      setMessages((prev) => [...prev, { role: 'ai', text: reply }]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#060e20]/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-[#131b2e] rounded-xl p-5 shadow-2xl border border-[#464554]/30 flex flex-col gap-3 h-[600px] max-h-[90vh]">
        <div className="flex items-center justify-between pb-2 border-b border-[#464554]/20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#4edea3]/20 flex items-center justify-center text-[#4edea3]">
              <span className="material-symbols-outlined text-[18px]">psychology</span>
            </div>
            <div>
              <h3 className="font-['Plus+Jakarta+Sans'] text-sm font-semibold text-[#dae2fd]">
                AI Job Scout • {job.company}
              </h3>
              <p className="text-[11px] text-[#908fa0]">Cognitive match advisor for {job.title}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded bg-[#171f33] text-[#c7c4d7] hover:text-[#dae2fd] cursor-pointer">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Conversation stream */}
        <div className="flex-1 overflow-y-auto space-y-3 p-2 bg-[#060e20]/60 rounded-lg">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg text-xs leading-relaxed max-w-[88%] ${
                m.role === 'ai'
                  ? 'bg-[#171f33] text-[#dae2fd] mr-auto border border-[#464554]/20'
                  : 'bg-[#8083ff] text-[#0d0096] ml-auto font-medium'
              }`}
            >
              {m.text}
            </div>
          ))}
        </div>

        {/* Quick prompt chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <button
            onClick={() => handleSend('How do I bridge the Triton gap during interview?')}
            className="px-2 py-1 rounded bg-[#171f33] text-[11px] text-[#c7c4d7] hover:text-[#dae2fd] cursor-pointer"
          >
            Bridge Triton gap?
          </button>
          <button
            onClick={() => handleSend('What is the salary negotiation leverage here?')}
            className="px-2 py-1 rounded bg-[#171f33] text-[11px] text-[#c7c4d7] hover:text-[#dae2fd] cursor-pointer"
          >
            Compensation leverage?
          </button>
          <button
            onClick={() => handleSend('Explain the 0.038 cosine distance')}
            className="px-2 py-1 rounded bg-[#171f33] text-[11px] text-[#c7c4d7] hover:text-[#dae2fd] cursor-pointer"
          >
            Explain 0.038 cosine?
          </button>
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 pt-1 border-t border-[#464554]/20">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
            placeholder="Ask AI Job Scout about this role..."
            className="flex-1 bg-[#171f33] border border-[#464554]/30 rounded-lg px-3 py-2 text-xs text-[#dae2fd] outline-none"
          />
          <button
            onClick={() => handleSend(input)}
            className="px-3.5 py-2 rounded bg-[#4edea3] text-[#002113] text-xs font-semibold hover:bg-[#6ffbbe] cursor-pointer"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
