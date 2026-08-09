import { releasesContent } from "@/content/sections";
import { select } from "@/services";
import { SectionHeading } from "@/components/common/SectionHeading";
import { AlbumCard } from "@/components/cards/AlbumCard";
import { ViewAllLink } from "@/components/common/RouteLink";
import type { RoutePath } from "@/data/routes";

/**
 * Featured releases grid. Pass `limit` + `viewAllTo` to render it as a
 * homepage preview; omit both to render the full list on a dedicated page.
 */
export function FeaturedReleases({
  limit,
  viewAllTo,
  viewAllLabel,
}: {
  limit?: number;
  viewAllTo?: RoutePath;
  viewAllLabel?: string;
} = {}) {
  return (
    <section id="releases" className="relative py-24 md:py-32">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-14 px-5 lg:px-8">
        <SectionHeading
          eyebrow={releasesContent.eyebrow}
          title={releasesContent.title}
          subtitle={releasesContent.subtitle}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {select.featuredAlbums(limit).map((release, i) => (
            <AlbumCard key={release.id} release={release} index={i} />
          ))}
        </div>
        {viewAllTo ? (
          <ViewAllLink to={viewAllTo} label={viewAllLabel ?? "View All Releases"} />
        ) : null}
      </div>
    </section>
  );
}
