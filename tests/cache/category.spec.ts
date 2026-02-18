import { test, expect } from '@playwright/test';
import { CATEGORY_TAGS } from '../../src/data/cache-tags';
import {
    warmCache,
    saveExistingResponse,
    invalidateCache,
    verifyCacheRebuilt,
    verifyNoUnrelatedKeysDeleted,
    getSpotCheckEndpoints,
} from '../../src/utils/api-helper';
import { logger } from '../../src/utils/logger';

test.describe('📂 Category — Cache Invalidation', () => {
    for (const config of CATEGORY_TAGS) {
        test.describe(config.label, () => {

            test(`Full cache lifecycle for tag="${config.tag}"`, async ({ request }) => {
                logger.banner(`CATEGORY CACHE TEST — ${config.label}`);

                // ── STEP 1: Warm the cache ──
                logger.separator('STEP 1 — Warm the Cache');
                const warmSnapshots = await warmCache(request, config.endpoints);
                expect(warmSnapshots.length).toBeGreaterThan(0);
                logger.pass('Cache warmed successfully');

                // ── STEP 2: Save existing response ──
                logger.separator('STEP 2 — Save Existing Response');
                const cachedSnapshots = await saveExistingResponse(request, config.endpoints);
                for (const snap of cachedSnapshots) {
                    expect(snap.status).toBe(200);
                    logger.info(`Cached response: ${snap.url} → ${snap.durationMs}ms`);
                }

                // ── STEP 3: Call Invalidate API ──
                logger.separator('STEP 3 — Call Invalidate API');
                const invalidation = await invalidateCache(request, config.tag);
                expect(invalidation.status, 'Invalidation should return 200').toBe(200);
                logger.pass(`Invalidation returned status ${invalidation.status}`);

                // ── STEP 4: Verify keys deleted (indirect) ──
                logger.separator('STEP 4 — Verify Keys Deleted (Indirect)');
                logger.info('Re-calling API to confirm cache purge and rebuild');

                // ── STEP 5: Verify cache rebuilt ──
                logger.separator('STEP 5 — Verify Cache Rebuilt');
                await verifyCacheRebuilt(request, config.endpoints, cachedSnapshots);
                logger.pass('Cache rebuilt — data matches pre-invalidation snapshot');

                // ── STEP 6: Verify no unrelated keys deleted ──
                logger.separator('STEP 6 — Verify No Unrelated Keys Deleted');
                const spotChecks = getSpotCheckEndpoints('category');
                await verifyNoUnrelatedKeysDeleted(request, 'category', spotChecks);
                logger.pass('No unrelated keys affected');

                logger.banner('CATEGORY CACHE TEST — PASSED ✅');
            });

        });
    }
});
