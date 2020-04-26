export function changePrice(price) {
    console.log(price)
    return {
      type: "CHANGE_PRICE",
      price
    };
}