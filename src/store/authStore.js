import { create } from "zustand";

const getInitialUser = () => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
};

const useAuthStore = create((set) => ({
    user: getInitialUser(),

    login: (email) => {
        const user = { id: Date.now(), email };
        localStorage.setItem("user", JSON.stringify(user));
        set({ user });
    },

    logout: () => {
        localStorage.removeItem("user");
        set({ user: null });
    },
}));

export default useAuthStore;