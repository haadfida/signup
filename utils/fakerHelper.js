import { faker } from '@faker-js/faker';

export function makeSignupRow() {
  const randomNum = faker.number.int({ min: 10000, max: 99999 });
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${randomNum}@yopmail.com`;
  const phoneNumber = `3${faker.number.int({ min: 100000000, max: 999999999 })}`; // PK mobile
  const companyName = `Auto${faker.string.alphanumeric({ length: 8, casing: 'upper' })}${faker.number.int({ max: 9999 })}`;
  const companySizeOptions = ['Less than 250', '251-500', '501-2,000', '2,001-5,000', '5,001-25,000', '25,001-100,000', 'More than 100,000'];

  return {
    description: `Signup test - run ${randomNum}`,
    input: {
      firstname: firstName,
      lastname: lastName,
      email,
      countryCode: '92',
      phoneNumber,
      companyName,
      companySize: faker.helpers.arrayElement(companySizeOptions),
      password: `TestPass@${randomNum}`
    },
    expectError: null
  };
} 