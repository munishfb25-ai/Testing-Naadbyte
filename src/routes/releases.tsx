import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageSection } from "@/components/layout/PageLayout";
import { AlbumCard } from "@/components/cards/AlbumCard";
import { select } from "@/services";
import { releasesPage } from "@/content/pages";
import { pageMeta, withBrand } from "@/lib/seo";
import { motion } from "framer-motion";
import { Music2 } from "lucide-react";

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
  const featuredRelease = albums.find((a) => a.type === "album") || albums[0];

  return (
    <PageLayout>
      <header className="relative overflow-hidden py-14 md:py-20 lg:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl bg-[radial-gradient(circle,oklch(0.82_0.135_82/0.55),transparent_65%)]"
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 lg:flex-row lg:items-center lg:gap-16 lg:px-8"
        >
          {featuredRelease && (
            <>
              <div className="relative aspect-square w-full max-w-[320px] shrink-0 overflow-hidden rounded-2xl shadow-2xl lg:max-w-[400px]">
                <img
                  src={featuredRelease.cover.src}
                  alt={featuredRelease.cover.alt}
                  className="size-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-5">
                <span className="eyebrow">LATEST RELEASE</span>
                <h1 className="text-balance text-4xl leading-tight md:text-5xl lg:text-6xl">
                  {featuredRelease.title}
                </h1>
                <p className="max-w-xl text-pretty text-sm text-muted-foreground md:text-base">
                  {releasesPage.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  {featuredRelease.streamingLinks?.[0] && (
                    <a
                      href={featuredRelease.streamingLinks[0].href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gold px-8 text-sm font-semibold text-black transition-transform hover:scale-105"
                    >
                      <Music2 className="size-4" />
                      LISTEN NOW
                    </a>
                  )}
                </div>
              </div>
            </>
          )}
        </motion.div>
      </header>

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
