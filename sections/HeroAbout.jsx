"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import masterChips from "../public/masterChips.png";
import masterChips2 from "../public/masterChips2.png";
import masterChips3 from "../public/masterChips3.png";
import masterChips4 from "../public/masterChips4.png";

gsap.registerPlugin(ScrollTrigger, SplitText);

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const PRODUCTS = [
  {
    image: masterChips,
    name: "Cheese Flavoured",
    tagline: "The classic that started it all.",
    desc: "Perfectly seasoned, golden-fried to a satisfying crunch. Algeria's favourite since day one.",
    badge: "Bestseller",
    price: "60 DA",
    accent: "#25c0abff",
  },
  {
    image: masterChips2,
    name: "Shawarma Flavoured",
    tagline: "Pellet Medium Size- Mini Grid- Shawarma Flavored",
    desc: "Smoked paprika meets our signature crisp — a fiery twist on a timeless recipe.",
    badge: "Fan Favourite",
    price: "60 DA",
    accent: "#CF4B21",
  },
  {
    image: masterChips3,
    name: "Red Cheese Flavoured",
    tagline: "Pure. Simple. Irresistible.",
    desc: "Big sized- Red cheese Flavored",
    badge: "New",
    price: "60 DA",
    accent: "#8f0e31ff",
  },
  {
    image: masterChips4,
    name: "Cheese Flavoured",
    tagline: "Pellet Big Sized- Fried-  Cheese Flavored",
    desc: "Big sized- Red cheese Flavored",
    badge: "New",
    price: "60 DA",
    accent: "#bcd321ff",
  },
];

