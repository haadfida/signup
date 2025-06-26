import { test, expect } from '@playwright/test'; // Always needed for writing tests and using built-in assertions.
//const{test} = require('@playwright/test'); // this stores playwright in test, so that now it knows where to fetch all playwright stuff from

test ('First Playwright Test', async ({browser,page})=> {

//const context= await browser.newContext();
//const page = await context.newPage();

//defining variables
const firstName= page.locator('#firstname');
const lastName= page.locator('#lastname');
const emailID= page.locator('#email');
const buttonSignUpNext = page.locator('#signup_first_step_next');



await page.goto("https://ezo.io/ezofficeinventory/sign_up/");
console.log(await page.title());
//const var1= await page.locator("h2:has-text('Making Data-Driven Decisions')").textContent();
//console.log(var1)
await firstName.fill('ammara');
await lastName.fill('liaqat');
await emailID.fill('ammara.liaqat1828@');
await buttonSignUpNext.click();
console.log(await page.locator('#email-error').textContent());
await expect(page.locator('#email-error')).toContainText('Please enter a valid email address');

//await page.getByLabel().click()
//.select only works when select tag is present 
//getbyplaceholder
//getbyRole("button", {name: 'submit'}).click()
//await expect page.getbytext("succes msg").isvisible()
//getting by link getbyrole("link", {name ='shop}).click
//page.locator('app-card').filter({hasText: 'Nokia})
//used when mutliple elements of the same css locator and then you filter by name
//page.getbyrole('lisitem).getbyrole(button) . find button only in parent listitem
//page.framelocator(" ") // to locate iframes if present on the page




//if multiple elements identified by one locator, pick them by .first().textContent(), to print all it will be locator.allTextContents()

//page.waitforLoadState('networkidle) , waits for all calls to get completed 


//await page.waitForTimeout(5000);


});