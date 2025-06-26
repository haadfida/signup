import fs from 'fs';
import path from 'path';
import { faker } from '@faker-js/faker';

function generateUniqueSignupData() {
  const randomNum = Math.floor(Math.random() * 100000);
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${randomNum}@yopmail.com`;
  const LocalphoneNumber = Math.floor(10000000 + Math.random() * 90000000);
  const phoneNumber= LocalphoneNumber.toString();
  const companyName = `${faker.company.name()} ${randomNum}`;
  const companySizeOptions = ['1-50', '51-100', '101-250', '251-500', '501-1000', '1001-5000', '5000+'];
  const companySize = faker.helpers.arrayElement(companySizeOptions);
  const password = `TestPass@${randomNum}`;

  const testData = [
    {
      description: `Signup test - run ${randomNum}`,
      input: {
        firstname: firstName,
        lastname: lastName,
        email: email,
        phoneNumber: phoneNumber,
        companyName: companyName,
        companySize: companySize,
        password: password
      },
      expectError: null
    }
  ];

  const filePath = path.resolve('./data/signupTestData.json');

  // 🔥 Overwrite the file instead of appending
  fs.writeFileSync(filePath, JSON.stringify(testData, null, 2));
  console.log(`✅ Test data overwritten in ${filePath}`);
}

generateUniqueSignupData();
