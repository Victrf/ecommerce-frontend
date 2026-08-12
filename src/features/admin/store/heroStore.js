import { create } from "zustand";

import heroScenes
    from "@/features/home/data/heroScenes";

const useHeroStore = create(
    (set) => ({

        heroScenes,

        // update hero scene
        updateHeroScene: (
            id,
            updatedFields
        ) => {

            set((state) => ({

                heroScenes:
                    state.heroScenes.map(
                        (scene) =>

                            scene.id === id
                                ? {
                                    ...scene,
                                    ...updatedFields,
                                }
                                : scene
                    ),

            }));
        },

    })
);

export default useHeroStore;