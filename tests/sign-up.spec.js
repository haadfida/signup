// @ts-nocheck

import { test, expect } from '@playwright/test';
import SignUpPage from '../pages/SignUpPage.js';
import CompanySetupPage from '../pages/CompanySetupPage.js';
import testData from '../data/signupTestData.json' assert { type: 'json' };
import fs from 'node:fs';

const recaptchaStub = fs.readFileSync(new URL('../stubs/recaptcha.js', import.meta.url));

for (const data of testData) {
  test(`sign-up: ${data.description}`, async ({ page }) => {
    const signup = new SignUpPage(page, 'ezofficeinventory');

    // Step 1: navigate and fill first form
    await signup.navigate();
    await signup.fillForm({
      firstname: data.input.firstname,
      lastname: data.input.lastname,
      email: data.input.email
    });

    // Step 2: fill second form
    await signup.navigateToSecondForm();
    await signup.fillSecondForm({
      countryCode: data.input.countryCode ?? '92',
      phoneNumber: data.input.phoneNumber,
      companyName: data.input.companyName,
      companySize: data.input.companySize,
      password: data.input.password,
    });

    // Stub all reCAPTCHA requests before submit.
    await page.route('**/recaptcha/**', route => {
      const url = route.request().url();
      if (url.endsWith('.js')) {
        return route.fulfill({status:200,contentType:'application/javascript',body:recaptchaStub});
      }
      if (url.includes('api/siteverify')) {
        return route.fulfill({status:200,contentType:'application/json',body:'{"success":true}'});
      }
      return route.fulfill({status:200,body:'{}'});
    });

    // Submit
    await signup.submitForm();

    // Wait until company-setup page visible
    await Promise.race([
      page.waitForURL(/\/companies\/setup/),
      page.getByLabel(/What industry are you in\?/i).first().waitFor({state:'attached'})
    ]);

    // Complete personalization
    const setup = new CompanySetupPage(page);
    await setup.complete();

    await expect(page).toHaveURL(/\/dashboard|\/items/);
  });
} 