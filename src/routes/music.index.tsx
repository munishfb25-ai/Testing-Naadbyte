import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageSection } from "@/components/layout/PageLayout";
import { SquareSongCard } from "@/components/cards/SquareSongCard";
import { GenreCard } from "@/components/cards/GenreCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import { musicPage } from "@/content/pages";
import { pageMeta, withBrand } from "@/lib/seo";
import { motion, AnimatePresence } from "framer-motion";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { songToTrack } from "@/services/audio-player";
import { Play, Pause } from "lucide-react";
import type { Song } from "@/types";

export const Route = createFileRoute("/music/")({
  head: () => ({
    meta: pageMeta({
      title: withBrand("Music"),
      description: musicPage.description,
    }),
  }),
  loader: async () => {
    const { contentService } = await import("@/services");
    const [songs, genres] = await Promise.all([
      contentService.getSongs(),
      contentService.getGenres(),
    ]);
    return { songs, genres };
  },
  component: MusicPage,
});

function FeaturedCarousel({ featuredSongs }: { featuredSongs: Song[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredSong = featuredSongs[currentIndex];

  const { currentTrack, status, controls } = useAudioPlayer();
  const track = featuredSong ? songToTrack(featuredSong) : null;
  const isPlaying =
    currentTrack?.id === featuredSong?.id && (status === "playing" || status === "loading");

  const handlePlay = async () => {
    if (!track) return;
    if (currentTrack?.id === track.id) {
      controls.toggle();
      return;
    }
    controls.playQueue([track], 0);
  };

  // Auto-rotate every 6 seconds
  useEffect(() => {
    if (featuredSongs.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredSongs.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [featuredSongs.length]);

  if (!featuredSong) return null;

  return (
    <header className="relative overflow-hidden py-14 md:py-20 lg:py-24 min-h-[60vh] flex items-center">
      {/* Blurred Background Collage / Active Cover */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={featuredSong.id + "-bg"}
            src={featuredSong.cover.src}
            alt="Background blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="w-full h-full object-cover blur-[80px] scale-110"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 lg:flex-row lg:items-center lg:gap-16 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={featuredSong.id + "-content"}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 w-full"
          >
            <div className="relative aspect-square w-full max-w-[280px] sm:max-w-[320px] shrink-0 overflow-hidden rounded-2xl shadow-2xl lg:max-w-[400px]">
              <img
                src={featuredSong.cover.src}
                alt={featuredSong.cover.alt}
                className="size-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-5 flex-1">
              <span className="eyebrow">FEATURED FROM NAADBYTE</span>
              <h1 className="text-balance text-4xl leading-tight md:text-5xl lg:text-6xl text-foreground font-display">
                {featuredSong.title}
              </h1>
              <p className="max-w-xl text-pretty text-sm text-muted-foreground md:text-base">
                {musicPage.description}
              </p>

              <div className="flex items-center gap-4 pt-2">
                <button
                  onClick={handlePlay}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gold px-8 text-sm font-semibold text-black transition-transform hover:scale-105 shadow-gold/20 shadow-lg"
                >
                  {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
                  {isPlaying ? "PAUSE" : "PLAY NOW"}
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 pt-6 mt-auto">
                {featuredSongs.map((song, i) => (
                  <button
                    key={song.id + "-thumb"}
                    onClick={() => setCurrentIndex(i)}
                    className={`relative w-16 h-16 rounded-md overflow-hidden border-2 transition-all duration-300 ${i === currentIndex ? "border-gold scale-110" : "border-transparent opacity-50 hover:opacity-100"}`}
                  >
                    <img
                      src={song.cover.src}
                      alt="Thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </header>
  );
}

function MusicPage() {
  const { songs, genres } = Route.useLoaderData();
  const featuredSongs = songs.filter((s) => s.isFeatured).slice(0, 5);
  // Fallback to first 5 if none are featured
  const carouselSongs = featuredSongs.length > 0 ? featuredSongs : songs.slice(0, 5);

  return (
    <PageLayout>
      <FeaturedCarousel featuredSongs={carouselSongs} />

      <PageSection>
        <SectionHeading eyebrow="Library" title="All Releases" align="left" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 pt-4">
          {songs.map((song, i) => (
            <SquareSongCard key={song.id} song={song} index={i} allSongs={songs} />
          ))}
        </div>
      </PageSection>

      <PageSection>
        <SectionHeading eyebrow="Browse Genres" title="Sound For Every Feeling" align="left" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {genres.map((genre, i) => (
            <GenreCard key={genre.id} genre={genre} index={i} />
          ))}
        </div>
      </PageSection>
    </PageLayout>
  );
}
