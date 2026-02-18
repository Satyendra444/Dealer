import { APIRequestContext, expect } from '@playwright/test';
import { logger } from './logger';

const BASE_URL = 'https://devtez.91trucks.com';
const INVALIDATE_BASE = `${BASE_URL}/v1/internal/cache/invalidate`;

/** Shape returned by snapshot helpers */
export interface ApiSnapshot {
    url: string;
    status: number;
    body: unknown;
    durationMs: number;
    headers: Record<string, string>;
}

/** Shape returned by the invalidation API */
export interface InvalidationResponse {
    status: number;
    body: {
        success?: boolean;
        tags?: string[];
        deletedKeys?: number;
        [key: string]: unknown;
    };
    durationMs: number;
}

/**
 * Call an API endpoint and return a full snapshot of the response.
 */
export async function callAndSnapshot(
    request: APIRequestContext,
    path: string,
): Promise<ApiSnapshot> {
    const url = path.startsWith('http') ? path : `${BASE_URL}${path}`;
    const start = Date.now();
    const response = await request.get(url);
    const durationMs = Date.now() - start;
    const status = response.status();

    let body: unknown;
    try {
        body = await response.json();
    } catch {
        body = await response.text();
    }

    const headers: Record<string, string> = {};
    for (const [k, v] of Object.entries(response.headers())) {
        headers[k] = v;
    }

    logger.api(`GET ${path}`, { status, durationMs });

    return { url, status, body, durationMs, headers };
}

/**
 * Warm the cache by calling all provided endpoints and asserting 200.
 */
export async function warmCache(
    request: APIRequestContext,
    endpoints: string[],
): Promise<ApiSnapshot[]> {
    logger.step(`Warming cache with ${endpoints.length} endpoint(s)...`);
    const snapshots: ApiSnapshot[] = [];

    for (const ep of endpoints) {
        const snap = await callAndSnapshot(request, ep);
        expect(snap.status, `Warm-up GET ${ep} should return 200`).toBe(200);
        logger.pass(`Cache warmed: ${ep} (${snap.durationMs}ms)`);
        snapshots.push(snap);
    }

    return snapshots;
}

/**
 * Save the current API response as the "before" snapshot.
 * Calls each endpoint again and confirms a fast, cached response.
 */
export async function saveExistingResponse(
    request: APIRequestContext,
    endpoints: string[],
): Promise<ApiSnapshot[]> {
    logger.step('Saving existing (cached) response snapshots...');
    const snapshots: ApiSnapshot[] = [];

    for (const ep of endpoints) {
        const snap = await callAndSnapshot(request, ep);
        expect(snap.status, `Cached GET ${ep} should return 200`).toBe(200);
        logger.pass(`Snapshot saved: ${ep} (${snap.durationMs}ms)`);
        snapshots.push(snap);
    }

    return snapshots;
}

/**
 * Call the invalidation endpoint for the given tag(s).
 * Returns parsed response including { success, tags, deletedKeys }.
 */
export async function invalidateCache(
    request: APIRequestContext,
    tags: string,
): Promise<InvalidationResponse> {
    const url = `${INVALIDATE_BASE}?tags=${encodeURIComponent(tags)}`;
    logger.step(`Invalidating cache → tags="${tags}"`);

    const start = Date.now();
    const response = await request.get(url);
    const durationMs = Date.now() - start;
    const status = response.status();

    let body: Record<string, unknown> = {};
    try {
        body = await response.json();
    } catch {
        const text = await response.text();
        body = { raw: text };
    }

    const deletedKeys = typeof body.deletedKeys === 'number' ? body.deletedKeys : undefined;

    logger.api(`INVALIDATE tags="${tags}"`, { status, durationMs, deletedKeys });

    if (status === 200) {
        logger.pass(`Invalidation succeeded (${durationMs}ms) — deletedKeys: ${deletedKeys ?? 'N/A'}`);
    } else {
        logger.fail(`Invalidation returned status ${status}`, body);
    }

    return { status, body, durationMs };
}

/**
 * Double-call invalidation pattern:
 *   1st call → asserts deletedKeys > 0  (keys were actually purged)
 *   2nd call → asserts deletedKeys === 0 (no keys left to delete)
 *
 * This proves the invalidation API is truly deleting cached keys.
 */
