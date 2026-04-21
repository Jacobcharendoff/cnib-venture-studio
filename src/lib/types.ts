export interface Profile {
  id: string;
  full_name: string | null;
  display_name: string | null;
  avatar_url: string | null;
  accessibility_preferences: {
    high_contrast: boolean;
    reduced_motion: boolean;
    screen_reader_optimized: boolean;
    font_size_multiplier: number;
  };
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  tagline: string | null;
  description: string | null;
  is_published: boolean;
  is_free: boolean;
  total_modules: number;
  total_lessons: number;
  estimated_hours: number | null;
  created_at: string;
  updated_at: string;
}

export interface Module {
  id: string;
  course_id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  sort_order: number;
  total_lessons: number;
  unlock_rule: "sequential" | "immediate" | "date";
  unlock_after_module: string | null;
  created_at: string;
}

export interface Lesson {
  id: string;
  module_id: string;
  slug: string;
  title: string;
  lesson_number: number;
  global_lesson_number: number;
  content_type: "lesson" | "worksheet" | "quiz" | "case_study";
  content_mdx: string | null;
  summary: string | null;
  estimated_minutes: number;
  has_worksheet: boolean;
  has_quiz: boolean;
  worksheet_url: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface LessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  status: "not_started" | "in_progress" | "completed";
  started_at: string | null;
  completed_at: string | null;
  time_spent_seconds: number;
  last_position: string | null;
  created_at: string;
  updated_at: string;
}

export interface ModuleProgress {
  id: string;
  user_id: string;
  module_id: string;
  status: "locked" | "available" | "in_progress" | "completed";
  lessons_completed: number;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  status: "active" | "completed" | "paused";
  enrolled_at: string;
  completed_at: string | null;
  overall_progress: number;
  current_lesson_id: string | null;
}

export interface Achievement {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string | null;
  category: "progress" | "milestone" | "streak";
  created_at: string;
}

export interface QuizAttempt {
  id: string;
  user_id: string;
  lesson_id: string;
  score: number;
  passed: boolean;
  answers: Record<string, string>;
  attempt_number: number;
  completed_at: string;
}

// Module with color mapping
export const MODULE_COLORS: Record<string, { color: string; className: string }> = {
  discover: { color: "#2997FF", className: "text-discover" },
  design: { color: "#5AC8FA", className: "text-design" },
  money: { color: "#FFD60A", className: "text-money" },
  brand: { color: "#BF5AF2", className: "text-brand" },
  sell: { color: "#FF453A", className: "text-sell" },
  launch: { color: "#30D158", className: "text-launch" },
};

export const MODULE_GRADIENTS: Record<string, string> = {
  discover: "from-[#2997FF] to-[#0071E3]",
  design: "from-[#5AC8FA] to-[#007AFF]",
  money: "from-[#FFD60A] to-[#FF9F0A]",
  brand: "from-[#BF5AF2] to-[#8944C6]",
  sell: "from-[#FF453A] to-[#D70015]",
  launch: "from-[#30D158] to-[#248A3D]",
};