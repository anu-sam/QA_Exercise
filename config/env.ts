/**
 * Central configuration for the test suite.
 * Keeps environment URLs, route patterns, and shared test data out of specs and page objects.
 *
 * Override locally via .env (see .env.example) or in CI via repository variables / workflow env.
 */

const DEFAULT_BASE_URL = 'https://the-internet.herokuapp.com';

function readEnv(key: string): string | undefined {
  const value = process.env[key]?.trim();
  return value ? value : undefined;
}

/** Application URL and values reused across scenarios. */
export const env = {
  baseURL: readEnv('BASE_URL') ?? DEFAULT_BASE_URL,
  testData: {
    jsPromptName: readEnv('JS_PROMPT_NAME') ?? 'Anuradha Rathnayake',
    dropdownOption: readEnv('DROPDOWN_OPTION') ?? 'Option 2',
  },
};

/** URL path fragments used in assertions (paired with baseURL from playwright.config.ts). */
export const routes = {
  javascriptAlerts: /.*javascript_alerts/,
  abtest: /.*abtest/,
  addRemoveElements: /.*add_remove_elements/,
  checkboxes: /.*checkboxes/,
  dropdown: /.*dropdown/,
} as const;
