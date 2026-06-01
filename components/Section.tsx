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
    <section className={tone === "beige" ? "bg-beige/55" : "bg-white"}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {(eyebrow || title || text) && (
          <div className="mb-10 max-w-2xl">
            {eyebrow ? <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-coral">{eyebrow}</p> : null}
            {title ? <h2 className="text-3xl font-bold tracking-tight text-blueDeep sm:text-4xl">{title}</h2> : null}
            {text ? <p className="mt-4 text-base leading-7 text-ink/70">{text}</p> : null}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
