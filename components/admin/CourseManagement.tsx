"use client";

import { BookOpenCheck, FileText, PlayCircle, Plus, Trash2 } from "lucide-react";
import { addCourseAction, addModuleAction, addResourceAction, addVideoAction, deleteLmsItemAction } from "@/app/actions/admin";
import { CourseResource, LmsCourse } from "@/lib/lms";

export function CourseManagement({ courses, resources }: { courses: LmsCourse[]; resources: CourseResource[] }) {
  const modules = courses.flatMap((course) => course.modules.map((module) => ({ ...module, courseTitle: course.title })));
  const videos = modules.flatMap((module) => module.videos.map((video) => ({ ...video, moduleTitle: module.title })));

  return (
    <div className="grid gap-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <form action={addCourseAction} className="rounded-soft bg-white p-6 shadow-soft">
          <Plus className="h-7 w-7 text-coral" />
          <h3 className="mt-4 text-xl font-bold text-blueDeep">Create course</h3>
          <div className="mt-5 grid gap-3">
            <input name="title" required placeholder="Course title" className="focus-ring rounded-2xl border border-blueDeep/10 px-4 py-3" />
            <textarea name="description" placeholder="Description" className="focus-ring min-h-24 rounded-2xl border border-blueDeep/10 px-4 py-3" />
            <div className="grid gap-3 sm:grid-cols-3">
              <select name="audience" className="focus-ring rounded-2xl border border-blueDeep/10 px-4 py-3">
                <option value="mother">mother</option>
                <option value="kid">kid</option>
              </select>
              <select name="course_type" className="focus-ring rounded-2xl border border-blueDeep/10 px-4 py-3">
                <option value="program">program</option>
                <option value="topic">topic</option>
              </select>
              <input name="order_index" type="number" placeholder="Order" className="focus-ring rounded-2xl border border-blueDeep/10 px-4 py-3" />
            </div>
            <button className="focus-ring rounded-full bg-blueDeep px-5 py-3 text-sm font-semibold text-white">Save course</button>
          </div>
        </form>

        <form action={addModuleAction} className="rounded-soft bg-white p-6 shadow-soft">
          <BookOpenCheck className="h-7 w-7 text-coral" />
          <h3 className="mt-4 text-xl font-bold text-blueDeep">Create module</h3>
          <div className="mt-5 grid gap-3">
            <select name="course_id" required className="focus-ring rounded-2xl border border-blueDeep/10 px-4 py-3">
              <option value="">Select course</option>
              {courses.map((course) => <option key={course.id} value={course.id}>{course.title}</option>)}
            </select>
            <input name="title" required placeholder="Module title" className="focus-ring rounded-2xl border border-blueDeep/10 px-4 py-3" />
            <textarea name="description" placeholder="Description" className="focus-ring min-h-24 rounded-2xl border border-blueDeep/10 px-4 py-3" />
            <input name="order_index" type="number" placeholder="Order index" className="focus-ring rounded-2xl border border-blueDeep/10 px-4 py-3" />
            <button className="focus-ring rounded-full bg-blueDeep px-5 py-3 text-sm font-semibold text-white">Save module</button>
          </div>
        </form>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <form action={addVideoAction} className="rounded-soft bg-white p-6 shadow-soft">
          <PlayCircle className="h-7 w-7 text-coral" />
          <h3 className="mt-4 text-xl font-bold text-blueDeep">Add video</h3>
          <div className="mt-5 grid gap-3">
            <select name="module_id" required className="focus-ring rounded-2xl border border-blueDeep/10 px-4 py-3">
              <option value="">Select module</option>
              {modules.map((module) => <option key={module.id} value={module.id}>{module.courseTitle} - {module.title}</option>)}
            </select>
            <input name="title" required placeholder="Video title" className="focus-ring rounded-2xl border border-blueDeep/10 px-4 py-3" />
            <textarea name="description" placeholder="Description" className="focus-ring min-h-24 rounded-2xl border border-blueDeep/10 px-4 py-3" />
            <input name="video_url" placeholder="Video URL" className="focus-ring rounded-2xl border border-blueDeep/10 px-4 py-3" />
            <input name="thumbnail_url" placeholder="Thumbnail URL" className="focus-ring rounded-2xl border border-blueDeep/10 px-4 py-3" />
            <div className="grid gap-3 sm:grid-cols-2">
              <select name="required_access" className="focus-ring rounded-2xl border border-blueDeep/10 px-4 py-3">
                <option value="partial">partial</option>
                <option value="full">full</option>
              </select>
              <input name="order_index" type="number" placeholder="Order index" className="focus-ring rounded-2xl border border-blueDeep/10 px-4 py-3" />
            </div>
            <button className="focus-ring rounded-full bg-blueDeep px-5 py-3 text-sm font-semibold text-white">Save video</button>
          </div>
        </form>

        <form action={addResourceAction} className="rounded-soft bg-white p-6 shadow-soft">
          <FileText className="h-7 w-7 text-coral" />
          <h3 className="mt-4 text-xl font-bold text-blueDeep">Add worksheet/PDF</h3>
          <div className="mt-5 grid gap-3">
            <input name="title" required placeholder="Resource title" className="focus-ring rounded-2xl border border-blueDeep/10 px-4 py-3" />
            <input name="file_url" required placeholder="File URL" className="focus-ring rounded-2xl border border-blueDeep/10 px-4 py-3" />
            <input name="file_type" placeholder="pdf / worksheet" className="focus-ring rounded-2xl border border-blueDeep/10 px-4 py-3" />
            <select name="course_id" className="focus-ring rounded-2xl border border-blueDeep/10 px-4 py-3">
              <option value="">Attach to course</option>
              {courses.map((course) => <option key={course.id} value={course.id}>{course.title}</option>)}
            </select>
            <select name="module_id" className="focus-ring rounded-2xl border border-blueDeep/10 px-4 py-3">
              <option value="">Attach to module</option>
              {modules.map((module) => <option key={module.id} value={module.id}>{module.title}</option>)}
            </select>
            <select name="video_id" className="focus-ring rounded-2xl border border-blueDeep/10 px-4 py-3">
              <option value="">Attach to video</option>
              {videos.map((video) => <option key={video.id} value={video.id}>{video.title}</option>)}
            </select>
            <select name="required_access" className="focus-ring rounded-2xl border border-blueDeep/10 px-4 py-3">
              <option value="partial">partial</option>
              <option value="full">full</option>
            </select>
            <button className="focus-ring rounded-full bg-blueDeep px-5 py-3 text-sm font-semibold text-white">Save resource</button>
          </div>
        </form>
      </div>

      <div className="rounded-soft bg-white p-6 shadow-soft">
        <h3 className="text-xl font-bold text-blueDeep">Existing LMS content</h3>
        <div className="mt-5 grid gap-4">
          {courses.map((course) => (
            <div key={course.id} className="rounded-2xl bg-beige/55 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-blueDeep">{course.title}</p>
                  <p className="text-sm text-ink/65">{course.audience} / {course.course_type}</p>
                </div>
                <DeleteButton table="courses" id={course.id} />
              </div>
              <div className="mt-4 grid gap-3">
                {course.modules.map((module) => (
                  <div key={module.id} className="rounded-2xl bg-white p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="font-bold text-blueDeep">{module.title}</p>
                      <DeleteButton table="course_modules" id={module.id} />
                    </div>
                    <div className="mt-3 grid gap-2">
                      {module.videos.map((video) => (
                        <div key={video.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-beige/60 px-3 py-2 text-sm">
                          <span className="font-semibold text-blueDeep">{video.title} ({video.required_access})</span>
                          <DeleteButton table="course_videos" id={video.id} small />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {resources.length ? (
            <div className="rounded-2xl bg-beige/55 p-4">
              <p className="font-bold text-blueDeep">Resources</p>
              <div className="mt-3 grid gap-2">
                {resources.map((resource) => (
                  <div key={resource.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white px-3 py-2 text-sm">
                    <span className="font-semibold text-blueDeep">{resource.title} ({resource.required_access})</span>
                    <DeleteButton table="course_resources" id={resource.id} small />
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function DeleteButton({ table, id, small = false }: { table: string; id: string; small?: boolean }) {
  return (
    <form action={deleteLmsItemAction}>
      <input type="hidden" name="table" value={table} />
      <input type="hidden" name="id" value={id} />
      <button className={`focus-ring inline-flex items-center gap-2 rounded-full bg-white font-bold text-blueDeep shadow-sm ring-1 ring-blueDeep/15 ${small ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"}`}>
        <Trash2 className="h-3.5 w-3.5 text-coral" />
        Delete
      </button>
    </form>
  );
}
