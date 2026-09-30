import React, { useState } from 'react';
import { api } from '../services/api.ts';
import { User } from '../types.ts';
import {
  Compass,
  Lock,
  Mail,
  User as UserIcon,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface AuthViewProps {
  onAuthSuccess: (user: User) => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onAuthSuccess }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (mode === 'signup') {
      if (!name.trim()) {
        setErrorMsg('Please enter your full name.');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        setErrorMsg('Please enter a valid email address.');
        return;
      }
      if (password.length < 6) {
        setErrorMsg('Password should be at least 6 characters.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match. Please check and try again.');
        return;
      }

      setLoading(true);
      try {
        const res = await api.register({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password
        });
        onAuthSuccess(res.user);
      } catch (err: any) {
        setErrorMsg(err.message || 'Registration failed. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      if (!email.trim()) {
        setErrorMsg('Please enter your email.');
        return;
      }
      if (!password) {
        setErrorMsg('Please enter your password.');
        return;
      }

      setLoading(true);
      try {
        const res = await api.login(email.trim().toLowerCase(), password);
        onAuthSuccess(res.user);
      } catch (err: any) {
        setErrorMsg(err.message || 'Login failed. Please check your credentials.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDemoLogin = async (demoEmail: string, demoName: string) => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await api.login(demoEmail, 'password123').catch(async () => {
        // Fallback register if demo user not yet in memory
        return await api.register({
          name: demoName,
          email: demoEmail,
          password: 'password123'
        });
      });
      onAuthSuccess(res.user);
    } catch (err: any) {
      setErrorMsg(err.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-slate-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Brand Header */}
        <div className="flex justify-center items-center gap-2.5 mb-3">
          <div className="h-10 w-10 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-600/30">
            <Compass className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            AI Skill Mentor
          </span>
        </div>

        <h2 className="text-center text-2xl sm:text-3xl font-bold tracking-tight text-white">
          {mode === 'signup' ? 'Create Student Account' : 'Welcome Back'}
        </h2>
        <p className="mt-1.5 text-center text-xs sm:text-sm text-slate-400">
          Discover your future career path and bridge your skill gaps with AI
        </p>

        {/* Tab Switcher */}
        <div className="mt-6 flex rounded-lg bg-slate-900 p-1 border border-slate-800">
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setErrorMsg('');
            }}
            className={`w-1/2 py-2 text-xs font-semibold rounded-md transition-all ${
              mode === 'signup'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign Up (New Student)
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signin');
              setErrorMsg('');
            }}
            className={`w-1/2 py-2 text-xs font-semibold rounded-md transition-all ${
              mode === 'signin'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In (Existing User)
          </button>
        </div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 shadow-2xl backdrop-blur-sm space-y-6">
          {errorMsg && (
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-rose-950/50 border border-rose-800/80 text-rose-300 text-xs animate-shake">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <UserIcon className="h-4 w-4 text-slate-500" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rohan Sharma"
                    className="block w-full rounded-lg bg-slate-950 border border-slate-800 py-2.5 pl-10 pr-3 text-xs text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-4 w-4 text-slate-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. student@college.ac.in"
                  className="block w-full rounded-lg bg-slate-950 border border-slate-800 py-2.5 pl-10 pr-3 text-xs text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-4 w-4 text-slate-500" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full rounded-lg bg-slate-950 border border-slate-800 py-2.5 pl-10 pr-10 text-xs text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-4 w-4 text-slate-500" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full rounded-lg bg-slate-950 border border-slate-800 py-2.5 pl-10 pr-3 text-xs text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 disabled:opacity-50 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <span>Processing...</span>
              ) : mode === 'signup' ? (
                <>
                  <span>Create Account & Setup Profile</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              ) : (
                <>
                  <span>Sign In & Continue</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Student Accounts */}
          <div className="pt-4 border-t border-slate-800/80">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-center mb-3">
              Or Try Instant Demo Student Profile
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleDemoLogin('rohan.sharma22@aktu.ac.in', 'Rohan Sharma')}
                className="p-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="font-medium text-white">Rohan Sharma</div>
                  <div className="text-[10px] text-slate-400">B.Tech Mech · 2026 Batch</div>
                </div>
                <span className="text-[10px] text-orange-400 font-mono">Demo →</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('ananya.iyer@du.ac.in', 'Ananya Iyer')}
                className="p-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="font-medium text-white">Ananya Iyer</div>
                  <div className="text-[10px] text-slate-400">B.Sc Biotech · DU</div>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono">Demo →</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
