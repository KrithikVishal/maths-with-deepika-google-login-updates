import { Mail } from "lucide-react";
import { PageShell } from "@/components/PageShell";

function InstagramLogo({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect width="16" height="16" x="4" y="4" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="3.25" stroke="currentColor" strokeWidth="2" />
      <circle cx="17" cy="7" r="1" fill="currentColor" />
    </svg>
  );
}

function YouTubeLogo({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 8.2a3.2 3.2 0 0 0-2.25-2.28C16.76 5.38 12 5.38 12 5.38s-4.76 0-6.75.54A3.2 3.2 0 0 0 3 8.2 33.2 33.2 0 0 0 2.46 12 33.2 33.2 0 0 0 3 15.8a3.2 3.2 0 0 0 2.25 2.28c1.99.54 6.75.54 6.75.54s4.76 0 6.75-.54A3.2 3.2 0 0 0 21 15.8a33.2 33.2 0 0 0 .54-3.8A33.2 33.2 0 0 0 21 8.2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="m10.25 9.5 4.6 2.5-4.6 2.5v-5Z" fill="currentColor" />
    </svg>
  );
}

const contactOptions = [
  {
    platform: "Instagram",
    handle: "@maths.with.deepika",
    button: "Open Instagram",
    href: "https://instagram.com/maths.with.deepika",
    icon: InstagramLogo,
    note: "Warm updates, parent stories, and community moments.",
  },
  {
    platform: "YouTube",
    handle: "Maths with Deepika",
    button: "Open YouTube",
    href: "https://youtube.com/@maths.with.deepika",
    icon: YouTubeLogo,
    note: "Learning support, maths videos, and guided teaching.",
  },
  {
    platform: "Email",
    handle: "vedicmathswithdeepika@gmail.com",
    button: "Send Email",
    href: "mailto:vedicmathswithdeepika@gmail.com",
    icon: Mail,
    note: "Direct help for courses, products, and learning support.",
  },
];

export default function ContactPage() {
  return (
    <PageShell>
      <section className="bg-gradient-to-br from-beige/80 via-white to-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-coral">Contact Us</p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-blueDeep sm:text-5xl">
              We&apos;re happy to help.
            </h1>
            <div className="mt-5 max-w-2xl space-y-3 text-base leading-7 text-ink/72">
              <p>Have a question about our courses, bootcamps, workbooks, or learning support?</p>
              <p>You can connect with us here.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid items-stretch gap-6 md:grid-cols-3">
            {contactOptions.map(({ platform, handle, button, href, icon: Icon, note }) => (
              <article
                key={platform}
                className="group flex h-full flex-col rounded-soft bg-white p-6 shadow-soft ring-1 ring-blueDeep/10 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-coral/10 text-coral">
                  <Icon className="h-7 w-7" />
                </div>
                <div className="flex flex-1 flex-col pt-6">
                  <h2 className="text-xl font-bold text-blueDeep">{platform}</h2>
                  <p className="mt-2 break-words text-sm font-semibold text-coral">{handle}</p>
                  <p className="mt-4 flex-1 text-sm leading-6 text-ink/68">{note}</p>
                  <a
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                    className="focus-ring mt-6 inline-flex items-center justify-center rounded-full bg-blueDeep px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#183174]"
                  >
                    {button}
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-3xl rounded-[2rem] bg-beige/70 px-6 py-7 text-center shadow-soft ring-1 ring-blueDeep/10">
            <p className="text-lg font-bold leading-8 text-blueDeep">
              We&apos;ll be happy to help you choose the right learning support for you or your child.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
