import { create } from "zustand";

const usePreviewStore = create((set) => ({
    isOpen: false,

    product: null,

    openPreview: (product) =>
        set({
            isOpen: true,
            product,
        }),

    closePreview: () =>
        set({
            isOpen: false,
            product: null,
        }),
}));

export default usePreviewStore;