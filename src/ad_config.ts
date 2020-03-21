import data from "./data/ads_config.json";
export type Product = {
  name: string;
  description?: string;
  price: number;
};
export enum DiscountType {
  nthDeal = "nthDeal",
  priceDrop = "priceDrop"
}
export type ProductDiscount = {
  productName: string;
  discountType: DiscountType;
  discountValue: string;
};
export type AdRule = {
  customer: string;
  productDiscounts: ProductDiscount[];
};

export interface AdConfig {
  products: Product[];
  rules?: AdRule[];
}
function parseDiscountType(candidateDiscountType: string): DiscountType {
  const availableTypes = Object.keys(DiscountType);
  if (availableTypes.indexOf(candidateDiscountType) >= 0) {
    return candidateDiscountType as DiscountType;
  } else {
    // Poor man json decoders
    throw new Error(`Unsupported discount type:${candidateDiscountType}`);
  }
}
function loadConfig(): AdConfig {
  return {
    ...data,
    rules: data.rules.map(x => ({
      ...x,
      productDiscounts: x.productDiscounts.map(y => ({
        ...y,
        discountType: parseDiscountType(y.discountType)
      }))
    }))
  };
}
export default loadConfig;
