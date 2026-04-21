'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Nav from '@/components/Nav';
import { MODULES } from '@/lib/course-data';
import { MODULE_COLORS, MODULE_GRADIENTS } from '@/lib/types';

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const moduleSlug = params.slug as string;
  const lessonSlug = params.lesson as string;

  const [isCompleted, setIsCompleted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Find the current module and lesson
  const currentModule = MODULES.find((m) => m.slug === moduleSlug);
  const lesson = currentModule?.lessons.find((l) => l.slug === lessonSlug);

  if (!currentModule || !lesson) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-black text-white mb-4">Lesson Not Found</h1>
          <p className="text-gray-400 mb-6">The lesson you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/dashboard"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Find previous and next lessons
  const allLessons = MODULES.flatMap((m) =>
    m.lessons.map((l) => ({ ...l, moduleSlug: m.slug }))
  );
  const currentIndex = allLessons.findIndex(
    (l) => l.slug === lessonSlug && l.moduleSlug === moduleSlug
  );
  const previousLesson =
    currentIndex > 0
      ? allLessons[currentIndex - 1]
      : null;
  const nextLesson =
    currentIndex < allLessons.length - 1
      ? allLessons[currentIndex + 1]
      : null;

  const moduleColor = MODULE_COLORS[currentModule.slug];
  const moduleGradient = MODULE_GRADIENTS[currentModule.slug];

  const handleMarkComplete = () => {
    setIsCompleted(!isCompleted);
  };

  const handleNavigate = (slug: string, lessonSlug: string) => {
    router.push(`/course/${slug}/${lessonSlug}`);
  };

  return (
    <>
      <Nav />
      <main id="main-content" className="min-h-screen bg-black pt-20">
        <div className="flex h-full">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="fixed bottom-6 right-6 z-40 lg:hidden w-14 h-14 bg-discover text-white rounded-full flex items-center justify-center hover:bg-opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
            aria-label="Toggle sidebar"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Sidebar - Module List */}
          <aside
            className={`fixed lg:relative left-0 top-0 w-64 h-screen bg-[#0A0A0A] border-r border-gray-900 z-30 overflow-y-auto transition-transform duration-300 ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            } lg:translate-x-0`}
          >
            <div className="p-6 pt-24 lg:pt-6">
              <h2 className="text-xs uppercase font-bold text-gray-500 tracking-widest mb-6">
                Course Modules
              </h2>

              <div className="space-y-6">
                {MODULES.map((m) => {
                  const isCurrentModule = m.slug === moduleSlug;
                  const mColor = MODULE_COLORS[m.slug];

                  return (
                    <div key={m.slug}>
                      <h3
                        className={`text-xs font-bold uppercase tracking-widest mb-3 ${
                          isCurrentModule ? mColor.className : 'text-gray-600'
                        }`}
                      >
                        {m.title}
                      </h3>

                      <div className="space-y-2">
                        {m.lessons.map((l) => {
                          const isCurrentLesson =
                            l.slug === lessonSlug && isCurrentModule;

                          return (
                            <button
                              key={l.slug}
                              onClick={() => {
                                handleNavigate(m.slug, l.slug);
                                setSidebarOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${
                                isCurrentLesson
                                  ? `${mColor.className} font-semibold bg-gray-900 bg-opacity-50`
                                  : 'text-gray-400 hover:text-gray-200'
                              }`}
                              aria-current={isCurrentLesson ? 'page' : undefined}
                            >
                              <span className="block truncate">{l.title}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Close sidebar overlay on mobile */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
            />
          )}

          {/* Main Content */}
          <div className="flex-1 w-full">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
              {/* Breadcrumb */}
              <nav
                className="flex items-center gap-2 text-sm text-gray-500 mb-6"
                aria-label="Breadcrumb"
              >
                <Link
                  href="/dashboard"
                  className="hover:text-gray-300 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded px-1 py-0.5"
                >
                  Dashboard
                </Link>
                <span aria-hidden="true">/</span>
                <span className={moduleColor.className}>{currentModule.title}</span>
                <span aria-hidden="true">/</span>
                <span className="text-gray-400">{lesson.title}</span>
              </nav>

              {/* Lesson Header */}
              <div className="mb-8">
                {/* Lesson Number Badge */}
                <div
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 bg-gradient-to-r ${moduleGradient} text-black`}
                >
                  Lesson {lesson.globalNumber}
                </div>

                {/* Lesson Title */}
                <h1 className="text-4xl sm:text-5xl font-black text-white text-balance leading-tight mb-4">
                  {lesson.title}
                </h1>

                {/* Estimated Time */}
                <p className="text-gray-400 text-base sm:text-lg">
                  Estimated time: <span className="font-semibold">{lesson.estimatedMinutes} minutes</span>
                </p>
              </div>

              {/* Content Area */}
              <div className="prose-lesson mb-12">
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Welcome to <em>{lesson.title}</em>. This is where the rich course content will be rendered. Our carefully crafted lessons combine practical frameworks, real-world examples, and actionable insights to help you transform your idea into your first dollar.
                </p>

                <h2>What You&apos;ll Learn</h2>

                <p className="text-gray-300 text-lg leading-relaxed">
                  In this lesson, we explore the core principles and strategies that will guide you through your entrepreneurial journey. By the end of this module, you&apos;ll have a clear understanding of the key concepts and the tools you need to move forward with confidence.
                </p>

                <p className="text-gray-300 text-lg leading-relaxed">
                  Take your time to absorb the material. Think critically about how these concepts apply to your own situation. Refer back to the worksheets and case studies as needed. Remember, entrepreneurship is a practice—the more you engage with these ideas, the more valuable they become.
                </p>
              </div>

              {/* Bottom Bar - Actions */}
              <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between sticky bottom-0 bg-black bg-opacity-95 sm:bg-transparent sm:relative -mx-4 sm:mx-0 px-4 sm:px-0 -mb-8 sm:mb-0 pb-4 sm:pb-0">
                {/* Previous Button */}
                <div>
                  {previousLesson ? (
                    <button
                      onClick={() =>
                        handleNavigate(previousLesson.moduleSlug, previousLesson.slug)
                      }
                      className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded"
                      aria-label="Previous lesson"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      <span className="hidden sm:inline">Previous</span>
                    </button>
                  ) : (
                    <div />
                  )}
                </div>

                {/* Complete Button */}
                <button
                  onClick={handleMarkComplete}
                  className={`px-6 py-3 sm:py-2 rounded-lg font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 ${
                    isCompleted
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-launch text-black hover:bg-opacity-90'
                  }`}
                  aria-pressed={isCompleted}
                >
                  {isCompleted ? 'Completed' : 'Mark as Complete'}
                </button>

                {/* Next Button */}
                <div>
                  {nextLesson ? (
                    <button
                      onClick={() =>
                        handleNavigate(nextLesson.moduleSlug, nextLesson.slug)
                      }
                      className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded"
                      aria-label="Next lesson"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  ) : (
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded"
                      aria-label="Back to dashboard"
                    >
                      <span className="hidden sm:inline">Dashboard</span>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}