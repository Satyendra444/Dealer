/**
 * Central configuration for all cache tags and their functional API endpoints.
 *
 * Structure:
 *   module → tag(s) → endpoint(s) to warm & verify
 */

export interface CacheTagConfig {
    /** Human label for logging */
    label: string;
    /** Tag string passed to the invalidation API */
    tag: string;
    /** Functional API endpoint(s) that populate this cache */
    endpoints: string[];
}

// ──────────────────────────────────────────────────────────────────────
// BANK
// ──────────────────────────────────────────────────────────────────────
export const BANK_TAGS: CacheTagConfig[] = [
    {
        label: 'Bank — full list',
        tag: 'bank',
        endpoints: [
            '/v1/bank/index',
            '/v1/bank/detail?slug=hdfc-bank',
        ],
    },
];

// ──────────────────────────────────────────────────────────────────────
// BANNER
// ──────────────────────────────────────────────────────────────────────
export const BANNER_TAGS: CacheTagConfig[] = [
    {
        label: 'Banner — construction-equipments',
        tag: 'banner:construction-equipments',
        endpoints: [
            '/v1/banners?_format=json&categorySlug=construction-equipments',
        ],
    },
];

// ──────────────────────────────────────────────────────────────────────
// BRAND
// ──────────────────────────────────────────────────────────────────────
export const BRAND_TAGS: CacheTagConfig[] = [
    {
        label: 'Brand — trucks-tata',
        tag: 'brand:trucks-tata',
        endpoints: [
            '/v1/brand/detail?langCode=en&categorySlug=trucks&slug=tata',
        ],
    },
    {
        label: 'Brand — trucks (all)',
        tag: 'brand:trucks',
        endpoints: [
            '/v1/brands?categorySlug=trucks&langCode=en',
        ],
    },
    {
        label: 'Brand — category-dealer',
        tag: 'brand-category-dealer:8-in',
        endpoints: [
            '/v1/brands?categorySlug=trucks&langCode=en',
        ],
    },
];

// ──────────────────────────────────────────────────────────────────────
// CATEGORY
// ──────────────────────────────────────────────────────────────────────
export const CATEGORY_TAGS: CacheTagConfig[] = [
    {
        label: 'Category — all',
        tag: 'category',
        endpoints: [
            '/v1/categories?domain=91trucks.com',
        ],
    },
    {
        label: 'Category — trucks',
        tag: 'category:trucks',
        endpoints: [
            '/v1/category/detail?langCode=en&slug=trucks',
        ],
    },
    {
        label: 'Category — domain 91trucks.com',
        tag: 'category-domain:91trucks.com',
        endpoints: [
            '/v1/categories?domain=91trucks.com',
        ],
    },
];

// ──────────────────────────────────────────────────────────────────────
// CITY
// ──────────────────────────────────────────────────────────────────────
export const CITY_TAGS: CacheTagConfig[] = [
    {
        label: 'City — all',
        tag: 'city',
        endpoints: [
            '/v1/cities?_format=json&langCode=en',
            '/v1/cities?is_popular=1',
        ],
    },
    {
        label: 'City — datia',
        tag: 'city:datia',
        endpoints: [
            '/v1/city/detail?slug=datia&langCode=en',
        ],
    },
    {
        label: 'City — state 2',
        tag: 'city-state:2',
        endpoints: [
            '/v1/city/cities-by-state?stateId=2',
        ],
    },
    {
        label: 'City — EV charging jaipur',
        tag: 'ev_charging_station:jaipur',
        endpoints: [
            '/v1/city/electric-charging-station?slug=jaipur',
        ],
    },
];

// ──────────────────────────────────────────────────────────────────────
// DEALER
// ──────────────────────────────────────────────────────────────────────
export const DEALER_TAGS: CacheTagConfig[] = [
    {
        label: 'Dealer — category-brand-city trucks',
        tag: 'dealer-category-brand-city:trucks',
        endpoints: [
            '/v1/dealers?categorySlug=trucks&langCode=en&brandSlug=tata&citySlug=new-delhi&page=1&per-page=10',
        ],
    },
    {
        label: 'Dealer — brand-city trucks',
        tag: 'dealer-brand-city:trucks',
        endpoints: [
            '/v1/dealers?categorySlug=trucks&langCode=en&brandSlug=tata&citySlug=new-delhi&page=1&per-page=10',
        ],
    },
    {
        label: 'Dealer — city trucks-ashok-leyland',
        tag: 'dealer-city:trucks-ashok-leyland',
        endpoints: [
            '/v1/dealers?categorySlug=trucks&langCode=en&brandSlug=ashok-leyland&citySlug=new-delhi&page=1&per-page=10',
        ],
    },
];

// ──────────────────────────────────────────────────────────────────────
// FAQ
// ──────────────────────────────────────────────────────────────────────
export const FAQ_TAGS: CacheTagConfig[] = [
    {
        label: 'FAQ — category trucks',
        tag: 'faq-category:trucks',
        endpoints: [
            '/v1/faqs?categorySlug=trucks&langCode=en&page=category',
        ],
    },
    {
        label: 'FAQ — model 7-1178',
        tag: 'faq-model:7-1178',
        endpoints: [
            '/v1/faqs?categorySlug=trucks&langCode=en&page=category',
        ],
    },
];

