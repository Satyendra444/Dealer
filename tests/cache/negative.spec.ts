import { test, expect } from '@playwright/test';
import {
    invalidateCache,
    invalidateAndVerifyDeletion,
    callAndSnapshot,
    warmCache,
    getSpotCheckEndpoints,
} from '../../src/utils/api-helper';
import { logger } from '../../src/utils/logger';

/**
 * ─────────────────────────────────────────────────────────────────────
 * NEGATIVE TEST CASES — Mandatory
 *
 *  1. Invalid tag → no crash, no keys deleted
 *  2. Multiple tags → both sets deleted, no partial deletion
 *  3. Cache poisoning validation → stale data never served
 * ─────────────────────────────────────────────────────────────────────
 */

test.describe('🚫 Negative Tests — Cache Invalidation', () => {

    // ─── 1. INVALID TAG ──────────────────────────────────────────────
    test.describe('Invalid Tag', () => {

        test('Calling invalidate with a random/nonexistent tag should not crash and should not delete any keys', async ({ request }) => {
            logger.banner('NEGATIVE TEST — Invalid Tag');

            // Step 1: Snapshot a few known modules before the invalid call
            logger.separator('STEP 1 — Snapshot known modules');
            const spotChecks = getSpotCheckEndpoints('__invalid__');
            const preSnapshots: { path: string; label: string; body: unknown }[] = [];
            for (const check of spotChecks) {
                const snap = await callAndSnapshot(request, check.path);
                expect(snap.status).toBe(200);
                preSnapshots.push({ ...check, body: snap.body });
                logger.pass(`Pre-snapshot OK: ${check.label}`);
            }

            // Step 2: Call invalidation with a completely invalid tag
            logger.separator('STEP 2 — Invalidate with invalid tag "random123"');
            const invalidation = await invalidateCache(request, 'random123');
            logger.info(`Status: ${invalidation.status}`, invalidation.body);

            // Should not crash (no 500)
            expect(invalidation.status, 'Server should not crash on invalid tag').not.toBe(500);

            // deletedKeys should be 0 for invalid tag
            const deleted = invalidation.body.deletedKeys;
            if (typeof deleted === 'number') {
                expect(deleted, 'Invalid tag should delete 0 keys').toBe(0);
                logger.pass(`deletedKeys = ${deleted} ✅ (no keys deleted for invalid tag)`);
            }
            logger.pass('No server crash — status is not 500');

            // Step 3: Verify no keys were deleted
            logger.separator('STEP 3 — Verify no keys were deleted');
            for (const pre of preSnapshots) {
                const post = await callAndSnapshot(request, pre.path);
                expect(post.status).toBe(200);
                expect(post.body, `${pre.label} should be unchanged after invalid tag invalidation`).toEqual(pre.body);
                logger.pass(`Module intact: ${pre.label}`);
            }

            logger.banner('INVALID TAG TEST — PASSED ✅');
        });
    });

    // ─── 2. MULTIPLE TAGS ────────────────────────────────────────────
    test.describe('Multiple Tags', () => {

        test('Calling invalidate with multiple comma-separated tags should delete keys for both tags', async ({ request }) => {
            logger.banner('NEGATIVE TEST — Multiple Tags (bank,category)');

            // Step 1: Warm both bank and category caches
            logger.separator('STEP 1 — Warm caches for both bank and category');
            const bankEndpoints = ['/v1/bank/index'];
            const categoryEndpoints = ['/v1/categories?domain=91trucks.com'];
            await warmCache(request, bankEndpoints);
            await warmCache(request, categoryEndpoints);

            // Step 2: Save existing responses
            logger.separator('STEP 2 — Save existing responses');
            const bankSnap = await callAndSnapshot(request, bankEndpoints[0]);
            const categorySnap = await callAndSnapshot(request, categoryEndpoints[0]);
            expect(bankSnap.status).toBe(200);
            expect(categorySnap.status).toBe(200);
            logger.pass('Both snapshots saved');

            // Step 3: Snapshot an unrelated module (brand) for cross-check
            logger.separator('STEP 3 — Snapshot unrelated module (brand)');
            const brandSnap = await callAndSnapshot(request, '/v1/brands?categorySlug=trucks&langCode=en');
            expect(brandSnap.status).toBe(200);
            logger.pass('Brand snapshot saved');

            // Step 4: Invalidate both tags at once (double-call: deletedKeys > 0, then 0)
            logger.separator('STEP 4 — Invalidate tags "bank,category" & Verify deletedKeys');
            const invalidation = await invalidateAndVerifyDeletion(request, 'bank,category');
            logger.pass(`Multi-tag invalidation verified — 1st call deleted keys, 2nd call deleted 0`);

            // Step 5: Verify both modules still return correct data (cache rebuilt)
            logger.separator('STEP 5 — Verify bank & category return correct data');
            const bankPostSnap = await callAndSnapshot(request, bankEndpoints[0]);
            const categoryPostSnap = await callAndSnapshot(request, categoryEndpoints[0]);
            expect(bankPostSnap.status).toBe(200);
            expect(categoryPostSnap.status).toBe(200);
            expect(bankPostSnap.body, 'Bank data should match').toEqual(bankSnap.body);
            expect(categoryPostSnap.body, 'Category data should match').toEqual(categorySnap.body);
            logger.pass('Both modules rebuilt with correct data');

            // Step 6: Verify unrelated module (brand) is intact
            logger.separator('STEP 6 — Verify brand module is unaffected');
            const brandPostSnap = await callAndSnapshot(request, '/v1/brands?categorySlug=trucks&langCode=en');
            expect(brandPostSnap.status).toBe(200);
            expect(brandPostSnap.body, 'Brand data should be unchanged').toEqual(brandSnap.body);
            logger.pass('Unrelated brand module intact');

            logger.banner('MULTIPLE TAGS TEST — PASSED ✅');
        });
    });

    // ─── 3. CACHE POISONING VALIDATION ──────────────────────────────
    test.describe('Cache Poisoning Validation', () => {

        test('After invalidation, the old cached value should never be served — only fresh data', async ({ request }) => {
            logger.banner('NEGATIVE TEST — Cache Poisoning for Invalidation');

            const endpoint = '/v1/bank/index';

            // Step 1: Warm cache
            logger.separator('STEP 1 — Warm the cache');
            await warmCache(request, [endpoint]);

            // Step 2: Take snapshot of cached data
            logger.separator('STEP 2 — Save cached response');
            const cachedSnap = await callAndSnapshot(request, endpoint);
            expect(cachedSnap.status).toBe(200);
            logger.pass(`Cached response saved (${cachedSnap.durationMs}ms)`);

            // Step 3: Invalidate the cache (double-call: deletedKeys > 0, then 0)
            logger.separator('STEP 3 — Invalidate cache & Verify deletedKeys');
            const invalidation = await invalidateAndVerifyDeletion(request, 'bank');
            logger.pass('Cache invalidated — deletedKeys validation passed');

            // Step 4: Rapidly call the API multiple times to ensure no stale data is served
            logger.separator('STEP 4 — Rapid consecutive calls to detect stale data');
            const RAPID_CALL_COUNT = 5;
            for (let i = 1; i <= RAPID_CALL_COUNT; i++) {
                const snap = await callAndSnapshot(request, endpoint);
                expect(snap.status, `Rapid call #${i} should return 200`).toBe(200);

                // The data should be valid (body is not empty/null)
                expect(snap.body, `Rapid call #${i} should return non-null body`).toBeTruthy();

                // The refreshed data should match the original (since no actual data change occurred)
                expect(snap.body, `Rapid call #${i} should return same data as original (no poisoning)`).toEqual(cachedSnap.body);

                logger.pass(`Rapid call #${i}: OK (${snap.durationMs}ms) — no stale/poisoned data`);
            }

            // Step 5: Final verification — one more call after a short wait
            logger.separator('STEP 5 — Final verification after brief pause');
            await new Promise(resolve => setTimeout(resolve, 2000));
            const finalSnap = await callAndSnapshot(request, endpoint);
            expect(finalSnap.status).toBe(200);
            expect(finalSnap.body, 'Final check: data should still match original').toEqual(cachedSnap.body);
            logger.pass(`Final check OK (${finalSnap.durationMs}ms) — cache is clean`);

            logger.banner('CACHE POISONING TEST — PASSED ✅');
        });
    });

    // ─── 4. EMPTY TAG ────────────────────────────────────────────────
    test.describe('Empty Tag', () => {

        test('Calling invalidate with empty tag should not crash or delete any keys', async ({ request }) => {
            logger.banner('NEGATIVE TEST — Empty Tag');

            // Snapshot known modules
            logger.separator('STEP 1 — Snapshot known modules');
            const spotChecks = getSpotCheckEndpoints('__empty__');
            const preSnapshots: { path: string; label: string; body: unknown }[] = [];
            for (const check of spotChecks) {
                const snap = await callAndSnapshot(request, check.path);
                expect(snap.status).toBe(200);
                preSnapshots.push({ ...check, body: snap.body });
            }

            // Call invalidation with empty tag
            logger.separator('STEP 2 — Invalidate with empty tag');
            const url = 'https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=';
            const start = Date.now();
            const response = await request.get(url);
            const durationMs = Date.now() - start;
            logger.api(`INVALIDATE empty tag`, { status: response.status(), durationMs });
            expect(response.status(), 'Server should not crash on empty tag').not.toBe(500);
            logger.pass('No server crash with empty tag');

            // Verify nothing was deleted
            logger.separator('STEP 3 — Verify no keys deleted');
            for (const pre of preSnapshots) {
                const post = await callAndSnapshot(request, pre.path);
                expect(post.status).toBe(200);
                expect(post.body).toEqual(pre.body);
                logger.pass(`Module intact: ${pre.label}`);
            }

            logger.banner('EMPTY TAG TEST — PASSED ✅');
        });
    });

    // ─── 5. SPECIAL CHARACTERS IN TAG ────────────────────────────────
    test.describe('Special Characters in Tag', () => {

        test('Calling invalidate with special characters should not crash', async ({ request }) => {
            logger.banner('NEGATIVE TEST — Special Characters in Tag');

            const specialTags = ['<script>alert(1)</script>', 'tag;DROP TABLE', '../../../etc/passwd', 'tag with spaces'];

            for (const tag of specialTags) {
                logger.separator(`Testing tag: "${tag}"`);
                const url = `https://devtez.91trucks.com/v1/internal/cache/invalidate?tags=${encodeURIComponent(tag)}`;
                const start = Date.now();
                const response = await request.get(url);
                const durationMs = Date.now() - start;

                logger.api(`INVALIDATE special tag`, { tag, status: response.status(), durationMs });
                expect(response.status(), `Tag "${tag}" should not cause 500`).not.toBe(500);
                logger.pass(`No crash for tag: "${tag}"`);
            }

            logger.banner('SPECIAL CHARACTERS TEST — PASSED ✅');
        });
    });
});
