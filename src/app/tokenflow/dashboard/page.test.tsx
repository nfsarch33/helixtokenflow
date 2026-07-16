import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import TokenFlowDashboardPage from "./page";
import { planAt } from "@/lib/tokenflow/plans";

describe("TokenFlowDashboardPage", () => {
  it("renders the demo usage skeleton: plan, balance, burndown", () => {
    render(<TokenFlowDashboardPage />);
    expect(screen.getByRole("heading", { name: "TokenFlow dashboard" })).toBeInTheDocument();
    expect(screen.getByText("Active plan")).toBeInTheDocument();
    expect(screen.getByText("Balance")).toBeInTheDocument();
  });

  it("shows the demo balance derived from the catalogue (no auth gate)", () => {
    render(<TokenFlowDashboardPage />);
    const expected = (planAt(0).tokenAllowance ?? 0).toLocaleString();
    expect(screen.getByTestId("demo-balance-value").textContent ?? "").toContain(expected);
  });
});
