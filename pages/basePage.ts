import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async getMetaTagContent(metaName: string): Promise<string | null> {
    return await this.page.locator(`meta[name="${metaName}"]`).getAttribute('content');
  }

  async getOgMetaTagContent(property: string): Promise<string | null> {
    return await this.page.locator(`meta[property="${property}"]`).getAttribute('content');
  }

  async getTextContent(selector: string): Promise<string> {
    return await this.page.locator(selector).textContent() || '';
  }

  async isElementVisible(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isVisible();
  }

  async getHeadingText(headingText: string): Promise<string | null> {
    return await this.page.getByRole('heading', { name: headingText, exact: true }).textContent();
  }

  async verifyPageUrl(expectedUrl: string): Promise<boolean> {
    return this.page.url().includes(expectedUrl);
  }

  async waitForElementVisible(selector: string, timeout: number = 5000) {
    await this.page.locator(selector).waitFor({ state: 'visible', timeout });
  }
}
