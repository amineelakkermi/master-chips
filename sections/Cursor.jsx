"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/*
  Cursor.jsx — Master Chips custom cursor
  ─────────────────────────────────────────
  • Dot   : suit la souris instantanément (no lag)
  • Ring  : suit avec inertie (scrub doux)
  • États : default → hovered (scale up ring, dot disparaît)
            + "Discover" buttons → label "Grab" apparaît dans le ring
  ─────────────────────────────────────────
  Usage :
    1. Importer dans layout.jsx (ou _app.jsx) :
         import Cursor from "@/components/Cursor";
    2. Ajouter <Cursor /> en haut du <body>
    3. Ajouter `cursor-none` sur <html> ou <body> dans globals.css :
         * { cursor: none !important; }
*/

export default function Cursor() {
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);
  const labelRef = useRef(null);

  const pos     = useRef({ x: 0, y: 0 });
  const ring    = useRef({ x: 0, y: 0 });
  const rafRef  = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    /* ── Smooth ring loop ── */
    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.12);

      if (ringRef.current) {
        gsap.set(ringRef.current, {
          x: ring.current.x,
          y: ring.current.y,
        });
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    /* ── Mouse move ── */
    const onMove = (e) => {
      if (!visible) setVisible(true);
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        gsap.set(dotRef.current, { x: e.clientX, y: e.clientY });
      }
    };

    /* ── Hover detection ── */
    const onEnter = (e) => {
      const el = e.target.closest("a, button, [data-cursor]");
      if (!el) return;

      const label = el.dataset.cursor || "";

      gsap.to(ringRef.current, {
        scale: 2.2,
        borderColor: "#E8B84B",
        backgroundColor: "rgba(232,184,75,0.08)",
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(dotRef.current, {
        scale: 0,
        duration: 0.2,
        ease: "power2.out",
      });

      if (label && labelRef.current) {
        labelRef.current.textContent = label;
        gsap.fromTo(
          labelRef.current,
          { opacity: 0, scale: 0.7 },
          { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2)" }
        );
      }
    };

    const onLeave = (e) => {
      const el = e.target.closest("a, button, [data-cursor]");
      if (!el) return;

      gsap.to(ringRef.current, {
        scale: 1,
        borderColor: "rgba(232,184,75,0.6)",
        backgroundColor: "transparent",
        duration: 0.45,
        ease: "power2.out",
      });
      gsap.to(dotRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "back.out(2)",
      });

      if (labelRef.current) {
        gsap.to(labelRef.current, {
          opacity: 0,
          scale: 0.7,
          duration: 0.15,
          ease: "power2.in",
          onComplete: () => {
            if (labelRef.current) labelRef.current.textContent = "";
          },
        });
      }
    };

    /* ── Click pulse ── */
    const onClick = () => {
      gsap.timeline()
        .to(ringRef.current, {
          scale: 0.8,
          duration: 0.1,
          ease: "power3.in",
        })
        .to(ringRef.current, {
          scale: 1,
          duration: 0.5,
          ease: "elastic.out(1, 0.4)",
        });
    };

    /* ── Hide when leaving window ── */
    const onLeaveWindow = () => {
      gsap.to([dotRef.current, ringRef.current], { opacity: 0, duration: 0.3 });
    };
    const onEnterWindow = () => {
      gsap.to([dotRef.current, ringRef.current], { opacity: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove",   onMove);
    window.addEventListener("click",       onClick);
    document.addEventListener("mouseleave", onLeaveWindow);
    document.addEventListener("mouseenter", onEnterWindow);
    document.addEventListener("mouseover",  onEnter);
    document.addEventListener("mouseout",   onLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove",   onMove);
      window.removeEventListener("click",       onClick);
      document.removeEventListener("mouseleave", onLeaveWindow);
      document.removeEventListener("mouseenter", onEnterWindow);
      document.removeEventListener("mouseover",  onEnter);
      document.removeEventListener("mouseout",   onLeave);
    };
  }, [visible]);

  if (typeof window === "undefined") return null;

  return (
    <>
      {/* ── Dot (instant) ── */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position:        "fixed",
          top:             0,
          left:            0,
          width:           6,
          height:          6,
          borderRadius:    "50%",
          backgroundColor: "#E8B84B",
          pointerEvents:   "none",
          zIndex:          9999,
          translateX:      "-50%",
          translateY:      "-50%",
          transform:       "translate(-50%, -50%)",
          opacity:         visible ? 1 : 0,
          willChange:      "transform",
          mixBlendMode:    "normal",
        }}
      />

      {/* ── Ring (lerped) ── */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          width:         36,
          height:        36,
          borderRadius:  "50%",
          border:        "1.5px solid rgba(232,184,75,0.6)",
          pointerEvents: "none",
          zIndex:        9998,
          transform:     "translate(-50%, -50%)",
          opacity:       visible ? 1 : 0,
          willChange:    "transform",
          display:       "flex",
          alignItems:    "center",
          justifyContent:"center",
        }}
      >
        {/* label inside ring (ex: "Grab", "Open"…) */}
        <span
          ref={labelRef}
          style={{
            fontSize:      9,
            fontWeight:    600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color:         "#E8B84B",
            opacity:       0,
            userSelect:    "none",
            whiteSpace:    "nowrap",
          }}
        />
      </div>
    </>
  );
}