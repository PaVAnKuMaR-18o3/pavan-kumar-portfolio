import Image from "next/image";
import { Camera } from "lucide-react";

type Accent = "investigate" | "system" | "protect";

const accentText: Record<Accent, string> = {
  investigate: "text-investigate",
  system: "text-system",
  protect: "text-protect",
};

const accentBorder: Record<Accent, string> = {
  investigate: "border-investigate/40",
  system: "border-system/40",
  protect: "border-protect/40",
};

export type EvidenceMetadataItem = { label: string; value: string };

/**
 * A framed evidence artifact. Pass `image` once a real screenshot exists —
 * everything else about the frame (border, caption bar, corner marks,
 * metadata) stays identical, so wiring in real evidence later is a one-line
 * data change, not a redesign.
 */
export default function EvidenceFrame({
  number,
  title,
  source,
  eventId,
  image,
  imageAlt,
  caption,
  metadata,
  focal = "center",
  aspect = "aspect-[4/3]",
  className = "",
  accent = "investigate",
  priority = false,
}: {
  number?: string;
  title: string;
  source?: string;
  eventId?: string;
  image?: string;
  imageAlt?: string;
  caption?: string;
  metadata?: EvidenceMetadataItem[];
  focal?: string;
  aspect?: string;
  className?: string;
  accent?: Accent;
  priority?: boolean;
}) {
  return (
    <div className={`border border-line bg-surface ${className}`}>
      <div className="flex items-center justify-between border-b border-line px-4 md:px-5 py-3.5">
        <span className="label text-muted">
          {number && <span className={accentText[accent]}>Evidence / {number}</span>}
          {!number && "Evidence"}
        </span>
        {eventId && <span className="font-mono text-xs text-muted">Event {eventId}</span>}
      </div>

      <div className={`relative w-full ${aspect} overflow-hidden`}>
        {image ? (
          <Image
            src={image}
            alt={imageAlt ?? `${title} — real project evidence`}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 70vw, 100vw"
            style={{ objectFit: "cover", objectPosition: focal }}
          />
        ) : (
          <div className="absolute inset-0" role="img" aria-label={`Placeholder for ${title}. Real project evidence will be added here.`}>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(#292825 1px, transparent 1px), linear-gradient(90deg, #292825 1px, transparent 1px)",
                backgroundSize: "32px 32px",
                opacity: 0.3,
              }}
              aria-hidden="true"
            />

            {/* Corner marks — gives the placeholder an "artifact" feel rather than a broken image */}
            {(["top-3 left-3 border-t border-l", "top-3 right-3 border-t border-r", "bottom-3 left-3 border-b border-l", "bottom-3 right-3 border-b border-r"] as const).map(
              (pos) => (
                <span
                  key={pos}
                  className={`absolute h-4 w-4 md:h-5 md:w-5 ${pos} ${accentBorder[accent]}`}
                  aria-hidden="true"
                />
              )
            )}

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
              <Camera className="h-5 w-5 text-muted" strokeWidth={1.25} aria-hidden="true" />
              <span className="label text-muted max-w-[16rem]">
                Real project screenshot will appear here
              </span>
            </div>
          </div>
        )}
      </div>

      {metadata && metadata.length > 0 && (
        <div
          className={`grid grid-cols-2 border-t border-line divide-x divide-line ${
            metadata.length >= 4 ? "md:grid-cols-4" : metadata.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"
          }`}
        >
          {metadata.map((entry) => (
            <div key={entry.label} className="px-4 md:px-5 py-3.5">
              <div className="label text-muted mb-1.5">{entry.label}</div>
              <div className="font-mono text-sm text-ink">{entry.value}</div>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between px-4 md:px-5 py-3.5 border-t border-line">
        <span className="text-sm text-ink">{caption ?? title}</span>
        {source && <span className="label text-muted">{source}</span>}
      </div>
    </div>
  );
}
