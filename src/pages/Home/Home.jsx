import {
  useEffect,
  useRef,
  useMemo,
} from "react";

import useProductStore from "@/store/productStore";

import ProductCard from "@/features/product/components/ProductCard";

import ProductToolbar from "@/features/product/components/ProductToolbar";

import FeaturedRow from "@/features/product/components/FeaturedRow";

import QuickPreviewModal from "@/features/product/components/QuickPreviewModal";

import HeroSection from "@/features/home/components/HeroSection";

import PageContainer from "@/components/layout/PageContainer";

import Toast from "@/components/ui/Toast";

import useToastStore from "@/store/toastStore";

import WishlistDrawer from "@/features/product/components/WishlistDrawer";

import { Heart } from "lucide-react";

import useWishlistStore from "@/store/wishlistStore";

import useWishlistDrawerStore from "@/store/wishlistDrawerStore";

import useRecentlyViewedStore from "@/store/recentlyViewedStore";

import useCartStore from "@/features/cart/store/cartStore";

function Home() {
  const products = useProductStore(
    (state) => state.products
  );

  const getRecommendedProducts =
    useProductStore(
      (state) =>
        state.getRecommendedProducts
    );

  const recommendedProducts =
    getRecommendedProducts();

  const recentlyViewed =
    useRecentlyViewedStore(
      (state) =>
        state.recentlyViewed
    );

  const filteredProducts =
    useProductStore(
      (state) =>
        state.filteredProducts
    );

  const fetchProducts =
    useProductStore(
      (state) =>
        state.fetchProducts
    );

  const loading = useProductStore(
    (state) => state.loading
  );

  const wishlist =
    useWishlistStore(
      (state) => state.wishlist
    );

  const cart =
    useCartStore(
      (state) => state.cart.items
    );

  const openWishlistDrawer =
    useWishlistDrawerStore(
      (state) => state.openDrawer
    );

  const showToast =
    useToastStore(
      (state) => state.show
    );

  const toastMessage =
    useToastStore(
      (state) => state.message
    );

  // adaptive storefront collections
  const collections = useMemo(() => {

    const allCollections = [
      {
        title:
          "Gaming Collection",

        category: "Gaming",

        products: products.filter(
          (p) =>
            p.category ===
            "Gaming"
        ),
      },

      {
        title:
          "Audio Collection",

        category: "Audio",

        products: products.filter(
          (p) =>
            p.category ===
            "Audio"
        ),
      },

      {
        title: "Wearables",

        category:
          "Wearables",

        products: products.filter(
          (p) =>
            p.category ===
            "Wearables"
        ),
      },
    ];

    // behavioral categories
    const categories = [
      ...wishlist
        .map(
          (item) =>
            item.category
        )
        .filter(Boolean),

      ...recentlyViewed
        .map(
          (item) =>
            item.category
        )
        .filter(Boolean),

      ...cart
        .map(
          (item) =>
            item.category
        )
        .filter(Boolean),
    ];

    // no behavior yet
    if (categories.length === 0) {
      return allCollections;
    }

    // frequency map
    const counts = {};

    categories.forEach((category) => {
      counts[category] =
        (counts[category] || 0) + 1;
    });

    // adaptive ordering
    return allCollections.sort(
      (a, b) =>
        (counts[b.category] || 0) -
        (counts[a.category] || 0)
    );

  }, [
    products,
    wishlist,
    recentlyViewed,
    cart,
  ]);

  // refs for storefront rows
  const storefrontRefs = useRef([]);

  // fetch products
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // horizontal wheel scrolling
  useEffect(() => {
    const rows =
      storefrontRefs.current;

    const cleanupFns = [];

    rows.forEach((row) => {
      if (!row) return;

      const handleWheel = (e) => {
        e.preventDefault();

        row.scrollLeft +=
          e.deltaY;
      };

      row.addEventListener(
        "wheel",
        handleWheel,
        {
          passive: false,
        }
      );

      cleanupFns.push(() => {
        row.removeEventListener(
          "wheel",
          handleWheel
        );
      });
    });

    return () => {
      cleanupFns.forEach(
        (cleanup) =>
          cleanup()
      );
    };
  }, [filteredProducts]);

  // loading state
  if (loading) {
    return (
      <PageContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {Array.from({
          length: 8,
        }).map((_, i) => (

          <div
            key={i}
            className="
              h-[420px]
              bg-gray-200
              animate-pulse
              rounded-[var(--radius-lg)]
            "
          />

        ))}

      </PageContainer>
    );
  }

  return (
    <div>

      {/* Hero */}
      <HeroSection />

      {/* Recommended */}
      <FeaturedRow
        title="Recommended For You"
        products={
          recommendedProducts
        }
      />

      {/* Recently Viewed */}
      {recentlyViewed.length >
        0 && (
        <FeaturedRow
          title="Recently Viewed"
          products={
            recentlyViewed
          }
        />
      )}

      {/* Adaptive Cinematic Rows */}
      {collections.map(
        (collection) => (
          <FeaturedRow
            key={
              collection.category
            }
            title={
              collection.title
            }
            products={
              collection.products
            }
          />
        )
      )}

      {/* Main Storefront */}
      <div className="mt-10">

        {/* Toolbar */}
        <div className="px-6 mb-10">
          <ProductToolbar />
        </div>

        {/* Empty State */}
        {filteredProducts.length ===
        0 ? (

          <div className="text-center py-20">

            <h2 className="text-2xl font-semibold mb-2">
              No products found
            </h2>

            <p className="text-gray-500">
              Try changing your
              search or filters
            </p>

          </div>

        ) : (

          <div className="space-y-10">

            {Array.from({
              length: Math.ceil(
                filteredProducts.length /
                  8
              ),
            }).map(
              (_, rowIndex) => {

                const rowProducts =
                  filteredProducts.slice(
                    rowIndex * 8,
                    rowIndex * 8 + 8
                  );

                return (
                  <div
                    key={rowIndex}
                    ref={(el) => {
                      storefrontRefs.current[
                        rowIndex
                      ] = el;
                    }}
                    className="
                      flex
                      gap-6
                      overflow-x-auto
                      overflow-y-hidden
                      px-6
                      pb-4
                      scrollbar-hide
                    "
                  >

                    {rowProducts.map(
                      (product) => (
                        <div
                          key={
                            product.id
                          }
                          className="
                            min-w-[220px]
                            max-w-[220px]
                            flex-shrink-0
                          "
                        >

                          <ProductCard
                            product={
                              product
                            }
                          />

                        </div>
                      )
                    )}

                  </div>
                );
              }
            )}

          </div>

        )}

      </div>

      {/* Floating Wishlist Button */}
      <button
        onClick={
          openWishlistDrawer
        }
        className="
          fixed
          bottom-8
          right-8
          z-40
          w-16
          h-16
          rounded-full
          bg-black/80
          backdrop-blur-xl
          border
          border-white/10
          flex
          items-center
          justify-center
          shadow-2xl
          hover:scale-110
          transition
        "
      >

        <Heart
          className="
            w-7
            h-7
            text-white
          "
        />

        {/* Wishlist Count */}
        {wishlist.length > 0 && (
          <div
            className="
              absolute
              -top-1
              -right-1
              min-w-[24px]
              h-6
              px-1
              rounded-full
              bg-red-500
              text-white
              text-xs
              font-bold
              flex
              items-center
              justify-center
            "
          >
            {wishlist.length}
          </div>
        )}

      </button>

      {/* Global Cinematic Preview Modal */}
      <QuickPreviewModal />

      {/* Wishlist Drawer */}
      <WishlistDrawer />

      {/* Global Toast */}
      <Toast
        show={showToast}
        message={toastMessage}
      />

    </div>
  );
}

export default Home;