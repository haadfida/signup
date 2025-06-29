# Playwright E2E Test – Project Standards & Best Practices

> This document codifies the conventions we follow in this repository.  It is meant to be read by new contributors **before** they open a PR.

---

## 1. Project Layout

```
signup/
├── playwright.config.mjs       # Project-wide test-runner settings
├── tests/                      # Spec files (1 feature = 1 file)
│   └── sign-up.spec.js
├── pom/                        # Page-Object Models (PascalCase)
│   └── SignUpPage.js
├── data/                       # JSON fixtures (seeded by utils/generateTestData.js)
├── utils/                      # Helper modules (pure functions ⇒ no side-effects)
└── docs/                       # Developer-facing docs (incl. THIS file)
```

*Source inspiration: [microsoft/playwright-test-example-ts](https://github.com/microsoft/playwright-test-example) ➜ `src/pages` / `tests` split.*

---

## 2. File-naming rules

| Kind          | Convention                     | Example                    |
|---------------|--------------------------------|----------------------------|
| Test spec     | `*.spec.js` (kebab-case)       | `company-setup.spec.js`    |
| POM class     | `PascalCase.js`                | `CompanySetupPage.js`      |
| Fixture JSON  | `lowerCamel.json`              | `signupTestData.json`      |
| Utility       | `lowerCamel.js`                | `generateTestData.js`      |

Rationale:  mirrors Playwright docs & keeps import paths predictable.

---

## 3. Page-Object Model (POM) guidelines

1. **Constructor receives `page`.**
2. **Public methods = user intents** (`completeProfile()`, *not* `clickContinueButton()`).
3. **No assertions** inside the POM (keeps it re-usable across tests).
4. **Locators are `private` (`#` prefix) when using ES2022 fields** (Node ≥16.9).
5. **Prefer `getByRole`/`getByLabel`** over css/xpath → resilient to UI churn.

Reference: [ToolsQA Playwright POM structure](https://github.com/toolsqa/PlaywrightDemo).

---

## 4. Test authoring patterns

### 4.1 Arrange – Act – Assert template
```js
import { test, expect } from '@playwright/test';
import { SignUpPage } from '../pom/SignUpPage.js';

test('user can sign-up successfully', async ({ page }) => {
  // Arrange
  const signup = new SignUpPage(page);
  await signup.navigate();

  // Act
  await signup.completeFirstStep(/* …data… */);
  await signup.completeSecondStep(/* …data… */);

  // Assert
  await expect(page).toHaveURL(/companies\/setup/);
});
```

### 4.2 Data-driven tests
Use [`test.describe.configure`](https://playwright.dev/docs/test-annotations#configure) to inject fixture rows instead of manual `for`-loops.

```js
const rows = JSON.parse(fs.readFileSync('data/signupTestData.json'));
rows.forEach(row => {
  test(`sign-up happy path – ${row.description}`, async () => {/* … */});
});
```

### 4.3 test.step for trace clarity
Break long flows into logical steps so HTML report is readable.

---

## 5. Network stubbing strategy

| When | Technique | Code snippet |
|------|-----------|-------------|
| 3rd-party analytics / ads | `page.route('**/*analytics*', r=>r.abort())` | removes noise from traces |
| reCAPTCHA **in CI only** | `route.fulfill({body: stubJS})` | see *stubs/recaptcha.js* |
| Back-end under dev | `test.use({ storageState })` | re-uses signed-in state |

*Reference: [playwright-examples/blob/main/network-mocking.spec.ts](https://github.com/microsoft/playwright/blob/main/examples/mock-network-request.spec.ts)*

---

## 6. Environment configuration

| Variable            | Purpose                                    | Default |
|---------------------|--------------------------------------------|---------|
| `BASE_URL`          | Deployed host (staging / prod)             | `https://ezo.io` |
| `CI`                | Set by GitHub Actions -> enables retries   | — |
| `SKIP_CAPTCHA`      | (future) backend flag for tests            | `false` |

Values live in `.env` (loaded via `dotenv` in `playwright.config.mjs`). Never commit production secrets.

---

## 7. Test stability checklist

1. `await locator.waitFor({state:'visible'})` before `fill()`.
2. Use `expect(locator).toBeHidden()` instead of manual timeouts.
3. **Disable animations** by injecting css in `globalSetup`:
   ```js
   page.addStyleTag({content:'*{transition:none!important;animation:none!important}'});
   ```
4. Run `chromium --disable-features=TranslateUI` in CI (Playwright default).

---

## 8. Documentation & annotations

* Every exported function/class **must** carry JSDoc.
* Commit messages follow *Conventional Commits* (`feat:`, `fix:`…).
* Pull-request description uses the template in `.github/PULL_REQUEST_TEMPLATE.md`.

---

## 9. Suggested next steps

1. Move current ad-hoc test data generator into `utils/faker.js` using `@faker-js/faker`.
2. Add ESLint + Prettier config (`npm run lint:fix` in CI).
3. Hook `playwright/codegen` for new spec scaffolding.

---

### Acknowledgements / Further reading

| Topic | Reference |
|-------|-----------|
| General Playwright patterns | [playwright-community/awesome-playwright](https://github.com/mxschmitt/awesome-playwright) |
| CI setup (GitHub Actions) | [microsoft/playwright/.github/workflows/tests.yml](https://github.com/microsoft/playwright/blob/main/.github/workflows/tests.yml) |
| Robust POM example | [microsoft/playwright-test-example-ts](https://github.com/microsoft/playwright-test-example) |
| Stubbing captcha in tests | [cypress-realworld-app](https://github.com/cypress-io/cypress-realworld-app/blob/develop/cypress/support/commands.ts#L235) |

---

> **TL;DR** – Keep specs thin, POMs rich, network noisy bits stubbed, and document everything. Happy testing! 🎭 