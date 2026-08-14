import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { PageLayout, PageHeader, PageSection } from "@/components/layout/PageLayout";
import { SongCard } from "@/components/cards/SongCard";
import { formatDuration } from "@/lib/utils";
import { SectionHeading } from "@/components/common/SectionHeading";
import { PlatformIcon } from "@/components/common/PlatformIcon";
import { RouteLink } from "@/components/common/RouteLink";
import { select, songToTrack } from "@/services";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { routes } from "@/data/routes";
import { pageMeta, withBrand } from "@/lib/seo";
import { Play, Pause, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect } from "react";

export const Route = createFileRoute("/music/$slug")({
  loader: ({ params }) => {
    const song = select.songBySlug(params.slug);
    if (!song) throw notFound();
    return { song };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: pageMeta({
          title: withBrand("Song Not Found"),
          description: "This song is not available.",
          noindex: true,
        }),
      };
    }
    const { song } = loaderData;
    const album = song.albumId ? select.albumById(song.albumId) : undefined;
    return {
      meta: pageMeta({
        title: withBrand(`${song.title} ${album ? `- ${album.title}` : ""}`),
        description:
          song.description || `Listen to ${song.title} by NaadByte — released ${song.releaseDate}.`,
        image: song.cover.src,
      }),
    };
  },
  component: SongPage,
  errorComponent: SongError,
  notFoundComponent: SongNotFound,
});

function getYouTubeId(url: string) {
  const match = url.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([A-Za-z0-9_-]{6,})/);
  return match?.[1] || null;
}

