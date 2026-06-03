import { BookOpen } from "lucide-react";
import { Button } from "./Button";
import { ProgressBar } from "./ProgressBar";

export function CourseCard({ course }: { course: { title: string; age: string; price: string; tag: string; progress: number; description: string } }) {
  return (
    <article className="brand-card brand-card-hover p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-babyBlue text-blueDeep">
          <BookOpen className="h-6 w-6" />
        </div>
        <span className="rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold text-blueDeep">{course.tag}</span>
      </div>
      <h3 className="text-xl font-bold leading-snug text-blueDeep">{course.title}</h3>
      <p className="mt-1 text-[0.95rem] font-semibold text-coral">{course.age}</p>
      <p className="mt-3 min-h-16 text-[0.95rem] leading-7 text-ink/75">{course.description}</p>
      <div className="my-5">
        <ProgressBar value={course.progress} />
      </div>
      <div className="flex items-center justify-between gap-3">
        <span className="text-lg font-bold text-blueDeep">{course.price}</span>
        <Button href="/courses" className="px-4 py-2.5">View Course</Button>
      </div>
    </article>
  );
}
