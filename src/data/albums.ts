import type { Album, FeaturedRelease } from "@/types";
import { albumArt } from "./assets";

export const albums: Album[] = [
  {
    id: "shiva-within",
    slug: "shiva-within",
    title: "Shiva Within",
    genre: "Devotional",
    genreIds: ["devotional"],
    artistIds: ["artist-naadbyte"],
    year: "2026",
    releaseDate: "2026-01-10",
    cover: { src: albumArt.shiva, alt: "Shiva Within album cover" },
    description:
      "A divine blend of chants, orchestral textures and modern soundscapes invoking inner peace and strength.",
    songIds: ["song-shiva-within", "song-naad-aarti"],
    streamingLinks: [
      { platform: "spotify", href: "https://open.spotify.com" },
      { platform: "appleMusic", href: "https://music.apple.com" },
      { platform: "youtubeMusic", href: "https://music.youtube.com" },
    ],
    isFeatured: true,
    status: "published",
  },
  {
    id: "echoes-of-naad",
    slug: "echoes-of-naad",
    title: "Echoes of Naad",
    genre: "Cinematic",
    genreIds: ["cinematic"],
    artistIds: ["artist-naadbyte"],
    year: "2026",
    releaseDate: "2026-03-04",
    cover: { src: albumArt.echoes, alt: "Echoes of Naad album cover" },
    description:
      "Wide orchestral horizons and slow-building tension written for stories that stay with you.",
    songIds: ["song-echoes-of-naad"],
    streamingLinks: [
      { platform: "spotify", href: "https://open.spotify.com" },
      { platform: "appleMusic", href: "https://music.apple.com" },
      { platform: "amazonMusic", href: "https://music.amazon.com" },
    ],
    isFeatured: true,
    status: "published",
  },
  {
    id: "neon-mantra",
    slug: "neon-mantra",
    title: "Neon Mantra",
    genre: "Progressive House",
    genreIds: ["edm"],
    artistIds: ["artist-naadbyte"],
    year: "2025",
    releaseDate: "2025-09-19",
    cover: { src: albumArt.neon, alt: "Neon Mantra album cover" },
    description:
      "Ancient mantras rebuilt as euphoric progressive house for the late hours of the night.",
    songIds: ["song-neon-mantra"],
    streamingLinks: [
      { platform: "spotify", href: "https://open.spotify.com" },
      { platform: "youtubeMusic", href: "https://music.youtube.com" },
      { platform: "amazonMusic", href: "https://music.amazon.com" },
    ],
    isFeatured: true,
    status: "published",
  },
  {
    id: "rise-again",
    slug: "rise-again",
    title: "Rise Again",
    genre: "Motivational",
    genreIds: ["motivation"],
    artistIds: ["artist-naadbyte"],
    year: "2025",
    releaseDate: "2025-06-27",
    cover: { src: albumArt.rise, alt: "Rise Again album cover" },
    description:
      "Driving percussion and soaring strings made for the moment you decide to keep going.",
    songIds: ["song-rise-again"],
    streamingLinks: [
      { platform: "spotify", href: "https://open.spotify.com" },
      { platform: "appleMusic", href: "https://music.apple.com" },
      { platform: "youtubeMusic", href: "https://music.youtube.com" },
    ],
    isFeatured: true,
    status: "published",
  },
];

/** Editor-curated homepage ordering, independent of the catalogue. */
export const featuredReleases: FeaturedRelease[] = [
  { id: "fr-1", albumId: "shiva-within", order: 1 },
  { id: "fr-2", albumId: "echoes-of-naad", order: 2 },
  { id: "fr-3", albumId: "neon-mantra", order: 3 },
  { id: "fr-4", albumId: "rise-again", order: 4 },
];