// ──────────────────────────────────────────────────────────────────────
// SEO
// ──────────────────────────────────────────────────────────────────────
export const SEO_TAGS: CacheTagConfig[] = [
    {
        label: 'SEO — home 91infra.com',
        tag: 'seo-home:91infra.com',
        endpoints: [
            '/v1/seo/category?categorySlug=trucks&langCode=en&countryCode=in',
        ],
    },
    {
        label: 'SEO — category trucks',
        tag: 'seo-category:trucks',
        endpoints: [
            '/v1/seo/category?categorySlug=trucks&langCode=en&countryCode=in',
        ],
    },
    {
        label: 'SEO — variant trucks-ashok-leyland-dost-ls',
        tag: 'seo-variant:trucks-ashok-leyland-dost-ls',
        endpoints: [
            '/v1/seo/category?categorySlug=trucks&langCode=en&countryCode=in',
        ],
    },
    {
        label: 'SEO — model 1510',
        tag: 'seo-model:1510',
        endpoints: [
            '/v1/seo/category?categorySlug=trucks&langCode=en&countryCode=in',
        ],
    },
    {
        label: 'SEO — dealer trucks',
        tag: 'seo-dealer:trucks',
        endpoints: [
            '/v1/seo/category?categorySlug=trucks&langCode=en&countryCode=in',
        ],
    },
    {
        label: 'SEO — static-page privacy-policy',
        tag: 'seo-static-page:91trucks.com-privacy-policy',
        endpoints: [
            '/v1/seo/category?categorySlug=trucks&langCode=en&countryCode=in',
        ],
    },
    {
        label: 'SEO — filter',
        tag: 'seo-filter',
        endpoints: [
            '/v1/seo/category?categorySlug=trucks&langCode=en&countryCode=in',
        ],
    },
];

// ──────────────────────────────────────────────────────────────────────
// NEWS
// ──────────────────────────────────────────────────────────────────────
export const NEWS_TAGS: CacheTagConfig[] = [
    {
        label: 'News — wp_users 16',
        tag: 'news-wp_users-wp_usermeta:16',
        endpoints: [],  // No direct functional endpoint available in the list
    },
    {
        label: 'News — wp_postmeta CE 30',
        tag: 'news-wp_postmeta:construction-equipments-30',
        endpoints: [],
    },
    {
        label: 'News — wp_posts ashok-leyland-saathi',
        tag: 'news-wp_posts:91trucks.com-ashok-leyland-saathi',
        endpoints: [],
    },
    {
        label: 'News — wp_posts-wp_postmeta truck',
        tag: 'news-wp_posts-wp_postmeta:91trucks.com-truck',
        endpoints: [],
    },
];

// ──────────────────────────────────────────────────────────────────────
// STORE
// ──────────────────────────────────────────────────────────────────────
export const STORE_TAGS: CacheTagConfig[] = [
    {
        label: 'Store — inventory all',
        tag: 'store-inventory:all',
        endpoints: [],  // No direct functional endpoint provided
    },
];

// ──────────────────────────────────────────────────────────────────────
// NAVIGATION
// ──────────────────────────────────────────────────────────────────────
export const NAVIGATION_TAGS: CacheTagConfig[] = [
    {
        label: 'Navigation — site menu',
        tag: 'navigation',
        endpoints: [
            '/v1/site/site-navigation-menu?slug=91trucks.com',
        ],
    },
];

// ──────────────────────────────────────────────────────────────────────
// RATING
// ──────────────────────────────────────────────────────────────────────
export const RATING_TAGS: CacheTagConfig[] = [
    {
        label: 'Rating — types trucks',
        tag: 'rating',
        endpoints: [
            '/v1/rating/types?categorySlug=trucks',
            '/v1/rating/index?&categorySlug=trucks&_format=json',
        ],
    },
];

// ──────────────────────────────────────────────────────────────────────
// QNA
// ──────────────────────────────────────────────────────────────────────
export const QNA_TAGS: CacheTagConfig[] = [
    {
        label: 'QnA — category trucks',
        tag: 'qna',
        endpoints: [
            '/v1/question/qna-by-category-and-search-keys?categorySlug=trucks&langCode=en&searchKey=trucks|model',
        ],
    },
];

// ──────────────────────────────────────────────────────────────────────
// CAREERS
// ──────────────────────────────────────────────────────────────────────
export const CAREERS_TAGS: CacheTagConfig[] = [
    {
        label: 'Careers — departments',
        tag: 'careers',
        endpoints: [
            '/v1/departments?_format=json',
            '/v1/department/role?_format=json&countryCode=in&departmentId=5',
        ],
    },
];

// ──────────────────────────────────────────────────────────────────────
// AUTO-EXPO
// ──────────────────────────────────────────────────────────────────────
export const AUTO_EXPO_TAGS: CacheTagConfig[] = [
    {
        label: 'Auto-Expo — updates',
        tag: 'auto-expo',
        endpoints: [
            '/v1/site/autoexpo-updates',
        ],
    },
];

// ──────────────────────────────────────────────────────────────────────
// STATE
// ──────────────────────────────────────────────────────────────────────
export const STATE_TAGS: CacheTagConfig[] = [
    {
        label: 'State — list',
        tag: 'state',
        endpoints: [
            '/v1/state/list?langCode=en',
            '/v1/state/ev-state-wise-unit-price',
        ],
    },
];
