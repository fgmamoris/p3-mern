export const caltulateTotal = (products, productsOrder) => {
  let element = 0;
  for (let index = 0; index < productsOrder.length; index++) {
    for (let j = 0; j < products.length; j++) {
      if (products[j]._id === productsOrder[index].product) {
        element = element + products[j].price * productsOrder[index].qtyOrder;
      }
    }
  }
  return element;
};
