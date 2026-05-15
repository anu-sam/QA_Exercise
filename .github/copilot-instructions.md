# Copilot instructions for this repository

Purpose
- Short guide for Copilot-powered sessions to run, navigate, and extend the Playwright test suite.

Build / install
- npm install
- npx playwright install (installs browser binaries)

Test commands
- Full test matrix: npm test
- CI / Chromium-only smoke: npm run test:ci
- Open last HTML report: npm run test:report or npx playwright show-report
- Run a single spec file: npx playwright test tests/qa-ex.test.ts
- Run a single browser project: npx playwright test --project=chromium
- Run a single test by title: npx playwright test -g "<test title substring>"
- Simulate CI (PowerShell): $env:CI = "true"; npm run test:ci

Linting / formatting
- No repository-wide linter or formatter is configured (no eslint/prettier scripts). If adding, update package.json and docs.

High-level architecture (big picture)
- Runner: playwright.config.ts configures testDir, projects (chromium, firefox, webkit), reporters, retries, and baseURL (from config/env.ts).
- Configuration layer: config/env.ts stores baseURL and test data. .env can override values; README.md explains copying .env.example -> .env.
- Fixtures: fixtures/test.ts extends Playwright's test and wires page-object fixtures (eg. homePage, alertsPage). Tests import test/expect from fixtures/test.ts, not directly from @playwright/test.
- Page objects: pages/*.ts contain locators and UI actions only (no assertions). Keep page classes focused on actions/state.
- Specs: tests/qa-ex.test.ts contains flow and expect assertions. Use fixture-provided pages and baseURL-relative navigation.

Key conventions (project-specific)
- Tests must import the project fixture (fixtures/test.ts). Do not import @playwright/test directly in specs.
- Page objects: only locators and action methods. Keep assertions in spec files.
- Register any new page objects in fixtures/test.ts via extend({ ... }).
- Use config/env.ts for shared values (BASE_URL, JS_PROMPT_NAME, DROPDOWN_OPTION). Prefer environment variables for CI overrides.
- CI behavior: when CI=true, playwright.config.ts sets retries=2, workers=1, and reporter includes github/html/junit; junit is written to test-results/junit.xml.
- Reports: Playwright HTML reports are saved to playwright-report; use npm run test:report or npx playwright show-report to view.

Repository notes for Copilot sessions
- Node engine target: node >=22 (see package.json). Suggest code/actions compatible with that runtime.
- No existing AI assistant config files (CLAUDE.md, AGENTS.md, .cursorrules, etc.) were found in the repo root.
- If adding new test files, follow existing structure: pages -> fixtures -> tests. Update config/env.ts and .env.example if new shared data is needed.

Where to look first
- README.md for project overview and commands
- package.json for scripts
- playwright.config.ts for runner behavior and CI specifics
- fixtures/test.ts and pages/ for how fixtures and page objects are provided to tests

Questions for maintainers (ask before making large changes)
- Should a linter/formatter be added (ESLint / Prettier)?
- Are there preferred browser subsets for local development (chromium-only recommended for fast iteration)?

---

Would you like me to configure an MCP server for Playwright (e.g., to run browser-based checks against the suite)? If yes, indicate preferred project(s) (chromium recommended for smoke runs).