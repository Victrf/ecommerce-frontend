import { create } from "zustand";

const useWishlistDrawerStore = create(
    (set) => ({
        isOpen: false,

        openDrawer: () =>
            set({
                isOpen: true,
            }),

        closeDrawer: () =>
            set({
                isOpen: false,
            }),

        toggleDrawer: () =>
            set((state) => ({
                isOpen: !state.isOpen,
            })),
    })
);

export default useWishlistDrawerStore;