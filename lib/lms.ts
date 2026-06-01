import "server-only";

import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { AccessLevel, CourseAudience, CourseType } from "@/lib/types";

export type LmsCourse = {
  id: string;
  title: string;
  description: string | null;
  audience: CourseAudience;
  course_type: CourseType;
  order_index: number;
  modules: CourseModule[];
};

export type CourseVideo = {
  id: string;
  module_id: string;
  title: string;
  description: string | null;
  video_url: string | null;
  thumbnail: string | null;
  thumbnail_url?: string | null;
  duration: string | null;
  order_index: number;
  required_access: Exclude<AccessLevel, "none">;
};

export type CourseResource = {
  id: string;
  course_id: string | null;
  module_id: string | null;
  video_id: string | null;
  title: string;
  file_url: string;
  file_type: string;
  required_access: Exclude<AccessLevel, "none">;
  created_at?: string;
};

export type VideoProgress = {
  id: string;
  user_id: string;
  video_id: string;
  watched_seconds: number;
  completed: boolean;
  completed_at: string | null;
  updated_at: string;
};

export type CourseModule = {
  id: string;
  course_id?: string | null;
  title: string;
  description: string | null;
  order_index: number;
  videos: CourseVideo[];
};

type CourseModuleRow = Omit<CourseModule, "videos"> & {
  course_videos: CourseVideo[] | null;
};

type LmsCourseRow = Omit<LmsCourse, "modules"> & {
  course_modules: CourseModuleRow[] | null;
};

type VideoWithCourse = CourseVideo & {
  module: CourseModule;
  course?: LmsCourse;
};

const fallbackModules: CourseModule[] = [
  {
    id: "number-basics",
    title: "Module 1: Number Basics",
    description: "Build comfort with numbers before moving into faster Vedic Maths methods.",
    order_index: 1,
    videos: [
      {
        id: "friendly-numbers",
        module_id: "number-basics",
        title: "Friendly Numbers",
        description: "Understand number pairs and simple mental maths patterns.",
        video_url: null,
        thumbnail: null,
        duration: "12 min",
        order_index: 1,
        required_access: "partial",
      },
      {
        id: "place-value-made-simple",
        module_id: "number-basics",
        title: "Place Value Made Simple",
        description: "A calm revision of place value for teaching children clearly.",
        video_url: null,
        thumbnail: null,
        duration: "15 min",
        order_index: 2,
        required_access: "partial",
      },
    ],
  },
  {
    id: "fast-addition",
    title: "Module 2: Fast Addition",
    description: "Learn simple addition methods that are easy to explain and practise.",
    order_index: 2,
    videos: [
      {
        id: "add-from-left-to-right",
        module_id: "fast-addition",
        title: "Add From Left to Right",
        description: "A beginner-friendly way to build speed without pressure.",
        video_url: null,
        thumbnail: null,
        duration: "18 min",
        order_index: 1,
        required_access: "partial",
      },
      {
        id: "carry-less-think-clearly",
        module_id: "fast-addition",
        title: "Carry Less, Think Clearly",
        description: "Teach addition in a way children can understand step by step.",
        video_url: null,
        thumbnail: null,
        duration: "14 min",
        order_index: 2,
        required_access: "partial",
      },
    ],
  },
  {
    id: "fast-subtraction",
    title: "Module 3: Fast Subtraction",
    description: "Make subtraction lighter with structured Vedic Maths thinking.",
    order_index: 3,
    videos: [
      {
        id: "borrowing-without-stress",
        module_id: "fast-subtraction",
        title: "Borrowing Without Stress",
        description: "A gentle way to reduce fear around subtraction.",
        video_url: null,
        thumbnail: null,
        duration: "16 min",
        order_index: 1,
        required_access: "full",
      },
      {
        id: "check-your-answer",
        module_id: "fast-subtraction",
        title: "Check Your Answer",
        description: "Simple checking routines that build teaching confidence.",
        video_url: null,
        thumbnail: null,
        duration: "10 min",
        order_index: 2,
        required_access: "full",
      },
    ],
  },
  {
    id: "multiplication-tricks",
    title: "Module 4: Multiplication Tricks",
    description: "Learn multiplication patterns that feel clear, visual, and teachable.",
    order_index: 4,
    videos: [
      {
        id: "multiply-near-10",
        module_id: "multiplication-tricks",
        title: "Multiply Near 10",
        description: "Use near-base thinking for faster multiplication.",
        video_url: null,
        thumbnail: null,
        duration: "17 min",
        order_index: 1,
        required_access: "full",
      },
      {
        id: "two-digit-shortcuts",
        module_id: "multiplication-tricks",
        title: "Two Digit Shortcuts",
        description: "Practise simple two-digit multiplication patterns.",
        video_url: null,
        thumbnail: null,
        duration: "20 min",
        order_index: 2,
        required_access: "full",
      },
    ],
  },
];

