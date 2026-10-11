import React, { useState } from 'react';
import { ActiveScreen, UserRole } from '../types';
import { ELENA_VANCE_PROFILE } from '../data/mockData';

interface HeaderProps {
  activeScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
  userRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  onOpenNotifications: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeScreen,
  onNavigate,
  userRole,
  onChangeRole,
  onOpenNotifications,
  unreadCount = 2,
}) => {
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'recruiter-admin':
        return 'Recruiter Admin';
      case 'job-seeker':
        return 'Job Seeker (Candidate)';
      case 'system-admin':
        return 'Platform Ops Admin';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#060e20]/85 backdrop-blur-xl border-b border-[#464554]/25 shadow-[0_1px_12px_rgba(0,0,0,0.5)]">
      <div className="w-full h-full px-4 lg:px-6 flex items-center justify-between gap-4">
        {/* Left: Brand + Navigation */}
        <div className="flex items-center gap-4 lg:gap-6 flex-shrink-0">
          <button
            onClick={() => onNavigate('public-platform')}
            className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
          >
            <img
              alt="SmartMatch AI Logo"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZv4fIM9UazNyo799OdrVfVjgT0jJ1JB9nVnJWTSYnojdzePsHhH_4TfBLRX5-xvbITBeWIbDAdQ_6YIgRT7phSiryb4NHJQUnmB1GqoWDt1ASSU_bSW0ilghCsxozkbrGvgFx2HpL1xL6zeOIFfOGeTELweaG3zZqgAMKsoYCJelFW8WowyKqBe99LF6lt2M5SPUZ0UbUqgiVLESfOc4diqhnIVcJLb__punHH4F5PFNgF4ZRT7T5"
            />
            <span className="font-['Plus+Jakarta+Sans'] font-semibold text-base lg:text-lg text-[#dae2fd] tracking-tight">
              SmartMatch AI
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-[#222a3d] border border-[#464554]/40 text-[#c0c1ff] font-['Inter'] text-[11px] font-semibold uppercase tracking-wider">
              NLP v3.2 Engine
            </span>
          </button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 ml-2 lg:ml-4">
            <button
              onClick={() => onNavigate('public-platform')}
              className={`px-3 py-1.5 font-['Inter'] text-xs lg:text-[13px] font-medium rounded transition-all cursor-pointer ${
                activeScreen === 'public-platform'
                  ? 'bg-[#222a3d] text-[#c0c1ff] border border-[#c0c1ff]/30 shadow-[0_0_12px_-2px_rgba(192,193,255,0.25)]'
                  : 'text-[#c7c4d7] hover:text-[#dae2fd] hover:bg-[#222a3d]/70'
              }`}
            >
              Public Platform
            </button>
            <button
              onClick={() => onNavigate('job-seeker-feed')}
              className={`px-3 py-1.5 font-['Inter'] text-xs lg:text-[13px] font-medium rounded transition-all cursor-pointer ${
                activeScreen === 'job-seeker-feed'
                  ? 'bg-[#222a3d] text-[#c0c1ff] border border-[#c0c1ff]/30 shadow-[0_0_12px_-2px_rgba(192,193,255,0.25)]'
                  : 'text-[#c7c4d7] hover:text-[#dae2fd] hover:bg-[#222a3d]/70'
              }`}
            >
              Job Seeker Feed
            </button>
            <button
              onClick={() => onNavigate('recruiter-portal')}
              className={`px-3 py-1.5 font-['Inter'] text-xs lg:text-[13px] font-medium rounded transition-all cursor-pointer ${
                activeScreen === 'recruiter-portal'
                  ? 'bg-[#222a3d] text-[#c0c1ff] border border-[#c0c1ff]/30 shadow-[0_0_12px_-2px_rgba(192,193,255,0.25)]'
                  : 'text-[#c7c4d7] hover:text-[#dae2fd] hover:bg-[#222a3d]/70'
              }`}
            >
              Recruiter Portal
            </button>
            <button
              onClick={() => onNavigate('admin-console')}
              className={`px-3 py-1.5 font-['Inter'] text-xs lg:text-[13px] font-medium rounded transition-all cursor-pointer ${
                activeScreen === 'admin-console'
                  ? 'bg-[#222a3d] text-[#c0c1ff] border border-[#c0c1ff]/30 shadow-[0_0_12px_-2px_rgba(192,193,255,0.25)]'
                  : 'text-[#c7c4d7] hover:text-[#dae2fd] hover:bg-[#222a3d]/70'
              }`}
            >
              Admin Console
            </button>
          </nav>
        </div>

        {/* Right: Live Sync Badge + Notifications + Role + Avatar */}
        <div className="flex items-center gap-3 lg:gap-4 flex-shrink-0">
          {/* Neural Index Pulse */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded bg-[#131b2e] border border-[#4edea3]/30">
            <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
            <span className="font-mono text-xs text-[#4edea3] font-medium tracking-tight">
              Neural Index Synced 99.8%
            </span>
          </div>

          {/* Notifications Button */}
          <button
            onClick={onOpenNotifications}
            aria-label="Notifications"
            className="relative p-2 rounded bg-[#131b2e] hover:bg-[#222a3d] text-[#c7c4d7] hover:text-[#dae2fd] transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#4edea3] ring-2 ring-[#060e20]"></span>
            )}
          </button>

          {/* Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#131b2e] border border-[#464554]/30 hover:border-[#c0c1ff]/40 text-[#dae2fd] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-[#c0c1ff]">switch_account</span>
              <span className="text-[11px] text-[#c7c4d7]">Role:</span>
              <span className="text-[11px] font-semibold text-[#dae2fd]">{getRoleLabel(userRole)}</span>
              <span className="material-symbols-outlined text-[14px] text-[#908fa0]">expand_more</span>
            </button>

            {roleMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-lg bg-[#171f33] border border-[#464554]/40 shadow-xl py-1 z-50 backdrop-blur-md">
                <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-[#908fa0] font-semibold">
                  Switch User View
                </div>
                <button
                  onClick={() => {
                    onChangeRole('recruiter-admin');
                    onNavigate('recruiter-portal');
                    setRoleMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#222a3d] ${
                    userRole === 'recruiter-admin' ? 'text-[#4edea3] font-semibold' : 'text-[#dae2fd]'
                  }`}
                >
                  <span>Recruiter Admin</span>
                  {userRole === 'recruiter-admin' && <span className="material-symbols-outlined text-[14px]">check</span>}
                </button>
                <button
                  onClick={() => {
                    onChangeRole('job-seeker');
                    onNavigate('job-seeker-feed');
                    setRoleMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#222a3d] ${
                    userRole === 'job-seeker' ? 'text-[#4edea3] font-semibold' : 'text-[#dae2fd]'
                  }`}
                >
                  <span>Job Seeker (Candidate)</span>
                  {userRole === 'job-seeker' && <span className="material-symbols-outlined text-[14px]">check</span>}
                </button>
                <button
                  onClick={() => {
                    onChangeRole('system-admin');
                    onNavigate('admin-console');
                    setRoleMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#222a3d] ${
                    userRole === 'system-admin' ? 'text-[#4edea3] font-semibold' : 'text-[#dae2fd]'
                  }`}
                >
                  <span>Platform Ops Admin</span>
                  {userRole === 'system-admin' && <span className="material-symbols-outlined text-[14px]">check</span>}
                </button>
              </div>
            )}
          </div>

          {/* Profile User */}
          <div className="flex items-center gap-3 pl-2 border-l border-[#464554]/30">
            <div className="text-right hidden lg:block">
              <div className="font-['Inter'] text-xs font-semibold text-[#dae2fd] leading-tight">
                {ELENA_VANCE_PROFILE.name}
              </div>
              <div className="font-['Inter'] text-[11px] text-[#c7c4d7]">
                {ELENA_VANCE_PROFILE.title}
              </div>
            </div>
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-[#8083ff]/40 shadow-[0_0_10px_rgba(99,102,241,0.35)]"
              src={ELENA_VANCE_PROFILE.headerAvatar}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
