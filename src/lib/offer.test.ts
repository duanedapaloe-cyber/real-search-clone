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

  it("sends Claim Now to the provider's tracking link", () => {
    assert.equal(offer.ctaUrl, "https://linkthem.net/aff_c?offer_id=3634&aff_id=115643");
  });
});
