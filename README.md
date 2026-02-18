# 🔄 Redis Cache Invalidation — Playwright Test Suite

Automated API-level tests that validate the full Redis cache **warm → invalidate → rebuild** lifecycle on `devtez.91trucks.com`.

---

## 📦 Setup

```bash
npm install
```

---

## 🚀 Run Tests

```bash
# Run all cache invalidation tests
npm test

# Run a specific tag group
npx playwright test tests/cache/bank.spec.ts
npx playwright test tests/cache/seo.spec.ts
npx playwright test tests/cache/negative.spec.ts

# Verbose list output
npm run test:list

# Open HTML report
npm run test:report
```

---

## 🗂️ Project Structure

```
├── playwright.config.ts           # Playwright config (baseURL: devtez.91trucks.com)
├── src/
│   ├── utils/
│   │   ├── api-helper.ts          # Core helpers: warm, snapshot, invalidate, verify
│   │   └── logger.ts              # Color-coded [STEP]/[PASS]/[FAIL] console logger
│   └── data/
│       └── cache-tags.ts          # Tag → endpoint mapping for all modules
└── tests/cache/
    ├── bank.spec.ts               # 🏦 Bank (listing, detail)
    ├── banner.spec.ts             # 🖼️ Banner (construction-equipments)
    ├── brand.spec.ts              # 🏷️ Brand (trucks, trucks-tata, dealer listing)
    ├── category.spec.ts           # 📂 Category (all, domain, trucks detail)
    ├── city.spec.ts               # 🏙️ City (all, popular, EV, state, detail, nearby, lat-long, auto-expo, search, top-tier)
    ├── dealer.spec.ts             # 🏪 Dealer (listing, popular, count, list-by-brand-city)
    ├── faq.spec.ts                # ❓ FAQ (category, model)
    ├── seo.spec.ts                # 🔍 SEO (home, category, variant, model, dealer, static-page, filter)
    ├── news.spec.ts               # 📰 News (author, detail, listing, categories, model, most-read)
    ├── store.spec.ts              # 🏬 Store (inventory)
    ├── navigation.spec.ts         # 🧭 Navigation (site menu)
    ├── rating.spec.ts             # ⭐ Rating (index, types)
    ├── qna.spec.ts                # 💬 QnA (question-model)
    ├── careers.spec.ts            # 💼 Careers (department, role)
    ├── auto-expo.spec.ts          # 🎪 Auto-Expo (updates)
    ├── state.spec.ts              # 📍 State (list)
    ├── video.spec.ts              # 🎬 Video (shorts)
    ├── site-home.spec.ts          # 🏠 Site Home (91infra)
    ├── compare.spec.ts            # ⚖️ Compare (models)
    └── negative.spec.ts           # 🚫 Negative (invalid tag, multi-tag, poisoning, empty, special chars)
```

---

## 🔁 Standard 6-Step Process (Per Tag)

Every tag test follows this exact flow:

| Step | Action | What We Verify |
|------|--------|----------------|
| **1** | **Warm the cache** — call functional API(s) | API returns `200`, cache is populated |
| **2** | **Save existing response** — re-call & snapshot | Data is correct, response is fast (cached) |
| **3** | **Call invalidate API** — `GET /v1/internal/cache/invalidate?tags=<tag>` | Status `200`, success message |
| **4** | **Verify keys deleted** — re-call API (indirect check) | API still works, data served from source |
| **5** | **Verify cache rebuilt** — compare response body to snapshot | Same data returned, no stale values |
| **6** | **Cross-check unrelated modules** — spot-check 3 other modules | No collateral key deletion |

---

## 🧪 Manual Testing Reference — All Tags (Invalidation + Functional API)

> For each tag: **first call the Functional API** to warm the cache, then **call the Invalidation API** to purge it, then call the Functional API again to verify rebuild.

---

### 🏦 BANK

**Tag: `bank`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=bank`
- Functional: `https://devtez.91trucks.com/v1/bank/index`

**Tag: `bank:hdfc-bank`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=bank:hdfc-bank`
- Functional: `https://devtez.91trucks.com/v1/bank/detail?slug=hdfc-bank`

---

### 🖼️ BANNER

**Tag: `banner:construction-equipments`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=banner:construction-equipments`
- Functional: `https://devtez.91trucks.com/v1/banners?_format=json&categorySlug=construction-equipments&countryCode=in`

---

### 🏷️ BRAND

