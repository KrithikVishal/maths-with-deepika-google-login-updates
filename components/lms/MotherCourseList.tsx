import { BookOpenCheck } from "lucide-react";
import { CourseResource, LmsCourse, VideoProgress } from "@/lib/lms";
import { AccessLevel } from "@/lib/types";
import { MotherModuleList } from "@/components/lms/MotherModuleList";

export function MotherCourseList({
  courses,
  accessLevel,
  progress = {},
  resources = [],
  dashboardPath,
}: {
  courses: LmsCourse[];
  accessLevel: AccessLevel;
  progress?: Record<string, VideoProgress>;
  resources?: CourseResource[];
  dashboardPath?: string;
}) {
  return (
    <div className="grid gap-6">
      {courses.map((course) => (
        <article key={course.id} className="rounded-[2rem] bg-white p-5 shadow-soft ring-1 ring-blueDeep/10 md:p-6">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-coral">{course.course_type}</p>
              <h3 className="mt-2 text-2xl font-bold text-blueDeep">{course.title}</h3>
              {course.description ? <p className="mt-2 max-w-3xl text-sm leading-6 text-ink/65">{course.description}</p> : null}
            </div>
            <span className="rounded-full bg-beige px-4 py-2 text-xs font-bold text-blueDeep">
              {course.modules.length} module{course.modules.length === 1 ? "" : "s"}
            </span>
          </div>

          {course.modules.length ? (
            <MotherModuleList modules={course.modules} accessLevel={accessLevel} progress={progress} resources={resources} dashboardPath={dashboardPath} />
          ) : (
            <div className="rounded-2xl bg-beige/65 p-5">
              <BookOpenCheck className="h-7 w-7 text-coral" />
              <p className="mt-3 font-bold text-blueDeep">No modules added yet</p>
              <p className="mt-2 text-sm leading-6 text-ink/65">This course is visible now. Add modules and videos from the admin dashboard to start filling it.</p>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
