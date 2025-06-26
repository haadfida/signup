export class SignUpPage{

constructor(page)
{ 
  this.page= page;
  this.firstName = page.locator('#firstname');
  this.lastName = page.locator ('#lastname');
  this.email = page.locator('[name="email"]');
  this.nextButton= page.locator('#signup_first_step_next');
  this.countryCodeDropdown = page.locator('.iti__selected-flag');
  this.phoneNumber1=page.locator('#phone_number')
  this.companyField = page.locator('#company');
  this.companySizeDropdown = page.locator('#number_of_users');
  this.passwordField = page.locator('#password');
  this.finalSubmitButton = page.locator('#assetsonar-submit-btn');

  
}


async navigate() {
    await this.page.goto('https://ezo.io/assetsonar/');
    await Promise.all([
      this.page.waitForURL('https://ezo.io/assetsonar/sign_up/'),
      this.page.locator('.elementskit-btn').filter({hasText: 'Try It For Free'}).nth(0).click()
    ]);
  }

  async fillForm({ firstname, lastname, email }) {
    await this.firstName.fill(firstname);
    await this.lastName.fill(lastname);
    await this.email.fill(email);
  }

  async navigateToSecondForm() {
    await this.nextButton.click();  // Clicking the Next button to open the second form
    // Wait for the second form to appear (change locator as needed)
    await this.page.waitForSelector('#phone_number', { state: 'visible' });
  }

  async fillSecondForm({ phoneNumber, companyName, companySize, password }) {
    await this.countryCodeDropdown.click();  
    await this.page.locator('#iti-0__item-sg').click();  
    await this.phoneNumber1.fill(phoneNumber);
    await this.companyField.fill(companyName);

    await this.companySizeDropdown.selectOption({ label: companySize });

    await this.passwordField.fill(password);
  }

  async submitForm() {
    await this.finalSubmitButton.click();
  }
}




