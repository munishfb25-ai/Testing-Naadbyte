import type { PlatformKey } from "@/types";
import { useState, useMemo, useEffect } from "react";
import { createFileRoute, useLocation, useNavigate } from "@tanstack/react-router";
import { PageLayout, PageSection } from "@/components/layout/PageLayout";
import { PlatformIcon } from "@/components/common/PlatformIcon";
import { pageMeta, withBrand } from "@/lib/seo";
import { motion, AnimatePresence } from "framer-motion";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { Play, Pause, Search, ChevronDown, Music2 } from "lucide-react";
import { albumArt, genreArt } from "@/data/assets";

export const Route = createFileRoute("/music/")({
  head: () => ({
    meta: pageMeta({
      title: withBrand("Music"),
      description: "Premium music browsing experience.",
    }),
  }),
  component: MusicPage,
});

const dummySongs = [
  {
    id: "s1",
    title: "Paise Ka Tantra",
    artist: "NaadByte",
    genre: "Electronic",
    language: "Hindi",
    mood: "Motivational",
    description:
      "A hard-hitting fusion of modern electronic beats and razor-sharp lyricism, exploring the realities of ambition and the modern grind.",
    durationSeconds: 185,
    durationText: "3:05",
    cover: { src: albumArt.neon, alt: "Paise Ka Tantra Cover" },
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    isFeatured: true,
    streamingLinks: [
      { platform: "spotify", href: "#" },
      { platform: "appleMusic", href: "#" },
      { platform: "youtube", href: "#" },
    ],
  },
  {
    id: "s2",
    title: "Shiva Within",
    artist: "NaadByte",
    genre: "Devotional",
    language: "Hindi",
    mood: "Spiritual",
    description:
      "An ethereal journey merging ancient mantras with cinematic soundscapes, designed to awaken the inner spirit.",
    durationSeconds: 240,
    durationText: "4:00",
    cover: { src: albumArt.shiva, alt: "Shiva Within Cover" },
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    isFeatured: true,
    streamingLinks: [
      { platform: "spotify", href: "#" },
      { platform: "appleMusic", href: "#" },
    ],
  },
  {
    id: "s3",
    title: "Young G.O.A.T.",
    artist: "NaadByte",
    genre: "Hip-Hop",
    language: "English",
    mood: "Motivational",
    description:
      "High energy, unapologetic bars and heavy basslines. A modern anthem for the fearless.",
    durationSeconds: 155,
    durationText: "2:35",
    cover: { src: albumArt.rise, alt: "Young GOAT Cover" },
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    isFeatured: true,
    streamingLinks: [
      { platform: "spotify", href: "#" },
      { platform: "youtube", href: "#" },
    ],
  },
  {
    id: "s4",
    title: "Finding Her",
    artist: "NaadByte",
    genre: "Cinematic",
    language: "Instrumental",
    mood: "Love",
    description:
      "A sweeping orchestration that tells a story of lost love and nostalgic memories across time and space.",
    durationSeconds: 210,
    durationText: "3:30",
    cover: { src: albumArt.echoes, alt: "Finding Her Cover" },
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    isFeatured: true,
    streamingLinks: [
      { platform: "appleMusic", href: "#" },
      { platform: "amazonMusic", href: "#" },
    ],
  },
  {
    id: "s5",
    title: "Sanam Teri Kasam",
    artist: "NaadByte",
    genre: "Romantic",
    language: "Hindi",
    mood: "Love",
    description: "A reimagined emotional classic with rich acoustic guitars and intimate vocals.",
    durationSeconds: 260,
    durationText: "4:20",
    cover: { src: genreArt.hindi, alt: "Sanam Teri Kasam Cover" },
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    isFeatured: true,
    streamingLinks: [
      { platform: "spotify", href: "#" },
      { platform: "appleMusic", href: "#" },
    ],
  },
  {
    id: "s6",
    title: "Raanjhan",
    artist: "NaadByte",
    genre: "Punjabi",
    language: "Punjabi",
    mood: "Chill",
    description: "Uplifting traditional dhol loops meeting contemporary synthwave elements.",
    durationSeconds: 195,
    durationText: "3:15",
    cover: { src: genreArt.punjabi, alt: "Raanjhan Cover" },
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    isFeatured: false,
    streamingLinks: [],
  },
  {
    id: "s7",
    title: "Aashiqui 2 (Cover)",
    artist: "NaadByte",
    genre: "Romantic",
    language: "Hindi",
    mood: "Love",
    description: "A tribute to one of the greatest romantic eras in Indian music history.",
    durationSeconds: 205,
    durationText: "3:25",
    cover: { src: genreArt.devotional, alt: "Aashiqui 2 Cover" },
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    isFeatured: false,
    streamingLinks: [],
  },
  {
    id: "s8",
    title: "Do Patti",
    artist: "NaadByte",
    genre: "Pop",
    language: "English",
    mood: "Chill",
    description: "Catchy hooks and a rhythmic drive that keeps the dancefloor moving all night.",
    durationSeconds: 175,
    durationText: "2:55",
    cover: { src: genreArt.english, alt: "Do Patti Cover" },
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    isFeatured: false,
    streamingLinks: [],
  },
  {
    id: "s9",
    title: "Midnight Drive",
    artist: "NaadByte",
    genre: "Electronic",
    language: "Instrumental",
    mood: "Chill",
    description: "Retro-futuristic analog synthesizers and a relentless driving bassline.",
    durationSeconds: 230,
    durationText: "3:50",
    cover: { src: genreArt.edm, alt: "Midnight Drive Cover" },
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    isFeatured: false,
    streamingLinks: [],
  },
  {
    id: "s10",
    title: "Ascension",
    artist: "NaadByte",
    genre: "Ambient",
    language: "Instrumental",
    mood: "Spiritual",
    description: "Floating textures and binaural beats for deep meditation and focus.",
    durationSeconds: 310,
    durationText: "5:10",
    cover: { src: genreArt.meditation, alt: "Ascension Cover" },
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    isFeatured: false,
    streamingLinks: [],
  },
];

