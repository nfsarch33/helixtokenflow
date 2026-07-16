/**
 * TokenFlow demo plan catalogue.
 *
 * Three plans matching the LiteLLM + llm-cluster-router taxonomy from
 * v18632-2 (harness_reliability rubric). Prices are demo placeholders;
 * the production billing integration lives in apps/api and is out of
 * scope for the v18633 pilot.
 */
export type TokenFlowPlanId = "minimax-m3" | "qwen-3-7-plus" | "qwen-3-7-max";

export interface TokenFlowPlan {
  id: TokenFlowPlanId;
  name: string;
  /** Per-month token allowance in tokens (1 token = 1 LLM token). */
  tokenAllowance: number;
  /** Per-month USD price, integer cents to avoid float drift. */
  priceUSD: number;
  /** One-line marketing description, plain English. */
  blurb: string;
}

export const tokenFlowPlans: readonly TokenFlowPlan[] = [
  {
    id: "minimax-m3",
    name: "MiniMax M3",
    tokenAllowance: 50_000,
    priceUSD: 9,
    blurb: "MiniMax M3 general-purpose chat, ideal for low-volume pilots.",
  },
  {
    id: "qwen-3-7-plus",
    name: "Qwen 3.7 Plus",
    tokenAllowance: 250_000,
    priceUSD: 29,
    blurb: "Qwen 3.7 Plus for code-and-doc workloads, balanced throughput.",
  },
  {
    id: "qwen-3-7-max",
    name: "Qwen 3.7 Max",
    tokenAllowance: 1_000_000,
    priceUSD: 99,
    blurb: "Qwen 3.7 Max for heavy agentic workloads and long-context tasks.",
  },
] as const;

const FIRST_PLAN: TokenFlowPlan = tokenFlowPlans[0] as TokenFlowPlan;

/** Lookup by id; returns the first plan as the safe default. */
export function findPlan(id: TokenFlowPlanId | null | undefined): TokenFlowPlan {
  return tokenFlowPlans.find((p) => p.id === id) ?? FIRST_PLAN;
}

/** Indexed access guarded against `noUncheckedIndexedAccess`. */
export function planAt(index: number): TokenFlowPlan {
  const plan = tokenFlowPlans[index];
  if (!plan) {
    throw new Error(`tokenFlowPlans: index ${index} out of bounds`);
  }
  return plan;
}
