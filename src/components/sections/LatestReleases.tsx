import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { contentService, select } from "@/services";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { songToTrack, songsToTracks } from "@/services/audio-player";
import { brandAssets } from "@/data/assets";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Link } from "@tanstack/react-router";
import { songPath } from "@/data/routes";
import type { Song } from "@/types";

function ReleaseCard({ song, index, allSongs }: { song: Song; index: number; allSongs: Song[] }) {
  const { currentTrack, status, controls } = useAudioPlayer();
  const track = songToTrack(song);
  const isPlaying = currentTrack?.id === song.id && (status === "playing" || status === "loading");
  const hasAudio = !!track;

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!track) return;

    if (currentTrack?.id === track.id) {
      controls.toggle();
      return;
    }

    const allTracks = songsToTracks(allSongs);
    const trackIndex = allTracks.findIndex((t) => t.id === track.id);
    if (trackIndex >= 0) {
      controls.playQueue(allTracks, trackIndex);
    } else {
      controls.playQueue([track], 0);
    }
  };

  const coverSrc = song.cover?.src || brandAssets.logo;
  const artistName = song.artistIds.map((id) => select.artistById(id)?.name || id).join(", ");
  const genreName =
    song.genreIds.length > 0 ? select.genreById(song.genreIds[0])?.name || song.genreIds[0] : "";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
      className="group relative flex-none w-[160px] sm:w-[200px] md:w-[240px] scroll-snap-align-start flex flex-col gap-3"
    >
      <button
        onClick={handlePlay}
        disabled={!hasAudio}
        className={`relative w-full aspect-square overflow-hidden rounded-xl bg-card border border-border shadow-md transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-[1.02] group-hover:border-gold/50 group-hover:shadow-[0_8px_30px_rgb(212,175,55,0.15)] ${hasAudio ? "cursor-pointer" : "cursor-default"}`}
      >
        <img
          src={coverSrc}
          alt={song.cover?.alt || song.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Play Button Overlay */}
        {hasAudio && (
          <div
            className={`absolute bottom-3 right-3 flex items-center justify-center size-10 md:size-12 rounded-full bg-gold text-background shadow-lg shadow-gold/20 transition-all duration-300 z-10 ${isPlaying ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0"}`}
          >
            {isPlaying ? (
              <Pause className="size-5 md:size-6" fill="currentColor" />
            ) : (
              <Play className="size-5 md:size-6 ml-1" fill="currentColor" />
            )}
          </div>
        )}

        {/* Gradient Overlay for legibility if needed, but Netflix keeps it clean. Just a subtle inner shadow. */}
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl" />
      </button>

      <div className="flex flex-col gap-0.5 px-1">
        <Link
          to={songPath(song.slug)}
          className="truncate font-display text-base md:text-lg leading-tight hover:text-gold transition-colors"
        >
          {song.title}
        </Link>
        <p className="truncate text-sm text-muted-foreground">{artistName}</p>
        {genreName && (
          <p className="truncate text-xs uppercase tracking-widest text-gold/80 mt-1">
            {genreName}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export function LatestReleases() {
  const {
    data: songs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["latest-releases"],
    queryFn: () => contentService.getSongs(),
  });

  if (isLoading || isError || !songs || songs.length === 0) {
    return null; // Silent fallback or we could render a skeleton
  }

  // Sort by releaseDate descending to get "Latest"
  const sortedSongs = [...songs].sort((a, b) => {
    return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
  });

  // Limit to a reasonable number for browsing
  const latestSongs = sortedSongs.slice(0, 10);

  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 lg:px-8">
        <SectionHeading eyebrow="New Music" title="Latest Releases" />

        {/* Netflix-style horizontal scroll container */}
        <div className="relative -mx-5 px-5 lg:-mx-8 lg:px-8">
          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-8 pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory">
            {latestSongs.map((song, i) => (
              <ReleaseCard key={song.id} song={song} index={i} allSongs={latestSongs} />
            ))}
          </div>

          {/* Edge fade gradients for scroll indication */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent lg:w-16" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent lg:w-16" />
        </div>
      </div>
    </section>
  );
}
