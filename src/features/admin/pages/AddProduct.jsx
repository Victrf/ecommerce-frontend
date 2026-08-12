import { useState } from "react";

import { motion } from "framer-motion";

import {
  ArrowLeft,
  PackagePlus,
} from "lucide-react";

import { Link } from "react-router-dom";

import useProductStore
  from "@/store/productStore";

function AddProduct() {

  const addProduct =
    useProductStore(
      (state) =>
        state.addProduct
    );

  const [
    newProduct,
    setNewProduct,
  ] = useState({
    title: "",
    category: "",
    image: "",
    hoverVideo: "",
    description: "",
    price: "",
    stock: "",
    status: "active",
  });

  const handleCreateProduct =
    () => {

      const product = {
        ...newProduct,

        id: Date.now()
          .toString(),

        price: Number(
          newProduct.price
        ),

        stock: Number(
          newProduct.stock
        ),
      };

      addProduct(product);

      setNewProduct({
        title: "",
        category: "",
        image: "",
        hoverVideo: "",
        description: "",
        price: "",
        stock: "",
        status: "active",
      });

      alert(
        "Product created successfully"
      );
    };

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

        {/* Back */}
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
          max-w-5xl
          mx-auto
          bg-white/5
          border
          border-white/10
          rounded-[40px]
          p-8
        "
      >

        {/* Header */}
        <div className="mb-10">

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

            <PackagePlus
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
            Add Product
          </h1>

          <p
            className="
              text-gray-400
              max-w-2xl
            "
          >
            Create immersive
            cinematic inventory
            for the adaptive
            commerce platform.
          </p>

        </div>

        {/* Form */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
          "
        >

          {/* Title */}
          <InputField
            label="Product Title"
            value={newProduct.title}
            onChange={(value) =>
              setNewProduct({
                ...newProduct,
                title: value,
              })
            }
          />

          {/* Category */}
          <InputField
            label="Category"
            value={
              newProduct.category
            }
            onChange={(value) =>
              setNewProduct({
                ...newProduct,
                category: value,
              })
            }
          />

          {/* Price */}
          <InputField
            label="Price"
            type="number"
            value={newProduct.price}
            onChange={(value) =>
              setNewProduct({
                ...newProduct,
                price: value,
              })
            }
          />

          {/* Stock */}
          <InputField
            label="Stock"
            type="number"
            value={newProduct.stock}
            onChange={(value) =>
              setNewProduct({
                ...newProduct,
                stock: value,
              })
            }
          />

          {/* Status */}
          <div>

            <label
              className="
                text-sm
                text-gray-400
                mb-2
                block
              "
            >
              Inventory Status
            </label>

            <select
              value={
                newProduct.status
              }
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  status:
                    e.target.value,
                })
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

              <option value="active">
                Active
              </option>

              <option value="low-stock">
                Low Stock
              </option>

              <option value="out-of-stock">
                Out Of Stock
              </option>

            </select>

          </div>

          {/* Image */}
          <div className="md:col-span-2">

            <InputField
              label="Image URL"
              value={newProduct.image}
              onChange={(value) =>
                setNewProduct({
                  ...newProduct,
                  image: value,
                })
              }
            />

          </div>

          {/* Hover Video */}
          <div className="md:col-span-2">

            <InputField
              label="Hover Video URL"
              value={
                newProduct.hoverVideo
              }
              onChange={(value) =>
                setNewProduct({
                  ...newProduct,
                  hoverVideo:
                    value,
                })
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
                newProduct.description
              }
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  description:
                    e.target.value,
                })
              }
              className="
                w-full
                h-40
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

        </div>

        {/* Actions */}
        <div
          className="
            flex
            justify-end
            mt-10
          "
        >

          <button
            onClick={
              handleCreateProduct
            }
            className="
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
            Create Product
          </button>

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
  type = "text",
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
        type={type}
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

export default AddProduct;