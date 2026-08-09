import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageLayout, PageHeader, PageSection } from "@/components/layout/PageLayout";
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
      <PageHeader
        eyebrow={aboutPage.eyebrow}
        title={aboutPage.title}
        subtitle={aboutPage.subtitle}
      />

      <PageSection>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            {aboutContent.story.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="text-pretty text-sm leading-relaxed text-muted-foreground md:text-base"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
          <div className="flex flex-col gap-6">
            {aboutContent.pillars.map((pillar, i) => (
              <motion.article
                key={pillar.id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="glass-panel rounded-2xl p-7"
              >
                <h2 className="font-display text-2xl">{pillar.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
              </motion.article>
            ))}
          </div>
        </div>

        <dl className="grid grid-cols-3 gap-4 border-t border-border pt-8">
          {aboutContent.stats.map((stat) => (
            <div key={stat.id} className="flex flex-col gap-1">
              <dt className="order-2 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                {stat.label}
              </dt>
              <dd className="order-1 font-display text-4xl text-gold-gradient">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </PageSection>

      {artists.length ? (
        <PageSection>
          <SectionHeading eyebrow="The Collective" title="Artists" align="left" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {artists.map((artist) => (
              <article
                key={artist.id}
                className="rounded-2xl border border-border bg-card p-6 shadow-deep"
              >
                <h3 className="font-display text-2xl">{artist.name}</h3>
                <p className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-gold">
                  {artist.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{artist.bio}</p>
              </article>
            ))}
          </div>
        </PageSection>
      ) : null}

      {testimonials.length ? (
        <PageSection>
          <SectionHeading eyebrow="Kind Words" title="What People Say" align="left" />
          <div className="grid gap-6 sm:grid-cols-2">
            {testimonials.map((t) => (
              <blockquote
                key={t.id}
                className="glass-panel rounded-2xl p-7 text-sm leading-relaxed text-muted-foreground"
              >
                <p>“{t.quote}”</p>
                <footer className="mt-4 text-[0.65rem] uppercase tracking-[0.2em] text-gold">
                  {t.author}
                  {t.role ? ` · ${t.role}` : ""}
                </footer>
              </blockquote>
            ))}
          </div>
        </PageSection>
      ) : null}

      <PageSection>
        <div className="flex flex-wrap gap-3">
          <RouteLink to={routes.contact}>Contact the Label</RouteLink>
          <RouteLink to={routes.createYourSong} variant="outline">
            Create Your Song
          </RouteLink>
        </div>
      </PageSection>
    </PageLayout>
  );
}