const filterCategories = [
  "All",
  "Devotional",
  "Love",
  "Motivational",
  "Cinematic",
  "Hindi",
  "Punjabi",
  "English",
  "Hip-Hop",
  "Chill",
  "Electronic",
  "Spiritual",
  "Instrumental",
];

const sortOptions = ["Latest", "Oldest", "A–Z", "Z–A", "Most Played", "Recently Added"];

function MusicPage() {
  const featured = dummySongs.filter((s) => s.isFeatured);
  const [activeHeroSong, setActiveHeroSong] = useState(featured[0] || dummySongs[0]);

  // Filtering State
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Latest");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const { currentTrack, status, controls } = useAudioPlayer();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle Hash Navigation for Play/Filter
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (!hash) return;

    if (hash.startsWith("play-")) {
      const songId = hash.replace("play-", "");
      const song = dummySongs.find((s) => s.id === songId);
      if (song) {
        setActiveHeroSong(song);
        controls.playQueue([toTrack(song)], 0);
      }
      // Clear hash gracefully without reloading
      navigate({ to: "/music", replace: true });
    } else if (hash.startsWith("filter-")) {
      const filter = hash.replace("filter-", "");
      setActiveFilter(filter);
      navigate({ to: "/music", replace: true });
    }
  }, [location.hash]);

  if (!activeHeroSong) return null;

  const isHeroPlaying =
    currentTrack?.id === activeHeroSong.id && (status === "playing" || status === "loading");

  const toTrack = (song: (typeof dummySongs)[0]) => ({
    id: song.id,
    title: song.title,
    src: song.audioUrl,
    cover: song.cover,
    artist: song.artist,
    durationSeconds: song.durationSeconds,
  });

  const handlePlayHero = () => {
    controls.toggle(toTrack(activeHeroSong));
  };

  const handleRailClick = (song: (typeof dummySongs)[0]) => {
    setActiveHeroSong(song);
    controls.playQueue([toTrack(song)], 0);
  };

  const handleLibraryClick = (song: (typeof dummySongs)[0]) => {
    controls.playQueue([toTrack(song)], 0);
  };

  // Filter & Sort Logic
  const processedSongs = useMemo(() => {
    const result = dummySongs.filter((song) => {
      // Mood/Genre Chip Filter
      const matchesFilter =
        activeFilter === "All" ||
        song.genre === activeFilter ||
        song.mood === activeFilter ||
        song.language === activeFilter;

      // Text Search Filter
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query) ||
        song.genre.toLowerCase().includes(query) ||
        song.language.toLowerCase().includes(query) ||
        song.mood.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "A–Z") return a.title.localeCompare(b.title);
      if (sortBy === "Z–A") return b.title.localeCompare(a.title);
      if (sortBy === "Latest" || sortBy === "Recently Added")
        return parseInt(b.id.replace("s", "")) - parseInt(a.id.replace("s", ""));
      if (sortBy === "Oldest")
        return parseInt(a.id.replace("s", "")) - parseInt(b.id.replace("s", ""));
      if (sortBy === "Most Played")
        return parseInt(a.durationSeconds.toString()) - parseInt(b.durationSeconds.toString()); // Dummy sort logic
      return 0;
    });

    return result;
  }, [activeFilter, searchQuery, sortBy]);

  return (
    <PageLayout>
      {/* 1 & 2. FEATURED HERO AND VERTICAL RAIL */}
      <header className="relative flex min-h-[85vh] items-center overflow-hidden py-24">
        {/* Cinematic Blurred Background */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={activeHeroSong.id + "-bg"}
              src={activeHeroSong.cover.src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="size-full object-cover blur-[100px] scale-125 mix-blend-screen"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-16 px-5 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-8">
          {/* Left: Hero Info (Artwork + Details) */}
          <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-14 flex-1">
            {/* Artwork */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeHeroSong.id + "-art"}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-[320px] md:max-w-[380px] lg:max-w-[420px] shrink-0"
              >
                <div className="group relative aspect-square w-full overflow-hidden rounded-2xl bg-card shadow-2xl shadow-black/50 ring-1 ring-white/5 transition-transform duration-700 hover:scale-[1.02]">
                  <img
                    src={activeHeroSong.cover.src}
                    alt={activeHeroSong.title}
                    className="size-full object-cover"
                  />
                  {/* Subtle inner shadow overlay */}
                  <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] pointer-events-none" />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Info */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeHeroSong.id + "-info"}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                className="flex flex-col flex-1 text-center md:text-left items-center md:items-start"
              >
                <span className="eyebrow tracking-[0.2em] text-gold font-semibold text-xs md:text-sm uppercase mb-4">
                  Featured Release
                </span>
                <h1 className="text-balance text-5xl md:text-6xl lg:text-7xl font-display text-white mb-2 leading-tight">
                  {activeHeroSong.title}
                </h1>

                <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 text-base md:text-lg text-foreground/80 font-medium mb-6">
                  <span className="text-white">{activeHeroSong.artist}</span>
                  <span className="text-muted-foreground">•</span>
                  <span>{activeHeroSong.genre}</span>
                </div>

                <p className="max-w-xl text-pretty text-base text-muted-foreground leading-relaxed mb-8">
                  {activeHeroSong.description}
                </p>

                <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 mb-8">
                  <button
                    onClick={handlePlayHero}
                    className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-gold px-10 text-sm font-semibold text-black transition-transform hover:scale-105 shadow-lg shadow-gold/20"
                  >
                    {isHeroPlaying ? (
                      <>
                        <Pause className="size-5" fill="currentColor" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="size-5" fill="currentColor" />
                        Listen Now
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-4">
                    {activeHeroSong.streamingLinks.map((link) => (
                      <a
                        key={link.platform}
                        href={link.href}
                        className="text-muted-foreground hover:text-white transition-colors"
                      >
                        <PlatformIcon platform={link.platform as PlatformKey} className="size-6" />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Vertical Rail (Netflix Poster Style) */}
          <div className="w-full lg:w-[140px] shrink-0 flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x lg:snap-y snap-mandatory px-2 py-4 lg:py-10 lg:max-h-[600px] lg:mask-image-[linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
            {featured.map((song) => {
              const isActive = activeHeroSong.id === song.id;
              const isPlaying =
                currentTrack?.id === song.id && (status === "playing" || status === "loading");

              return (
                <button
                  key={song.id}
                  onClick={() => handleRailClick(song)}
                  className={`group relative flex-shrink-0 w-[110px] lg:w-[120px] aspect-[2/3] rounded-xl overflow-hidden transition-all duration-500 snap-center
                    ${
                      isActive
                        ? "ring-2 ring-gold shadow-[0_0_25px_rgba(212,175,55,0.25)] scale-100 z-10"
                        : "opacity-60 hover:opacity-100 scale-95 hover:scale-100 ring-1 ring-white/10"
                    }
                  `}
                >
                  {/* Future Video Container - Ready for standard HTML5 <video> */}
                  <img
                    src={song.cover.src}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={song.title}
                  />

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity group-hover:opacity-70" />

                  <div className="absolute inset-0 flex flex-col justify-between p-3 pointer-events-none">
                    <div className="flex justify-end">
                      {isActive && (
                        <div className="flex gap-0.5 items-end h-3 bg-black/40 p-1 rounded-sm backdrop-blur-sm">
                          {/* Animated Equalizer */}
                          <motion.div
                            animate={
                              isPlaying
                                ? { height: ["20%", "80%", "40%", "100%", "20%"] }
                                : { height: "20%" }
                            }
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="w-1 bg-gold rounded-full"
                          />
                          <motion.div
                            animate={
                              isPlaying
                                ? { height: ["60%", "20%", "100%", "40%", "60%"] }
                                : { height: "20%" }
                            }
                            transition={{
                              repeat: Infinity,
                              duration: 1,
                              delay: 0.2,
                            }}
                            className="w-1 bg-gold rounded-full"
                          />
                          <motion.div
                            animate={
                              isPlaying
                                ? { height: ["100%", "40%", "80%", "20%", "100%"] }
                                : { height: "20%" }
                            }
                            transition={{
                              repeat: Infinity,
                              duration: 1,
                              delay: 0.4,
                            }}
                            className="w-1 bg-gold rounded-full"
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-start gap-1">
                      <h4 className="text-white text-xs font-bold leading-tight text-left line-clamp-2 drop-shadow-md">
                        {song.title}
                      </h4>
                      <span className="text-white/70 text-[10px] font-medium drop-shadow-md">
                        {song.durationText}
                      </span>
                    </div>
                  </div>

                  {/* Hover Play Button */}
                  <div
                    className={`absolute inset-0 m-auto flex size-10 items-center justify-center rounded-full bg-gold/90 text-black backdrop-blur-md shadow-xl transition-all duration-300
                      ${
                        isActive
                          ? "opacity-0 scale-75"
                          : "opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100"
                      }
                    `}
                  >
                    <Play className="ml-0.5 size-4" fill="currentColor" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* FILTER & LIBRARY SECTION */}
      <PageSection className="pb-32 pt-8 bg-black/40 border-t border-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          {/* Section Header: Search & Sort */}
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-display text-white">
                Browse by Mood & Genre
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              {/* Premium Sort Dropdown */}
              <div className="relative w-full sm:w-[180px]">
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex w-full items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-gold/50"
                >
                  <span className="truncate">{sortBy}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isSortOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {isSortOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 z-50 mt-2 w-full origin-top-right rounded-xl border border-white/10 bg-zinc-950 py-1 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      {sortOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setSortBy(option);
                            setIsSortOpen(false);
                          }}
                          className={`block w-full px-4 py-2 text-left text-sm transition-colors ${
                            sortBy === option
                              ? "bg-gold/10 text-gold font-medium"
                              : "text-zinc-300 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2.5 mb-10 pb-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {filterCategories.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex-shrink-0
                    ${
                      isActive
                        ? "bg-gold text-black shadow-[0_0_15px_rgba(212,175,55,0.4)] scale-105"
                        : "bg-transparent border border-gold/30 text-gold hover:bg-gold/10 hover:border-gold/60"
                    }
                  `}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          {/* Results Header */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-gold/80 font-medium uppercase tracking-widest">
              Showing {processedSongs.length} {activeFilter !== "All" ? activeFilter : ""}{" "}
              {processedSongs.length === 1 ? "song" : "songs"}
            </p>
          </div>

          {/* Music Library Grid */}
          <div className="min-h-[300px]">
            {processedSongs.length > 0 ? (
              <motion.div
                layout
                className="flex flex-wrap gap-4 md:gap-5 justify-center lg:justify-start"
              >
                <AnimatePresence>
                  {processedSongs.map((song) => {
                    const isPlaying =
                      currentTrack?.id === song.id &&
                      (status === "playing" || status === "loading");

                    return (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        key={song.id}
                        className="relative group"
                      >
                        <button
                          onClick={() => handleLibraryClick(song)}
                          className={`relative w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px] rounded-lg overflow-hidden border transition-all duration-300
                            ${
                              isPlaying
                                ? "border-gold shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-105"
                                : "border-white/10 hover:border-gold/60 shadow-md hover:shadow-[0_0_15px_rgba(212,175,55,0.15)]"
                            }
                          `}
                        >
                          <img
                            src={song.cover.src}
                            className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                            alt={song.title}
                          />

                          {/* Dark Overlay */}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                            {isPlaying ? (
                              <Pause className="size-5 md:size-6 text-gold" fill="currentColor" />
                            ) : (
                              <Play
                                className="ml-0.5 size-5 md:size-6 text-white"
                                fill="currentColor"
                              />
                            )}
                          </div>
                        </button>

                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-max px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-md shadow-2xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all pointer-events-none z-50 flex flex-col items-center">
                          <p className="text-xs font-semibold text-white">{song.title}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{song.artist}</p>
                          {/* Triangle pointer */}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-zinc-800" />
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            ) : (
              /* Empty State */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="flex size-16 items-center justify-center rounded-full bg-white/5 border border-white/10 mb-4">
                  <Music2 className="size-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-display text-white mb-2">No songs found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search term.</p>
                <button
                  onClick={() => {
                    setActiveFilter("All");
                    setSearchQuery("");
                  }}
                  className="mt-6 text-sm text-gold hover:text-gold/80 transition-colors underline underline-offset-4"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </PageSection>
    </PageLayout>
  );
}
