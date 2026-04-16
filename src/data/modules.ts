// ============================================================
// CNIB Venture Studio — 18-Module Theme Architecture
// ============================================================
// Organized by PHASE, not by week number.
// Each module belongs to a phase and has its own interactive
// elements, worksheets, and podcast slot.
// ============================================================

export interface Module {
  id: string;
  phase: Phase;
  title: string;
  subtitle: string;
  outcome: string;
  description: string;
  frameworks: string[];
  caseStudy: {
    company: string;
    insight: string;
  };
  assignment: string;
  worksheetId?: string;
  podcastId?: string;
  interactiveElement?: InteractiveElement;
  stats?: ModuleStat[];
}

export interface Phase {
  id: string;
  number: number;
  name: string;
  tagline: string;
  color: string; // Tailwind class suffix
}

export interface InteractiveElement {
  type: "calculator" | "canvas" | "checklist" | "quiz" | "builder" | "chart";
  title: string;
  description: string;
}

export interface ModuleStat {
  value: string;
  label: string;
}

// ── Phases ──────────────────────────────────────────────────

export const phases: Phase[] = [
  {
    id: "discover",
    number: 1,
    name: "Discover",
    tagline: "Find your idea. Know your market.",
    color: "yellow",
  },
  {
    id: "build",
    number: 2,
    name: "Build",
    tagline: "Turn your concept into something real.",
    color: "white",
  },
  {
    id: "grow",
    number: 3,
    name: "Grow",
    tagline: "Reach people. Make money.",
    color: "yellow",
  },
  {
    id: "scale",
    number: 4,
    name: "Scale",
    tagline: "Systems, funding, and operations.",
    color: "white",
  },
  {
    id: "master",
    number: 5,
    name: "Master",
    tagline: "Advanced skills for the real world.",
    color: "yellow",
  },
  {
    id: "launch",
    number: 6,
    name: "Launch",
    tagline: "Pitch it. Ship it. Own it.",
    color: "white",
  },
];

// Helper to get phase by id
const phase = (id: string): Phase => phases.find((p) => p.id === id)!;

// ── Modules ─────────────────────────────────────────────────

