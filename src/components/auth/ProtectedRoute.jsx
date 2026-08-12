import { Navigate }
  from "react-router-dom";

import useAuthStore
  from "@/features/auth/store/authStore";

function ProtectedRoute({
  children,
  adminOnly = false,
}) {

  const user =
    useAuthStore(
      (s) => s.user
    );

  // not authenticated
  if (!user) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // admin protection
  if (
    adminOnly &&
    user.role !== "admin"
  ) {

    return (
      <Navigate
        to="/account"
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;