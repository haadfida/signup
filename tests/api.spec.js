import { test, expect,request } from '@playwright/test';
//request for api testing

test.beforeEach( async({browser,page}) =>
{
  const getCSRF= await request.newContext();
  const getResponse = await getCSRF.get('https://prodezo1.ezofficeinventory.com/users/sign_in');
  const html = await getResponse.text();
  const match = html.match(/<meta name="csrf-token" content="(.*?)"/);
  const csrfToken = match ? match[1] : null;
  console.log(csrfToken);
  const loginPayload = {
    "authenticity_token": "1VdBy0tOe2P1BZ+OG6EiTA+usar5zbjwe/ThF5HWOWuxAn817ZEGGu71W/BygbTtdvc5LVxOQRvH2VYG2d0u4A==",
    "user": {
      "email": "prod-1@yopmail.com",
      "password": "7vals@123",
      "remember_me": "1"
    },
    "commit": "Sign in"
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
