"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PulseGridLogo from "@/components/common/PulseGridLogo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`
        sticky top-0 z-50 transition-all duration-300
        ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-lg border-b border-slate-200"
            : "bg-white/60 backdrop-blur-md border-b border-slate-100"
        }
      `}
    >
      <div className="max-w-[1550px] mx-auto px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}

        <Link href="/">
          <PulseGridLogo size="md" />
        </Link>

        {/* Navigation */}

        <nav className="hidden lg:flex items-center gap-10 text-slate-600 font-medium">
         <a
            href="#Hero"
            className="relative hover:text-teal-600 transition-all duration-300
            after:absolute after:left-0 after:-bottom-2 after:h-[2px]
            after:w-0 after:bg-teal-500 after:transition-all
            hover:after:w-full"
          >
            About
          </a>
          <a
            href="#Features"
            className="relative hover:text-teal-600 transition-all duration-300
            after:absolute after:left-0 after:-bottom-2 after:h-[2px]
            after:w-0 after:bg-teal-500 after:transition-all
            hover:after:w-full"
          >
            Features
          </a>

          <a
            href="#Workflow"
            className="relative hover:text-teal-600 transition-all duration-300
            after:absolute after:left-0 after:-bottom-2 after:h-[2px]
            after:w-0 after:bg-teal-500 after:transition-all
            hover:after:w-full"
          >
            Solutions
          </a>

          

          <a
            href="#Stats"
            className="relative hover:text-teal-600 transition-all duration-300
            after:absolute after:left-0 after:-bottom-2 after:h-[2px]
            after:w-0 after:bg-teal-500 after:transition-all
            hover:after:w-full"
          >
            Hospitals
          </a>

        </nav>

        {/* Actions */}

        <div className="flex items-center gap-4">

          <Link href="/auth/login">
            <button
              className="
                px-5 py-2.5 rounded-xl
                border border-slate-300
                hover:border-teal-500
                hover:text-teal-600
                hover:shadow-lg
                hover:-translate-y-0.5
                transition-all duration-300
              "
            >
              Login
            </button>
          </Link>

          <Link href="/auth/organization">
            <button
              className="
                px-5 py-2.5 rounded-xl
                bg-gradient-to-r from-teal-500 to-blue-600
                text-white font-semibold shadow-lg
                hover:shadow-2xl
                hover:scale-105
                active:scale-95
                transition-all duration-300
              "
            >
              Hospital Login
            </button>
          </Link>

        </div>

      </div>
    </header>
  );
}