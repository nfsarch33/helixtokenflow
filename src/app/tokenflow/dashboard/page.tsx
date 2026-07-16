import type { Metadata } from "next";
import { publicPageMetadata } from "@/lib/seo";
import { planAt } from "@/lib/tokenflow/plans";

export const metadata: Metadata = {
  ...publicPageMetadata({
    title: "TokenFlow — Dashboard",
    description: "Demo TokenFlow usage dashboard skeleton (no auth, no live billing).",
    canonical: "/tokenflow/dashboard",
  }),
};

// The dashboard is the public demo skeleton. The real billing-driven
// dashboard lives behind /account and pulls from the Go backend in
// apps/api; that path is gated by auth and out of scope here.
export default function TokenFlowDashboardPage() {
  const activePlan = planAt(1); // demo: Qwen 3.7 Plus
  const demoBalance = planAt(0).tokenAllowance;

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-brand-500)]">
        TokenFlow
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">TokenFlow dashboard</h1>
      <p className="mt-2 text-gray-600">
        Skeleton surface for the pilot demo. Live data wires to the Go backend once auth
        and billing land in apps/api.
      </p>

      <dl className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <dt className="text-sm text-gray-500">Active plan</dt>
          <dd className="mt-1 text-xl font-semibold">{activePlan.name}</dd>
          <p className="mt-1 text-xs text-gray-500">
            ${activePlan.priceUSD}/mo · {activePlan.tokenAllowance.toLocaleString()} tokens
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <dt className="text-sm text-gray-500">Balance</dt>
          <dd className="mt-1 text-xl font-semibold" data-testid="demo-balance-value">
            {demoBalance.toLocaleString()} <span className="text-sm font-normal text-gray-500">tokens</span>
          </dd>
          <p className="mt-1 text-xs text-gray-500">demo starting balance — refresh to reset</p>
        </div>
      </dl>

      <section className="mt-8 rounded-lg border border-dashed border-gray-300 p-6">
        <h2 className="text-base font-semibold">Burndown (placeholder)</h2>
        <p className="mt-1 text-sm text-gray-500">
          Wires to the LiteLLM + llm-cluster-router usage feed once the pilot is live.
        </p>
      </section>
    </main>
  );
}