const fallbackMotherCourses: LmsCourse[] = [
  {
    id: "m2m-program",
    title: "M2M - Mom to Math Mentor Model Program",
    description: "Vedic Maths mentor program for mothers, homemakers, and teachers.",
    audience: "mother",
    course_type: "program",
    order_index: 1,
    modules: fallbackModules,
  },
];

const fallbackKidCourses: LmsCourse[] = [
  {
    id: "addition-subtraction-number-comparison",
    title: "Addition, Subtraction & Number Comparison",
    description: "A topic course for building comfort with basic number operations and comparison.",
    audience: "kid",
    course_type: "topic",
    order_index: 1,
    modules: [
      {
        id: "kid-number-comparison-basics",
        course_id: "addition-subtraction-number-comparison",
        title: "Number Comparison Basics",
        description: "Learn how to compare numbers with calm, guided practice.",
        order_index: 1,
        videos: [
          {
            id: "kid-greater-less-equal",
            module_id: "kid-number-comparison-basics",
            title: "Greater, Less, and Equal",
            description: "Understand comparison signs with simple examples.",
            video_url: null,
            thumbnail: null,
            duration: "10 min",
            order_index: 1,
            required_access: "partial",
          },
          {
            id: "kid-addition-stories",
            module_id: "kid-number-comparison-basics",
            title: "Addition Through Story Questions",
            description: "Practise addition using small story-based questions.",
            video_url: null,
            thumbnail: null,
            duration: "12 min",
            order_index: 2,
            required_access: "partial",
          },
        ],
      },
    ],
  },
  {
    id: "multiplication-division-fractions-basics",
    title: "Multiplication, Division & Fractions Basics",
    description: "A topic course for children who need support in multiplication, division, and early fractions.",
    audience: "kid",
    course_type: "topic",
    order_index: 2,
    modules: [
      {
        id: "kid-multiplication-basics",
        course_id: "multiplication-division-fractions-basics",
        title: "Multiplication Basics",
        description: "Start multiplication with patterns and repeated addition.",
        order_index: 1,
        videos: [
          {
            id: "kid-repeated-addition",
            module_id: "kid-multiplication-basics",
            title: "Repeated Addition",
            description: "See multiplication as repeated addition before memorising tables.",
            video_url: null,
            thumbnail: null,
            duration: "11 min",
            order_index: 1,
            required_access: "partial",
          },
          {
            id: "kid-fractions-first-look",
            module_id: "kid-multiplication-basics",
            title: "Fractions First Look",
            description: "Understand halves, quarters, and simple fraction ideas.",
            video_url: null,
            thumbnail: null,
            duration: "13 min",
            order_index: 2,
            required_access: "full",
          },
        ],
      },
    ],
  },
  {
    id: "factors-multiples-lcm-hcf",
    title: "Factors, Multiples, LCM & HCF",
    description: "A focused topic course for factors, multiples, LCM, and HCF.",
    audience: "kid",
    course_type: "topic",
    order_index: 3,
    modules: [
      {
        id: "kid-factors-multiples",
        course_id: "factors-multiples-lcm-hcf",
        title: "Factors and Multiples",
        description: "Build clarity through examples, patterns, and guided practice.",
        order_index: 1,
        videos: [
          {
            id: "kid-factors-made-clear",
            module_id: "kid-factors-multiples",
            title: "Factors Made Clear",
            description: "Learn what factors mean and how to find them.",
            video_url: null,
            thumbnail: null,
            duration: "14 min",
            order_index: 1,
            required_access: "full",
          },
        ],
      },
    ],
  },
  {
    id: "algebra-linear-equations",
    title: "Algebra & Linear Equations",
    description: "A step-by-step topic course for beginning algebra and simple equations.",
    audience: "kid",
    course_type: "topic",
    order_index: 4,
    modules: [
      {
        id: "kid-algebra-basics",
        course_id: "algebra-linear-equations",
        title: "Algebra Basics",
        description: "Make variables and equations feel less scary.",
        order_index: 1,
        videos: [
          {
            id: "kid-what-is-a-variable",
            module_id: "kid-algebra-basics",
            title: "What is a Variable?",
            description: "Understand letters in maths with simple real examples.",
            video_url: null,
            thumbnail: null,
            duration: "15 min",
            order_index: 1,
            required_access: "full",
          },
        ],
      },
    ],
  },
];

