import { useQuery } from "@tanstack/react-query";
import { videosContent } from "@/content/sections";
import { contentService, select } from "@/services";
import { getVideosServerFn } from "@/services/server-functions";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ActionLink } from "@/components/common/ActionLink";
import { ViewAllLink } from "@/components/common/RouteLink";
import { VideoCard } from "@/components/cards/VideoCard";
import type { RoutePath } from "@/data/routes";

export function Videos({
  limit,
  viewAllTo,
  viewAllLabel,
}: {
  limit?: number;
  viewAllTo?: RoutePath;
  viewAllLabel?: string;
} = {}) {
  const { data: videoData } = useQuery({
    queryKey: ["homepage-videos"],
    queryFn: () => getVideosServerFn(),
  });

  const videos = videoData?.videos;
  const displayVideos = videos ? videos.slice(0, limit) : select.videos(limit);

  return (
    <section id="videos" className="relative py-24 md:py-32">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-14 px-5 lg:px-8">
        <SectionHeading
          eyebrow={videosContent.eyebrow}
          title={videosContent.title}
          subtitle={videosContent.subtitle}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {displayVideos.map((video, i) => (
            <VideoCard key={video.id} video={video} index={i} />
          ))}
        </div>
        {viewAllTo ? (
          <ViewAllLink to={viewAllTo} label={viewAllLabel ?? "View All Videos"} />
        ) : (
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
        )}
      </div>
    </section>
  );
}
