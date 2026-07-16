import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import TokenFlowBuyPage from "./page";
import { tokenFlowPlans, planAt } from "@/lib/tokenflow/plans";

// next/navigation's useRouter requires the App Router context; the vitest
// jsdom harness does not mount it, so stub with a stable shape.
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn(), forward: vi.fn(), refresh: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
}));

describe("TokenFlowBuyPage", () => {
  it("lists all three token plans as radio cards", () => {
    render(<TokenFlowBuyPage />);
    expect(screen.getByRole("heading", { name: "Buy tokens" })).toBeInTheDocument();
    for (const plan of tokenFlowPlans) {
      expect(screen.getByRole("radio", { name: new RegExp(plan.name, "i") })).toBeInTheDocument();
    }
  });

  it("defaults the chosen plan to the first one in the catalogue", () => {
    render(<TokenFlowBuyPage />);
    const first = screen.getByRole("radio", { name: new RegExp(planAt(0).name, "i") });
    expect(first).toBeChecked();
  });

  it("summarises the purchase total reactively via the Buy button label", () => {
    render(<TokenFlowBuyPage />);
    const buy = screen.getByRole("button", { name: /buy .+ for \$/i });
    // Currency string from plan.priceUSD; safe to match a non-zero digit.
    expect(buy.textContent ?? "").toMatch(/\$\d+/);
  });
});
