import { AdConfig } from "./ad_config";

class Checkout {
  adConfig: AdConfig;
  constructor(adConfig: AdConfig) {
    this.adConfig = adConfig;
  }
  add(itemName: string) {}
  total(): number {
    return 100;
  }
}
export default Checkout;
