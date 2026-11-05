import Image from "next/image";
import type { Project } from "@/app/data/projects";

// Fills its (relative, overflow-hidden) parent. A rotated cover is scaled up
// so the rotated image still covers the whole frame without empty corners.
export function CoverImage({
  cover,
  sizes,
  className = "",
}: {
  cover: NonNullable<Project["cover"]>;
  sizes: string;
  className?: string;
}) {
  const deg = cover.rotate ?? 0;
  const rad = (Math.abs(deg) * Math.PI) / 180;
  // Cover a 4:3 frame: scale = (w·|cos| + h·|sin|) / min(w, h) with w=4, h=3
  const scale = deg ? (4 * Math.cos(rad) + 3 * Math.sin(rad)) / 3 : 1;

  return (
    <div
      className="absolute inset-0"
      style={
        deg
          ? { transform: `rotate(${deg}deg) scale(${scale.toFixed(3)})` }
          : undefined
      }
    >
      <Image
        src={cover.src}
        alt={cover.alt}
        fill
        // A rotated cover is drawn larger, so ask for a larger image to stay sharp
        sizes={
          deg
            ? // scale the slot widths, not the media-query breakpoints
              sizes.replace(
                /(^|\)\s*|,\s*)(\d+)(px|vw)/g,
                (_, pre, n, u) => `${pre}${Math.ceil(Number(n) * scale)}${u}`,
              )
            : sizes
        }
        className={`object-cover ${className}`}
      />
    </div>
  );
}
