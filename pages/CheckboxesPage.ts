import { Locator, Page } from '@playwright/test';

/**
 * Page object for /checkboxes.
 * Provides state queries and toggle actions for the two checkboxes on the page.
 */
export default class CheckboxesPage {
  private readonly firstCheckbox = 'input[type=checkbox]:nth-child(1)';
  private readonly secondCheckbox = 'input[type=checkbox]:nth-child(3)';

  constructor(public page: Page) {}

  get heading(): Locator {
    return this.page.locator('div#content>div>h3');
  }

  get checkboxGroup(): Locator {
    return this.page.locator('#checkboxes');
  }

  async isFirstCheckboxChecked(): Promise<boolean> {
    return this.page.isChecked(this.firstCheckbox);
  }

  async isSecondCheckboxChecked(): Promise<boolean> {
    return this.page.isChecked(this.secondCheckbox);
  }

  async checkFirstCheckbox(): Promise<void> {
    await this.page.check(this.firstCheckbox);
  }

  async uncheckSecondCheckbox(): Promise<void> {
    await this.page.uncheck(this.secondCheckbox);
  }

  /** Checks the first box and unchecks the second (default scenario for the exercise). */
  async toggleCheckboxes(): Promise<void> {
    await this.checkFirstCheckbox();
    await this.uncheckSecondCheckbox();
  }
}
