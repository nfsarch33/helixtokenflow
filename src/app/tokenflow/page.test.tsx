import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import TokenFlowLandingPage from "./page";
import * as landingModule from "./page";

describe("TokenFlowLandingPage", () => {
  it("renders the TokenFlow product entry point and CTAs", () => {
    render(<TokenFlowLandingPage />);
    expect(screen.getByRole("heading", { name: "TokenFlow" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /buy tokens/i })).toHaveAttribute("href", "/tokenflow/buy");
    expect(screen.getByRole("link", { name: /view dashboard/i })).toHaveAttribute("href", "/tokenflow/dashboard");
  });

  it("exports explicit indexable landing metadata", () => {
    expect(landingModule.metadata).toEqual(
      expect.objectContaining({
        title: "TokenFlow",
        description: expect.stringContaining("LLM token reseller"),
        robots: { index: true, follow: true },
      }),
    );
    expect(landingModule.metadata?.alternates?.canonical).toBe("/tokenflow");
  });

  it("mentions at least three token plans so the demo surface is non-trivial", () => {
    render(<TokenFlowLandingPage />);
    // Use heading role so the parent <li> wrapper (whose accessible text
    // contains the plan name) does not also match.
    expect(screen.getByRole("heading", { name: /MiniMax M3/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Qwen 3.7 Plus/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Qwen 3.7 Max/ })).toBeInTheDocument();
  });
});