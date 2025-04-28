# Saucedemo E-Commerce Website Testing

Automated testing project for [Saucedemo](https://www.saucedemo.com/) e-commerce website using Playwright with TypeScript.

## Overview

This project contains automated end-to-end tests for the Saucedemo e-commerce website, covering key functionalities like login, product listing, cart operations, and checkout process.

## Features Tested

- Login functionality with different user types
- Product listing and filtering
- Add/Remove items to cart
- Cart functionality
- Checkout process
- Visual testing
- Performance testing

## Tech Stack

- [Playwright](https://playwright.dev/) - Testing framework
- TypeScript - Programming language
- [Allure](http://allure.qatools.ru/) - Test reporting

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Saucedemo-Playwright-Testing.git
cd Saucedemo-Playwright-Testing
```

2. Install dependencies:
```bash
npm install
```

## Running Tests

Available test scripts:

```bash
# Run all tests
npm run test:all

# Run only visual tests
npm run test:visual

# Run only end-to-end tests
npm run test:e2e

# Run assessment tests in Chrome
npm run test:assessment

# Run tests with UI mode
npx playwright test --ui
```

Script definitions in package.json:
```json
{
  "scripts": {
    "test:visual": "npx playwright test --grep @visual",
    "test:e2e": "npx playwright test --grep @e2e",
    "test:assessment": "npx playwright test --grep @assessment --project=Chrome",
    "test:all": "npx playwright test"
  }
}
```

## Test Reports

Generate and open Allure report:
```bash
npm run allure:generate
npm run allure:open
```

## Project Structure

```
├── tests/                  # Test files
├── testData/               # Json files
├── pages/                  # Page Object Models
├── utils/                  # Utility functions and helpers
├── test-results/          # Test execution results
├── allure-results/        # Allure report files
├── playwright.config.ts   # Playwright configuration
└── package.json           # Project dependencies and scripts
```
