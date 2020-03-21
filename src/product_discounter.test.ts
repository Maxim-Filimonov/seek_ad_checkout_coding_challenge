import { applyDiscount } from "./product_discounter";
import { DiscountType } from "./ad_config";

describe("applyDiscount", () => {
  it("applies discount only to matching product", () => {
    const result = applyDiscount(
      {
        discountType: DiscountType.nthDeal,
        discountValue: "1",
        productName: "should not apply"
      },
      [
        {
          name: "different name",
          price: 50
        }
      ]
    );

    expect(result[0].price).toEqual(50);
  });
});
