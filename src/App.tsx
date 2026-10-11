/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ActiveScreen, UserRole } from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { JobSeekerFeedView } from './components/JobSeekerFeedView';
import { RecruiterPortalView } from './components/RecruiterPortalView';
import { AdminConsoleView } from './components/AdminConsoleView';
import { PublicPlatformView } from './components/PublicPlatformView';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('job-seeker-feed');
  const [userRole, setUserRole] = useState<UserRole>('recruiter-admin');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(2);

  const notifications = [
    {
      id: 'notif-1',
      title: 'Top Candidate Matched (97%)',
      desc: 'Dr. Marcus Chen, PhD reached 97% affinity with Requisition #NLP-809.',
      time: '12m ago',
      type: 'match',
    },
    {
      id: 'notif-2',
      title: 'Scale AI Requisition Updated',
      desc: 'Scale AI published Principal MLOps Engineer ($190k-$240k).',
      time: '1h ago',
      type: 'job',
    },
    {
      id: 'notif-3',
      title: 'Holdout Benchmark Eval Complete',
      desc: 'Top-k 10 Retrieval accuracy verified at 94.6% (+2.4% vs w-1).',
      time: '3h ago',
      type: 'eval',
    },
    {
      id: 'notif-4',
      title: 'NYC Law 144 Parity Audit Passed',
      desc: 'Zero demographic disparity verified across 1.2M candidate vectors.',
      time: '5h ago',
      type: 'audit',
    },
  ];

  const handleRoleChange = (role: UserRole) => {
    setUserRole(role);
  };

  const handleNavigate = (screen: ActiveScreen) => {
    setActiveScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isFullWidthScreen = activeScreen === 'public-platform';

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dae2fd] font-['Inter'] flex flex-col">
      {/* Top Header */}
      <Header
        activeScreen={activeScreen}
        onNavigate={handleNavigate}
        userRole={userRole}
        onChangeRole={handleRoleChange}
        onOpenNotifications={() => {
          setNotificationsOpen(!notificationsOpen);
          setUnreadNotifications(0);
        }}
        unreadCount={unreadNotifications}
      />

      {/* Main Container with Sidebar on workspace screens */}
      <div className="flex-1 w-full flex">
        {!isFullWidthScreen && (
          <Sidebar activeScreen={activeScreen} onNavigate={handleNavigate} />
        )}

        <div className={`w-full transition-all ${!isFullWidthScreen ? 'pl-0 lg:pl-64' : ''}`}>
          <main className="w-full min-h-screen pt-20 px-4 sm:px-6 py-5 bg-[#0b1326]">
            {activeScreen === 'job-seeker-feed' && <JobSeekerFeedView />}
            {activeScreen === 'recruiter-portal' && <RecruiterPortalView />}
            {activeScreen === 'admin-console' && <AdminConsoleView />}
            {activeScreen === 'public-platform' && (
              <PublicPlatformView onNavigate={handleNavigate} />
            )}
          </main>

          {/* Footer */}
          <footer className="w-full bg-[#060e20] border-t border-[#464554]/25 py-6 px-4 sm:px-6">
            <div className="w-full max-w-[1720px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[#c7c4d7] font-['Inter'] text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#dae2fd]">SmartMatch AI</span>
                <span>•</span>
                <span>Enterprise NLP Semantic Intelligence Platform</span>
              </div>
              <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
                <span className="font-mono text-[11px] text-[#908fa0]">
                  Vector Distance Model v3.2.4
                </span>
                <span className="text-[#4edea3] font-semibold flex items-center gap-1 font-mono text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
                  Status: Optimal Parity
                </span>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* Notifications Drawer */}
      {notificationsOpen && (
        <div className="fixed top-16 right-4 sm:right-6 w-80 sm:w-96 bg-[#131b2e] border border-[#464554]/40 rounded-xl shadow-2xl p-4 z-50 backdrop-blur-xl animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#464554]/20">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#c0c1ff]">
                notifications_active
              </span>
              <span className="font-['Plus+Jakarta+Sans'] text-sm font-semibold text-[#dae2fd]">
                Neural Activity &amp; Vector Alerts
              </span>
            </div>
            <button
              onClick={() => setNotificationsOpen(false)}
              className="text-[#908fa0] hover:text-[#dae2fd] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {notifications.map((n) => (
              <div
                key={n.id}
                className="p-2.5 rounded-lg bg-[#171f33] hover:bg-[#222a3d] transition-colors border border-[#464554]/20 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="font-['Inter'] text-xs font-semibold text-[#dae2fd]">
                    {n.title}
                  </span>
                  <span className="font-mono text-[10px] text-[#908fa0]">{n.time}</span>
                </div>
                <p className="font-['Inter'] text-[11px] text-[#c7c4d7] mt-0.5 leading-snug">
                  {n.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-2 mt-2 border-t border-[#464554]/20 flex justify-between items-center text-[11px]">
            <span className="text-[#908fa0]">All 4 shards operational</span>
            <button
              onClick={() => {
                setActiveScreen('admin-console');
                setNotificationsOpen(false);
              }}
              className="text-[#c0c1ff] hover:underline font-semibold cursor-pointer"
            >
              Open Diagnostics →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
