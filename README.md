# ParaBank E2E & API Automation Framework

A production-grade automation framework designed to validate both **UI workflows** and **REST APIs** of the ParaBank application using **Playwright + TypeScript**, with full **CI/CD integration**, **automated reporting**, and **self-maintained test data lifecycle**.

---

## 🔍 Overview

This project is not just a test suite — it is a **complete automation system** that simulates real-world usage, validates backend consistency, and continuously reports system health.

It was built to answer one question:

> *Is the system actually reliable from both user and backend perspectives?*

### 🌐 Application Under Test
- https://parabank.parasoft.com/parabank/

### 📘 API Documentation
- https://parabank.parasoft.com/parabank/api-docs/index.html

### 📊 Live Test Reports
- https://abdelrahman-aa.github.io/ParaBank-E2E-API-Automation/

---

## ⚡ Why This Project Exists

Typical automation projects:
- test isolated UI scenarios
- validate APIs independently
- ignore data consistency between layers

This framework does the opposite.

It connects:
- UI behavior
- API logic
- database validation
- test data lifecycle

into a **single coherent system**.

---

## 🧠 Key Capabilities

### 🎭 UI Automation (E2E)
- Full user journey coverage
- Positive (happy path) scenarios
- Negative (sad path) scenarios
- Real user behavior simulation
- Functional and UI validation

---

### 🔌 API Automation (REST)
- Full API coverage
- Status code validation
- Response time assertions
- Schema validation
- Data type verification
- Cross-endpoint data validation

---

### 🔗 Data Integrity Validation
- API ↔ Database consistency checks
- Data flow validation across scenarios
- End-to-end data tracking

---

### 🎲 Smart Test Data Management
- Dynamic random data generation during runtime
- JSON-based:
  - test data
  - extracted validation data
- Automatic cleanup:
  - generated test data
  - temporary files
  - environment reset before & after runs

---

### 📊 Reporting System
- Fully automated reporting using Playwright
- Includes:
  - passed / failed tests
  - execution details
  - browser coverage
  - test type (UI / API)
- Published automatically to GitHub Pages

---

### ⚙️ CI/CD Integration
Powered by **GitHub Actions**:

- Automated test execution
- Report generation
- Report publishing
- Automatic bug/issue creation
- Report links attached to issues
- Continuous feedback loop

---

## 🏗️ Architecture Philosophy

This framework is built around:

- **Single source of truth** for testing
- **Separation of concerns** (UI / API / Data / Utilities)
- **Stateless test execution**
- **Repeatability and environment isolation**
- **Automation as a system, not scripts**

---

## 🧰 Tech Stack

| Layer            | Technology            |
|------------------|----------------------|
| Language         | TypeScript           |
| UI Automation    | Playwright           |
| API Testing      | Playwright API       |
| Reporting        | Playwright Reporter  |
| CI/CD            | GitHub Actions       |
| Data Handling    | JSON                 |

---

## 📁 Project Structure

```text
ParaBank-E2E-API-Automation/
│
├── .github/
│   └── .....                         # CI/CD pipeline (GitHub Actions)
│
├── tests/
│   │
│   ├── Test_Runer/                   # Main orchestrator for test execution
│   │   └── .....
│   │
│   ├── UI_Testing/
│   │   ├── Pages/                    # Page Object Models (POM)
│   │   │   └── .....                 # Individual page classes
│   │   │
│   │   └── Test_Scenarios/           # E2E UI test scenarios
│   │       └── .....                 # Business flows (happy & sad paths)
│   │
│   ├── APIs_Testing/
│   │   ├── Services/                 # API service layer (request handling)
│   │   │   └── .....                 # API endpoints abstraction
│   │   │
│   │   └── Test_Services/            # API test layer (validation & assertions)
│   │       └── .....                 # Endpoint validations
│   │
│   ├── Data/                         # Test data & configuration layer
│   │   └── .....
│   │
│   ├── Fixtures/                     # Shared Playwright fixtures
│   │   └── .....
│   │
│   └── FinalizeTests/                # Environment cleanup & post-run logic
│       └── .....
│
├── playwright.config.ts              # Playwright configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Dependencies & scripts
├── package-lock.json
│
├── LICENSE
└── README.md

```
## ▶️ Execution Guide

### Install dependencies

```bash
npm install
```

### Run all tests

```bash
npx playwright test
```

### Run UI tests

```bash
npx playwright test @ui
```

### Run API tests

```bash
npx playwright test @api
```

### Open report

```bash
npx playwright show-report
```

---

## 📈 What Makes This Different

This is not:

* a demo project
* a simple test suite
* or a collection of scripts

This is:

* a **connected testing ecosystem**
* validating **system behavior, not just outputs**
* enforcing **consistency across layers**
* designed for **real CI/CD environments**

---

## 🔄 Evolution

This project is a redesigned and more advanced version of a previous framework built using:

* Selenium + Java + TestNG (UI)
* Postman (API)

### Previous Work

* README:
  https://github.com/Abdelrahman-AA/Automated-Testing-Framework/blob/main/README.md

* UI Report:
  https://github.com/Abdelrahman-AA/Automated-Testing-Framework/blob/main/reports/Parabank_Automated_Functional_Test_Report.md

* API Report:
  https://github.com/Abdelrahman-AA/Automated-Testing-Framework/blob/main/reports/Parabank_APIs_Test_Report.md

---

## ⚠️ Final Note

Most automation frameworks answer:

> “Does this feature work?”

This one tries to answer:

> “Can this system be trusted under real usage conditions?”

That difference is where actual engineering starts.

