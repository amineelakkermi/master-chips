"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef  = useRef(null);
  const labelRef    = useRef(null);
  const headingRef  = useRef(null);
  const subRef      = useRef(null);
  const btnRef      = useRef(null);
  const orbRef      = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── entrance timeline ── */
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        defaults: { ease: "expo.out" },
      })
      .from(labelRef.current,   { opacity: 0, y: 16, duration: 0.7 })
      .from(headingRef.current, { opacity: 0, y: 50, duration: 1   }, "-=0.3")
      .from(subRef.current,     { opacity: 0, y: 30, duration: 0.8 }, "-=0.5")
      .from(btnRef.current,     { opacity: 0, y: 20, scale: 0.95, duration: 0.7 }, "-=0.4");

      /* ── orb parallax ── */
      gsap.to(orbRef.current, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* button hover */
  const onEnter = (e) => {
    gsap.to(e.currentTarget, { scale: 1.04, duration: 0.35, ease: "power2.out" });
  };
  const onLeave = (e) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.35, ease: "power2.out" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0B1E2D] py-32 px-6 md:px-10"
    >
      {/* grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px",
        }}
      />

      {/* giant glow orb */}
      <div
        ref={orbRef}
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(232,184,75,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />


      {/* decorative corner lines */}
      <div aria-hidden className="pointer-events-none absolute left-6 top-6 h-12 w-px bg-gradient-to-b from-[#E8B84B]/40 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute left-6 top-6 h-px w-12 bg-gradient-to-r from-[#E8B84B]/40 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute right-6 bottom-6 h-12 w-px bg-gradient-to-t from-[#E8B84B]/40 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute right-6 bottom-6 h-px w-12 bg-gradient-to-l from-[#E8B84B]/40 to-transparent" />

      <div className="relative mx-auto max-w-4xl flex flex-col items-center text-center">

        {/* eyebrow */}
        <div ref={labelRef} className="mb-8 flex items-center gap-3">
          <span className="h-px w-8 bg-[#E8B84B]/50" />
          <span className="font-mono text-xs tracking-[0.22em] uppercase text-[#E8B84B]/70">
            Find Us
          </span>
          <span className="h-px w-8 bg-[#E8B84B]/50" />
        </div>

        {/* heading */}
        <h2
          ref={headingRef}
          className="font-paprika text-[clamp(2.8rem,8vw,6rem)] leading-[0.95] text-white"
        >
          Taste the{" "}
          <span className="text-[#E8B84B]">Crunch</span>
          <br />
          Near You
        </h2>

        {/* sub */}
        <p
          ref={subRef}
          className="mt-7 max-w-md text-base leading-7 text-white/45 md:text-lg"
        >
          Master Chips is available at retailers across all 69 wilayas.
          One bag away from your next favourite snack.
        </p>

        {/* CTA button */}
        <div ref={btnRef} className="mt-12">
          <button
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#E8B84B]/30 bg-[#E8B84B]/10 px-10 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#E8B84B] backdrop-blur-sm transition-colors duration-300 hover:bg-[#E8B84B] hover:text-[#0B1E2D] hover:border-[#E8B84B]"
          >
            {/* shimmer */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/10 transition-transform duration-700 group-hover:translate-x-[200%]"
            />
            Contact Us
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div>

        {/* bottom stat strip */}
        <div className="mt-20 flex flex-wrap justify-center gap-x-14 gap-y-6">
          {[
            { value: "69", label: "Wilayas" },
            { value: "1998", label: "Founded" },
            { value: "25+", label: "Years of trust" },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="font-paprika text-3xl text-[#E8B84B]">{value}</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">{label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}