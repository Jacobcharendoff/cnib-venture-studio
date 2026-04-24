'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Nav from '@/components/Nav';
import { createClient } from '@/lib/supabase';

// Internal password for Supabase auth requirement.
// This is a free, open course — no sensitive data to protect.
const INTERNAL_PW = 'tvc-open-course-2024';

export default function AuthPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Try signing up first (new user)
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password: INTERNAL_PW,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            full_name: `${firstName} ${lastName}`,
            phone: phone,
          },
        },
      });

      // If signup worked and we got a session, go to dashboard
      if (!signUpError && signUpData?.session) {
        router.push('/dashboard');
        return;
      }

      // If user already exists, sign them in
      if (signUpError?.message?.toLowerCase().includes('already registered') ||
          signUpError?.message?.toLowerCase().includes('already been registered')) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password: INTERNAL_PW,
        });

        if (signInError) {
          // If password doesn't match (user signed up with old flow), try updating
          setError('Looks like you already have an account from before. Try signing in with Google below, or contact us for help.');
          setLoading(false);
          return;
        }

        router.push('/dashboard');
        return;
      }

      // If signup returned no error but also no session, something's off
      if (signUpError) {
        setError(signUpError.message);
      } else {
        // Edge case: signup succeeded but no session (shouldn't happen with email confirm disabled)
        // Try signing in
        const { error: fallbackError } = await supabase.auth.signInWithPassword({
          email,
          password: INTERNAL_PW,
        });
        if (fallbackError) {
          setError('Account created but could not sign in automatically. Please try again.');
        } else {
          router.push('/dashboard');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (oauthError) setError(oauthError.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google sign-in failed');
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
              <h1 className="text-2xl sm:text-3xl font-black mb-2 text-white text-balance">
                Start building.
              </h1>
              <p className="text-sm text-gray-500 mb-8">
                Takes 30 seconds. No passwords, no hoops.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex gap-3">
                  <div className="flex flex-col flex-1">
                    <label htmlFor="firstName" className="text-sm font-semibold text-white mb-2">First name</label>
                    <input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First name"
                      required
                      autoFocus
                      className="w-full h-[52px] px-4 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <label htmlFor="lastName" className="text-sm font-semibold text-white mb-2">Last name</label>
                    <input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last name"
                      required
                      className="w-full h-[52px] px-4 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="email" className="text-sm font-semibold text-white mb-2">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full h-[52px] px-4 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="phone" className="text-sm font-semibold text-white mb-2">Phone number</label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 123-4567"
                    required
                    className="w-full h-[52px] px-4 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-red-900 bg-opacity-30 border border-red-700 text-red-200 text-sm" role="alert">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-[52px] bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 active:scale-95"
                  aria-busy={loading}
                >
                  {loading ? 'One sec...' : 'Get started'}
                </button>
              </form>

              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-gray-700"></div>
                <span className="text-xs text-gray-500 uppercase tracking-wider">or</span>
                <div className="flex-1 h-px bg-gray-700"></div>
              </div>

              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full h-[52px] bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 active:scale-95 flex items-center justify-center gap-3"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>

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
