import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageSection } from "@/components/layout/PageLayout";
import { SongCard } from "@/components/cards/SongCard";
import { GenreCard } from "@/components/cards/GenreCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import { select } from "@/services";
import { musicPage } from "@/content/pages";
import { pageMeta, withBrand } from "@/lib/seo";
import { motion } from "framer-motion";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { songToTrack } from "@/services/audio-player";
import { Play, Pause } from "lucide-react";

export const Route = createFileRoute("/music/")({
  head: () => ({
    meta: pageMeta({
      title: withBrand("Music"),
      description: musicPage.description,
    }),
  }),
  component: MusicPage,
});

function MusicPage() {
  const songs = select.songs();
  const genres = select.genres();
  const featuredSong = songs.find((s) => s.isFeatured) || songs[0];

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
    try {
      const { contentService } = await import("@/services");
      const { songsToTracks } = await import("@/services/audio-player");

      const allSongs = await contentService.getSongs();
      const allTracks = songsToTracks(allSongs);
      const trackIndex = allTracks.findIndex((t) => t.id === track.id);

      if (trackIndex >= 0) {
        controls.playQueue(allTracks, trackIndex);
      } else {
        controls.playQueue([track], 0);
      }
    } catch (error) {
      controls.playQueue([track], 0);
    }
  };

  return (
    <PageLayout>
      <header className="relative overflow-hidden py-14 md:py-20 lg:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl bg-[radial-gradient(circle,oklch(0.82_0.135_82/0.55),transparent_65%)]"
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 lg:flex-row lg:items-center lg:gap-16 lg:px-8"
        >
          {featuredSong && (
            <>
              <div className="relative aspect-square w-full max-w-[320px] shrink-0 overflow-hidden rounded-2xl shadow-2xl lg:max-w-[400px]">
                <img
                  src={featuredSong.cover.src}
                  alt={featuredSong.cover.alt}
                  className="size-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-5">
                <span className="eyebrow">FEATURED FROM NAADBYTE</span>
                <h1 className="text-balance text-4xl leading-tight md:text-5xl lg:text-6xl">
                  {featuredSong.title}
                </h1>
                <p className="max-w-xl text-pretty text-sm text-muted-foreground md:text-base">
                  {musicPage.description}
                </p>
                <div className="flex items-center gap-4 pt-2">
                  <button
                    onClick={handlePlay}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gold px-8 text-sm font-semibold text-black transition-transform hover:scale-105"
                  >
                    {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
                    {isPlaying ? "PAUSE" : "PLAY NOW"}
                  </button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </header>

      <PageSection>
        <div className="flex flex-col gap-3">
          {songs.map((song, i) => (
            <SongCard key={song.id} song={song} index={i} />
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
