export default function setPrices(price) {
  const sizes = ["small", "medium", "large"];
  return price.map((item, index) => {
    return {
      size: sizes[index],
      price: price[index],
    };
  });
}
