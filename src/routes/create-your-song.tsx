import { createFileRoute } from "@tanstack/react-router";
import { PageLayout, PageSection } from "@/components/layout/PageLayout";
import { CreateYourSongWizard } from "@/components/create-your-song/CreateYourSongWizard";
import { createYourSongPage } from "@/content/pages";
import { pageMeta, withBrand } from "@/lib/seo";
import { motion } from "framer-motion";
import { brandAssets } from "@/data/assets";

export const Route = createFileRoute("/create-your-song")({
  head: () => ({
    meta: pageMeta({
      title: withBrand("Create Your Song"),
      description: createYourSongPage.description,
    }),
  }),
  component: CreateYourSongPage,
});

function CreateYourSongPage() {
  return (
    <PageLayout>
      <header className="relative overflow-hidden pt-14 md:pt-20 lg:pt-24">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/4 top-0 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl bg-[radial-gradient(circle,oklch(0.82_0.135_82/0.55),transparent_65%)]"
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 lg:flex-row lg:items-center lg:gap-16 lg:px-8"
        >
          <div className="flex flex-col gap-5 lg:w-1/2">
            <span className="eyebrow">{createYourSongPage.eyebrow}</span>
            <h1 className="text-balance text-4xl leading-tight md:text-5xl lg:text-6xl">
              {createYourSongPage.title}
            </h1>
            <p className="max-w-xl text-pretty text-sm text-muted-foreground md:text-base">
              {createYourSongPage.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-widest text-gold/80">
              <span>Weddings</span>
              <span className="text-muted-foreground">·</span>
              <span>Films</span>
              <span className="text-muted-foreground">·</span>
              <span>Brands</span>
              <span className="text-muted-foreground">·</span>
              <span>Personal Stories</span>
            </div>
          </div>
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-2xl lg:w-1/2 lg:aspect-square lg:max-w-md ml-auto border border-border">
            <img
              src={brandAssets.heroBackground}
              alt={brandAssets.heroBackgroundAlt}
              className="size-full object-cover"
            />
          </div>
        </motion.div>
      </header>

      <PageSection>
        <CreateYourSongWizard />
      </PageSection>
    </PageLayout>
  );
}
