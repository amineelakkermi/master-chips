"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import logo from "../public/logo.png";

gsap.registerPlugin(ScrollTrigger);

const LINKS = {
  Company:  ["About Us", "Our Story", "Careers", "Press"],
  Products: ["Original", "Paprika", "Sea Salt", "Coming Soon"],
  Connect:  ["Instagram", "Facebook", "Contact", "Retailers"],
};

export default function Footer() {
  const footerRef  = useRef(null);
  const topRef     = useRef(null);
  const gridRef    = useRef(null);
  const bottomRef  = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
        },
        defaults: { ease: "expo.out" },
      })
      .from(topRef.current,    { opacity: 0, y: 30, duration: 0.9 })
      .from(
        gridRef.current?.children ?? [],
        { opacity: 0, y: 24, stagger: 0.1, duration: 0.7 },
        "-=0.4"
      )
      .from(bottomRef.current, { opacity: 0, duration: 0.6 }, "-=0.2");
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-[#060F18] px-6 pt-20 pb-10 md:px-10"
    >
      {/* grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px",
        }}
      />

      {/* large watermark word */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 select-none text-[clamp(5rem,18vw,12rem)] font-black uppercase leading-none text-white/[0.025] whitespace-nowrap"
      >
        Master Chips
      </div>

      <div className="relative mx-auto max-w-7xl">

        {/* ── TOP ROW ── */}
        <div
          ref={topRef}
          className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-white/[0.07] pb-14"
        >
          {/* brand */}
          <div className="flex flex-col gap-5">
            <Image src={logo} alt="Master Chips" width={58} height={58} />
            <p className="max-w-xs text-sm leading-7 text-white/35">
              Algeria's favourite chip brand, crafted with pride since 1998.
            </p>
          </div>

          {/* tagline */}
          <p className="font-paprika text-[clamp(1.6rem,4vw,2.8rem)] leading-tight text-white/80 md:text-right">
            One crunch at<br />
            <span className="text-[#E8B84B]">a time.</span>
          </p>
        </div>

        {/* ── LINK GRID ── */}
        <div
          ref={gridRef}
          className="mb-16 grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-4"
        >
          {Object.entries(LINKS).map(([section, items]) => (
            <div key={section}>
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#E8B84B]/60">
                {section}
              </p>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="group flex items-center gap-2 text-sm text-white/40 transition-colors duration-200 hover:text-white"
                    >
                      <span className="h-px w-0 bg-[#E8B84B] transition-all duration-300 group-hover:w-4" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* newsletter mini */}
          <div>
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#E8B84B]/60">
              Stay in the loop
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#E8B84B]/40 transition-colors duration-200"
              />
              <button className="rounded-xl border border-[#E8B84B]/30 bg-[#E8B84B]/10 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#E8B84B] transition-all duration-300 hover:bg-[#E8B84B] hover:text-[#0B1E2D]">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div
          ref={bottomRef}
          className="flex flex-col items-center gap-3 border-t border-white/[0.06] pt-8 sm:flex-row sm:justify-between"
        >
          <p className="text-xs tracking-wide text-white/20">
            © {new Date().getFullYear()} Mabasnack. All rights reserved.
          </p>

          <div className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E8B84B]/60" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/20">
              Made in Algeria
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#E8B84B]/60" />
          </div>

          <div className="flex gap-6">
            {["Privacy", "Terms"].map((t) => (
              <Link
                key={t}
                href="#"
                className="text-xs text-white/20 transition-colors hover:text-white/50"
              >
                {t}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}