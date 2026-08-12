import { create }
    from "zustand";

import { persist }
    from "zustand/middleware";

const useAuthStore = create(

    persist(

        (set) => ({

            user: null,

            // login
            login: (userData) => {

                set({
                    user: userData,
                });
            },

            // update profile image
            updateProfileImage:
                (image) => {

                    set((state) => ({

                        user: {
                            ...state.user,

                            profileImage:
                                image,
                        },

                    }));
                },

            // logout
            logout: () => {

                set({
                    user: null,
                });
            },

        }),

        {
            name:
                "cinematic-commerce-auth",
        }

    )

);

export default useAuthStore;