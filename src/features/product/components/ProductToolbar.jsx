import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  Check,
} from "lucide-react";

import {
  Listbox,
  Transition,
} from "@headlessui/react";

import {
  Fragment,
} from "react";

import {
  motion,
} from "framer-motion";

import useProductStore
  from "@/store/productStore";

function ProductToolbar() {

  const search =
    useProductStore(
      (s) => s.search
    );

  const selectedCategory =
    useProductStore(
      (s) =>
        s.selectedCategory
    );

  const sortBy =
    useProductStore(
      (s) => s.sortBy
    );

  const products =
    useProductStore(
      (s) => s.products
    );

  const setSearch =
    useProductStore(
      (s) => s.setSearch
    );

  const setCategory =
    useProductStore(
      (s) => s.setCategory
    );

  const setSortBy =
    useProductStore(
      (s) => s.setSortBy
    );

  // dynamic categories
  const categories = [

    "All",

    ...new Set(
      products.map(
        (p) =>
          p.category
      )
    ),
  ];

  const sortOptions = [

    {
      label:
        "Sort By",

      value:
        "default",
    },

    {
      label:
        "Price: Low to High",

      value:
        "price-low",
    },

    {
      label:
        "Price: High to Low",

      value:
        "price-high",
    },

    {
      label:
        "Name: A-Z",

      value:
        "name-asc",
    },
  ];

  return (
    <div
      className="
        flex
        flex-col
        xl:flex-row
        gap-4
        mb-10
      "
    >

      {/* Search */}
      <div
        className="
          relative
          flex-1
        "
      >

        <Search
          className="
            absolute
            left-5
            top-1/2
            -translate-y-1/2
            w-5
            h-5
            text-gray-400
          "
        />

        <input
          type="text"

          placeholder="
            Search cinematic products...
          "

          value={search}

          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }

          className="
            w-full
            h-14
            rounded-[24px]
            bg-white
            border
            border-black/10
            pl-14
            pr-5
            text-black
            placeholder:text-gray-400
            outline-none
            focus:border-black
            transition
          "
        />

      </div>

      {/* Category Dropdown */}
      <Listbox
        value={
          selectedCategory
        }

        onChange={
          setCategory
        }
      >

        <div
          className="
            relative
            xl:w-64
          "
        >

          <Listbox.Button
            className="
              relative
              w-full
              h-14
              rounded-[24px]
              bg-white
              border
              border-black/10
              px-5
              text-left
              text-black
              outline-none
              transition
              hover:border-black
            "
          >

            <span>
              {selectedCategory}
            </span>

            <ChevronDown
              className="
                absolute
                right-5
                top-1/2
                -translate-y-1/2
                w-5
                h-5
                text-gray-400
              "
            />

          </Listbox.Button>

          <Transition
            as={Fragment}

            enter="
              transition
              duration-200
            "

            enterFrom="
              opacity-0
              translate-y-2
            "

            enterTo="
              opacity-100
              translate-y-0
            "

            leave="
              transition
              duration-150
            "

            leaveFrom="
              opacity-100
            "

            leaveTo="
              opacity-0
            "
          >

            <Listbox.Options
              className="
                absolute
                z-50
                mt-3
                w-full
                overflow-hidden
                rounded-[28px]
                border
                border-black/10
                bg-white/95
                backdrop-blur-2xl
                shadow-2xl
                p-2
              "
            >

              {categories.map(
                (
                  category
                ) => (

                  <Listbox.Option

                    key={category}

                    value={category}

                    className={({
                      active,
                    }) => `
                      relative
                      flex
                      items-center
                      justify-between
                      rounded-2xl
                      px-4
                      py-3
                      cursor-pointer
                      transition

                      ${
                        active
                          ? `
                            bg-black
                            text-white
                          `
                          : `
                            text-black
                          `
                      }
                    `}
                  >

                    {({
                      selected,
                    }) => (

                      <>

                        <span>
                          {category}
                        </span>

                        {selected && (

                          <Check
                            className="
                              w-4
                              h-4
                            "
                          />

                        )}

                      </>

                    )}

                  </Listbox.Option>

                )
              )}

            </Listbox.Options>

          </Transition>

        </div>

      </Listbox>

      {/* Sort Dropdown */}
      <Listbox
        value={sortBy}
        onChange={setSortBy}
      >

        <div
          className="
            relative
            xl:w-72
          "
        >

          <Listbox.Button
            className="
              relative
              w-full
              h-14
              rounded-[24px]
              bg-white
              border
              border-black/10
              pl-14
              pr-5
              text-left
              text-black
              outline-none
              transition
              hover:border-black
            "
          >

            <SlidersHorizontal
              className="
                absolute
                left-5
                top-1/2
                -translate-y-1/2
                w-5
                h-5
                text-gray-400
              "
            />

            <span>

              {
                sortOptions.find(
                  (
                    option
                  ) =>
                    option.value ===
                    sortBy
                )?.label
              }

            </span>

            <ChevronDown
              className="
                absolute
                right-5
                top-1/2
                -translate-y-1/2
                w-5
                h-5
                text-gray-400
              "
            />

          </Listbox.Button>

          <Transition
            as={Fragment}

            enter="
              transition
              duration-200
            "

            enterFrom="
              opacity-0
              translate-y-2
            "

            enterTo="
              opacity-100
              translate-y-0
            "

            leave="
              transition
              duration-150
            "

            leaveFrom="
              opacity-100
            "

            leaveTo="
              opacity-0
            "
          >

            <Listbox.Options
              className="
                absolute
                z-50
                mt-3
                w-full
                overflow-hidden
                rounded-[28px]
                border
                border-black/10
                bg-white/95
                backdrop-blur-2xl
                shadow-2xl
                p-2
              "
            >

              {sortOptions.map(
                (
                  option
                ) => (

                  <Listbox.Option

                    key={
                      option.value
                    }

                    value={
                      option.value
                    }

                    className={({
                      active,
                    }) => `
                      relative
                      flex
                      items-center
                      justify-between
                      rounded-2xl
                      px-4
                      py-3
                      cursor-pointer
                      transition

                      ${
                        active
                          ? `
                            bg-black
                            text-white
                          `
                          : `
                            text-black
                          `
                      }
                    `}
                  >

                    {({
                      selected,
                    }) => (

                      <>

                        <span>
                          {option.label}
                        </span>

                        {selected && (

                          <Check
                            className="
                              w-4
                              h-4
                            "
                          />

                        )}

                      </>

                    )}

                  </Listbox.Option>

                )
              )}

            </Listbox.Options>

          </Transition>

        </div>

      </Listbox>

    </div>
  );
}

export default ProductToolbar;