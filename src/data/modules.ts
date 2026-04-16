// ============================================================
// CNIB Venture Studio — 18-Module Curriculum Architecture v2
// ============================================================
// Complete restructure: 6 phases, 18 fully-defined modules.
// Organized by pedagogical flow: Discover → Validate → Build →
// Sell → Grow → Launch. Every module production-ready.
// ============================================================

export interface RealWorldExample {
  label: "bad" | "good" | "great";
  title: string;
  description: string;
}

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
  realWorldExamples: RealWorldExample[];
  keyTakeaway: string;
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
  color: string;
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
    tagline: "Find the problem worth solving.",
    color: "yellow",
  },
  {
    id: "validate",
    number: 2,
    name: "Validate",
    tagline: "Prove it before you build it.",
    color: "white",
  },
  {
    id: "build",
    number: 3,
    name: "Build",
    tagline: "Make it real.",
    color: "yellow",
  },
  {
    id: "sell",
    number: 4,
    name: "Sell",
    tagline: "Make your first dollar.",
    color: "white",
  },
  {
    id: "grow",
    number: 5,
    name: "Grow",
    tagline: "Build something that lasts.",
    color: "yellow",
  },
  {
    id: "launch",
    number: 6,
    name: "Launch",
    tagline: "Tell the world.",
    color: "white",
  },
];

// Helper to get phase by id
const phase = (id: string): Phase => phases.find((p) => p.id === id)!;

// ── Modules ─────────────────────────────────────────────────

