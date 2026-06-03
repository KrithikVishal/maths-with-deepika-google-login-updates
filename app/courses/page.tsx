import { BadgeCheck } from "lucide-react";
import { CourseCard } from "@/components/CourseCard";
import { LessonCard } from "@/components/LessonCard";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { courses, modules } from "@/data/mock";

export default function CoursesPage() {
  return (
    <PageShell>
      <Section tone="beige" eyebrow="Courses" title="Vedic Maths courses with lessons, PDFs, and worksheets" text="Choose a course, continue lessons, and keep all practice downloads in one place.">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => <CourseCard key={course.title} course={course} />)}
        </div>
      </Section>

      <Section eyebrow="Course preview" title="Vedic Maths Foundation">
        <div className="mb-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-soft border border-borderSoft bg-white p-5 shadow-soft">
            <span className="inline-flex items-center gap-2 rounded-full bg-gold/25 px-3 py-1 text-xs font-bold text-blueDeep">
              <BadgeCheck className="h-4 w-4" />
              Full Access
            </span>
            <p className="mt-4 text-sm leading-6 text-ink/70">All lessons unlocked after full payment. PDFs and worksheets are ready to download.</p>
          </div>
          <div className="rounded-soft border border-borderSoft bg-white p-5 shadow-soft">
            <span className="inline-flex items-center gap-2 rounded-full bg-coral/10 px-3 py-1 text-xs font-bold text-coral">
              <BadgeCheck className="h-4 w-4" />
              Partial Access
            </span>
            <p className="mt-4 text-sm leading-6 text-ink/70">Selected lessons unlocked after half payment. Remaining lessons stay locked until full payment.</p>
          </div>
        </div>
        <div className="grid gap-6">
          {modules.map((module) => (
            <div key={module.name} className="rounded-[1.5rem] bg-beige/50 p-4 sm:p-5">
              <h3 className="mb-4 text-lg font-bold text-blueDeep">{module.name}</h3>
              <div className="grid gap-4">
                {module.lessons.map((lesson) => <LessonCard key={lesson.title} lesson={lesson} />)}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
