import { describe, expect, it } from "bun:test";
import { offer } from "./offer";

describe("Coach offer requirements", () => {
  it("requires 4–5 deals", () => {
    expect(offer.minimumDeals).toBe(4);
    expect(offer.maximumDeals).toBe(5);
  });
});