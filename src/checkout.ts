import { AdConfig, Product } from "./ad_config";

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
  total = (): number => {
    return calculateTotal(this.products);
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
