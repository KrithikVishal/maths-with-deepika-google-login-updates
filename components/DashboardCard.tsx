export function DashboardCard({
  title,
  value,
  note,
  children,
}: {
  title: string;
  value?: string;
  note?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="rounded-soft border border-borderSoft bg-white p-6 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-blueDeep">{title}</h3>
          {value ? <p className="mt-2 text-3xl font-bold text-ink">{value}</p> : null}
          {note ? <p className="mt-2 text-sm text-ink/65">{note}</p> : null}
        </div>
      </div>
      {children ? <div className="mt-5">{children}</div> : null}
    </section>
  );
}
