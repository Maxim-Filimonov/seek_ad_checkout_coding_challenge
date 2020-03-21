import { ProductDiscount, DiscountType, Product } from "./ad_config";

function applyNthDeal(discount: ProductDiscount, products: Product[]) {
  const discountEvery = parseInt(discount.discountValue);

  const discountedProducts = products.map((product, index) => {
    if (isDiscountable(discount, product) && isnTh(index, discountEvery)) {
      return { ...product, price: 0 };
    } else {
      return product;
    }
  });
  return discountedProducts;
}

function isDiscountable(discount: ProductDiscount, product: Product) {
  return product.name === discount.productName;
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
