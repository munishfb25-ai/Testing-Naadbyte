import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronDown, Play, Compass, Sparkles, Disc3, Mic2, Radio } from "lucide-react";
import { brandAssets } from "@/data/assets";
import { heroContent } from "@/content/sections";
import { routes } from "@/data/routes";
import { ActionLink } from "@/components/common/ActionLink";
import { RouteLink } from "@/components/common/RouteLink";
import { Particles } from "@/components/common/Particles";

export function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 22 });
  const bgX = useTransform(springX, [-1, 1], [22, -22]);
  const bgY = useTransform(springY, [-1, 1], [14, -14]);
  const contentX = useTransform(springX, [-1, 1], [-10, 10]);
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
    <section
      id="home"
      className="relative flex min-h-svh w-full items-center overflow-hidden bg-background"
    >
      {/* Background Hero Artwork with Parallax & Precision Crop */}
      <motion.div
        className="absolute inset-[-5%]"
        style={{ x: reduced ? 0 : bgX, y: reduced ? 0 : bgY }}
      >
        <img
          src={brandAssets.heroBackground}
          alt={brandAssets.heroBackgroundAlt}
          fetchPriority="high"
          decoding="async"
          className="size-full object-cover object-[72%_38%] md:object-[78%_50%] transition-opacity duration-1000"
        />
      </motion.div>

      {/* Atmospheric Overlays for Readability & Cinematic Depth */}
      {/* Desktop horizontal dark gradient scrim */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,12,11,0.96)_0%,rgba(13,12,11,0.85)_38%,rgba(13,12,11,0.45)_65%,transparent_88%)] hidden md:block"
      />
      {/* Mobile vertical dark gradient scrim */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,12,11,0.88)_0%,rgba(13,12,11,0.78)_50%,rgba(13,12,11,0.95)_100%)] md:hidden"
      />
      {/* Warm ambient golden spotlight behind left content */}
      <div
        aria-hidden
        className="absolute top-1/3 left-10 -translate-y-1/2 size-[500px] rounded-full bg-[radial-gradient(circle,rgba(225,157,59,0.14)_0%,transparent_70%)] blur-3xl pointer-events-none"
      />
      {/* Edge fade to dark background at bottom */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"
      />

      {/* Floating Gold Particles */}
      <Particles count={32} />

      {/* Main Hero Content */}
      <motion.div
        style={{ x: reduced ? 0 : contentX }}
        className="relative z-10 mx-auto flex w-full max-w-7xl px-6 pt-32 pb-28 lg:px-12"
      >
        <div className="max-w-2xl lg:max-w-[42rem]">
          {/* Eyebrow Badge & Logo Header */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex items-center gap-4 flex-wrap"
          >
            <div className="relative group">
              <div className="absolute -inset-1 rounded-full bg-gold/20 blur-sm transition duration-500 group-hover:bg-gold/30" />
              <img
                src={brandAssets.logo}
                alt={brandAssets.logoAlt}
                width={420}
                height={190}
                className="relative h-12 w-auto object-contain object-left md:h-16 filter drop-shadow-[0_0_18px_rgba(225,157,59,0.4)]"
              />
            </div>

            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-gold shadow-[0_0_12px_rgba(225,157,59,0.15)] backdrop-blur-md">
              <Sparkles className="size-3 text-gold animate-pulse" aria-hidden />
              {heroContent.eyebrow}
            </span>
          </motion.div>

          {/* Main Title / Brand Display */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-5"
          >
            <h1 className="text-balance font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.02] text-foreground">
              {heroContent.headline[0]}{" "}
              <span className="italic block sm:inline text-gold-gradient filter drop-shadow-[0_2px_10px_rgba(225,157,59,0.2)]">
                {heroContent.headline[1]}
              </span>
            </h1>
          </motion.div>

          {/* Subtitle Copy */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 max-w-xl text-balance text-base sm:text-lg text-muted-foreground leading-relaxed font-normal"
          >
            {heroContent.subtitle}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.42 }}
            className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4"
          >
            <ActionLink
              href={heroContent.primaryCta.href}
              size="lg"
              className="group shadow-[0_0_24px_rgba(225,157,59,0.35)] hover:shadow-[0_0_36px_rgba(225,157,59,0.55)] transition-all duration-300"
            >
              <Play
                className="size-4 fill-primary-foreground transition-transform duration-300 group-hover:scale-110"
                aria-hidden
              />
              {heroContent.primaryCta.label}
            </ActionLink>

            <RouteLink
              to={routes.createYourSong}
              variant="outline"
              size="lg"
              className="border-gold/40 bg-background/40 backdrop-blur-md hover:bg-gold/15 hover:border-gold shadow-[0_0_15px_rgba(225,157,59,0.1)] transition-all duration-300"
            >
              <Sparkles className="size-4 text-gold" aria-hidden />
              Create Your Song
            </RouteLink>

            <ActionLink
              href={heroContent.secondaryCta.href}
              variant="ghost"
              size="lg"
              className="hover:bg-gold/10 hover:text-gold transition-colors duration-300"
            >
              <Compass className="size-4" aria-hidden />
              {heroContent.secondaryCta.label}
            </ActionLink>
          </motion.div>

          {/* Quick Label Highlights / Stats Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-12 inline-flex flex-wrap items-center gap-6 sm:gap-8 rounded-2xl border border-gold/15 bg-background/50 p-4 sm:px-6 sm:py-4 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          >
            <div className="flex items-center gap-2.5">
              <Disc3 className="size-4 text-gold animate-[spin_8s_linear_infinite]" aria-hidden />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-foreground">
                  12+ Genres
                </p>
                <p className="text-[0.7rem] text-muted-foreground">Devotional to EDM</p>
              </div>
            </div>

            <div className="hidden sm:block h-7 w-px bg-gold/20" />

            <div className="flex items-center gap-2.5">
              <Mic2 className="size-4 text-gold" aria-hidden />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-foreground">
                  3 Languages
                </p>
                <p className="text-[0.7rem] text-muted-foreground">Hindi · English · Punjabi</p>
              </div>
            </div>

            <div className="hidden sm:block h-7 w-px bg-gold/20" />

            <div className="flex items-center gap-2.5">
              <Radio className="size-4 text-gold" aria-hidden />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Bespoke Songs
                </p>
                <p className="text-[0.7rem] text-muted-foreground">Custom Commissioned</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.a
        href="#releases"
        aria-label="Scroll to releases"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute inset-x-0 bottom-6 z-10 mx-auto flex w-fit flex-col items-center gap-1.5 text-muted-foreground transition-colors hover:text-gold group"
      >
        <span className="text-[0.625rem] font-semibold uppercase tracking-[0.35em] text-muted-foreground/80 group-hover:text-gold transition-colors">
          {heroContent.scrollHint}
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="rounded-full border border-gold/20 bg-background/30 p-1.5 backdrop-blur-sm group-hover:border-gold/50 transition-colors"
        >
          <ChevronDown className="size-3.5 text-gold" aria-hidden />
        </motion.span>
      </motion.a>
    </section>
  );
}
