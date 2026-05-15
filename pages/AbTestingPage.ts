import { Locator, Page } from '@playwright/test';

/**
 * Page object for /abtest.
 * Heading text is non-deterministic (Control vs Variation 1); specs branch on getHeadingText().
 */
export default class AbTestingPage {
  constructor(public page: Page) {}

  get heading(): Locator {
    return this.page.locator('div#content>div>h3');
  }

  get paragraph(): Locator {
    return this.page.locator('div#content>div>p');
  }

  /** Returns the current A/B bucket title shown in the page heading. */
  async getHeadingText(): Promise<string | null> {
    return this.heading.textContent();
  }
}
