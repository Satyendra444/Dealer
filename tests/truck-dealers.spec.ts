import { test, expect } from '@playwright/test';
import { TruckDealersPage } from '../pages/truckDealersPage';
import { CustomAssertions } from '../utils/assertions';

test.describe('Truck Dealers Page - English', () => {
  let truckDealersPage: TruckDealersPage;

  test.beforeEach(async ({ page }) => {
    truckDealersPage = new TruckDealersPage(page);
    await truckDealersPage.navigateToEnglish();
  });

  // SEO Tests
  test.describe('SEO Verification', () => {
    test('should have correct meta title', async () => {
      const expectedTitle = 'Truck Dealers & Showrooms in India - Find a Nearby Dealer in Your City';
      const actualTitle = await truckDealersPage.getMetaTitle();
      CustomAssertions.assertEquals(
        actualTitle,
        expectedTitle,
        'Meta Title Verification',
        'SEO Verification',
        'en'
      );
    });

    test('should have correct meta description', async () => {
      const expectedDescription = 'Find truck dealers & showrooms in India for all major brands. Get updated addresses, contact numbers and locations on 91trucks.';
      const actualDescription = await truckDealersPage.getMetaDescription();
      CustomAssertions.assertEquals(
        actualDescription,
        expectedDescription,
        'Meta Description Verification',
        'SEO Verification',
        'en'
      );
    });

    test('should have correct page URL', async () => {
      const isCorrectUrl = await truckDealersPage.verifyPageUrl('truck-dealers');
      CustomAssertions.assertTruthy(
        isCorrectUrl,
        'Page URL Verification',
        'SEO Verification',
        'en'
      );
    });
  });

  // Content Verification Tests
  test.describe('Content Verification', () => {
    test('should display main page heading', async () => {
      const isVisible = await truckDealersPage.verifyMainHeadingVisible();
      CustomAssertions.assertTruthy(
        isVisible,
        'Main Page Heading Display',
        'Content Verification',
        'en'
      );
    });

    test('should display Select Brand button', async () => {
      const isVisible = await truckDealersPage.verifySelectBrandButtonVisible();
      CustomAssertions.assertTruthy(
        isVisible,
        'Select Brand Button Display',
        'Content Verification',
        'en'
      );
    });

    test('should display Select City button', async () => {
      const isVisible = await truckDealersPage.verifySelectCityButtonVisible();
      CustomAssertions.assertTruthy(
        isVisible,
        'Select City Button Display',
        'Content Verification',
        'en'
      );
    });

    test('should display Locate Dealers button', async () => {
      const isVisible = await truckDealersPage.verifyLocateDealersButtonVisible();
      CustomAssertions.assertTruthy(
        isVisible,
        'Locate Dealers Button Display',
        'Content Verification',
        'en'
      );
    });

    test('should display dealer content section', async () => {
      const isVisible = await truckDealersPage.verifyDealerContentVisible();
      CustomAssertions.assertTruthy(
        isVisible,
        'Dealer Content Section Display',
        'Content Verification',
        'en'
      );
    });

    test('should display Read More button in dealer content', async () => {
      const isVisible = await truckDealersPage.verifyReadMoreButtonVisible();
      CustomAssertions.assertTruthy(
        isVisible,
        'Read More Button Display',
        'Content Verification',
        'en'
      );
    });
  });

  // Main Content Sections
  test.describe('Main Content Sections', () => {
    test('should display "Truck Dealers by Brands" heading', async () => {
      const isVisible = await truckDealersPage.verifyTruckDealersByBrandsHeadingVisible();
      CustomAssertions.assertTruthy(
        isVisible,
        'Truck Dealers by Brands Heading',
        'Main Content Sections',
        'en'
      );
    });

    test('should display "Explore More Features" section', async () => {
      const isVisible = await truckDealersPage.verifyExploreMoreFeaturesVisible();
      CustomAssertions.assertTruthy(
        isVisible,
        'Explore More Features Section',
        'Main Content Sections',
        'en'
      );
    });

    test('should display "Most Popular Commercial Trucks" heading', async () => {
      const isVisible = await truckDealersPage.verifyPopularTrucksHeadingVisible();
      CustomAssertions.assertTruthy(
        isVisible,
        'Popular Commercial Trucks Heading',
        'Main Content Sections',
        'en'
      );
    });

    test('should display "Find Trusted Truck Dealers In India" heading', async () => {
      const isVisible = await truckDealersPage.verifyFindTrustedDealersHeadingVisible();
      CustomAssertions.assertTruthy(
        isVisible,
        'Find Trusted Dealers Heading',
        'Main Content Sections',
        'en'
      );
    });

    test('should display "Latest Truck Videos" section', async () => {
      const isVisible = await truckDealersPage.verifyLatestVideosHeadingVisible();
      CustomAssertions.assertTruthy(
        isVisible,
        'Latest Truck Videos Heading',
        'Main Content Sections',
        'en'
      );
    });

    test('should display "Latest Truck Updates" section', async () => {
      const isVisible = await truckDealersPage.verifyLatestUpdatesHeadingVisible();
      CustomAssertions.assertTruthy(
        isVisible,
        'Latest Truck Updates Heading',
        'Main Content Sections',
        'en'
      );
    });
  });

  // Feature Links Verification
  test.describe('Feature Links', () => {
    test('should display Comparison link', async () => {
      const isVisible = await truckDealersPage.verifyComparisonLinkVisible();
      CustomAssertions.assertTruthy(
        isVisible,
        'Comparison Link Display',
        'Feature Links',
        'en'
      );
    });

    test('should display Service Centers link', async () => {
      const isVisible = await truckDealersPage.verifyServiceCentersLinkVisible();
      CustomAssertions.assertTruthy(
        isVisible,
        'Service Centers Link Display',
        'Feature Links',
        'en'
      );
    });

    test('should display Latest Truck Videos link', async () => {
      const isVisible = await truckDealersPage.verifyLatestVideosLinkVisible();
      CustomAssertions.assertTruthy(
        isVisible,
        'Latest Truck Videos Link Display',
        'Feature Links',
        'en'
      );
    });
  });

  // Specific Content Text Verification
  test.describe('Specific Content Texts', () => {
    test('should display intro text "We help you discover verified"', async () => {
      const exists = await truckDealersPage.verifyContentText('We help you discover verified');
      CustomAssertions.assertTruthy(
        exists,
        'Intro Text Presence',
        'Specific Content Texts',
        'en'
      );
    });

    test('should display "If you\'ve ever tried looking for truck dealers"', async () => {
      const exists = await truckDealersPage.verifyContentText('If you\'ve ever tried looking');
      CustomAssertions.assertTruthy(
        exists,
        'Tried Looking Text Presence',
        'Specific Content Texts',
        'en'
      );
    });

    test('should display "Most users start by typing"', async () => {
      const exists = await truckDealersPage.verifyContentText('Most users start by typing');
      CustomAssertions.assertTruthy(
        exists,
        'Users Typing Text Presence',
        'Specific Content Texts',
        'en'
      );
    });

    test('should display "And if you just want a number"', async () => {
      const exists = await truckDealersPage.verifyContentText('And if you just want a number');
      CustomAssertions.assertTruthy(
        exists,
        'Want Number Text Presence',
        'Specific Content Texts',
        'en'
      );
    });

    test('should display "Here\'s the thing about finding good truck dealers"', async () => {
      const exists = await truckDealersPage.verifyContentText('Here\'s the thing about');
      CustomAssertions.assertTruthy(
        exists,
        'Thing About Text Presence',
        'Specific Content Texts',
        'en'
      );
    });

    test('should display "People often search for truck dealership"', async () => {
      const exists = await truckDealersPage.verifyContentText('People often search for truck');
      CustomAssertions.assertTruthy(
        exists,
        'Often Search Text Presence',
        'Specific Content Texts',
        'en'
      );
    });

    test('should display "And then there\'s convenience"', async () => {
      const exists = await truckDealersPage.verifyContentText('And then there\'s convenience');
      CustomAssertions.assertTruthy(
        exists,
        'Convenience Text Presence',
        'Specific Content Texts',
        'en'
      );
    });

    test('should display "In the end, when people say"', async () => {
      const exists = await truckDealersPage.verifyContentText('In the end, when people say');
      CustomAssertions.assertTruthy(
        exists,
        'End People Say Text Presence',
        'Specific Content Texts',
        'en'
      );
    });
  });

  // FAQ Section Verification
  test.describe('FAQ Section', () => {
    test('should display FAQ section', async () => {
      const isVisible = await truckDealersPage.verifyFAQSectionVisible();
      CustomAssertions.assertTruthy(
        isVisible,
        'FAQ Section Display',
        'FAQ Section',
        'en'
      );
    });

    test('should display "Frequently Asked Questions" text', async () => {
      const exists = await truckDealersPage.verifyContentText('Frequently Asked Questions');
      CustomAssertions.assertTruthy(
        exists,
        'FAQ Heading Presence',
        'FAQ Section',
        'en'
      );
    });

    test('should display first FAQ: "How do I find trustworthy"', async () => {
      const exists = await truckDealersPage.verifyContentText('How do I find trustworthy');
      CustomAssertions.assertTruthy(
        exists,
        'First FAQ Presence',
        'FAQ Section',
        'en'
      );
    });

    test('should display second FAQ: "What should I look for"', async () => {
      const exists = await truckDealersPage.verifyContentText('What should I look for before');
      CustomAssertions.assertTruthy(
        exists,
        'Second FAQ Presence',
        'FAQ Section',
        'en'
      );
    });

    test('should display third FAQ: "Can I get a truck dealer contact number"', async () => {
      const exists = await truckDealersPage.verifyContentText('Can I get a truck dealer contact number');
      CustomAssertions.assertTruthy(
        exists,
        'Third FAQ Presence',
        'FAQ Section',
        'en'
      );
    });

    test('should display fourth FAQ: "Are certified or authorized dealers"', async () => {
      const exists = await truckDealersPage.verifyContentText('Are certified or authorized dealers');
      CustomAssertions.assertTruthy(
        exists,
        'Fourth FAQ Presence',
        'FAQ Section',
        'en'
      );
    });

    test('should display fifth FAQ: "Can I use 91trucks to find commercial vehicle"', async () => {
      const exists = await truckDealersPage.verifyContentText('Can I use 91trucks to find commercial vehicle');
      CustomAssertions.assertTruthy(
        exists,
        'Fifth FAQ Presence',
        'FAQ Section',
        'en'
      );
    });
  });
});

