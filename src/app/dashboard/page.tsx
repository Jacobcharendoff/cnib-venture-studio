'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Nav from '@/components/Nav';
import { MODULES, COURSE } from '@/lib/course-data';
import { MODULE_COLORS, MODULE_GRADIENTS } from '@/lib/types';
import { createClient } from '@/lib/supabase';
import { useTheme } from '@/lib/use-theme';

interface ModuleProgressState {
  status: 'locked' | 'available' | 'in_progress' | 'completed';
  lessonsCompleted: number;
  currentLessonIndex?: number;
}

const DEFAULT_PROGRESS: Record<string, ModuleProgressState> = {
  discover: { status: 'available', lessonsCompleted: 0, currentLessonIndex: 0 },
  design: { status: 'locked', lessonsCompleted: 0 },
  money: { status: 'locked', lessonsCompleted: 0 },
  brand: { status: 'locked', lessonsCompleted: 0 },
  sell: { status: 'locked', lessonsCompleted: 0 },
  launch: { status: 'locked', lessonsCompleted: 0 },
};

function ThemeToggle({ isDark, toggle }: { isDark: boolean; toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      className={`p-2 rounded-lg transition-colors ${
        isDark
          ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
          : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
      }`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
}

export default function DashboardPage() {
  const [expandedModule, setExpandedModule] = useState<string | null>('discover');
  const [user, setUser] = useState<any>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();
  const { isDark, toggle } = useTheme('light');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = createClient();
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        if (!currentUser) {
          router.push('/auth');
          return;
        }
        setUser(currentUser);
      } catch {
        router.push('/auth');
      } finally {
        setAuthChecked(true);
      }
    };
    checkAuth();
  }, [router]);

  const PROGRESS = DEFAULT_PROGRESS;
  const COMPLETED_LESSONS = new Set<number>();

  const totalLessons = MODULES.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedCount = COMPLETED_LESSONS.size;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  const toggleModule = (slug: string) => {
    setExpandedModule(expandedModule === slug ? null : slug);
  };

  const getModuleStatusPip = (status: ModuleProgressState['status']) => {
    switch (status) {
      case 'completed':
        return (
          <div className="w-3 h-3 rounded-full bg-launch flex items-center justify-center" aria-label="Module completed">
            <svg className="w-2 h-2 text-black" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
            </svg>
          </div>
        );
      case 'in_progress':
        return <div className={`w-3 h-3 rounded-full bg-discover ring-2 ring-offset-2 ${isDark ? 'ring-offset-black' : 'ring-offset-white'} ring-discover`} aria-label="Module in progress" />;
      case 'available':
        return <div className="w-3 h-3 rounded-full bg-blue-500" aria-label="Module available" />;
      case 'locked':
        return <div className={`w-3 h-3 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`} aria-label="Module locked" />;
    }
  };

  const getLessonDot = (lessonGlobalNumber: number) => {
    const isCompleted = COMPLETED_LESSONS.has(lessonGlobalNumber);
    if (isCompleted) {
      return (
        <div className="w-2.5 h-2.5 rounded-full bg-launch flex items-center justify-center" aria-label="Lesson completed">
          <svg className="w-1.5 h-1.5 text-black" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
          </svg>
        </div>
      );
    }
    return <div className={`w-2.5 h-2.5 rounded-full border-2 ${isDark ? 'border-gray-600' : 'border-gray-300'}`} aria-label="Lesson not started" />;
  };

  const getModuleStatusText = (status: ModuleProgressState['status'], slug: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in_progress': return 'In Progress';
      case 'available': return 'Ready to start';
      case 'locked':
        const prevModule = MODULES.find((m, i) => MODULES[i + 1]?.slug === slug);
        return `Complete ${prevModule?.title || 'previous module'} first`;
    }
  };

  if (!authChecked) {
    return (
      <>
        <Nav />
        <main id="main-content" className={`min-h-screen pt-24 pb-16 px-4 sm:px-6 flex items-center justify-center ${isDark ? 'bg-black' : 'bg-[#F5F5F7]'}`}>
          <div className={`text-lg ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Loading...</div>
        </main>
      </>
    );
  }

  if (!user) return null;

  const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'there';

  return (
    <>
      <Nav />
      <main id="main-content" className={`min-h-screen pt-24 pb-16 px-4 sm:px-6 transition-colors duration-300 ${isDark ? 'bg-black' : 'bg-[#F5F5F7]'}`}>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-10 flex items-start justify-between">
            <div>
              <p className={`text-xs uppercase tracking-widest font-semibold mb-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                Welcome back, {displayName}
              </p>
              <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-black text-balance leading-tight mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {COURSE.title}
              </h1>
              <p className={`text-base sm:text-lg ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                {COURSE.totalModules} modules, {COURSE.totalLessons} lessons, ~{COURSE.estimatedHours} hours of content
              </p>
            </div>
            <ThemeToggle isDark={isDark} toggle={toggle} />
          </div>

          {/* Progress Card */}
          <div className={`rounded-2xl p-6 sm:p-8 mb-10 ${isDark ? 'bg-[#1D1D1F]' : 'bg-white border border-gray-200 shadow-sm'}`}>
            <div className="flex items-end justify-between mb-4">
              <div>
                <h2 className={`text-sm font-semibold mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Your Progress</h2>
                <p className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                  {completedCount} of {totalLessons} lessons completed
                </p>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-discover">
                {progressPercent}%
              </p>
            </div>
            <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-[#2a2a2a]' : 'bg-gray-200'}`}>
              <div
                className="h-full bg-gradient-to-r from-discover via-design to-money rounded-full transition-all duration-500"
                style={{ width: `${Math.max(progressPercent, 2)}%` }}
                role="progressbar"
                aria-valuenow={progressPercent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Course progress: ${progressPercent}%`}
              />
            </div>
          </div>

          {/* Getting Started Tip (show when 0% progress) */}
          {progressPercent === 0 && (
            <div className={`mb-8 p-5 rounded-xl ${isDark ? 'bg-blue-950/30 border border-blue-800/30' : 'bg-blue-50 border border-blue-200'}`}>
              <p className={`text-sm font-semibold mb-1 ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>Ready to begin?</p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Start with the Discover module below. Each lesson takes about 15 minutes. Work at your own pace.
              </p>
            </div>
          )}

          {/* Module List */}
          <div className="space-y-3">
            {MODULES.map((module) => {
              const progress = PROGRESS[module.slug];
              const isExpanded = expandedModule === module.slug;
              const moduleColor = MODULE_COLORS[module.slug];
              const moduleGradient = MODULE_GRADIENTS[module.slug];
              const isLocked = progress.status === 'locked';
              const totalModuleTime = module.lessons.reduce((s, l) => s + l.estimatedMinutes, 0);

              return (
                <div key={module.slug}>
                  <button
                    onClick={() => toggleModule(module.slug)}
                    className={`w-full rounded-xl px-5 sm:px-6 py-4 sm:py-5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 flex items-center justify-between gap-4 ${
                      isDark
                        ? 'bg-[#1D1D1F] hover:bg-[#2a2a2c]'
                        : 'bg-white border border-gray-200 shadow-sm hover:bg-gray-50'
                    }`}
                    aria-expanded={isExpanded}
                    aria-controls={`module-content-${module.slug}`}
                  >
                    <div className="flex items-center gap-4 flex-1 text-left">
                      {getModuleStatusPip(progress.status)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-0.5">
                          <h3 className={`font-bold text-lg sm:text-xl ${moduleColor?.className || 'text-gray-300'}`}>
                            {module.title}
                          </h3>
                        </div>
                        <p className={`text-sm truncate ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{module.subtitle}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>{module.lessons.length} lessons</span>
                          <span className={`text-xs ${isDark ? 'text-gray-700' : 'text-gray-300'}`} aria-hidden="true">|</span>
                          <span className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>{totalModuleTime} min</span>
                          {!isLocked && (
                            <>
                              <span className={`text-xs ${isDark ? 'text-gray-700' : 'text-gray-300'}`} aria-hidden="true">|</span>
                              <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{getModuleStatusText(progress.status, module.slug)}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {isLocked ? (
                      <svg className={`w-5 h-5 flex-shrink-0 ${isDark ? 'text-gray-700' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    ) : (
                      <svg
                        className={`w-5 h-5 transition-transform duration-300 flex-shrink-0 ${isDark ? 'text-gray-500' : 'text-gray-400'} ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>

                  {isExpanded && (
                    <div id={`module-content-${module.slug}`} className="mt-2 space-y-2 pl-0 sm:pl-6">
                      {module.lessons.map((lesson) => (
                        <Link
                          key={lesson.slug}
                          href={!isLocked ? `/course/${module.slug}/${lesson.slug}` : '#'}
                          className={`flex items-center gap-3 p-4 rounded-lg transition-colors ${
                            isLocked
                              ? isDark
                                ? 'bg-gray-900 bg-opacity-40 cursor-not-allowed'
                                : 'bg-gray-100 cursor-not-allowed'
                              : isDark
                                ? 'bg-gray-900 hover:bg-[#2a2a2c] active:bg-gray-800'
                                : 'bg-gray-50 hover:bg-gray-100 active:bg-gray-200'
                          } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500`}
                          onClick={(e) => { if (isLocked) e.preventDefault(); }}
                          aria-disabled={isLocked}
                        >
                          {getLessonDot(lesson.globalNumber)}
                          <div className="flex-1">
                            <p className={`text-sm font-semibold ${
                              isLocked
                                ? isDark ? 'text-gray-600' : 'text-gray-400'
                                : isDark ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              {lesson.title}
                            </p>
                          </div>
                          {!isLocked && (
                            <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{lesson.estimatedMinutes}m</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
