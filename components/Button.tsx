import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  icon?: boolean;
  className?: string;
};

const styles = {
  primary: "bg-blueDeep text-white hover:bg-[#183174]",
  secondary: "bg-coral text-white hover:bg-[#ee5f52]",
  ghost: "bg-white text-blueDeep ring-1 ring-blueDeep/15 hover:bg-beige",
  danger: "bg-alert text-white hover:bg-[#a92122]",
};

export function Button({ href, children, variant = "primary", icon = false, className = "" }: ButtonProps) {
  const classes = `focus-ring inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-sm transition ${styles[variant]} ${className}`;
  const content = (
    <>
      {children}
      {icon ? <ArrowRight className="h-4 w-4" /> : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return <button className={classes}>{content}</button>;
}
