import { AnimatePresence, motion } from "framer-motion";

import { Heart, X } from "lucide-react";

import useWishlistStore from "@/store/wishlistStore";
import useWishlistDrawerStore from "@/store/wishlistDrawerStore";
import usePreviewStore from "@/store/previewStore";

import useCartStore from "@/features/cart/store/cartStore";

import useToastStore from "@/store/toastStore";

function WishlistDrawer() {
  const wishlist = useWishlistStore(
    (state) => state.wishlist
  );

  const toggleWishlist = useWishlistStore(
    (state) => state.toggleWishlist
  );

  const isOpen = useWishlistDrawerStore(
    (state) => state.isOpen
  );

  const closeDrawer =
    useWishlistDrawerStore(
      (state) => state.closeDrawer
    );

  const openPreview = usePreviewStore(
    (state) => state.openPreview
  );

  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  const showToast = useToastStore(
    (state) => state.showToast
  );

  return (
    <AnimatePresence>

      {isOpen && (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="
            fixed
            inset-0
            z-[999]
            bg-black/60
            backdrop-blur-sm
          "
          onClick={closeDrawer}
        >

          <motion.div
            initial={{ x: 500 }}
            animate={{ x: 0 }}
            exit={{ x: 500 }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
            }}
            onClick={(e) =>
              e.stopPropagation()
            }
            className="
              absolute
              top-0
              right-0
              h-full
              w-full
              max-w-xl
              bg-zinc-950
              border-l
              border-white/10
              overflow-y-auto
            "
          >

            {/* Header */}
            <div
              className="
                sticky
                top-0
                z-20
                backdrop-blur-xl
                bg-zinc-950/90
                border-b
                border-white/10
                px-6
                py-5
                flex
                items-center
                justify-between
              "
            >

              <div className="flex items-center gap-3">

                <Heart
                  className="
                    text-red-500
                    fill-red-500
                  "
                />

                <h2
                  className="
                    text-2xl
                    font-bold
                    text-white
                  "
                >
                  Wishlist
                </h2>

              </div>

              <button
                onClick={closeDrawer}
                className="
                  w-10
                  h-10
                  rounded-full
                  bg-white/5
                  flex
                  items-center
                  justify-center
                  hover:bg-white/10
                  transition
                "
              >
                <X className="text-white" />
              </button>

            </div>

            {/* Content */}
            <div className="p-6">

              {wishlist.length === 0 ? (

                <div
                  className="
                    h-[70vh]
                    flex
                    flex-col
                    items-center
                    justify-center
                    text-center
                  "
                >

                  <Heart
                    className="
                      w-16
                      h-16
                      text-gray-600
                      mb-6
                    "
                  />

                  <h3
                    className="
                      text-2xl
                      font-bold
                      text-white
                      mb-3
                    "
                  >
                    Your wishlist is empty
                  </h3>

                  <p className="text-gray-400">
                    Save products to revisit them later.
                  </p>

                </div>

              ) : (

                <div className="space-y-5">

                  {wishlist.map((product) => (

                    <motion.div
                      key={product.id}
                      layout
                      initial={{
                        opacity: 0,
                        y: 30,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      className="
                        group
                        flex
                        gap-4
                        rounded-3xl
                        overflow-hidden
                        bg-white/5
                        border
                        border-white/10
                        cursor-pointer
                      "
                      onClick={() =>
                        openPreview(product)
                      }
                    >

                      {/* Image */}
                      <div
                        className="
                          w-32
                          h-32
                          overflow-hidden
                          flex-shrink-0
                        "
                      >
                        <img
                          src={product.image}
                          alt={product.title}
                          className="
                            w-full
                            h-full
                            object-cover
                            transition-transform
                            duration-500
                            group-hover:scale-110
                          "
                        />
                      </div>

                      {/* Content */}
                      <div
                        className="
                          flex-1
                          p-4
                          text-white
                        "
                      >

                        <span
                          className="
                            text-xs
                            uppercase
                            tracking-[0.2em]
                            text-gray-400
                          "
                        >
                          {product.category}
                        </span>

                        <h3
                          className="
                            text-lg
                            font-bold
                            mt-2
                            mb-2
                            line-clamp-1
                          "
                        >
                          {product.title}
                        </h3>

                        <p
                          className="
                            text-sm
                            text-gray-400
                            line-clamp-2
                            mb-3
                          "
                        >
                          {product.description}
                        </p>

                        <div
                          className="
                            flex
                            items-center
                            justify-between
                            gap-3
                          "
                        >

                          {/* Price */}
                          <div
                            className="
                              text-xl
                              font-bold
                              text-white
                            "
                          >
                            ₹{product.price}
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2">

                            {/* Add To Cart */}
                            <button
                              onClick={(e) => {
  e.stopPropagation();

  addToCart(product);

  toggleWishlist(product);

  showToast(
    `${product.title} added to cart`
  );
}}
                              className="
                                px-4
                                py-2
                                rounded-full
                                bg-white
                                text-black
                                text-sm
                                font-semibold
                                hover:scale-105
                                transition
                              "
                            >
                              Add
                            </button>

                            {/* Remove Wishlist */}
                            <button
                              onClick={(e) => {
  e.stopPropagation();

  addToCart(product);

  toggleWishlist(product);

  showToast(
    `${product.title} added to cart`
  );
}}
                              className="
                                w-10
                                h-10
                                rounded-full
                                bg-red-500/20
                                flex
                                items-center
                                justify-center
                                hover:scale-110
                                transition
                              "
                            >
                              <Heart
                                className="
                                  w-5
                                  h-5
                                  fill-red-500
                                  text-red-500
                                "
                              />
                            </button>

                          </div>

                        </div>

                      </div>

                    </motion.div>

                  ))}

                </div>

              )}

            </div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>
  );
}

export default WishlistDrawer;