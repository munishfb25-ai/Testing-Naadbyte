import type { Song } from "@/types";
import { albumArt } from "./assets";

// TEST AUDIO ONLY — replace with WordPress audio_url before production
const TEST_AUDIO_URL_1 = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
const TEST_AUDIO_URL_2 = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3";
const TEST_AUDIO_URL_3 = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3";
const TEST_AUDIO_URL_4 = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3";
const TEST_AUDIO_URL_5 = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3";

export const songs: Song[] = [
  {
    id: "song-shiva-within",
    slug: "shiva-within",
    title: "Shiva Within",
    artistIds: ["artist-naadbyte"],
    albumId: "shiva-within",
    genreIds: ["devotional"],
    language: "hindi",
    durationSeconds: 312,
    releaseDate: "2026-01-10",
    cover: { src: albumArt.shiva, alt: "Shiva Within cover" },
    audioUrl: TEST_AUDIO_URL_1,
    streamingLinks: [
      { platform: "spotify", href: "https://open.spotify.com" },
      { platform: "appleMusic", href: "https://music.apple.com" },
    ],
    tags: ["chant", "orchestral"],
    isFeatured: true,
    status: "published",
  },
  {
    id: "song-naad-aarti",
    slug: "naad-aarti",
    title: "Naad Aarti",
    artistIds: ["artist-naadbyte"],
    albumId: "shiva-within",
    genreIds: ["devotional", "meditation"],
    language: "hindi",
    durationSeconds: 268,
    releaseDate: "2026-01-10",
    cover: { src: albumArt.shiva, alt: "Naad Aarti cover" },
    audioUrl: TEST_AUDIO_URL_2,
    streamingLinks: [{ platform: "spotify", href: "https://open.spotify.com" }],
    status: "published",
  },
  {
    id: "song-echoes-of-naad",
    slug: "echoes-of-naad",
    title: "Echoes of Naad",
    artistIds: ["artist-naadbyte"],
    albumId: "echoes-of-naad",
    genreIds: ["cinematic"],
    language: "instrumental",
    durationSeconds: 344,
    releaseDate: "2026-03-04",
    cover: { src: albumArt.echoes, alt: "Echoes of Naad cover" },
    audioUrl: TEST_AUDIO_URL_3,
    streamingLinks: [{ platform: "spotify", href: "https://open.spotify.com" }],
    isFeatured: true,
    status: "published",
  },
  {
    id: "song-neon-mantra",
    slug: "neon-mantra",
    title: "Neon Mantra",
    artistIds: ["artist-naadbyte"],
    albumId: "neon-mantra",
    genreIds: ["edm"],
    language: "hindi",
    durationSeconds: 401,
    releaseDate: "2025-09-19",
    cover: { src: albumArt.neon, alt: "Neon Mantra cover" },
    audioUrl: TEST_AUDIO_URL_4,
    streamingLinks: [
      { platform: "spotify", href: "https://open.spotify.com" },
      { platform: "youtubeMusic", href: "https://music.youtube.com" },
    ],
    isFeatured: true,
    status: "published",
  },
  {
    id: "song-rise-again",
    slug: "rise-again",
    title: "Rise Again",
    artistIds: ["artist-naadbyte"],
    albumId: "rise-again",
    genreIds: ["motivation"],
    language: "english",
    durationSeconds: 236,
    releaseDate: "2025-06-27",
    cover: { src: albumArt.rise, alt: "Rise Again cover" },
    audioUrl: TEST_AUDIO_URL_5,
    streamingLinks: [{ platform: "spotify", href: "https://open.spotify.com" }],
    isFeatured: true,
    status: "published",
  },
];
