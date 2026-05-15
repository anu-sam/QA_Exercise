/**
 * Playwright fixture layer — wires page objects into each test.
 *
 * Import `test` and `expect` from this file (not from @playwright/test) so specs
 * receive ready-made page objects bound to the current browser page.
 *
 * Page objects expose locators and actions only; assertions belong in tests/.
 */
import { test as baseTest } from '@playwright/test';
import HomePage from '../pages/HomePage';
import JsAlertsPage from '../pages/JsAlertsPage';
import AbTestingPage from '../pages/AbTestingPage';
import AddRemoveElementsPage from '../pages/AddRemoveElementsPage';
import CheckboxesPage from '../pages/CheckboxesPage';
import DropdownListPage from '../pages/DropdownListPage';

/** Fixtures injected into every test that imports from this module. */
type PageFixtures = {
  homePage: HomePage;
  alertsPage: JsAlertsPage;
  abtestPage: AbTestingPage;
  addremovePage: AddRemoveElementsPage;
  checkboxPage: CheckboxesPage;
  dropdownPage: DropdownListPage;
};

const testWithPages = baseTest.extend<PageFixtures>({
  // Landing page: navigation to feature areas via home links.
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  // JavaScript Alerts feature page.
  alertsPage: async ({ page }, use) => {
    await use(new JsAlertsPage(page));
  },
  // A/B Testing feature page (heading text varies by bucket).
  abtestPage: async ({ page }, use) => {
    await use(new AbTestingPage(page));
  },
  // Dynamic add/remove elements feature page.
  addremovePage: async ({ page }, use) => {
    await use(new AddRemoveElementsPage(page));
  },
  // Checkbox toggle feature page.
  checkboxPage: async ({ page }, use) => {
    await use(new CheckboxesPage(page));
  },
  // Dropdown selection feature page.
  dropdownPage: async ({ page }, use) => {
    await use(new DropdownListPage(page));
  },
});

export const test = testWithPages;
export const expect = testWithPages.expect;
