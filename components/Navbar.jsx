"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import logo from "../public/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    {
      name: "Home",
      href: "#",
    },
    {
      name: "About",
      href: "#",
    },
    {
      name: "Products",
      href: "#",
    },
    {
      name: "Gallery",
      href: "#",
    },
  ];

  return (
    <>
      {/* Navbar */}
      <header className="absolute top-0 left-0 z-50 w-full border-b border-white/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid h-[100px] grid-cols-2 lg:grid-cols-3 items-center">

            {/* Left */}
            <div className="flex items-center">
              <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-3 text-white"
              >
                <Menu size={24} />

                <span className="text-[18px] font-medium">
                  Menu
                </span>
              </button>
            </div>

            {/* Center */}
            <div className="flex justify-end lg:justify-center">
              <Image
                src={logo}
                alt="Master Chips"
                width={60}
                height={60}
                priority
              />
            </div>

            {/* Right */}
            <div className="hidden lg:flex justify-end">
              <button
                className="
                  rounded-full
                  bg-main-yellow
                  px-6
                  py-3
                  text-white
                  font-medium
                  transition-all
                  duration-300
                  hover:opacity-90
                  lg:px-10
                "
              >
                Contact
              </button>
            </div>

          </div>
        </div>
      </header>

    {/* Mobile / Tablet Drawer */}

<div
  className={`
    fixed
    top-0
    left-0
    z-[999]
    h-screen
    w-[320px]
    bg-[#0B1E2D]
    border-r
    border-white/10
    transition-transform
    duration-500
    ease-out
    ${
      isOpen
        ? "translate-x-0"
        : "-translate-x-full"
    }
  `}
>
  {/* Header */}
  <div className="flex items-center justify-between px-6 py-8">

    <Image
      src={logo}
      alt="Master Chips"
      width={55}
      height={55}
    />

    <button
      onClick={() => setIsOpen(false)}
      className="
        text-white
        transition-transform
        duration-300
        hover:rotate-90
      "
    >
      <X size={30} />
    </button>

  </div>

  {/* Links */}
  <div className="mt-10 flex flex-col px-8">

    {links.map((link) => (
      <Link
        key={link.name}
        href={link.href}
        onClick={() => setIsOpen(false)}
        className="
          py-4
          text-[32px]
          font-semibold
          text-white
          transition-all
          duration-300
          hover:text-main-yellow
          hover:translate-x-2
        "
      >
        {link.name}
      </Link>
    ))}

  

  </div>

  {/* Footer */}
  <div
    className="
      absolute
      bottom-8
      left-8
      text-xs
      uppercase
      tracking-[5px]
      text-white/30
    "
  >
    Master Chips
  </div>
</div>
    </>
  );
}