export function canAccess(requiredAccess: Exclude<AccessLevel, "none">, accessLevel: AccessLevel) {
  if (accessLevel === "full") return true;
  return accessLevel === "partial" && requiredAccess === "partial";
}

export function normalizeAccessLevel(accessLevel: AccessLevel | null | undefined): AccessLevel {
  return accessLevel ?? "none";
}

function mapCourseRows(courses: LmsCourseRow[]): LmsCourse[] {
  return courses.map((course) => ({
    id: course.id,
    title: course.title,
    description: course.description,
    audience: course.audience,
    course_type: course.course_type,
    order_index: course.order_index,
    modules: (course.course_modules ?? [])
      .sort((a, b) => a.order_index - b.order_index)
      .map((module) => ({
        id: module.id,
        course_id: module.course_id,
        title: module.title,
        description: module.description,
        order_index: module.order_index,
        videos: (module.course_videos ?? []).sort((a, b) => a.order_index - b.order_index),
      })),
  }));
}

export async function getMotherCourses(): Promise<LmsCourse[]> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("courses")
    .select("id, title, description, audience, course_type, order_index, course_modules(id, course_id, title, description, order_index, course_videos(id, module_id, title, description, video_url, thumbnail, thumbnail_url, duration, order_index, required_access))")
    .eq("audience", "mother")
    .order("order_index", { ascending: true })
    .order("order_index", { referencedTable: "course_modules", ascending: true })
    .order("order_index", { referencedTable: "course_modules.course_videos", ascending: true })
    .returns<LmsCourseRow[]>();

  if (error || !data?.length) {
    return fallbackMotherCourses;
  }

  return mapCourseRows(data);
}

export async function getMotherCourseModules(): Promise<CourseModule[]> {
  const courses = await getMotherCourses();
  const modules = courses.flatMap((course) => course.modules);

  return modules.length ? modules : fallbackModules;
}

export async function getKidCourses(): Promise<LmsCourse[]> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("courses")
    .select("id, title, description, audience, course_type, order_index, course_modules(id, course_id, title, description, order_index, course_videos(id, module_id, title, description, video_url, thumbnail, thumbnail_url, duration, order_index, required_access))")
    .eq("audience", "kid")
    .order("order_index", { ascending: true })
    .order("order_index", { referencedTable: "course_modules", ascending: true })
    .order("order_index", { referencedTable: "course_modules.course_videos", ascending: true })
    .returns<LmsCourseRow[]>();

  if (error || !data?.length) {
    return fallbackKidCourses;
  }

  return mapCourseRows(data);
}

