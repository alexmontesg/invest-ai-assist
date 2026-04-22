# Invest AI Assist

Vite + React SPA. Entry point: `src/main.tsx` → `src/App.tsx`.

## Commands

| Command | Action |
| ------- | ------ |
| `yarn dev` | Start dev server (port not configured, default Vite) |
| `yarn build` | Typecheck (`tsc -b`) then build (`vite build`) |
| `yarn lint` | Run ESLint |
| `yarn preview` | Preview production build |

**No test script exists.**

## Development Notes

- Path alias `@/` maps to `src/`
- Proxy: `/findata/*` → `https://financialdata.net` (requires `.env` API key)
- Strict TypeScript; `noUnusedLocals` and `noUnusedParameters` enabled
- ESLint enforces single quotes + trailing commas

## Skills

Load before writing React code:
- `vercel-react-best-practices` — https://opencode.ai/skills/vercel-react-best-practices