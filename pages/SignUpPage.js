// Playwright Page Object Model: SignUpPage
export default class SignUpPage {
  constructor(page, productSlug = 'assetsonar') {
    this.page = page;
    this.productSlug = productSlug;

    // step-1 locators
    this.firstName = page.locator('#firstname');
    this.lastName = page.locator('#lastname');
    this.email = page.locator('[name="email"]');
    this.nextButton = page.locator('#signup_first_step_next');

    // step-2 locators
    this.countryCodeDropdown = page.locator('.iti__selected-flag');
    this.phoneNumber = page.locator('#phone_number');
    this.companyField = page.locator('#company');
    const sizeSelector = productSlug === 'ezofficeinventory' ? '#assets_tracking' : '#number_of_users';
    this.companySizeDropdown = page.locator(sizeSelector);
    this.passwordField = page.locator('#password');
    this.finalSubmitButton = page.locator(`#${this.productSlug}-submit-btn`, { hasText: /Start My Free Trial/i });
  }

  async navigate() {
    await this.page.goto(`/${this.productSlug}/sign_up/`);
    await this.firstName.waitFor({ state: 'visible' });
  }

  async fillForm({ firstname, lastname, email }) {
    await this.firstName.fill(firstname);
    if (lastname) await this.lastName.fill(lastname);
    await this.email.fill(email);
  }

  async navigateToSecondForm() {
    await this.nextButton.waitFor({ state: 'visible' });
    await this.nextButton.click();
    await this.phoneNumber.waitFor({ state: 'visible' });
  }

  async fillSecondForm({ countryCode = '92', phoneNumber, companyName, companySize, password }) {
    // country dial-code
    await this.countryCodeDropdown.click();
    await this.page.locator(`li[role="option"][data-dial-code="${countryCode}"]`).click();

    await this.phoneNumber.fill(phoneNumber);

    // retry unique company name if taken
    let attempt = companyName;
    for (let i = 0; i < 4; i++) {
      await this.companyField.fill(attempt);
      await this.page.waitForTimeout(600);
      if (!(await this.page.locator('p.company_error').isVisible())) break;
      attempt = `Auto${Math.floor(100000 + Math.random() * 900000)}`;
    }

    await this.companySizeDropdown.selectOption({ label: companySize });

    const terms = this.page.locator('#user_terms_checkbox');
    if (await terms.count()) await terms.check();

    await this.passwordField.type(password, { delay: 40 });
  }

  async submitForm() {
    await this.finalSubmitButton.waitFor({ state: 'visible' });

    // stub grecaptcha so on-page js thinks it succeeded
    await this.page.evaluate(() => {
      window.grecaptcha = {
        ready: cb => cb(),
        execute: () => Promise.resolve('token'),
        getResponse: () => 'token'
      };
      let field = document.querySelector('input[name="g-recaptcha-response"]');
      if (!field) {
        field = document.createElement('input');
        field.type = 'hidden';
        field.name = 'g-recaptcha-response';
        document.forms[0].appendChild(field);
      }
      field.value = 'token';
    });

    await this.finalSubmitButton.click({ force: true });
  }
} 