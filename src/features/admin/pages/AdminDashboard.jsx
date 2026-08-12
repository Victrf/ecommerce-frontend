import {
  Package,
  ShoppingCart,
  Heart,
  IndianRupee,
  Activity,
  Plus,
  Clapperboard,
  PackageCheck,
} from "lucide-react";

import { motion } from "framer-motion";

import useProductStore
  from "@/store/productStore";

import useWishlistStore
  from "@/store/wishlistStore";

import useCartStore
  from "@/features/cart/store/cartStore";

import useOrderStore
  from "@/features/orders/store/orderStore";

import { Link } from "react-router-dom";

function AdminDashboard() {

  const products =
    useProductStore(
      (state) =>
        state.products
    );

  const wishlist =
    useWishlistStore(
      (state) =>
        state.wishlist
    );

  const cart =
    useCartStore(
      (state) =>
        state.cart
    );

    const orders =
  useOrderStore(
    (state) =>
      state.orders
  );

 // analytics metrics
const totalProducts =
  products.length;

const wishlistCount =
  wishlist.length;

const cartItems =
  cart.items.length;

// operational order metrics
const totalOrders =
  orders.length;

const totalRevenue =
  orders.reduce(
    (total, order) =>
      total +
      order.totalPrice,
    0
  );

const pendingOrders =
  orders.filter(
    (order) =>
      order.status ===
      "pending"
  ).length;

const deliveredOrders =
  orders.filter(
    (order) =>
      order.status ===
      "delivered"
  ).length;

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

      {/* Header */}
      <div
        className="
          flex
          items-center
          justify-between
          mb-10
        "
      >

        <div>

          <h1
            className="
              text-4xl
              font-black
              mb-2
            "
          >
            Admin Dashboard
          </h1>

          <p
            className="
              text-gray-400
            "
          >
            Cinematic commerce
            operations center
          </p>

        </div>

       {/* Quick Action */}
<Link
  to="/admin/add-product"
  className="
    flex
    items-center
    gap-2
    px-5
    py-3
    rounded-full
    bg-white
    text-black
    font-semibold
    hover:scale-105
    transition
  "
>

  <Plus className="w-5 h-5" />

  Add Product

</Link>

      </div>

     {/* Analytics Grid */}
      <div
  className="
    grid
    grid-cols-1
    md:grid-cols-2
    xl:grid-cols-6
    gap-6
    mb-12
  "
>

  {/* Revenue */}
  <DashboardCard
    title="Revenue"
    value={`₹${totalRevenue}`}
    icon={IndianRupee}
  />

  {/* Orders */}
  <DashboardCard
    title="Orders"
    value={totalOrders}
    icon={PackageCheck}
  />

  {/* Pending */}
  <DashboardCard
    title="Pending Orders"
    value={pendingOrders}
    icon={Activity}
  />

  {/* Delivered */}
  <DashboardCard
    title="Delivered Orders"
    value={deliveredOrders}
    icon={Package}
  />

  {/* Products */}
  <DashboardCard
    title="Products"
    value={totalProducts}
    icon={Package}
  />

  {/* Wishlist */}
  <DashboardCard
    title="Wishlist Activity"
    value={wishlistCount}
    icon={Heart}
  />

      </div>

      {/* Inventory Section */}
      <div
        className="
          bg-white/5
          border
          border-white/10
          rounded-[32px]
          overflow-hidden
        "
      >

        {/* Section Header */}
        <div
          className="
            flex
            items-center
            justify-between
            px-6
            py-5
            border-b
            border-white/10
          "
        >

          <div>

            <h2
              className="
                text-2xl
                font-bold
              "
            >
              Inventory Overview
            </h2>

            <p
              className="
                text-sm
                text-gray-400
                mt-1
              "
            >
              Product inventory
              and platform items
            </p>

          </div>

          <div
            className="
              flex
              items-center
              gap-2
              text-sm
              text-gray-400
            "
          >

            <Activity className="w-4 h-4" />

            Live Inventory

          </div>

        </div>

        {/* Product Table */}
        <div
          className="
            overflow-x-auto
          "
        >

          <table
            className="
              w-full
              text-left
            "
          >

            <thead
              className="
                bg-white/5
                text-gray-400
                text-sm
              "
            >

              <tr>

                <th className="px-6 py-4">
                  Product
                </th>

                <th className="px-6 py-4">
                  Category
                </th>

               <th className="px-6 py-4">
  Price
</th>

<th className="px-6 py-4">
  Stock
</th>

<th className="px-6 py-4">
  Status
</th>

              </tr>

            </thead>

            <tbody>

              {products.map(
                (product) => (

                <motion.tr
                  key={product.id}
                  whileHover={{
                    backgroundColor:
                      "rgba(255,255,255,0.03)",
                  }}
                  className="
                    border-t
                    border-white/5
                  "
                >

                  {/* Product */}
                  <td
                    className="
                      px-6
                      py-4
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
                        src={product.image}
                        alt={product.title}
                        className="
                          w-14
                          h-14
                          rounded-xl
                          object-cover
                        "
                      />

                      <div>

                        <h3
                          className="
                            font-medium
                          "
                        >
                          {product.title}
                        </h3>

                        <p
                          className="
                            text-sm
                            text-gray-400
                          "
                        >
                          Product ID:
                          {" "}
                          {product.id}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* Category */}
                  <td
                    className="
                      px-6
                      py-4
                      text-gray-300
                    "
                  >
                    {product.category}
                  </td>

                  {/* Price */}
                 {/* Price */}
<td
  className="
    px-6
    py-4
  "
>
  ₹{product.price}
</td>

{/* Stock */}
<td
  className="
    px-6
    py-4
    font-medium
  "
>
  {product.stock}
</td>

{/* Status */}
<td
  className="
    px-6
    py-4
  "
>

  <span
    className={`
      px-3
      py-1
      rounded-full
      text-xs

      ${
        product.status ===
        "active"
          ? `
            bg-emerald-500/20
            text-emerald-400
          `
          : product.status ===
            "low-stock"
          ? `
            bg-yellow-500/20
            text-yellow-400
          `
          : `
            bg-red-500/20
            text-red-400
          `
      }
    `}
  >
    {product.status}
  </span>

</td>

                 

                </motion.tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
      {/* CMS Management */}
      <div className="mt-12">

       <div className="mb-6">

    <h2
      className="
        text-3xl
        font-black
        mb-2
      "
    >
      Platform Management
    </h2>

    <p
      className="
        text-gray-400
      "
    >
      Control cinematic
      storefront systems
      and platform content.
    </p>

  </div>

  <div
    className="
      grid
      grid-cols-1
md:grid-cols-2
xl:grid-cols-3
      gap-6
    "
  >

    {/* Add Product */}
    <Link
      to="/admin/add-product"
      className="
        bg-white/5
        border
        border-white/10
        rounded-[32px]
        p-8
        hover:bg-white/10
        transition
      "
    >

      <div
        className="
          w-16
          h-16
          rounded-2xl
          bg-white/10
          flex
          items-center
          justify-center
          mb-6
        "
      >

        <Plus className="w-8 h-8" />

      </div>

      <h3
        className="
          text-2xl
          font-bold
          mb-3
        "
      >
        Add Product
      </h3>

      <p
        className="
          text-gray-400
          leading-relaxed
        "
      >
        Create immersive
        cinematic inventory
        and expand the
        storefront catalog.
      </p>

    </Link>

    {/* Hero Management */}
    <Link
      to="/admin/hero-management"
      className="
        bg-white/5
        border
        border-white/10
        rounded-[32px]
        p-8
        hover:bg-white/10
        transition
      "
    >

      <div
        className="
          w-16
          h-16
          rounded-2xl
          bg-white/10
          flex
          items-center
          justify-center
          mb-6
        "
      >

        <Clapperboard
          className="
            w-8
            h-8
          "
        />

      </div>

      <h3
        className="
          text-2xl
          font-bold
          mb-3
        "
      >
        Hero Management
      </h3>

      <p
        className="
          text-gray-400
          leading-relaxed
        "
      >
        Manage cinematic
        homepage scenes,
        adaptive storytelling,
        media, and immersive
        storefront experiences.
      </p>

    </Link>

    {/* Orders Management */}
<Link
  to="/admin/orders"
  className="
    bg-white/5
    border
    border-white/10
    rounded-[32px]
    p-8
    hover:bg-white/10
    transition
  "
>

  <div
    className="
      w-16
      h-16
      rounded-2xl
      bg-white/10
      flex
      items-center
      justify-center
      mb-6
    "
  >

    <PackageCheck
      className="
        w-8
        h-8
      "
    />

  </div>

  <h3
    className="
      text-2xl
      font-bold
      mb-3
    "
  >
    Orders Management
  </h3>

  <p
    className="
      text-gray-400
      leading-relaxed
    "
  >
    Monitor customer
    purchases, fulfillment
    operations, order flow,
    and delivery states.
  </p>

</Link>

  </div>

      </div>

    </div>
  );
}

/* -----------------------------
   Dashboard Card
----------------------------- */

function DashboardCard({
  title,
  value,
  icon: Icon,
}) {

  return (
    <motion.div
      whileHover={{
        y: -5,
      }}
      className="
        bg-white/5
        border
        border-white/10
        rounded-[28px]
        p-6
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
          mb-6
        "
      >

        <div
          className="
            w-14
            h-14
            rounded-2xl
            bg-white/10
            flex
            items-center
            justify-center
          "
        >

          <Icon className="w-6 h-6" />

        </div>

      </div>

      <h3
        className="
          text-gray-400
          mb-2
        "
      >
        {title}
      </h3>

      <div
        className="
          text-4xl
          font-black
        "
      >
        {value}
      </div>

    </motion.div>
  );
}

export default AdminDashboard;