import { AnimatePresence, motion } from "framer-motion";
import usePreviewStore from "@/store/previewStore";
import useCartStore from "@/features/cart/store/cartStore";
import useToastStore from "@/store/toastStore";

function QuickPreviewModal() {
  const isOpen = usePreviewStore(
    (state) => state.isOpen
  );

  const product = usePreviewStore(
    (state) => state.product
  );

  const showToast = useToastStore(
  (state) => state.showToast
  );

  const closePreview = usePreviewStore(
    (state) => state.closePreview
  );

  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  return (
    <AnimatePresence>

      {isOpen && product && (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="
            fixed
            inset-0
            z-[999]
            bg-black/70
            backdrop-blur-md
            flex
            items-center
            justify-center
            p-6
          "
          onClick={closePreview}
        >

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.92,
              y: 20,
            }}
            transition={{
              duration: 0.35,
            }}
            onClick={(e) =>
              e.stopPropagation()
            }
            className="
              relative
              w-full
              max-w-6xl
              overflow-hidden
              rounded-[32px]
              bg-zinc-950
              border
              border-white/10
              shadow-2xl
            "
          >

            <div
              className="
                grid
                grid-cols-1
                lg:grid-cols-2
              "
            >

              {/* Product Image */}
              <div
                className="
                  relative
                  h-[420px]
                  lg:h-[720px]
                  overflow-hidden
                "
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="
                    w-full
                    h-full
                    object-cover
                  "
                />

                {/* Image Overlay */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/60
                    to-transparent
                  "
                />
              </div>

              {/* Product Content */}
              <div
                className="
                  p-8
                  lg:p-14
                  flex
                  flex-col
                  justify-center
                  text-white
                "
              >

                {/* Category */}
                <span
                  className="
                    uppercase
                    tracking-[0.25em]
                    text-sm
                    text-gray-400
                    mb-4
                  "
                >
                  {product.category}
                </span>

                {/* Title */}
                <h2
                  className="
                    text-4xl
                    lg:text-6xl
                    font-black
                    leading-tight
                    mb-6
                  "
                >
                  {product.title}
                </h2>

                {/* Description */}
                <p
                  className="
                    text-lg
                    text-gray-300
                    leading-relaxed
                    mb-8
                  "
                >
                  {product.description}
                </p>

                {/* Price */}
                <div
                  className="
                    text-4xl
                    font-bold
                    mb-10
                  "
                >
                  ₹{product.price}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-4">

                  <button
                   onClick={() => {
  addToCart(product);

  showToast(
    `${product.title} added to cart`
  );

  closePreview();
}}
                    className="
                      px-8
                      py-4
                      rounded-full
                      bg-white
                      text-black
                      font-semibold
                      hover:scale-105
                      transition
                    "
                  >
                    Add To Cart
                  </button>

                  <button
                    onClick={closePreview}
                    className="
                      px-8
                      py-4
                      rounded-full
                      border
                      border-white/10
                      hover:bg-white/10
                      transition
                    "
                  >
                    Close
                  </button>

                </div>

              </div>

            </div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>
  );
}

export default QuickPreviewModal;