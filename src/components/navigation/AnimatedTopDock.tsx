import React, { useEffect, useRef, useState, type ReactNode } from 'react';
import { User } from '../../types.ts';
import { createTopDockController, type TopDockOptions } from './topDockController.ts';
import './animatedTopDock.css';
import {
  Compass,
  User as UserIcon,
  ChevronDown,
  LogOut,
  Bot,
  Sparkles,
  LayoutDashboard,
  Briefcase,
  GitBranch,
  Video,
  FileText,
  UserCheck,
  CheckCircle2
} from 'lucide-react';

export type AnimatedTopDockProps = {
  currentUser: User | null;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenChat: () => void;
  onLogout?: () => void;
  proximity?: number;
  spring?: number;
  damping?: number;
  widthGrowth?: number;
  heightGrowth?: number;
  drop?: number;
  className?: string;
};

export const ANIMATED_TOP_DOCK_DEFAULTS = {
  proximity: 122,
  spring: 0.19,
  damping: 0.7,
  widthGrowth: 17,
  heightGrowth: 16,
  drop: 3.5,
} as const;

type DockItem = {
  id: string;
  label: string;
  icon: ReactNode;
};

// Clean core app navigation (Profile Setup moved to Account Area as requested)
const DOCK_ITEMS: readonly DockItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: (
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <rect x="2" y="2" width="5" height="5" rx="1" />
        <rect x="9" y="2" width="5" height="5" rx="1" />
        <rect x="2" y="9" width="5" height="5" rx="1" />
        <rect x="9" y="9" width="5" height="5" rx="1" />
      </svg>
    ),
  },
  {
    id: 'careers',
    label: 'Careers',
    icon: (
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <rect x="2" y="4" width="12" height="9" rx="1.5" />
        <path d="M5 4V2.5A1.5 1.5 0 0 1 6.5 1h3A1.5 1.5 0 0 1 11 2.5V4M2 7.5h12" />
      </svg>
    ),
  },
  {
    id: 'skillgap',
    label: 'Skill Gap',
    icon: (
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path d="M1.5 11l4-4 3 3 6-6" />
        <path d="M11 4h3.5v3.5" />
      </svg>
    ),
  },
  {
    id: 'roadmap',
    label: 'Roadmap',
    icon: (
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="4" cy="4" r="2" />
        <circle cx="12" cy="12" r="2" />
        <path d="M4 6v4a2 2 0 0 0 2 2h4" />
      </svg>
    ),
  },
  {
    id: 'interview',
    label: 'Greenroom Mock',
    icon: (
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <rect x="1.5" y="3.5" width="9" height="9" rx="1.5" />
        <path d="M10.5 6.5l4-2.5v8l-4-2.5v-3z" />
      </svg>
    ),
  },
  {
    id: 'resume',
    label: 'ATS Resume',
    icon: (
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path d="M3.5 2.5h5.5l3.5 3.5v7.5h-9z" />
        <path d="M9 2.5V6h3.5M6 9h4M6 11.5h3" />
      </svg>
    ),
  },
];

const BRAND_MARK = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect width="24" height="24" rx="6" fill="#ea580c" />
    <circle cx="12" cy="12" r="6.5" stroke="#ffffff" strokeWidth="1.2" fill="none" />
    <path d="M14.5 9.5l-4 1.5-1.5 4 4-1.5 1.5-4z" fill="#ffffff" />
  </svg>
);

function useDockController(getOptions: () => TopDockOptions) {
  const rootRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    return createTopDockController(root, getOptions);
  }, []);
  return rootRef;
}

