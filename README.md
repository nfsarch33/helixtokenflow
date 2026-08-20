# helixtokenflow

Public no-auth TokenFlow demo surface for the Helixon production pilot.

Three Next.js 16 App Router pages adapted from the Helixon monorepo subtree
(`helixon-monorepo/apps/web/src/app/tokenflow/`, PR #4):

- `/tokenflow` — landing; plan catalogue + buy/dashboard CTAs.
- `/tokenflow/buy` — selects a plan (no auth, no billing — demo only).
- `/tokenflow/dashboard` — skeleton usage dashboard.

The demo routes token-usage requests through
[`litellm.cylrl.dev`](https://litellm.cylrl.dev) and the
[`llm-cluster-router`](https://github.com/nfsarch33/llm-cluster-router) fleet
when wired (see `NEXT_PUBLIC_TOKEN_PLAN_ROUTER_URL`).

## Stack

- **Next.js 16** App Router (React 19)
- **Vitest 3** + Testing Library for unit tests
- **Playwright** for E2E
- **TypeScript** strict + `noUncheckedIndexedAccess`
- **Tailwind 4** + PostCSS

## Quick start

```bash
bun install     # or npm install
bun run test    # vitest
bun run build   # next build
bun run dev     # next dev
```

## Demo env vars

| Variable | Default | Purpose |
|---|---|---|
| `NEXT_PUBLIC_TOKEN_PLAN_ROUTER_URL` | `https://litellm.cylrl.dev/v1` | OpenAI-compatible router endpoint |
| `NEXT_PUBLIC_DEMO_TENANT` | `pilot-001` | Demo tenant tag |

## Origin

Extracted from `helixon-monorepo` (Apache-2.0).

## License

Apache-2.0 (matching the parent monorepo).
