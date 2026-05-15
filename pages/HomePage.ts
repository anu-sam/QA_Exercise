import { Page } from '@playwright/test';

/**
 * Page object for the application home page (the-internet.herokuapp.com).
 * Responsible for opening the site and navigating to each exercise via home links.
 */
export default class HomePage {
  constructor(public page: Page) {}

  /** Opens the home page using baseURL from playwright.config.ts. */
  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async openJavaScriptAlerts(): Promise<void> {
    await this.page.locator('text=JavaScript Alerts').click();
  }

  async openABTesting(): Promise<void> {
    await this.page.locator('text=A/B Testing').click();
  }

  async openAddRemoveElements(): Promise<void> {
    await this.page.locator('text=Add/Remove Elements').click();
  }

  async openCheckboxes(): Promise<void> {
    await this.page.locator('text=Checkboxes').click();
  }

  async openDropdown(): Promise<void> {
    await this.page.locator('text=Dropdown').click();
  }
}
