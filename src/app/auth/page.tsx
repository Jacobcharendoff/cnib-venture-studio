'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Nav from '@/components/Nav';
import { createClient } from '@/lib/supabase';

type AuthMode = 'signup' | 'login';

const PROVINCES = [
  'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick',
  'Newfoundland and Labrador', 'Nova Scotia', 'Northwest Territories',
  'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec',
  'Saskatchewan', 'Yukon',
];

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('signup');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [province, setProvince] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabaseConfigured = supabaseUrl && supabaseKey;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!supabaseConfigured) {
      setError('Auth system not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();

      if (mode === 'signup') {
        const { data, error: signupError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
            data: {
              full_name: fullName,
              province: province,
            },
          },
        });

        if (signupError) {
          setError(signupError.message);
          setLoading(false);
          return;
        }

        if (data.session) {
          router.push('/dashboard');
          return;
        }

        const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
        if (!loginError) {
          router.push('/dashboard');
          return;
        }

        setSuccess('Account created! Check your email for a confirmation link, then come back and log in.');
      } else {
        const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
        if (loginError) {
          setError(loginError.message);
        } else {
          router.push('/dashboard');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <main id="main-content" className="min-h-screen bg-black flex flex-col items-center justify-center px-4 pt-20 pb-8">
        <div className="w-full max-w-4xl flex gap-12 items-center">

          {/* Value Proposition - Desktop only */}
          <div className="hidden lg:block flex-1">
            <h2 className="text-3xl font-black text-white mb-4 leading-tight">
              From idea to first paying customer. Free.
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              24 lessons across 6 modules. Real frameworks, real examples, real assignments. Built for blind and low-vision entrepreneurs in Canada.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-discover/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-discover" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Self-paced</p>
                  <p className="text-gray-500 text-sm">15 minutes per lesson. Work on your schedule.</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-launch/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-launch" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Project-based</p>
                  <p className="text-gray-500 text-sm">You build your actual business as you learn.</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Accessible first</p>
                  <p className="text-gray-500 text-sm">Screen reader tested. Keyboard navigable. Your way.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="w-full max-w-md lg:flex-shrink-0">
            <div className="bg-[#1D1D1F] rounded-2xl p-8 sm:p-10">
              {/* Tabs */}
              <div className="flex gap-4 mb-8">
                <button
                  onClick={() => { setMode('signup'); setError(''); setSuccess(''); }}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${
                    mode === 'signup'
                      ? 'bg-white text-black'
                      : 'bg-transparent text-gray-400 hover:text-white border border-gray-600'
                  }`}
                  aria-pressed={mode === 'signup'}
                >
                  Sign Up
                </button>
                <button
                  onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${
                    mode === 'login'
                      ? 'bg-white text-black'
                      : 'bg-transparent text-gray-400 hover:text-white border border-gray-600'
                  }`}
                  aria-pressed={mode === 'login'}
                >
                  Log In
                </button>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black mb-2 text-white text-balance">
                {mode === 'signup' ? 'Start building.' : 'Welcome back.'}
              </h1>
              <p className="text-sm text-gray-500 mb-6">
                {mode === 'signup'
                  ? 'Create your free account. No credit card, no catch.'
                  : 'Pick up right where you left off.'}
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {mode === 'signup' && (
                  <div className="flex flex-col">
                    <label htmlFor="fullName" className="text-sm font-semibold text-white mb-2">Full name</label>
                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your full name"
                      required
                      className="w-full h-[52px] px-4 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                  </div>
                )}

                <div className="flex flex-col">
                  <label htmlFor="email" className="text-sm font-semibold text-white mb-2">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    minLength={5}
                    className="w-full h-[52px] px-4 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    aria-describedby={error ? 'error-message' : undefined}
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="password" className="text-sm font-semibold text-white mb-2">Password</label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="8 characters minimum"
                    required
                    minLength={8}
                    className="w-full h-[52px] px-4 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    aria-describedby={error ? 'error-message' : undefined}
                  />
                </div>

                {mode === 'signup' && (
                  <div className="flex flex-col">
                    <label htmlFor="province" className="text-sm font-semibold text-white mb-2">Province / Territory</label>
                    <select
                      id="province"
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      required
                      className="w-full h-[52px] px-4 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors appearance-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='%239CA3AF'%3E%3Cpath d='M1 1l5 5 5-5'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 16px center',
                      }}
                    >
                      <option value="" disabled className="text-gray-500">Select your province</option>
                      {PROVINCES.map((prov) => (
                        <option key={prov} value={prov}>{prov}</option>
                      ))}
                    </select>
                  </div>
                )}

                {error && (
                  <div id="error-message" className="p-3 rounded-lg bg-red-900 bg-opacity-30 border border-red-700 text-red-200 text-sm" role="alert">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="p-3 rounded-lg bg-green-900 bg-opacity-30 border border-green-700 text-green-200 text-sm" role="status">
                    {success}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !supabaseConfigured}
                  className="w-full h-[52px] bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 active:scale-95"
                  aria-busy={loading}
                >
                  {loading ? 'One sec...' : mode === 'signup' ? 'Create my account' : 'Log in'}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-700 text-center">
                <p className="text-xs text-gray-500">
                  A <span className="font-semibold text-gray-400">CNIB</span> initiative. Always free.
                </p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/"
                className="text-sm text-gray-400 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded px-2 py-1"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
