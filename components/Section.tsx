import { DecorativeDoodles } from "./DecorativeDoodles";

export function Section({
  eyebrow,
  title,
  text,
  children,
  tone = "white",
}: {
  eyebrow?: string;
  title?: string;
  text?: string;
  children: React.ReactNode;
  tone?: "white" | "beige";
}) {
  return (
    <section className={`relative overflow-hidden ${tone === "beige" ? "bg-beige" : "bg-white"}`}>
      <DecorativeDoodles />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        {(eyebrow || title || text) && (
          <div className="mb-10 max-w-2xl">
            {eyebrow ? <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-coral">{eyebrow}</p> : null}
            {title ? <h2 className="text-2xl font-bold leading-tight tracking-tight text-blueDeep sm:text-3xl lg:text-4xl">{title}</h2> : null}
            {text ? <p className="mt-4 text-base leading-8 text-ink/75">{text}</p> : null}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
