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

## Delegation Rules

- **Skills**: When user requests a skill (e.g. `/commit`, "use git-commit skill"), delegate to a subagent via task tool with the appropriate `subagent_type` — the subagent loads and uses the skill, the main agent never uses skills directly
- **Commit messages**: Use task tool with `subagent_type: commit-message-writer` — do not generate commit messages manually
- **Complex multi-step tasks**: Use task tool with `subagent_type: project-orchestrator`

## Skills

Load before writing React code:
- `vercel-react-best-practices` — https://opencode.ai/skills/vercel-react-best-practices

Load before writing tests:
- `react-testing-library` — React Testing Library with user-centric testing patterns (subagent_type: `react-test-writer`)

When user requests a skill, delegate to subagent — never load/use skills in main agent:
- `git-commit` — Conventional commit with message generation (subagent_type: `commit-message-writer`)
- `find-skills` — Discover and install agent skills (subagent loads this skill)
- `react-testing-library` — Write component tests with RTL queries, user-event, async utilities (subagent_type: `react-test-writer`)