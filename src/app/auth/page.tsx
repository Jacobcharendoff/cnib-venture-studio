'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Nav from '@/components/Nav';
import { createClient } from '@/lib/supabase';

type AuthMode = 'signup' | 'login';

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabaseConfigured = supabaseUrl && supabaseKey;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!supabaseConfigured) {
      setError('Auth system not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();

      if (mode === 'signup') {
        const { error: signupError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });

        if (signupError) {
          setError(signupError.message);
        } else {
          setError('');
          router.push('/dashboard');
        }
      } else {
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (loginError) {
          setError(loginError.message);
        } else {
          setError('');
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
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-[#1D1D1F] rounded-2xl p-8 sm:p-10">
            {/* Tabs */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => {
                  setMode('signup');
                  setError('');
                }}
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
                onClick={() => {
                  setMode('login');
                  setError('');
                }}
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

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-black mb-2 text-white text-balance">
              {mode === 'signup' ? 'Start building.' : 'Welcome back.'}
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              {mode === 'signup'
                ? 'Create your free account. No credit card, no catch.'
                : 'Pick up right where you left off.'}
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-white mb-2"
                >
                  Email
                </label>
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

              {/* Password Field */}
              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-white mb-2"
                >
                  Password
                </label>
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

              {/* Error Message */}
              {error && (
                <div
                  id="error-message"
                  className="p-3 rounded-lg bg-red-900 bg-opacity-30 border border-red-700 text-red-200 text-sm"
                  role="alert"
                >
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !supabaseConfigured}
                className="w-full h-[52px] bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 active:scale-95"
                aria-busy={loading}
              >
                {loading ? 'One sec...' : mode === 'signup' ? 'Create my account' : 'Log in'}
              </button>
            </form>

            {/* Footer note */}
            <div className="mt-6 pt-6 border-t border-gray-700 text-center">
              <p className="text-xs text-gray-500">
                A <span className="font-semibold text-gray-400">CNIB</span> initiative. Always free.
              </p>
            </div>
          </div>

          {/* Back to home link */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-gray-400 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded px-2 py-1"
            >
              Back to home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}