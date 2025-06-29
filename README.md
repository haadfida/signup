# Playwright Automation – EZO Signup

![CI](https://img.shields.io/github/actions/workflow/status/your-org/your-repo/ci.yml?branch=main&label=CI)

End-to-end tests that automate the public sign-up flow for **EZO AssetSonar / EZOfficeInventory** and the follow-up personalization form.

---

## Project layout

```
signup/
├── pages/            # Page-Object Models (POMs)
│   ├── SignUpPage.js
│   └── CompanySetupPage.js
├── tests/            # Playwright specs (kebab-case)
│   └── sign-up.spec.js
├── utils/            # Helper modules (pure functions)
│   ├── fakerHelper.js
│   └── generateTestData.js
├── stubs/            # Network fixtures (recaptcha.js)
├── docs/             # Developer docs & diagrams
├── data/             # Generated JSON fixtures (overwritten per run)
├── playwright.config.mjs
└── eslint.config.cjs
```

## Quick start

```bash
npm ci                # install deps (node 20 recommended)
npm run lint:fix       # format & lint
npm test               # generate data + run headless tests
npm run test:headed    # debug in browser
```

Tests are driven by the JSON in `data/signupTestData.json`.  The file is regenerated on every run by `utils/generateTestData.js` which relies on [`@faker-js/faker`](https://github.com/faker-js/faker).  Set `ROW_COUNT=5 npm test` to create multiple rows.

## CI

GitHub Actions workflow **CI** runs on every push / PR to `main`:
1. `npm ci`
2. `npm run lint`
3. `npm test` (Chromium, headless)

File: `.github/workflows/ci.yml`

## Captcha & analytics stubbing

reCAPTCHA and third-party trackers are blocked in two layers:

1. **Network stub** in the test – any `**/recaptcha/**` request is fulfilled with `stubs/recaptcha.js` or `{ success:true }` JSON.
2. **Runtime stub** – POM injects a fake `window.grecaptcha` so client-side JS proceeds.

No calls leave the test runner → reliable & fast.

## Coding standards

* ESLint 9 config in `eslint.config.cjs` (Playwright plugin included).
* POM classes export **default** (import without braces).
* Test spec uses `test.step()` for trace readability.
* Directory names are lowercase; class files are `PascalCase.js`.

See `docs/PLAYWRIGHT_BEST_PRACTICES.md` for full guidelines.

## Contributing workflow

1. Create a feature branch.
2. Run `npm run lint` & `npm test` – ensure green.
3. Open a Pull Request – CI must pass.
4. Follow the PR template & fill the checklist.

---