import React from 'react';
import { ActiveScreen } from '../types';

interface SidebarProps {
  activeScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
  cachedEmbeddingsCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeScreen,
  onNavigate,
  cachedEmbeddingsCount = 1048576,
}) => {
  const navItems: { screen: ActiveScreen; label: string; icon: string }[] = [
    {
      screen: 'recruiter-portal',
      label: 'Candidate Ranking',
      icon: 'hub',
    },
    {
      screen: 'job-seeker-feed',
      label: 'NLP Match Feed',
      icon: 'psychology',
    },
    {
      screen: 'admin-console',
      label: 'Telemetry & Ontology',
      icon: 'query_stats',
    },
    {
      screen: 'public-platform',
      label: 'Platform Explorer',
      icon: 'public',
    },
  ];

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-[#131b2e] border-r border-[#464554]/25 z-40 flex flex-col justify-between py-4 shadow-xl">
      <div className="flex flex-col gap-2 px-3">
        <div className="px-3 py-1 font-['Inter'] text-[11px] uppercase tracking-wider text-[#908fa0] font-semibold">
          Semantic Modules
        </div>
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const isActive = activeScreen === item.screen;
            return (
              <button
                key={item.screen}
                onClick={() => onNavigate(item.screen)}
                className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-lg font-['Inter'] text-[13px] font-medium transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-[#8083ff] text-[#0d0096] shadow-[0_0_16px_-4px_rgba(128,131,255,0.45)] font-semibold'
                    : 'text-[#c7c4d7] hover:bg-[#222a3d] hover:text-[#dae2fd]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Vector Space Active Widget */}
      <div className="px-3">
        <div className="p-3.5 rounded-xl bg-[#171f33] border border-[#464554]/30 flex flex-col gap-1.5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-['Inter'] text-xs text-[#c7c4d7]">Vector Space</span>
            <span className="font-mono text-xs text-[#4edea3] font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse"></span>
              Active
            </span>
          </div>
          <div className="w-full bg-[#2d3449] h-1.5 rounded-full overflow-hidden mt-0.5">
            <div className="bg-[#4edea3] h-full w-[99.8%] rounded-full shadow-[0_0_8px_rgba(78,222,163,0.5)]"></div>
          </div>
          <span className="font-['Inter'] text-[11px] text-[#908fa0] mt-0.5">
            {cachedEmbeddingsCount.toLocaleString()} Embeddings cached
          </span>
        </div>
      </div>
    </aside>
  );
};
