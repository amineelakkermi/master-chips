"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

import masterChips from "../public/masterChips.png";

export default function Hero() {
  const titleRef = useRef(null);
  const productDesktopRef = useRef(null);
  const productMobileRef = useRef(null);
  const leftBadgeRef = useRef(null);
  const rightBadgeRef = useRef(null);

  useEffect(() => {
  const tl = gsap.timeline();

  tl.from(titleRef.current, {
    opacity: 0,
    y: 40,
    duration: 1,
    ease: "expo.out",
  });

  if (window.innerWidth >= 768) {
    tl.from(
      productDesktopRef.current,
      {
        opacity: 0,
        y: 60,
        scale: 0.95,
        duration: 1,
        ease: "expo.out",
      },
      "+=0.15"
    );
  } else {
    tl.from(
      productMobileRef.current,
      {
        opacity: 0,
        y: 60,
        scale: 0.95,
        duration: 1,
        ease: "expo.out",
      },
      "+=0.15"
    );
  }

  // Floating badges
  gsap.to(leftBadgeRef.current, {
    y: -15,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.to(rightBadgeRef.current, {
    y: 15,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
}, []);
  return (
    <section className="relative min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-0">
        <div
          className="
            relative
            flex
            min-h-screen
            flex-col
            items-center
            justify-center
          "
        >
          {/* Left Badge */}
          <div
            ref={leftBadgeRef}
            className="
              absolute
              -left-0 lg:-left-16
              top-[20%] lg:top-[35%]
              hidden
              md:flex
              -rotate-12
              rounded-full
              border-2
              border-main-yellow
              px-10
              py-4
              text-white
            "
          >
            Delicious
          </div>

          {/* Right Badge */}
          <div
            ref={rightBadgeRef}
            className="
              absolute
              right-0
              bottom-[8%]
              hidden
              md:flex
              rotate-[-12deg]
              rounded-full
              border-2
              border-main-yellow
              px-10
              py-4
              text-white
            "
          >
            Since 1988
          </div>

          {/* Title */}
          <div
            ref={titleRef}
            className="relative z-10 text-center"
          >
            <h1
              className="
                font-paprika
                text-white
                leading-none
                text-[52px]
                sm:text-[70px]
                md:text-[100px]
                lg:text-[140px]
              "
            >
              The Taste
            </h1>

            <h2
              className="
                mt-2
                leading-none
                text-[52px]
                sm:text-[70px]
                md:text-[100px]
                lg:text-[140px]
              "
            >
              <span className="font-paprika text-main-yellow">
                Algeria
              </span>

{''}

              <span className="font-paprika text-white">
                Loves
              </span>
            </h2>
          </div>

          {/* Desktop / Tablet Product */}
          <div
            ref={productDesktopRef}
            className="
              hidden
              md:block
              absolute
              left-1/2
              top-[40%]
              z-20
              -translate-x-1/2
            "
          >
            <Image
              src={masterChips}
              alt="Master Chips"
              priority
              className="
                w-[320px]
                md:w-[380px]
                lg:w-[420px]
                xl:w-[500px]
                h-auto
              "
            />
          </div>

          {/* Description */}
          <div
            className="
              mt-8
              max-w-[400px]
              text-center

              md:absolute
              md:left-0
              md:bottom-8
              md:text-left
            "
          >
            <p
              className="
                text-gray-light
                text-base
                md:text-lg
                leading-8
              "
            >
              Crafted with passion, enjoyed across Algeria.
              Discover the snacks that bring people together,
              one crunch at a time.
            </p>
          </div>

          {/* Mobile Product */}
          <div
            ref={productMobileRef}
            className="
              flex
              w-full
              justify-center
              md:hidden
              relative
              z-20
              mt-2
            "
          >
            <Image
              src={masterChips}
              alt="Master Chips"
              priority
              className="
                w-[300px]
                h-auto
                
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}