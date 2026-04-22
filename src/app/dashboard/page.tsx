'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Nav from '@/components/Nav';
import { MODULES, COURSE } from '@/lib/course-data';
import { MODULE_COLORS, MODULE_GRADIENTS } from '@/lib/types';
import { createClient } from '@/lib/supabase';

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

export default function DashboardPage() {
  const [expandedModule, setExpandedModule] = useState<string | null>('discover');
  const [user, setUser] = useState<any>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

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
        return <div className="w-3 h-3 rounded-full bg-discover ring-2 ring-offset-2 ring-offset-black ring-discover" aria-label="Module in progress" />;
      case 'available':
        return <div className="w-3 h-3 rounded-full bg-blue-500" aria-label="Module available" />;
      case 'locked':
        return <div className="w-3 h-3 rounded-full bg-gray-700" aria-label="Module locked" />;
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
    return <div className="w-2.5 h-2.5 rounded-full border-2 border-gray-600" aria-label="Lesson not started" />;
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
        <main id="main-content" className="min-h-screen bg-black pt-24 pb-16 px-4 sm:px-6 flex items-center justify-center">
          <div className="text-gray-500 text-lg">Loading...</div>
        </main>
      </>
    );
  }

  if (!user) return null;

  const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'there';

  return (
    <>
      <Nav />
      <main id="main-content" className="min-h-screen bg-black pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">
              Welcome back, {displayName}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white text-balance leading-tight mb-3">
              {COURSE.title}
            </h1>
            <p className="text-gray-500 text-base sm:text-lg">
              {COURSE.totalModules} modules, {COURSE.totalLessons} lessons, ~{COURSE.estimatedHours} hours of content
            </p>
          </div>

          {/* Progress Card */}
          <div className="bg-[#1D1D1F] rounded-2xl p-6 sm:p-8 mb-10">
            <div className="flex items-end justify-between mb-4">
              <div>
                <h2 className="text-sm font-semibold text-gray-400 mb-1">Your Progress</h2>
                <p className="text-xs text-gray-600">
                  {completedCount} of {totalLessons} lessons completed
                </p>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-discover">
                {progressPercent}%
              </p>
            </div>
            <div className="h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
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
            <div className="mb-8 p-5 rounded-xl bg-blue-950/30 border border-blue-800/30">
              <p className="text-blue-300 text-sm font-semibold mb-1">Ready to begin?</p>
              <p className="text-gray-400 text-sm">
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
                    className="w-full bg-[#1D1D1F] rounded-xl px-5 sm:px-6 py-4 sm:py-5 hover:bg-[#2a2a2c] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 flex items-center justify-between gap-4"
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
                        <p className="text-sm text-gray-500 truncate">{module.subtitle}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-gray-600">{module.lessons.length} lessons</span>
                          <span className="text-xs text-gray-700" aria-hidden="true">|</span>
                          <span className="text-xs text-gray-600">{totalModuleTime} min</span>
                          {!isLocked && (
                            <>
                              <span className="text-xs text-gray-700" aria-hidden="true">|</span>
                              <span className="text-xs text-gray-500">{getModuleStatusText(progress.status, module.slug)}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {isLocked ? (
                      <svg className="w-5 h-5 text-gray-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    ) : (
                      <svg
                        className={`w-5 h-5 text-gray-500 transition-transform duration-300 flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
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
                              ? 'bg-gray-900 bg-opacity-40 cursor-not-allowed'
                              : 'bg-gray-900 hover:bg-[#2a2a2c] active:bg-gray-800'
                          } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500`}
                          onClick={(e) => { if (isLocked) e.preventDefault(); }}
                          aria-disabled={isLocked}
                        >
                          {getLessonDot(lesson.globalNumber)}
                          <div className="flex-1">
                            <p className={`text-sm font-semibold ${isLocked ? 'text-gray-600' : 'text-gray-300'}`}>
                              {lesson.title}
                            </p>
                          </div>
                          {!isLocked && (
                            <span className="text-xs text-gray-500">{lesson.estimatedMinutes}m</span>
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
