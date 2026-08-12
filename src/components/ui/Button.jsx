import { motion } from "framer-motion";

function Button({
  children,
  onClick,
  variant = "primary",
  full = false,
  disabled = false,
}) {
  const base =
    "px-6 py-2 rounded flex items-center justify-center gap-2";

  const styles = {
    primary: "bg-black text-white",
    success: "bg-green-600 text-white",
    outline: "border border-gray-300",
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.95 }}
      className={`${base} ${styles[variant]} ${
        full ? "w-full" : ""
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {children}
    </motion.button>
  );
}

export default Button;