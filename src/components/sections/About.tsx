import { motion } from "framer-motion";
import { aboutContent } from "@/content/sections";
import { brandAssets } from "@/data/assets";
import { SectionHeading } from "@/components/common/SectionHeading";

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl bg-[radial-gradient(circle,oklch(0.82_0.135_82/0.55),transparent_65%)]"
      />
      <div className="relative mx-auto grid w-full max-w-7xl gap-14 px-5 lg:grid-cols-2 lg:items-center lg:px-8">
        <div className="flex flex-col gap-8">
          <SectionHeading eyebrow={aboutContent.eyebrow} title={aboutContent.title} align="left" />
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
        </div>

        <div className="flex flex-col gap-6">
          <motion.img
            src={brandAssets.logo}
            alt={brandAssets.logoAlt}
            loading="lazy"
            width={520}
            height={240}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mx-auto h-28 w-auto object-contain md:h-36"
          />
          {aboutContent.pillars.map((pillar, i) => (
            <motion.article
              key={pillar.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="glass-panel rounded-2xl p-7"
            >
              <h3 className="font-display text-2xl">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
