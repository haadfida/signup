import { test, expect,request } from '@playwright/test';
import 'dotenv/config';
let webContext;

// Skip entire file if env credentials missing
test.skip(!process.env.LOGIN_EMAIL || !process.env.LOGIN_PASSWORD, 'Environment credentials missing');

test.beforeAll (async({browser})=> {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://7vals1.inventoryontrack.com/users/sign_in");

    const LOGIN_EMAIL = process.env.LOGIN_EMAIL;
    const LOGIN_PASSWORD = process.env.LOGIN_PASSWORD;

    if(!LOGIN_EMAIL || !LOGIN_PASSWORD){
      throw new Error('LOGIN_EMAIL and LOGIN_PASSWORD must be set in environment variables');
    }

    await page.locator("#email").fill(LOGIN_EMAIL);
    await page.locator("#password").fill(LOGIN_PASSWORD);
    await page.locator("button:has-text('Sign in')").click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path: 'state.json'});
    webContext = await browser.newContext({storageState:'state.json'});


  //  await page.getByRole('button', { name: 'Sign in' }).click();

}
)

test ('api testing', async ()=> {
const page = await webContext.newPage();
await page.goto("https://7vals1.inventoryontrack.com/assets");


});