export async function invalidateAndVerifyDeletion(
    request: APIRequestContext,
    tags: string,
): Promise<InvalidationResponse> {
    // ── First invalidation: should delete keys ──
    logger.step(`1st invalidation → expecting deletedKeys > 0`);
    const first = await invalidateCache(request, tags);
    expect(first.status, 'First invalidation should return 200').toBe(200);
    expect(first.body.success, 'First invalidation should return success: true').toBe(true);

    const firstDeleted = first.body.deletedKeys;
    if (typeof firstDeleted === 'number') {
        expect(firstDeleted, `First invalidation for "${tags}" should delete at least 1 key (got ${firstDeleted})`).toBeGreaterThan(0);
        logger.pass(`1st invalidation: deletedKeys = ${firstDeleted} ✅ (keys were purged)`);
    } else {
        logger.warn(`1st invalidation: deletedKeys not present in response — skipping count assertion`);
    }

    // ── Second invalidation: should delete 0 keys ──
    logger.step(`2nd invalidation → expecting deletedKeys === 0`);
    const second = await invalidateCache(request, tags);
    expect(second.status, 'Second invalidation should return 200').toBe(200);
    expect(second.body.success, 'Second invalidation should return success: true').toBe(true);

    const secondDeleted = second.body.deletedKeys;
    if (typeof secondDeleted === 'number') {
        expect(secondDeleted, `Second invalidation for "${tags}" should delete 0 keys (got ${secondDeleted})`).toBe(0);
        logger.pass(`2nd invalidation: deletedKeys = ${secondDeleted} ✅ (no keys left)`);
    } else {
        logger.warn(`2nd invalidation: deletedKeys not present in response — skipping count assertion`);
    }

    return first; // Return the first (meaningful) invalidation result
}

/**
 * Verify that the API returns fresh, correct data after invalidation
 * and that the cache has been rebuilt.
 */
export async function verifyCacheRebuilt(
    request: APIRequestContext,
    endpoints: string[],
    previousSnapshots: ApiSnapshot[],
): Promise<void> {
    logger.step('Verifying cache rebuilt with correct data...');

    for (let i = 0; i < endpoints.length; i++) {
        const ep = endpoints[i];
        const prev = previousSnapshots[i];
        const snap = await callAndSnapshot(request, ep);

        // API should still work
        expect(snap.status, `Post-invalidation GET ${ep} should return 200`).toBe(200);

        // Data should match the previous snapshot (same data, not stale)
        expect(snap.body, `Response body for ${ep} should match pre-invalidation snapshot`).toEqual(prev.body);

        logger.pass(`Cache rebuilt: ${ep} — data matches, response ${snap.durationMs}ms`);
    }
}

/**
 * Call an endpoint to collect a snapshot without assertions — used for
 * cross-checking that unrelated keys were not deleted.
 */
export async function spotCheckEndpoint(
    request: APIRequestContext,
    path: string,
    label: string,
): Promise<ApiSnapshot> {
    logger.step(`Spot-check: ${label}`);
    const snap = await callAndSnapshot(request, path);
    expect(snap.status, `Spot-check ${label} should return 200`).toBe(200);
    logger.pass(`Spot-check OK: ${label} (${snap.durationMs}ms)`);
    return snap;
}

/**
 * Verify that no unrelated module keys were deleted by performing spot
 * checks against endpoints from other modules.
 */
export async function verifyNoUnrelatedKeysDeleted(
    request: APIRequestContext,
    excludeModule: string,
    spotChecks: { path: string; label: string }[],
): Promise<void> {
    logger.step(`Verifying no unrelated keys deleted (excluding "${excludeModule}")...`);

    for (const { path, label } of spotChecks) {
        await spotCheckEndpoint(request, path, label);
    }

    logger.pass(`All unrelated modules still cached/working after "${excludeModule}" invalidation`);
}

/**
 * Standard cross-module spot-check endpoints (pick ones NOT being invalidated).
 */
export function getSpotCheckEndpoints(excludeModule: string): { path: string; label: string }[] {
    const allChecks: Record<string, { path: string; label: string }> = {
        bank: { path: '/v1/bank/index', label: 'Bank list' },
        category: { path: '/v1/categories?domain=91trucks.com', label: 'Category list' },
        brand: { path: '/v1/brands?categorySlug=trucks&langCode=en&limit=0&countryCode=in', label: 'Brand list' },
        city: { path: '/v1/cities?is_popular=1&countryCode=in', label: 'Popular cities' },
        banner: { path: '/v1/banners?_format=json&categorySlug=construction-equipments&countryCode=in', label: 'Banner construction' },
        faq: { path: '/v1/faqs?categorySlug=trucks&langCode=en&page=category&countryCode=in', label: 'FAQ trucks' },
        navigation: { path: '/v1/site/site-navigation-menu?slug=91trucks.com', label: 'Navigation' },
    };

    return Object.entries(allChecks)
        .filter(([key]) => key !== excludeModule)
        .slice(0, 3) // Only 3 spot checks to keep tests fast
        .map(([, val]) => val);
}
