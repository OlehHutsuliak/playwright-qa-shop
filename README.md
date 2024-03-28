# Test Automation Solution for Swag Labs E-commerce Shop

Welcome to the Test Automation Solution (TAS) for Swag Labs, an e-commerce platform. This repository contains automated tests written in TypeScript using Playwright, designed to cover common functionalities of the Swag Labs website. Below is a guide to help you understand and use this test suite effectively.

## Table of Contents

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Running Tests](#running-tests)
4. [CI Integration](#ci-integration)
5. [Test Structure](#test-structure)
6. [Test Cases](#test-cases)

## Installation

To install all necessary packages, run:

```bash
npm install
```

## Configuration

To run the tests locally, you need to update the `.env` file with your credentials. Follow the link [Sauce Demo](https://www.saucedemo.com/) to obtain the required credentials.

Additionally, you can configure the browsers on which the tests will run by editing the `playwright.config.ts` file.

## Running Tests

You can execute the tests locally using the following command:

```bash
npm test
```

### Run Single Test

To run a single test, use the following command, replacing `<testName>` with the name of the specific test:

```bash
npm run test:specific "<testName>"
```

## CI Integration

The test suite is integrated with a Continuous Integration (CI) pipeline. You can download the test report from the CI pipeline by following these steps:

1. Open the CI pipeline for the desired workflow.
2. Click on the "Artifacts" (playwright-report) file.
3. Download the zip file provided.

The downloaded zip file contains an HTML report generated from the test run. You can extract and view this report to analyze the results of the automated tests.

## Test Suite Structure

The test suite is organized into the following test files:

- **login.spec.ts:** Contains tests related to user authentication, including successful login, denied access with invalid credentials, and logout.
- **productBrowsing.spec.ts:** Covers tests related to product browsing functionalities such as product sorting.
- **cartManaging.spec.ts:** Tests for managing the shopping cart, including adding and removing products.
- **checkout.spec.ts:** Tests related to the checkout process, including validation of personal data fields and order confirmation.
- **setup.spec.ts:** Contains tests related to user authentication setup.

Each test file addresses specific functionalities of the Swag Labs website.

## Test Cases

You can find the test cases defined in the [test-cases.md](test-cases.md) file. This document provides comprehensive coverage of test scenarios and expected outcomes for the functionalities tested in the Swag Labs website.
