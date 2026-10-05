import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  Blocks,
  Bot,
  ChevronRight,
  ExternalLink,
  GraduationCap,
  Layers,
  LogOut,
  Moon,
  Search,
  Settings,
  Sparkles,
  Sun,
  User as UserIcon,
  Video,
  X,
  Menu,
  ChevronDown,
  Lock,
} from 'lucide-react';
import {
  BuildingIcon,
  CaretUpDownIcon,
  DemostackLogo,
  HomeIcon,
  DemostacksIcon,
  VideosIcon,
  ShowcasesIcon,
  GroupGenericIcon,
  FigGraduationIcon,
  DashboardFolderPlusIcon,
  FigLightbulbIcon,
  FigPlayIcon,
  NavCmdIcon,
  NavSearchIcon,
} from './icons.tsx';
import { User } from '../../types.ts';

interface DemostackAppLayoutProps {
  currentUser: User;
  activeTab: string;
  onNavigate: (tab: string) => void;
  onOpenChat: () => void;
  onLogout: () => void;
  onOpenAuthModal?: (isLogin: boolean) => void;
  onExitPreview?: () => void;
  children: React.ReactNode;
}

export function DemostackAppLayout({
  currentUser,
  activeTab,
  onNavigate,
  onOpenChat,
  onLogout,
  onOpenAuthModal,
  onExitPreview,
  children,
}: DemostackAppLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isOrgMenuOpen, setIsOrgMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const orgMenuRef = useRef<HTMLDivElement>(null);
  const notifMenuRef = useRef<HTMLDivElement>(null);
  const mainScrollRef = useRef<HTMLElement>(null);

  // Guarantee that every page opens at the top when navigating between tabs
  useEffect(() => {
    const scrollToTop = () => {
      if (mainScrollRef.current) {
        mainScrollRef.current.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        mainScrollRef.current.scrollTop = 0;
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    scrollToTop();
    const rId = requestAnimationFrame(scrollToTop);
    return () => cancelAnimationFrame(rId);
  }, [activeTab]);

  // Close popovers on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
      if (orgMenuRef.current && !orgMenuRef.current.contains(event.target as Node)) {
        setIsOrgMenuOpen(false);
      }
      if (notifMenuRef.current && !notifMenuRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut Cmd+K or Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
      if (event.key === 'Escape') {
        setIsMobileSearchOpen(false);
        setIsProfileMenuOpen(false);
        setIsOrgMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isGuest = currentUser?.isGuestPreview;

  // Workspace Nav Items - Ordered according to the Placement Workflow
  const workspaceNavigation = [
    {
      name: 'Placement Dashboard',
      tabKey: 'dashboard',
      icon: HomeIcon,
      badge: isGuest ? 'Locked' : undefined,
    },
    {
      name: 'AI Resume Analyzer',
      tabKey: 'resume',
      icon: ShowcasesIcon,
      badge: isGuest ? 'Demo Step 1' : 'AI Scan',
    },
    {
      name: 'Skill Gap Matrix',
      tabKey: 'skillgap',
      icon: GroupGenericIcon,
      badge: isGuest ? 'Demo Step 2' : undefined,
    },
    {
      name: 'Personalized Roadmap',
      tabKey: 'roadmap',
      icon: DemostacksIcon,
      badge: isGuest ? 'Locked' : undefined,
    },
    {
      name: 'Learning Academy',
      tabKey: 'courses',
      icon: FigGraduationIcon,
      badge: isGuest ? 'Locked' : undefined,
    },
    {
      name: 'Portfolio Projects',
      tabKey: 'projects',
      icon: DashboardFolderPlusIcon,
      badge: isGuest ? 'Locked' : undefined,
    },
    {
      name: 'Mock Interview Studio',
      tabKey: 'interview',
      icon: VideosIcon,
      badge: isGuest ? 'Locked' : 'Live',
    },
    {
      name: 'Progress Tracker',
      tabKey: 'progress',
      icon: FigPlayIcon,
      badge: isGuest ? 'Locked' : undefined,
    },
    {
      name: 'Career Explorer',
      tabKey: 'careers',
      icon: FigLightbulbIcon,
      badge: isGuest ? 'Locked' : undefined,
    },
  ];

  const adminNavigation = [
    {
      name: 'Profile Setup',
      tabKey: 'setup',
      icon: UserIcon,
      badge: isGuest ? 'Locked' : undefined,
    },
    {
      name: 'Placement Mentor AI',
      tabKey: 'chat_modal',
      icon: Bot,
      badge: isGuest ? 'Locked' : 'AI Live',
      onClick: onOpenChat,
    },
    ...(currentUser.role === 'admin'
      ? [
          {
            name: 'Admin Console',
            tabKey: 'admin',
            icon: BuildingIcon,
            badge: 'Directorate',
          },
        ]
      : []),
  ];

  const currentPage = [...workspaceNavigation, ...adminNavigation].find(
    (item) => item.tabKey === activeTab
  ) || workspaceNavigation[0];

  const CurrentPageIcon = currentPage.icon;

  const initials = currentUser.name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'ST';

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0A0706] text-white font-sans antialiased selection:bg-[#DE4313]/40 selection:text-white">
      {/* =========================================================================
         SIDEBAR: Matching the Demostack design & arrangement
         ========================================================================= */}
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col justify-between border-r border-white/[0.08] bg-[#0E0604] transition-all duration-300 lg:static ${
          isSidebarOpen ? 'w-64 p-3' : 'w-20 p-2 items-center'
        } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Top Header Card */}
        <div className="w-full">
          <div className={`rounded-2xl border border-white/[0.08] bg-[#140603] shadow-sm transition-all ${
            isSidebarOpen ? 'p-3' : 'p-2 flex flex-col items-center gap-2'
          }`}>
            {/* Logo and collapse toggle */}
            <div className={`flex items-center w-full ${isSidebarOpen ? 'justify-between mb-3.5' : 'justify-center mb-0'}`}>
              {isSidebarOpen && (
                <div
                  onClick={() => {
                    onNavigate('dashboard');
                    setIsMobileOpen(false);
                  }}
                  className="flex items-center gap-2 cursor-pointer select-none"
                >
                  <div className="size-7 rounded-xl bg-gradient-to-br from-[#FEC163] to-[#DE4313] flex items-center justify-center text-black shadow-md font-bold shrink-0">
                    <Sparkles className="size-4 text-black fill-black" />
                  </div>
                  <span className="font-bold text-base tracking-tight text-white">
                    Skill<span className="text-[#FEC163]">Mentor</span>
                  </span>
                </div>
              )}

              <button
                type="button"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className={`hidden lg:flex size-9 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.1] text-zinc-300 hover:text-white transition-colors cursor-pointer shrink-0 ${
                  !isSidebarOpen ? 'mx-auto' : ''
                }`}
                title={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
                aria-label="Toggle sidebar"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2.5" y="2.5" width="13" height="13" rx="3.5" stroke="currentColor" strokeWidth="1.4" />
                  <line x1="7.5" y1="3" x2="7.5" y2="15" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => setIsMobileOpen(false)}
                className="flex lg:hidden size-8 items-center justify-center rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Organization / Campus Box */}
            <div className="relative w-full flex justify-center" ref={orgMenuRef}>
              <button
                type="button"
                onClick={() => setIsOrgMenuOpen(!isOrgMenuOpen)}
                className={`rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center transition-colors cursor-pointer ${
                  isSidebarOpen
                    ? 'w-full p-2 pr-2.5 gap-2.5 text-left'
                    : 'size-10 justify-center p-0 gap-0 mx-auto'
                }`}
                title={currentUser.education?.college || 'My Campus Workspace'}
              >
                <div className="size-8 rounded-full bg-black text-[#FEC163] flex items-center justify-center shrink-0 border border-[#FEC163]/30">
                  <BuildingIcon className="size-4 fill-[#FEC163]" />
                </div>
                {isSidebarOpen && (
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-xs text-white truncate">
                      {currentUser.education?.college || 'My Campus Workspace'}
                    </p>
                    <p className="text-[10px] text-zinc-400 truncate">
                      {currentUser.education?.branch || 'Student Workspace'}
                    </p>
                  </div>
                )}
                {isSidebarOpen && <CaretUpDownIcon className="size-4 text-zinc-500 shrink-0 ml-auto" />}
              </button>

              {/* Organization Switcher Dropdown */}
              {isOrgMenuOpen && isSidebarOpen && (
                <div className="absolute top-full left-0 mt-1 w-full rounded-xl border border-white/[0.1] bg-[#1A0804] p-1.5 shadow-2xl z-50 animate-fade-in text-xs">
                  <div className="px-2 py-1 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                    Select Workspace
                  </div>
                  <button
                    onClick={() => {
                      setIsOrgMenuOpen(false);
                      onNavigate('dashboard');
                    }}
                    className="w-full flex items-center gap-2 p-2 rounded-lg bg-white/[0.06] text-white text-left font-medium"
                  >
                    <div className="size-2 rounded-full bg-emerald-400" />
                    <span className="truncate">{currentUser.education?.college || 'Campus Workspace'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsOrgMenuOpen(false);
                      onNavigate('setup');
                    }}
                    className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-white/[0.04] text-zinc-300 text-left mt-1"
                  >
                    <Settings className="size-3.5" />
                    <span>Manage Workspaces</span>
                  </button>
                </div>
              )}
            </div>

            {/* MEMBERS [1] Pill & Avatar */}
            {isSidebarOpen && (
              <div className="mt-3 pt-2.5 border-t border-white/[0.06] w-full">
                <p className="text-[11px] font-medium text-zinc-400">
                  MEMBERS [1]
                </p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <div className="size-8 rounded-full overflow-hidden border border-white/[0.15] bg-[#220B06] flex items-center justify-center shrink-0">
                    {currentUser.avatarUrl ? (
                      <img src={currentUser.avatarUrl} alt={currentUser.name} className="size-full object-cover" />
                    ) : (
                      <span className="text-xs font-bold text-[#FEC163]">{initials}</span>
                    )}
                  </div>
                  <span className="text-xs text-zinc-300 font-medium truncate">
                    {currentUser.name}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu List */}
        <div className="flex-1 w-full overflow-y-auto py-4 space-y-6 no-scrollbar">
          {/* Group 1: Workspace */}
          <div className="w-full">
            {isSidebarOpen && (
              <p className="text-xs font-semibold text-zinc-400 px-3 mb-2 uppercase tracking-wider">
                Workspace
              </p>
            )}
            <div className="space-y-1 w-full">
              {workspaceNavigation.map((item) => {
                const isActive = activeTab === item.tabKey;
                const Icon = item.icon;

                return (
                  <button
                    key={item.tabKey}
                    type="button"
                    onClick={() => {
                      onNavigate(item.tabKey);
                      setIsMobileOpen(false);
                    }}
                    className={`flex items-center transition-all cursor-pointer ${
                      isSidebarOpen
                        ? 'w-full gap-3 px-3 py-2.5 rounded-xl text-sm'
                        : 'size-10 justify-center p-0 mx-auto rounded-xl'
                    } ${
                      isActive
                        ? 'bg-white/[0.12] text-white font-semibold border border-white/[0.15] shadow-sm'
                        : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
                    }`}
                    title={item.name}
                  >
                    <Icon className="size-4.5 shrink-0" />
                    {isSidebarOpen && <span className="truncate">{item.name}</span>}
                    {isSidebarOpen && item.badge && (
                      <span
                        className={`ml-auto text-[10px] font-mono px-2 py-0.5 rounded-full flex items-center gap-1 ${
                          item.badge === 'Locked'
                            ? 'bg-rose-950/40 text-rose-300 border border-rose-800/40'
                            : item.badge.startsWith('Demo')
                            ? 'bg-[#FEC163]/20 text-[#FEC163] border border-[#FEC163]/40 font-bold'
                            : 'bg-[#FEC163]/15 text-[#FEC163] border border-[#FEC163]/30'
                        }`}
                      >
                        {item.badge === 'Locked' && <Lock className="size-2.5" />}
                        <span>{item.badge}</span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group 2: Account & AI */}
          <div className="w-full">
            {isSidebarOpen && (
              <p className="text-xs font-semibold text-zinc-400 px-3 mb-2 uppercase tracking-wider">
                {currentUser.role === 'admin' ? 'Intelligence & Directorate' : 'Intelligence & Tools'}
              </p>
            )}
            <div className="space-y-1 w-full">
              {adminNavigation.map((item) => {
                const isActive = activeTab === item.tabKey;
                const Icon = item.icon;

                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => {
                      if (item.onClick) {
                        item.onClick();
                      } else {
                        onNavigate(item.tabKey);
                      }
                      setIsMobileOpen(false);
                    }}
                    className={`flex items-center transition-all cursor-pointer ${
                      isSidebarOpen
                        ? 'w-full gap-3 px-3 py-2.5 rounded-xl text-sm'
                        : 'size-10 justify-center p-0 mx-auto rounded-xl'
                    } ${
                      isActive
                        ? 'bg-white/[0.12] text-white font-semibold border border-white/[0.15]'
                        : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
                    }`}
                    title={item.name}
                  >
                    <Icon className="size-4.5 shrink-0" />
                    {isSidebarOpen && <span className="truncate">{item.name}</span>}
                    {isSidebarOpen && item.badge && (
                      <span
                        className={`ml-auto text-[10px] font-mono px-2 py-0.5 rounded-full flex items-center gap-1 ${
                          item.badge === 'Locked'
                            ? 'bg-rose-950/40 text-rose-300 border border-rose-800/40'
                            : item.badge === 'Public'
                            ? 'bg-[#FEC163]/15 text-[#FEC163] border border-[#FEC163]/30'
                            : 'bg-orange-600 text-white font-bold'
                        }`}
                      >
                        {item.badge === 'Locked' && <Lock className="size-2.5" />}
                        <span>{item.badge}</span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar Footer: User Card Matching Demostack Screenshot */}
        <div className="w-full pt-3 border-t border-white/[0.08] relative" ref={profileMenuRef}>
          <button
            type="button"
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className={`rounded-xl hover:bg-white/[0.06] transition-colors cursor-pointer ${
              isSidebarOpen
                ? 'w-full flex items-center gap-2.5 p-2 text-left'
                : 'size-10 mx-auto flex items-center justify-center p-0'
            }`}
            title={`${currentUser.name} (${currentUser.email})`}
          >
            <div className="size-9 rounded-full overflow-hidden border border-white/[0.2] bg-[#220B06] flex items-center justify-center shrink-0">
              {currentUser.avatarUrl ? (
                <img src={currentUser.avatarUrl} alt={currentUser.name} className="size-full object-cover" />
              ) : (
                <span className="text-xs font-bold text-[#FEC163]">{initials}</span>
              )}
            </div>

            {isSidebarOpen && (
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-sm text-white truncate leading-tight">
                  {currentUser.name}
                </p>
                <p className="text-xs text-zinc-400 truncate mt-0.5">
                  {currentUser.email}
                </p>
              </div>
            )}
          </button>

          {/* Profile Popover Menu */}
          {isProfileMenuOpen && (
            <div className="absolute bottom-full left-2 mb-2 w-60 rounded-2xl border border-white/[0.12] bg-[#180703] p-2 shadow-2xl z-50 text-xs">
              <div className="p-2 border-b border-white/[0.08]">
                <p className="font-semibold text-white text-sm truncate">{currentUser.name}</p>
                <p className="text-zinc-400 text-xs truncate">{currentUser.email}</p>
                <span className="inline-block mt-1 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  {currentUser.role === 'admin' ? 'Placement Admin' : 'Student Pro'}
                </span>
              </div>

              <div className="py-1 space-y-0.5">
                <button
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    onNavigate('setup');
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-white/[0.08] text-zinc-200 text-left transition-colors"
                >
                  <UserIcon className="size-4 text-zinc-400" />
                  <span>Profile Settings</span>
                </button>
                <button
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    onOpenChat();
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-white/[0.08] text-zinc-200 text-left transition-colors"
                >
                  <Bot className="size-4 text-orange-400" />
                  <span>Placement Mentor AI</span>
                </button>
                <button
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    onNavigate('admin');
                  }}
                  className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-left transition-colors ${
                    currentUser.role === 'admin'
                      ? 'hover:bg-amber-500/20 text-amber-300'
                      : 'hover:bg-white/[0.08] text-zinc-400 hover:text-white'
                  }`}
                  title={currentUser.role === 'admin' ? 'T&P Directorate Governance' : 'T&P Officer Authentication'}
                >
                  <BuildingIcon className="size-4 text-amber-400" />
                  <span>{currentUser.role === 'admin' ? 'Admin Console' : 'T&P Officer Portal'}</span>
                </button>
              </div>

              <div className="pt-1 border-t border-white/[0.08]">
                <button
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-rose-500/20 text-rose-400 text-left transition-colors"
                >
                  <LogOut className="size-4" />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* =========================================================================
         MAIN APPLICATION AREA: TOPBAR + VIEW CONTENT
         ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 shrink-0 border-b border-white/[0.08] bg-[#0E0604]/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-4 z-20">
          <div className="flex items-center gap-3 min-w-0">
            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setIsMobileOpen(true)}
              className="flex lg:hidden size-9 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.04] text-white cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </button>

            {/* Current Page Title */}
            <div className="hidden sm:flex items-center gap-2">
              <CurrentPageIcon className="size-4.5 text-[#FEC163]" />
              <h1 className="text-base font-semibold text-white tracking-tight truncate">
                {currentPage.name}
              </h1>
            </div>

            {/* Quick Search */}
            <div className="relative hidden md:flex items-center w-72">
              <NavSearchIcon className="absolute left-3 size-4 text-zinc-500" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Quick search for skills, courses or careers..."
                className="w-full h-9 pl-9 pr-14 rounded-xl border border-white/[0.08] bg-white/[0.04] focus:bg-white/[0.08] focus:border-[#FEC163]/50 text-xs text-white placeholder-zinc-500 outline-none transition-all"
              />
              <div className="absolute right-2 flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/[0.08] text-[10px] text-zinc-400 font-mono">
                <NavCmdIcon className="size-2.5" />
                <span>K</span>
              </div>
            </div>
          </div>

          {/* Right Topbar Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={onOpenChat}
              className="h-9 px-3.5 rounded-full bg-gradient-to-r from-[#FEC163] to-[#DE4313] hover:from-[#ffd28e] hover:to-[#ef5323] text-black font-semibold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Bot className="size-4 text-black" />
              <span className="hidden sm:inline">Ask Mentor</span>
            </button>

            {/* Notifications */}
            <div className="relative" ref={notifMenuRef}>
              <button
                type="button"
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="size-9 rounded-full border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="size-4" />
              </button>

              {isNotifOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl border border-white/[0.12] bg-[#180703] p-3 shadow-2xl z-50 text-xs animate-fade-in">
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                    <span className="font-semibold text-white">Placement Alerts</span>
                    <span className="text-[10px] text-zinc-400">2 Unread</span>
                  </div>
                  <div className="py-2 space-y-2">
                    <div className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.04]">
                      <p className="font-semibold text-white text-xs">ATS Resume Scan Complete</p>
                      <p className="text-zinc-400 text-[11px] mt-0.5">Scored 82/100 on Indian campus criteria.</p>
                    </div>
                    <div className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.04]">
                      <p className="font-semibold text-white text-xs">Greenroom Simulation Ready</p>
                      <p className="text-zinc-400 text-[11px] mt-0.5">3 technical questions generated for {currentUser.careerGoal || 'Data Analyst'}.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable View Content Container - Auto scrolls to top on navigation */}
        <main ref={mainScrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 no-scrollbar">
          {currentUser?.isGuestPreview && (
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-[#200A03] via-[#140602] to-[#0A0301] border border-[#FEC163]/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="size-2.5 rounded-full bg-[#FEC163] animate-pulse shrink-0" />
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-extrabold text-white text-xs">
                      {activeTab === 'resume'
                        ? '⚡ Interactive Demo (Step 1 of 2: AI Resume Analyzer)'
                        : activeTab === 'skillgap'
                        ? '⚡ Interactive Demo (Step 2 of 2: Skill Gap Matrix)'
                        : '🔒 Feature Locked in Demo Mode'}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FEC163]/20 text-[#FEC163] border border-[#FEC163]/40">
                      Sample Student Mode
                    </span>
                  </div>
                  <span className="text-zinc-300">
                    {activeTab === 'resume'
                      ? 'Upload your resume or inspect sample ATS audit. When done, proceed to Skill Gap Matrix.'
                      : activeTab === 'skillgap'
                      ? 'Demo completed! To generate your week-by-week roadmap and access other features, sign up for a free account.'
                      : 'This feature is reserved for registered students. Create an account to access the full placement engine.'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => onOpenAuthModal?.(false)}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#FEC163] to-[#DE4313] text-zinc-950 font-bold hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-md text-xs flex items-center gap-1.5"
                >
                  <span>Sign Up to Unlock Whole App</span>
                  <ChevronRight className="size-3" />
                </button>
                <button
                  type="button"
                  onClick={onExitPreview || onLogout}
                  className="px-2.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-zinc-300 hover:text-white transition-colors cursor-pointer text-xs"
                >
                  Exit Demo
                </button>
              </div>
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
