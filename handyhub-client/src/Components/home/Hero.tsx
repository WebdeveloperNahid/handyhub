"use client";

import { useEffect, useState, type ElementType } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiDroplet,
  FiGrid,
  FiHome,
  FiMapPin,
  FiPrinter,
  FiShield,
  FiStar,
  FiTool,
  FiWind,
  FiZap,
} from "react-icons/fi";

interface HeroSlide {
  id: number;
  image: string;
  category: string;
  title: string;
  highlight: string;
  description: string;
  button: string;
  service: string;
  icon: ElementType;
  rating: string;
}

/* =========================================
   AUTOPLAY DURATION
   3 seconds
   ========================================= */
const SLIDE_DURATION_MS = 3000;

const slides: HeroSlide[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=2200&q=80",
    category: "ELECTRICAL SERVICE",
    title: "Electrical work,",
    highlight: "done safely.",
    description:
      "Find trusted local electricians for wiring, switches, lights, installations, repairs and everyday electrical work.",
    button: "Find Electricians",
    service: "Electrical",
    icon: FiZap,
    rating: "4.9",
  },

  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=2200&q=80",
    category: "HOME CLEANING",
    title: "A cleaner home,",
    highlight: "a better feeling.",
    description:
      "Book reliable home cleaners for deep cleaning, regular cleaning, kitchens, bedrooms and complete home care.",
    button: "Find Home Cleaners",
    service: "Home Cleaning",
    icon: FiHome,
    rating: "4.8",
  },

  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=2200&q=80",
    category: "FRIDGE & APPLIANCE REPAIR",
    title: "Fridge not cooling?",
    highlight: "Get it fixed fast.",
    description:
      "Connect with local technicians for refrigerator repair, cooling problems, appliance maintenance and installation.",
    button: "Find Fridge Experts",
    service: "Fridge Repair",
    icon: FiTool,
    rating: "4.9",
  },

  {
    id: 4,
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/074/237/150/small/professional-air-conditioner-installation-and-maintenance-by-technician-in-uniform-photo.jpg",
    category: "AC SERVICE & REPAIR",
    title: "AC not cooling?",
    highlight: "Let's get it sorted.",
    description:
      "Find skilled AC professionals for servicing, gas refill, repair, maintenance and complete cooling solutions.",
    button: "Find AC Services",
    service: "AC Repair",
    icon: FiWind,
    rating: "4.9",
  },

  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=2200&q=80",
    category: "TANK & PIPELINE",
    title: "Water problems?",
    highlight: "We've got the help.",
    description:
      "Find experienced professionals for water tanks, pipelines, leakage, fittings, pumps and household plumbing work.",
    button: "Find Pipeline Experts",
    service: "Tank & Pipeline",
    icon: FiDroplet,
    rating: "4.9",
  },

  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=2200&q=80",
    category: "PRINTER & OFFICE REPAIR",
    title: "Printer trouble?",
    highlight: "Keep work moving.",
    description:
      "Get local technicians for printer setup, repair, maintenance, cartridge problems and office equipment support.",
    button: "Find Printer Experts",
    service: "Printer Repair",
    icon: FiPrinter,
    rating: "4.8",
  },

  {
    id: 7,
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2200&q=80",
    category: "ARCHITECT & BUILDING",
    title: "Planning to build?",
    highlight: "Start with a better design.",
    description:
      "Connect with architects and building professionals for home design, planning, renovation and construction support.",
    button: "Find Architects",
    service: "Architect & Building",
    icon: FiHome,
    rating: "4.9",
  },

  {
    id: 8,
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=2200&q=80",
    category: "TILES • MASONRY • DOORS",
    title: "Upgrade your space,",
    highlight: "beautifully.",
    description:
      "Find skilled professionals for tiles, masonry, doors, windows, glass work, frames and modern home finishing.",
    button: "Find Home Experts",
    service: "Tiles & Doors",
    icon: FiGrid,
    rating: "4.9",
  },
];

/* =========================================================
   HERO
========================================================= */

