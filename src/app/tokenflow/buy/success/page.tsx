import Link from "next/link";
import type { Metadata } from "next";
import { publicPageMetadata } from "@/lib/seo";
import { findPlan, type TokenFlowPlanId } from "@/lib/tokenflow/plans";

export const metadata: Metadata = {
  ...publicPageMetadata({
    title: "TokenFlow — Purchase confirmed",
    description: "Demo purchase confirmation surface for the TokenFlow MVP pilot.",
    canonical: "/tokenflow/buy/success",
  }),
};

interface PageProps {
  searchParams: { plan?: string };
}

export default function TokenFlowBuySuccessPage({ searchParams }: PageProps) {
  const plan = findPlan(searchParams?.plan as TokenFlowPlanId | undefined);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-brand-500)]">
        TokenFlow
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Purchase confirmed</h1>
      <p className="mt-2 text-gray-600">
        This is a demo confirmation. Nothing is charged. Your selected plan was{" "}
        <strong>{plan.name}</strong> (${plan.priceUSD}/mo · {plan.tokenAllowance.toLocaleString()} tokens).
      </p>

      <div className="mt-8 flex gap-4">
        <Link
          href="/tokenflow/dashboard"
          className="rounded-md bg-[var(--color-brand-500)] px-5 py-2.5 font-medium text-white hover:bg-[var(--color-brand-700)]"
        >
          View dashboard
        </Link>
        <Link
          href="/tokenflow"
          className="rounded-md border border-gray-300 px-5 py-2.5 font-medium hover:bg-gray-50"
        >
          Back to landing
        </Link>
      </div>
    </main>
  );
}