export const modules: Module[] = [
  // ── PHASE 1: DISCOVER ─────────────────────────────────────
  {
    id: "entrepreneurial-mindset",
    phase: phase("discover"),
    title: "The Entrepreneurial Mindset",
    subtitle: "Who you are matters more than what you know",
    outcome:
      "Understand the fundamentals of entrepreneurship and set personal and business goals.",
    description:
      "Every business starts with a person willing to bet on themselves. This module strips away the myths about who gets to be an entrepreneur and helps you build the mental foundation for everything that follows.",
    frameworks: [
      "Carol Dweck's Growth Mindset",
      "Simon Sinek's Start With Why",
    ],
    caseStudy: {
      company: "Spanx",
      insight:
        "Sara Blakely started with $5,000, no business background, and an idea she couldn't get anyone to believe in — until she did.",
    },
    assignment:
      "Develop a 1-minute elevator pitch introducing your business idea.",
    interactiveElement: {
      type: "builder",
      title: "Elevator Pitch Builder",
      description:
        "Fill in the blanks and build your first 60-second pitch, step by step.",
    },
    stats: [
      { value: "582M+", label: "People worldwide who are entrepreneurs" },
      { value: "70%", label: "Started with less than $10K" },
      { value: "1", label: "Idea is all you need to begin" },
    ],
  },
  {
    id: "idea-to-business-model",
    phase: phase("discover"),
    title: "From Idea to Business Model",
    subtitle: "An idea is not a business — yet",
    outcome: "Validate your idea and define your revenue model.",
    description:
      "You have a great idea. Now let's figure out if anyone will pay for it. This module introduces the tools that separate daydreams from viable businesses.",
    frameworks: [
      "Lean Startup (Eric Ries)",
      "Business Model Canvas (Alexander Osterwalder)",
    ],
    caseStudy: {
      company: "Airbnb",
      insight:
        "They started by renting air mattresses in their apartment. The business model changed everything.",
    },
    assignment: "Complete a Business Model Canvas for your idea.",
    interactiveElement: {
      type: "canvas",
      title: "Business Model Canvas",
      description:
        "Interactive 9-block canvas. Fill it in, export it, bring it to your next session.",
    },
    stats: [
      { value: "9", label: "Building blocks of every business" },
      { value: "42%", label: "Of startups fail due to no market need" },
      { value: "$0", label: "Cost to validate an idea" },
    ],
  },
  {
    id: "market-research",
    phase: phase("discover"),
    title: "Market Research & Customer Discovery",
    subtitle: "Talk to people before you build for them",
    outcome: "Validate your target market and understand your competitors.",
    description:
      "The best entrepreneurs don't guess — they ask. This module teaches you how to have the right conversations with the right people to learn what they actually need.",
    frameworks: [
      "The Mom Test (Rob Fitzpatrick)",
      "Customer Interview Techniques",
    ],
    caseStudy: {
      company: "Zappos",
      insight:
        "Before building anything, they tested demand by photographing shoes at stores and selling them online. Zero inventory risk.",
    },
    assignment:
      "Conduct five customer interviews and summarize key insights.",
    interactiveElement: {
      type: "checklist",
      title: "Customer Interview Tracker",
      description:
        "Track your 5 interviews: who you talked to, what you learned, what surprised you.",
    },
    stats: [
      { value: "5", label: "Interviews that can change your entire plan" },
      { value: "3x", label: "More likely to succeed with customer input" },
      { value: "20 min", label: "Average useful interview length" },
    ],
  },

  // ── PHASE 2: BUILD ────────────────────────────────────────
  {
    id: "minimum-viable-product",
    phase: phase("build"),
    title: "Your Minimum Viable Product",
    subtitle: "Ship something. Learn everything.",
    outcome: "Define and test a simple MVP.",
    description:
      "Perfection is the enemy of progress. This module teaches you to build the smallest thing that proves your idea works — then learn from the people who use it.",
    frameworks: ["Lean Startup's MVP Concept", "Build-Measure-Learn Loop"],
    caseStudy: {
      company: "Dropbox",
      insight:
        "Before writing a line of code, they made a 3-minute explainer video. 75,000 people signed up overnight.",
    },
    assignment:
      "Outline an MVP strategy and create a no-cost market test (landing page, pre-orders, etc.).",
    interactiveElement: {
      type: "builder",
      title: "MVP Planner",
      description:
        "Define your simplest possible product: what it does, who it's for, and how you'll test it.",
    },
    stats: [
      { value: "75K", label: "Signups from Dropbox's MVP video" },
      { value: "2 weeks", label: "Typical MVP build time" },
      { value: "$0–500", label: "What most MVPs cost" },
    ],
  },
  {
    id: "legal-foundations",
    phase: phase("build"),
    title: "Business Setup & Legal Foundations",
    subtitle: "The boring stuff that protects the exciting stuff",
    outcome: "Learn the essentials of setting up a business legally.",
    description:
      "Nobody starts a company because they love paperwork. But getting your legal foundation right early saves headaches, money, and risk down the road.",
    frameworks: [
      "Business Entity Types (Sole Proprietorship, LLC, Corporation)",
      "Basic Intellectual Property",
    ],
    caseStudy: {
      company: "Notion",
      insight:
        "They structured their business carefully from day one, which gave them flexibility to pivot and grow into a $10B company.",
    },
    assignment:
      "Draft a basic company setup plan and choose a legal structure.",
    interactiveElement: {
      type: "quiz",
      title: "Legal Structure Finder",
      description:
        "Answer 5 questions about your business and get a recommended legal structure.",
    },
    stats: [
      { value: "3", label: "Main business structures in Canada" },
      { value: "$200", label: "Approximate cost to incorporate" },
      { value: "1 day", label: "To register a sole proprietorship" },
    ],
  },
  {
    id: "pricing-financials",
    phase: phase("build"),
    title: "Pricing, Costs & Financial Basics",
    subtitle: "If you can't price it, you can't sell it",
    outcome: "Create a pricing strategy and basic financial projections.",
    description:
      "This is where your idea meets math. You'll learn how to price your product, project your costs, and figure out what it actually takes to make money.",
    frameworks: ["Value-Based Pricing", "Lean Financial Modeling"],
    caseStudy: {
      company: "Mailchimp",
      insight:
        "They bootstrapped to $12B without a single dollar of outside funding by nailing their pricing model early.",
    },
    assignment: "Develop a simple revenue model and pricing strategy.",
    interactiveElement: {
      type: "calculator",
      title: "Revenue Calculator",
      description:
        "Plug in your price, volume, and costs. See your break-even point and projected monthly revenue.",
    },
    stats: [
      { value: "$12B", label: "Mailchimp's valuation — bootstrapped" },
      { value: "3x", label: "Minimum markup for most products" },
      { value: "1", label: "Revenue model is all you need to start" },
    ],
  },

  // ── PHASE 3: GROW ─────────────────────────────────────────
  {
    id: "branding-marketing",
    phase: phase("grow"),
    title: "Branding & Marketing Strategy",
    subtitle: "People buy stories, not products",
    outcome: "Define your brand identity and create a marketing plan.",
    description:
      "Your brand is what people say about you when you're not in the room. This module helps you control that narrative with a clear identity and a plan to reach the right people.",
    frameworks: [
      "Positioning (Jack Trout)",
      "StoryBrand Framework (Donald Miller)",
    ],
    caseStudy: {
      company: "Glossier",
      insight:
        "Built a $1.8B beauty brand by putting community and content before product.",
    },
    assignment:
      "Develop a brand positioning statement and a digital marketing plan.",
    interactiveElement: {
      type: "builder",
      title: "Brand Statement Builder",
      description:
        "Craft your positioning statement: who you serve, what you offer, and why you're different.",
    },
    stats: [
      { value: "7", label: "Seconds to make a first impression" },
      { value: "64%", label: "Buy from brands that share their values" },
      { value: "$0", label: "Cost to start marketing on social media" },
    ],
  },
  {
    id: "sales-acquisition",
    phase: phase("grow"),
    title: "Sales & Customer Acquisition",
    subtitle: "Your first dollar starts with your first conversation",
    outcome: "Learn how to get your first paying customers.",
    description:
      "You don't need a sales team. You need a conversation. This module teaches you to sell without being salesy — through authentic outreach, storytelling, and value.",
    frameworks: [
      "Sales Funnels",
      "Direct vs. Inbound Sales Strategies",
    ],
    caseStudy: {
      company: "Tesla",
      insight:
        "Built a premium brand with zero paid advertising. Word of mouth and product experience did the work.",
    },
    assignment:
      "Write a sales script and test your pitch with three potential customers.",
    interactiveElement: {
      type: "builder",
      title: "Sales Script Generator",
      description:
        "Build a natural-sounding outreach script that doesn't feel like a script.",
    },
    stats: [
      { value: "$0", label: "Tesla's advertising budget" },
      { value: "80%", label: "Of sales come from follow-up" },
      { value: "3", label: "Conversations to your first sale" },
    ],
  },
  {
    id: "funding",
    phase: phase("grow"),
    title: "Funding Your Business",
    subtitle: "Know your options before you need them",
    outcome: "Explore funding options and understand investor expectations.",
    description:
      "Not every business needs outside money. This module helps you understand when and how to fund your growth — from bootstrapping to crowdfunding to venture capital.",
    frameworks: [
      "Bootstrapping vs. Venture Capital",
      "Crowdfunding Models",
      "Grant Landscape for Accessible Businesses",
    ],
    caseStudy: {
      company: "Dollar Shave Club",
      insight:
        "A $4,500 YouTube video launched a company that sold for $1 billion.",
    },
    assignment: "Develop a funding strategy for your business.",
    interactiveElement: {
      type: "quiz",
      title: "Funding Path Finder",
      description:
        "Answer questions about your business stage and get a personalized funding recommendation.",
    },
    stats: [
      { value: "$4.5K", label: "Dollar Shave Club's launch investment" },
      { value: "$1B", label: "Acquisition price 4 years later" },
      { value: "77%", label: "Of small businesses self-fund" },
    ],
  },

  // ── PHASE 4: SCALE ────────────────────────────────────────
  {
    id: "operations-scaling",
    phase: phase("scale"),
    title: "Business Operations & Scaling",
    subtitle: "Systems beat hustle",
    outcome: "Learn how to run and scale operations efficiently.",
    description:
      "The difference between a side project and a business is systems. This module teaches you to automate, delegate, and build operations that don't depend on you doing everything.",
    frameworks: [
      "Lean Operations",
      "Automation Strategies",
      "Process Mapping",
    ],
    caseStudy: {
      company: "Shopify",
      insight:
        "Scaled from a snowboard shop to powering 4.4 million businesses through automation and strategic partnerships.",
    },
    assignment: "Identify one key process to automate or optimize.",
    interactiveElement: {
      type: "checklist",
      title: "Operations Audit",
      description:
        "Walk through your current operations and flag what can be automated, delegated, or eliminated.",
    },
    stats: [
      { value: "4.4M", label: "Businesses powered by Shopify" },
      { value: "10hrs", label: "Saved per week with basic automation" },
      { value: "1", label: "Automation can change everything" },
    ],
  },
  {
    id: "pitch-development",
    phase: phase("scale"),
    title: "Pitch Deck Development",
    subtitle: "Tell the story that makes people lean in",
    outcome:
      "Create a compelling investor pitch deck and practice storytelling.",
    description:
      "Your pitch deck isn't just slides — it's the story of your business told in a way that makes people want to be part of it. This module teaches you the structure and the delivery.",
    frameworks: [
      "The 10-Slide Investor Pitch Model",
      "Storytelling in Business",
    ],
    caseStudy: {
      company: "Airbnb",
      insight:
        "Their original pitch deck is legendary — simple, clear, and impossible to say no to.",
    },
    assignment:
      "Create a 10-slide pitch deck and practice delivering a 3-minute pitch.",
    interactiveElement: {
      type: "builder",
      title: "Pitch Deck Outliner",
      description:
        "Build your 10-slide structure: what goes on each slide and why.",
    },
    stats: [
      { value: "10", label: "Slides in a great pitch deck" },
      { value: "3 min", label: "To tell your whole story" },
      { value: "30 sec", label: "To hook an investor" },
    ],
  },
  // Session 12 placeholder
  {
    id: "module-12",
    phase: phase("scale"),
    title: "Coming Soon",
    subtitle: "New module being developed",
    outcome: "Details announced in upcoming sessions.",
    description:
      "This module is currently being developed. Check back soon for details.",
    frameworks: [],
    caseStudy: { company: "TBA", insight: "Coming soon." },
    assignment: "To be announced.",
  },

  // ── PHASE 5: MASTER ───────────────────────────────────────
  {
    id: "module-13",
    phase: phase("master"),
    title: "Coming Soon",
    subtitle: "New module being developed",
    outcome: "Details announced in upcoming sessions.",
    description:
      "This module is currently being developed. Check back soon for details.",
    frameworks: [],
    caseStudy: { company: "TBA", insight: "Coming soon." },
    assignment: "To be announced.",
  },
  {
    id: "module-14",
    phase: phase("master"),
    title: "Coming Soon",
    subtitle: "New module being developed",
    outcome: "Details announced in upcoming sessions.",
    description:
      "This module is currently being developed. Check back soon for details.",
    frameworks: [],
    caseStudy: { company: "TBA", insight: "Coming soon." },
    assignment: "To be announced.",
  },
  {
    id: "module-15",
    phase: phase("master"),
    title: "Coming Soon",
    subtitle: "New module being developed",
    outcome: "Details announced in upcoming sessions.",
    description:
      "This module is currently being developed. Check back soon for details.",
    frameworks: [],
    caseStudy: { company: "TBA", insight: "Coming soon." },
    assignment: "To be announced.",
  },

  // ── PHASE 6: LAUNCH ───────────────────────────────────────
  {
    id: "module-16",
    phase: phase("launch"),
    title: "Coming Soon",
    subtitle: "New module being developed",
    outcome: "Details announced in upcoming sessions.",
    description:
      "This module is currently being developed. Check back soon for details.",
    frameworks: [],
    caseStudy: { company: "TBA", insight: "Coming soon." },
    assignment: "To be announced.",
  },
  {
    id: "module-17",
    phase: phase("launch"),
    title: "Coming Soon",
    subtitle: "New module being developed",
    outcome: "Details announced in upcoming sessions.",
    description:
      "This module is currently being developed. Check back soon for details.",
    frameworks: [],
    caseStudy: { company: "TBA", insight: "Coming soon." },
    assignment: "To be announced.",
  },
  {
    id: "final-pitch-showcase",
    phase: phase("launch"),
    title: "Final Pitch Showcase",
    subtitle: "This is your moment",
    outcome:
      "Deliver your final pitch to a panel of business leaders and receive structured feedback.",
    description:
      "Everything you've built comes together here. You'll pitch your business to a live panel — not as a student exercise, but as a real entrepreneur presenting a real business.",
    frameworks: [
      "Investor Presentation Strategies",
      "Public Speaking Best Practices",
    ],
    caseStudy: {
      company: "Shark Tank",
      insight:
        "The most successful pitches share one thing: clarity about the problem, the solution, and the ask.",
    },
    assignment:
      "Deliver a 5-minute pitch to fellow participants, mentors, and a panel of business leaders.",
    interactiveElement: {
      type: "checklist",
      title: "Pitch Day Checklist",
      description:
        "Everything you need ready for your final pitch: deck, script, timing, and confidence.",
    },
    stats: [
      { value: "5 min", label: "Your time to shine" },
      { value: "18", label: "Modules of preparation behind you" },
      { value: "∞", label: "Where your business goes from here" },
    ],
  },
];

// ── Helpers ──────────────────────────────────────────────────

export function getModulesByPhase(phaseId: string): Module[] {
  return modules.filter((m) => m.phase.id === phaseId);
}

export function getModuleById(id: string): Module | undefined {
  return modules.find((m) => m.id === id);
}

export function getPhaseById(id: string): Phase | undefined {
  return phases.find((p) => p.id === id);
}

export function getAvailableModules(): Module[] {
  return modules.filter((m) => m.title !== "Coming Soon");
}

export function getModuleCount(): { total: number; available: number } {
  return {
    total: modules.length,
    available: getAvailableModules().length,
  };
}
