import { useState } from "react";

import useCartStore
  from "@/features/cart/store/cartStore";

import useOrderStore
  from "@/features/orders/store/orderStore";

import PageContainer
  from "@/components/layout/PageContainer";

import Button
  from "@/components/ui/Button";

import Toast
  from "@/components/ui/Toast";

import useAuthStore
  from "@/features/auth/store/authStore";

function Checkout() {

  const cart =
    useCartStore(
      (s) => s.cart
    );

  const clearCart =
    useCartStore(
      (s) => s.clearCart
    );

  const createOrder =
    useOrderStore(
      (state) =>
        state.createOrder
    );

    const user =
  useAuthStore(
    (state) =>
      state.user
  );

  // toast state
  const [
    showToast,
    setShowToast,
  ] = useState(false);

  const [
    address,
    setAddress,
  ] = useState({
    name: "",
    phone: "",
    addressLine: "",
    city: "",
  });

  const handleChange = (
    e
  ) => {

    const {
      name,
      value,
    } = e.target;

    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder =
    () => {

      if (
        !address.name ||
        !address.phone ||
        !address.addressLine
      ) {

        alert(
          "Please fill all required fields"
        );

        return;
      }

      // create operational order
      createOrder({

        items:
          cart.items,

        totalPrice:
          cart.totalPrice,

      customer: {

  id:
    user?.id || null,

  name:
    address.name,

  phone:
    address.phone,

  city:
    address.city,

  address:
    address.addressLine,
},

      });

      console.log(
        "ORDER PLACED",
        {
          items:
            cart.items,

          total:
            cart.totalPrice,

          address,
        }
      );

      // clear cart
      clearCart();

      // show success toast
      setShowToast(true);
    };

  // empty cart state
  if (
    cart.items.length === 0
  ) {

    return (
      <PageContainer
        className="
          flex
          flex-col
          items-center
          text-center
          gap-4
        "
      >

        <h2
          className="
            text-xl
            font-semibold
          "
        >
          Your cart is empty
        </h2>

        <p
          className="
            text-gray-500
          "
        >
          Add items to your cart
          before checkout
        </p>

      </PageContainer>
    );
  }

  return (
    <PageContainer
      className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-8
      "
    >

      {/* Page Title */}
      <h1
        className="
          text-2xl
          font-semibold
          md:col-span-3
        "
      >
        Checkout
      </h1>

      {/* Shipping Form */}
      <div
        className="
          md:col-span-2
          border
          p-6
          rounded-[var(--radius-lg)]
          shadow-[var(--shadow-soft)]
          space-y-4
        "
      >

        <h2
          className="
            text-lg
            font-semibold
          "
        >
          Shipping Details
        </h2>

        <input
          name="name"
          placeholder="Full Name"
          value={address.name}
          onChange={handleChange}
          className="
            border
            w-full
            p-2
            rounded
          "
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={address.phone}
          onChange={handleChange}
          className="
            border
            w-full
            p-2
            rounded
          "
        />

        <textarea
          name="addressLine"
          placeholder="Address"
          value={
            address.addressLine
          }
          onChange={handleChange}
          className="
            border
            w-full
            p-2
            rounded
          "
        />

        <input
          name="city"
          placeholder="City"
          value={address.city}
          onChange={handleChange}
          className="
            border
            w-full
            p-2
            rounded
          "
        />

      </div>

      {/* Order Summary */}
      <div
        className="
          border
          p-6
          rounded-[var(--radius-lg)]
          shadow-[var(--shadow-soft)]
          h-fit
          space-y-4
        "
      >

        <h2
          className="
            text-lg
            font-semibold
          "
        >
          Order Summary
        </h2>

        <div
          className="
            space-y-2
          "
        >

          {cart.items.map(
            (item) => (

            <div
              key={
                item.productId
              }
              className="
                flex
                justify-between
                text-sm
              "
            >

              <span>
                {item.title}
                {" "}
                x
                {item.quantity}
              </span>

              <span>
                ₹
                {item.price *
                  item.quantity}
              </span>

            </div>

          ))}

        </div>

        <div
          className="
            flex
            justify-between
            font-semibold
          "
        >

          <span>Total</span>

          <span>
            ₹{cart.totalPrice}
          </span>

        </div>

        <Button
          full
          onClick={
            handlePlaceOrder
          }
          disabled={showToast}
        >
          Place Order
        </Button>

      </div>

      {/* Success Toast */}
      <Toast
        show={showToast}
        message="Order placed successfully"
      />

    </PageContainer>
  );
}

export default Checkout;