**Tag: `brand:trucks`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=brand:trucks`
- Functional: `https://devtez.91trucks.com/v1/brands?categorySlug=trucks&langCode=en&limit=0&countryCode=in`

**Tag: `brand:trucks-tata`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=brand:trucks-tata`
- Functional: `https://devtez.91trucks.com/v1/brand/detail?categorySlug=trucks&slug=tata`

**Tag: `brand-category-dealer:8-in`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=brand-category-dealer:8-in`
- Functional: `https://devtez.91trucks.com/v1/brand/brand-list-for-dealers?categorySlug=buses&langCode=en&countryCode=in`

---

### 📂 CATEGORY

**Tag: `category`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=category`
- Functional: `https://devtez.91trucks.com/v1/categories`

**Tag: `category-domain:91trucks.com`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=category-domain:91trucks.com`
- Functional: `https://devtez.91trucks.com/v1/categories?domain=91trucks.com`

**Tag: `category:trucks`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=category:trucks`
- Functional: `https://devtez.91trucks.com/v1/category/detail?slug=trucks`

---

### 🏪 DEALER

**Tag: `dealer-category-brand-city:trucks`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=dealer-category-brand-city:trucks`
- Functional: `https://devtez.91trucks.com/v1/dealers?categorySlug=trucks&langCode=en&brandSlug=tata&citySlug=new-delhi&page=1&per-page=2&countryCode=in`

**Tag: `dealer-category-city:trucks`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=dealer-category-city:trucks`
- Functional: `https://devtez.91trucks.com/v1/dealers/popular-city-dealer?categorySlug=trucks&langCode=en`

**Tag: `dealer-city:trucks-ashok-leyland`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=dealer-city:trucks-ashok-leyland`
- Functional: `https://devtez.91trucks.com/v1/dealers/popular-city-count?categorySlug=trucks&langCode=en&brandSlug=ashok-leyland&countryCode=in`

**Tag: `dealer-brand-city:trucks`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=dealer-brand-city:trucks`
- Functional: `https://devtez.91trucks.com/v1/dealers/list-by-brand-city?categorySlug=trucks&brandSlug=tata&citySlug=new-delhi`

---

### 💼 CAREERS (Department / Role)

**Tag: `department`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=department`
- Functional: `https://devtez.91trucks.com/v1/departments?_format=json&countryCode=in`

**Tag: `role`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=role`
- Functional: `https://devtez.91trucks.com/v1/department/role?_format=json&countryCode=in&departmentId=7`

---

### ❓ FAQ

**Tag: `faq-category:trucks`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=faq-category:trucks`
- Functional: `https://devtez.91trucks.com/v1/faqs?categorySlug=trucks&langCode=en&page=category&countryCode=in`

**Tag: `faq-model:7-1178`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=faq-model:7-1178`
- Functional: `https://devtez.91trucks.com/v1/faq/model?categorySlug=trucks&langCode=hi&page=model-price&brandSlug=tata&modelSlug=intra-v30&countryCode=in`

---

### 📍 STATE

**Tag: `state`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=state`
- Functional: `https://devtez.91trucks.com/v1/state/list`

---

### 🧭 NAVIGATION

**Tag: `domain-site_navigation:91trucks.com`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=domain-site_navigation:91trucks.com`
- Functional: `https://devtez.91trucks.com/v1/site/site-navigation-menu?slug=91trucks.com`

---

### 💬 QnA

**Tag: `question-model:trucks`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=question-model:trucks`
- Functional: `https://devtez.91trucks.com/v1/question/qna-by-category-and-search-keys?categorySlug=trucks&langCode=en&searchKey=dealers&countryCode=in`

---

### ⭐ RATING

**Tag: `rating:construction-equipments`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=rating:construction-equipments`
- Functional: `https://devtez.91trucks.com/v1/rating/index?&categorySlug=construction-equipments&_format=json&countryCode=in`

**Tag: `rating_type:trucks`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=rating_type:trucks`
- Functional: `https://devtez.91trucks.com/v1/rating/types?categorySlug=trucks`

---

### 🏠 SITE HOME

**Tag: `category-widget:null-91infra.com`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=category-widget:null-91infra.com`
- Functional: `https://devtez.91trucks.com/v1/site/home?domain=91infra.com&langCode=hi&countryCode=in`

---

### 🎬 VIDEO

**Tag: `category-brand-model-model_media:91trucks.com-trucks`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=category-brand-model-model_media:91trucks.com-trucks`
- Functional: `https://devtez.91trucks.com/v1/video/shorts?&domain=91trucks.com&categorySlug=trucks&brandSlug=&modelSlug=&limit=8&countryCode=in`

