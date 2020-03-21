import sample_scenarios from "./data/sample_scenarios.json";
import loadConfig from "./ad_config";
import Checkout from "./checkout";

console.log("Running scenarios ");
const config = loadConfig();
sample_scenarios.forEach(scenario => {
  let checkout = new Checkout(config);
  const total = scenario.items
    .reduce((acc, item) => acc.append(item), checkout)
    .total(scenario.customer);

  console.log("==========");
  console.log("Sample scenario:", scenario);
  console.log("Total calculated:", total);
  console.log("==========");
});
