import { motion } from "framer-motion";

import {
  ArrowLeft,
  PackageCheck,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import useOrderStore
  from "@/features/orders/store/orderStore";

function OrdersManagement() {

  const orders =
    useOrderStore(
      (state) =>
        state.orders
    );

  const updateOrderStatus =
    useOrderStore(
      (state) =>
        state.updateOrderStatus
    );

    const selectOrder =
  useOrderStore(
    (state) =>
      state.selectOrder
  );

   const navigate =
     useNavigate();

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
          to="/admin"
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

          Back To Dashboard

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
          max-w-7xl
          mx-auto
        "
      >

        {/* Header */}
        <div className="mb-12">

          <div
            className="
              w-20
              h-20
              rounded-[28px]
              bg-white/10
              flex
              items-center
              justify-center
              mb-6
            "
          >

            <PackageCheck
              className="
                w-10
                h-10
              "
            />

          </div>

          <h1
            className="
              text-5xl
              font-black
              mb-4
            "
          >
            Orders Management
          </h1>

          <p
            className="
              text-gray-400
              max-w-3xl
            "
          >
            Monitor platform
            purchases, fulfillment
            operations, customer
            orders, and delivery
            workflow.
          </p>

        </div>

        {/* Orders Table */}
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
              grid
              grid-cols-6
              gap-4
              px-6
              py-5
              border-b
              border-white/10
              text-sm
              text-gray-400
            "
          >

            <div>Order ID</div>

            <div>Customer</div>

            <div>Total</div>

            <div>Status</div>

            <div>Date</div>

            <div>Actions</div>

          </div>

          {/* Orders */}
          {orders.length === 0 ? (

            <div
              className="
                py-20
                text-center
                text-gray-500
              "
            >
              No orders yet
            </div>

          ) : (

            orders.map((order) => (

              <motion.div
                key={order.id}
                onClick={() => {

  selectOrder(order);

  navigate(
    `/admin/orders/${order.id}`
  );
}}
                whileHover={{
                  backgroundColor:
                    "rgba(255,255,255,0.03)",
                }}
                 
                className="
                  grid
                  grid-cols-6
                  gap-4
                  px-6
                  py-6
                  border-b
                  border-white/5
                  items-center
                "
              >

                {/* Order ID */}
                <div
                  className="
                    font-medium
                  "
                >
                  {order.id}
                </div>

                {/* Customer */}
                <div>

                  <div
                    className="
                      font-medium
                      mb-1
                    "
                  >
                    {
                      order.customer
                        .name
                    }
                  </div>

                  <div
                    className="
                      text-sm
                      text-gray-400
                    "
                  >
                    {
                      order.customer
                        .phone
                    }
                  </div>

                </div>

                {/* Total */}
                <div>
                  ₹
                  {order.totalPrice}
                </div>

                {/* Status */}
                <div>

                  <span
                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-xs

                      ${
                        order.status ===
                        "pending"
                          ? `
                            bg-yellow-500/20
                            text-yellow-400
                          `
                          : order.status ===
                            "confirmed"
                          ? `
                            bg-blue-500/20
                            text-blue-400
                          `
                          : order.status ===
                            "processing"
                          ? `
                            bg-purple-500/20
                            text-purple-400
                          `
                          : order.status ===
                            "shipped"
                          ? `
                            bg-cyan-500/20
                            text-cyan-400
                          `
                          : order.status ===
                            "delivered"
                          ? `
                            bg-emerald-500/20
                            text-emerald-400
                          `
                          : `
                            bg-red-500/20
                            text-red-400
                          `
                      }
                    `}
                  >
                    {order.status}
                  </span>

                </div>

                {/* Date */}
                <div
                  className="
                    text-sm
                    text-gray-400
                  "
                >
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </div>

                {/* Actions */}
                <div>

                 <select

  onClick={(e) =>
    e.stopPropagation()
  }

  value={
    order.status
  }

  onChange={(e) =>
    updateOrderStatus(
      order.id,
      e.target.value
    )
  }

  className="
    bg-white/5
    border
    border-white/10
    rounded-xl
    px-3
    py-2
    text-sm
    outline-none
  "
>

  <option value="pending">
    Pending
  </option>

  <option value="confirmed">
    Confirmed
  </option>

  <option value="processing">
    Processing
  </option>

  <option value="shipped">
    Shipped
  </option>

  <option value="delivered">
    Delivered
  </option>

  <option value="cancelled">
    Cancelled
  </option>

</select>

                </div>

              </motion.div>

            ))

          )}

        </div>

      </motion.div>

    </div>
  );
}

export default OrdersManagement;