export default function Hero() {
  const [current, setCurrent] = useState(0);

  /*
    Only touch devices will use this pause state.

    PC/Laptop:
    Hover করলে pause হবে না.

    Mobile/Tablet:
    Finger touch/press করলে pause হবে.
  */
  const [isTouching, setIsTouching] = useState(false);

  const prefersReducedMotion = useReducedMotion();

  const slide = slides[current];

  /* =========================================
     NEXT SLIDE
  ========================================= */
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  /* =========================================
     PREVIOUS SLIDE
  ========================================= */
  const previousSlide = () => {
    setCurrent(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
  };

  /* =========================================
     AUTOPLAY

     IMPORTANT:
     এখানে mouse hover check নেই.

     তাই PC/Laptop এ cursor hero-এর উপর
     থাকলেও image change চলতে থাকবে.

     Mobile/Tablet এ শুধু touch করলে
     temporary pause হবে.
  ========================================= */
  useEffect(() => {
    if (isTouching || prefersReducedMotion) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION_MS);

    return () => clearInterval(timer);
  }, [isTouching, prefersReducedMotion]);

  /* =========================================
     KEYBOARD CONTROL
  ========================================= */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextSlide();
      }

      if (e.key === "ArrowLeft") {
        previousSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /* =========================================
     TOUCH HANDLERS

     Mobile/Tablet:
     finger touch শুরু = pause
     finger release = autoplay resume
  ========================================= */
  const handleTouchStart = () => {
    setIsTouching(true);
  };

  const handleTouchEnd = () => {
    setIsTouching(false);
  };

  const handleTouchCancel = () => {
    setIsTouching(false);
  };

  return (
    <section
      className="relative min-h-[calc(100svh-4rem)] w-full overflow-hidden bg-[#1C1917] text-white"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      aria-roledescription="carousel"
      aria-label="Featured HandyHub services"
    >
      {/* =========================================
          SCREEN READER STATUS
      ========================================= */}
      <p className="sr-only" aria-live="polite">
        Showing {slide.service}, slide {current + 1} of {slides.length}
      </p>

      {/* =========================================
          BACKGROUND IMAGE
      ========================================= */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.65,
              ease: "easeInOut",
            }}
            className="absolute inset-0 overflow-hidden"
          >
            <motion.div
              initial={{ scale: 1 }}
              animate={{
                scale: prefersReducedMotion ? 1 : 1.08,
              }}
              transition={{
                duration: SLIDE_DURATION_MS / 1000 + 0.65,
                ease: "linear",
              }}
              className="absolute inset-0"
            >
              <Image
                src={slide.image}
                alt={slide.service}
                fill
                sizes="100vw"
                quality={75}
                priority={current === 0}
                className="object-cover object-[center_25%] sm:object-center"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Main image overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/10" />

        {/* Bottom overlay */}
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/55 to-transparent" />

        {/* HandyHub greenish tint */}
        <div className="pointer-events-none absolute inset-0 bg-[#15803D]/[0.09]" />
      </div>

      {/* =========================================
          MAIN CONTENT
      ========================================= */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] max-w-[1500px] items-center px-5 pb-36 pt-24 sm:px-8 sm:pb-40 sm:pt-28 lg:px-12 lg:pb-44">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{
              opacity: 0,
              x: -22,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: 18,
            }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full max-w-3xl"
          >
            {/* =========================================
                CATEGORY BADGE
            ========================================= */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#4ADE80]/40 bg-[#15803D]/20 px-3.5 py-2 shadow-lg backdrop-blur-md sm:mb-6 sm:px-4">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ADE80]/60" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ADE80]" />
              </span>

              <span className="text-[9px] font-bold tracking-[0.17em] text-[#D1FAE5] sm:text-[11px]">
                {slide.category}
              </span>
            </div>

            {/* =========================================
                TITLE
            ========================================= */}
            <h1 className="max-w-4xl text-[2.65rem] font-black leading-[0.98] tracking-[-0.045em] text-[#D9FBE5] drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)] sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[5.5rem]">
              {slide.title}
              <br />

              <span className="text-[#4ADE80]">
                {slide.highlight}
              </span>
            </h1>

            {/* =========================================
                DESCRIPTION
            ========================================= */}
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#D1FAE5] drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)] sm:mt-6 sm:text-base sm:leading-8 lg:text-lg">
              {slide.description}
            </p>

            {/* =========================================
                BUTTON + TRUST TEXT
            ========================================= */}
            <div className="mt-7 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:items-center">
              <Link
                href="/all-services"
                className="group inline-flex w-fit items-center justify-center gap-3 rounded-xl bg-[#15803D] px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-[#15803D]/30 transition-all duration-300 hover:-translate-y-1 hover:bg-[#166534] hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4ADE80] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1917]"
              >
                {slide.button}

                <FiArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <div className="flex items-center gap-2 text-sm text-[#D1FAE5] drop-shadow-sm">
                <FiCheck
                  size={16}
                  className="text-[#86EFAC]"
                />

                Trusted local professionals
              </div>
            </div>

            {/* =========================================
                TRUST INFO
            ========================================= */}
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-[#D1FAE5] drop-shadow-sm sm:mt-8 sm:text-sm">
              <span className="flex items-center gap-2">
                <FiMapPin
                  size={15}
                  className="text-[#86EFAC]"
                />

                Local service providers
              </span>

              <span className="hidden h-4 w-px bg-[#4ADE80]/40 sm:block" />

              <span className="flex items-center gap-2">
                <FiStar
                  size={15}
                  className="fill-[#4ADE80] text-[#4ADE80]"
                />

                {slide.rating} trusted rating
              </span>

              <span className="hidden h-4 w-px bg-[#4ADE80]/40 sm:block" />

              <span className="flex items-center gap-2">
                <FiShield
                  size={15}
                  className="text-[#86EFAC]"
                />

                Reliable service
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* =========================================
          PREVIOUS ARROW
      ========================================= */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.92 }}
        onClick={previousSlide}
        aria-label="Previous service"
        className="absolute left-2 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#4ADE80]/70 bg-white/10 text-white shadow-lg backdrop-blur-md transition-all hover:bg-[#15803D]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4ADE80] sm:left-5 sm:h-12 sm:w-12 lg:h-14 lg:w-14"
      >
        <FiArrowLeft size={18} />
      </motion.button>

      {/* =========================================
          NEXT ARROW
      ========================================= */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.92 }}
        onClick={nextSlide}
        aria-label="Next service"
        className="absolute right-2 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#4ADE80]/70 bg-white/10 text-white shadow-lg backdrop-blur-md transition-all hover:bg-[#15803D]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4ADE80] sm:right-5 sm:h-12 sm:w-12 lg:h-14 lg:w-14"
      >
        <FiArrowRight size={18} />
      </motion.button>

      {/* =========================================
          MOBILE THUMBNAILS
          Maximum 3 visible
      ========================================= */}
      <nav
        aria-label="Service slides"
        className="absolute bottom-5 left-0 right-0 z-40 px-4 sm:hidden"
      >
        <div className="mx-auto w-full max-w-[430px] overflow-hidden rounded-2xl bg-black/20 p-1.5 backdrop-blur-md">
          <div className="grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((position) => {
              const index =
                (current - 1 + position + slides.length) %
                slides.length;

              const item = slides[index];

              const ItemIcon = item.icon;

              const isActive = index === current;

              return (
                <motion.button
                  key={`${item.id}-${position}`}
                  type="button"
                  onClick={() => setCurrent(index)}
                  initial={{
                    opacity: 0,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: isActive ? 1 : 0.78,
                    scale: isActive ? 1 : 0.97,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  aria-label={`View ${item.service}`}
                  aria-current={
                    isActive ? "true" : undefined
                  }
                  className={`relative h-[62px] w-full min-w-0 overflow-hidden rounded-xl border shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4ADE80] ${
                    isActive
                      ? "border-[#4ADE80]"
                      : "border-[#22C55E]/50"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="120px"
                    quality={40}
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Active green overlay */}
                  {isActive && (
                    <div className="absolute inset-0 bg-[#15803D]/15" />
                  )}

                  {/* Icon */}
                  <div
                    className={`absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-lg backdrop-blur-md ${
                      isActive
                        ? "bg-[#4ADE80] text-[#1C1917]"
                        : "bg-black/25 text-[#D1FAE5]"
                    }`}
                  >
                    <ItemIcon size={12} />
                  </div>

                  {/* Service name */}
                  <div className="absolute bottom-0 left-0 right-0 p-1.5">
                    <p className="truncate text-left text-[8px] font-bold leading-tight text-white">
                      {item.service}
                    </p>
                  </div>

                  {/* Active border */}
                  {isActive && (
                    <motion.div
                      layoutId="mobileActive"
                      className="pointer-events-none absolute inset-0 rounded-xl border-2 border-[#4ADE80]"
                    />
                  )}

                  {/* Mobile progress */}
                  {isActive &&
                    !isTouching &&
                    !prefersReducedMotion && (
                      <motion.div
                        key={`mobile-progress-${item.id}`}
                        initial={{
                          width: "0%",
                        }}
                        animate={{
                          width: "100%",
                        }}
                        transition={{
                          duration:
                            SLIDE_DURATION_MS / 1000,
                          ease: "linear",
                        }}
                        className="absolute bottom-0 left-0 h-[2px] bg-[#4ADE80]"
                      />
                    )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* =========================================
          DESKTOP / TABLET THUMBNAILS
      ========================================= */}
      <nav
        aria-label="Service slides"
        className="absolute bottom-6 left-0 right-0 z-40 hidden px-5 sm:block lg:px-10"
      >
        <div className="mx-auto max-w-[1450px]">
          <div className="grid grid-cols-4 gap-2 md:grid-cols-8 md:gap-2.5">
            {slides.map((item, index) => {
              const ItemIcon = item.icon;

              const isActive = current === index;

              return (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrent(index)}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label={`View ${item.service}`}
                  aria-current={
                    isActive ? "true" : undefined
                  }
                  className={`group relative h-[65px] min-w-0 overflow-hidden rounded-xl border shadow-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4ADE80] md:h-[75px] md:rounded-2xl ${
                    isActive
                      ? "border-[#4ADE80] opacity-100"
                      : "border-[#22C55E]/50 opacity-75 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 25vw, 12vw"
                    quality={50}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                  {/* Icon */}
                  <div
                    className={`absolute left-2 top-2 flex h-7 w-7 items-center justify-center rounded-lg backdrop-blur-md ${
                      isActive
                        ? "bg-[#4ADE80] text-[#1C1917]"
                        : "bg-black/25 text-[#D1FAE5]"
                    }`}
                  >
                    <ItemIcon size={13} />
                  </div>

                  {/* Service name */}
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <p className="truncate text-left text-[9px] font-bold text-white md:text-[10px]">
                      {item.service}
                    </p>
                  </div>

                  {/* Active border */}
                  {isActive && (
                    <motion.div
                      layoutId="desktopActive"
                      className="pointer-events-none absolute inset-0 rounded-xl border-2 border-[#4ADE80] md:rounded-2xl"
                    />
                  )}

                  {/* Desktop progress */}
                  {isActive && !prefersReducedMotion && (
                    <motion.div
                      key={`desktop-progress-${item.id}`}
                      initial={{
                        width: "0%",
                      }}
                      animate={{
                        width: "100%",
                      }}
                      transition={{
                        duration:
                          SLIDE_DURATION_MS / 1000,
                        ease: "linear",
                      }}
                      className="absolute bottom-0 left-0 h-[2px] bg-[#4ADE80]"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* =========================================
          SLIDE NUMBER
      ========================================= */}
      <div className="absolute bottom-9 right-6 z-40 hidden items-center gap-2 text-xs text-[#D1FAE5] lg:flex">
        <span className="font-bold text-[#4ADE80]">
          {String(current + 1).padStart(2, "0")}
        </span>

        <span>/</span>

        <span>
          {String(slides.length).padStart(2, "0")}
        </span>
      </div>

      {/* =========================================
          MAIN BOTTOM PROGRESS
      ========================================= */}
      <div className="absolute bottom-0 left-0 right-0 z-50 h-[2px] bg-white/20">
        {!isTouching && !prefersReducedMotion && (
          <motion.div
            key={`main-progress-${slide.id}`}
            initial={{
              width: "0%",
            }}
            animate={{
              width: "100%",
            }}
            transition={{
              duration: SLIDE_DURATION_MS / 1000,
              ease: "linear",
            }}
            className="h-full bg-[#4ADE80]"
          />
        )}
      </div>
    </section>
  );
}
