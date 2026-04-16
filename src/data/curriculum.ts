export interface Week {
  number: number;
  title: string;
  outcome: string;
  frameworks: string;
  caseStudy: string;
  assignment: string;
}

export const weeks: Week[] = [
  {
    number: 1,
    title: "Entrepreneurial Mindset & Course Overview",
    outcome:
      "Understand the fundamentals of entrepreneurship and set personal and business goals.",
    frameworks: "Carol Dweck's Growth Mindset, Simon Sinek's Start With Why",
    caseStudy: "Sara Blakely's journey in launching Spanx",
    assignment:
      "Develop a 1-minute elevator pitch introducing your business idea.",
  },
  {
    number: 2,
    title: "From Idea to Business Model",
    outcome: "Validate your idea and define your revenue model.",
    frameworks:
      "Lean Startup (Eric Ries), Business Model Canvas (Alexander Osterwalder)",
    caseStudy:
      "Airbnb's pivot from renting air mattresses to a billion-dollar company.",
    assignment: "Complete a Business Model Canvas for your idea.",
  },
  {
    number: 3,
    title: "Market Research & Customer Discovery",
    outcome: "Validate your target market and competitors.",
    frameworks:
      "The Mom Test (Rob Fitzpatrick) \u2014 How to ask customers the right questions.",
    caseStudy:
      "Zappos tested demand by selling shoes online without holding inventory.",
    assignment:
      "Conduct five customer interviews and summarize key insights.",
  },
  {
    number: 4,
    title: "Developing Your Minimum Viable Product (MVP)",
    outcome: "Define and test a simple MVP.",
    frameworks: "Lean Startup's MVP concept",
    caseStudy:
      "Dropbox's early marketing strategy using an explainer video.",
    assignment:
      "Outline an MVP strategy and create a no-cost market test (e.g., landing page, pre-orders).",
  },
  {
    number: 5,
    title: "Business Setup & Legal Foundations",
    outcome:
      "Learn the essentials of setting up a business legally.",
    frameworks:
      "Business entity types (Sole Proprietorship, LLC, Corporation)",
    caseStudy: "How Notion structured its business to ensure growth.",
    assignment:
      "Draft a basic company setup plan and choose a legal structure.",
  },
  {
    number: 6,
    title: "Pricing, Costs & Financial Basics",
    outcome: "Create a pricing strategy and financial projections.",
    frameworks: "Value-Based Pricing, Lean Financial Modeling",
    caseStudy: "Mailchimp's bootstrapped growth strategy.",
    assignment:
      "Develop a simple revenue model and pricing strategy.",
  },
  {
    number: 7,
    title: "Branding & Marketing Strategy",
    outcome:
      "Define your brand identity and create a marketing plan.",
    frameworks:
      "Positioning (Jack Trout), Brand Storytelling (Donald Miller)",
    caseStudy: "Glossier's brand-first approach to marketing.",
    assignment:
      "Develop a brand positioning statement and a digital marketing plan.",
  },
  {
    number: 8,
    title: "Sales & Customer Acquisition",
    outcome: "Learn how to get your first paying customers.",
    frameworks: "Sales Funnels, Direct vs. Inbound Sales Strategies",
    caseStudy:
      "How Tesla built a premium brand without paid advertising.",
    assignment:
      "Write a sales script and test your pitch with three potential customers.",
  },
  {
    number: 9,
    title: "Funding Your Business",
    outcome:
      "Explore funding options and understand investor expectations.",
    frameworks:
      "Bootstrapping vs. Venture Capital, Crowdfunding Models",
    caseStudy:
      "Dollar Shave Club's $5K launch that led to a $1B acquisition.",
    assignment: "Develop a funding strategy for your business.",
  },
  {
    number: 10,
    title: "Business Operations & Scaling",
    outcome: "Learn how to run and scale operations efficiently.",
    frameworks: "Lean Operations, Automation Strategies",
    caseStudy:
      "How Shopify scaled through automation and strategic partnerships.",
    assignment:
      "Identify one key process to automate or optimize.",
  },
  {
    number: 11,
    title: "Pitch Deck Development & Presentation Skills",
    outcome:
      "Create a compelling investor pitch deck and practice storytelling.",
    frameworks:
      "The 10-Slide Investor Pitch Model, Storytelling in Business",
    caseStudy: "Airbnb's original pitch deck and why it worked.",
    assignment:
      "Create a 10-slide pitch deck and practice delivering a 3-minute pitch.",
  },
  {
    number: 12,
    title: "Final Pitch Showcase Preparation",
    outcome:
      "Gain peer and mentor feedback on final pitches to refine delivery and structure.",
    frameworks:
      "Investor Presentation Strategies, Public Speaking Best Practices",
    caseStudy: "Shark Tank's most successful pitch presentations.",
    assignment:
      "Deliver a 5-minute pitch to fellow participants and receive structured feedback.",
  },
];

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: "worksheet" | "podcast" | "guide" | "template";
  fileName?: string;
  downloadUrl?: string;
  relatedWeek?: number;
}

export const resources: Resource[] = [
  {
    id: "elevator-pitch",
    title: "Build Your First Elevator Pitch",
    description:
      "A step-by-step worksheet to help you take your idea and turn it into something simple, clear, and easy to explain in 60-90 seconds.",
    type: "worksheet",
    fileName: "Elevator_Pitch_Worksheet.pdf",
    downloadUrl: "/worksheets/Elevator_Pitch_Worksheet.pdf",
    relatedWeek: 1,
  },
  {
    id: "notebooklm-worksheet",
    title: "How to Use NotebookLM to Create a Pitch Podcast & Investor Deck",
    description:
      "Organize your thinking, upload strong source material, ask better questions, and generate a podcast-style overview and structured pitch deck.",
    type: "guide",
    fileName: "NotebookLM_Student_Worksheet.pdf",
    downloadUrl: "/worksheets/NotebookLM_Student_Worksheet.pdf",
    relatedWeek: 11,
  },
  {
    id: "homework-guide",
    title: "Course Homework & Task Guide",
    description:
      "Complete weekly homework guide with actionable assignments for each of the 12 weeks. Each task takes no more than 60 minutes.",
    type: "template",
    fileName: "Homework_Task_Guide.pdf",
    downloadUrl: "/worksheets/Homework_Task_Guide.pdf",
  },
];
