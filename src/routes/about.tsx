import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageLayout, PageSection } from "@/components/layout/PageLayout";
import { SectionHeading } from "@/components/common/SectionHeading";
import { RouteLink } from "@/components/common/RouteLink";
import { select } from "@/services";
import { aboutContent } from "@/content/sections";
import { aboutPage } from "@/content/pages";
import { routes } from "@/data/routes";
import { pageMeta, withBrand } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: pageMeta({
      title: withBrand("About the Label"),
      description: aboutPage.description,
    }),
  }),
  component: AboutPage,
});

function AboutPage() {
  const artists = select.artists();
  const testimonials = select.testimonials();

  return (
    <PageLayout>
      {/* 1. HERO SECTION */}
      <header className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden py-24 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 size-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl bg-[radial-gradient(circle,oklch(0.82_0.135_82/0.55),transparent_65%)]"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-5"
        >
          <span className="eyebrow tracking-[0.2em] text-gold font-semibold text-xs md:text-sm uppercase">
            {aboutPage.eyebrow}
          </span>
          <h1 className="text-balance text-5xl leading-tight md:text-7xl lg:text-8xl font-display text-white">
            {aboutPage.title}
          </h1>
          <p className="max-w-2xl text-pretty text-base text-muted-foreground md:text-lg leading-relaxed mt-4">
            {aboutPage.subtitle}
          </p>
        </motion.div>
      </header>

      {/* 2. THE STORY */}
      <PageSection className="pt-0">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] items-start">
            {/* Left: Sticky Heading */}
            <div className="lg:sticky lg:top-32">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight">
                Sound That Moves.
                <br />
                <span className="text-gold">Stories That Stay.</span>
              </h2>
            </div>

            {/* Right: Narrative Text */}
            <div className="flex flex-col gap-8">
              {aboutContent.story.map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="text-pretty text-base leading-relaxed text-muted-foreground md:text-lg lg:text-xl font-light"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      </PageSection>

      {/* 3. CORE PILLARS */}
      <PageSection className="bg-background/50 border-y border-border py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Foundation" title="Our Core Pillars" align="center" />

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {aboutContent.pillars.map((pillar, i) => (
              <motion.article
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-10 md:p-12 transition-all hover:border-gold/40 hover:shadow-deep"
              >
                <div className="absolute -inset-4 bg-gradient-to-tr from-gold/5 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <h3 className="font-display text-3xl text-foreground mb-4">{pillar.title}</h3>
                  <p className="text-base leading-relaxed text-muted-foreground">{pillar.body}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </PageSection>

      {/* 4. STATISTICS */}
      <PageSection className="py-24">
        <div className="mx-auto max-w-7xl">
          <dl className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-border">
            {aboutContent.stats.map((stat, i) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col gap-3 pt-12 md:pt-0 first:pt-0"
              >
                <dt className="order-2 text-sm uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                  {stat.label}
                </dt>
                <dd className="order-1 font-display text-6xl lg:text-7xl text-gold-gradient drop-shadow-sm">
                  {stat.value}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </PageSection>

      {/* 5. THE COLLECTIVE (ARTISTS) */}
      {artists.length > 0 && (
        <PageSection className="bg-card/30 py-24 border-y border-border">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="The Collective" title="Our Artists" align="center" />

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {artists.map((artist, i) => (
                <motion.article
                  key={artist.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all hover:border-gold/40 hover:-translate-y-1 shadow-md hover:shadow-gold/10"
                >
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display text-2xl transition-colors group-hover:text-gold">
                      {artist.name}
                    </h3>
                    <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">
                      {artist.role}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {artist.bio}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </PageSection>
      )}

      {/* 6. TESTIMONIALS */}
      {testimonials.length > 0 && (
        <PageSection className="py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="Kind Words" title="What People Say" align="center" />

            <div className="mt-16 grid gap-8 sm:grid-cols-2">
              {testimonials.map((t, i) => (
                <motion.blockquote
                  key={t.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative overflow-hidden rounded-3xl border border-border bg-card/50 p-10 backdrop-blur-sm"
                >
                  <div className="absolute top-8 left-8 text-6xl text-gold/20 font-serif leading-none">
                    "
                  </div>
                  <p className="relative z-10 text-lg leading-relaxed text-foreground/90 font-light pt-6">
                    {t.quote}
                  </p>
                  <footer className="mt-8 flex flex-col gap-1 border-t border-border/50 pt-6">
                    <cite className="text-sm uppercase tracking-[0.2em] text-gold font-semibold not-italic">
                      {t.author}
                    </cite>
                    {t.role && <span className="text-xs text-muted-foreground">{t.role}</span>}
                  </footer>
                </motion.blockquote>
              ))}
            </div>
          </div>
        </PageSection>
      )}

      {/* 7. CTA SECTION */}
      <PageSection className="pb-32 pt-16">
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center gap-8 bg-card border border-border rounded-3xl p-12 lg:p-20 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent pointer-events-none" />
          <div className="relative z-10 flex flex-col items-center gap-6">
            <h2 className="font-display text-4xl md:text-5xl">Work With NaadByte</h2>
            <p className="text-muted-foreground text-lg max-w-lg">
              Whether you want to license a track, collaborate on a project, or commission a bespoke
              song—we're ready to listen.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
              <RouteLink
                to={routes.contact}
                className="h-14 px-10 rounded-full bg-gold text-black font-semibold tracking-wide hover:scale-105 transition-transform shadow-lg shadow-gold/20 flex items-center justify-center"
              >
                Contact the Label
              </RouteLink>
              <RouteLink
                to={routes.createYourSong}
                variant="outline"
                className="h-14 px-10 rounded-full border border-border bg-transparent text-foreground font-semibold tracking-wide hover:border-gold/50 hover:text-gold transition-colors flex items-center justify-center backdrop-blur-sm"
              >
                Create Your Song
              </RouteLink>
            </div>
          </div>
        </div>
      </PageSection>
    </PageLayout>
  );
}
