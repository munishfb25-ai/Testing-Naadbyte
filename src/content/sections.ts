/**
 * All editorial copy for the homepage sections.
 * Kept separate from catalogue data (albums/songs/…) so a CMS can map
 * "pages/blocks" here and "custom post types" to `src/data/*`.
 */

import { routes } from "@/data/routes";
import type {
  AboutContent,
  FooterContent,
  HeroContent,
  NewsletterContent,
  SectionContent,
} from "@/types";

export const heroContent: HeroContent = {
  eyebrow: "Music Beyond Boundaries",
  title: "Every Emotion Has a Soundtrack",
  headline: ["Every Emotion Has", "a Soundtrack"],
  subtitle: "Original music that inspires, energizes and connects across every genre.",
  primaryCta: { label: "Listen Now", href: "#releases" },
  secondaryCta: { label: "Explore Music", href: "#genres" },
  scrollHint: "Scroll",
};

/**
 * Flagship bespoke-commission section (homepage, directly after the hero).
 * A CMS can map this to a single "block" with a repeater of process steps.
 */
export type CreateYourSongSectionContent = SectionContent & {
  intro: string;
  occasions: string[];
  steps: { id: string; title: string; body: string }[];
  benefits: { id: string; title: string; body: string }[];
  experience: { quote: string; attribution: string };
  cta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  note: string;
};

export const createYourSongSection: CreateYourSongSectionContent = {
  eyebrow: "The Flagship Experience",
  title: "Turn Your Story Into an Original Song",
  subtitle:
    "Not a playlist. Not a template. A completely original composition written around your memory, your people and your moment.",
  intro:
    "We make original music — and we make it for you. Tell us the story: the wedding morning, the prayer you grew up with, the person you miss, the brand you built from nothing. Our composers, lyricists and producers turn that feeling into a studio-mastered track that exists nowhere else in the world, in Hindi, English or Punjabi.",
  occasions: [
    "Weddings",
    "Birthdays",
    "Anniversaries",
    "Family Portraits in Sound",
    "Memorials & Tributes",
    "Spiritual Journeys",
    "Life Stories",
    "Brands & Films",
  ],
  steps: [
    {
      id: "story",
      title: "Share Your Story",
      body: "A guided journey — the occasion, the emotion, the names, the language. Every detail becomes a lyric.",
    },
    {
      id: "compose",
      title: "We Compose",
      body: "Our writers and producers shape melody, arrangement and vocals around the feeling you described.",
    },
    {
      id: "review",
      title: "You Review",
      body: "Hear the first cut privately. Refine the words, the tempo, the voice — until it sounds like your memory.",
    },
    {
      id: "alive",
      title: "Your Song Comes Alive",
      body: "Mixed and mastered, delivered in studio quality, and released to the world if you want it there.",
    },
  ],
  benefits: [
    {
      id: "original",
      title: "Written Only For You",
      body: "Original lyrics, original melody, original arrangement. Nothing recycled, nothing templated.",
    },
    {
      id: "voices",
      title: "Real Voices, Real Musicians",
      body: "Sung and played by our artists across Hindi, English and Punjabi — devotional to cinematic to electronic.",
    },
    {
      id: "studio",
      title: "Studio-Grade Master",
      body: "Mixed and mastered to label standard, delivered in high resolution and ready for any platform.",
    },
    {
      id: "yours",
      title: "Yours to Keep",
      body: "Play it at the ceremony, gift it, or release it to the world with our distribution behind it.",
    },
  ],
  experience: {
    quote:
      "They didn't send us a song. They sent us the morning we got married — the names, the nervousness, the light in the room. Everyone cried before the first chorus.",
    attribution: "A NaadByte commission · Wedding, Amritsar",
  },
  cta: { label: "Begin Your Song", href: routes.createYourSong },
  secondaryCta: { label: "See How It Works", href: routes.createYourSong },
  note: "Commissioned like a piece of art · Limited slots each month",
};

export const releasesContent: SectionContent = {
  eyebrow: "Featured Releases",
  title: "Latest From the Label",
  subtitle: "Newly released records, mastered for every listening room.",
};

export const genresContent: SectionContent = {
  eyebrow: "Browse Genres",
  title: "Sound For Every Feeling",
  subtitle: "From temple chants to festival mainstages — one label, many languages.",
};

export const videosContent: SectionContent & {
  channelCta: { label: string; href: string };
} = {
  eyebrow: "Latest Videos",
  title: "Watch the Sound",
  subtitle: "Visual worlds built around every NaadByte release.",
  channelCta: { label: "Visit our channel", href: "https://youtube.com" },
};

export const aboutContent: AboutContent = {
  eyebrow: "About NaadByte",
  title: "Sound That Moves. Stories That Stay.",
  story: [
    "NaadByte is an independent music label built on a simple belief — sound is the shortest distance between two hearts. 'Naad' is the primordial vibration; 'Byte' is the modern world it now travels through.",
    "We produce original music across devotional, cinematic, motivational, EDM, progressive house, trance, lo-fi, rap and instrumental work — in Hindi, English and Punjabi.",
  ],
  pillars: [
    {
      id: "mission",
      title: "Our Mission",
      body: "To create original music that carries emotion across languages, cultures and platforms — released to the world without gatekeepers.",
    },
    {
      id: "vision",
      title: "Our Vision",
      body: "To become the home of boundary-free sound, where a devotional chant and a festival anthem can live under one label.",
    },
  ],
  stats: [
    { id: "genres", value: "12+", label: "Genres produced" },
    { id: "languages", value: "3", label: "Languages" },
    { id: "platforms", value: "9", label: "Streaming platforms" },
  ],
};

export const platformsContent: SectionContent = {
  eyebrow: "Listen Everywhere",
  title: "Available on Every Platform",
  subtitle: "Stream NaadByte wherever you already listen.",
};

export const newsletterContent: NewsletterContent = {
  eyebrow: "Stay Connected",
  title: "New Music, First.",
  subtitle: "Subscribe for new releases, behind-the-scenes sessions and early access.",
  placeholder: "Enter your email",
  cta: "Subscribe",
  successMessage: "You're on the list. Welcome to NaadByte.",
};

export const footerContent: FooterContent = {
  about:
    "We create music that transcends boundaries and connects hearts. Cinematic. Devotional. Electronic. Ambient. Inspirational.",
  columns: [
    {
      id: "explore",
      title: "Explore",
      links: [
        { label: "Home", href: routes.home },
        { label: "Music", href: routes.music },
        { label: "Videos", href: routes.videos },
        { label: "Releases", href: routes.releases },
      ],
    },
    {
      id: "company",
      title: "Company",
      links: [
        { label: "About", href: routes.about },
        { label: "Bespoke Music", href: routes.createYourSong },
        { label: "Blog", href: routes.blog },
        { label: "Contact", href: routes.contact },
        { label: "Privacy Policy", href: routes.privacy },
        { label: "Terms", href: routes.terms },
      ],
    },
  ],
};