const ABOUT_TEXT =
  `"Mabasnack" is a company that takes pride in producing the finest quality chips under our brand name "Master Chips". In 1998, an ambitious team set out to establish and lay the foundation for snack food manufacturing in the Algerian Republic, resulting in the birth of Mabasnack.`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function HeroAbout() {
  /* refs */
  const containerRef        = useRef(null);
  const heroRef             = useRef(null);
  const eyebrowRef          = useRef(null);
  const headlineRef         = useRef(null);
  const sublineRef          = useRef(null);
  const heroSubtitleRef     = useRef(null);
  const leftBadgeRef        = useRef(null);
  const rightBadgeRef       = useRef(null);
  const productRef          = useRef(null);          // fixed floating chip
  const aboutRef            = useRef(null);
  const textRef             = useRef(null);
  const statsRef            = useRef(null);
  const productWrapperRef   = useRef(null);
  const productCardRef      = useRef(null);
  const firstCardImageRef   = useRef(null);
  const scrollHintRef       = useRef(null);

  /* ── transition math ──
     Uses offsetTop/offsetLeft (scroll-independent).
     The carousel is pinned at "center center": when pinned,
     scrollY = wrapperOffsetTop - H/2 + wrapperHeight/2.
     We resolve the image center in that pinned-viewport space.
  ── */
  const calculateTransition = () => {
    const wrapper = productWrapperRef.current;
    const target  = firstCardImageRef.current;
    const fixed   = productRef.current;
    if (!wrapper || !target || !fixed) return { x: 0, y: 0, scale: 1 };

    const W = window.innerWidth;
    const H = window.innerHeight;

    const absOffset = (node) => {
      let top = 0; let left = 0;
      while (node) { top += node.offsetTop || 0; left += node.offsetLeft || 0; node = node.offsetParent; }
      return { top, left };
    };

    const wrapperOff = absOffset(wrapper);
    const targetOff  = absOffset(target);

    // scrollY when section is pinned at viewport center
    const pinnedScrollY = wrapperOff.top - H / 2 + wrapper.offsetHeight / 2;

    const imgCenterX = targetOff.left  + target.offsetWidth  / 2;
    const imgCenterY = targetOff.top   + target.offsetHeight / 2 - pinnedScrollY;

    const x = imgCenterX - W / 2;
    const y = imgCenterY - H / 2;

    const chipImg = fixed.querySelector("img");
    const scale   = chipImg ? target.offsetWidth / chipImg.offsetWidth : 1;

    return { x, y, scale };
  };
  
  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ─── HERO ENTRANCE ─── */
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.from(eyebrowRef.current,     { opacity: 0, y: 20, duration: 0.8 })
        .from(headlineRef.current,    { opacity: 0, y: 50, duration: 1   }, "-=0.4")
        .from(sublineRef.current,     { opacity: 0, y: 50, duration: 1   }, "-=0.7")
        .from(heroSubtitleRef.current,{ opacity: 0, y: 30, duration: 0.8 }, "-=0.5")
        .from(productRef.current,     { opacity: 0, y: 70, scale: 0.9, duration: 1.2 }, "-=0.8")
        .from(leftBadgeRef.current,   { opacity: 0, x: -30, duration: 0.6 }, "-=0.6")
        .from(rightBadgeRef.current,  { opacity: 0, x:  30, duration: 0.6 }, "-=0.5")
        .from(scrollHintRef.current,  { opacity: 0, duration: 0.8 }, "-=0.2");

      /* ─── BADGE FLOAT ─── */
      gsap.to(leftBadgeRef.current,  { y: -14, duration: 2.2, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(rightBadgeRef.current, { y:  14, duration: 3.2, repeat: -1, yoyo: true, ease: "sine.inOut" });

      /* ─── SCROLL HINT PULSE ─── */
      gsap.to(scrollHintRef.current, { opacity: 0.2, duration: 1, repeat: -1, yoyo: true, ease: "sine.inOut" });

      /* ─── INITIAL STATE ─── */
      gsap.set(containerRef.current, { backgroundColor: "#0B1E2D" });

      /* ─── HERO → ABOUT (parallax chip drift) ───────────────────────
         start: "top 80%"  → transition commence tôt, plus de distance
         end:   "top 20%"  → finit avant qu'About touche le top
         scrub: 2          → inertie, le chip "traîne" derrière le scroll
      ──────────────────────────────────────────────────────────────── */
      gsap.timeline({
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 2,
          invalidateOnRefresh: true,
        },
      })
      .to(productRef.current, {
        x: "28vw",
        scale: 0.78,
        rotation: 10,
        ease: "none",
      });

      /* ─── ABOUT → PRODUCTS : Phase 1 — chip dérive vers la carte ───
         Couvre la première moitié de la section About.
         scrub: 2 pour la même inertie douce.
      ──────────────────────────────────────────────────────────────── */
      gsap.timeline({
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top top",
          end: "center top",
          scrub: 2,
          invalidateOnRefresh: true,
        },
      })
      .to(productRef.current, {
        x: () => calculateTransition().x,
        y: () => calculateTransition().y,
        scale: () => calculateTransition().scale,
        rotation: 0,
        ease: "none",
      });

      /* ─── ABOUT → PRODUCTS : Phase 2 — crossfade chip ↔ carte ─────
         Couvre la deuxième moitié de la section About.
         scrub: 1 plus réactif pour que le fade semble instantané.
      ──────────────────────────────────────────────────────────────── */
     /* ─── ABOUT → PRODUCTS : Phase 2 — crossfade chip ↔ carte ─────── */
gsap.timeline({
  scrollTrigger: {
    trigger: aboutRef.current,
    start: "center top",
    end: "bottom top",
    scrub: 1,
    invalidateOnRefresh: true,
    onUpdate(self) {
      // Le chip disparaît sur toute la phase
      // La carte n'apparaît qu'à partir de 85% de progression
      const cardOpacity = Math.max(0, (self.progress - 0.85) / 0.15);
      if (firstCardImageRef.current) {
        gsap.set(firstCardImageRef.current, { opacity: cardOpacity });
      }
    },
    onLeaveBack() {
      // Si on scroll vers le haut, on remet la carte invisible
      if (firstCardImageRef.current) {
        gsap.set(firstCardImageRef.current, { opacity: 0 });
      }
    },
  },
})
.to(productRef.current, {
  opacity: 0,
  ease: "none",
});
      

      /* ─── HORIZONTAL CAROUSEL ─── */
      const el        = productCardRef.current;
      const container = productWrapperRef.current;
      if (el && container) {
        const getDistance = () => {
  const lastCard = el.lastElementChild;
  if (!lastCard) return 0;
  // Mesurer depuis l'état initial (x=0)
  gsap.set(el, { x: 0 });
  const lastCardRect  = lastCard.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  return lastCardRect.right - containerRect.right + window.innerWidth * 0.15;
};

        let distance = getDistance();
        ScrollTrigger.addEventListener("refreshInit", () => { distance = getDistance(); });
        gsap.set(el, { x: 0 });
        gsap.to(el, {
          x: () => -distance,
          ease: "none",
          scrollTrigger: {
         trigger: container,
         pin: true,
         scrub: 1,
         start: "center center",
       end: () => `+=${getDistance()}`,    // ← exact
       invalidateOnRefresh: true,
       },
        });
      }

      /* ─── STATS COUNT-UP ─── */
      const statEls = statsRef.current?.querySelectorAll("[data-count]");
      statEls?.forEach((el) => {
        const end = parseFloat(el.dataset.count);
        const isFloat = String(end).includes(".");
        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: end,
            duration: 2,
            ease: "power2.out",
            snap: { innerText: isFloat ? 0.1 : 1 },
            scrollTrigger: { trigger: statsRef.current, start: "top 80%" },
            onUpdate() {
              el.innerText = isFloat
                ? parseFloat(el.innerText).toFixed(1)
                : Math.round(parseFloat(el.innerText));
            },
          }
        );
      });

      /* ─── ABOUT TEXT REVEAL ─── */
      const split = SplitText.create(textRef.current, { type: "lines" });
      gsap.from(split.lines, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: textRef.current, start: "top 80%" },
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  /* ─── card hover handlers ─── */
  const onEnter = (e) => gsap.to(e.currentTarget, { scale: 1.025, duration: 0.45, ease: "power2.out" });
  const onLeave = (e) => gsap.to(e.currentTarget, { scale: 1,     duration: 0.45, ease: "power2.out" });

  return (
    <div ref={containerRef} className="relative bg-[#0B1E2D]">

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden">

        {/* grain overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "200px",
          }}
        />

        {/* subtle radial glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(232,184,75,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
          <div className="relative flex min-h-screen flex-col items-center justify-center">

            {/* eyebrow */}
            <div ref={eyebrowRef} className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[#E8B84B]/60" />
              <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#E8B84B]/80">
                Est. 1998 · Algeria
              </span>
              <span className="h-px w-10 bg-[#E8B84B]/60" />
            </div>

            {/* headline */}
            <div className="relative text-center">
              <h1
                ref={headlineRef}
                className="font-paprika leading-[0.92] text-[clamp(3.5rem,12vw,9rem)] text-white"
              >
                The Taste
              </h1>
              <h2
                ref={sublineRef}
                className="font-paprika leading-[0.92] text-[clamp(3.5rem,12vw,9rem)]"
              >
                <span className="text-[#E8B84B]">Algeria</span>{" "}
                <span className="text-white">Loves</span>
              </h2>
            </div>

            {/* subtitle */}
            <p
              ref={heroSubtitleRef}
              className="mt-8 max-w-sm text-center text-base leading-7 text-white/50 md:text-lg"
            >
              Crafted with passion, enjoyed across Algeria.
              One crunch at a time.
            </p>

            {/* floating badges */}
            <div
              ref={leftBadgeRef}
              className="absolute left-0 top-[30%] hidden -rotate-12 md:flex"
            >
              <span className="rounded-full border border-[#E8B84B]/30 bg-[#E8B84B]/10 px-8 py-3 text-sm font-medium tracking-wide text-[#E8B84B] backdrop-blur-sm">
                Delicious
              </span>
            </div>

            <div
              ref={rightBadgeRef}
              className="absolute bottom-[12%] right-0 hidden rotate-12 md:flex"
            >
              <span className="rounded-full border border-white/20 bg-white/5 px-8 py-3 text-sm font-medium tracking-wide text-white/70 backdrop-blur-sm">
                Since 1998
              </span>
            </div>

            {/* scroll hint */}
            <div
              ref={scrollHintRef}
              className="absolute bottom-10 flex flex-col items-center gap-2"
            >
              <span className="text-xs tracking-[0.2em] uppercase text-white/40">Scroll</span>
              <div className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FIXED FLOATING CHIP
      ═══════════════════════════════════════ */}
      <div
        ref={productRef}
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[998] pointer-events-none"
        style={{ filter: "drop-shadow(0 40px 60px rgba(232,184,75,0.25))" }}
      >
        <Image
          src={masterChips}
          alt="Master Chips"
          priority
          className="w-[180px] md:w-[260px]"
        />
      </div>

      {/* ═══════════════════════════════════════
          ABOUT
      ═══════════════════════════════════════ */}
      <section
        ref={aboutRef}
        className="relative z-30 min-h-screen bg-[#091729] flex flex-col items-center justify-center px-6 py-24 md:px-10"
      >
        {/* decorative number */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-6 top-16 text-[clamp(6rem,20vw,14rem)] font-black leading-none text-white/[0.03] select-none"
        >
          1998
        </div>

        <div className="relative max-w-5xl w-full">

          {/* label */}
          <div className="mb-10 flex items-center gap-3">
            <span className="h-px w-8 bg-[#E8B84B]/50" />
            <span className="font-mono text-xs tracking-[0.22em] uppercase text-[#E8B84B]/70">
              Our Story
            </span>
          </div>

          {/* quote text */}
          <p
            ref={textRef}
            className="font-paprika text-[clamp(1.35rem,3vw,2.2rem)] leading-[1.55] text-white/85"
          >
            {ABOUT_TEXT}
          </p>

          {/* stats */}
          <div
            ref={statsRef}
            className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4"
          >
            {[
              { count: "1998", suffix: "", label: "Founded" },
              { count: "25",   suffix: "+", label: "Years of excellence" },
              { count: "12",   suffix: "+", label: "Product varieties" },
              { count: "69",   suffix: "+", label: "Wilayas reached" },
            ].map(({ count, suffix, label }) => (
              <div key={label} className="group">
                <p className="font-paprika text-[clamp(2rem,5vw,3rem)] leading-none text-[#E8B84B]">
                  <span data-count={count}>{count}</span>
                  {suffix}
                </p>
                <p className="mt-1 text-xs tracking-wide text-white/40 uppercase">{label}</p>
                <div className="mt-3 h-px w-0 bg-[#E8B84B]/40 transition-all duration-700 group-hover:w-full" />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════
          PRODUCT CAROUSEL
      ═══════════════════════════════════════ */}
      <section
        ref={productWrapperRef}
        className="relative min-h-screen flex items-center justify-center bg-[#0B1E2D] overflow-hidden px-6 py-24 md:px-10"
        style={{ borderRadius: "2rem 2rem 0 0" }}
      >
        {/* bg geometric accent */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(232,184,75,0.05) 0%, transparent 60%)",
          }}
        />

        <div className="relative w-full max-w-7xl px-6 md:px-10">

          {/* section header */}
          <div className="mb-14 flex flex-col items-center text-center">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[#E8B84B]/50" />
              <span className="font-mono text-xs tracking-[0.22em] uppercase text-[#E8B84B]/70">
                The Range
              </span>
              <span className="h-px w-8 bg-[#E8B84B]/50" />
            </div>
            <h2 className="font-paprika text-[clamp(2.5rem,7vw,5rem)] leading-tight text-white">
              Our <span className="text-[#E8B84B]">Products</span>
            </h2>
          </div>

          {/* cards track */}
          <div className="overflow-hidden">
            <div
              ref={productCardRef}
              className="flex gap-8"
            >
              {PRODUCTS.map(({ image, name, tagline, desc, badge, price, accent }, i) => (
                <div
                  key={i}
                  onMouseEnter={onEnter}
                  onMouseLeave={onLeave}
                  className="cursor-pointer min-w-full sm:min-w-[85%] lg:min-w-[58%]
                  "
                >
                  <div
                    className="relative rounded-3xl overflow-hidden border border-white/[0.07] flex flex-col md:flex-row min-h-[400px]"
                    style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)" }}
                  >
                    {/* colored stripe */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1 rounded-l-3xl"
                      style={{ background: accent }}
                    />

                    {/* image panel */}
                    <div
                      className="relative flex-shrink-0 flex items-center justify-center p-10 md:w-[46%]"
                      style={{
                        background: `radial-gradient(ellipse 80% 80% at 50% 50%, ${accent}18 0%, transparent 70%)`,
                      }}
                    >
                      {/* badge */}
                      <span
                        className="absolute top-5 left-6 rounded-full px-3 py-1 text-[10px] font-semibold tracking-wider uppercase"
                        style={{ background: accent + "22", color: accent, border: `1px solid ${accent}44` }}
                      >
                        {badge}
                      </span>

                      <Image
                        ref={i === 0 ? firstCardImageRef : null}
                        src={image}
                        alt={name}
                        className="w-[160px] md:w-[210px] mt-10 md:mt-0 transition-transform duration-700 hover:scale-105"
                        style={i === 0 ? { opacity: 0 } : undefined}
                      />
                    </div>

                    {/* content panel */}
                    <div className="flex flex-col justify-center p-8 md:p-12 flex-1">
                      <p className="mb-2 text-xs tracking-[0.2em] uppercase" style={{ color: accent }}>
                        Master Chips
                      </p>

                      <h3 className="font-paprika text-[clamp(1.6rem,3.5vw,2.4rem)] leading-tight text-white">
                        {name.replace("Master Chips ", "")}
                      </h3>

                      <p className="mt-1 text-sm italic text-white/40">{tagline}</p>

                      <p className="mt-5 text-sm leading-7 text-white/55 max-w-xs">{desc}</p>

                      <div className="mt-8 flex items-center justify-between">
                        <span
                          className="font-paprika text-2xl font-bold"
                          style={{ color: accent }}
                        >
                          {price}
                        </span>

                        <button
                          className="group flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-medium tracking-wide uppercase transition-all duration-300"
                          style={{
                            borderColor: accent + "44",
                            color: accent,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = accent;
                            e.currentTarget.style.color = "#0B1E2D";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.color = accent;
                          }}
                        >
                          Discover
                          <span className="translate-x-0 transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* carousel hint */}
          <p className="mt-8 text-center text-xs tracking-[0.15em] uppercase text-white/25">
            Scroll to explore
          </p>

        </div>
      </section>

    </div>
  );
}