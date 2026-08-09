import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronDown, Play, Compass, Sparkles } from "lucide-react";
import { brandAssets } from "@/data/assets";
import { heroContent } from "@/content/sections";
import { siteConfig } from "@/data/site";
import { routes } from "@/data/routes";
import { ActionLink } from "@/components/common/ActionLink";
import { RouteLink } from "@/components/common/RouteLink";
import { Particles } from "@/components/common/Particles";

export function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const bgX = useTransform(springX, [-1, 1], [18, -18]);
  const bgY = useTransform(springY, [-1, 1], [12, -12]);
  const contentX = useTransform(springX, [-1, 1], [-8, 8]);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);

    const onMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      mq.removeEventListener("change", onChange);
    };
  }, [mouseX, mouseY]);

  return (
    <section id="home" className="relative flex min-h-svh w-full items-center overflow-hidden">
      <motion.div
        className="absolute inset-[-4%]"
        style={{ x: reduced ? 0 : bgX, y: reduced ? 0 : bgY }}
      >
        <img
          src={brandAssets.heroBackground}
          alt={brandAssets.heroBackgroundAlt}
          fetchPriority="high"
          decoding="async"
          className="size-full object-cover object-center"
        />
      </motion.div>

      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.1_0.01_60/0.94)_0%,oklch(0.1_0.01_60/0.78)_32%,oklch(0.1_0.01_60/0.25)_58%,transparent_78%)]"
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-48 fade-to-bg" />
      <Particles count={26} />

      <motion.div
        style={{ x: reduced ? 0 : contentX }}
        className="relative z-10 mx-auto flex w-full max-w-7xl px-5 pt-28 pb-24 lg:px-8"
      >
        <div className="max-w-xl lg:max-w-[38rem]">
          <motion.img
            src={brandAssets.logo}
            alt={brandAssets.logoAlt}
            width={420}
            height={190}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="h-16 w-auto object-contain object-left md:h-20"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 font-display text-4xl tracking-wide text-gold-gradient md:text-5xl"
          >
            {siteConfig.name}
          </motion.p>

          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="eyebrow mt-3 block"
          >
            {heroContent.eyebrow}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-6 text-balance text-5xl leading-[1.05] md:text-7xl"
          >
            {heroContent.headline[0]}{" "}
            <span className="italic text-gold-gradient">{heroContent.headline[1]}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-6 max-w-md text-pretty text-base text-muted-foreground"
          >
            {heroContent.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <ActionLink href={heroContent.primaryCta.href} size="lg">
              <Play className="size-4" aria-hidden />
              {heroContent.primaryCta.label}
            </ActionLink>
            <RouteLink to={routes.createYourSong} variant="outline" size="lg">
              <Sparkles className="size-4" aria-hidden />
              Create Your Song
            </RouteLink>
            <ActionLink href={heroContent.secondaryCta.href} variant="ghost" size="lg">
              <Compass className="size-4" aria-hidden />
              {heroContent.secondaryCta.label}
            </ActionLink>
          </motion.div>
        </div>
      </motion.div>

      <motion.a
        href="#releases"
        aria-label="Scroll to releases"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute inset-x-0 bottom-7 z-10 mx-auto flex w-fit flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-gold"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.32em]">{heroContent.scrollHint}</span>
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="size-4" aria-hidden />
        </motion.span>
      </motion.a>
    </section>
  );
}
