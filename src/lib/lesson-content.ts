import { modules, type Module } from '@/data/modules';

// Maps course-data global lesson numbers to modules.ts content
// 18 content lessons (3 per phase) + 6 workshop lessons (every 4th)
const LESSON_TO_MODULE_INDEX: Record<number, number> = {
  // DISCOVER phase
  1: 0,   // entrepreneurial-mindset
  2: 1,   // idea-to-opportunity
  3: 2,   // know-your-customer
  // 4: workshop
  // DESIGN → validate phase
  5: 3,   // test-before-you-build
  6: 4,   // your-business-model
  7: 5,   // pricing-revenue
  // 8: workshop
  // MONEY → build phase
  9: 6,   // setting-up-your-business
  10: 7,  // your-brand-and-story
  11: 8,  // your-digital-presence
  // 12: workshop
  // BRAND → sell phase
  13: 9,  // marketing-that-works
  14: 10, // your-first-sale
  15: 11, // customer-relationships
  // 16: workshop
  // SELL → grow phase
  17: 12, // operations-systems
  18: 13, // money-and-funding
  19: 14, // accessible-entrepreneurship
  // 20: workshop
  // LAUNCH phase
  21: 15, // your-pitch-deck
  22: 16, // pitch-rehearsal
  23: 17, // final-pitch-showcase
  // 24: workshop
};

// Workshop lessons are every 4th lesson
const WORKSHOP_LESSONS = new Set([4, 8, 12, 16, 20, 24]);

// Phase names for workshop lessons
const WORKSHOP_PHASE_MAP: Record<number, { phase: string; moduleIndices: number[] }> = {
  4:  { phase: 'Discover', moduleIndices: [0, 1, 2] },
  8:  { phase: 'Validate', moduleIndices: [3, 4, 5] },
  12: { phase: 'Build', moduleIndices: [6, 7, 8] },
  16: { phase: 'Sell', moduleIndices: [9, 10, 11] },
  20: { phase: 'Grow', moduleIndices: [12, 13, 14] },
  24: { phase: 'Launch', moduleIndices: [15, 16, 17] },
};

export function getLessonContent(globalNumber: number): Module | null {
  const index = LESSON_TO_MODULE_INDEX[globalNumber];
  if (index === undefined) return null;
  return modules[index] || null;
}

export function isWorkshopLesson(globalNumber: number): boolean {
  return WORKSHOP_LESSONS.has(globalNumber);
}

export function getWorkshopData(globalNumber: number): {
  phase: string;
  modules: Module[];
} | null {
  const mapping = WORKSHOP_PHASE_MAP[globalNumber];
  if (!mapping) return null;
  return {
    phase: mapping.phase,
    modules: mapping.moduleIndices.map(i => modules[i]).filter(Boolean),
  };
}
