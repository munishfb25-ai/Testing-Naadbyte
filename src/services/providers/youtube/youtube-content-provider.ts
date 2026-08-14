import type { Video } from "@/types";
import { localContentProvider } from "../local-content-provider";
import { isYouTubeApiConfigured, youtubeConfig } from "./config";
import {
  mapYouTubeApiItem,
  mapYouTubeRssEntry,
  type YouTubeApiPlaylistItem,
  type YouTubeRssEntry,
} from "./mappers";

/**
 * In-memory cache to prevent excessive API requests and avoid rate limits.
 */
let cachedVideos: Video[] | null = null;
let lastFetchedAt = 0;

/**
 * Parses YouTube's Atom XML RSS feed using a resilient regex approach
 * that works identically in browser, SSR Node.js, and edge environments without extra dependencies.
 */
export function parseYouTubeRss(xmlText: string): YouTubeRssEntry[] {
  const entries: YouTubeRssEntry[] = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match: RegExpExecArray | null;

  while ((match = entryRegex.exec(xmlText)) !== null) {
    const block = match[1];

    const videoIdMatch =
      block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/) || block.match(/<id>yt:video:([^<]+)<\/id>/);
    const titleMatch = block.match(/<title>([^<]+)<\/title>/);
    const descMatch = block.match(/<media:description>([\s\S]*?)<\/media:description>/);
    const pubMatch = block.match(/<published>([^<]+)<\/published>/);
    const thumbMatch = block.match(/<media:thumbnail[^>]+url="([^"]+)"/);

    if (videoIdMatch && videoIdMatch[1]) {
      const videoId = videoIdMatch[1].trim();
      const title = titleMatch ? titleMatch[1].trim() : `Video ${videoId}`;
      const description = descMatch ? descMatch[1].trim() : "";
      const publishedAt = pubMatch ? pubMatch[1].trim() : new Date().toISOString();
      const thumbnailUrl = thumbMatch ? thumbMatch[1].trim() : undefined;

      entries.push({
        videoId,
        title,
        description,
        publishedAt,
        thumbnailUrl,
      });
    }
  }

  return entries;
}

/**
 * YouTube Provider
 *
 * Single source of truth for all video content.
 * Follows an orderly resilience hierarchy:
 * 1. Cache (15 min TTL)
 * 2. YouTube Data API v3 (if API key is present)
 * 3. YouTube Public RSS Feed (zero-auth public fallback)
 * 4. Local Catalogue (offline/build-time safety net)
 */
export const youtubeContentProvider = {
  name: "youtube",

  /**
   * Fetches videos directly from YouTube Data API v3.
   */
  async fetchFromApi(): Promise<Video[]> {
    const apiKey = youtubeConfig.apiKey;
    const channelId = youtubeConfig.channelId;

    if (!apiKey) {
      throw new Error("YouTube API key is not configured.");
    }

    // Convert Channel ID (UC...) to Uploads Playlist ID (UU...)
    const playlistId = channelId.startsWith("UC") ? `UU${channelId.slice(2)}` : channelId;

    const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
    url.searchParams.set("part", "snippet,contentDetails");
    url.searchParams.set("playlistId", playlistId);
    url.searchParams.set("maxResults", String(youtubeConfig.maxResults));
    url.searchParams.set("key", apiKey);

    const res = await fetch(url.toString(), {
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      throw new Error(`YouTube API request failed with status ${res.status}: ${errText}`);
    }

    const data = (await res.json()) as { items?: YouTubeApiPlaylistItem[] };
    if (!data.items || data.items.length === 0) {
      return [];
    }

    return data.items.map((item, index) => mapYouTubeApiItem(item, index));
  },

  /**
   * Fetches videos from the YouTube Channel RSS Feed without requiring an API key.
   */
  async fetchFromRss(): Promise<Video[]> {
    const channelId = youtubeConfig.channelId;
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

    const res = await fetch(rssUrl);
    if (!res.ok) {
      throw new Error(`YouTube RSS request failed with status ${res.status}`);
    }

    const xml = await res.text();
    const parsedEntries = parseYouTubeRss(xml);

    if (parsedEntries.length === 0) {
      return [];
    }

    return parsedEntries.map((entry, index) => mapYouTubeRssEntry(entry, index));
  },

  /**
   * Retrieves all channel videos with automatic multi-tier fallback and caching.
   */
  async getVideos(): Promise<Video[]> {
    const now = Date.now();

    // 1. Serve from in-memory cache if still fresh
    if (cachedVideos && cachedVideos.length > 0 && now - lastFetchedAt < youtubeConfig.cacheTtlMs) {
      return cachedVideos;
    }

    // 2. Primary: YouTube Channel Public RSS Feed
    try {
      const rssVideos = await this.fetchFromRss();
      if (rssVideos.length > 0) {
        cachedVideos = rssVideos;
        lastFetchedAt = now;
        return rssVideos;
      }
    } catch (err) {
      console.warn(
        "[youtube-provider] YouTube RSS fetch failed, falling back to local catalogue:",
        err,
      );
    }

    // 3. Fallback: Local catalogue
    const localVideos = await localContentProvider.getVideos();
    return localVideos;
  },

  /**
   * Clears the in-memory cache to force a fresh fetch on next call.
   */
  invalidateCache(): void {
    cachedVideos = null;
    lastFetchedAt = 0;
  },
};
