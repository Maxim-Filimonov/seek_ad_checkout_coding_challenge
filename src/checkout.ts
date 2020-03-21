import { AdConfig, Product, ProductDiscount, DiscountType } from "./ad_config";
import { applyDiscount } from "./product_discounter";

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
  applyProductDiscounts(customerName: string) {
    const matchedRule =
      this.adConfig.rules &&
      this.adConfig.rules.find(x => x.customer === customerName);
    return matchedRule?.productDiscounts.reduce(
      (acc, discount) => applyDiscount(discount, acc),
      this.products
    );
  }
  total = (customerName: string = "default"): number => {
    const discountedProducts = this.applyProductDiscounts(customerName);
    return calculateTotal(discountedProducts ?? this.products);
  };
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
