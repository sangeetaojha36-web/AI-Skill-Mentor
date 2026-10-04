import React, { useState } from 'react';
import { User } from '../types.ts';
import { Compass, Bot, Shield, UserCircle, LogOut, CheckCircle, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentUser: User | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSwitchUser: (role: 'student' | 'admin' | 'switch-student', newBranch?: string) => void;
  onOpenChat: () => void;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  activeTab,
  setActiveTab,
  onSwitchUser,
  onOpenChat,
  onLogout
}) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'setup', label: '1. Profile Setup' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'careers', label: 'Career Explorer' },
    { id: 'skillgap', label: 'Skill Gap' },
    { id: 'roadmap', label: 'Roadmap' },
    { id: 'resume', label: 'ATS Resume' },
    { id: 'interview', label: 'Mock Studio' },
    { id: 'courses', label: 'Courses' },
    { id: 'projects', label: 'Projects' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-600 text-white shadow-sm transition-transform group-hover:scale-105">
              <Compass className="h-4 w-4" />
            </div>
            <div>
              <span className="text-base font-semibold tracking-tight text-white hover:text-orange-300 transition-colors">
                AI Skill Mentor
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        {currentUser && (
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                    isActive
                      ? 'text-orange-300 bg-orange-950/50 border border-orange-800/60'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            {currentUser.role === 'admin' && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  activeTab === 'admin'
                    ? 'text-amber-300 bg-amber-950/50 border border-amber-800/60'
                    : 'text-amber-400/80 hover:text-amber-300 hover:bg-slate-900/60'
                }`}
              >
                T&P Admin
              </button>
            )}
          </nav>
        )}

        {/* Zone 3: Actions & User Dropdown */}
        <div className="flex items-center gap-2 sm:gap-3">
          {currentUser ? (
            <>
              {/* Quick AI Assistant Trigger */}
              <button
                onClick={onOpenChat}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors whitespace-nowrap"
                title="Ask AI Placement Mentor"
              >
                <Bot className="h-3.5 w-3.5 text-orange-400" />
                <span className="hidden sm:inline">Ask AI Mentor</span>
              </button>

              {/* Profile & Role Switcher Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900/60 transition-colors focus:outline-none"
                >
                  <div className="h-6 w-6 rounded-md bg-orange-950 border border-orange-700/50 flex items-center justify-center text-xs font-medium text-orange-300">
                    {currentUser.name ? currentUser.name.charAt(0) : 'U'}
                  </div>
                  <span className="text-xs font-medium text-slate-300 max-w-[120px] truncate hidden md:inline">
                    {currentUser.name ? currentUser.name.split(' ')[0] : 'User'}
                  </span>
                </button>

                {profileDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-72 rounded-xl border border-slate-800 bg-slate-900 p-2 shadow-xl z-50"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <div className="px-3 py-2 border-b border-slate-800 mb-1">
                      <div className="text-xs font-semibold text-white">{currentUser.name}</div>
                      <div className="text-[11px] text-slate-400 truncate">{currentUser.email}</div>
                      <div className="mt-1 text-[10px] text-orange-400 font-medium">
                        {currentUser.education?.degree} {currentUser.education?.branch}
                      </div>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => setActiveTab('setup')}
                        className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800 rounded-md transition-colors text-left"
                      >
                        <Sparkles className="h-3.5 w-3.5 text-orange-400" />
                        <span>Edit Full Academic Profile</span>
                      </button>

                      <div className="my-1 border-t border-slate-800/80"></div>
                      <div className="px-3 py-1 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                        Switch Demo Persona
                      </div>

                      <button
                        onClick={() => onSwitchUser('student', 'Mechanical Engineering')}
                        className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800 rounded-md transition-colors text-left"
                      >
                        <div>
                          <div className="font-medium">Rohan Sharma</div>
                          <div className="text-[10px] text-slate-400">AKTU B.Tech Mech → Data</div>
                        </div>
                        <span className="text-[10px] text-orange-400 font-mono">Tier 3</span>
                      </button>

                      <button
                        onClick={() => onSwitchUser('switch-student', 'Biotechnology')}
                        className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800 rounded-md transition-colors text-left"
                      >
                        <div>
                          <div className="font-medium">Ananya Iyer</div>
                          <div className="text-[10px] text-slate-400">DU B.Sc Biotech</div>
                        </div>
                        <span className="text-[10px] text-emerald-400 font-mono">Tier 1</span>
                      </button>

                      {onLogout && (
                        <>
                          <div className="my-1 border-t border-slate-800/80"></div>
                          <button
                            onClick={onLogout}
                            className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-rose-400 hover:bg-rose-950/40 rounded-md transition-colors text-left"
                          >
                            <LogOut className="h-3.5 w-3.5" />
                            <span>Sign Out / Switch Account</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <button
              onClick={() => setActiveTab('auth')}
              className="px-4 py-2 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-lg shadow-sm transition-colors"
            >
              Sign In / Sign Up
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
