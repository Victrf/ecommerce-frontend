import { useEffect, useRef } from "react";

import ProductCard from "@/features/product/components/ProductCard";

function FeaturedRow({ title, products }) {
  const rowRef = useRef(null);

  useEffect(() => {
    const row = rowRef.current;

    if (!row) return;

    // AUTO SCROLL
    let animationFrame;

    const autoScroll = () => {
      if (row.scrollLeft >= row.scrollWidth / 2) {
        row.scrollLeft -= row.scrollWidth / 2;
      }

      row.scrollLeft += 0.5;

      animationFrame = requestAnimationFrame(autoScroll);
    };

    animationFrame = requestAnimationFrame(autoScroll);

    // MOUSE WHEEL → HORIZONTAL SCROLL
    const handleWheel = (e) => {
      e.preventDefault();

      row.scrollLeft += e.deltaY;
    };

    row.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      cancelAnimationFrame(animationFrame);

      row.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // duplicate products
  const loopingProducts = [...products, ...products];

  return (
    <section className=" overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-950 to-black">

      {/* Title */}
      <div className="px-6 mt-2">
        <h2
  className="
    text-lg
    md:text-xl
    font-semibold
    text-white
    tracking-tight
  "
>
  {title}
</h2>
      </div>

      {/* Shelf */}
      <div
        ref={rowRef}
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
        {loopingProducts.map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            className="
              min-w-[340px]
              max-w-[340px]
              flex-shrink-0
              rounded-2xl
              overflow-hidden
              bg-white/[0.03]
              backdrop-blur-sm
              border
              border-white/10
            "
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

    </section>
  );
}

export default FeaturedRow;