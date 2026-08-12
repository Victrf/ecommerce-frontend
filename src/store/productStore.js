import { create } from "zustand";

import { getProducts } from "@/features/product/services/productService";

import useWishlistStore from "@/store/wishlistStore";

import useCartStore from "@/features/cart/store/cartStore";

const useProductStore = create((set, get) => ({
    // all products
    products: [],

    // products shown after filtering
    filteredProducts: [],

    // loading state
    loading: false,

    // filters
    search: "",
    selectedCategory: "All",

    // sorting
    sortBy: "default",

    // fetch products
    fetchProducts: async () => {
        set({ loading: true });

        const data = await getProducts();

        set({
            products: data,
            filteredProducts: data,
            loading: false,
        });
    },

    // add product
    addProduct: (product) => {

        const {
            products,
            filteredProducts,
        } = get();

        const updatedProducts = [
            product,
            ...products,
        ];

        set({
            products: updatedProducts,
            filteredProducts:
                updatedProducts,
        });
    },

    // update search
    setSearch: (value) => {
        set({ search: value });

        get().applyFilters();
    },

    // update category
    setCategory: (category) => {
        set({ selectedCategory: category });

        get().applyFilters();
    },

    // update sorting
    setSortBy: (value) => {
        set({ sortBy: value });

        get().applyFilters();
    },

    // filtering + sorting engine
    applyFilters: () => {
        const {
            products,
            search,
            selectedCategory,
            sortBy,
        } = get();

        let filtered = [...products];

        // category filtering
        if (selectedCategory !== "All") {
            filtered = filtered.filter(
                (product) =>
                    product.category === selectedCategory
            );
        }

        // search filtering
        if (search.trim()) {
            filtered = filtered.filter((product) =>
                product.title
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );
        }

        // sorting
        if (sortBy === "price-low") {
            filtered.sort((a, b) => a.price - b.price);
        }

        if (sortBy === "price-high") {
            filtered.sort((a, b) => b.price - a.price);
        }

        if (sortBy === "name-asc") {
            filtered.sort((a, b) =>
                a.title.localeCompare(b.title)
            );
        }

        set({
            filteredProducts: filtered,
        });
    },

    // dynamic categories
    getCategories: () => {
        const { products } = get();

        return [
            "All",
            ...new Set(products.map((p) => p.category)),
        ];
    },

    // intelligent recommendations
    // intelligent recommendations
    getRecommendedProducts: () => {
        const { products } = get();

        const wishlist =
            useWishlistStore.getState().wishlist;

        const cart =
            useCartStore.getState().cart.items;

        // collect valid categories only
        const categories = [
            ...wishlist
                .map((p) => p.category)
                .filter(Boolean),

            ...cart
                .map((item) => item.category)
                .filter(Boolean),
        ];

        // fallback if no behavior yet
        if (categories.length === 0) {
            return products.slice(0, 8);
        }

        // category frequency map
        const counts = {};

        categories.forEach((category) => {
            counts[category] =
                (counts[category] || 0) + 1;
        });

        // favorite category
        const favoriteCategory =
            Object.keys(counts).reduce(
                (a, b) =>
                    counts[a] > counts[b]
                        ? a
                        : b
            );

        // matching products
        const recommended =
            products.filter(
                (product) =>
                    product.category ===
                    favoriteCategory
            );

        // safe fallback
        return recommended.length > 0
            ? recommended
            : products.slice(0, 8);
    },
}));

export default useProductStore;