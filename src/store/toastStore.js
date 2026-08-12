import { create } from "zustand";

const useToastStore = create((set) => ({
    show: false,

    message: "",

    showToast: (message) => {
        set({
            show: true,
            message,
        });

        setTimeout(() => {
            set({
                show: false,
                message: "",
            });
        }, 2500);
    },
}));

export default useToastStore;