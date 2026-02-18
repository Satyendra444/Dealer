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
        label: 'Bank — listing',
        tag: 'bank',
        endpoints: [
            '/v1/bank/index',
        ],
    },
    {
        label: 'Bank — detail hdfc-bank',
        tag: 'bank:hdfc-bank',
        endpoints: [
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
            '/v1/banners?_format=json&categorySlug=construction-equipments&countryCode=in',
        ],
    },
];

// ──────────────────────────────────────────────────────────────────────
// BRAND
// ──────────────────────────────────────────────────────────────────────
export const BRAND_TAGS: CacheTagConfig[] = [
    {
        label: 'Brand — trucks (listing)',
        tag: 'brand:trucks',
        endpoints: [
            '/v1/brands?categorySlug=trucks&langCode=en&limit=0&countryCode=in',
        ],
    },
    {
        label: 'Brand — trucks-tata (detail)',
        tag: 'brand:trucks-tata',
        endpoints: [
            '/v1/brand/detail?categorySlug=trucks&slug=tata',
        ],
    },
    {
        label: 'Brand — category-dealer 8-in',
        tag: 'brand-category-dealer:8-in',
        endpoints: [
            '/v1/brand/brand-list-for-dealers?categorySlug=buses&langCode=en&countryCode=in',
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
            '/v1/categories',
        ],
    },
    {
        label: 'Category — domain 91trucks.com',
        tag: 'category-domain:91trucks.com',
        endpoints: [
            '/v1/categories?domain=91trucks.com',
        ],
    },
    {
        label: 'Category — trucks (detail)',
        tag: 'category:trucks',
        endpoints: [
            '/v1/category/detail?slug=trucks',
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
            '/v1/dealers?categorySlug=trucks&langCode=en&brandSlug=tata&citySlug=new-delhi&page=1&per-page=2&countryCode=in',
        ],
    },
    {
        label: 'Dealer — category-city trucks (popular)',
        tag: 'dealer-category-city:trucks',
        endpoints: [
            '/v1/dealers/popular-city-dealer?categorySlug=trucks&langCode=en',
        ],
    },
    {
        label: 'Dealer — city trucks-ashok-leyland (count)',
        tag: 'dealer-city:trucks-ashok-leyland',
        endpoints: [
            '/v1/dealers/popular-city-count?categorySlug=trucks&langCode=en&brandSlug=ashok-leyland&countryCode=in',
        ],
    },
    {
        label: 'Dealer — brand-city trucks (list-by-brand-city)',
        tag: 'dealer-brand-city:trucks',
        endpoints: [
            '/v1/dealers/list-by-brand-city?categorySlug=trucks&brandSlug=tata&citySlug=new-delhi',
        ],
    },
];

// ──────────────────────────────────────────────────────────────────────
// DEPARTMENT / ROLE (Careers)
// ──────────────────────────────────────────────────────────────────────
export const CAREERS_TAGS: CacheTagConfig[] = [
    {
        label: 'Department — all',
        tag: 'department',
        endpoints: [
            '/v1/departments?_format=json&countryCode=in',
        ],
    },
    {
        label: 'Role — department 7',
        tag: 'role',
        endpoints: [
            '/v1/department/role?_format=json&countryCode=in&departmentId=7',
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
            '/v1/faqs?categorySlug=trucks&langCode=en&page=category&countryCode=in',
        ],
    },
    {
        label: 'FAQ — model 7-1178',
        tag: 'faq-model:7-1178',
        endpoints: [
            '/v1/faq/model?categorySlug=trucks&langCode=hi&page=model-price&brandSlug=tata&modelSlug=intra-v30&countryCode=in',
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
            '/v1/state/list',
        ],
    },
];

// ──────────────────────────────────────────────────────────────────────
// NAVIGATION
// ──────────────────────────────────────────────────────────────────────
export const NAVIGATION_TAGS: CacheTagConfig[] = [
    {
        label: 'Navigation — site menu 91trucks.com',
        tag: 'domain-site_navigation:91trucks.com',
        endpoints: [
            '/v1/site/site-navigation-menu?slug=91trucks.com',
        ],
    },
];

// ──────────────────────────────────────────────────────────────────────
// QNA (Questions)
// ──────────────────────────────────────────────────────────────────────
export const QNA_TAGS: CacheTagConfig[] = [
    {
        label: 'QnA — question-model trucks',
        tag: 'question-model:trucks',
        endpoints: [
            '/v1/question/qna-by-category-and-search-keys?categorySlug=trucks&langCode=en&searchKey=dealers&countryCode=in',
        ],
    },
];

