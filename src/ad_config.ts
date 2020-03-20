import data from "./data/ads_config.json";
export type Product = {
  name: string;
  description?: string;
  price: number;
};

export interface AdConfig {
  products: Product[];
}
function loadConfig(): AdConfig {
  return data;
}
export default loadConfig;
