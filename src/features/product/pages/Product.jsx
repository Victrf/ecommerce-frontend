import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import { getProductById } from "@/features/product/services/productService";
import useCartStore from "@/features/cart/store/cartStore";

import Toast from "@/components/ui/Toast";
import PageContainer from "@/components/layout/PageContainer";
import Button from "@/components/ui/Button";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [added, setAdded] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const loadProduct = async () => {
      const data = await getProductById(id);
      setProduct(data);
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);

    // Button animation
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1500);

    // Toast trigger
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  if (!product) {
    return <div className="p-10">Loading product...</div>;
  }

  return (
   <PageContainer className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

  {/* LEFT — Image */}
  <div>
    <img
      src={product.image}
      alt={product.title}
      className="w-full h-96 object-cover rounded-[var(--radius-lg)] shadow-[var(--shadow-soft)]"
    />
  </div>

  {/* RIGHT — Content */}
  <div className="space-y-6">

    <div className="space-y-3">
      <h1 className="text-2xl font-semibold">
        {product.title}
      </h1>

      <p className="text-xl font-medium text-gray-700">
        ₹{product.price}
      </p>

      <p className="text-gray-600">
        {product.description}
      </p>
    </div>

    <Button
      onClick={handleAddToCart}
      variant={added ? "success" : "primary"}
    >
      {added ? (
        <>
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            ✓
          </motion.span>
          Added
        </>
      ) : (
        "Add to Cart"
      )}
    </Button>

  </div>

  <Toast show={showToast} message="Added to cart" />
</PageContainer>
  );
}

export default Product;