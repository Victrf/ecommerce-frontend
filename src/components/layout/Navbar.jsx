import { Link } from "react-router-dom";
import { LogOut, Shield, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import useCartStore from "@/features/cart/store/cartStore";
import useAuthStore from "@/features/auth/store/authStore";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cart = useCartStore((s) => s.cart);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const initials =
    user?.name
      ?.split(" ")
      ?.map((word) => word[0])
      ?.join("")
      ?.slice(0, 2)
      ?.toUpperCase() || "U";

  return (
    <nav
      className={`
        sticky top-0 z-50 transition-all duration-500 border-b
        ${scrolled
          ? "bg-neutral-950/60 backdrop-blur-2xl border-white/10 shadow-lg shadow-black/20"
          : "bg-neutral-950 border-transparent"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl sm:text-2xl font-black tracking-tight text-white hover:opacity-80 transition-opacity"
        >
          EDZE
        </Link>

        {/* Right Controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Cart */}
          <Link
            to="/cart"
            className="group relative flex items-center justify-center p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
              {cart.totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[1.125rem] h-[1.125rem] flex items-center justify-center px-1 text-[10px] font-bold bg-cyan-400 text-neutral-950 rounded-full ring-2 ring-neutral-950">
                  {cart.totalQuantity > 9 ? "9+" : cart.totalQuantity}
                </span>
              )}
            </div>
          </Link>

          {!user ? (
            <Link
              to="/login"
              className="px-3 py-2 text-sm font-medium text-white hover:opacity-70 transition-opacity"
            >
              Login
            </Link>
          ) : (
            <>
              {/* Admin */}
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-cyan-300 hover:bg-cyan-400/10 rounded-lg transition-colors"
                >
                  <Shield className="w-4 h-4" />
                  Admin
                </Link>
              )}

              {/* Account */}
              <Link
                to="/account"
                className="group flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full hover:bg-white/10 transition-colors"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-white/10 flex items-center justify-center text-xs font-bold text-white ring-2 ring-white/10 group-hover:ring-white/30 transition-all">
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    initials
                  )}
                </div>
                <span className="hidden md:block text-sm font-medium text-white/90">
                  {user.name}
                </span>
              </Link>

              {/* Logout */}
              <button
                onClick={logout}
                className="group flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-400/10 hover:text-red-300 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;