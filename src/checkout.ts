import { AdConfig, Product, ProductDiscount, DiscountType } from "./ad_config";

class Checkout {
  adConfig: AdConfig;
  products: Product[];
  constructor(adConfig: AdConfig, products: Product[] = []) {
    this.adConfig = adConfig;
    this.products = products;
  }
  append = (productName: string) => {
    const matchedProduct = this.adConfig.products.find(
      x => x.name === productName
    );
    if (matchedProduct) {
      const newProducts = this.products.concat([matchedProduct]);
      return new Checkout(this.adConfig, newProducts);
    }
    return this;
  };
  applyNthDeal(discount: ProductDiscount, products: Product[]) {
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

  applyDiscount = (discount: ProductDiscount, products: Product[]) => {
    switch (discount.discountType) {
      case DiscountType.nthDeal:
        return this.applyNthDeal(discount, products);
      case DiscountType.priceDrop:
        return products;
      default:
        throw new Error(`Invalid discount type:${discount.discountType}`);
    }
  };
  total = (customerName: string = "default"): number => {
    const matchedRule =
      this.adConfig.rules &&
      this.adConfig.rules.find(x => x.customer === customerName);
    const discountedProducts = matchedRule?.productDiscounts.reduce(
      (acc, discount) => this.applyDiscount(discount, acc),
      this.products
    );
    return calculateTotal(discountedProducts ?? this.products);
  };
}
function isnTh(index: number, nth: number) {
  return (index + 1) % nth === 0;
}
function sum(numbers: number[]) {
  return numbers.reduce((acc, product) => {
    acc += product;
    return acc;
  }, 0);
}
function getPrice(product: Product) {
  return product.price;
}

export function calculateTotal(products: Product[]) {
  return sum(products.map(getPrice));
}
export default Checkout;
