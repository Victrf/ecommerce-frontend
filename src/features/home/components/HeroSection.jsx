import {
  useEffect,
  useState,
  useMemo,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import useHeroStore
from "@/features/admin/store/heroStore";

import useWishlistStore from "@/store/wishlistStore";

import useRecentlyViewedStore from "@/store/recentlyViewedStore";

import useCartStore from "@/features/cart/store/cartStore";

function HeroSection() {
  const [currentScene, setCurrentScene] =
    useState(0);

  // behavioral stores
  const wishlist =
    useWishlistStore(
      (state) => state.wishlist
    );

  const recentlyViewed =
    useRecentlyViewedStore(
      (state) => state.recentlyViewed
    );

  const heroScenes =
    useHeroStore(
      (state) =>
        state.heroScenes
    );

  const cart =
    useCartStore(
      (state) => state.cart.items
    );

  // adaptive hero sequencing
  const orderedScenes = useMemo(() => {

    // collect categories
    const categories = [
      ...wishlist
        .map((item) => item.category)
        .filter(Boolean),

      ...recentlyViewed
        .map((item) => item.category)
        .filter(Boolean),

      ...cart
        .map((item) => item.category)
        .filter(Boolean),
    ];

    // no behavior yet
    if (categories.length === 0) {
      return heroScenes;
    }

    // frequency map
    const counts = {};

    categories.forEach((category) => {
      counts[category] =
        (counts[category] || 0) + 1;
    });

    // dominant category
    const dominantCategory =
      Object.keys(counts).reduce(
        (a, b) =>
          counts[a] > counts[b]
            ? a
            : b
      );

    // prioritized scenes
    const prioritized =
      heroScenes.filter(
        (scene) =>
          scene.category ===
          dominantCategory
      );

    // remaining scenes
    const remaining =
      heroScenes.filter(
        (scene) =>
          scene.category !==
          dominantCategory
      );

    return [
      ...prioritized,
      ...remaining,
    ];

  }, [
    wishlist,
    recentlyViewed,
    cart,
  ]);

  // auto scene switching
  useEffect(() => {
    const interval = setInterval(() => {

      setCurrentScene((prev) =>
        prev ===
        orderedScenes.length - 1
          ? 0
          : prev + 1
      );

    }, 7000);

    return () => clearInterval(interval);

  }, [orderedScenes]);

  const scene =
    orderedScenes[currentScene];

  // staggered content animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.25,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.08,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      y: -30,
      filter: "blur(4px)",
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  return (
    <section
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-black
        text-white
        select-none
      "
    >

      {/* Scene Background */}
      <AnimatePresence mode="wait">

        <motion.div
          key={scene.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.6, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="absolute inset-0 will-change-transform"
        >

          {/* IMAGE */}
          {scene.type === "image" && (
            <img
              src={scene.media}
              alt={scene.title}
              className="
                w-full
                h-full
                object-cover
              "
            />
          )}

          {/* VIDEO */}
          {scene.type === "video" && (
            <video
              src={scene.media}
              autoPlay
              muted
              loop
              playsInline
              className="
                w-full
                h-full
                object-cover
              "
            />
          )}

          {/* Dark Overlay */}
          <div
            className="
              absolute
              inset-0
              bg-black/50
            "
          />

          {/* Cinematic Gradient */}
          <div
            className={`
              absolute
              inset-0
              bg-gradient-to-br
              opacity-40
              ${scene.accent}
            `}
          />

          {/* Vignette */}
          <div
            className="
              absolute
              inset-0
              bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.6)_100%)]
              pointer-events-none
            "
          />

        </motion.div>

      </AnimatePresence>

      {/* Ambient Orbs */}
      <motion.div
        animate={{
          y: [0, -50, 0],
          x: [0, 30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          top-10
          right-10
          w-[500px]
          h-[500px]
          bg-white/5
          blur-[120px]
          rounded-full
          pointer-events-none
          will-change-transform
        "
      />
      <motion.div
        animate={{
          y: [0, 40, 0],
          x: [0, -20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="
          absolute
          bottom-20
          left-10
          w-[400px]
          h-[400px]
          bg-white/5
          blur-[100px]
          rounded-full
          pointer-events-none
          will-change-transform
        "
      />

      {/* Content */}
      <div
        className="
          relative
          z-10
          min-h-screen
          flex
          items-center
          px-6
          lg:px-20
        "
      >

        <AnimatePresence mode="wait">

          <motion.div
            key={scene.id}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="
              max-w-3xl
              space-y-8
            "
          >

            {/* Eyebrow */}
            <motion.div
              variants={itemVariants}
              className="
                uppercase
                tracking-[0.3em]
                text-sm
                text-gray-300
                font-medium
              "
            >
              {scene.eyebrow}
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className="
                text-5xl
                md:text-7xl
                lg:text-8xl
                font-black
                leading-[0.95]
                whitespace-pre-line
                drop-shadow-2xl
              "
            >
              {scene.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="
                text-lg
                md:text-xl
                text-gray-200
                max-w-2xl
                leading-relaxed
                drop-shadow-lg
              "
            >
              {scene.description}
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >

              <button
                className="
                  group
                  relative
                  px-8
                  py-4
                  rounded-full
                  bg-white
                  text-black
                  font-semibold
                  overflow-hidden
                  transition-transform
                  duration-300
                  hover:scale-105
                  active:scale-95
                "
              >
                <span className="relative z-10">{scene.buttonPrimary}</span>
                <div className="absolute inset-0 bg-neutral-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>

              <button
                className="
                  group
                  px-8
                  py-4
                  rounded-full
                  border
                  border-white/30
                  backdrop-blur-md
                  font-semibold
                  transition-all
                  duration-300
                  hover:bg-white/15
                  hover:border-white/50
                  active:scale-95
                "
              >
                {scene.buttonSecondary}
              </button>

            </motion.div>

          </motion.div>

        </AnimatePresence>

      </div>

      {/* Scene Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {orderedScenes.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setCurrentScene(i)}
            aria-label={`Go to scene ${i + 1}`}
            className={`
              h-1.5
              rounded-full
              transition-all
              duration-500
              ease-out
              ${i === currentScene
                ? "w-8 bg-white"
                : "w-1.5 bg-white/40 hover:bg-white/70"
              }
            `}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`progress-${scene.id}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 7, ease: "linear" }}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/40 origin-left z-20"
        />
      </AnimatePresence>

      {/* Bottom Fade */}
      <div
        className="
          absolute
          bottom-0
          left-0
          w-full
          h-40
          bg-gradient-to-t
          from-black
          to-transparent
          pointer-events-none
        "
      />

    </section>
  );
}

export default HeroSection;