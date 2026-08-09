import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Play } from "lucide-react";
import type { Song } from "@/types";
import { select } from "@/services";
import { songPath } from "@/data/routes";
import { PlatformIcon } from "@/components/common/PlatformIcon";
import { formatDuration } from "@/lib/utils";

const MotionLink = motion.create(Link);

/** Reusable song row/card used on the Music page and album detail pages. */
export function SongCard({ song, index = 0 }: { song: Song; index?: number }) {
  return (
    <MotionLink
      to={songPath(song.slug)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
      className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-deep transition-all duration-500 hover:-translate-y-1 hover:border-gold/40"
    >
      <div className="relative size-16 shrink-0 overflow-hidden rounded-xl">
        <img
          src={song.cover.src}
          alt={song.cover.alt}
          loading="lazy"
          width={128}
          height={128}
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Play className="size-5 text-gold" aria-hidden />
        </span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h3 className="truncate font-display text-xl leading-none">{song.title}</h3>
        <p className="truncate text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {song.genreIds.map((id) => select.genreById(id)?.name ?? id).join(" · ")}
        </p>
      </div>
      <div className="hidden items-center gap-2 sm:flex">
        {song.streamingLinks.slice(0, 3).map((link) => (
          <span
            key={link.platform}
            className="flex size-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors group-hover:border-gold/40 group-hover:text-gold"
          >
            <PlatformIcon platform={link.platform} className="size-3.5" />
          </span>
        ))}
      </div>
      <span className="shrink-0 text-xs text-muted-foreground">
        {formatDuration(song.durationSeconds)}
      </span>
    </MotionLink>
  );
}
