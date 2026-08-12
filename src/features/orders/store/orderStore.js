import { create } from "zustand";

const useOrderStore = create(
    (set, get) => ({

        orders: [],
        selectedOrder: null,

        // create order
        createOrder: ({
            items,
            totalPrice,
            customer,
        }) => {

            const newOrder = {

                id:
                    `ORD-${Date.now()}`,

                items,

                totalPrice,

                customer,

                createdAt:
                    new Date()
                        .toISOString(),

                status:
                    "pending",
            };

            set((state) => ({

                orders: [
                    newOrder,
                    ...state.orders,
                ],

            }));
        },

        // update order status
        updateOrderStatus: (
            orderId,
            status
        ) => {

            set((state) => ({

                orders:
                    state.orders.map(
                        (order) =>

                            order.id ===
                                orderId
                                ? {
                                    ...order,
                                    status,
                                }
                                : order
                    ),

            }));
        },

        // select order
        selectOrder: (order) => {

            set({
                selectedOrder: order,
            });
        },

    })
);

export default useOrderStore;