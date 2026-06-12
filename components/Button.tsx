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
  primary: "bg-coral text-white hover:brightness-95",
  secondary: "bg-blueDeep text-white hover:bg-navy",
  ghost: "bg-white text-blueDeep ring-1 ring-borderSoft hover:bg-beige",
  danger: "bg-coral text-white hover:brightness-95",
};

export function Button({ href, children, variant = "primary", icon = false, className = "" }: ButtonProps) {
  const classes = `focus-ring inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-base font-bold leading-none transition-all duration-300 ${styles[variant]} ${className}`;
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
