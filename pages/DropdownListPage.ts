import { Locator, Page } from '@playwright/test';

/**
 * Page object for /dropdown.
 * Exposes the select control; default and selected values are asserted in the spec.
 */
export default class DropdownListPage {
  constructor(public page: Page) {}

  get heading(): Locator {
    return this.page.locator('div#content>div>h3');
  }

  get dropdown(): Locator {
    return this.page.locator('#dropdown');
  }

  /** Selects an option by visible label. */
  async selectOption(label: string): Promise<void> {
    await this.dropdown.selectOption(label);
  }
}
