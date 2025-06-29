import { test, expect } from '@playwright/test';

test.skip('signup testcase 1 : (legacy test skipped - covered by signUp1.spec.js)',async({browser,page})=>
{
    
 await page.goto("https://ezo.io/assetsonar/");
// await page.getByRole("button", {name: 'submit'}).click();
await Promise.all([
    page.waitForURL("https://ezo.io/assetsonar/sign_up/"),
    await page.locator('.elementskit-btn').filter({hasText: 'Try It For Free'}).nth(0).click()

  ]);
  await page.waitForSelector('#firstname');

  // Step 4: Fill the firstname field
  await page.fill('#firstname', 'Ammara');
  await expect(page.locator('#firstname')).toHaveValue('Ammara');
  await page.fill('#lastname', 'Liaqat');
 // await expect(page.locator('lastname')).toHaveValue('Liaqat');
  const email = page.locator('[name="email"]')
  console.log("found")
  await email.fill("liaqat@yopmail.com")

  //await page.fill('#email', 'Liaqat@yopmail.com');
 // await expect(page.locator('#email')).toHaveValue('Liaqat');
  await page.pause();




}
)


