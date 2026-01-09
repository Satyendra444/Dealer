import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class TruckDealersPage extends BasePage {
  // URL
  readonly baseUrl = 'https://dev.91trucks.com';
  readonly englishUrl = '/truck-dealers';
  readonly hindiUrl = '/hi/truck-dealers';

  // Selectors for English page
  readonly pageHeading: Locator;
  readonly selectBrandButton: Locator;
  readonly selectCityButton: Locator;
  readonly locateDealersButton: Locator;
  readonly dealerContentSection: Locator;
  readonly readMoreButton: Locator;
  readonly comparisonLink: Locator;
  readonly serviceCentersLink: Locator;
  readonly latestVideosLink: Locator;
  readonly faqSection: Locator;
  readonly brandByBrandsHeading: Locator;
  readonly exploreMoreFeaturesHeading: Locator;
  readonly popularTrucksHeading: Locator;
  readonly findTrustedDealersHeading: Locator;
  readonly latestVideosHeading: Locator;
  readonly latestUpdatesHeading: Locator;

  constructor(page: Page) {
    super(page);
    // Main headings and buttons
    this.pageHeading = page.getByRole('heading', { name: 'Truck Dealers in India', exact: true });
    this.selectBrandButton = page.getByText('Select Brand');
    this.selectCityButton = page.getByText('Select City');
    this.locateDealersButton = page.getByRole('button', { name: 'Locate Dealers' });
    this.dealerContentSection = page.locator('#dealer_content');
    this.readMoreButton = this.dealerContentSection.getByText('Read More');
    this.comparisonLink = page.getByRole('link', { name: 'compare Comparison Compare' });
    this.serviceCentersLink = page.getByRole('link', { name: 'servicecenters Service' });
    this.latestVideosLink = page.getByRole('link', { name: 'videos Latest Truck Videos' });
    this.faqSection = page.locator('[class*="faq"]');
    this.brandByBrandsHeading = page.getByRole('heading', { name: 'Truck Dealers by Brands' });
    this.exploreMoreFeaturesHeading = page.getByRole('heading', { name: 'Explore More Features' });
    this.popularTrucksHeading = page.getByRole('heading', { name: 'Most Popular Commercial Trucks' });
    this.findTrustedDealersHeading = page.getByRole('heading', { name: 'Find Trusted Truck Dealers In' });
    this.latestVideosHeading = page.getByRole('heading', { name: 'Latest Truck Videos' });
    this.latestUpdatesHeading = page.getByRole('heading', { name: 'Latest Truck Updates' });
  }

  // Navigate to English truck dealers page
  async navigateToEnglish() {
    await this.goto(`${this.baseUrl}${this.englishUrl}`);
  }

  // Navigate to Hindi truck dealers page
  async navigateToHindi() {
    await this.goto(`${this.baseUrl}${this.hindiUrl}`);
  }

  // SEO Methods
  async verifyMetaTitle(expectedTitle: string): Promise<boolean> {
    const title = await this.getPageTitle();
    return title === expectedTitle;
  }

  async getMetaTitle(): Promise<string> {
    return await this.getPageTitle();
  }

  async getMetaDescription(): Promise<string | null> {
    return await this.getMetaTagContent('description');
  }

  // Content Verification Methods
  async verifyMainHeadingVisible(): Promise<boolean> {
    return await this.pageHeading.isVisible();
  }

  async verifySelectBrandButtonVisible(): Promise<boolean> {
    return await this.selectBrandButton.isVisible();
  }

  async verifySelectCityButtonVisible(): Promise<boolean> {
    return await this.selectCityButton.isVisible();
  }

  async verifyLocateDealersButtonVisible(): Promise<boolean> {
    return await this.locateDealersButton.isVisible();
  }

  async verifyDealerContentVisible(): Promise<boolean> {
    return await this.dealerContentSection.isVisible();
  }

  async verifyReadMoreButtonVisible(): Promise<boolean> {
    return await this.readMoreButton.isVisible();
  }

  async verifyTruckDealersByBrandsHeadingVisible(): Promise<boolean> {
    return await this.brandByBrandsHeading.isVisible();
  }

  async verifyExploreMoreFeaturesVisible(): Promise<boolean> {
    return await this.exploreMoreFeaturesHeading.isVisible();
  }

  async verifyComparisonLinkVisible(): Promise<boolean> {
    return await this.comparisonLink.isVisible();
  }

  async verifyServiceCentersLinkVisible(): Promise<boolean> {
    return await this.serviceCentersLink.isVisible();
  }

  async verifyLatestVideosLinkVisible(): Promise<boolean> {
    return await this.latestVideosLink.isVisible();
  }

  async verifyPopularTrucksHeadingVisible(): Promise<boolean> {
    return await this.popularTrucksHeading.isVisible();
  }

  async verifyFindTrustedDealersHeadingVisible(): Promise<boolean> {
    return await this.findTrustedDealersHeading.isVisible();
  }

  async verifyLatestVideosHeadingVisible(): Promise<boolean> {
    return await this.latestVideosHeading.isVisible();
  }

  async verifyLatestUpdatesHeadingVisible(): Promise<boolean> {
    return await this.latestUpdatesHeading.isVisible();
  }

  async verifyFAQSectionVisible(): Promise<boolean> {
    return await this.faqSection.isVisible();
  }

  // Verify specific content text
  async verifyContentText(text: string): Promise<boolean> {
    try {
      await this.waitForElementVisible(`text=${text}`, 5000);
      return true;
    } catch {
      return false;
    }
  }

  // Get all heading texts on page
  async getAllHeadingTexts(): Promise<string[]> {
    const headings = await this.page.locator('h1, h2, h3').allTextContents();
    return headings;
  }

  // Verify multiple content texts
  async verifyMultipleContentTexts(texts: string[]): Promise<boolean[]> {
    const results: boolean[] = [];
    for (const text of texts) {
      const exists = await this.verifyContentText(text);
      results.push(exists);
    }
    return results;
  }

  // Page structure verification
  async verifyPageUrl(expectedPath: string): Promise<boolean> {
    const currentUrl = this.page.url();
    return currentUrl.includes(expectedPath);
  }
}
