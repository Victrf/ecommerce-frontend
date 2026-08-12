import { motion } from "framer-motion";

import {
  ArrowLeft,
  PackageSearch,
} from "lucide-react";

import { Link } from "react-router-dom";

import useOrderStore
  from "@/features/orders/store/orderStore";

function OrderDetails() {

  const selectedOrder =
    useOrderStore(
      (state) =>
        state.selectedOrder
    );

  if (!selectedOrder) {

    return (
      <div
        className="
          min-h-screen
          bg-zinc-950
          text-white
          p-10
        "
      >

        <Link
          to="/admin/orders"
          className="
            text-gray-400
          "
        >
          Back To Orders
        </Link>

        <div
          className="
            mt-20
            text-center
            text-gray-500
          "
        >
          No order selected
        </div>

      </div>
    );
  }

  return (
    <div
      className="
        min-h-screen
        bg-zinc-950
        text-white
        px-6
        py-10
      "
    >

      {/* Top Bar */}
      <div
        className="
          flex
          items-center
          justify-between
          mb-10
        "
      >

        <Link
          to="/admin/orders"
          className="
            flex
            items-center
            gap-2
            text-gray-400
            hover:text-white
            transition
          "
        >

          <ArrowLeft className="w-5 h-5" />

          Back To Orders

        </Link>

      </div>

      {/* Workspace */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          max-w-6xl
          mx-auto
          space-y-8
        "
      >

        {/* Header */}
        <div
          className="
            bg-white/5
            border
            border-white/10
            rounded-[36px]
            p-8
          "
        >

          <div
            className="
              flex
              items-center
              gap-6
              mb-8
            "
          >

            <div
              className="
                w-20
                h-20
                rounded-[28px]
                bg-white/10
                flex
                items-center
                justify-center
              "
            >

              <PackageSearch
                className="
                  w-10
                  h-10
                "
              />

            </div>

            <div>

              <h1
                className="
                  text-4xl
                  font-black
                  mb-2
                "
              >
                {selectedOrder.id}
              </h1>

              <p
                className="
                  text-gray-400
                "
              >
                Operational order
                inspection workspace
              </p>

            </div>

          </div>

          {/* Order Meta */}
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-3
              gap-6
            "
          >

            <MetaCard
              label="Customer"
              value={
                selectedOrder
                  .customer.name
              }
            />

            <MetaCard
              label="Phone"
              value={
                selectedOrder
                  .customer.phone
              }
            />

            <MetaCard
              label="Total"
              value={`₹${selectedOrder.totalPrice}`}
            />

            <MetaCard
              label="City"
              value={
                selectedOrder
                  .customer.city
              }
            />

            <MetaCard
              label="Status"
              value={
                selectedOrder
                  .status
              }
            />

            <MetaCard
              label="Date"
              value={
                new Date(
                  selectedOrder
                    .createdAt
                ).toLocaleString()
              }
            />

          </div>

        </div>

        {/* Purchased Items */}
        <div
          className="
            bg-white/5
            border
            border-white/10
            rounded-[36px]
            overflow-hidden
          "
        >

          {/* Header */}
          <div
            className="
              px-8
              py-6
              border-b
              border-white/10
            "
          >

            <h2
              className="
                text-2xl
                font-bold
              "
            >
              Purchased Items
            </h2>

          </div>

          {/* Items */}
          <div className="p-8 space-y-6">

            {selectedOrder.items.map(
              (item) => (

              <div
                key={
                  item.productId
                }
                className="
                  flex
                  items-center
                  justify-between
                  gap-6
                  border
                  border-white/10
                  rounded-3xl
                  p-5
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-5
                  "
                >

                  <img
                    src={item.image}
                    alt={item.title}
                    className="
                      w-24
                      h-24
                      rounded-2xl
                      object-cover
                    "
                  />

                  <div>

                    <h3
                      className="
                        text-xl
                        font-semibold
                        mb-2
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        text-gray-400
                      "
                    >
                      Quantity:
                      {" "}
                      {item.quantity}
                    </p>

                  </div>

                </div>

                <div
                  className="
                    text-2xl
                    font-bold
                  "
                >
                  ₹
                  {item.price *
                    item.quantity}
                </div>

              </div>

            ))}

          </div>

        </div>

      </motion.div>

    </div>
  );
}

/* -----------------------------
   Meta Card
----------------------------- */

function MetaCard({
  label,
  value,
}) {

  return (
    <div
      className="
        bg-white/5
        border
        border-white/10
        rounded-3xl
        p-5
      "
    >

      <p
        className="
          text-sm
          text-gray-400
          mb-2
        "
      >
        {label}
      </p>

      <h3
        className="
          text-lg
          font-semibold
        "
      >
        {value}
      </h3>

    </div>
  );
}

export default OrderDetails;