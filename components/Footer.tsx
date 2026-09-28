import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="container-grid flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="label text-muted">
          {profile.name} — {profile.location}
        </p>
        <div className="flex gap-6">
          <a
            href={profile.linkedin}
            className={`label text-muted hover:text-ink transition-colors ${
              profile.linkedinIsPlaceholder ? "opacity-50" : ""
            }`}
          >
            LinkedIn
          </a>
          <a
            href={profile.github}
            className={`label text-muted hover:text-ink transition-colors ${
              profile.githubIsPlaceholder ? "opacity-50" : ""
            }`}
          >
            GitHub
          </a>
          <a href={profile.email} className="label text-muted hover:text-ink transition-colors">
            Email
          </a>
          <a href={profile.resume} className="label text-muted hover:text-ink transition-colors">
            Resume
          </a>
        </div>
      </div>
    </footer>
  );
}
