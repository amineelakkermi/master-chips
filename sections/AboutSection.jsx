"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import styles from "../app/style";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function AboutSection() {
  const textRef = useRef();

  useEffect(() => {
    if (!textRef.current) return;

    const split = SplitText.create(textRef.current, {
      type: "lines",
    });

    gsap.from(split.lines, {
      y: 80,
      opacity: 0,
      duration: 1.2,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
      },
    });

    return () => {
      split.revert();
    };
  }, []);

  const text = `"Mabasnack" is a company that takes pride in producing the finest quality chips under
  our brand name "Master Chips". In 1998, an ambitious team set out to establish and lay the foundation for snack food manufacturing in the Algerian Republic, resulting in the birth of Mabasnack.`;

  return (
    <section
      className={`
        ${styles.padding}
        bg-main-blue
        min-h-screen
        flex items-center justify-center
      `}
    >
      <div className="max-w-6xl">
        <p
          ref={textRef}
          className={`${styles.paragraph} max-w-[900px] text-white`}
        >
          {text}
        </p>
      </div>
    </section>
  );
}