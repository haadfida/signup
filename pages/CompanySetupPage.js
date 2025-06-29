// Playwright Page Object Model: CompanySetupPage
export default class CompanySetupPage {
  constructor(page) {
    this.page = page;
    // Visible labels – fallbacks make the POM resilient
    this.industrySelect = page.getByLabel(/What industry are you in\?/i).first();
    this.goalsTextarea = page.getByLabel(/What are your goals with EZOfficeInventory\?/i).first();
    this.continueButton = page.getByRole('button', { name: /continue/i });
  }

  /**
   * Complete the personalization form that appears after successful sign-up.
   * @param {Object} opts
   * @param {string} [opts.industry] - Visible option text to pick from the dropdown.
   * @param {string} [opts.goals]    - Free-text area.
   */
  async complete({ industry = 'Software/ IT Company', goals = 'Automated onboarding test.' } = {}) {
    // Interact with the Select2 widget that decorates the <select>.
    const trigger = this.page.locator('.select2-selection--single').first();
    await trigger.waitFor({ state: 'visible' });
    await trigger.click();

    const option = this.page.locator('.select2-results__option', { hasText: industry }).first();
    if (await option.count()) {
      await option.click();
    } else {
      // fallback to first enabled option
      await this.page.locator('.select2-results__option[aria-disabled="false"]').first().click();
    }

    await this.goalsTextarea.fill(goals);
    await this.continueButton.click();
  }
} 