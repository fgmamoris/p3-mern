export const productsInvoice = (products, productsOrder) => {
  let element = [];
  for (let index = 0; index < productsOrder.length; index++) {
    for (let j = 0; j < products.length; j++) {
      if (products[j]._id === productsOrder[index].product) {
        element.push({
          code: products[j].code,
          name: products[j].name,
          tradeMark: products[j].tradeMark,
          qty: productsOrder[index].qtyOrder,
          price: products[j].price,
          amountProduct: productsOrder[index].qtyOrder * products[j].price,
        });
      }
    }
  }
  return element;
};
