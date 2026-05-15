import { Locator, Page } from '@playwright/test';

/**
 * Page object for /javascript_alerts.
 * Exposes locators and click actions; dialog handling and assertions live in the spec.
 */
export default class JsAlertsPage {
  constructor(public page: Page) {}

  get heading(): Locator {
    return this.page.locator('div#content>div>h3');
  }

  get jsAlertButton(): Locator {
    return this.page.locator('text=Click for JS Alert');
  }

  get jsConfirmButton(): Locator {
    return this.page.locator('text=Click for JS Confirm');
  }

  get jsPromptButton(): Locator {
    return this.page.locator('text=Click for JS Prompt');
  }

  /** Banner that displays the outcome after a dialog interaction. */
  get result(): Locator {
    return this.page.locator('#result');
  }

  async clickJsAlert(): Promise<void> {
    await this.jsAlertButton.click();
  }

  async clickJsConfirm(): Promise<void> {
    await this.jsConfirmButton.click();
  }

  async clickJsPrompt(): Promise<void> {
    await this.jsPromptButton.click();
  }
}
