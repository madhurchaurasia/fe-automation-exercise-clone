# Playwright Automation Guide (Living Document)

Status: Active  
Last updated: 2026-03-04

This document is the single source of truth for automating this project with Playwright.
When app behavior changes, update this document first, then tests.

---

## 1) App Overview for Automation

Frontend:
- React app
- Default URL: http://localhost:5173

Backend:
- json-server
- Base URL: http://localhost:5000
- Data file: db/db.json

Current routes:
- /
- /products
- /login
- /cart
- /test-cases
- /api-testing
- /contact

Important state behavior:
- Signup/Login users are from API resource `authUsers`
- Cart is currently browser localStorage based (not API-based)

---

## 2) API Endpoints used by UI

Auth users:
- GET /authUsers
- POST /authUsers
- GET /authUsers/:id
- PUT /authUsers/:id
- PATCH /authUsers/:id
- DELETE /authUsers/:id

Cart items resource exists but UI does not yet use it:
- GET /cartItems
- POST /cartItems
- GET /cartItems/:id
- PUT /cartItems/:id
- PATCH /cartItems/:id
- DELETE /cartItems/:id

See full curl examples in api.md.

---

## 3) Recommended Test Scope

### Smoke
1. Home page loads and header links are visible
2. Products page loads and product cards are rendered
3. Login page loads and both forms are visible
4. Cart page opens and empty state is visible (fresh state)

### Auth Flow
1. Signup with unique email succeeds
2. Duplicate signup fails with validation message
3. Login with valid credentials succeeds
4. Login with invalid credentials shows error
5. Logout flow works with browser confirm dialog

### Product + Cart Flow
1. Add product to cart from home page
2. Add product to cart from products page
3. Cart badge increments
4. Quantity increase/decrease works
5. Remove item from cart works
6. Clear cart works

### Search & Filters
1. Search by product name
2. Category filter
3. Brand filter
4. Search + category + brand combined

---

## 4) Selector Strategy (Use this order)

Preferred:
1. `getByRole()`
2. `getByText()`
3. `getByPlaceholder()`
4. Stable class selectors only when needed

Examples:
- Login nav link: `page.getByRole('link', { name: /signup \/ login/i })`
- Login form email: `page.locator('.login-section input[placeholder="Email Address"]')`
- Signup form email: `page.locator('.signup-section input[placeholder="Email Address"]')`
- Signup submit: `page.locator('.signup-section button:has-text("Signup")')`
- Cart badge: `page.locator('.cart-badge')`
- Add to cart (first card): `page.locator('.product-card').first().locator('.add-to-cart-btn')`

Note:
Two email/password fields exist on login page (login + signup). Scope locators by section to avoid ambiguity.

---

## 5) Test Data Strategy

Use deterministic test users with timestamp suffix:
- Email format: `qa+<timestamp>@example.com`

Keep one stable seed user in db/db.json for quick login tests if needed.

Before each test (recommended):
- Clear localStorage cart state
- Optionally clean auth test users created by automation

---

## 6) State Reset Strategy

### Browser state reset
In `test.beforeEach`:
- `await page.goto('/')`
- `await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); })`

### API cleanup (optional but recommended)
- GET /authUsers?email=<test_email>
- DELETE each returned id

This keeps test runs idempotent.

---

## 7) Playwright Project Setup

Install:
- `npm i -D @playwright/test`
- `npx playwright install`

Suggested folders:
- tests/e2e/
- tests/fixtures/
- tests/utils/

Suggested files:
- playwright.config.js
- tests/e2e/auth.spec.js
- tests/e2e/cart.spec.js
- tests/e2e/products.spec.js

---

## 8) Suggested playwright.config.js values

- `baseURL`: http://localhost:5173
- `trace`: on-first-retry
- `screenshot`: only-on-failure
- `video`: retain-on-failure
- webServer (recommended):
  - command: `npm start`
  - url: http://localhost:5173
  - reuseExistingServer: true
  - timeout: 120000

---

## 9) High-Value Assertions

Auth:
- Success message appears after signup/login
- User name appears in header after auth
- Signup/Login link hidden after auth

Cart:
- Cart badge count reflects quantity changes
- Row total and cart total update correctly
- Empty cart message shown when cart has no items

Products:
- Search reduces visible product cards
- Filtered products match selected category/brand

---

## 10) Known Risks / Flaky Areas

1. Buttons and links have repeated text in some places
2. Login page has duplicate placeholders in two forms
3. Success messages disappear after navigation timeout
4. Confirm dialogs (logout/remove) must be handled explicitly

Mitigation:
- Use scoped locators
- Add dialog handlers in tests
- Avoid brittle nth-child selectors

---

## 11) Dialog Handling

For logout/remove flows, handle native confirm:
- `page.on('dialog', d => d.accept())`

Without this, tests can hang.

---

## 12) CI Execution Guide

Run all tests:
- `npx playwright test`

Run specific suite:
- `npx playwright test tests/e2e/auth.spec.js`

Debug mode:
- `npx playwright test --ui`

Headed mode:
- `npx playwright test --headed`

---

## 13) Change Management (Important)

When app changes, update this file in the same PR with:
1. Route changes
2. Endpoint changes
3. Selector changes
4. New flows and assertions
5. Data reset changes

Update checklist block:
- [ ] Routes reviewed
- [ ] Endpoints reviewed
- [ ] Selectors reviewed
- [ ] Test data strategy reviewed
- [ ] Flaky risks updated

---

## 14) First Automation Backlog

Priority P0:
1. auth.spec.js (signup/login/logout)
2. cart.spec.js (add/update/remove/clear)
3. products.spec.js (search/filter)

Priority P1:
1. navigation.spec.js
2. placeholder-pages.spec.js
3. visual-smoke.spec.js

---

If you want, next I can generate:
1) Playwright config, and  
2) P0 test files with working selectors from this document.
