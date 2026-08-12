import { create } from "zustand";

/* ---------- helpers ---------- */

const getInitialCart = () => {
    const stored = localStorage.getItem("cart");
    return stored
        ? JSON.parse(stored)
        : { items: [], totalQuantity: 0, totalPrice: 0 };
};

const calculateCart = (items) => {
    const totalQuantity = items.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const totalPrice = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return { items, totalQuantity, totalPrice };
};

const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

/* ---------- store ---------- */

const useCartStore = create((set, get) => ({
    cart: getInitialCart(),

    addToCart: (product) => {
        const { cart } = get();

        const existing = cart.items.find(
            (item) => item.productId === product.id
        );

        let updatedItems;

        if (existing) {
            updatedItems = cart.items.map((item) =>
                item.productId === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            updatedItems = [
                ...cart.items,
                {
                    productId: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    quantity: 1,
                },
            ];
        }

        const newCart = calculateCart(updatedItems);
        saveCart(newCart);
        set({ cart: newCart });
    },

    removeFromCart: (productId) => {
        const { cart } = get();

        const updatedItems = cart.items.filter(
            (item) => item.productId !== productId
        );

        const newCart = calculateCart(updatedItems);
        saveCart(newCart);
        set({ cart: newCart });
    },

    updateQuantity: (productId, quantity) => {
        const { cart } = get();

        let updatedItems;

        if (quantity < 1) {
            updatedItems = cart.items.filter(
                (item) => item.productId !== productId
            );
        } else {
            updatedItems = cart.items.map((item) =>
                item.productId === productId
                    ? { ...item, quantity }
                    : item
            );
        }

        const newCart = calculateCart(updatedItems);
        saveCart(newCart);
        set({ cart: newCart });
    },

    clearCart: () => {
        localStorage.removeItem("cart");
        set({
            cart: { items: [], totalQuantity: 0, totalPrice: 0 },
        });
    },
}));

export default useCartStore;