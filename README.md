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
    ├── bank.spec.ts               # 🏦 Bank (list + detail)
    ├── banner.spec.ts             # 🖼️ Banner (construction-equipments)
    ├── brand.spec.ts              # 🏷️ Brand (trucks, trucks-tata, brand-category-dealer)
    ├── category.spec.ts           # 📂 Category (all, trucks, domain)
    ├── city.spec.ts               # 🏙️ City (all, datia, state, EV charging)
    ├── dealer.spec.ts             # 🏪 Dealer (category-brand-city, brand-city, city)
    ├── faq.spec.ts                # ❓ FAQ (category, model)
    ├── seo.spec.ts                # 🔍 SEO (home, category, variant, model, dealer, static-page, filter)
    ├── news.spec.ts               # 📰 News (wp_users, wp_postmeta, wp_posts)
    ├── store.spec.ts              # 🏬 Store (inventory)
    ├── navigation.spec.ts         # 🧭 Navigation (site menu)
    ├── rating.spec.ts             # ⭐ Rating (types + index)
    ├── qna.spec.ts                # 💬 QnA (category search)
    ├── careers.spec.ts            # 💼 Careers (departments + roles)
    ├── auto-expo.spec.ts          # 🎪 Auto-Expo (updates)
    ├── state.spec.ts              # 📍 State (list + EV unit price)
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
- Invalidate: https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=bank
- Functional: https://devtez.91trucks.com/v1/bank/index
- Functional: https://devtez.91trucks.com/v1/bank/detail?slug=hdfc-bank

---

### 🖼️ BANNER

**Tag: `banner:construction-equipments`**
- Invalidate: https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=banner:construction-equipments
- Functional: https://devtez.91trucks.com/v1/banners?_format=json&categorySlug=construction-equipments

---

### 🏷️ BRAND

**Tag: `brand:trucks-tata`**
- Invalidate: https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=brand:trucks-tata
- Functional: https://devtez.91trucks.com/v1/brand/detail?langCode=en&categorySlug=trucks&slug=tata

**Tag: `brand:trucks`**
- Invalidate: https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=brand:trucks
- Functional: https://devtez.91trucks.com/v1/brands?categorySlug=trucks&langCode=en

**Tag: `brand-category-dealer:8-in`**
- Invalidate: https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=brand-category-dealer:8-in
- Functional: https://devtez.91trucks.com/v1/brands?categorySlug=trucks&langCode=en

---

### 📂 CATEGORY

**Tag: `category`**
- Invalidate: https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=category
- Functional: https://devtez.91trucks.com/v1/categories?domain=91trucks.com

**Tag: `category:trucks`**
- Invalidate: https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=category:trucks
- Functional: https://devtez.91trucks.com/v1/category/detail?langCode=en&slug=trucks

**Tag: `category-domain:91trucks.com`**
- Invalidate: https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=category-domain:91trucks.com
- Functional: https://devtez.91trucks.com/v1/categories?domain=91trucks.com

---

### 🏙️ CITY

**Tag: `city`**
- Invalidate: https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=city
- Functional: https://devtez.91trucks.com/v1/cities?_format=json&langCode=en
- Functional: https://devtez.91trucks.com/v1/cities?is_popular=1

**Tag: `city:datia`**
- Invalidate: https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=city:datia
- Functional: https://devtez.91trucks.com/v1/city/detail?slug=datia&langCode=en

**Tag: `city-state:2`**
- Invalidate: https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=city-state:2
- Functional: https://devtez.91trucks.com/v1/city/cities-by-state?stateId=2

**Tag: `ev_charging_station:jaipur`**
- Invalidate: https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=ev_charging_station:jaipur
- Functional: https://devtez.91trucks.com/v1/city/electric-charging-station?slug=jaipur

---

### 🏪 DEALER

**Tag: `dealer-category-brand-city:trucks`**
- Invalidate: https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=dealer-category-brand-city:trucks
- Functional: https://devtez.91trucks.com/v1/dealers?categorySlug=trucks&langCode=en&brandSlug=tata&citySlug=new-delhi&page=1&per-page=10

**Tag: `dealer-brand-city:trucks`**
- Invalidate: https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=dealer-brand-city:trucks
- Functional: https://devtez.91trucks.com/v1/dealers?categorySlug=trucks&langCode=en&brandSlug=tata&citySlug=new-delhi&page=1&per-page=10

**Tag: `dealer-city:trucks-ashok-leyland`**
- Invalidate: https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=dealer-city:trucks-ashok-leyland
- Functional: https://devtez.91trucks.com/v1/dealers?categorySlug=trucks&langCode=en&brandSlug=ashok-leyland&citySlug=new-delhi&page=1&per-page=10

---

### ❓ FAQ

**Tag: `faq-category:trucks`**
- Invalidate: https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=faq-category:trucks
- Functional: https://devtez.91trucks.com/v1/faqs?categorySlug=trucks&langCode=en&page=category

