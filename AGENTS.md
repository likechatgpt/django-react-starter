# Repository Guidelines

## Project Structure & Module Organization
The backend lives in `backend/`, with Django apps such as `django_react_starter/`, `authentication/`, `user/`, and `health/`; each app keeps its tests inside a `tests/` package. The React + TypeScript frontend sits in `frontend/`, with source files in `src/` and collocated unit tests named `*.test.tsx`. Infrastructure files include `docker/` and `docker-compose.yml` for local stacks, `fly/` for deployment assets, and `docs/` for reference material.

## Build, Test, and Development Commands
Run `make start` to launch the full Docker stack, or `make start.lite` when you only need supporting services. Stop containers with `make stop`. Backend developers should rely on `make backend.quality`, `make backend.test`, and `make backend.test.coverage`; migrations run via `make backend.migrate`, and `make backend.shell` drops you into `python manage.py shell`. Frontend work flows through `make frontend.quality`, `make frontend.test`, and `make frontend.test.coverage`; `make frontend.i18n` refreshes locale files. Inside containers, use `yarn dev` or `python manage.py <cmd>` as needed.

## Coding Style & Naming Conventions
Python code follows Black-compatible spacing (4 spaces, double quotes, ruff-managed imports), with modules and functions in `snake_case` and classes in `PascalCase`. TypeScript favors double quotes and Biome formatting; components are `PascalCase`, hooks `useCamelCase`, and utilities `camelCase`. Avoid reformatting untouched files—run the quality targets instead.

## Testing Guidelines
Django tests run with the default test runner; aim for coverage ≥90% and keep factories close to each app. Name files `test_*.py` in `backend/<app>/tests/`. Frontend tests rely on Vitest and Testing Library; place `*.test.ts(x)` beside the component. Use the coverage make targets to verify thresholds before opening a PR.

## Commit & Pull Request Guidelines
Commits generally follow Conventional Commit prefixes (e.g., `feat: add account MFA`). Keep messages imperative and scoped to a single concern. Pull requests should link issues when relevant, summarize behavior changes, list manual or automated test evidence, and attach UI screenshots for frontend changes. Update `CHANGELOG.md` and `docs/` when user-facing behavior shifts.

## Security & Configuration Tips
Never commit secrets; configure `.env` files under `backend/`. Postgres, RabbitMQ, and Meilisearch run via Docker. The frontend Sentry DSN (`VITE_SENTRY_DSN`) is optional but recommended in production.

## Agent-Specific Instructions
Prefer make targets and containerized workflows, keep edits minimal, and avoid undoing local modifications you did not author. Consult `README.md` and `TODO.md` before large changes, and coordinate on architecture decisions via issues.
