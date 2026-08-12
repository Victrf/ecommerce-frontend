import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";

import Product
  from "../features/product/pages/Product";

import Cart
  from "../features/cart/pages/Cart";

import Login
  from "../pages/Auth/Login";

import Checkout
  from "../pages/Checkout/Checkout";

import ProtectedRoute
  from "../components/auth/ProtectedRoute";

import AdminDashboard
  from "@/features/admin/pages/AdminDashboard";

import AddProduct
  from "@/features/admin/pages/AddProduct";
import HeroManagement
  from "@/features/admin/pages/HeroManagement";
import OrdersManagement
  from "@/features/orders/pages/OrdersManagement";
import OrderDetails
  from "@/features/orders/pages/OrderDetails";
import AccountDashboard
  from "@/features/account/pages/AccountDashboard";
import Onboarding
  from "@/pages/Onboarding/Onboarding";

function AppRoutes() {

  return (
    <Routes>
      <Route
  path="/onboarding"
  element={<Onboarding />}
/>
      {/* Home */}
      <Route
        path="/"
        element={<Home />}
      />

      {/* Product */}
      <Route
        path="/product/:id"
        element={<Product />}
      />

      {/* Cart */}
      <Route
        path="/cart"
        element={<Cart />}
      />

      {/* Login */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* Admin Dashboard */}
      <Route
        path="/admin"
        element={<AdminDashboard />}
      />

      <Route
  path="/admin/add-product"
  element={<AddProduct />}
/>

<Route
  path="/admin/hero-management"
  element={<HeroManagement />}
/>
 <Route
  path="/admin/orders"
  element={<OrdersManagement />}
/>

<Route
  path="/admin/orders/:id"
  element={<OrderDetails />}
/>

<Route
  path="/account"
  element={
    <ProtectedRoute>
      <AccountDashboard />
    </ProtectedRoute>
  }
/>

      {/* Protected Checkout */}
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default AppRoutes;