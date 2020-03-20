import { AdConfig, Product } from "./ad_config";

class Checkout {
  adConfig: AdConfig;
  products: Product[];
  constructor(adConfig: AdConfig) {
    this.adConfig = adConfig;
    this.products = [];
  }
  add = (productName: string) => {
    const matchedProduct = this.adConfig.products.find(
      x => x.name === productName
    );
    this.products.push(matchedProduct);
  };
  total = (): number => {
    return this.products.reduce((acc, product) => {
      acc += product.price;
      return acc;
    }, 0);
  };
}
export default Checkout;
