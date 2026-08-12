import { useNavigate } from "react-router-dom";
import useCartStore from "@/features/cart/store/cartStore";
import CartItem from "@/features/cart/components/CartItem";
import PageContainer from "@/components/layout/PageContainer";
import Button from "@/components/ui/Button";
function Cart() {
  const navigate = useNavigate();

  const cart = useCartStore((s) => s.cart);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const updateQuantity = useCartStore((s) => s.updateQuantity);

  // ✅ Improved empty state
  if (cart.items.length === 0) {
    return (
      <PageContainer className="flex flex-col items-center justify-center text-center gap-4">
        <h2 className="text-xl font-semibold">Your cart is empty</h2>

        <p className="text-gray-500">
          Looks like you haven’t added anything yet.
        </p>

        <Button onClick={() => navigate("/")}>
          Continue Shopping
        </Button>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      {/* Items */}
      <div className="md:col-span-2 space-y-4">
        {cart.items.map((item) => (
          <CartItem
            key={item.productId}
            item={item}
            onRemove={removeFromCart}
            onUpdate={updateQuantity}
          />
        ))}
      </div>

      {/* Summary */}
      <div className="border p-6 rounded-[var(--radius-lg)] shadow-[var(--shadow-soft)] h-fit">
        <h2 className="text-lg font-semibold mb-4">Summary</h2>

        <div className="flex justify-between mb-2">
          <span>Total Items</span>
          <span>{cart.totalQuantity}</span>
        </div>

        <div className="flex justify-between mb-4">
          <span>Total Price</span>
          <span>₹{cart.totalPrice}</span>
        </div>

        <Button full onClick={() => navigate("/checkout")}>
          Proceed to Checkout
        </Button>
      </div>

    </PageContainer>
  );
}

export default Cart;