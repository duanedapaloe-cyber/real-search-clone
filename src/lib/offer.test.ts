import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { offer } from "./offer";

describe("Coach offer requirements", () => {
  it("requires 4–5 deals", () => {
    assert.equal(offer.minimumDeals, 4);
    assert.equal(offer.maximumDeals, 5);
  });

  it("pays out a $750 gift card", () => {
    assert.match(offer.reward, /^\$750 Coach gift card$/);
  });

  it("sends every visitor (desktop and mobile) to the offer link", () => {
    assert.equal(offer.ctaUrl, "https://cch.report750.com");
  });
});
