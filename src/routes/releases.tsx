import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageHeader, PageSection } from "@/components/layout/PageLayout";
import { AlbumCard } from "@/components/cards/AlbumCard";
import { select } from "@/services";
import { releasesPage } from "@/content/pages";
import { pageMeta, withBrand } from "@/lib/seo";

export const Route = createFileRoute("/releases")({
  head: () => ({
    meta: pageMeta({
      title: withBrand("Releases"),
      description: releasesPage.description,
    }),
  }),
  component: ReleasesPage,
});

function ReleasesPage() {
  const albums = select.albums();

  return (
    <PageLayout>
      <PageHeader
        eyebrow={releasesPage.eyebrow}
        title={releasesPage.title}
        subtitle={releasesPage.subtitle}
      />
      <PageSection>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {albums.map((album, i) => (
            <AlbumCard key={album.id} release={album} index={i} />
          ))}
        </div>
      </PageSection>
    </PageLayout>
  );
}