---

### 🔍 SEO

**Tag: `seo-home:91infra.com`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=seo-home:91infra.com`
- Functional: `https://devtez.91trucks.com/v1/seo/home?langCode=hi&domain=91infra.com&countryCode=in`

**Tag: `seo-category:buses`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=seo-category:buses`
- Functional: `https://devtez.91trucks.com/v1/seo/category?categorySlug=buses&langCode=hi&countryCode=in`

**Tag: `seo-model:modelSlug`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=seo-model:modelSlug`
- Functional: `https://devtez.91trucks.com/v1/seo/variant?categorySlug=trucks&langCode=hi&brandSlug=ashok-leyland&modelSlug=dost&variantSlug=ls&countryCode=in`

**Tag: `seo-model:modelSlug`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=seo-model:modelSlug`
- Functional: `https://devtez.91trucks.com/v1/seo/model?categorySlug=buses&langCode=hi&brandSlug=force&modelSlug=traveller-26&page=model&citySlug=new-delhi&countryCode=in`

**Tag: `seo-dealer:trucks`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=seo-dealer:trucks`
- Functional: `https://devtez.91trucks.com/v1/seo/dealer?categorySlug=trucks&langCode=en&type=dealers&brandSlug=ashok-leyland&citySlug=jaipur&countryCode=in`

**Tag: `seo-static-page:91trucks.com-privacy-policy`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=seo-static-page:91trucks.com-privacy-policy`
- Functional: `https://devtez.91trucks.com/v1/seo/static-pages?domain=91trucks.com&langCode=en&pageSlug=privacy-policy`

**Tag: `seo-filter`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=seo-filter`
- Functional: `https://devtez.91trucks.com/v1/listing/seo?categorySlug=trucks&langCode=hi&search=tata&countryCode=in`

---

### 📰 NEWS

**Tag: `news-wp_users-wp_usermeta:16`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=news-wp_users-wp_usermeta:16`
- Functional: `https://devtez.91trucks.com/v1/news/author-details?authorSlug=atul-singh&countryCode=in`

**Tag: `news-wp_postmeta:chinas-first-ever-self-driving-electric-tractor-is-a-farm-champion-heres-why`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=news-wp_postmeta:chinas-first-ever-self-driving-electric-tractor-is-a-farm-champion-heres-why`
- Functional: `https://devtez.91trucks.com/v1/news/details?slug=chinas-first-ever-self-driving-electric-tractor-is-a-farm-champion-heres-why&countryCode=in`

**Tag: `news-wp_postmeta:construction-equipments-30`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=news-wp_postmeta:construction-equipments-30`
- Functional: `https://devtez.91trucks.com/v1/news/list?domain=91infra.com&authorSlug=prathamverma&langCode=hi&categorySlug=construction-equipments&page=1&per-page=5&countryCode=in`

**Tag: `news-wp_postmeta:construction-equipments-0`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=news-wp_postmeta:construction-equipments-0`
- Functional: `https://devtez.91trucks.com/v1/news/news-by-categories?domain=91infra.com&categories=construction-equipments&page=1&per-page=3&langCode=hi&countryCode=in`

**Tag: `news-wp_posts:91trucks.com-ashok-leyland-saathi`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=news-wp_posts:91trucks.com-ashok-leyland-saathi`
- Functional: `https://devtez.91trucks.com/v1/news/news-by-model?brandSlug=ashok-leyland&modelSlug=saathi&domain=91trucks.com&langCode=en&categorySlug=trucks&countryCode=in`

**Tag: `news-wp_posts-wp_postmeta:91trucks.com-truck`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=news-wp_posts-wp_postmeta:91trucks.com-truck`
- Functional: `https://devtez.91trucks.com/v1/news/most-read-news?langCode=en&page=1&per-page=10&sort=&domain=91trucks.com&category=truck&countryCode=in&cache=0`

---

### 🏙️ CITY

**Tag: `city`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=city`
- Functional: `https://devtez.91trucks.com/v1/cities?countryCode=in`
- Functional: `https://devtez.91trucks.com/v1/city/city-by-lat-long-ip?ip=125.63.99.74&countryCode=in&cache=0`
- Functional: `https://devtez.91trucks.com/v1/city/search?q=&langCode=en&countryCode=in`

