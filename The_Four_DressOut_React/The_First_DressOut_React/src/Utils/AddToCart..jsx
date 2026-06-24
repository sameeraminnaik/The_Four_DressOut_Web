
export const handleAddToCart = ({product}) => {
    // console.log(`Added ${product.name} to cart!`);
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id,
    );
    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };