"use client";

import { useEffect, useState, type ElementType } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

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

/* =========================================================
   HANDYHUB SERVICES
========================================================= */

const slides: HeroSlide[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=2200&q=90",
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
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=2200&q=90",
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
      "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=2200&q=90",
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
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=2200&q=90",
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
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=2200&q=90",
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
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2200&q=90",
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
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=2200&q=90",
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

  const slide = slides[current];
  const Icon = slide.icon;

  /* =======================================================
     AUTO SLIDER — 3 SECONDS
  ======================================================= */

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section
      className="
        relative
        min-h-[calc(100svh-4rem)]
        w-full
        overflow-hidden
        bg-[#dce7e1]
        text-white
      "
    >
      {/* =====================================================
          BACKGROUND IMAGE
          
          IMPORTANT:
          Black overlay intentionally kept VERY LOW.
      ===================================================== */}

      <div className="absolute inset-0">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={slide.id}
            initial={{
              opacity: 0,
              scale: 1.025,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.65,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url("${slide.image}")`,
            }}
          />
        </AnimatePresence>

        {/* =================================================
            VERY LIGHT IMAGE OVERLAY
            আগের black darkness অনেক কমানো হয়েছে
        ================================================= */}

        <div className="absolute inset-0 bg-black/[0.025]" />

        {/* Text readability only */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/[0.07] to-transparent" />

        {/* Bottom subtle readability */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/20 via-black/[0.04] to-transparent" />

        {/* Very subtle fresh green tint */}
        <div className="pointer-events-none absolute inset-0 bg-[#789f89]/[0.025]" />
      </div>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[calc(100svh-4rem)]
          max-w-[1500px]
          items-center
          px-5
          pb-36
          pt-24
          sm:px-8
          sm:pb-40
          sm:pt-28
          lg:px-12
          lg:pb-44
        "
      >
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
            {/* =================================================
                CATEGORY
            ================================================= */}

            <div
              className="
                mb-5
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/35
                bg-white/[0.10]
                px-3.5
                py-2
                shadow-lg
                backdrop-blur-md
                sm:mb-6
                sm:px-4
              "
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d7eadf]/50" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#d9eee2]" />
              </span>

              <span className="text-[9px] font-bold tracking-[0.17em] text-white sm:text-[11px]">
                {slide.category}
              </span>
            </div>

            {/* =================================================
                TITLE
            ================================================= */}

            <h1
              className="
                max-w-4xl
                text-[2.65rem]
                font-black
                leading-[0.98]
                tracking-[-0.045em]
                text-white
                drop-shadow-[0_2px_8px_rgba(0,0,0,0.20)]
                sm:text-6xl
                md:text-7xl
                lg:text-[5rem]
                xl:text-[5.5rem]
              "
            >
              {slide.title}

              <br />

              {/* Soft green — not strong green */}
              <span className="text-[#d5e9dc]">{slide.highlight}</span>
            </h1>

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <p
              className="
                mt-5
                max-w-2xl
                text-sm
                leading-7
                text-white
                drop-shadow-[0_1px_5px_rgba(0,0,0,0.25)]
                sm:mt-6
                sm:text-base
                sm:leading-8
                lg:text-lg
              "
            >
              {slide.description}
            </p>

            {/* =================================================
                BUTTON
            ================================================= */}

            <div className="mt-7 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:items-center">
              <Link
                href="/all-services"
                className="
                  group
                  inline-flex
                  w-fit
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  bg-white
                  px-6
                  py-3.5
                  text-sm
                  font-bold
                  text-[#26352d]
                  shadow-xl
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#f8fbf9]
                  hover:shadow-2xl
                "
              >
                {slide.button}

                <FiArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <div className="flex items-center gap-2 text-sm text-white drop-shadow-sm">
                <FiCheck size={16} className="text-[#e0f0e5]" />
                Trusted local professionals
              </div>
            </div>

            {/* =================================================
                TRUST INFORMATION
            ================================================= */}

            <div
              className="
                mt-7
                flex
                flex-wrap
                items-center
                gap-x-5
                gap-y-3
                text-xs
                text-white
                drop-shadow-sm
                sm:mt-8
                sm:text-sm
              "
            >
              <span className="flex items-center gap-2">
                <FiMapPin size={15} />
                Local service providers
              </span>

              <span className="hidden h-4 w-px bg-white/35 sm:block" />

              <span className="flex items-center gap-2">
                <FiStar size={15} className="fill-[#f6e3a6] text-[#f6e3a6]" />
                {slide.rating} trusted rating
              </span>

              <span className="hidden h-4 w-px bg-white/35 sm:block" />

              <span className="flex items-center gap-2">
                <FiShield size={15} />
                Reliable service
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* =====================================================
          PREVIOUS BUTTON
      ===================================================== */}

      <motion.button
        type="button"
        whileHover={{
          scale: 1.06,
        }}
        whileTap={{
          scale: 0.92,
        }}
        onClick={previousSlide}
        aria-label="Previous service"
        className="
          absolute
          left-2
          top-1/2
          z-30
          flex
          h-9
          w-9
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          border-white/45
          bg-white/[0.10]
          text-white
          shadow-lg
          backdrop-blur-md
          transition-all
          hover:bg-white/[0.18]
          sm:left-5
          sm:h-12
          sm:w-12
          lg:h-14
          lg:w-14
        "
      >
        <FiArrowLeft size={18} />
      </motion.button>

      {/* =====================================================
          NEXT BUTTON
      ===================================================== */}

      <motion.button
        type="button"
        whileHover={{
          scale: 1.06,
        }}
        whileTap={{
          scale: 0.92,
        }}
        onClick={nextSlide}
        aria-label="Next service"
        className="
          absolute
          right-2
          top-1/2
          z-30
          flex
          h-9
          w-9
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          border-white/45
          bg-white/[0.10]
          text-white
          shadow-lg
          backdrop-blur-md
          transition-all
          hover:bg-white/[0.18]
          sm:right-5
          sm:h-12
          sm:w-12
          lg:h-14
          lg:w-14
        "
      >
        <FiArrowRight size={18} />
      </motion.button>

      {/* =====================================================
          MOBILE THUMBNAILS
          
          IMPORTANT:
          - Only 3 thumbnails visible
          - No horizontal overflow
          - Active thumbnail stays in center
          - Cards are responsive
      ===================================================== */}

      <div
        className="
          absolute
          bottom-5
          left-0
          right-0
          z-40
          px-4
          sm:hidden
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-[430px]
            overflow-hidden
            rounded-2xl
            bg-black/[0.08]
            p-1.5
            backdrop-blur-md
          "
        >
          <div className="grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((position) => {
              /*
                Circular calculation ensures:
                8 -> 1 -> 2
                1 -> 2 -> 3
                etc.
              */

              const index =
                (current - 1 + position + slides.length) % slides.length;

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
                  className="
                    relative
                    h-[62px]
                    w-full
                    min-w-0
                    overflow-hidden
                    rounded-xl
                    border
                    border-white/25
                    shadow-lg
                  "
                >
                  {/* Image */}

                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url("${item.image}")`,
                    }}
                  />

                  {/* Small readability overlay */}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

                  {/* Active subtle glass */}

                  {isActive && (
                    <div className="absolute inset-0 bg-white/[0.07]" />
                  )}

                  {/* Icon */}

                  <div
                    className={`
                      absolute
                      left-2
                      top-2
                      flex
                      h-6
                      w-6
                      items-center
                      justify-center
                      rounded-lg
                      backdrop-blur-md
                      ${
                        isActive
                          ? "bg-white/25 text-white"
                          : "bg-black/15 text-white"
                      }
                    `}
                  >
                    <ItemIcon size={12} />
                  </div>

                  {/* Name */}

                  <div className="absolute bottom-0 left-0 right-0 p-1.5">
                    <p className="truncate text-left text-[8px] font-bold leading-tight text-white">
                      {item.service}
                    </p>
                  </div>

                  {/* Active border */}

                  {isActive && (
                    <motion.div
                      layoutId="mobileActive"
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        rounded-xl
                        border-2
                        border-white/80
                      "
                    />
                  )}

                  {/* 3 second progress */}

                  {isActive && (
                    <motion.div
                      key={`mobile-progress-${item.id}`}
                      initial={{
                        width: "0%",
                      }}
                      animate={{
                        width: "100%",
                      }}
                      transition={{
                        duration: 3,
                        ease: "linear",
                      }}
                      className="
                        absolute
                        bottom-0
                        left-0
                        h-[2px]
                        bg-[#d8e9de]
                      "
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* =====================================================
          TABLET + DESKTOP THUMBNAILS
      ===================================================== */}

      <div
        className="
          absolute
          bottom-6
          left-0
          right-0
          z-40
          hidden
          px-5
          sm:block
          lg:px-10
        "
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
                  whileHover={{
                    y: -3,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  aria-label={`View ${item.service}`}
                  className={`
                    group
                    relative
                    h-[65px]
                    min-w-0
                    overflow-hidden
                    rounded-xl
                    border
                    shadow-lg
                    transition-all
                    duration-300
                    md:h-[75px]
                    md:rounded-2xl
                    ${
                      isActive
                        ? "border-white/90 opacity-100"
                        : "border-white/35 opacity-75 hover:opacity-100"
                    }
                  `}
                >
                  {/* Image */}

                  <div
                    className="
                      absolute
                      inset-0
                      bg-cover
                      bg-center
                      transition-transform
                      duration-500
                      group-hover:scale-105
                    "
                    style={{
                      backgroundImage: `url("${item.image}")`,
                    }}
                  />

                  {/* Very light overlay */}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Icon */}

                  <div
                    className={`
                      absolute
                      left-2
                      top-2
                      flex
                      h-7
                      w-7
                      items-center
                      justify-center
                      rounded-lg
                      backdrop-blur-md
                      ${
                        isActive
                          ? "bg-white/25 text-white"
                          : "bg-black/15 text-white"
                      }
                    `}
                  >
                    <ItemIcon size={13} />
                  </div>

                  {/* Text */}

                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <p className="truncate text-left text-[9px] font-bold text-white md:text-[10px]">
                      {item.service}
                    </p>
                  </div>

                  {/* Active border */}

                  {isActive && (
                    <motion.div
                      layoutId="desktopActive"
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        rounded-xl
                        border-2
                        border-white/85
                        md:rounded-2xl
                      "
                    />
                  )}

                  {/* 3 second progress */}

                  {isActive && (
                    <motion.div
                      key={`desktop-progress-${item.id}`}
                      initial={{
                        width: "0%",
                      }}
                      animate={{
                        width: "100%",
                      }}
                      transition={{
                        duration: 3,
                        ease: "linear",
                      }}
                      className="
                        absolute
                        bottom-0
                        left-0
                        h-[2px]
                        bg-[#d8e9de]
                      "
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* =====================================================
          SLIDE NUMBER
      ===================================================== */}

      <div
        className="
          absolute
          bottom-9
          right-6
          z-40
          hidden
          items-center
          gap-2
          text-xs
          text-white/80
          lg:flex
        "
      >
        <span className="font-bold text-white">
          {String(current + 1).padStart(2, "0")}
        </span>

        <span>/</span>

        <span>{String(slides.length).padStart(2, "0")}</span>
      </div>

      {/* =====================================================
          BOTTOM PROGRESS
      ===================================================== */}

      <div className="absolute bottom-0 left-0 right-0 z-50 h-[2px] bg-white/20">
        <motion.div
          key={`main-progress-${slide.id}`}
          initial={{
            width: "0%",
          }}
          animate={{
            width: "100%",
          }}
          transition={{
            duration: 3,
            ease: "linear",
          }}
          className="h-full bg-white/75"
        />
      </div>
    </section>
  );
}