**Tag: `city:1`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=city:1`
- Functional: `https://devtez.91trucks.com/v1/cities?is_popular=1&countryCode=in`

**Tag: `ev_charging_station:jaipur`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=ev_charging_station:jaipur`
- Functional: `https://devtez.91trucks.com/v1/city/electric-charging-station?slug=jaipur`

**Tag: `city-state:2`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=city-state:2`
- Functional: `https://devtez.91trucks.com/v1/city/cities-by-state?stateId=2`

**Tag: `city:datia`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=city:datia`
- Functional: `https://devtez.91trucks.com/v1/city/detail?slug=datia&langCode=en&countryCode=in`

**Tag: `city-locality:pune`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=city-locality:pune`
- Functional: `https://devtez.91trucks.com/v1/city/near-by-cities?citySlug=pune&limit=1&langCode=en&countryCode=in`

**Tag: `city-autoexpo_events:the-auto-expo-motor-show-2025`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=city-autoexpo_events:the-auto-expo-motor-show-2025`
- Functional: `https://devtez.91trucks.com/v1/city/auto-expo-event-city?autoExpoSlug=the-auto-expo-motor-show-2025`

**Tag: `city:hyderabad`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=city:hyderabad`
- Functional: `https://devtez.91trucks.com/v1/city/top-tier-cities?citySlug=hyderabad&langCode=hi`

---

### 🎪 AUTO-EXPO

**Tag: `autoexpo_updates`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=autoexpo_updates`
- Functional: `https://devtez.91trucks.com/v1/site/autoexpo-updates`

---

### 🏬 STORE (Inventory)

**Tag: `store-inventory:all`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=store-inventory:all`
- Functional: `https://devtez.91trucks.com/v1/inventory/stores?countryCode=in`

---

### ⚖️ COMPARE

**Tag: `compare:model-bolero-pickup:model-tata-407-gold-29wb`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=compare:model-bolero-pickup:model-tata-407-gold-29wb`
- Functional: `https://devtez.91trucks.com/v1/compare/index?compareString=mahindra-bolero-pickup-vs-tata-tata-407-gold-29wb&categorySlug=trucks&langCode=en&variants=&countryCode=in`

**Tag: `compare:models-trucks-mahindra-bolero-pickup-vs-tata-tata-407-gold-29wb-en-in`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=compare:models-trucks-mahindra-bolero-pickup-vs-tata-tata-407-gold-29wb-en-in`
- Functional: `https://devtez.91trucks.com/v1/compare/index?compareString=mahindra-bolero-pickup-vs-tata-tata-407-gold-29wb&categorySlug=trucks&langCode=en&variants=&countryCode=in`

---

### 🚫 NEGATIVE (Multi-tag example)

**Tags: `bank,category`**
- Invalidate: `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=bank,category`
- Functional (bank): `https://devtez.91trucks.com/v1/bank/index`
- Functional (category): `https://devtez.91trucks.com/v1/categories`

---

## 🚫 Negative Test Cases

| Test | What It Validates |
|------|-------------------|
| **Invalid tag** (`random123`) | No crash, no keys deleted |
| **Multiple tags** (`bank,category`) | Both tag groups invalidated, no partial deletion |
| **Cache poisoning** | Rapid post-invalidation calls never return stale data |
| **Empty tag** | No crash, no keys deleted |
| **Special characters** (`<script>`, SQL injection, path traversal) | No crash, no 500 errors |

---

## 📊 Test Stats

- **Total Files:** 18 test specs
- **Tag Groups Covered:** 19 (Bank, Banner, Brand, Category, Dealer, Careers, FAQ, State, Navigation, QnA, Rating, Site Home, Video, SEO, News, City, Auto-Expo, Store, Compare) + Negative
- **Environment:** `https://devtez.91trucks.com`

---

## ⚠️ Important Notes

1. **Always warm cache before testing invalidation.** If cache is not populated, the test is invalid.
2. Tests hit the **live dev environment** — they do not mock anything.
3. Redis key verification is **indirect** (via API response comparison). For direct `KEYS *` checks, Redis CLI access is needed (contact Saksham or Viren).
4. Tests run **sequentially** (single worker) to avoid cache race conditions.
5. Each test has a **2-minute timeout** to handle slow API responses.

---

## 🛠️ Adding a New Tag

1. Add the tag config to `src/data/cache-tags.ts`
2. Create a new test file in `tests/cache/<module>.spec.ts` (copy any existing spec as template)
3. Run `npx playwright test tests/cache/<module>.spec.ts`
