import { test, expect } from '@playwright/test';
import { SignUpPage } from '../POM/SignUpPage.js';
import testData from '../data/signupTestData.json' assert { type: 'json' };

for (const data of testData) {
  test(`Sign-up test: ${data.description}`, async ({ page }) => {
    const signup = new SignUpPage(page);

    await signup.navigate();
    await signup.fillForm({
      firstname: data.input.firstname,
      lastname: data.input.lastname,
      email: data.input.email
    });

    await signup.navigateToSecondForm();
    await signup.fillSecondForm({
      phoneNumber: data.input.phoneNumber,
      companyName: data.input.companyName,
      companySize: data.input.companySize,
      password: data.input.password
    });
    await page.pause();

    await signup.submitForm();

  });
}
