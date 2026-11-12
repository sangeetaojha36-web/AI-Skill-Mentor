import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Compass,
  Target,
  FileCheck2,
  Video,
  Shield,
  ArrowRight,
  Eye,
  EyeOff,
  Check,
} from 'lucide-react';

interface AwardWinningAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoginMode: boolean;
  setIsLoginMode: (isLogin: boolean) => void;
  isAdminAuthMode: boolean;
  setIsAdminAuthMode: (isAdmin: boolean) => void;
  firstName: string;
  setFirstName: (val: string) => void;
  lastName: string;
  setLastName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  showPassword: boolean;
  setShowPassword: (val: boolean) => void;
  authError: string;
  setAuthError: (val: string) => void;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export function AwardWinningAuthModal({
  isOpen,
  onClose,
  isLoginMode,
  setIsLoginMode,
  isAdminAuthMode,
  setIsAdminAuthMode,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  authError,
  setAuthError,
  loading,
  onSubmit,
}: AwardWinningAuthModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#08090C]/85 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          className="relative z-10 w-full max-w-5xl rounded-2xl border border-white/10 bg-[#0E1015] shadow-[0_24px_70px_rgba(0,0,0,0.95)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 backdrop-blur-2xl my-auto"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-30 size-9 rounded-lg bg-[#14171E] border border-white/15 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Close modal"
          >
            <X className="size-4" />
          </button>

          {/* =====================================================================
             LEFT COLUMN: High-Fidelity Visual & Telemetry
             ===================================================================== */}
          <div className="lg:col-span-7 relative min-h-[460px] sm:min-h-[520px] lg:min-h-[620px] flex flex-col justify-between p-6 sm:p-10 overflow-hidden rounded-xl m-2 bg-[#08090C] border border-white/10">
            <img
              src="/src/assets/images/hero_cinematic_career_constellation_1794476570452.jpg"
              alt="Placement constellation"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/70 to-transparent pointer-events-none" />

            {/* Top Brand Bar */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-lg bg-[#CCFF00] flex items-center justify-center text-[#08090C] font-bold">
                  <Compass className="size-4 text-[#08090C]" />
                </div>
                <div>
                  <span className="text-sm font-bold tracking-tight text-white block font-display">
                    SKILLBRIDGE AI
                  </span>
                  <span className="text-[10px] text-[#CCFF00] font-mono tracking-widest uppercase block">
                    Placement Architecture
                  </span>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-md bg-[#14171E] border border-white/10 text-[11px] font-mono text-neutral-300">
                <span className="size-2 rounded-full bg-[#CCFF00]" />
                <span>Tier-1 Engine Active</span>
              </div>
            </div>

            {/* Live Bento Metric Badges */}
            <div className="relative z-10 my-auto py-6 space-y-3 pointer-events-none max-w-sm">
              <div className="p-3.5 rounded-xl bg-[#14171E]/90 border border-white/10 shadow-xl backdrop-blur-md flex items-center gap-3">
                <div className="size-8 rounded-lg bg-[#CCFF00]/15 text-[#CCFF00] font-bold flex items-center justify-center shrink-0 border border-[#CCFF00]/30">
                  <Target className="size-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">94% Role Readiness Match</div>
                  <div className="text-[11px] text-neutral-400 font-mono">Calibrated to Fortune 500 Rubrics</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#14171E]/90 border border-white/10 shadow-xl backdrop-blur-md flex items-center gap-3 transform sm:translate-x-3">
                <div className="size-8 rounded-lg bg-[#00F0FF]/15 text-[#00F0FF] flex items-center justify-center shrink-0 border border-[#00F0FF]/30">
                  <FileCheck2 className="size-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">ATS Resume Health: 88/100</div>
                  <div className="text-[11px] text-neutral-400 font-mono">Automated STAR Bullet Structuring</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#14171E]/90 border border-white/10 shadow-xl backdrop-blur-md flex items-center gap-3">
                <div className="size-8 rounded-lg bg-white/10 text-white flex items-center justify-center shrink-0 border border-white/10">
                  <Video className="size-4 text-[#CCFF00]" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Greenroom AI Mock Studio</div>
                  <div className="text-[11px] text-neutral-400 font-mono">Speech Pacing &amp; Gaze Telemetry</div>
                </div>
              </div>
            </div>

            {/* Bottom 3-Stage Pipeline */}
            <div className="relative z-10 space-y-3 pt-4 border-t border-white/10">
              <div className="text-xs font-mono uppercase tracking-widest text-[#CCFF00]">
                3-Stage Campus Onboarding
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-[#14171E] border border-[#CCFF00]/40 text-white">
                  <span className="text-[#CCFF00] font-bold block mb-1">01</span>
                  <span className="text-[11px] leading-tight block">Register Profile</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-neutral-300">
                  <span className="text-neutral-500 font-bold block mb-1">02</span>
                  <span className="text-[11px] leading-tight block">Audit Resume</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-neutral-300">
                  <span className="text-neutral-500 font-bold block mb-1">03</span>
                  <span className="text-[11px] leading-tight block">Unlock Roadmap</span>
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================================
             RIGHT COLUMN: Clean Obsidian Form
             ===================================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            {/* Mode Switcher Tabs */}
            <div className="flex rounded-xl bg-[#14171E] p-1 border border-white/10 mb-6 gap-1">
              <button
                type="button"
                onClick={() => {
                  setIsLoginMode(false);
                  setIsAdminAuthMode(false);
                  setAuthError('');
                }}
                className={`flex-1 py-2 text-xs font-mono uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  !isLoginMode && !isAdminAuthMode
                    ? 'bg-[#CCFF00] text-[#08090C] font-bold shadow-md shadow-[#CCFF00]/15'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Sign Up
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsLoginMode(true);
                  setIsAdminAuthMode(false);
                  setAuthError('');
                }}
                className={`flex-1 py-2 text-xs font-mono uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  isLoginMode && !isAdminAuthMode
                    ? 'bg-[#CCFF00] text-[#08090C] font-bold shadow-md shadow-[#CCFF00]/15'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsLoginMode(true);
                  setIsAdminAuthMode(true);
                  setAuthError('');
                }}
                className={`flex-1 py-2 text-xs font-mono uppercase tracking-wider rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  isAdminAuthMode
                    ? 'bg-[#00F0FF] text-[#08090C] font-bold shadow-md shadow-[#00F0FF]/15'
                    : 'text-[#00F0FF]/80 hover:text-[#00F0FF]'
                }`}
              >
                <Shield className="size-3" />
                <span>Admin</span>
              </button>
            </div>

            {/* Quick Demo Credentials Bar */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-mono uppercase text-neutral-400">Quick Test:</span>
              <button
                type="button"
                onClick={() => {
                  setIsLoginMode(true);
                  setIsAdminAuthMode(false);
                  setEmail('aarav.sharma@example.edu');
                  setPassword('password123');
                }}
                className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-mono text-[#CCFF00] cursor-pointer"
              >
                Student Demo
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsLoginMode(true);
                  setIsAdminAuthMode(true);
                  setEmail('admin@institution.edu.in');
                  setPassword('admin2026');
                }}
                className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-mono text-[#00F0FF] cursor-pointer"
              >
                Admin Demo
              </button>
            </div>

            {/* Form Header */}
            <div className="space-y-1 mb-6">
              <h2 className="text-2xl font-bold tracking-tight font-display text-white">
                {isAdminAuthMode
                  ? 'T&P Directorate Terminal'
                  : isLoginMode
                  ? 'Welcome Back'
                  : 'Create Student Account'}
              </h2>
              <p className="text-xs text-neutral-400 font-mono">
                {isAdminAuthMode
                  ? 'Authorized access for college placement officers and deans.'
                  : isLoginMode
                  ? 'Enter credentials to resume your personalized placement roadmap.'
                  : 'Input your details to begin your algorithmic career mentoring.'}
              </p>
            </div>

            {authError && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs font-mono flex items-center gap-2">
                <span className="shrink-0 font-bold">!</span>
                <span>{authError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={onSubmit} className="space-y-4">
              {!isLoginMode && !isAdminAuthMode && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rohan"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required={!isLoginMode}
                      className="w-full bg-[#14171E] border border-white/10 rounded-xl h-11 px-3.5 text-xs text-white placeholder:text-neutral-500 focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00] focus:outline-none transition-all font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sharma"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required={!isLoginMode}
                      className="w-full bg-[#14171E] border border-white/10 rounded-xl h-11 px-3.5 text-xs text-white placeholder:text-neutral-500 focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00] focus:outline-none transition-all font-mono"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-mono uppercase text-neutral-300 block mb-1.5">
                  {isAdminAuthMode ? 'Institutional Admin Email' : 'Email Address'}
                </label>
                <input
                  type="email"
                  placeholder={isAdminAuthMode ? 'admin@institution.edu.in' : 'student@college.ac.in'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[#14171E] border border-white/10 rounded-xl h-11 px-3.5 text-xs text-white placeholder:text-neutral-500 focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00] focus:outline-none transition-all font-mono"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-mono uppercase text-neutral-300">
                    {isAdminAuthMode ? 'Directorate Passcode' : 'Password'}
                  </label>
                </div>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={isAdminAuthMode ? 'Enter Passcode (e.g. admin2026)' : '••••••••••••'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-[#14171E] border border-white/10 rounded-xl h-11 px-3.5 pr-10 text-xs text-white placeholder:text-neutral-500 focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00] focus:outline-none transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-[#CCFF00] hover:bg-[#b8e600] text-[#08090C] font-bold text-xs font-mono uppercase tracking-wider rounded-xl shadow-lg shadow-[#CCFF00]/15 transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 mt-3 disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="size-4 border-2 border-[#08090C] border-t-transparent rounded-full animate-spin" />
                    <span>Verifying Credentials...</span>
                  </div>
                ) : isAdminAuthMode ? (
                  <>
                    <span>Enter T&amp;P Console</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                ) : isLoginMode ? (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    <span>Create Account &amp; Unlock Roadmap</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Bottom Switcher */}
            <div className="mt-6 pt-5 border-t border-white/10 text-center text-xs font-mono text-neutral-400">
              {isAdminAuthMode ? (
                <div>
                  Are you a student?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsAdminAuthMode(false);
                      setIsLoginMode(false);
                      setAuthError('');
                    }}
                    className="text-[#CCFF00] font-bold hover:underline cursor-pointer ml-1"
                  >
                    Go to Student Registration
                  </button>
                </div>
              ) : isLoginMode ? (
                <>
                  Need a placement account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLoginMode(false);
                      setIsAdminAuthMode(false);
                      setAuthError('');
                    }}
                    className="text-[#CCFF00] font-bold hover:underline cursor-pointer ml-1"
                  >
                    Sign Up Free
                  </button>
                </>
              ) : (
                <>
                  Already registered?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLoginMode(true);
                      setIsAdminAuthMode(false);
                      setAuthError('');
                    }}
                    className="text-[#CCFF00] font-bold hover:underline cursor-pointer ml-1"
                  >
                    Sign In
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
