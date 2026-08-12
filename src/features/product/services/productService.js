import products from "../../../data/mockProducts.json";

export const getProducts = async () => {
    return products;
};

export const getProductById = async (id) => {
    return products.find((p) => p.id === id);
};