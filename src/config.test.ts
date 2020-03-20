import config from "./config";
describe("ads config", () => {
  it("loads 3 sample products", () => {
    expect(config.products).toHaveLength(3);
  });
});