export const AnimatedTopDock: React.FC<AnimatedTopDockProps> = ({
  currentUser,
  activeTab,
  onSelectTab,
  onOpenChat,
  onLogout,
  className = '',
  ...props
}) => {
  const optionsRef = useRef({ ...ANIMATED_TOP_DOCK_DEFAULTS, ...props });
  optionsRef.current = { ...ANIMATED_TOP_DOCK_DEFAULTS, ...props };

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  // Spring physics dock controller
  const rootRef = useDockController(() => ({
    ...optionsRef.current,
    axis: 'x',
    distribute: false,
    lockTrack: true,
  }));

  const displayName = currentUser?.name
    ? currentUser.name.split(' ')[0]
    : 'Student';

  return (
    <div className={`animated-top-dock-component atd-modern${className ? ` ${className}` : ''}`}>
      <header className="atd-modern__bar">
        {/* Brand Group */}
        <button
          className="atd-modern__brand"
          type="button"
          onClick={() => onSelectTab(currentUser ? 'dashboard' : 'setup')}
        >
          <span className="atd-modern__mark" aria-hidden="true">
            {BRAND_MARK}
          </span>
          <span className="atd-modern__word">AI Skill Mentor</span>
        </button>

        {/* Center Spring Dock (Clean Core Tools without clutter) */}
        <nav
          ref={rootRef}
          className="atd-modern__dock"
          aria-label="Command bar"
          data-dock-state="idle"
          data-dock-max="0.00"
        >
          {DOCK_ITEMS.map((item) => {
            const isPressed = activeTab === item.id;
            return (
              <button
                key={item.id}
                className="atd-modern__item"
                data-dock-item
                type="button"
                aria-pressed={isPressed}
                onClick={() => onSelectTab(item.id)}
              >
                <span className="atd-modern__icon" aria-hidden="true">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action & Account Group */}
        <div className="atd-modern__actions">
          {currentUser ? (
            <div className="relative flex items-center" ref={menuRef}>
              {/* Student Account Button (properly padded, no clipping) */}
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                  activeTab === 'setup'
                    ? 'bg-orange-950/70 border-orange-500/80 text-orange-200'
                    : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700/80 text-zinc-100'
                }`}
                title="Account & Profile Setup"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
                <span className="text-xs font-semibold max-w-[110px] sm:max-w-[130px] truncate">
                  {displayName}
                </span>
                <ChevronDown className={`h-3 w-3 text-zinc-400 transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Account Area Dropdown (Includes Profile Setup as requested) */}
              {menuOpen && (
                <div
                  className="absolute right-0 top-full mt-2.5 w-72 rounded-2xl border border-white/[0.1] bg-[#0E1017] p-2.5 shadow-2xl z-50 text-xs backdrop-blur-xl animate-fade-in"
                  onClick={() => setMenuOpen(false)}
                >
                  {/* Account Header Details */}
                  <div className="p-3 rounded-xl bg-zinc-900/80 border border-white/[0.06] mb-2 space-y-1">
                    <div className="font-semibold text-white text-sm truncate">
                      {currentUser.name}
                    </div>
                    <div className="text-[11px] text-zinc-400 truncate">
                      {currentUser.email}
                    </div>
                    {currentUser.education?.degree && (
                      <div className="text-[10px] text-orange-400 pt-1 border-t border-zinc-800/80 flex items-center gap-1">
                        <span>🎓 {currentUser.education.degree} in {currentUser.education.branch}</span>
                      </div>
                    )}
                  </div>

                  {/* Primary Profile Setup Action (Relocated to Account Area) */}
                  <div className="py-1">
                    <button
                      onClick={() => onSelectTab('setup')}
                      className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-2.5 cursor-pointer ${
                        activeTab === 'setup'
                          ? 'bg-orange-600/20 border border-orange-500/40 text-orange-300'
                          : 'hover:bg-zinc-800/80 text-zinc-200'
                      }`}
                    >
                      <div className="h-7 w-7 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 mt-0.5">
                        <UserCheck className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-xs text-white flex items-center gap-1.5">
                          <span>Profile Setup</span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-orange-500/20 text-orange-400 font-mono">
                            {currentUser.isProfileComplete ? 'Complete' : 'Pending'}
                          </span>
                        </div>
                        <div className="text-[11px] text-zinc-400 mt-0.5">
                          10th/12th Marks, College, Skills, Projects
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Switch Demo Student Options */}
                  <div className="pt-2 mt-1 border-t border-white/[0.08]">
                    <div className="px-2 py-1 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
                      Switch Demo Student Profile
                    </div>

                    <button
                      onClick={() => onSelectTab('dashboard')}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors flex items-center justify-between"
                    >
                      <span>Rohan Sharma (Mechanical)</span>
                      <span className="text-[10px] text-orange-400 font-mono">Tier 3</span>
                    </button>

                    <button
                      onClick={() => onSelectTab('dashboard')}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors flex items-center justify-between"
                    >
                      <span>Ananya Iyer (Biotechnology)</span>
                      <span className="text-[10px] text-emerald-400 font-mono">Tier 1</span>
                    </button>
                  </div>

                  {/* Sign Out Option */}
                  {onLogout && (
                    <div className="pt-2 mt-1 border-t border-white/[0.08]">
                      <button
                        onClick={onLogout}
                        className="w-full text-left px-2.5 py-2 text-rose-400 hover:bg-rose-950/40 rounded-xl transition-colors flex items-center gap-2 cursor-pointer font-medium"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        <span>Sign Out / Switch Account</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                className="atd-modern__ghost"
                type="button"
                onClick={() => onSelectTab('auth')}
              >
                Sign In
              </button>
              <button
                className="atd-modern__cta"
                type="button"
                onClick={() => onSelectTab('auth')}
              >
                <span>Get Started</span>
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3.2 8h9.1M8.6 4.3 12.4 8l-3.8 3.7" />
                </svg>
              </button>
            </>
          )}
        </div>
      </header>
    </div>
  );
};
