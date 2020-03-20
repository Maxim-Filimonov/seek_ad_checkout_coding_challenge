import Checkout from "./checkout";
describe("Checkout", () => {
  describe("adding products", () => {
    it("ignores invalid name", () => {
      let checkout = new Checkout({
        products: [{ name: "test", price: 1000 }]
      }).append("incorrect name");

      checkout.total();
    });
  });
  describe("total calculation", () => {
    it("totals to zero by default", () => {
      const checkout = new Checkout({
        products: [{ name: "test", price: 1000 }]
      });

      expect(checkout.total()).toEqual(0);
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
      let checkout = new Checkout(mockAdConfig);
      checkout = checkout.append("classic").append("standout");

      const total = checkout.total();
      expect(total).toEqual(100);
    });
  });
});
