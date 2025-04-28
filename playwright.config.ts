// playwright.config.ts

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Directory for tests
  timeout: 30 * 1000, // Timeout for tests
  expect: {
    timeout: 5000 // Timeout for expectation checks
  },
  fullyParallel: true, // Run tests in parallel
  retries: 2, // Retry failed tests
  workers: 5,
  reporter: [
    ['allure-playwright']   
  ],
  use: {
    actionTimeout: 0, 
    headless: true,    // Run tests in headless mode
    screenshot: 'on', // Take screenshots only on failure
  },
  projects: [
    {
      name: 'Chrome',
      use: { ...devices['Desktop Chrome'] }},
     {
      name: 'Firefox',
      use: {...devices['Desktop Firefox']}
     },
     {
      name: 'MobileChrome',
      use: {...devices['iPhone 15 Pro']}
     } 
  ],
});