function SongPage() {
  const { slug } = Route.useParams();
  const song = select.songBySlug(slug)!;

  const { currentTrack, status, controls } = useAudioPlayer();
  const isPlaying = currentTrack?.id === song?.id && (status === "playing" || status === "loading");

  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    setShowVideo(false);
  }, [slug]);

  const album = song.albumId ? select.albumById(song.albumId) : undefined;

  const related = useMemo(() => {
    let list = album ? select.songsByAlbum(album.id).filter((s) => s.id !== song.id) : [];
    if (list.length < 4) {
      const genreSongs = song.genreIds
        .flatMap((gid) => select.songsByGenre(gid))
        .filter((s) => s.id !== song.id && !list.find((ls) => ls.id === s.id));
      list = [...list, ...genreSongs];
    }
    if (list.length < 4) {
      const allSongs = select
        .songs()
        .filter((s) => s.id !== song.id && !list.find((ls) => ls.id === s.id));
      list = [...list, ...allSongs];
    }
    return list.slice(0, 6);
  }, [song, album]);

  if (!song) return <SongNotFound />;
  const artistNames = song.artistIds.map((id) => select.artistById(id)?.name ?? id).join(", ");
  const genreNames = song.genreIds.map((id) => select.genreById(id)?.name ?? id).join(", ");

  const youtubeLink = song.streamingLinks.find((l) => l.platform === "youtube");
  const videoId = youtubeLink ? getYouTubeId(youtubeLink.href) : null;

  const streamPlatforms = [
    "spotify",
    "appleMusic",
    "amazonMusic",
    "youtubeMusic",
    "jiosaavn",
    "gaana",
  ];
  const displayStreams = song.streamingLinks.filter((l) => streamPlatforms.includes(l.platform));

  const handlePlaySong = () => {
    const track = songToTrack(song, artistNames);
    if (track) {
      if (showVideo) setShowVideo(false);
      controls.toggle(track);
    }
  };

  const handleWatchVideo = () => {
    controls.pause();
    setShowVideo(true);
  };

  return (
    <PageLayout>
      {/* 1. HERO SECTION (Netflix Style) */}
      <section className="relative w-full min-h-[70vh] flex flex-col justify-end pb-12 md:pb-24 pt-32 px-5 lg:px-8 overflow-hidden">
        {/* Background Blur */}
        <div className="absolute inset-0 z-0">
          <img
            src={song.cover.src}
            alt=""
            className="w-full h-full object-cover opacity-30 scale-110 blur-2xl transform-gpu"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto grid gap-8 lg:grid-cols-[1fr_400px] items-end">
          <div className="flex flex-col gap-6 max-w-3xl">
            <div className="flex items-center gap-3 text-xs md:text-sm font-semibold tracking-wider uppercase text-gold">
              <span>{song.language}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold/50" />
              <span>{genreNames}</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-none text-balance tracking-tight">
              {song.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm md:text-base text-foreground/80">
              <span className="font-medium text-foreground">{artistNames}</span>
              {album && (
                <>
                  <span className="text-foreground/40">•</span>
                  <span>{album.title}</span>
                </>
              )}
              <span className="text-foreground/40">•</span>
              <span>{song.releaseDate.substring(0, 4)}</span>
              <span className="text-foreground/40">•</span>
              <span>{formatDuration(song.durationSeconds)}</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={handlePlaySong}
                className="inline-flex h-12 md:h-14 items-center justify-center gap-2 rounded-full bg-white px-8 md:px-10 text-sm md:text-base font-bold text-black transition-transform hover:scale-105 shadow-lg"
              >
                {isPlaying ? (
                  <>
                    <Pause className="size-5 md:size-6" fill="currentColor" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="size-5 md:size-6" fill="currentColor" /> Play Song
                  </>
                )}
              </button>

              {videoId && (
                <button
                  onClick={handleWatchVideo}
                  className="inline-flex h-12 md:h-14 items-center justify-center gap-2 rounded-full border border-border bg-black/40 backdrop-blur-md px-8 md:px-10 text-sm md:text-base font-bold text-white transition-all hover:bg-white/10 hover:border-white/50"
                >
                  <Play className="size-5 md:size-6" /> Watch Video
                </button>
              )}
            </div>
          </div>

          <div className="hidden lg:block relative group perspective-1000">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform-gpu transition-transform duration-700 group-hover:rotate-y-12 group-hover:rotate-x-12">
              <img
                src={song.cover.src}
                alt={song.cover.alt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. VIDEO EMBED (If active) */}
      <AnimatePresence>
        {showVideo && videoId && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full bg-black border-y border-border overflow-hidden"
          >
            <div className="mx-auto w-full max-w-6xl aspect-video relative">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <PageSection className="pt-16 pb-12">
        <div className="grid lg:grid-cols-[1fr_350px] gap-12 lg:gap-20">
          {/* MAIN CONTENT COLUMN */}
          <div className="flex flex-col gap-12">
            {/* ABOUT THE SONG */}
            {(song.description || song.story || song.mood || song.productionNotes) && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl">About This Song</h2>
                <div className="prose prose-invert prose-sm md:prose-base max-w-none text-muted-foreground leading-relaxed">
                  {song.story && (
                    <div className="mb-6">
                      <h3 className="text-foreground text-lg mb-2">Story Behind the Song</h3>
                      <p>{song.story}</p>
                    </div>
                  )}
                  {song.description && (
                    <div className="mb-6">
                      <p>{song.description}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-border mt-8">
                    {song.mood && (
                      <div>
                        <span className="block text-xs uppercase tracking-wider text-gold mb-1">
                          Mood
                        </span>
                        <span className="text-foreground">{song.mood}</span>
                      </div>
                    )}
                    {song.suitableFor && (
                      <div>
                        <span className="block text-xs uppercase tracking-wider text-gold mb-1">
                          Suitable For
                        </span>
                        <span className="text-foreground">{song.suitableFor}</span>
                      </div>
                    )}
                    {song.tempo && (
                      <div>
                        <span className="block text-xs uppercase tracking-wider text-gold mb-1">
                          Tempo
                        </span>
                        <span className="text-foreground">
                          {song.tempo} {song.bpm ? `(${song.bpm} BPM)` : ""}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* LYRICS */}
            {song.lyrics && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl">Lyrics</h2>
                <div className="bg-card/30 rounded-2xl p-6 md:p-8 border border-border whitespace-pre-line text-sm md:text-base text-foreground/80 leading-loose">
                  {song.lyrics}
                </div>
              </div>
            )}
          </div>

          {/* SIDEBAR COLUMN */}
          <div className="flex flex-col gap-10">
            {/* STREAMING PLATFORMS */}
            {displayStreams.length > 0 && (
              <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                <h3 className="font-display text-lg mb-4">Listen Everywhere</h3>
                <div className="flex flex-col gap-3">
                  {displayStreams.map((link) => {
                    const meta = select.platformByKey(link.platform);
                    return (
                      <a
                        key={link.platform}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group flex items-center justify-between rounded-xl bg-background border border-border p-3 transition-all hover:border-gold hover:bg-gold/5"
                      >
                        <div className="flex items-center gap-3">
                          <PlatformIcon
                            platform={link.platform}
                            className="size-5 text-muted-foreground group-hover:text-gold transition-colors"
                          />
                          <span className="text-sm font-medium">{meta?.name ?? link.platform}</span>
                        </div>
                        <ExternalLink className="size-4 text-muted-foreground group-hover:text-gold transition-colors opacity-50 group-hover:opacity-100" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </PageSection>

      {/* RELATED SONGS CAROUSEL */}
      {related.length > 0 && (
        <PageSection className="pb-16 pt-0">
          <SectionHeading eyebrow="You Might Also Like" title="Related Tracks" align="left" />
          <div className="flex w-full overflow-x-auto scrollbar-hide -mx-5 px-5 lg:-mx-8 lg:px-8 pb-4">
            <div className="flex gap-4 lg:gap-6 min-w-max">
              {related.map((s, i) => (
                <div key={s.id} className="w-[280px] lg:w-[320px]">
                  <SongCard song={s} index={i} />
                </div>
              ))}
            </div>
          </div>
        </PageSection>
      )}

      {/* 4. CTA / NEED SOMETHING SIMILAR */}
      <PageSection className="pb-24 pt-12 border-t border-border mt-12">
        <div className="w-full rounded-3xl bg-gold-gradient p-[1px] shadow-[0_10px_40px_rgba(212,175,55,0.15)]">
          <div className="w-full rounded-[23px] bg-background p-10 md:p-16 text-center">
            <span className="eyebrow block mb-4 tracking-[0.2em] text-gold font-semibold uppercase">
              Need Something Similar?
            </span>
            <h2 className="font-display text-3xl md:text-5xl mb-6">Request a Custom Song</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-10 text-sm md:text-base">
              Loved this style? Our bespoke music creation service can craft an original track with
              a similar mood, tempo, or emotional feel, tailored specifically for your project or
              special occasion.
            </p>
            <RouteLink to={routes.createYourSong} className="px-10 py-4 text-base">
              Start Your Request
            </RouteLink>
          </div>
        </div>
      </PageSection>
    </PageLayout>
  );
}

function SongNotFound() {
  const { slug } = Route.useParams();
  return (
    <PageLayout>
      <PageHeader
        eyebrow="404"
        title="Song Not Found"
        subtitle={`We couldn't find a track at "${slug}".`}
      >
        <div className="pt-4">
          <RouteLink to={routes.music} variant="outline">
            Browse All Music
          </RouteLink>
        </div>
      </PageHeader>
    </PageLayout>
  );
}

function SongError() {
  return (
    <PageLayout>
      <PageHeader
        eyebrow="Error"
        title="This Track Didn't Load"
        subtitle="Something went wrong. Try again or head back to the catalogue."
      >
        <div className="pt-4">
          <RouteLink to={routes.music} variant="outline">
            Browse All Music
          </RouteLink>
        </div>
      </PageHeader>
    </PageLayout>
  );
}
