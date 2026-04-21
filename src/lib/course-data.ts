// Static course structure for rendering before Supabase is connected
// This mirrors the seed data in the schema

export const COURSE = {
  slug: "turn-your-idea-into-your-first-dollar",
  title: "Turn Your Idea Into Your First Dollar",
  tagline: "24 lessons. 6 modules. One real business.",
  description:
    'A structured path from "I have an idea" to "I made my first sale." Built for aspiring entrepreneurs living with sight loss. No fluff. No filler. Just the work.',
  totalModules: 6,
  totalLessons: 24,
  estimatedHours: 12,
};

export interface StaticLesson {
  number: number;
  globalNumber: number;
  slug: string;
  title: string;
  estimatedMinutes: number;
}

export interface StaticModule {
  slug: string;
  title: string;
  subtitle: string;
  sortOrder: number;
  lessons: StaticLesson[];
}

export const MODULES: StaticModule[] = [
  {
    slug: "discover",
    title: "DISCOVER",
    subtitle: "Find Your People, Find Your Problem",
    sortOrder: 1,
    lessons: [
      { number: 1, globalNumber: 1, slug: "who-do-you-want-to-help", title: "Who Do You Want to Help?", estimatedMinutes: 15 },
      { number: 2, globalNumber: 2, slug: "what-keeps-them-up-at-night", title: "What Keeps Them Up at Night?", estimatedMinutes: 15 },
      { number: 3, globalNumber: 3, slug: "is-this-a-real-problem", title: "Is This a Real Problem?", estimatedMinutes: 15 },
      { number: 4, globalNumber: 4, slug: "your-opportunity-statement", title: "Your Opportunity Statement", estimatedMinutes: 15 },
    ],
  },
  {
    slug: "design",
    title: "DESIGN",
    subtitle: "Build Something Worth Paying For",
    sortOrder: 2,
    lessons: [
      { number: 1, globalNumber: 5, slug: "what-are-you-actually-selling", title: "What Are You Actually Selling?", estimatedMinutes: 15 },
      { number: 2, globalNumber: 6, slug: "the-minimum-viable-offer", title: "The Minimum Viable Offer", estimatedMinutes: 15 },
      { number: 3, globalNumber: 7, slug: "will-anyone-pay-for-this", title: "Will Anyone Pay for This?", estimatedMinutes: 15 },
      { number: 4, globalNumber: 8, slug: "design-your-delivery-model", title: "Design Your Delivery Model", estimatedMinutes: 15 },
    ],
  },
  {
    slug: "money",
    title: "MONEY",
    subtitle: "Price It, Plan It, Fund It",
    sortOrder: 3,
    lessons: [
      { number: 1, globalNumber: 9, slug: "whats-it-worth", title: "What’s It Worth?", estimatedMinutes: 15 },
      { number: 2, globalNumber: 10, slug: "pricing-that-pays-you", title: "Pricing That Pays You", estimatedMinutes: 15 },
      { number: 3, globalNumber: 11, slug: "the-money-you-need", title: "The Money You Need", estimatedMinutes: 15 },
      { number: 4, globalNumber: 12, slug: "your-financial-reality-check", title: "Your Financial Reality Check", estimatedMinutes: 15 },
    ],
  },
  {
    slug: "brand",
    title: "BRAND",
    subtitle: "Name It, Own It, Launch It",
    sortOrder: 4,
    lessons: [
      { number: 1, globalNumber: 13, slug: "whats-your-story", title: "What’s Your Story?", estimatedMinutes: 15 },
      { number: 2, globalNumber: 14, slug: "naming-and-identity", title: "Naming and Identity", estimatedMinutes: 15 },
      { number: 3, globalNumber: 15, slug: "your-digital-home-base", title: "Your Digital Home Base", estimatedMinutes: 15 },
      { number: 4, globalNumber: 16, slug: "show-up-like-you-mean-it", title: "Show Up Like You Mean It", estimatedMinutes: 15 },
    ],
  },
  {
    slug: "sell",
    title: "SELL",
    subtitle: "Find Customers, Make Offers, Close Deals",
    sortOrder: 5,
    lessons: [
      { number: 1, globalNumber: 17, slug: "whos-going-to-buy-this", title: "Who’s Going to Buy This?", estimatedMinutes: 15 },
      { number: 2, globalNumber: 18, slug: "outreach-that-doesnt-suck", title: "Outreach That Doesn’t Suck", estimatedMinutes: 15 },
      { number: 3, globalNumber: 19, slug: "the-art-of-the-close", title: "The Art of the Close", estimatedMinutes: 15 },
      { number: 4, globalNumber: 20, slug: "your-first-sale", title: "Your First Sale", estimatedMinutes: 15 },
    ],
  },
  {
    slug: "launch",
    title: "LAUNCH",
    subtitle: "Ship It, Learn, Grow",
    sortOrder: 6,
    lessons: [
      { number: 1, globalNumber: 21, slug: "launch-week-game-plan", title: "Launch Week Game Plan", estimatedMinutes: 15 },
      { number: 2, globalNumber: 22, slug: "feedback-is-fuel", title: "Feedback Is Fuel", estimatedMinutes: 15 },
      { number: 3, globalNumber: 23, slug: "systems-that-scale", title: "Systems That Scale", estimatedMinutes: 15 },
      { number: 4, globalNumber: 24, slug: "whats-next", title: "What’s Next?", estimatedMinutes: 15 },
    ],
  },
];