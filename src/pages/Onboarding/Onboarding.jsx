import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

export default function Onboarding() {

  const navigate =
    useNavigate();

  const handleStart = () => {

    localStorage.setItem(
      "cinematic-onboarding",
      "true"
    );

    navigate("/");
  };

  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-black
        text-white
      "
    >

      {/* Background Slides */}
      <div className="absolute inset-0">

        {/* Image Slide 1 */}
        <motion.div
          animate={{
            opacity: [1, 0, 0, 1],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            inset-0
            bg-cover
            bg-center
          "
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1600&auto=format&fit=crop')",
          }}
        />

        {/* Video Slide */}
        <motion.div
          animate={{
            opacity: [0, 1, 0, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0"
        >

          <video
            autoPlay
            muted
            loop
            playsInline
            className="
              w-full
              h-full
              object-cover
            "
          >
            <source
              src="https://cdn.pixabay.com/video/2023/09/06/179452-861778072_large.mp4"
              type="video/mp4"
            />
          </video>

        </motion.div>

        {/* Image Slide 2 */}
        <motion.div
          animate={{
            opacity: [0, 0, 1, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            inset-0
            bg-cover
            bg-center
          "
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1600&auto=format&fit=crop')",
          }}
        />

        {/* Dark Overlay */}
        <div
          className="
            absolute
            inset-0
            bg-black/60
          "
        />

        {/* Animated Gradient Atmosphere */}
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            top-[-200px]
            left-[-100px]
            w-[600px]
            h-[600px]
            rounded-full
            bg-cyan-500/30
            blur-3xl
          "
        />

        <motion.div
          animate={{
            x: [0, -60, 0],
            y: [0, -50, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            bottom-[-220px]
            right-[-120px]
            w-[600px]
            h-[600px]
            rounded-full
            bg-purple-500/30
            blur-3xl
          "
        />

      </div>

      {/* Content */}
      <div
        className="
          relative
          z-10
          min-h-screen
          flex
          items-center
          justify-center
          px-6
        "
      >

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
            max-w-5xl
            text-center
          "
        >

          {/* Heading */}
          <h1
            className="
              text-5xl
              md:text-7xl
              font-black
              leading-tight
              tracking-tight
              mb-8
            "
          >
            Welcome To The

            <motion.span
              animate={{
                backgroundPosition: [
                  "0% 50%",
                  "100% 50%",
                  "0% 50%",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                block
                bg-gradient-to-r
                from-cyan-400
                via-white
                to-purple-400
                bg-[length:200%_200%]
                bg-clip-text
                text-transparent
                drop-shadow-[0_0_40px_rgba(34,211,238,0.4)]
              "
            >
              Commerce Experience
            </motion.span>

          </h1>

          {/* Description */}
          <p
            className="
              max-w-3xl
              mx-auto
              text-lg
              md:text-xl
              text-gray-300
              leading-relaxed
              mb-14
            "
          >
            Explore a cinematic storefront infrastructure built around immersive shopping, fulfillment tracking, identity systems, and operational commerce workflows.
          </p>

          {/* Actions */}
          <div
            className="
              flex
              flex-col
              sm:flex-row
              items-center
              justify-center
              gap-5
            "
          >

            <button
              onClick={handleStart}
              className="
                inline-flex
                items-center
                gap-3
                px-8
                py-4
                rounded-full
                bg-white
                text-black
                font-semibold
                hover:scale-105
                transition
              "
            >
              Start Journey

              <ArrowRight
                className="
                  w-5
                  h-5
                "
              />
            </button>

            <Link
              to="/"
              className="
                px-8
                py-4
                rounded-full
                border
                border-white/10
                bg-white/10
                backdrop-blur-xl
                hover:bg-white/20
                transition
              "
            >
              Continue Browsing
            </Link>

          </div>

        </motion.div>

      </div>

    </div>
  );
}
