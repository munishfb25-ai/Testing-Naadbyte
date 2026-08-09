import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageHeader, PageSection } from "@/components/layout/PageLayout";
import { VideoCard } from "@/components/cards/VideoCard";
import { ActionLink } from "@/components/common/ActionLink";
import { select } from "@/services";
import { videosContent } from "@/content/sections";
import { videosPage } from "@/content/pages";
import { pageMeta, withBrand } from "@/lib/seo";
import { Play } from "lucide-react";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: pageMeta({
      title: withBrand("Videos"),
      description: videosPage.description,
    }),
  }),
  component: VideosPage,
});

function VideosPage() {
  const videos = select.videos();
  const featuredVideo = videos[0];
  const gridVideos = videos.slice(1);

  return (
    <PageLayout>
      <PageHeader
        eyebrow={videosPage.eyebrow}
        title={videosPage.title}
        subtitle={videosPage.subtitle}
      />

      {featuredVideo && (
        <PageSection className="pt-0">
          <a
            href={
              featuredVideo.provider === "youtube"
                ? `https://www.youtube.com/watch?v=${featuredVideo.videoId}`
                : "#"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-deep transition-all duration-500 hover:border-gold/40"
          >
            <div className="relative aspect-[21/9] w-full overflow-hidden">
              <img
                src={
                  featuredVideo.thumbnail ||
                  (featuredVideo.provider === "youtube"
                    ? `https://img.youtube.com/vi/${featuredVideo.videoId}/maxresdefault.jpg`
                    : "")
                }
                alt={featuredVideo.title}
                className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-background/20 transition-colors duration-300 group-hover:bg-background/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-gold/90 text-black shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 md:size-20">
                  <Play className="ml-1 size-6 md:size-8" />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 p-6 md:p-8">
              <span className="eyebrow text-gold">FEATURED VIDEO</span>
              <h2 className="text-2xl font-display leading-tight md:text-4xl">
                {featuredVideo.title}
              </h2>
              <p className="max-w-2xl text-muted-foreground">{featuredVideo.description}</p>
            </div>
          </a>
        </PageSection>
      )}

      <PageSection className={featuredVideo ? "pt-0" : ""}>
        {gridVideos.length > 0 && (
          <div className="mb-8 flex items-center justify-between">
            <h3 className="font-display text-xl uppercase tracking-widest text-muted-foreground">
              More from NaadByte
            </h3>
          </div>
        )}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {gridVideos.map((video, i) => (
            <VideoCard key={video.id} video={video} index={i} />
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <ActionLink
            href={videosContent.channelCta.href}
            variant="outline"
            target="_blank"
            rel="noreferrer noopener"
          >
            {videosContent.channelCta.label}
          </ActionLink>
        </div>
      </PageSection>
    </PageLayout>
  );
}
