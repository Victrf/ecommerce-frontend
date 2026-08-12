import { motion, AnimatePresence } from "framer-motion";

function Toast({ show, message }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 120, opacity: 0, scale: 0.8 }}
          animate={{
            y: [120, -10, 0],
            opacity: 1,
            scale: [0.8, 1.1, 1],
          }}
          exit={{
            y: 120,
            opacity: 0,
            scale: 0.9,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
        >
          <span className="text-green-400 text-lg">✓</span>
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Toast;