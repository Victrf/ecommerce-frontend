import {
  motion,
  AnimatePresence,
} from "framer-motion";

import { useState } from "react";

import { Heart } from "lucide-react";

import usePreviewStore from "@/store/previewStore";

import useWishlistStore from "@/store/wishlistStore";

import useToastStore from "@/store/toastStore";

import useRecentlyViewedStore from "@/store/recentlyViewedStore";

function ProductCard({ product }) {

  const [isHovered, setIsHovered] =
    useState(false);

  const openPreview = usePreviewStore(
    (state) => state.openPreview
  );

  const addRecentlyViewed =
    useRecentlyViewedStore(
      (state) =>
        state.addRecentlyViewed
    );

  const toggleWishlist =
    useWishlistStore(
      (state) =>
        state.toggleWishlist
    );

  const isWishlisted =
    useWishlistStore(
      (state) =>
        state.isWishlisted(
          product.id
        )
    );

  const showToast =
    useToastStore(
      (state) =>
        state.showToast
    );

  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.25,
      }}
      onMouseEnter={() =>
        setIsHovered(true)
      }
      onMouseLeave={() =>
        setIsHovered(false)
      }
      onClick={() => {
        addRecentlyViewed(
          product
        );

        openPreview(product);
      }}
      className="
        relative
        group
        h-[420px]
        overflow-hidden
        rounded-[2rem]
        cursor-pointer
        shadow-[var(--shadow-soft)]
        bg-zinc-900
      "
    >

      {/* Background Media */}
      <div
        className="
          absolute
          inset-0
          overflow-hidden
        "
      >

        {/* IMAGE */}
        <motion.img
          src={product.image}
          alt={product.title}
          animate={{
            scale: isHovered
              ? 1.08
              : 1,

            opacity:
              isHovered &&
              product.hoverVideo
                ? 0
                : 1,
          }}
          transition={{
            duration: 0.5,
          }}
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
          "
        />

        {/* HOVER VIDEO */}
        <AnimatePresence>

          {isHovered &&
            product.hoverVideo && (

            <motion.video
              key={
                product.hoverVideo
              }
              autoPlay
              muted
              loop
              playsInline
              initial={{
                opacity: 0,
                scale: 1.05,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.45,
              }}
              className="
                absolute
                inset-0
                w-full
                h-full
                object-cover
              "
            >

              <source
                src={
                  product.hoverVideo
                }
                type="video/mp4"
              />

            </motion.video>

          )}

        </AnimatePresence>

      </div>

      {/* Dark Overlay */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/80
          via-black/20
          to-transparent
        "
      />

      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();

          const added =
            toggleWishlist(product);

          showToast(
            added
              ? `${product.title} saved`
              : `${product.title} removed`
          );
        }}
        className="
          absolute
          top-4
          right-4
          z-20
          w-12
          h-12
          rounded-full
          backdrop-blur-xl
          bg-black/40
          border
          border-white/10
          flex
          items-center
          justify-center
          transition
          hover:scale-110
        "
      >

        <Heart
          className={`
            w-5
            h-5
            transition-all
            ${
              isWishlisted
                ? "fill-red-500 text-red-500"
                : "text-white"
            }
          `}
        />

      </button>

      {/* Content */}
      <div
        className="
          absolute
          bottom-0
          left-0
          w-full
          p-6
          text-white
          z-10
        "
      >

        {/* Category */}
        <span
          className="
            inline-block
            text-xs
            uppercase
            tracking-[0.2em]
            text-gray-300
            mb-3
          "
        >
          {product.category}
        </span>

        {/* Title */}
        <h2
          className="
            text-2xl
            font-bold
            leading-tight
            mb-2
          "
        >
          {product.title}
        </h2>

        {/* Description */}
        <p
          className="
            text-sm
            text-gray-200
            line-clamp-2
            mb-4
          "
        >
          {product.description}
        </p>

        {/* Price */}
        <div
          className="
            text-2xl
            font-semibold
          "
        >
          ₹{product.price}
        </div>

      </div>

    </motion.div>
  );
}

export default ProductCard;