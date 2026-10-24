# apps

React + TypeScript (Vite) apps, managed as npm workspaces from the repo root (`apps/*`, `packages/*`).

## Tooling (enforced by CI)

| Tool | Config | Command (from repo root) |
|---|---|---|
| eslint | `eslint.config.js` (shared; ignores legacy `app/`, `backend/` and `services/`) | `npm run lint` |
| tsc | `tsconfig.base.json`, extended by each workspace | `npm run typecheck` |
| vitest | per workspace | `npm test` |

Setup: `npm ci` at the repo root (Node 20+). A workspace only needs `typecheck` / `test` scripts to be picked up; missing scripts are skipped.
