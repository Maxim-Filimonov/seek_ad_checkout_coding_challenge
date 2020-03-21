import { ProductDiscount, DiscountType, Product } from "./ad_config";

function applyNthDeal(discount: ProductDiscount, products: Product[]) {
  const discountEvery = parseInt(discount.discountValue);

  const discountedProducts = products.map((x, index) => {
    if (isnTh(index, discountEvery)) {
      return { ...x, price: 0 };
    } else {
      return x;
    }
  });
  return discountedProducts;
}

export function applyDiscount(discount: ProductDiscount, products: Product[]) {
  switch (discount.discountType) {
    case DiscountType.nthDeal:
      return applyNthDeal(discount, products);
    case DiscountType.priceDrop:
      return products;
    default:
      throw new Error(`Invalid discount type:${discount.discountType}`);
  }
}

function isnTh(index: number, nth: number) {
  return (index + 1) % nth === 0;
}
