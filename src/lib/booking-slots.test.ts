import { describe, expect, it } from "vitest";
import { availableConsultantIds, isSlotConflict } from "./booking-slots";

describe("consultant slot protection", () => {
  const slots = [{ consultant_id: "renata", booking_time: "10:00:00" }];
  it("blocks the same consultant's booked time", () => {
    expect(availableConsultantIds("10:00", ["renata"], slots)).toEqual([]);
  });
  it("keeps another consultant available at the same time", () => {
    expect(availableConsultantIds("10:00", ["renata", "dale"], slots)).toEqual(["dale"]);
  });
  it("keeps another time available for the same consultant", () => {
    expect(availableConsultantIds("11:00", ["renata"], slots)).toEqual(["renata"]);
  });
  it("blocks any-consultant booking when everyone is booked", () => {
    expect(availableConsultantIds("10:00", ["renata", "dale"], [
      ...slots, { consultant_id: "dale", booking_time: "10:00:00" },
    ])).toEqual([]);
  });
  it("recognizes a concurrent booking conflict", () => {
    expect(isSlotConflict({ code: "23505" })).toBe(true);
    expect(isSlotConflict({ code: "23514" })).toBe(false);
  });
});