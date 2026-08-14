import { useEffect } from "react";
import { createFileRoute, useLocation, useNavigate } from "@tanstack/react-router";
import { PageLayout, PageSection } from "@/components/layout/PageLayout";
import { pageMeta, withBrand } from "@/lib/seo";
import { motion } from "framer-motion";
import { Play, Music, Mic2, Radio, Bell } from "lucide-react";
import { albumArt, genreArt, brandAssets } from "@/data/assets";
import { PlatformIcon } from "@/components/common/PlatformIcon";

export const Route = createFileRoute("/releases")({
  head: () => ({
    meta: pageMeta({
      title: withBrand("Releases"),
      description: "Discover all NaadByte albums, EPs, and singles.",
    }),
  }),
  component: ReleasesPage,
});

// --- DUMMY DATA FOR EASY REPLACEMENT LATER ---
const dummyHeroRelease = {
  title: "Paise Ka Tantra",
  artist: "NaadByte",
  genre: "Electronic / Rap",
  releaseDate: "August 14, 2026",
  description:
    "A hard-hitting fusion of modern electronic beats and razor-sharp lyricism, exploring the realities of ambition and the modern grind.",
  artwork: albumArt.neon,
};

const dummyReleases = [
  {
    id: 1,
    title: "Paise Ka Tantra",
    artist: "NaadByte",
    year: "2026",
    genre: "Electronic",
    artwork: albumArt.neon,
  },
  {
    id: 2,
    title: "Shiva Within",
    artist: "NaadByte",
    year: "2026",
    genre: "Devotional",
    artwork: albumArt.shiva,
  },
  {
    id: 3,
    title: "Young G.O.A.T.",
    artist: "NaadByte",
    year: "2025",
    genre: "Hip Hop",
    artwork: albumArt.rise,
  },
  {
    id: 4,
    title: "Finding Her",
    artist: "NaadByte",
    year: "2025",
    genre: "Cinematic",
    artwork: albumArt.echoes,
  },
  {
    id: 5,
    title: "Sanam Teri Kasam",
    artist: "NaadByte",
    year: "2025",
    genre: "Romantic",
    artwork: genreArt.hindi,
  },
  {
    id: 6,
    title: "Raanjhan",
    artist: "NaadByte",
    year: "2025",
    genre: "Punjabi",
    artwork: genreArt.punjabi,
  },
  {
    id: 7,
    title: "Aashiqui 2",
    artist: "NaadByte",
    year: "2024",
    genre: "Romantic",
    artwork: genreArt.devotional,
  },
  {
    id: 8,
    title: "Do Patti",
    artist: "NaadByte",
    year: "2024",
    genre: "Pop",
    artwork: genreArt.english,
  },
];

const dummyCollections = [
  { id: "c1", title: "Hindi Essentials", count: "24 Songs", artwork: genreArt.hindi },
  { id: "c2", title: "Punjabi Hits", count: "18 Songs", artwork: genreArt.punjabi },
  { id: "c3", title: "Devotional", count: "12 Songs", artwork: genreArt.devotional },
  { id: "c4", title: "Motivational", count: "15 Songs", artwork: genreArt.motivation },
  { id: "c5", title: "Love Songs", count: "20 Songs", artwork: genreArt.cinematic },
];

const dummyUpcoming = [
  {
    id: "u1",
    title: "Silent Horizon",
    month: "September 2026",
    artwork: brandAssets.heroBackground,
  },
  { id: "u2", title: "Echoes of Naad", month: "October 2026", artwork: albumArt.echoes },
  { id: "u3", title: "Midnight Journey", month: "December 2026", artwork: albumArt.neon },
];

function ReleasesPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Handle Hash Navigation for scroll
  useEffect(() => {
    const hash = location.hash;
    if (!hash) return;

    const releaseId = hash.replace("#", "");
    const el = document.getElementById(releaseId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      // highlight or flash could be added here
    }
  }, [location.hash]);
  return (
    <PageLayout>
      {/* 1. HERO SECTION (Spotify / Apple Music Style) */}
      <header className="relative flex min-h-[75vh] items-center overflow-hidden py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/4 top-1/2 size-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-3xl bg-[radial-gradient(circle,oklch(0.82_0.135_82/0.7),transparent_70%)]"
        />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-12 px-5 lg:flex-row lg:items-center lg:gap-20 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full max-w-[420px] lg:w-2/5 shrink-0"
          >
            <div className="group relative aspect-square w-full overflow-hidden rounded-[20px] bg-card shadow-2xl transition-all duration-700 hover:shadow-[0_20px_50px_rgba(212,175,55,0.15)]">
              <img
                src={dummyHeroRelease.artwork}
                alt={dummyHeroRelease.title}
                className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="flex w-full flex-col lg:w-3/5"
          >
            <span className="eyebrow tracking-[0.2em] text-gold font-semibold text-xs md:text-sm uppercase mb-4">
              Latest Release
            </span>
            <h1 className="text-balance text-5xl leading-tight md:text-6xl lg:text-7xl font-display text-white mb-2">
              {dummyHeroRelease.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-base md:text-lg text-foreground/80 font-medium mb-6">
              <span className="text-white">{dummyHeroRelease.artist}</span>
              <span className="text-muted-foreground">•</span>
              <span>{dummyHeroRelease.genre}</span>
              <span className="text-muted-foreground">•</span>
              <span>{dummyHeroRelease.releaseDate}</span>
            </div>

            <p className="max-w-xl text-pretty text-base text-muted-foreground leading-relaxed mb-8">
              {dummyHeroRelease.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-gold px-10 text-sm font-semibold text-black transition-transform hover:scale-105 shadow-lg shadow-gold/20">
                <Play className="size-5" fill="currentColor" />
                Listen Now
              </button>
              <button className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-border bg-card/50 backdrop-blur-md px-10 text-sm font-semibold text-foreground transition-all hover:bg-card hover:border-gold/50 hover:text-gold">
                <Mic2 className="size-5" />
                View Lyrics
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                Available On
              </span>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-white transition-colors"
                  title="Spotify"
                >
                  <PlatformIcon platform="spotify" className="size-7" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-white transition-colors"
                  title="Apple Music"
                >
                  <PlatformIcon platform="appleMusic" className="size-7" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-white transition-colors"
                  title="YouTube Music"
                >
                  <PlatformIcon platform="youtube" className="size-7" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-white transition-colors flex items-center gap-1.5 text-sm font-medium"
                  title="Amazon Music"
                >
                  <Radio className="size-6" /> Amazon
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-white transition-colors flex items-center gap-1.5 text-sm font-medium"
                  title="JioSaavn"
                >
                  <Music className="size-6" /> JioSaavn
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-white transition-colors flex items-center gap-1.5 text-sm font-medium"
                  title="Gaana"
                >
                  <Music className="size-6" /> Gaana
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* 2. LATEST RELEASES GRID */}
      <PageSection className="pt-10 pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl md:text-3xl font-display text-white">Latest Releases</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dummyReleases.map((release, i) => (
              <ReleaseCard key={release.id} release={release} index={i} />
            ))}
          </div>
        </div>
      </PageSection>

      {/* 3. FEATURED COLLECTIONS (NETFLIX STYLE) */}
      <PageSection className="py-16 bg-background/50 border-y border-border">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between px-5 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-display text-white">Featured Collections</h2>
          </div>

          <div className="flex w-full overflow-x-auto pb-8 px-5 lg:px-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex gap-6 min-w-max">
              {dummyCollections.map((collection, i) => (
                <CollectionCard key={collection.id} collection={collection} index={i} />
              ))}
            </div>
          </div>
        </div>
      </PageSection>

      {/* 4. UPCOMING RELEASES */}
      <PageSection className="py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <span className="eyebrow block mb-3 tracking-[0.2em] text-gold font-semibold text-xs md:text-sm uppercase">
              Coming Soon
            </span>
            <h2 className="text-3xl md:text-4xl font-display text-white">Upcoming Releases</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dummyUpcoming.map((item, i) => (
              <UpcomingCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </PageSection>

      {/* 5. FOOTER CTA */}
      <PageSection className="pb-32 pt-16">
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center gap-8 bg-card border border-border rounded-3xl p-12 lg:p-20 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent pointer-events-none" />
          <div className="relative z-10 flex flex-col items-center gap-6">
            <h2 className="font-display text-4xl md:text-5xl text-white">
              Discover Every NaadByte Release
            </h2>
            <p className="text-muted-foreground text-lg max-w-lg">
              Available across all major streaming platforms. Dive into the complete catalog.
            </p>
            <div className="mt-4">
              <button className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-gold px-10 text-sm font-semibold text-black transition-transform hover:scale-105 shadow-lg shadow-gold/20">
                <Music className="size-5" />
                Listen Everywhere
              </button>
            </div>
          </div>
        </div>
      </PageSection>
    </PageLayout>
  );
}

// --- REUSABLE COMPONENTS ---

function ReleaseCard({
  release,
  index,
}: {
  release: {
    id: string | number;
    title: string;
    artist: string;
    year: string;
    genre: string;
    artwork: string;
  };
  index: number;
}) {
  return (
    <motion.a
      href="#"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group flex flex-col gap-4 rounded-xl p-4 bg-transparent transition-all hover:bg-card border border-transparent hover:border-gold/20 hover:shadow-[0_8px_30px_rgba(212,175,55,0.08)]"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-black shadow-md">
        <img
          src={release.artwork}
          alt={release.title}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-gold text-black shadow-lg transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <Play className="ml-1 size-6" fill="currentColor" />
          </div>
        </div>
        <div className="absolute top-2 left-2">
          <span className="px-2.5 py-1 rounded-md bg-black/70 text-white/90 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
            {release.genre}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-1 px-1">
        <h3 className="font-display text-lg text-white leading-tight transition-colors group-hover:text-gold line-clamp-1">
          {release.title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{release.artist}</span>
          <span>•</span>
          <span>{release.year}</span>
        </div>
      </div>
    </motion.a>
  );
}

function CollectionCard({
  collection,
  index,
}: {
  collection: { id: string; title: string; count: string; artwork: string };
  index: number;
}) {
  return (
    <motion.a
      href="#"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative w-[280px] md:w-[360px] lg:w-[400px] aspect-[16/9] overflow-hidden rounded-2xl bg-card border border-border shadow-md transition-all hover:border-gold/40 snap-start"
    >
      <img
        src={collection.artwork}
        alt={collection.title}
        className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <span className="text-xs font-semibold uppercase tracking-widest text-gold mb-1">
          {collection.count}
        </span>
        <h3 className="text-2xl font-display text-white transition-colors group-hover:text-gold">
          {collection.title}
        </h3>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex size-14 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md opacity-0 scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 group-hover:bg-gold group-hover:text-black">
        <Play className="ml-1 size-6" fill="currentColor" />
      </div>
    </motion.a>
  );
}

function UpcomingCard({
  item,
  index,
}: {
  item: { id: string; title: string; month: string; artwork: string };
  index: number;
}) {
  return (
    <motion.div
      id={`r${item.id}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex flex-col rounded-2xl bg-card border border-border overflow-hidden transition-all hover:border-gold/30 hover:shadow-[0_8px_30px_rgba(212,175,55,0.08)]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
        <img
          src={item.artwork}
          alt={item.title}
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-80"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-gold text-black text-[10px] font-bold uppercase tracking-widest shadow-md">
            Coming Soon
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center text-center p-8 gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-2xl font-display text-white">{item.title}</h3>
          <p className="text-gold font-medium">{item.month}</p>
        </div>
        <button className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-border bg-transparent px-6 text-xs font-semibold uppercase tracking-wider text-foreground transition-all hover:border-gold hover:text-gold mt-2">
          <Bell className="size-3.5" />
          Notify Me
        </button>
      </div>
    </motion.div>
  );
}
