import { motion } from "framer-motion";

import {
  ArrowLeft,
  Clapperboard,
} from "lucide-react";

import { Link } from "react-router-dom";

import useHeroStore
  from "@/features/admin/store/heroStore";

function HeroManagement() {

  const heroScenes =
    useHeroStore(
      (state) =>
        state.heroScenes
    );

  const updateHeroScene =
    useHeroStore(
      (state) =>
        state.updateHeroScene
    );

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
          max-w-6xl
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

            <Clapperboard
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
            Hero Management
          </h1>

          <p
            className="
              text-gray-400
              max-w-3xl
            "
          >
            Manage cinematic
            homepage experiences,
            hero media, adaptive
            content, and immersive
            storefront storytelling.
          </p>

        </div>

        {/* Hero Scene List */}
        <div className="space-y-10">

          {heroScenes.map(
            (scene) => (

            <motion.div
              key={scene.id}
              whileHover={{
                y: -4,
              }}
              className="
                bg-white/5
                border
                border-white/10
                rounded-[36px]
                overflow-hidden
              "
            >

              {/* Preview */}
              <div
                className="
                  relative
                  h-[320px]
                  overflow-hidden
                "
              >

                {/* Image */}
                {scene.type ===
                  "image" && (

                  <img
                    src={scene.media}
                    alt={scene.title}
                    className="
                      w-full
                      h-full
                      object-cover
                    "
                  />

                )}

                {/* Video */}
                {scene.type ===
                  "video" && (

                  <video
                    src={scene.media}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="
                      w-full
                      h-full
                      object-cover
                    "
                  />

                )}

                {/* Overlay */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-black/40
                  "
                />

              </div>

              {/* CMS Controls */}
              <div className="p-8">

                <div
                  className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-6
                  "
                >

                  {/* Eyebrow */}
                  <InputField
                    label="Eyebrow"
                    value={
                      scene.eyebrow
                    }
                    onChange={(
                      value
                    ) =>
                      updateHeroScene(
                        scene.id,
                        {
                          eyebrow:
                            value,
                        }
                      )
                    }
                  />

                  {/* Type */}
                  <div>

                    <label
                      className="
                        text-sm
                        text-gray-400
                        mb-2
                        block
                      "
                    >
                      Media Type
                    </label>

                    <select
                      value={
                        scene.type
                      }
                      onChange={(
                        e
                      ) =>
                        updateHeroScene(
                          scene.id,
                          {
                            type:
                              e.target
                                .value,
                          }
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
                    >

                      <option value="image">
                        Image
                      </option>

                      <option value="video">
                        Video
                      </option>

                    </select>

                  </div>

                  {/* Title */}
                  <div className="md:col-span-2">

                    <InputField
                      label="Hero Title"
                      value={
                        scene.title
                      }
                      onChange={(
                        value
                      ) =>
                        updateHeroScene(
                          scene.id,
                          {
                            title:
                              value,
                          }
                        )
                      }
                    />

                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">

                    <label
                      className="
                        text-sm
                        text-gray-400
                        mb-2
                        block
                      "
                    >
                      Description
                    </label>

                    <textarea
                      value={
                        scene.description
                      }
                      onChange={(
                        e
                      ) =>
                        updateHeroScene(
                          scene.id,
                          {
                            description:
                              e.target
                                .value,
                          }
                        )
                      }
                      className="
                        w-full
                        h-32
                        bg-white/5
                        border
                        border-white/10
                        rounded-2xl
                        px-5
                        py-4
                        outline-none
                        resize-none
                      "
                    />

                  </div>

                  {/* Primary CTA */}
                  <InputField
                    label="Primary Button"
                    value={
                      scene.buttonPrimary
                    }
                    onChange={(
                      value
                    ) =>
                      updateHeroScene(
                        scene.id,
                        {
                          buttonPrimary:
                            value,
                        }
                      )
                    }
                  />

                  {/* Secondary CTA */}
                  <InputField
                    label="Secondary Button"
                    value={
                      scene.buttonSecondary
                    }
                    onChange={(
                      value
                    ) =>
                      updateHeroScene(
                        scene.id,
                        {
                          buttonSecondary:
                            value,
                        }
                      )
                    }
                  />

                  {/* Media URL */}
                  <div className="md:col-span-2">

                    <InputField
                      label="Media URL"
                      value={
                        scene.media
                      }
                      onChange={(
                        value
                      ) =>
                        updateHeroScene(
                          scene.id,
                          {
                            media:
                              value,
                          }
                        )
                      }
                    />

                  </div>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </motion.div>

    </div>
  );
}

/* -----------------------------
   Input Field
----------------------------- */

function InputField({
  label,
  value,
  onChange,
}) {

  return (
    <div>

      <label
        className="
          text-sm
          text-gray-400
          mb-2
          block
        "
      >
        {label}
      </label>

      <input
        value={value}
        onChange={(e) =>
          onChange(
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
  );
}

export default HeroManagement;