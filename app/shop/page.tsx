import {
  BookOpenCheck,
  GraduationCap,
  HeartHandshake,
  NotebookTabs,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/Button";
import { PageShell } from "@/components/PageShell";

const programs = [
  {
    id: "m2m-program",
    title: "M2M - Mom to Math Mentor Model Program",
    description:
      "A Vedic Maths mentor program for homemakers, mothers, and teachers who want to learn Vedic Maths and build teaching confidence.",
    button: "Explore M2M Program",
    href: "/for-mothers",
    icon: HeartHandshake,
    visual: "Mentor confidence",
  },
  {
    id: "bootcamps",
    title: "5-Day Maths Bootcamps",
    description:
      "Short, topic-based maths bootcamps for children who need support in specific maths concepts.",
    button: "Explore Bootcamps",
    href: "/bootcamp",
    icon: GraduationCap,
    visual: "Guided practice",
  },
  {
    id: "jolly-maths-pack",
    title: "Jolly Maths Pack",
    description:
      "A fun-based hard copy maths workbook series with 100 worksheets in every level, answer key, and 6 months WhatsApp support.",
    button: "View Jolly Maths Pack",
    href: "/jolly-maths-pack",
    icon: NotebookTabs,
    visual: "Workbook practice",
  },
  {
    id: "maths-starter-kit",
    title: "Maths Starter Kit",
    description:
      "A digital reusable maths activity kit for children aged 5-8 to build strong foundational maths skills through joyful practice.",
    button: "Get Maths Starter Kit",
    href: "/digital-products",
    icon: BookOpenCheck,
    visual: "Joyful foundation",
  },
];

export default function ShopPage() {
  return (
    <PageShell>
      <section className="bg-gradient-to-br from-beige/80 via-white to-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-coral">Programs & Products</p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-blueDeep sm:text-5xl">
              Explore Our Programs & Products
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-ink/72">
              Choose the program or product that fits your current learning need.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-coral">Choose your path</p>
            <h2 className="text-3xl font-bold tracking-tight text-blueDeep sm:text-4xl">
              Programs and products for mothers, parents, and children
            </h2>
          </div>

          <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-4">
            {programs.map(({ id, title, description, button, href, icon: Icon, visual }) => (
              <article
                id={id}
                key={title}
                className="group flex h-full scroll-mt-24 flex-col rounded-soft bg-white p-6 shadow-soft ring-1 ring-blueDeep/10 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="rounded-[1.5rem] bg-gradient-to-br from-beige to-white p-4">
                  <div className="flex min-h-32 flex-col justify-between rounded-2xl bg-white p-4 shadow-sm">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-coral/10 text-coral">
                      <Icon className="h-7 w-7" />
                    </div>
                    <div className="mt-5 flex items-center gap-2 text-xs font-bold text-blueDeep">
                      <Sparkles className="h-4 w-4 text-gold" />
                      {visual}
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col pt-6">
                  <h3 className="text-xl font-bold leading-7 text-blueDeep">{title}</h3>
                  <p className="mt-4 flex-1 text-sm leading-7 text-ink/68">{description}</p>
                  <Button href={href} variant={id === "jolly-maths-pack" ? "secondary" : "primary"} className="mt-6 w-full">
                    {button}
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
