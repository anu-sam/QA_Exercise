UI Automation Exercise
========================

![Playwright](https://github.com/anu-sam/QA_Exercise/actions/workflows/playwright.yml/badge.svg)

## Background
This assignment has been completed as a part of the assessment for WEB test automation skills to construct an automation suite using `TypeScript` via VSCode on top of the `Playwright` framework and `Node.js` platform.

The framework has been built on below software versions:
- System: `Windows 10 Pro`, `64-bit Operating System, x64-based processor`
- NPM: `11.12.1`
- Node JS: `24.15.0`

The test suite targets [the-internet.herokuapp.com](https://the-internet.herokuapp.com) and uses a **light separation of concerns** layout: configuration, fixtures, page objects (actions and locators), and specs (scenarios and assertions) live in separate folders.


## Project structure

```
QA_Exercise-main/
├── .github/workflows/
│   └── playwright.yml      # CI: smoke on PR, full browsers on main, weekly schedule
├── config/
│   └── env.ts              # Base URL, route patterns, shared test data
├── fixtures/
│   └── test.ts             # Playwright test extension and page-object fixtures
├── pages/
│   ├── HomePage.ts         # Home page navigation
│   ├── JsAlertsPage.ts
│   ├── AbTestingPage.ts
│   ├── AddRemoveElementsPage.ts
│   ├── CheckboxesPage.ts
│   └── DropdownListPage.ts # Locators and user actions only (no assertions)
├── tests/
│   └── qa-ex.test.ts       # Test scenarios and assertions
├── .env.example            # Optional local environment overrides
└── playwright.config.ts    # Playwright runner settings (uses config/env.ts)
```

| Layer | Location | Responsibility |
|-------|----------|----------------|
| **Configuration** | `config/env.ts` | `baseURL`, URL route regexes, test data (e.g. prompt text, dropdown option) |
| **Fixtures** | `fixtures/test.ts` | Wires `homePage` and feature page objects into each test via Playwright `extend` |
| **Page objects** | `pages/*.ts` | Locators and UI actions (click, select, toggle) |
| **Specs** | `tests/qa-ex.test.ts` | Test flow, navigation via `HomePage`, and all `expect` assertions |
| **Runner** | `playwright.config.ts` | Browsers, reporters, `baseURL`, retries on CI |
| **CI** | `.github/workflows/playwright.yml` | Automated test runs on GitHub Actions |

Tests import `test` and `expect` from `fixtures/test.ts`, not directly from `@playwright/test`, so fixtures such as `homePage` and `alertsPage` are available in each test.


## Prerequisites
- Before running the project, please make sure your local machine is ready with below software `(64-bit)` requirements:
	1. Install the latest stable version of `VSCode`
	2. Install **Node.js**: `v22.x` or higher (LTS is recommended)
	3. Install **npm**: `v10.x` or higher
	4. **Playwright**: Installed via `npm install` (from the project root)

- Make sure required web browser preferences are configured (see below)
- Make sure to install **Playwright Test for VSCode** from the VSCode extensions marketplace
- Make sure the `engines` field in `package.json` is compatible with your Node.js and npm versions

After `npm install`, install browsers once:

```bash
npx playwright install
```


## Configuration

### Application URL and test data

Defaults live in `config/env.ts`. Override without editing code:

| Variable | Purpose | Default |
|----------|---------|---------|
| `BASE_URL` | Application under test | `https://the-internet.herokuapp.com` |
| `JS_PROMPT_NAME` | Text entered in JS Prompt test | `Anuradha Rathnayake` |
| `DROPDOWN_OPTION` | Dropdown option label | `Option 2` |

**Local:** copy `.env.example` to `.env` and adjust values (`.env` is gitignored).
**CI:** in GitHub, go to **Settings → Secrets and variables → Actions → Variables** and add `BASE_URL` (optional; default is used if unset).

`playwright.config.ts` reads `baseURL` from `config/env.ts`, so tests use `homePage.goto()` with a relative path (`/`).

### Browser preferences
- Go to the project root (from Windows Explorer or VSCode)
- Open `playwright.config.ts`
- In the `projects` array, include or exclude browser types (Chromium, Firefox, WebKit) as required


## Test execution

```bash
npm test                      # all configured browser projects
npm run test:ci               # Chromium only (same as CI smoke job)
npm run test:report           # open last HTML report
npm run typecheck             # TypeScript compile check
npm run lint                  # ESLint
```

Run a single browser project:

```bash
npx playwright test --project=chromium
```

Simulate CI locally (PowerShell):

```powershell
$env:CI = "true"
npm run test:ci
```


## Continuous integration (GitHub Actions)

Workflow files: `.github/workflows/quality.yml` (typecheck + lint), `.github/workflows/playwright.yml` (tests)

| Trigger | What runs |
|---------|-----------|
| **Pull request** to `main` or `master` | **Quality** (typecheck + lint) and **Smoke (Chromium)** |
| **Push** to `main` or `master` | **Quality** + **Full** — Chromium, Firefox, WebKit (parallel, no duplicate smoke) |
| Weekly (Mondays 06:00 UTC) | **Smoke (Chromium)** |
| **Actions → Playwright → Run workflow** | **Full** matrix (all three browsers) |

On failure, download **playwright-report-*** and **test-results-*** artifacts from the workflow run. JUnit output is written to `test-results/junit.xml` when `CI=true`.

### Enable CI on GitHub

1. Push this repository to GitHub.
2. Open **Actions** and confirm the **Playwright** workflow is allowed to run.
3. Optional: add repository variable `BASE_URL` if you need a non-default target URL.

### Branch protection (optional)

**Settings → Branches → Add rule** → require status check **Smoke (Chromium)** before merging.


## View test results
- From **VSCode**:
	1. After tests finish, run `npm run test:report` or `npx playwright show-report` in the terminal
- From **Windows Explorer**:
	1. Open the `playwright-report` folder under the project root
	2. Open `index.html` in a web browser


## Adding or changing tests

1. **New page or feature** — Add a page class under `pages/` with locators and action methods only (no `expect` calls).
2. **Fixture** — Register the page in `fixtures/test.ts` inside `extend({ ... })`.
3. **Spec** — In `tests/qa-ex.test.ts`, use `homePage` to navigate, call page actions, and keep assertions in the test file.
4. **Shared values** — Put URLs, routes, and test data in `config/env.ts` or environment variables.