// ──────────────────────────────────────────────────────────────────────
// RATING
// ──────────────────────────────────────────────────────────────────────
export const RATING_TAGS: CacheTagConfig[] = [
    {
        label: 'Rating — construction-equipments (index)',
        tag: 'rating:construction-equipments',
        endpoints: [
            '/v1/rating/index?&categorySlug=construction-equipments&_format=json&countryCode=in',
        ],
    },
    {
        label: 'Rating — trucks (types)',
        tag: 'rating_type:trucks',
        endpoints: [
            '/v1/rating/types?categorySlug=trucks',
        ],
    },
];

// ──────────────────────────────────────────────────────────────────────
// SITE HOME
// ──────────────────────────────────────────────────────────────────────
export const SITE_HOME_TAGS: CacheTagConfig[] = [
    {
        label: 'Site Home — 91infra.com',
        tag: 'category-widget:null-91infra.com',
        endpoints: [
            '/v1/site/home?domain=91infra.com&langCode=hi&countryCode=in',
        ],
    },
];

// ──────────────────────────────────────────────────────────────────────
// VIDEO
// ──────────────────────────────────────────────────────────────────────
export const VIDEO_TAGS: CacheTagConfig[] = [
    {
        label: 'Video — shorts 91trucks.com trucks',
        tag: 'category-brand-model-model_media:91trucks.com-trucks',
        endpoints: [
            '/v1/video/shorts?&domain=91trucks.com&categorySlug=trucks&brandSlug=&modelSlug=&limit=8&countryCode=in',
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
            '/v1/seo/home?langCode=hi&domain=91infra.com&countryCode=in',
        ],
    },
    {
        label: 'SEO — category buses',
        tag: 'seo-category:buses',
        endpoints: [
            '/v1/seo/category?categorySlug=buses&langCode=hi&countryCode=in',
        ],
    },
    {
        label: 'SEO — variant modelSlug',
        tag: 'seo-model:modelSlug',
        endpoints: [
            '/v1/seo/variant?categorySlug=trucks&langCode=hi&brandSlug=ashok-leyland&modelSlug=dost&variantSlug=ls&countryCode=in',
        ],
    },
    {
        label: 'SEO — model modelSlug',
        tag: 'seo-model:modelSlug',
        endpoints: [
            '/v1/seo/model?categorySlug=buses&langCode=hi&brandSlug=force&modelSlug=traveller-26&page=model&citySlug=new-delhi&countryCode=in',
        ],
    },
    {
        label: 'SEO — dealer trucks',
        tag: 'seo-dealer:trucks',
        endpoints: [
            '/v1/seo/dealer?categorySlug=trucks&langCode=en&type=dealers&brandSlug=ashok-leyland&citySlug=jaipur&countryCode=in',
        ],
    },
    {
        label: 'SEO — static-page privacy-policy',
        tag: 'seo-static-page:91trucks.com-privacy-policy',
        endpoints: [
            '/v1/seo/static-pages?domain=91trucks.com&langCode=en&pageSlug=privacy-policy',
        ],
    },
    {
        label: 'SEO — filter',
        tag: 'seo-filter',
        endpoints: [
            '/v1/listing/seo?categorySlug=trucks&langCode=hi&search=tata&countryCode=in',
        ],
    },
];

