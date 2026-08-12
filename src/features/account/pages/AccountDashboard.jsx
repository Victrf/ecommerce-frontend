import { motion } from "framer-motion";

import {
  User,
  PackageCheck,
} from "lucide-react";

import useAuthStore
  from "@/features/auth/store/authStore";

import useOrderStore
  from "@/features/orders/store/orderStore";

function AccountDashboard() {

    const user =
       useAuthStore(
      (state) =>
        state.user
    );

    const updateProfileImage =
  useAuthStore(
    (state) =>
      state.updateProfileImage
  );

  const orders =
    useOrderStore(
      (state) =>
        state.orders
    );

  // customer-owned orders
  const customerOrders =
    orders.filter(
      (order) =>
        order.customer.id ===
        user?.id
    );

     // avatar initials fallback
 const initials =
    user?.name
      ?.split(" ")
      ?.map(
        (word) =>
          word[0]
      )
      ?.join("")
      ?.slice(0, 2)
      ?.toUpperCase() ||
    "U";

    const trackingStages = [

  "pending",

  "confirmed",

  "processing",

  "shipped",

  "delivered",
];

    const handleImageUpload =
  (e) => {

    const file =
      e.target.files[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onloadend =
      () => {

        updateProfileImage(
          reader.result
        );
      };

    reader.readAsDataURL(
      file
    );
  };

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

      <div
        className="
          max-w-7xl
          mx-auto
        "
      >

        {/* Header */}
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
            bg-white/5
            border
            border-white/10
            rounded-[36px]
            p-8
            mb-10
          "
        >

          <div
            className="
              flex
              flex-col
              md:flex-row
              md:items-center
              md:justify-between
              gap-8
            "
          >

            {/* Profile */}
            <div
              className="
                flex
                items-center
                gap-6
              "
            >

              {/* Avatar */}
              <div
                className="
                  w-28
                  h-28
                  rounded-full
                  overflow-hidden
                  bg-white/10
                  flex
                  items-center
                  justify-center
                  text-3xl
                  font-black
                "
              >

                {user?.profileImage ? (

                  <img
                    src={
                      user.profileImage
                    }
                    alt={user.name}
                    className="
                      w-full
                      h-full
                      object-cover
                    "
                  />

                ) : (

                  initials

                )}

              </div>

              {/* User Info */}
              <div>

                <h1
                  className="
                    text-4xl
                    font-black
                    mb-2
                  "
                >
                  {user?.name ||
                    "Guest User"}
                </h1>

                <p
                  className="
                    text-gray-400
                    mb-4
                  "
                >
                  Customer commerce
                  workspace
                </p>

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    text-sm
                    text-gray-400
                  "
                >

                  <User className="w-4 h-4" />

                  {customerOrders.length}
                  {" "}
                  Orders

                </div>

              </div>

            </div>

            {/* Upload CTA */}
            <label
  className="
    px-6
    py-3
    rounded-full
    bg-white
    text-black
    font-semibold
    hover:scale-105
    transition
    cursor-pointer
    inline-flex
    items-center
    justify-center
  "
>

  Upload Profile Photo

  <input
    type="file"
    accept="image/*"

    onChange={
      handleImageUpload
    }

    className="hidden"
  />

</label>
          </div>

        </motion.div>

        {/* Purchase History */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.1,
          }}
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
                text-3xl
                font-black
                mb-2
              "
            >
              Purchase History
            </h2>

            <p
              className="
                text-gray-400
              "
            >
              Track your purchases,
              fulfillment progress,
              and order activity.
            </p>

          </div>

          {/* Orders */}
          <div className="p-8 space-y-6">

            {customerOrders.length === 0 ? (

              <div
                className="
                  text-center
                  py-20
                  text-gray-500
                "
              >
                No purchases yet
              </div>

            ) : (

              customerOrders.map(
                (order) => (

                <div
                  key={order.id}
                  className="
                    border
                    border-white/10
                    rounded-[32px]
                    p-6
                  "
                >

                  {/* Top */}
                  <div
                    className="
                      flex
                      flex-col
                      md:flex-row
                      md:items-center
                      md:justify-between
                      gap-6
                      mb-8
                    "
                  >

                    <div>

                      <h3
                        className="
                          text-2xl
                          font-bold
                          mb-2
                        "
                      >
                        {order.id}
                      </h3>

                      <p
                        className="
                          text-gray-400
                        "
                      >
                        {new Date(
                          order.createdAt
                        ).toLocaleString()}
                      </p>

                    </div>

                    {/* Status */}
                    <div>

                      <span
                        className={`
                          px-4
                          py-2
                          rounded-full
                          text-sm

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

                  </div>

                  {/* Items */}
                  <div className="space-y-5">

                    {order.items.map(
                      (item) => (

                      <div
                        key={
                          item.productId
                        }
                        className="
                          flex
                          items-center
                          justify-between
                          gap-5
                        "
                      >

                        <div
                          className="
                            flex
                            items-center
                            gap-4
                          "
                        >

                          <img
                            src={item.image}
                            alt={item.title}
                            className="
                              w-20
                              h-20
                              rounded-2xl
                              object-cover
                            "
                          />

                          <div>

                            <h4
                              className="
                                font-semibold
                                mb-1
                              "
                            >
                              {item.title}
                            </h4>

                            <p
                              className="
                                text-sm
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
                            text-lg
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

                  {/* Fulfillment Timeline */}
<div
  className="
    mt-10
    mb-8
  "
>

  <div
    className="
      flex
      items-center
      justify-between
      gap-2
      overflow-x-auto
    "
  >

    {trackingStages.map(
      (
        stage,
        index
      ) => {

        const currentStageIndex =
          trackingStages.indexOf(
            order.status
          );

        const isCompleted =
          index <
          currentStageIndex;

        const isActive =
          stage ===
          order.status;

        return (

          <div
            key={stage}
            className="
              flex
              items-center
              flex-1
            "
          >

            {/* Stage */}
            <div
              className="
                flex
                flex-col
                items-center
                min-w-[90px]
              "
            >

              {/* Circle */}
              <div
                className={`
                  w-12
                  h-12
                  rounded-full
                  flex
                  items-center
                  justify-center
                  text-xs
                  font-bold
                  border
                  transition

                  ${
                    isCompleted
                      ? `
                        bg-emerald-500
                        border-emerald-500
                        text-white
                      `
                      : isActive
                      ? `
                        bg-cyan-500
                        border-cyan-500
                        text-black
                        shadow-[0_0_25px_rgba(34,211,238,0.6)]
                      `
                      : `
                        bg-white/5
                        border-white/10
                        text-gray-500
                      `
                  }
                `}
              >

                {index + 1}

              </div>

              {/* Label */}
              <p
                className={`
                  mt-3
                  text-xs
                  uppercase
                  tracking-wider
                  text-center

                  ${
                    isCompleted ||
                    isActive
                      ? `
                        text-white
                      `
                      : `
                        text-gray-500
                      `
                  }
                `}
              >
                {stage}
              </p>

            </div>

            {/* Line */}
            {index !==
              trackingStages.length - 1 && (

              <div
                className={`
                  flex-1
                  h-[2px]
                  mx-2

                  ${
                    index <
                    currentStageIndex
                      ? `
                        bg-emerald-500
                      `
                      : `
                        bg-white/10
                      `
                  }
                `}
              />

            )}

          </div>

        );
      }
    )}

  </div>

</div>

                  {/* Footer */}
                  <div
                    className="
                      mt-8
                      pt-6
                      border-t
                      border-white/10
                      flex
                      items-center
                      justify-between
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-3
                        text-gray-400
                      "
                    >

                      <PackageCheck
                        className="
                          w-5
                          h-5
                        "
                      />

                      Fulfillment Active

                    </div>

                    <div
                      className="
                        text-2xl
                        font-black
                      "
                    >
                      ₹
                      {order.totalPrice}
                    </div>

                  </div>

                </div>

              ))

            )}

          </div>

        </motion.div>

      </div>

    </div>
  );
}

export default AccountDashboard;