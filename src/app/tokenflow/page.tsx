import Link from "next/link";
import type { Metadata } from "next";
import { publicPageMetadata } from "@/lib/seo";
import { tokenFlowPlans } from "@/lib/tokenflow/plans";

export const metadata: Metadata = {
  ...publicPageMetadata({
    title: "TokenFlow",
    description:
      "TokenFlow is an LLM token reseller MVP. Buy MiniMax M3 or Qwen 3.7 plans and route requests through the LiteLLM + llm-cluster-router fleet.",
    canonical: "/tokenflow",
  }),
};

export default function TokenFlowLandingPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-brand-500)]">
        Helixon — Production pilot
      </p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">TokenFlow</h1>
      <p className="mt-4 max-w-2xl text-lg text-gray-700">
        Buy LLM tokens and route them through our LLM router at{" "}
        <code className="rounded bg-surface-muted px-1.5 py-0.5 text-sm">llm-router.cylrl.dev</code>.
        No account required for the pilot demo.
      </p>

      <section aria-labelledby="plans-heading" className="mt-12">
        <h2 id="plans-heading" className="text-2xl font-semibold">
          Plans
        </h2>
        <ul className="mt-4 grid gap-4 md:grid-cols-3">
          {tokenFlowPlans.map((plan) => (
            <li
              key={plan.id}
              className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
              data-testid="plan-card"
            >
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="mt-2 text-sm text-gray-600">{plan.blurb}</p>
              <p className="mt-4 text-2xl font-bold">${plan.priceUSD}/mo</p>
              <p className="mt-1 text-xs text-gray-500">
                {plan.tokenAllowance.toLocaleString()} tokens / month
              </p>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-10 flex gap-4">
        <Link
          href="/tokenflow/buy"
          className="rounded-md bg-[var(--color-brand-500)] px-5 py-2.5 font-medium text-white hover:bg-[var(--color-brand-700)]"
        >
          Buy tokens
        </Link>
        <Link
          href="/tokenflow/dashboard"
          className="rounded-md border border-gray-300 px-5 py-2.5 font-medium hover:bg-gray-50"
        >
          View dashboard
        </Link>
      </div>

      <p className="mt-12 text-xs text-gray-500">
        Demo surface — no auth, no billing, no LLM charges. Pilot routes token usage through
        the LiteLLM + llm-cluster-router fleet and is auditable end-to-end.
      </p>
    </main>
  );
}
