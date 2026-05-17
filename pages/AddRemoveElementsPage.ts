import { Locator, Page } from '@playwright/test';

/**
 * Page object for /add_remove_elements.
 * Supports adding elements and deleting them individually or in batch.
 */
export default class AddRemoveElementsPage {
  constructor(public page: Page) {}

  get heading(): Locator {
    return this.page.locator('div#content>h3');
  }

  get addElementButton(): Locator {
    return this.page.locator('text=Add Element');
  }

  get deleteButton(): Locator {
    return this.page.locator('text=Delete');
  }

  /** All delete controls in the dynamically generated list. */
  get deleteButtons(): Locator {
    return this.page.locator('#elements button');
  }

  /** First delete control in the dynamically generated list. */
  get firstDeleteInList(): Locator {
    return this.page.locator('div#elements>button:nth-of-type(1)');
  }

  async clickAddElement(): Promise<void> {
    await this.addElementButton.click();
  }

  async clickDelete(): Promise<void> {
    await this.deleteButton.click();
  }

  /** Clicks "Add Element" the given number of times. */
  async addElements(count: number): Promise<void> {
    for (let i = 0; i < count; i++) {
      await this.clickAddElement();
    }
  }

  /** Removes elements by repeatedly clicking the first delete button in the list. */
  async deleteFirstElements(count: number): Promise<void> {
    for (let i = 0; i < count; i++) {
      await this.firstDeleteInList.click();
    }
  }
}
