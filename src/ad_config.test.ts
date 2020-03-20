import loadConfig from "./ad_config";
describe("ads config", () => {
  it("loads 3 sample products", () => {
    expect(loadConfig().products).toHaveLength(3);
  });
});
