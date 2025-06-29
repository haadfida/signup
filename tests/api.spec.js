import { test, expect,request } from '@playwright/test';
import 'dotenv/config';

// Skip the entire file when credentials are not provided
test.skip(!process.env.LOGIN_EMAIL || !process.env.LOGIN_PASSWORD, 'Environment credentials missing');

//request for api testing

test.beforeEach( async({browser,page}) =>
{
  const getCSRF= await request.newContext();
  const getResponse = await getCSRF.get('https://prodezo1.ezofficeinventory.com/users/sign_in');
  const html = await getResponse.text();
  const match = html.match(/<meta name="csrf-token" content="(.*?)"/);
  const csrfToken = match ? match[1] : null;
  console.log(`📌 CSRF token: ${csrfToken}`);

  const LOGIN_EMAIL = process.env.LOGIN_EMAIL;
  const LOGIN_PASSWORD = process.env.LOGIN_PASSWORD;

  const loginPayload = {
    authenticity_token: csrfToken,
    user: {
      email: LOGIN_EMAIL,
      password: LOGIN_PASSWORD,
      remember_me: '1'
    },
    commit: 'Sign in'
  };
  
  const loginResponse= await getCSRF.post("https://prodezo1.ezofficeinventory.com/users/sign_in",
    {
        data:loginPayload
    }
 );
console.log(loginResponse);


});

test ('api testing', async ({browser,page})=> {
 


})
