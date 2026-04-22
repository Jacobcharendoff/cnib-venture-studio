'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Nav from '@/components/Nav';
import { MODULES } from '@/lib/course-data';
import { MODULE_COLORS, MODULE_GRADIENTS } from '@/lib/types';
import { getLessonContent, isWorkshopLesson, getWorkshopData } from '@/lib/lesson-content';
import type { Module as RichModule, RealWorldExample } from '@/data/modules';

function ExampleCard({ example, index }: { example: RealWorldExample; index: number }) {
  const colors = {
    bad: { bg: 'bg-red-950/40', border: 'border-red-800/40', label: 'bg-red-600', labelText: 'Common Mistake' },
    good: { bg: 'bg-yellow-950/30', border: 'border-yellow-700/30', label: 'bg-yellow-600', labelText: 'Getting Warmer' },
    great: { bg: 'bg-green-950/30', border: 'border-green-700/30', label: 'bg-green-600', labelText: 'This Is It' },
  };
  const style = colors[example.label];

  return (
    <div className={`rounded-xl p-5 sm:p-6 border ${style.bg} ${style.border}`}>
      <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-white mb-3 ${style.label}`}>
        {style.labelText}
      </span>
      <p className="text-white font-semibold text-base mb-2">{example.title.replace(/\\"/g, '"')}</p>
      <p className="text-gray-400 text-sm leading-relaxed">{example.description}</p>
    </div>
  );
}

function RichContent({ content, moduleColor }: { content: RichModule; moduleColor: string }) {
  return (
    <div className="space-y-10">
      {/* Subtitle */}
      <p className="text-xl sm:text-2xl text-gray-300 font-medium leading-relaxed italic">
        {content.subtitle}
      </p>

      {/* What You Will Learn */}
      <div className="bg-[#1a1a1c] rounded-xl p-6 border border-gray-800">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3">What You&apos;ll Walk Away With</h2>
        <p className="text-gray-200 text-lg leading-relaxed">{content.outcome}</p>
      </div>

      {/* Main Description */}
      <div className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
        {content.description}
      </div>

      {/* Frameworks */}
      {content.frameworks && content.frameworks.length > 0 && (
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Frameworks &amp; Models</h2>
          <div className="space-y-3">
            {content.frameworks.map((fw, i) => (
              <div key={i} className="flex items-start gap-3 bg-[#1a1a1c] rounded-lg p-4 border border-gray-800/50">
                <span className={`flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br ${moduleColor} flex items-center justify-center text-xs font-bold text-black`}>
                  {i + 1}
                </span>
                <p className="text-gray-300 text-base">{fw}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Case Study */}
      {content.caseStudy && (
        <div className="relative rounded-xl p-6 sm:p-8 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-blue-900/30">
          <h2 className="text-sm font-bold uppercase tracking-widest text-blue-400 mb-2">Case Study</h2>
          <p className="text-white text-xl font-bold mb-3">{content.caseStudy.company}</p>
          <p className="text-gray-300 text-base leading-relaxed">{content.caseStudy.insight}</p>
        </div>
      )}

      {/* Real World Examples */}
      {content.realWorldExamples && content.realWorldExamples.length > 0 && (
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Real World Examples</h2>
          <div className="space-y-4">
            {content.realWorldExamples.map((ex, i) => (
              <ExampleCard key={i} example={ex} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Key Takeaway */}
      {content.keyTakeaway && (
        <div className={`rounded-xl p-6 sm:p-8 bg-gradient-to-r ${moduleColor} relative overflow-hidden`}>
          <div className="relative z-10">
            <h2 className="text-sm font-bold uppercase tracking-widest text-black/60 mb-3">Key Takeaway</h2>
            <p className="text-black text-lg sm:text-xl font-bold leading-relaxed">{content.keyTakeaway}</p>
          </div>
        </div>
      )}

      {/* Assignment */}
      {content.assignment && (
        <div className="bg-[#1a1a1c] rounded-xl p-6 sm:p-8 border border-gray-800">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">Your Assignment</h2>
          <p className="text-gray-200 text-base leading-relaxed">{content.assignment}</p>
          {content.interactiveElement && (
            <div className="mt-4 p-4 rounded-lg bg-gray-900/50 border border-gray-700/50">
              <p className="text-sm font-semibold text-gray-400">
                <span className="mr-2" aria-hidden="true">&#9881;</span>
                Interactive: {content.interactiveElement.title}
              </p>
              <p className="text-sm text-gray-500 mt-1">{content.interactiveElement.description}</p>
            </div>
          )}
        </div>
      )}

      {/* Stats */}
      {content.stats && content.stats.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {content.stats.map((stat, i) => (
            <div key={i} className="text-center p-4 bg-[#1a1a1c] rounded-xl border border-gray-800/50">
              <p className={`text-2xl sm:text-3xl font-black bg-gradient-to-r ${moduleColor} bg-clip-text text-transparent`}>
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function WorkshopContent({ globalNumber, moduleGradient }: { globalNumber: number; moduleGradient: string }) {
  const data = getWorkshopData(globalNumber);
  if (!data) return null;

  return (
    <div className="space-y-10">
      <p className="text-xl sm:text-2xl text-gray-300 font-medium leading-relaxed italic">
        Put everything together. This is where the learning becomes yours.
      </p>

      <div className={`rounded-xl p-6 sm:p-8 bg-gradient-to-r ${moduleGradient} relative overflow-hidden`}>
        <div className="relative z-10">
          <h2 className="text-sm font-bold uppercase tracking-widest text-black/60 mb-3">{data.phase} Phase Workshop</h2>
          <p className="text-black text-lg font-bold leading-relaxed">
            This workshop brings together everything you learned in the {data.phase} phase. Review your work, refine your thinking, and prepare to move forward.
          </p>
        </div>
      </div>

      {/* Review section for each module in this phase */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Review &amp; Refine</h2>
        <div className="space-y-4">
          {data.modules.map((mod, i) => (
            <div key={mod.id} className="bg-[#1a1a1c] rounded-xl p-6 border border-gray-800">
              <p className="text-white font-bold text-lg mb-2">{mod.title}</p>
              <p className="text-gray-400 text-sm mb-3">{mod.keyTakeaway}</p>
              {mod.assignment && (
                <div className="p-3 rounded-lg bg-gray-900/50 border border-gray-700/50">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Assignment to Complete</p>
                  <p className="text-gray-300 text-sm">{mod.assignment}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#1a1a1c] rounded-xl p-6 sm:p-8 border border-gray-800">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3">Workshop Checklist</h2>
        <div className="space-y-3">
          {data.modules.map((mod) => (
            <label key={mod.id} className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                className="mt-1 w-4 h-4 rounded border-gray-600 bg-gray-900 text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
              />
              <span className="text-gray-300 text-sm group-hover:text-white transition-colors">
                Completed: {mod.title} assignment
              </span>
            </label>
          ))}
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              className="mt-1 w-4 h-4 rounded border-gray-600 bg-gray-900 text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
            />
            <span className="text-gray-300 text-sm group-hover:text-white transition-colors">
              Reviewed and refined all deliverables from this phase
            </span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              className="mt-1 w-4 h-4 rounded border-gray-600 bg-gray-900 text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
            />
            <span className="text-gray-300 text-sm group-hover:text-white transition-colors">
              Ready to move to the next phase
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const moduleSlug = params.slug as string;
  const lessonSlug = params.lesson as string;

  const [isCompleted, setIsCompleted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const allLessons = MODULES.flatMap((m) =>
    m.lessons.map((l) => ({ ...l, moduleSlug: m.slug }))
  );
  const currentIndex = allLessons.findIndex(
    (l) => l.slug === lessonSlug && l.moduleSlug === moduleSlug
  );
  const previousLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const moduleColor = MODULE_COLORS[currentModule.slug];
  const moduleGradient = MODULE_GRADIENTS[currentModule.slug];

  // Get rich content
  const richContent = getLessonContent(lesson.globalNumber);
  const isWorkshop = isWorkshopLesson(lesson.globalNumber);

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
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Sidebar */}
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
                      <h3 className={`text-xs font-bold uppercase tracking-widest mb-3 ${isCurrentModule ? mColor.className : 'text-gray-600'}`}>
                        {m.title}
                      </h3>
                      <div className="space-y-2">
                        {m.lessons.map((l) => {
                          const isCurrentLesson = l.slug === lessonSlug && isCurrentModule;
                          return (
                            <button
                              key={l.slug}
                              onClick={() => { handleNavigate(m.slug, l.slug); setSidebarOpen(false); }}
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

          {/* Close sidebar overlay */}
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
              <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
                <Link href="/dashboard" className="hover:text-gray-300 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded px-1 py-0.5">
                  Dashboard
                </Link>
                <span aria-hidden="true">/</span>
                <span className={moduleColor.className}>{currentModule.title}</span>
                <span aria-hidden="true">/</span>
                <span className="text-gray-400">{lesson.title}</span>
              </nav>

              {/* Lesson Header */}
              <div className="mb-10">
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 bg-gradient-to-r ${moduleGradient} text-black`}>
                  {isWorkshop ? 'Workshop' : `Lesson ${lesson.globalNumber}`}
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white text-balance leading-tight mb-3">
                  {richContent ? richContent.title : lesson.title}
                </h1>
                <p className="text-gray-500 text-base">
                  Estimated time: <span className="font-semibold text-gray-400">{lesson.estimatedMinutes} minutes</span>
                </p>
              </div>

              {/* Content Area */}
              <div className="mb-16">
                {isWorkshop ? (
                  <WorkshopContent globalNumber={lesson.globalNumber} moduleGradient={moduleGradient} />
                ) : richContent ? (
                  <RichContent content={richContent} moduleColor={moduleGradient} />
                ) : (
                  <div className="text-gray-400 text-lg">
                    <p>Content coming soon.</p>
                  </div>
                )}
              </div>

              {/* Bottom Bar */}
              <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between sticky bottom-0 bg-black bg-opacity-95 sm:bg-transparent sm:relative -mx-4 sm:mx-0 px-4 sm:px-0 -mb-8 sm:mb-0 pb-4 sm:pb-0">
                <div>
                  {previousLesson ? (
                    <button
                      onClick={() => handleNavigate(previousLesson.moduleSlug, previousLesson.slug)}
                      className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded"
                      aria-label="Previous lesson"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      <span className="hidden sm:inline">Previous</span>
                    </button>
                  ) : <div />}
                </div>

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

                <div>
                  {nextLesson ? (
                    <button
                      onClick={() => handleNavigate(nextLesson.moduleSlug, nextLesson.slug)}
                      className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded"
                      aria-label="Next lesson"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ) : (
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded"
                      aria-label="Back to dashboard"
                    >
                      <span className="hidden sm:inline">Dashboard</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
