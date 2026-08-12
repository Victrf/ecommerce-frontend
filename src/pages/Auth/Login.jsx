import { useState }
  from "react";

import { motion }
  from "framer-motion";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  ArrowRight,
} from "lucide-react";

import useAuthStore
  from "@/features/auth/store/authStore";

function Login() {

  const navigate =
    useNavigate();

  const login =
    useAuthStore(
      (s) => s.login
    );

  // auth mode
  const [
    authMode,
    setAuthMode,
  ] = useState("login");

  // form state
  const [
    fullName,
    setFullName,
  ] = useState("");

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  // validation
  const [
    error,
    setError,
  ] = useState("");

  /* -----------------------------
     AUTH HANDLER
  ----------------------------- */

  const handleAuth =
    () => {

      // login validation
      if (
        authMode ===
        "login"
      ) {

        if (
          !email ||
          !password
        ) {

          setError(
            "Please fill all required fields"
          );

          return;
        }
      }

      // signup validation
      if (
        authMode ===
        "signup"
      ) {

        if (
          !fullName ||
          !email ||
          !password ||
          !confirmPassword
        ) {

          setError(
            "Please fill all required fields"
          );

          return;
        }

        if (
          password !==
          confirmPassword
        ) {

          setError(
            "Passwords do not match"
          );

          return;
        }
      }

      // clear validation
      setError("");

      // create user
      const fakeUser = {

        id:
          `USER-${Date.now()}`,

        name:
          fullName ||
          "Customer User",

        email,

        role:
          "customer",

        profileImage:
          null,
      };

      login(fakeUser);

      navigate("/account");
    };

  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-black
        text-white
        flex
        items-center
        justify-center
        px-6
      "
    >

      {/* Background Slides */}
      <div
        className="
          absolute
          inset-0
        "
      >

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

          className="
            absolute
            inset-0
          "
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
            bg-black/70
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

      {/* Auth Card */}
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
          relative
          z-10
          w-full
          max-w-md
          bg-white/5
          border
          border-white/10
          rounded-[36px]
          p-8
          backdrop-blur-2xl
        "
      >

        {/* Top Switcher */}
        <div
          className="
            flex
            bg-white/5
            rounded-full
            p-1
            mb-8
          "
        >

          {/* Login */}
          <button
            onClick={() => {

              setAuthMode(
                "login"
              );

              setError("");
            }}

            className={`
              flex-1
              py-3
              rounded-full
              text-sm
              font-semibold
              transition

              ${
                authMode ===
                "login"
                  ? `
                    bg-white
                    text-black
                  `
                  : `
                    text-gray-400
                  `
              }
            `}
          >
            Login
          </button>

          {/* Signup */}
          <button
            onClick={() => {

              setAuthMode(
                "signup"
              );

              setError("");
            }}

            className={`
              flex-1
              py-3
              rounded-full
              text-sm
              font-semibold
              transition

              ${
                authMode ===
                "signup"
                  ? `
                    bg-white
                    text-black
                  `
                  : `
                    text-gray-400
                  `
              }
            `}
          >
            Sign Up
          </button>

        </div>

        {/* Header */}
        <div className="mb-8">

          <h1
            className="
              text-4xl
              font-black
              mb-3
            "
          >

            {authMode ===
            "login"
              ? "Welcome Back"
              : "Create Account"}

          </h1>

          <p
            className="
              text-gray-300
              leading-relaxed
            "
          >

            {authMode ===
            "login"
              ? `
                Access your
                account, purchase
                history, and
                fulfillment tracking.
              `
              : `
                Join the cinematic
                commerce platform
                experience.
              `}

          </p>

        </div>

        {/* Signup Only */}
        {authMode ===
          "signup" && (

          <div className="mb-5">

            <label
              className="
                text-sm
                text-gray-300
                mb-2
                block
              "
            >
              Full Name
            </label>

            <input
              type="text"
              placeholder="John Carter"

              value={fullName}

              onChange={(e) =>
                setFullName(
                  e.target.value
                )
              }

              className="
                w-full
                bg-white/5
                border
                border-white/10
                rounded-2xl
                px-5
                py-4
                outline-none
              "
            />

          </div>

        )}

        {/* Email */}
        <div className="mb-5">

          <label
            className="
              text-sm
              text-gray-300
              mb-2
              block
            "
          >
            Email Address
          </label>

          <input
            type="email"
            placeholder="john@email.com"

            value={email}

            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }

            className="
              w-full
              bg-white/5
              border
              border-white/10
              rounded-2xl
              px-5
              py-4
              outline-none
            "
          />

        </div>

        {/* Password */}
        <div className="mb-5">

          <label
            className="
              text-sm
              text-gray-300
              mb-2
              block
            "
          >
            Password
          </label>

          <input
            type="password"
            placeholder="••••••••"

            value={password}

            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }

            className="
              w-full
              bg-white/5
              border
              border-white/10
              rounded-2xl
              px-5
              py-4
              outline-none
            "
          />

        </div>

        {/* Confirm Password */}
        {authMode ===
          "signup" && (

          <div className="mb-6">

            <label
              className="
                text-sm
                text-gray-300
                mb-2
                block
              "
            >
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="••••••••"

              value={
                confirmPassword
              }

              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }

              className="
                w-full
                bg-white/5
                border
                border-white/10
                rounded-2xl
                px-5
                py-4
                outline-none
              "
            />

          </div>

        )}

        {/* Validation */}
        {error && (

          <div
            className="
              mb-6
              rounded-2xl
              border
              border-red-500/20
              bg-red-500/10
              px-4
              py-3
              text-sm
              text-red-400
            "
          >
            {error}
          </div>

        )}

        {/* CTA */}
        <button

          onClick={
            handleAuth
          }

          className="
            w-full
            py-4
            rounded-2xl
            bg-white
            text-black
            font-semibold
            hover:scale-[1.02]
            transition
            inline-flex
            items-center
            justify-center
            gap-3
          "
        >

          {authMode ===
          "login"
            ? "Continue To Account"
            : "Create Account"}

          <ArrowRight
            className="
              w-5
              h-5
            "
          />

        </button>

        {/* Back */}
        <Link
          to="/"

          className="
            mt-6
            block
            text-center
            text-sm
            text-gray-400
            hover:text-white
            transition
          "
        >
          Continue Browsing
        </Link>

      </motion.div>

    </div>
  );
}

export default Login;