export const getStockMessage = (stock) => {
    if (stock > 5) return "In Stock";
    if (stock>=2) return "Only a few items left";
    if (stock === 1) return "Only 1 left"
    return "Unavailable";
};