test.describe('Truck Dealers Page - Hindi', () => {
  let truckDealersPage: TruckDealersPage;

  test.beforeEach(async ({ page }) => {
    truckDealersPage = new TruckDealersPage(page);
    await truckDealersPage.navigateToHindi();
  });

  // SEO Tests for Hindi
  test.describe('SEO Verification - Hindi', () => {
    test('should have correct meta title in Hindi', async () => {
      const expectedTitle = 'भारत में ट्रक डीलर और शोरूम - अपने शहर में नज़दीकी डीलर खोजें';
      const actualTitle = await truckDealersPage.getMetaTitle();
      CustomAssertions.assertEquals(
        actualTitle,
        expectedTitle,
        'Meta Title Verification',
        'SEO Verification - Hindi',
        'hi'
      );
    });

    test('should have correct meta description in Hindi', async () => {
      const expectedDescription = 'भारत में सभी प्रमुख ब्रांडों के ट्रक डीलर और शोरूम खोजें। 91ट्रक्स पर अपडेट किए गए पते, संपर्क नंबर और लोकेशन प्राप्त करें।';
      const actualDescription = await truckDealersPage.getMetaDescription();
      CustomAssertions.assertEquals(
        actualDescription,
        expectedDescription,
        'Meta Description Verification',
        'SEO Verification - Hindi',
        'hi'
      );
    });

    test('should have correct page URL for Hindi', async () => {
      const isCorrectUrl = await truckDealersPage.verifyPageUrl('hi/truck-dealers');
      CustomAssertions.assertTruthy(
        isCorrectUrl,
        'Page URL Verification',
        'SEO Verification - Hindi',
        'hi'
      );
    });
  });

  // Content Verification Tests for Hindi
  test.describe('Content Verification - Hindi', () => {
    test('should display main content section', async () => {
      const isVisible = await truckDealersPage.verifyDealerContentVisible();
      CustomAssertions.assertTruthy(
        isVisible,
        'Main Content Display',
        'Content Verification - Hindi',
        'hi'
      );
    });

    test('should display select brand button', async () => {
      const isVisible = await truckDealersPage.verifySelectBrandButtonVisible();
      CustomAssertions.assertTruthy(
        isVisible,
        'Select Brand Button Display',
        'Content Verification - Hindi',
        'hi'
      );
    });

    test('should display select city button', async () => {
      const isVisible = await truckDealersPage.verifySelectCityButtonVisible();
      CustomAssertions.assertTruthy(
        isVisible,
        'Select City Button Display',
        'Content Verification - Hindi',
        'hi'
      );
    });
  });

  // Specific Hindi Content Text Verification
  test.describe('Specific Hindi Content Texts', () => {
    test('should display Hindi intro text', async () => {
      const exists = await truckDealersPage.verifyContentText('हम आपको भारत के भरोसेमंद');
      CustomAssertions.assertTruthy(
        exists,
        'Hindi Intro Text',
        'Specific Hindi Content Texts',
        'hi'
      );
    });

    test('should display Hindi section about finding dealers', async () => {
      const exists = await truckDealersPage.verifyContentText('अगर आपने कभी भारत में ट्रक डीलर्स');
      CustomAssertions.assertTruthy(
        exists,
        'Hindi Finding Dealers Text',
        'Specific Hindi Content Texts',
        'hi'
      );
    });

    test('should display Hindi FAQ section', async () => {
      const exists = await truckDealersPage.verifyContentText('अक्सर पूछे जाने वाले प्रश्न');
      CustomAssertions.assertTruthy(
        exists,
        'Hindi FAQ Section',
        'Specific Hindi Content Texts',
        'hi'
      );
    });

    test('should display Hindi first FAQ', async () => {
      const exists = await truckDealersPage.verifyContentText('मैं अपने पास के भरोसेमंद ट्रक डीलर्स');
      CustomAssertions.assertTruthy(
        exists,
        'Hindi First FAQ',
        'Specific Hindi Content Texts',
        'hi'
      );
    });

    test('should display Hindi second FAQ', async () => {
      const exists = await truckDealersPage.verifyContentText('ट्रक डीलरशिप चुनने से पहले');
      CustomAssertions.assertTruthy(
        exists,
        'Hindi Second FAQ',
        'Specific Hindi Content Texts',
        'hi'
      );
    });
  });
});
