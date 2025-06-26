import { test, expect,request } from '@playwright/test';
let webContext;
test.beforeAll (async({browser})=> {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://7vals1.inventoryontrack.com/users/sign_in");
    await page.locator("#email").fill("staging-1@yopmail.com");
    await page.locator("#password").fill("7vals@123");
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

