import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { PageLayout, PageHeader, PageSection } from "@/components/layout/PageLayout";
import { SongCard } from "@/components/cards/SongCard";
import { formatDuration } from "@/lib/utils";
import { SectionHeading } from "@/components/common/SectionHeading";
import { PlatformIcon } from "@/components/common/PlatformIcon";
import { RouteLink } from "@/components/common/RouteLink";
import { select } from "@/services";
import { routes } from "@/data/routes";
import { pageMeta, withBrand } from "@/lib/seo";

export const Route = createFileRoute("/music/$slug")({
  loader: ({ params }) => {
    const song = select.songBySlug(params.slug);
    if (!song) throw notFound();
    return { song };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: pageMeta({
          title: withBrand("Song Not Found"),
          description: "This song is not available.",
          noindex: true,
        }),
      };
    }
    const { song } = loaderData;
    return {
      meta: pageMeta({
        title: withBrand(song.title),
        description: `Listen to ${song.title} by NaadByte — released ${song.releaseDate}.`,
      }),
    };
  },
  component: SongPage,
  errorComponent: SongError,
  notFoundComponent: SongNotFound,
});

function SongPage() {
  const { slug } = Route.useParams();
  const song = select.songBySlug(slug);
  if (!song) return <SongNotFound />;
  const album = song.albumId ? select.albumById(song.albumId) : undefined;
  const related = album ? select.songsByAlbum(album.id).filter((s) => s.id !== song.id) : [];

  return (
    <PageLayout>
      <PageSection className="pt-6">
        <div className="grid gap-10 lg:grid-cols-[320px_1fr] lg:items-start">
          <img
            src={song.cover.src}
            alt={song.cover.alt}
            width={640}
            height={640}
            className="w-full max-w-sm rounded-2xl border border-border object-cover shadow-deep"
          />
          <div className="flex flex-col gap-5">
            <span className="eyebrow">
              {song.genreIds.map((id) => select.genreById(id)?.name ?? id).join(" · ")}
            </span>
            <h1 className="text-balance text-4xl leading-tight md:text-6xl">{song.title}</h1>
            <p className="text-sm text-muted-foreground">
              {song.language.charAt(0).toUpperCase() + song.language.slice(1)} ·{" "}
              {formatDuration(song.durationSeconds)} · Released {song.releaseDate}
            </p>
            {album ? (
              <p className="text-sm text-muted-foreground">
                From the album{" "}
                <Link
                  to={routes.releases}
                  className="text-gold transition-opacity hover:opacity-80"
                >
                  {album.title}
                </Link>
              </p>
            ) : null}

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {song.streamingLinks.map((link) => {
                const meta = select.platformByKey(link.platform);
                return (
                  <a
                    key={link.platform}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.18em] text-muted-foreground transition-all hover:border-gold hover:text-gold"
                  >
                    <PlatformIcon platform={link.platform} className="size-4" />
                    {meta?.name ?? link.platform}
                  </a>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <RouteLink to={routes.music} variant="outline" size="sm">
                All Music
              </RouteLink>
              <RouteLink to={routes.createYourSong} size="sm">
                Create Your Song
              </RouteLink>
            </div>
          </div>
        </div>
      </PageSection>

      {related.length ? (
        <PageSection>
          <SectionHeading eyebrow="More From This Release" title="Related Tracks" align="left" />
          <div className="flex flex-col gap-3">
            {related.map((s, i) => (
              <SongCard key={s.id} song={s} index={i} />
            ))}
          </div>
        </PageSection>
      ) : null}
    </PageLayout>
  );
}

function SongNotFound() {
  const { slug } = Route.useParams();
  return (
    <PageLayout>
      <PageHeader
        eyebrow="404"
        title="Song Not Found"
        subtitle={`We couldn't find a track at "${slug}".`}
      >
        <div className="pt-4">
          <RouteLink to={routes.music} variant="outline">
            Browse All Music
          </RouteLink>
        </div>
      </PageHeader>
    </PageLayout>
  );
}

function SongError() {
  return (
    <PageLayout>
      <PageHeader
        eyebrow="Error"
        title="This Track Didn't Load"
        subtitle="Something went wrong. Try again or head back to the catalogue."
      >
        <div className="pt-4">
          <RouteLink to={routes.music} variant="outline">
            Browse All Music
          </RouteLink>
        </div>
      </PageHeader>
    </PageLayout>
  );
}
