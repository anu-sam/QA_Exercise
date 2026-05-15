/**
 * UI automation specs for the-internet.herokuapp.com.
 *
 * Each test follows light separation of concerns:
 * - Navigate via homePage (pages/HomePage.ts)
 * - Interact via feature page objects (pages/*.ts)
 * - Assert outcomes here using expect and values from config/env.ts
 *
 * Dialog handlers are registered in this file because message validation
 * is an assertion concern, not a page-object action.
 */
import { test, expect } from '../fixtures/test';
import { env, routes } from '../config/env';

test.describe('UI Automation Exercise', () => {
  test('Test_01: JS Alerts', async ({ page, homePage, alertsPage }) => {
    // Arrange — open JavaScript Alerts from home
    await homePage.goto();
    await homePage.openJavaScriptAlerts();

    // Assert — correct page loaded
    await expect(page).toHaveURL(routes.javascriptAlerts);
    await expect(alertsPage.heading).toBeVisible();
    await expect(alertsPage.heading).toContainText('JavaScript Alerts');

    // Act + assert — JS Alert dialog (accept)
    page.once('dialog', async (dialog) => {
      expect(dialog.message()).toEqual('I am a JS Alert');
      await dialog.accept();
    });
    await alertsPage.clickJsAlert();
    await expect(alertsPage.result).toHaveText('You successfully clicked an alert');

    // Act + assert — JS Confirm dialog (OK)
    page.once('dialog', async (dialog) => {
      expect(dialog.message()).toEqual('I am a JS Confirm');
      await dialog.accept();
    });
    await alertsPage.clickJsConfirm();
    await expect(alertsPage.result).toHaveText('You clicked: Ok');

    // Act + assert — JS Confirm dialog (Cancel)
    page.once('dialog', async (dialog) => {
      expect(dialog.message()).toEqual('I am a JS Confirm');
      await dialog.dismiss();
    });
    await alertsPage.clickJsConfirm();
    await expect(alertsPage.result).toHaveText('You clicked: Cancel');

    // Act + assert — JS Prompt dialog (accept with test data from config)
    page.once('dialog', async (dialog) => {
      expect(dialog.message()).toEqual('I am a JS prompt');
      await dialog.accept(env.testData.jsPromptName);
    });
    await alertsPage.clickJsPrompt();
    await expect(alertsPage.result).toHaveText(
      `You entered: ${env.testData.jsPromptName}`
    );
  });

  test('Test_02: A/B Testing', async ({ page, homePage, abtestPage }) => {
    await homePage.goto();
    await homePage.openABTesting();

    await expect(page).toHaveURL(routes.abtest);

    // Heading varies by A/B bucket; assert the variant that was served
    const headerText = await abtestPage.getHeadingText();
    await expect(abtestPage.heading).toBeVisible();
    if (headerText === 'A/B Test Control') {
      await expect(abtestPage.heading).toContainText('A/B Test Control');
    } else {
      await expect(abtestPage.heading).toContainText('A/B Test Variation 1');
    }

    await expect(abtestPage.paragraph).toBeVisible();
    await expect(abtestPage.paragraph).toHaveText(/Also known as split testing.*/);
  });

  test('Test_03: Add/Remove Elements', async ({ page, homePage, addremovePage }) => {
    await homePage.goto();
    await homePage.openAddRemoveElements();

    await expect(page).toHaveURL(routes.addRemoveElements);
    await expect(addremovePage.heading).toBeVisible();
    await expect(addremovePage.heading).toContainText('Add/Remove Elements');

    // Single add then delete
    await expect(addremovePage.addElementButton).toBeVisible();
    await addremovePage.clickAddElement();

    await expect(addremovePage.deleteButton).toBeVisible();
    await addremovePage.clickDelete();

    // Batch add three elements, then remove each via the first delete control
    await addremovePage.addElements(3);
    await addremovePage.deleteFirstElements(3);
  });

  test('Test_04: Checkboxes', async ({ page, homePage, checkboxPage }) => {
    await homePage.goto();
    await homePage.openCheckboxes();

    await expect(page).toHaveURL(routes.checkboxes);
    await expect(checkboxPage.heading).toBeVisible();
    await expect(checkboxPage.heading).toContainText('Checkboxes');
    await expect(checkboxPage.checkboxGroup).toBeVisible();

    // Assert default state, toggle via page object, assert new state
    expect(await checkboxPage.isFirstCheckboxChecked()).toBeFalsy();
    expect(await checkboxPage.isSecondCheckboxChecked()).toBeTruthy();

    await checkboxPage.toggleCheckboxes();

    expect(await checkboxPage.isFirstCheckboxChecked()).toBeTruthy();
    expect(await checkboxPage.isSecondCheckboxChecked()).toBeFalsy();
  });

  test('Test_05: Dropdown List', async ({ page, homePage, dropdownPage }) => {
    await homePage.goto();
    await homePage.openDropdown();

    await expect(page).toHaveURL(routes.dropdown);
    await expect(dropdownPage.heading).toBeVisible();
    await expect(dropdownPage.heading).toContainText('Dropdown List');
    await expect(dropdownPage.dropdown).toBeVisible();
    await expect(dropdownPage.dropdown).toContainText('Please select an option');

    await dropdownPage.selectOption(env.testData.dropdownOption);
    await expect(dropdownPage.dropdown).toContainText(env.testData.dropdownOption);
  });
});
