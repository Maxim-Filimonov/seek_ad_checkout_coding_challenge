import Checkout from "./checkout";
describe("Checkout", () => {
  it("totals to zero by default", () => {
    const co = new Checkout({ products: [{ name: "test", price: 1000 }] });

    expect(co.total()).toEqual(0);
  });
  it("calculates total based on ads prices", () => {
    const mockAdConfig = {
      products: [
        {
          name: "classic",
          price: 49.99
        },
        {
          name: "standout",
          price: 50.01
        }
      ]
    };
    const co = new Checkout(mockAdConfig);
    mockAdConfig.products.map(x => x.name).forEach(co.add);

    const total = co.total();
    expect(total).toEqual(100);
  });
});