export async function getMotherVideo(videoId: string) {
  const modules = await getMotherCourseModules();
  const videos = modules.flatMap((module) => module.videos.map((video) => ({ ...video, module })));
  const index = videos.findIndex((video) => video.id === videoId);

  if (index === -1) {
    return null;
  }

  return {
    video: videos[index],
    modules,
    previousVideo: videos[index - 1] ?? null,
    nextVideo: videos[index + 1] ?? null,
  };
}

export async function getKidVideo(videoId: string) {
  const courses = await getKidCourses();
  const videos = courses.flatMap((course) =>
    course.modules.flatMap((module) => module.videos.map((video) => ({ ...video, module, course }))),
  );
  const index = videos.findIndex((video) => video.id === videoId);

  if (index === -1) {
    return null;
  }

  return {
    video: videos[index],
    courses,
    previousVideo: videos[index - 1] ?? null,
    nextVideo: videos[index + 1] ?? null,
  };
}

export function getCourseCollectionStats(courses: LmsCourse[], accessLevel: AccessLevel) {
  const modules = courses.flatMap((course) => course.modules);
  return getCourseStats(modules, accessLevel);
}

export function flattenModules(modules: CourseModule[]): VideoWithCourse[] {
  return modules.flatMap((module) => module.videos.map((video) => ({ ...video, module })));
}

export function flattenCourses(courses: LmsCourse[]): VideoWithCourse[] {
  return courses.flatMap((course) =>
    course.modules.flatMap((module) => module.videos.map((video) => ({ ...video, module, course }))),
  );
}

export async function getVideoProgress(userId: string, videoIds: string[]): Promise<Record<string, VideoProgress>> {
  if (!videoIds.length) return {};

  const supabase = createSupabaseAdminClient();
  const { data } = await supabase
    .from("video_progress")
    .select("id, user_id, video_id, watched_seconds, completed, completed_at, updated_at")
    .eq("user_id", userId)
    .in("video_id", videoIds)
    .returns<VideoProgress[]>();

  return Object.fromEntries((data ?? []).map((item) => [item.video_id, item]));
}

export async function getResources(filters: { courseIds?: string[]; moduleIds?: string[]; videoIds?: string[] }) {
  const supabase = createSupabaseAdminClient();
  const list = (values: string[]) => `(${values.map((value) => `"${value}"`).join(",")})`;
  const clauses = [
    ...(filters.courseIds?.length ? [`course_id.in.${list(filters.courseIds)}`] : []),
    ...(filters.moduleIds?.length ? [`module_id.in.${list(filters.moduleIds)}`] : []),
    ...(filters.videoIds?.length ? [`video_id.in.${list(filters.videoIds)}`] : []),
  ];

  if (!clauses.length) return [] as CourseResource[];

  const { data } = await supabase
    .from("course_resources")
    .select("id, course_id, module_id, video_id, title, file_url, file_type, required_access, created_at")
    .or(clauses.join(","))
    .order("created_at", { ascending: false })
    .returns<CourseResource[]>();

  return data ?? [];
}

export function getCompletionStats(videos: CourseVideo[], progress: Record<string, VideoProgress>) {
  const total = videos.length;
  const completed = videos.filter((video) => progress[video.id]?.completed).length;

  return {
    total,
    completed,
    progress: total ? Math.round((completed / total) * 100) : 0,
  };
}

export function getContinueVideo(videos: CourseVideo[], accessLevel: AccessLevel, progress: Record<string, VideoProgress>) {
  return videos.find((video) => canAccess(video.required_access, accessLevel) && !progress[video.id]?.completed)
    ?? videos.find((video) => canAccess(video.required_access, accessLevel));
}

export function getCourseStats(modules: CourseModule[], accessLevel: AccessLevel) {
  const videos = modules.flatMap((module) => module.videos);
  const unlocked = videos.filter((video) => canAccess(video.required_access, accessLevel)).length;
  const total = videos.length;

  return {
    total,
    unlocked,
    locked: total - unlocked,
    progress: total ? Math.round((unlocked / total) * 100) : 0,
  };
}
