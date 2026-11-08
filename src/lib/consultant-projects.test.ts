import { describe, expect, it } from "vitest";
import { caseStudyLink, validateProjects } from "./consultant-projects";

describe("consultant case studies", () => {
  it("keeps existing title and result projects valid", () => {
    expect(validateProjects([{ title: "Inventory project", result: "Reduced missed stock orders." }])).toBeUndefined();
  });
  it("accepts a website or internal case study page", () => {
    expect(caseStudyLink("https://example.com/case-study")).toBe("https://example.com/case-study");
    expect(caseStudyLink("/blog/cold-storage-automation")).toBe("/blog/cold-storage-automation");
  });
  it("blocks unsafe case study links", () => {
    for (const url of ["javascript:alert(1)", "data:text/html,hello", "//example.com", "/\\example.com"]) {
      expect(caseStudyLink(url)).toBeUndefined();
    }
  });
  it("rejects an incomplete project instead of publishing it", () => {
    expect(validateProjects([{ title: "", result: "Saved time" }])).toBeDefined();
    expect(validateProjects([{ title: "Farm work", result: "" }])).toBeDefined();
  });
});