**Tag: `faq-model:7-1178`**
- Invalidate: https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=faq-model:7-1178
- Functional: https://devtez.91trucks.com/v1/faqs?categorySlug=trucks&langCode=en&page=category

---

### 🔍 SEO (Very Important)

**Tag: `seo-home:91infra.com`**
- Invalidate: https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=seo-home:91trucks.com
- Functional: https://devtez.91trucks.com/v1/seo/category?categorySlug=trucks&langCode=en&countryCode=in

**Tag: `seo-category:trucks`**
- Invalidate: https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=seo-category:trucks
- Functional: https://devtez.91trucks.com/v1/seo/category?categorySlug=trucks&langCode=en&countryCode=in

**Tag: `seo-variant:trucks-ashok-leyland-dost-ls`**
- Invalidate: https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=seo-variant:trucks-ashok-leyland-dost-ls
- Functional: https://devtez.91trucks.com/v1/seo/category?categorySlug=trucks&langCode=en&countryCode=in

**Tag: `seo-model:1510`**
- Invalidate: https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=seo-model:1510
- Functional: https://devtez.91trucks.com/v1/seo/category?categorySlug=trucks&langCode=en&countryCode=in

**Tag: `seo-dealer:trucks`**
- Invalidate: https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=seo-dealer:trucks
- Functional: https://devtez.91trucks.com/v1/seo/category?categorySlug=trucks&langCode=en&countryCode=in

**Tag: `seo-static-page:91trucks.com-privacy-policy`**
- Invalidate: https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=seo-static-page:91trucks.com-privacy-policy
- Functional: https://devtez.91trucks.com/v1/seo/category?categorySlug=trucks&langCode=en&countryCode=in

**Tag: `seo-filter`**
- Invalidate: https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=seo-filter
- Functional: https://devtez.91trucks.com/v1/seo/category?categorySlug=trucks&langCode=en&countryCode=in

---

### 📰 NEWS

**Tag: `news-wp_users-wp_usermeta:16`**
- Invalidate: https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=news-wp_users-wp_usermeta:16
- Functional: _(no direct functional endpoint available)_

**Tag: `news-wp_postmeta:construction-equipments-30`**
- Invalidate: https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=news-wp_postmeta:construction-equipments-30
- Functional: _(no direct functional endpoint available)_

**Tag: `news-wp_posts:91trucks.com-ashok-leyland-saathi`**
- Invalidate: https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=news-wp_posts:91trucks.com-ashok-leyland-saathi
- Functional: _(no direct functional endpoint available)_

**Tag: `news-wp_posts-wp_postmeta:91trucks.com-truck`**
- Invalidate: https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=news-wp_posts-wp_postmeta:91trucks.com-truck
- Functional: _(no direct functional endpoint available)_

---

### 🏬 STORE

**Tag: `store-inventory:all`**
- Invalidate: https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=store-inventory:all
- Functional: _(no direct functional endpoint available)_

---

### 🧭 NAVIGATION

**Tag: `navigation`**
- Invalidate: https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=navigation
- Functional: https://devtez.91trucks.com/v1/site/site-navigation-menu?slug=91trucks.com

---

### ⭐ RATING

**Tag: `rating`**
- Invalidate: https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=rating
- Functional: https://devtez.91trucks.com/v1/rating/types?categorySlug=trucks
- Functional: https://devtez.91trucks.com/v1/rating/index?&categorySlug=trucks&_format=json

---

### 💬 QNA

**Tag: `qna`**
- Invalidate: https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=qna
- Functional: https://devtez.91trucks.com/v1/question/qna-by-category-and-search-keys?categorySlug=trucks&langCode=en&searchKey=trucks|model

---

### 💼 CAREERS

**Tag: `careers`**
- Invalidate: https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=careers
- Functional: https://devtez.91trucks.com/v1/departments?_format=json
- Functional: https://devtez.91trucks.com/v1/department/role?_format=json&countryCode=in&departmentId=5

---

### 🎪 AUTO-EXPO

**Tag: `auto-expo`**
- Invalidate: https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=auto-expo
- Functional: https://devtez.91trucks.com/v1/site/autoexpo-updates

---

### 📍 STATE

**Tag: `state`**
- Invalidate: https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=state
- Functional: https://devtez.91trucks.com/v1/state/list?langCode=en
- Functional: https://devtez.91trucks.com/v1/state/ev-state-wise-unit-price

---

### 🚫 NEGATIVE (Multi-tag example)

**Tags: `bank,category`**
- Invalidate: https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=bank,category
- Functional (bank): https://devtez.91trucks.com/v1/bank/index
- Functional (category): https://devtez.91trucks.com/v1/categories?domain=91trucks.com

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

- **Total Tests:** 40
- **Total Files:** 17
- **Tag Groups Covered:** 16 + negative cases
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
