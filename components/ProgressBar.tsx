export function ProgressBar({ value, label }: { value: number; label?: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-semibold text-ink/70">
        <span>{label ?? "Progress"}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-beige">
        <div className="h-full rounded-full bg-gold transition-all" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
