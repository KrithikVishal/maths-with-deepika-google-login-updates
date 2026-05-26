import Image from "next/image";

export function FounderPhotoFrame({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`rounded-[1.75rem] bg-gradient-to-br from-beige via-white to-coral/10 p-3 ${className}`}>
        <div className="relative aspect-square overflow-hidden rounded-[1.35rem] bg-beige shadow-sm ring-1 ring-blueDeep/10">
          <Image
            src="/image.jpg"
            alt="Deepika, founder of Maths with Deepika"
            fill
            sizes="(min-width: 1024px) 420px, 90vw"
            className="object-cover object-center"
            priority={priority}
          />
        </div>
    </div>
  );
}
