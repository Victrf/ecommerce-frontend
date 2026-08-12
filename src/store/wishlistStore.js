import { create } from "zustand";

const getInitialWishlist = () => {
    const stored =
        localStorage.getItem(
            "wishlist"
        );

    return stored
        ? JSON.parse(stored)
        : [];
};

const useWishlistStore = create(
    (set, get) => ({
        wishlist:
            getInitialWishlist(),

        // add/remove toggle
        toggleWishlist: (product) => {
            const { wishlist } = get();

            const exists =
                wishlist.find(
                    (item) =>
                        item.id === product.id
                );

            let updated;

            // remove
            if (exists) {
                updated = wishlist.filter(
                    (item) =>
                        item.id !== product.id
                );

                // persist
                localStorage.setItem(
                    "wishlist",
                    JSON.stringify(updated)
                );

                set({
                    wishlist: updated,
                });

                return false;
            }

            // add
            updated = [
                product,
                ...wishlist,
            ];

            // persist
            localStorage.setItem(
                "wishlist",
                JSON.stringify(updated)
            );

            set({
                wishlist: updated,
            });

            return true;
        },

        // check saved
        isWishlisted: (id) => {
            return get().wishlist.some(
                (item) => item.id === id
            );
        },

        // clear wishlist
        clearWishlist: () => {
            localStorage.removeItem(
                "wishlist"
            );

            set({
                wishlist: [],
            });
        },
    })
);

export default useWishlistStore;