export const modules: Module[] = [
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PHASE 1: DISCOVER — "Find the problem worth solving"
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "entrepreneurial-mindset",
    phase: phase("discover"),
    title: "The Entrepreneurial Mindset",
    subtitle: "Who you are matters more than what you know",
    outcome:
      "Understand the fundamentals of entrepreneurship and build the mental foundation for everything that follows.",
    description:
      "Every business starts with a person willing to bet on themselves. This module strips away the myths about who gets to be an entrepreneur — especially the ones that say you need perfect vision, a business degree, or someone else's permission. You'll explore the traits that actually matter: curiosity, resilience, and a bias for action. By the end, you'll have your first elevator pitch and a clearer picture of who you are as a founder.",
    frameworks: [
      "Carol Dweck's Growth Mindset",
      "Simon Sinek's Start With Why",
      "Effectuation Theory (Saras Sarasvathy) — what you have vs. what you need",
    ],
    caseStudy: {
      company: "Haben Girma",
      insight:
        "The first Deafblind graduate of Harvard Law School didn't wait for the world to become accessible — she built her career by reframing disability as a source of innovation. Her advocacy has changed how tech companies think about accessibility.",
    },
    realWorldExamples: [
      {
        label: "bad",
        title: "\"I want to start a business because I want to be my own boss\"",
        description:
          "Starting a business to escape a job is a recipe for burnout. You're trading one set of problems for harder ones — without a reason to push through when it gets difficult.",
      },
      {
        label: "good",
        title: "\"I noticed blind people struggle to find accessible recipes, so I want to build something for that\"",
        description:
          "There's a real problem identified and a specific audience. It's personal and grounded. But it's still vague — what exactly are you building?",
      },
      {
        label: "great",
        title: "\"I'm building an audio-first cooking platform for blind home cooks — because every recipe site assumes you can read a screen while your hands are covered in flour\"",
        description:
          "Specific problem, specific audience, specific format, and a vivid insight that shows deep understanding. This is an idea with legs.",
      },
    ],
    keyTakeaway:
      "Entrepreneurship isn't about having a business plan — it's about having a problem you can't stop thinking about and the stubbornness to solve it.",
    assignment:
      "Write a 1-minute elevator pitch introducing yourself and your business idea. Record it as a voice memo and share it with the group.",
    interactiveElement: {
      type: "builder",
      title: "Elevator Pitch Builder",
      description:
        "Fill in the blanks and build your first 60-second pitch, step by step.",
    },
    stats: [
      { value: "582M+", label: "Entrepreneurs worldwide" },
      { value: "70%", label: "Started with less than $10K" },
      { value: "1", label: "Idea is all you need to begin" },
    ],
  },
  {
    id: "idea-to-opportunity",
    phase: phase("discover"),
    title: "From Idea to Opportunity",
    subtitle: "Not every idea is a business — yet",
    outcome:
      "Evaluate whether your idea solves a real problem for real people, and identify the gap between what exists and what's needed.",
    description:
      "You have a great idea. But an idea is not a business — it's a starting point. This module teaches you to think like an entrepreneur: find the pain point, understand who feels it, and figure out if your solution is something people would actually pay for. You'll learn the difference between a nice idea and a real opportunity.",
    frameworks: [
      "Problem-Solution Fit",
      "Jobs to Be Done (Clayton Christensen)",
      "Opportunity Sizing — TAM, SAM, SOM",
    ],
    caseStudy: {
      company: "Be My Eyes",
      insight:
        "Hans Jørgen Wiberg, a Danish furniture craftsman who is visually impaired, noticed that blind people often just needed a quick pair of eyes for simple tasks. He built an app connecting blind users with sighted volunteers. It now has 7 million volunteers in 150+ languages.",
    },
    realWorldExamples: [
      {
        label: "bad",
        title: "\"My idea is an app that does everything for everyone\"",
        description:
          "No specific problem, no specific audience. If you can't explain who it's for and why they need it in one sentence, it's not an opportunity yet — it's a wish.",
      },
      {
        label: "good",
        title: "\"There's no good way for small businesses to manage invoices on mobile\"",
        description:
          "Clear problem, clear audience. But is this actually true? Have you checked? QuickBooks, FreshBooks, and Wave all have mobile apps. The opportunity might be narrower than you think.",
      },
      {
        label: "great",
        title: "\"Freelance translators in Canada spend 5+ hours a week on invoicing because no tool handles multi-currency billing and CRA tax requirements together\"",
        description:
          "Specific audience, specific pain (5+ hours/week), specific gap (multi-currency + Canadian tax). You can test this with 10 phone calls. That's a real opportunity.",
      },
    ],
    keyTakeaway:
      "An idea becomes an opportunity when you can name the person who has the problem, describe what they do today that doesn't work, and explain why your approach is better.",
    assignment:
      "Write a one-page opportunity brief: What problem are you solving? Who has this problem? What exists today that doesn't work well enough? What would a better solution look like?",
    interactiveElement: {
      type: "canvas",
      title: "Opportunity Assessment Canvas",
      description:
        "Map your idea across four quadrants: the problem, who feels it, what exists today, and your unique angle.",
    },
    stats: [
      { value: "7M+", label: "Be My Eyes volunteers worldwide" },
      { value: "42%", label: "Of startups fail due to no market need" },
      { value: "1 page", label: "Is all you need to clarify an opportunity" },
    ],
  },
  {
    id: "know-your-customer",
    phase: phase("discover"),
    title: "Know Your Customer",
    subtitle: "Talk to people before you build for them",
    outcome:
      "Conduct real customer discovery conversations and build a clear picture of who you're serving.",
    description:
      "The best entrepreneurs don't guess — they ask. This module teaches you how to have honest conversations with potential customers to learn what they actually need, what frustrates them, and what they'd pay for. You'll learn to listen for the truth instead of asking questions that just confirm what you want to hear.",
    frameworks: [
      "The Mom Test (Rob Fitzpatrick) — how to talk to customers without leading them",
      "Customer Persona Development",
      "Empathy Mapping",
    ],
    caseStudy: {
      company: "Zappos",
      insight:
        "Before building anything, Nick Swinmurn tested demand by photographing shoes at local stores and listing them online. When someone ordered, he bought the shoes at retail and shipped them. Zero inventory, pure validation.",
    },
    realWorldExamples: [
      {
        label: "bad",
        title: "\"Do you think my idea for an accessible recipe app is good?\"",
        description:
          "You just asked someone to validate your feelings, not your business. People are polite. They'll say yes. You'll learn nothing. This is the #1 mistake in customer research.",
      },
      {
        label: "good",
        title: "\"How do you currently find recipes? What's frustrating about it?\"",
        description:
          "Open-ended, focused on their behavior and pain. You'll learn what they actually do — not what they think you want to hear. But you're still leading toward recipes. What if their real problem is meal planning?",
      },
      {
        label: "great",
        title: "\"Walk me through the last time you tried to cook something new. What happened?\"",
        description:
          "You're asking them to tell a story about their real life. You'll hear the actual friction points — maybe it's finding recipes, maybe it's measuring ingredients, maybe it's grocery shopping. Let the data lead you.",
      },
    ],
    keyTakeaway:
      "The best customer research question is never about your idea. It's about their life. Shut up and listen.",
    assignment:
      "Conduct five customer discovery interviews using The Mom Test principles. Document: who you talked to, what surprised you, and one thing you'd change about your idea based on what you heard.",
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

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PHASE 2: VALIDATE — "Prove it before you build it"
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "test-before-you-build",
    phase: phase("validate"),
    title: "Test Before You Build",
    subtitle: "Ship something small. Learn everything.",
    outcome:
      "Design and run a low-cost experiment that proves whether people want what you're offering.",
    description:
      "Perfection is the enemy of progress. Before you spend months building a product, spend days testing whether anyone wants it. This module teaches you to build the smallest possible thing that proves your idea has legs — a landing page, a pre-order form, a prototype, a service offered by hand. The goal isn't to build a business yet. It's to collect evidence.",
    frameworks: [
      "Lean Startup's MVP Concept (Eric Ries)",
      "Build-Measure-Learn Loop",
      "Smoke Testing & Concierge MVP",
    ],
    caseStudy: {
      company: "Dropbox",
      insight:
        "Before writing a single line of code, Drew Houston made a 3-minute explainer video showing what Dropbox would do. 75,000 people signed up for the waitlist overnight. The product didn't exist yet — but the demand was proven.",
    },
    realWorldExamples: [
      {
        label: "bad",
        title: "Spending 6 months building a full product before talking to a single customer",
        description:
          "You just invested half a year and potentially thousands of dollars based on assumptions. If the market doesn't want it, you've wasted everything. This happens more often than you'd think.",
      },
      {
        label: "good",
        title: "Building a landing page with a signup form to gauge interest",
        description:
          "Smart — you're testing demand before building. But a signup doesn't mean someone will pay. They clicked a button. That's interest, not commitment.",
      },
      {
        label: "great",
        title: "Offering the service manually to 5 people and asking them to pay (even $5)",
        description:
          "Money is the ultimate validation. If someone will pay you $5 for a hand-delivered version of your idea, you've proven demand in the strongest possible way. Now scale it.",
      },
    ],
    keyTakeaway:
      "The fastest way to learn if your idea works is to sell it before you build it. If people won't pay for the ugly version, they won't pay for the pretty one either.",
    assignment:
      "Design and launch a no-cost market test for your idea. Options: a landing page with a signup form, a pre-order listing, a social media poll, or a concierge test where you deliver the service manually to 3 people.",
    interactiveElement: {
      type: "builder",
      title: "MVP Experiment Planner",
      description:
        "Define your experiment: what you're testing, who you're testing with, what success looks like, and how long you'll run it.",
    },
    stats: [
      { value: "75K", label: "Signups from Dropbox's MVP video" },
      { value: "1 week", label: "To run your first experiment" },
      { value: "$0", label: "Cost to test most ideas" },
    ],
  },
  {
    id: "your-business-model",
    phase: phase("validate"),
    title: "Your Business Model",
    subtitle: "How your idea actually makes money",
    outcome:
      "Complete a Business Model Canvas using real data from your customer interviews and market test.",
    description:
      "Now that you have real evidence — from interviews, from your market test — it's time to map the full picture. The Business Model Canvas is a one-page blueprint of your entire business: who you serve, what you offer, how you reach them, and how money flows. You're not guessing anymore. You're filling this in with data.",
    frameworks: [
      "Business Model Canvas (Alexander Osterwalder)",
      "Value Proposition Design",
      "Revenue Stream Mapping",
    ],
    caseStudy: {
      company: "Airbnb",
      insight:
        "They started by renting air mattresses in their apartment to conference attendees. The business model evolved from 'cheap place to crash' to a global hospitality platform — but the canvas stayed the same structure. They just filled it in with better data as they learned.",
    },
    realWorldExamples: [
      {
        label: "bad",
        title: "Filling in a Business Model Canvas with guesses and hopes",
        description:
          "\"Revenue streams: lots of money.\" \"Customer segments: everyone.\" A canvas filled with assumptions is just expensive fiction. It looks professional but tells you nothing.",
      },
      {
        label: "good",
        title: "Filling it in with data from 5 interviews and some market research",
        description:
          "Now you're grounding each block in something real. Your customer segment comes from actual conversations. Your value proposition reflects real pain points. This is a working document.",
      },
      {
        label: "great",
        title: "Filling it in with data from interviews AND your market test, then stress-testing with a mentor",
        description:
          "You have real evidence in every block, plus someone experienced has poked holes in it. The canvas isn't precious — it's a snapshot of what you know right now. You'll update it constantly.",
      },
    ],
    keyTakeaway:
      "A Business Model Canvas is only as good as the evidence behind it. Fill it in with data, not dreams.",
    assignment:
      "Complete a full Business Model Canvas for your idea. Use real data from your customer interviews and market test — not assumptions. Bring it to the next session for peer review.",
    interactiveElement: {
      type: "canvas",
      title: "Business Model Canvas",
      description:
        "Interactive 9-block canvas. Fill it in with real data, export it, bring it to your next session.",
    },
    stats: [
      { value: "9", label: "Building blocks of every business" },
      { value: "1 page", label: "To describe your entire business" },
      { value: "∞", label: "Times you'll update it as you learn" },
    ],
  },
  {
    id: "pricing-revenue",
    phase: phase("validate"),
    title: "Pricing & Revenue",
    subtitle: "If you can't price it, you can't sell it",
    outcome:
      "Create a pricing strategy and basic financial projections that make your business viable.",
    description:
      "This is where your idea meets math. Pricing isn't just about what you charge — it's about what your business is worth to the people you serve. You'll learn different pricing strategies, how to calculate your costs, and how to build a simple financial model that tells you exactly what it takes to make money.",
    frameworks: [
      "Value-Based Pricing vs. Cost-Plus Pricing",
      "Break-Even Analysis",
      "Lean Financial Modeling",
    ],
    caseStudy: {
      company: "Mailchimp",
      insight:
        "They bootstrapped to a $12 billion valuation without a single dollar of outside funding. The key: a freemium pricing model that let small businesses start free and pay as they grew. Pricing was their growth engine.",
    },
    realWorldExamples: [
      {
        label: "bad",
        title: "\"I'll just charge what feels right and figure out costs later\"",
        description:
          "Vibes-based pricing is how businesses go broke. If you don't know your costs, you don't know if you're making money or losing it with every sale.",
      },
      {
        label: "good",
        title: "\"I looked at competitors and priced 10% lower to attract customers\"",
        description:
          "At least you researched. But competing on price is a race to the bottom. If your only advantage is being cheaper, you have no advantage — someone can always undercut you.",
      },
      {
        label: "great",
        title: "\"My service saves clients 5 hours/week. At their hourly rate, that's worth $250/week. I charge $99.\"",
        description:
          "Value-based pricing. You're pricing against the problem's cost, not your competitor's price. The customer sees a clear ROI. That's a price that sells itself.",
      },
    ],
    keyTakeaway:
      "Price based on the value you create, not the cost of what you sell. If your customer saves $250, charging $99 is a bargain — not an expense.",
    assignment:
      "Build a simple revenue model: your price, your projected volume, your costs, and your break-even point. Use the Revenue Calculator to test different scenarios.",
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

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PHASE 3: BUILD — "Make it real"
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "setting-up-your-business",
    phase: phase("build"),
    title: "Setting Up Your Business",
    subtitle: "The boring stuff that protects the exciting stuff",
    outcome:
      "Understand business structures, registration, and the legal basics you need to operate.",
    description:
      "Nobody starts a company because they love paperwork. But getting your legal foundation right early saves headaches, money, and risk later. This module walks you through the practical steps: choosing a business structure, registering your business in Canada, opening a business bank account, and understanding your basic obligations. It's less exciting than your big idea — and more important than you think.",
    frameworks: [
      "Business Entity Types in Canada (Sole Proprietorship, Partnership, Corporation)",
      "Basic Intellectual Property Protection",
      "CRA Business Registration & HST/GST",
    ],
    caseStudy: {
      company: "Shopify",
      insight:
        "Tobias Lütke started by building an online store to sell snowboards. He incorporated early and structured the business properly from day one — which gave Shopify the flexibility to pivot from a snow shop to the platform powering 4.4 million businesses worldwide.",
    },
    realWorldExamples: [
      {
        label: "bad",
        title: "Incorporating a company before you've made a single dollar",
        description:
          "You're spending money on lawyers and filing fees for a business that hasn't been validated yet. Start as a sole proprietorship. Incorporate when revenue justifies the complexity.",
      },
      {
        label: "good",
        title: "Registering as a sole proprietorship and opening a separate bank account",
        description:
          "Simple, cheap, and you're separating personal from business finances. This is the right first step for 90% of new businesses. You can always upgrade later.",
      },
      {
        label: "great",
        title: "Sole proprietorship + separate bank account + basic record-keeping system from day one",
        description:
          "You're not just legal — you're organized. When tax time comes, when you want to apply for a grant, when a partner asks for financials, you're ready. Future-you will be grateful.",
      },
    ],
    keyTakeaway:
      "Start simple. Sole proprietorship, separate bank account, basic records. You can always get more complex — you can't un-waste time and money on premature structure.",
    assignment:
      "Complete a business setup checklist: choose your legal structure, draft a company name, identify your registration steps, and outline your intellectual property (if any).",
    interactiveElement: {
      type: "quiz",
      title: "Legal Structure Finder",
      description:
        "Answer 5 questions about your business and get a recommended legal structure for Canada.",
    },
    stats: [
      { value: "3", label: "Main business structures in Canada" },
      { value: "$200", label: "Approximate cost to incorporate" },
      { value: "1 day", label: "To register a sole proprietorship" },
    ],
  },
  {
    id: "your-brand-and-story",
    phase: phase("build"),
    title: "Your Brand & Story",
    subtitle: "People buy stories, not products",
    outcome:
      "Define your brand identity, positioning, and the story that makes people care.",
    description:
      "Your brand is what people say about you when you're not in the room. It's not a logo — it's a feeling, a promise, a story. This module helps you figure out who you are as a business, what you stand for, and how to communicate that in a way that resonates with the people you're trying to reach. You'll build a brand positioning statement and a founder story that's authentically yours.",
    frameworks: [
      "Positioning (Jack Trout & Al Ries)",
      "StoryBrand Framework (Donald Miller)",
      "Brand Voice & Tone Development",
    ],
    caseStudy: {
      company: "Aira",
      insight:
        "Aira built its brand around one powerful idea: visual information, on demand. Instead of leading with technology or disability, they positioned themselves as a premium service that gives you instant access to a trained visual interpreter. The brand feels empowering, not charitable — and that positioning was the difference.",
    },
    realWorldExamples: [
      {
        label: "bad",
        title: "\"We're a cutting-edge, innovative, world-class solution for modern challenges\"",
        description:
          "This says absolutely nothing. It could describe any company in any industry. If you remove your company name and someone can't tell who it's from, your brand statement has failed.",
      },
      {
        label: "good",
        title: "\"We help small businesses manage their social media more easily\"",
        description:
          "Clear and functional — you know what they do and who they serve. But there's no personality, no story, no reason to choose them over the dozen other tools that say the same thing.",
      },
      {
        label: "great",
        title: "\"We're the social media tool for one-person businesses who'd rather be making things than making posts. Built by a solo founder who hated every other option.\"",
        description:
          "Specific audience, clear personality, honest origin story. You can hear the voice. You know exactly who this is for — and who it's not for. That's a brand.",
      },
    ],
    keyTakeaway:
      "A great brand is specific enough that some people love it and others walk away. If everyone likes it, no one loves it.",
    assignment:
      "Write your brand positioning statement (who you serve, what you offer, why you're different) and a 200-word founder story. Share both with the group for feedback.",
    interactiveElement: {
      type: "builder",
      title: "Brand Statement Builder",
      description:
        "Craft your positioning statement: who you serve, what you offer, and why you're different.",
    },
    stats: [
      { value: "7 sec", label: "To make a first impression" },
      { value: "64%", label: "Buy from brands that share their values" },
      { value: "1", label: "Story is your most powerful asset" },
    ],
  },
  {
    id: "your-digital-presence",
    phase: phase("build"),
    title: "Your Digital Presence",
    subtitle: "If they can't find you, they can't buy from you",
    outcome:
      "Build a basic digital presence — website, social media, and search visibility — with accessibility at the core.",
    description:
      "Every business needs to be findable. This module teaches you how to establish your digital footprint: a simple website, the right social media profiles, and a Google Business Profile. You'll learn what makes a website accessible (and why that's a competitive advantage, not just a compliance checkbox), how to write copy that works for both search engines and screen readers, and which platforms matter most for your specific business.",
    frameworks: [
      "Lean Website Strategy — one-page sites that convert",
      "WCAG Accessibility Basics for Business Owners",
      "Google Business Profile & Local SEO",
      "Social Media Platform Selection (where your customers actually are)",
    ],
    caseStudy: {
      company: "Seeing AI by Microsoft",
      insight:
        "Microsoft's Seeing AI started as a research project and launched with a simple, accessible website and a clear value proposition: 'a talking camera for the blind and low-vision community.' Their digital presence was built accessibility-first, and it became a model for how to launch inclusive tech products.",
    },
    realWorldExamples: [
      {
        label: "bad",
        title: "No website at all — just a personal Facebook page",
        description:
          "You don't control the platform, you can't customize the experience, and you look amateur. It's 2025. Even a one-page site is better than relying on someone else's algorithm.",
      },
      {
        label: "good",
        title: "A clean one-page site with your name, what you do, and a contact form",
        description:
          "Simple, professional, and functional. You exist on the internet. People can find you and reach out. This is enough for most new businesses starting out.",
      },
      {
        label: "great",
        title: "A one-page site with clear copy, a call to action, Google Business Profile, and WCAG-compliant design",
        description:
          "You're findable, professional, and accessible. The site works for everyone — screen reader users, mobile users, people with slow internet. And Google can actually find you. This is the standard.",
      },
    ],
    keyTakeaway:
      "Your website doesn't need to be fancy. It needs to be findable, clear, and accessible. One page that works is better than ten pages that don't.",
    assignment:
      "Create a one-page website (or a structured plan for one) that includes: what you do, who you serve, how to contact you, and a clear call to action. Ensure it passes basic accessibility checks.",
    interactiveElement: {
      type: "checklist",
      title: "Digital Presence Checklist",
      description:
        "Walk through every element of your online presence: website, social profiles, Google Business, and accessibility compliance.",
    },
    stats: [
      { value: "97%", label: "Of consumers search online before buying local" },
      { value: "96%", label: "Of websites fail basic accessibility tests" },
      { value: "$0", label: "Cost to set up a Google Business Profile" },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PHASE 4: SELL — "Make your first dollar"
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "marketing-that-works",
    phase: phase("sell"),
    title: "Marketing That Works",
    subtitle: "Reach the right people without a budget",
    outcome:
      "Create a practical marketing plan you can execute with minimal time and zero budget.",
    description:
      "Marketing doesn't have to mean paid ads and influencer deals. For a new business, the best marketing is specific, personal, and free. This module teaches you practical strategies: content that attracts your ideal customers, email that builds relationships, social media that doesn't waste your time, and community-based marketing that works especially well for niche businesses.",
    frameworks: [
      "Content Marketing Basics — give value before you ask for money",
      "Email Marketing Fundamentals",
      "Community-Based & Referral Marketing",
      "The Marketing Funnel (Awareness → Interest → Decision → Action)",
    ],
    caseStudy: {
      company: "Glossier",
      insight:
        "Emily Weiss built a $1.8 billion beauty brand by starting with a blog (Into The Gloss) that built a passionate community before she ever sold a single product. She didn't outspend competitors — she out-listened them.",
    },
    realWorldExamples: [
      {
        label: "bad",
        title: "Posting randomly on 6 social media platforms with no plan",
        description:
          "You're spreading yourself thin, burning out, and measuring nothing. Being everywhere means being nowhere. Three unfocused posts a week across six platforms is just noise.",
      },
      {
        label: "good",
        title: "Picking 2 platforms where your audience is and posting consistently 3x/week",
        description:
          "Focused and consistent. You're showing up where your people actually are. But are you just broadcasting, or are you engaging? Are you tracking what works?",
      },
      {
        label: "great",
        title: "2 platforms, 3x/week, with a content theme that gives value first — plus one metric you check weekly",
        description:
          "You're not just posting — you're building trust by being useful. And you're measuring one thing (email signups, DMs, link clicks) so you know what's actually working. That's a system.",
      },
    ],
    keyTakeaway:
      "The best marketing for a new business is free, focused, and consistent. Pick 2 channels, give value before you ask for anything, and measure one thing.",
    assignment:
      "Write a 30-day marketing plan: 3 channels you'll focus on, what content you'll create each week, and one specific metric you'll track to know if it's working.",
    interactiveElement: {
      type: "builder",
      title: "30-Day Marketing Planner",
      description:
        "Build your marketing plan week by week: channels, content, and the one metric that matters.",
    },
    stats: [
      { value: "$0", label: "Cost to start marketing on social media" },
      { value: "30 days", label: "To test what works" },
      { value: "3", label: "Channels is all you need to start" },
    ],
  },
  {
    id: "your-first-sale",
    phase: phase("sell"),
    title: "Your First Sale",
    subtitle: "Your first dollar starts with your first conversation",
    outcome:
      "Learn how to sell without being salesy, handle objections, and close your first paying customer.",
    description:
      "You don't need a sales team. You need a conversation. This module teaches you to sell authentically — through outreach, storytelling, and genuine value. You'll learn how to start a sales conversation, how to handle the most common objections, and how to ask for the sale without feeling gross about it. Selling is just helping people make a decision they already want to make.",
    frameworks: [
      "Consultative Selling — selling by solving problems",
      "Objection Handling Framework (Acknowledge, Explore, Respond)",
      "The Follow-Up System — 80% of sales happen after the 5th touch",
    ],
    caseStudy: {
      company: "Basecamp",
      insight:
        "Jason Fried and David Heinemeier Hansson built Basecamp by solving their own problem first, then telling the story of how they solved it. They never hired salespeople — their content and word of mouth did the selling. Their first customers came from blog posts, not cold calls.",
    },
    realWorldExamples: [
      {
        label: "bad",
        title: "\"Hi, I have a great product and I think you'd really benefit from it. Can I tell you about it?\"",
        description:
          "This is about you, not them. It screams 'sales pitch.' The recipient's instinct is to run. You haven't earned the right to their attention yet.",
      },
      {
        label: "good",
        title: "\"I noticed you mentioned struggling with X on your blog. I built something that might help — would you be open to a 10-minute chat?\"",
        description:
          "Personalized, low-pressure, and you're leading with their problem. Much better. But 'I built something that might help' is still vague.",
      },
      {
        label: "great",
        title: "\"I read your post about X. I actually solved that exact problem for 3 other people in your situation — here's what worked. Happy to share more if useful.\"",
        description:
          "You're leading with proof and generosity, not a pitch. You've demonstrated expertise. The ask is soft. People respond to this because you've already given them something valuable.",
      },
    ],
    keyTakeaway:
      "Selling is helping people make a decision they already want to make. Lead with their problem, not your product.",
    assignment:
      "Write a natural outreach script for your business (email, DM, or phone). Test it with three real potential customers and document: what you said, how they responded, and what you'd change next time.",
    interactiveElement: {
      type: "builder",
      title: "Sales Conversation Builder",
      description:
        "Build a natural-sounding outreach approach that doesn't feel like a script.",
    },
    stats: [
      { value: "80%", label: "Of sales happen after the 5th follow-up" },
      { value: "3", label: "Conversations to your first sale" },
      { value: "48 hrs", label: "To follow up or lose the deal" },
    ],
  },
  {
    id: "customer-relationships",
    phase: phase("sell"),
    title: "Customer Relationships",
    subtitle: "Your first customers are your most important",
    outcome:
      "Build a system for keeping customers, generating referrals, and turning buyers into advocates.",
    description:
      "Getting a customer is expensive. Keeping one is almost free. This module teaches you the business skills most first-time founders skip: how to deliver an exceptional experience, how to ask for referrals and reviews, how to handle complaints gracefully, and how to build the kind of loyalty that turns one customer into ten. Your earliest customers will define your reputation — treat them like gold.",
    frameworks: [
      "Customer Lifetime Value (CLV) — why retention beats acquisition",
      "Net Promoter Score (NPS) — the one question that matters",
      "The Referral Loop — ask, reward, repeat",
      "Service Recovery Paradox — handling complaints well builds loyalty",
    ],
    caseStudy: {
      company: "Chewy",
      insight:
        "Chewy.com became the most beloved pet supply company by doing things that don't scale: handwritten holiday cards, surprise pet portraits, and flowers sent when a customer's pet passed away. They built a $8.9B business on customer obsession, not ad spend.",
    },
    realWorldExamples: [
      {
        label: "bad",
        title: "Making the sale, then never contacting the customer again",
        description:
          "You worked so hard to get this customer, then ghosted them. No follow-up, no check-in, no relationship. They'll forget you exist — and they'll never refer you to anyone.",
      },
      {
        label: "good",
        title: "Sending a thank-you email after purchase and a follow-up a week later",
        description:
          "You're showing you care beyond the transaction. The customer feels seen. But you're still reactive — you're not building a system that creates advocates.",
      },
      {
        label: "great",
        title: "Thank-you email + check-in at 1 week + surprise value at 30 days + referral ask at 60 days",
        description:
          "You've built a relationship sequence. Each touchpoint adds value and deepens loyalty. By the time you ask for a referral, they want to give you one because you've earned it.",
      },
    ],
    keyTakeaway:
      "Your best marketing channel is a happy customer. Build the relationship after the sale with the same energy you used to make it.",
    assignment:
      "Design your customer experience: map the journey from first contact to repeat purchase. Identify 3 moments where you can exceed expectations. Write a follow-up email template and a referral ask.",
    interactiveElement: {
      type: "canvas",
      title: "Customer Journey Map",
      description:
        "Map every touchpoint from first contact to loyal advocate. Find the moments that matter most.",
    },
    stats: [
      { value: "5x", label: "Cheaper to retain than acquire" },
      { value: "65%", label: "Of revenue comes from existing customers" },
      { value: "1", label: "Happy customer tells 3 friends" },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PHASE 5: GROW — "Build something that lasts"
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "operations-systems",
    phase: phase("grow"),
    title: "Operations & Systems",
    subtitle: "Systems beat hustle",
    outcome:
      "Identify what to automate, delegate, or eliminate — and build operations that don't depend on you doing everything.",
    description:
      "The difference between a side project and a business is systems. When you're doing everything yourself, you are the bottleneck. This module teaches you to build simple operations that scale: how to automate repetitive tasks, when to hire help, how to manage your time when you're the CEO, the bookkeeper, and the customer service team all at once.",
    frameworks: [
      "Lean Operations — eliminate waste, maximize value",
      "Automation Strategies (Zapier, Make, AI tools)",
      "The Eisenhower Matrix — urgent vs. important",
      "Process Mapping — document what you do so someone else can do it",
    ],
    caseStudy: {
      company: "Notion",
      insight:
        "Ivan Zhao built Notion into a $10B company with a tiny team by obsessing over systems. The product itself is a system for building systems. They automated everything they could, documented everything they couldn't, and grew faster with 50 people than most companies do with 500.",
    },
    realWorldExamples: [
      {
        label: "bad",
        title: "Doing everything yourself because \"nobody can do it as well as I can\"",
        description:
          "You're the bottleneck. If you get sick for a week, your business stops. You're not building a business — you're building a job that owns you.",
      },
      {
        label: "good",
        title: "Using a spreadsheet to track tasks and starting to use templates for repetitive work",
        description:
          "You're aware of what you're doing and starting to systematize. Templates save time. But you're still doing everything — you're just doing it slightly faster.",
      },
      {
        label: "great",
        title: "Automating invoicing and follow-ups with Zapier, using a VA for admin 5hrs/week, and documenting your processes",
        description:
          "You've freed up 10+ hours a week for the work only you can do — selling, building relationships, improving your product. Your business can function without you for a day. That's the goal.",
      },
    ],
    keyTakeaway:
      "You should only be doing work that requires you specifically. Everything else should be automated, delegated, or eliminated.",
    assignment:
      "Audit your current workflow: list every task you do in a week, categorize each as automate, delegate, or keep. Set up one automation using a free tool.",
    interactiveElement: {
      type: "checklist",
      title: "Operations Audit",
      description:
        "Walk through your tasks and flag what can be automated, delegated, or eliminated.",
    },
    stats: [
      { value: "10 hrs", label: "Saved per week with basic automation" },
      { value: "80/20", label: "Of results come from 20% of your effort" },
      { value: "$0", label: "Cost of most automation tools to start" },
    ],
  },
  {
    id: "money-and-funding",
    phase: phase("grow"),
    title: "Money & Funding",
    subtitle: "Know your options before you need them",
    outcome:
      "Understand your funding options — from bootstrapping to grants to investment — and choose the right path for your business.",
    description:
      "Not every business needs outside money, and not all money is equal. This module helps you understand your options: bootstrapping (using revenue to grow), grants (especially those available to entrepreneurs with disabilities in Canada), microloans, crowdfunding, and venture capital. You'll learn when each makes sense, what investors actually look for, and how to fund your growth without giving away your company.",
    frameworks: [
      "Bootstrapping vs. External Funding — the trade-offs",
      "Canadian Grant Landscape for Entrepreneurs with Disabilities",
      "Crowdfunding Models (Kickstarter, Indiegogo, community campaigns)",
      "What Investors Look For — the fundamentals",
    ],
    caseStudy: {
      company: "MailChimp",
      insight:
        "Ben Chestnut and Dan Kurzius bootstrapped Mailchimp for 20 years, turning down every investor who came knocking. They eventually sold for $12 billion — and still owned the whole company. Not every business needs to raise money. Some are better off without it.",
    },
    realWorldExamples: [
      {
        label: "bad",
        title: "Seeking venture capital for a local service business that makes $3K/month",
        description:
          "VCs invest in businesses that can return 100x. A small, profitable local business is a great business — it's just not a VC-backable one. Wrong funding source for the business type.",
      },
      {
        label: "good",
        title: "Applying for a small business loan to fund inventory for your first big order",
        description:
          "Matched funding to a specific, revenue-generating need. You know what the money is for and how it generates return. Smart use of debt — as long as the numbers work.",
      },
      {
        label: "great",
        title: "Bootstrapping to first revenue, then applying for the Entrepreneurs with Disabilities Program grant to fund your next growth phase",
        description:
          "You proved the model with your own effort first, then applied for non-dilutive funding designed specifically for you. You keep 100% ownership and the grant validates your business to future partners.",
      },
    ],
    keyTakeaway:
      "Match your funding source to your business stage and type. The best funding is the kind you don't have to give back or give up equity for.",
    assignment:
      "Research and identify 3 funding sources relevant to your business (at least one disability-specific Canadian grant or program). Write a one-page funding strategy: how much you need, what it's for, and which path makes the most sense.",
    interactiveElement: {
      type: "quiz",
      title: "Funding Path Finder",
      description:
        "Answer questions about your business stage and goals, and get a personalized funding recommendation.",
    },
    stats: [
      { value: "77%", label: "Of small businesses self-fund" },
      { value: "$50K+", label: "Available through Canadian disability grants" },
      { value: "0%", label: "Equity given up when you bootstrap" },
    ],
  },
  {
    id: "accessible-entrepreneurship",
    phase: phase("grow"),
    title: "Accessible Entrepreneurship",
    subtitle: "Your perspective is your competitive advantage",
    outcome:
      "Master the assistive technology, resources, and strategies that make entrepreneurship work for blind and low-vision founders.",
    description:
      "This module is built specifically for you. As a blind or low-vision entrepreneur, you navigate challenges that sighted founders never think about — and that gives you a perspective most businesses lack. You'll explore the assistive technology ecosystem for running a business (screen readers, magnification, AI tools), disability-specific grants and supports available in Canada, accessibility as a market opportunity, and how to build a business that's inclusive by design rather than as an afterthought.",
    frameworks: [
      "Assistive Technology Ecosystem for Entrepreneurs (JAWS, NVDA, VoiceOver, Seeing AI, Be My Eyes, Aira)",
      "Accessibility as Competitive Advantage — the $13 trillion disability market",
      "Canadian Disability Entrepreneurship Resources (ODSP Self-Employment, Entrepreneurs with Disabilities Program, CEED grants)",
      "Universal Design Principles — building for everyone benefits everyone",
    ],
    caseStudy: {
      company: "Disability:IN",
      insight:
        "Research from Disability:IN and Accenture found that companies that champion disability inclusion have 28% higher revenue, 30% higher profit margins, and 2x the net income of their peers. Accessibility isn't charity — it's a business strategy.",
    },
    realWorldExamples: [
      {
        label: "bad",
        title: "Treating accessibility as a checkbox to comply with, not a business advantage",
        description:
          "\"We added alt text because we had to.\" If that's your entire accessibility strategy, you're missing the point — and a $13 trillion global market.",
      },
      {
        label: "good",
        title: "Using screen readers and AI tools to manage your business, and making your own products accessible",
        description:
          "You're walking the talk. Your personal experience with accessibility informs your product decisions. That's genuine expertise most competitors don't have.",
      },
      {
        label: "great",
        title: "Building accessibility into your brand identity and using it to win customers and contracts that competitors can't",
        description:
          "You're not just accessible — you lead with it. Government contracts, corporate partnerships, and socially-conscious consumers all seek out businesses with genuine accessibility credentials. Your lived experience is your moat.",
      },
    ],
    keyTakeaway:
      "You don't have a disability that limits your entrepreneurship. You have a perspective that most founders would pay to access. Use it.",
    assignment:
      "Complete an accessibility audit of your own business: What assistive tech do you use daily? What tools could make your workflow more efficient? Identify one Canadian disability grant you're eligible for and draft an application outline.",
    interactiveElement: {
      type: "checklist",
      title: "Accessibility Resource Finder",
      description:
        "Find the grants, tools, programs, and supports available to you as a blind or low-vision entrepreneur in Canada.",
    },
    stats: [
      { value: "$13T", label: "Global disability market spending power" },
      { value: "28%", label: "Higher revenue at disability-inclusive companies" },
      { value: "6.2M", label: "Canadians with a disability" },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PHASE 6: LAUNCH — "Tell the world"
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "your-pitch-deck",
    phase: phase("launch"),
    title: "Your Pitch Deck",
    subtitle: "Tell the story that makes people lean in",
    outcome:
      "Build a compelling 10-slide pitch deck that tells the full story of your business.",
    description:
      "Your pitch deck isn't just slides — it's the story of your business told in a way that makes people want to be part of it. This module teaches you the structure of a great pitch: the 10 slides every investor, partner, and advisor expects to see, how to write them with clarity and confidence, and how to use storytelling to make data come alive. You have 17 modules of work behind you. Now you put it all on 10 slides.",
    frameworks: [
      "The 10-Slide Investor Pitch Model (Kawasaki/Sequoia)",
      "Storytelling in Business — narrative arc for pitches",
      "Data Visualization for Non-Designers",
    ],
    caseStudy: {
      company: "Airbnb",
      insight:
        "Airbnb's original pitch deck is legendary — simple, clear, and impossible to say no to. It didn't have fancy design. It had a clear problem, a clear solution, clear numbers, and a clear ask. That's all a pitch deck needs.",
    },
    realWorldExamples: [
      {
        label: "bad",
        title: "30 slides crammed with text, read word-for-word to the audience",
        description:
          "If your slides are your script, you're doing a reading, not a pitch. The audience will check out by slide 5. More slides doesn't mean more persuasion — it means less attention.",
      },
      {
        label: "good",
        title: "10 clean slides with a clear structure: problem, solution, market, traction, team, ask",
        description:
          "You've got the fundamentals. The structure is right, the slides are focused. But are you telling a story, or just presenting information? The best pitches feel like a conversation.",
      },
      {
        label: "great",
        title: "10 slides that open with a real story, build tension around the problem, and resolve with your solution and proof",
        description:
          "You're not presenting — you're performing a narrative. The audience feels the problem before they see the solution. The data supports the story rather than replacing it. That's a pitch that gets funded.",
      },
    ],
    keyTakeaway:
      "A pitch deck is a story told in 10 slides. If you remove the data and the story still makes sense, you've built a great deck.",
    assignment:
      "Create your 10-slide pitch deck. Use the Pitch Deck Outliner to structure it, then build the actual slides. Bring a complete draft to the next session for group feedback.",
    interactiveElement: {
      type: "builder",
      title: "Pitch Deck Outliner",
      description:
        "Build your 10-slide structure: what goes on each slide and why. Export your outline as a starting point.",
    },
    stats: [
      { value: "10", label: "Slides in a great pitch deck" },
      { value: "3 min", label: "To tell your whole story" },
      { value: "30 sec", label: "To hook your audience" },
    ],
  },
  {
    id: "pitch-rehearsal",
    phase: phase("launch"),
    title: "Pitch Rehearsal & Refinement",
    subtitle: "Practice like it's real. Then make it better.",
    outcome:
      "Deliver your pitch multiple times, receive structured feedback, and refine both your deck and your delivery.",
    description:
      "Building a pitch deck and delivering a pitch are completely different skills. This module is all about practice. You'll deliver your pitch to small groups, receive honest feedback using a structured rubric, refine your slides based on what's landing and what isn't, and sharpen your delivery: pacing, confidence, handling questions, and the art of a strong close. By the end, your pitch will feel natural — not memorized.",
    frameworks: [
      "Presentation Delivery Best Practices — pacing, pausing, emphasis",
      "Structured Feedback Rubric (Clarity, Story, Numbers, Ask, Confidence)",
      "Q&A Handling — how to answer tough questions without losing control",
    ],
    caseStudy: {
      company: "Y Combinator Demo Day",
      insight:
        "The most successful YC companies practice their demo day pitch 50+ times before delivering it. The founders who wing it almost always underperform. Rehearsal isn't about memorization — it's about becoming so comfortable with your material that you can be present, responsive, and human.",
    },
    realWorldExamples: [
      {
        label: "bad",
        title: "\"I'll just wing it — I know my business better than anyone\"",
        description:
          "Knowing your business and communicating it clearly under pressure are completely different skills. The founders who wing it stumble, ramble, and run over time. Every. Single. Time.",
      },
      {
        label: "good",
        title: "Practicing alone 5 times with a timer and refining your notes",
        description:
          "You're building muscle memory and getting your timing right. But practicing alone doesn't prepare you for eye contact, questions, or the energy of a real audience.",
      },
      {
        label: "great",
        title: "Delivering to 3 different audiences, getting structured feedback each time, and refining based on what's landing vs. what isn't",
        description:
          "Each audience teaches you something different. Friends tell you where it's confusing. Mentors tell you where it's weak. Fellow founders tell you where it's unconvincing. By delivery #3, the pitch feels natural, not memorized.",
      },
    ],
    keyTakeaway:
      "Rehearsal isn't memorization — it's freedom. The more you practice, the more you can be present and human instead of reciting a script.",
    assignment:
      "Deliver your pitch 3 times to different audiences (friends, family, fellow participants). After each delivery, document: what felt strong, what stumbled, and one thing to change. Submit your final revised deck.",
    interactiveElement: {
      type: "checklist",
      title: "Pitch Rehearsal Tracker",
      description:
        "Track each practice delivery: who you pitched to, their feedback, and what you refined.",
    },
    stats: [
      { value: "50+", label: "Times YC founders rehearse before Demo Day" },
      { value: "3", label: "Practice deliveries minimum" },
      { value: "5 min", label: "Your final pitch length" },
    ],
  },
  {
    id: "final-pitch-showcase",
    phase: phase("launch"),
    title: "Final Pitch Showcase",
    subtitle: "This is your moment",
    outcome:
      "Deliver your final pitch to a panel of business leaders and receive structured feedback on your business and presentation.",
    description:
      "Everything you've built comes together here. You'll pitch your business to a live panel — not as a student exercise, but as a real entrepreneur presenting a real business. This is your moment to show the clarity, confidence, and credibility you've developed over 17 modules of hard work. The panel includes mentors, business leaders, and CNIB community members who are here to listen, challenge, and support.",
    frameworks: [
      "Investor Presentation Strategies",
      "Public Speaking Under Pressure",
      "Structured Feedback & Next Steps Planning",
    ],
    caseStudy: {
      company: "Shark Tank / Dragons' Den",
      insight:
        "The most successful pitches share one thing: clarity about the problem, the solution, and the ask. The entrepreneurs who get funded aren't always the most polished speakers — they're the ones who clearly understand their business and communicate it with conviction.",
    },
    realWorldExamples: [
      {
        label: "bad",
        title: "Reading your slides to the panel and ending with \"so, yeah, that's my idea\"",
        description:
          "No energy, no confidence, no clear ask. The panel wants to see a founder they believe in — someone who owns their vision. Reading slides tells them you don't.",
      },
      {
        label: "good",
        title: "Delivering a well-practiced pitch with clear structure, good timing, and a specific ask",
        description:
          "Professional, prepared, and competent. You've done the work and it shows. But are you connecting emotionally? Do they feel your conviction?",
      },
      {
        label: "great",
        title: "Opening with your personal story, delivering with conviction, handling Q&A with confidence, and closing with a clear next step",
        description:
          "The panel doesn't just understand your business — they believe in you. Your story is specific. Your numbers are solid. Your ask is clear. And when they push back, you respond with data and composure. That's a founder.",
      },
    ],
    keyTakeaway:
      "This isn't the end of your journey — it's the beginning. The pitch showcase proves you can build, communicate, and lead. What you do next is up to you.",
    assignment:
      "Deliver a 5-minute pitch to fellow participants, mentors, and a panel of business leaders. Receive feedback and leave with a concrete next-steps plan for your business beyond the program.",
    interactiveElement: {
      type: "checklist",
      title: "Pitch Day Checklist",
      description:
        "Everything you need ready: deck, script, timing, outfit, confidence, and a plan for what comes next.",
    },
    stats: [
      { value: "5 min", label: "Your time to shine" },
      { value: "18", label: "Modules of preparation behind you" },
      { value: "∞", label: "Where your business goes from here" },
    ],
  },
];

// ── Helpers ─────────────────����────────────────────────────────

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
