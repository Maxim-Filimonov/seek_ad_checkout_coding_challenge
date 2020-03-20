import data from "./data/ads_config.json";
export interface AdConfig {
  products: {
    name: string;
    description?: string;
    price: number;
  }[];
}
function loadConfig(): AdConfig {
  return data;
}
export default loadConfig;
