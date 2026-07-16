"use client";
/**
 * TokenFlow demo buy page.
 *
 * - No auth, no billing: just selects a plan and surfaces a "demo" success page.
 * - The production billing integration lives in apps/api and is wired in
 *   apps/web checkout flows (not the public TokenFlow demo).
 */
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { tokenFlowPlans, type TokenFlowPlanId, findPlan, planAt } from "@/lib/tokenflow/plans";

export default function TokenFlowBuyPage() {
  const router = useRouter();
  const [chosen, setChosen] = useState<TokenFlowPlanId>(planAt(0).id);
  const selected = findPlan(chosen);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-brand-500)]">
        TokenFlow
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Buy tokens</h1>
      <p className="mt-2 text-gray-600">
        Pick a plan to demo the purchase flow. Nothing is charged.
      </p>

      <form
        className="mt-8 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          router.push(`/tokenflow/buy/success?plan=${encodeURIComponent(selected.id)}`);
        }}
      >
        <fieldset className="grid gap-3">
          <legend className="sr-only">Token plans</legend>
          {tokenFlowPlans.map((plan) => (
            <label
              key={plan.id}
              className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 ${
                chosen === plan.id ? "border-[var(--color-brand-500)] bg-brand-50" : "border-gray-200 bg-white"
              }`}
            >
              <input
                type="radio"
                name="plan"
                value={plan.id}
                checked={chosen === plan.id}
                onChange={() => setChosen(plan.id)}
                className="mt-1 h-4 w-4 accent-[var(--color-brand-500)]"
              />
              <span className="flex-1">
                <span className="block text-base font-semibold">{plan.name}</span>
                <span className="block text-sm text-gray-600">{plan.blurb}</span>
                <span className="mt-2 block text-sm font-medium">
                  {plan.tokenAllowance.toLocaleString()} tokens / month
                </span>
              </span>
              <span className="text-lg font-bold">${plan.priceUSD}</span>
            </label>
          ))}
        </fieldset>

        <div className="mt-6 flex items-center justify-between">
          <Link href="/tokenflow" className="text-sm text-gray-500 hover:text-gray-700">
            ← Back
          </Link>
          <button
            type="submit"
            className="rounded-md bg-[var(--color-brand-500)] px-5 py-2.5 font-medium text-white hover:bg-[var(--color-brand-700)]"
          >
            {`Buy ${selected.name} for $${selected.priceUSD}`}
          </button>
        </div>
      </form>
    </main>
  );
}