// ──────────────────────────────────────────────────────────────────────
// NEWS
// ──────────────────────────────────────────────────────────────────────
export const NEWS_TAGS: CacheTagConfig[] = [
    {
        label: 'News — author details 16',
        tag: 'news-wp_users-wp_usermeta:16',
        endpoints: [
            '/v1/news/author-details?authorSlug=atul-singh&countryCode=in',
        ],
    },
    {
        label: 'News — detail slug',
        tag: 'news-wp_postmeta:chinas-first-ever-self-driving-electric-tractor-is-a-farm-champion-heres-why',
        endpoints: [
            '/v1/news/details?slug=chinas-first-ever-self-driving-electric-tractor-is-a-farm-champion-heres-why&countryCode=in',
        ],
    },
    {
        label: 'News — listing CE 30',
        tag: 'news-wp_postmeta:construction-equipments-30',
        endpoints: [
            '/v1/news/list?domain=91infra.com&authorSlug=prathamverma&langCode=hi&categorySlug=construction-equipments&page=1&per-page=5&countryCode=in',
        ],
    },
    {
        label: 'News — by categories CE 0',
        tag: 'news-wp_postmeta:construction-equipments-0',
        endpoints: [
            '/v1/news/news-by-categories?domain=91infra.com&categories=construction-equipments&page=1&per-page=3&langCode=hi&countryCode=in',
        ],
    },
    {
        label: 'News — by model ashok-leyland-saathi',
        tag: 'news-wp_posts:91trucks.com-ashok-leyland-saathi',
        endpoints: [
            '/v1/news/news-by-model?brandSlug=ashok-leyland&modelSlug=saathi&domain=91trucks.com&langCode=en&categorySlug=trucks&countryCode=in',
        ],
    },
    {
        label: 'News — most read truck',
        tag: 'news-wp_posts-wp_postmeta:91trucks.com-truck',
        endpoints: [
            '/v1/news/most-read-news?langCode=en&page=1&per-page=10&sort=&domain=91trucks.com&category=truck&countryCode=in&cache=0',
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
            '/v1/cities?countryCode=in',
        ],
    },
    {
        label: 'City — popular (is_popular=1)',
        tag: 'city:1',
        endpoints: [
            '/v1/cities?is_popular=1&countryCode=in',
        ],
    },
    {
        label: 'City — EV charging station jaipur',
        tag: 'ev_charging_station:new-delhi',
        endpoints: [
            '/v1/city/electric-charging-station?slug=new-delhi',
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
        label: 'City — datia (detail)',
        tag: 'city:datia',
        endpoints: [
            '/v1/city/detail?slug=datia&langCode=en&countryCode=in',
        ],
    },
    {
        label: 'City — near-by pune',
        tag: 'city-locality:pune',
        endpoints: [
            '/v1/city/near-by-cities?citySlug=pune&limit=1&langCode=en&countryCode=in',
        ],
    },
    {
        label: 'City — by lat-long IP',
        tag: 'city',
        endpoints: [
            '/v1/city/city-by-lat-long-ip?ip=125.63.99.74&countryCode=in&cache=0',
        ],
    },
    {
        label: 'City — auto-expo event city',
        tag: 'city-autoexpo_events:the-auto-expo-motor-show-2025',
        endpoints: [
            '/v1/city/auto-expo-event-city?autoExpoSlug=the-auto-expo-motor-show-2025',
        ],
    },
    {
        label: 'City — search',
        tag: 'city',
        endpoints: [
            '/v1/city/search?q=&langCode=en&countryCode=in',
        ],
    },
    {
        label: 'City — top-tier hyderabad',
        tag: 'city:hyderabad',
        endpoints: [
            '/v1/city/top-tier-cities?citySlug=hyderabad&langCode=hi',
        ],
    },
];

// ──────────────────────────────────────────────────────────────────────
// AUTO-EXPO
// ──────────────────────────────────────────────────────────────────────
export const AUTO_EXPO_TAGS: CacheTagConfig[] = [
    {
        label: 'Auto-Expo — updates',
        tag: 'autoexpo_updates',
        endpoints: [
            '/v1/site/autoexpo-updates',
        ],
    },
];

// ──────────────────────────────────────────────────────────────────────
// STORE (Inventory)
// ──────────────────────────────────────────────────────────────────────
export const STORE_TAGS: CacheTagConfig[] = [
    {
        label: 'Store — inventory all',
        tag: 'store-inventory:all',
        endpoints: [
            '/v1/inventory/stores?countryCode=in',
        ],
    },
];

// ──────────────────────────────────────────────────────────────────────
// COMPARE
// ──────────────────────────────────────────────────────────────────────
export const COMPARE_TAGS: CacheTagConfig[] = [
    {
        label: 'Compare — bolero-pickup vs tata-407-gold-29wb (model tag)',
        tag: 'compare:model-bolero-pickup:model-tata-407-gold-29wb',
        endpoints: [
            '/v1/compare/index?compareString=mahindra-bolero-pickup-vs-tata-tata-407-gold-29wb&categorySlug=trucks&langCode=en&variants=&countryCode=in',
        ],
    },
    {
        label: 'Compare — models-trucks bolero-pickup vs tata-407-gold-29wb (redis key)',
        tag: 'compare:models-trucks-mahindra-bolero-pickup-vs-tata-tata-407-gold-29wb-en-in',
        endpoints: [
            '/v1/compare/index?compareString=mahindra-bolero-pickup-vs-tata-tata-407-gold-29wb&categorySlug=trucks&langCode=en&variants=&countryCode=in',
        ],
    },
];
