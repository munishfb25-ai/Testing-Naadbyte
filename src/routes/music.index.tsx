import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageHeader, PageSection } from "@/components/layout/PageLayout";
import { SongCard } from "@/components/cards/SongCard";
import { GenreCard } from "@/components/cards/GenreCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import { select } from "@/services";
import { musicPage } from "@/content/pages";
import { pageMeta, withBrand } from "@/lib/seo";

export const Route = createFileRoute("/music/")({
  head: () => ({
    meta: pageMeta({
      title: withBrand("Music"),
      description: musicPage.description,
    }),
  }),
  component: MusicPage,
});

function MusicPage() {
  const songs = select.songs();
  const genres = select.genres();

  return (
    <PageLayout>
      <PageHeader
        eyebrow={musicPage.eyebrow}
        title={musicPage.title}
        subtitle={musicPage.subtitle}
      />

      <PageSection>
        <div className="flex flex-col gap-3">
          {songs.map((song, i) => (
            <SongCard key={song.id} song={song} index={i} />
          ))}
        </div>
      </PageSection>

      <PageSection>
        <SectionHeading eyebrow="Browse Genres" title="Sound For Every Feeling" align="left" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {genres.map((genre, i) => (
            <GenreCard key={genre.id} genre={genre} index={i} />
          ))}
        </div>
      </PageSection>
    </PageLayout>
  );
}
