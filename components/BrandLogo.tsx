import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  compact?: boolean;
  className?: string;
};

export function BrandLogo({ compact = false, className = "" }: BrandLogoProps) {
  const mark = (
    <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-2xl bg-beige ring-1 ring-borderSoft">
      <Image src="/logo.svg" alt="" width={44} height={44} className="h-full w-full object-cover" priority />
    </span>
  );

  if (compact) {
    return (
      <Link href="/" className={`flex items-center gap-3 text-blueDeep ${className}`} aria-label="Maths with Deepika home">
        {mark}
        <span className="text-lg font-bold leading-tight">Maths with Deepika</span>
      </Link>
    );
  }

  return (
    <Link href="/" className={`inline-flex items-center gap-3 text-blueDeep ${className}`} aria-label="Maths with Deepika home">
      <Image src="/logo.svg" alt="Maths with Deepika" width={132} height={132} className="h-auto w-24 sm:w-28" priority />
    </Link>
  );
}
