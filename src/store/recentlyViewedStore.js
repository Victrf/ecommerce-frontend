import { create } from "zustand";

const getInitialRecentlyViewed = () => {
    const stored = localStorage.getItem(
        "recentlyViewed"
    );

    return stored
        ? JSON.parse(stored)
        : [];
};

const useRecentlyViewedStore = create(
    (set, get) => ({
        recentlyViewed:
            getInitialRecentlyViewed(),

        addRecentlyViewed: (product) => {
            const current =
                get().recentlyViewed;

            // remove duplicates
            const filtered =
                current.filter(
                    (item) =>
                        item.id !== product.id
                );

            // newest first
            const updated = [
                product,
                ...filtered,
            ].slice(0, 12);

            // persist
            localStorage.setItem(
                "recentlyViewed",
                JSON.stringify(updated)
            );

            set({
                recentlyViewed: updated,
            });
        },

        clearRecentlyViewed: () => {
            localStorage.removeItem(
                "recentlyViewed"
            );

            set({
                recentlyViewed: [],
            });
        },
    })
);

export default useRecentlyViewedStore;