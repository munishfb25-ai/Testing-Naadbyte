import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageHeader, PageSection } from "@/components/layout/PageLayout";
import { VideoCard } from "@/components/cards/VideoCard";
import { ActionLink } from "@/components/common/ActionLink";
import { select } from "@/services";
import { videosContent } from "@/content/sections";
import { videosPage } from "@/content/pages";
import { pageMeta, withBrand } from "@/lib/seo";

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

  return (
    <PageLayout>
      <PageHeader
        eyebrow={videosPage.eyebrow}
        title={videosPage.title}
        subtitle={videosPage.subtitle}
      />
      <PageSection>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {videos.map((video, i) => (
            <VideoCard key={video.id} video={video} index={i} />
          ))}
        </div>
        <div className="flex justify-center">
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
