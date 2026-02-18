import { test, expect } from '@playwright/test';
import { BANK_TAGS } from '../../src/data/cache-tags';
import {
    warmCache,
    saveExistingResponse,
    invalidateCache,
    verifyCacheRebuilt,
    verifyNoUnrelatedKeysDeleted,
    getSpotCheckEndpoints,
} from '../../src/utils/api-helper';
import { logger } from '../../src/utils/logger';

test.describe('🏦 Bank — Cache Invalidation', () => {
    for (const config of BANK_TAGS) {
        test.describe(config.label, () => {

            test(`Full cache lifecycle for tag="${config.tag}"`, async ({ request }) => {
                logger.banner(`BANK CACHE TEST — ${config.label}`);

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

                // ── STEP 4: Verify Redis keys deleted (indirect — API returns fresh data) ──
                logger.separator('STEP 4 — Verify Keys Deleted (Indirect)');
                logger.info('Since we cannot access Redis CLI directly, we verify by re-calling the API');
                logger.info('A successful re-call confirms the cache was rebuilt from source');

                // ── STEP 5: Call Functional API Again — Verify cache rebuilt ──
                logger.separator('STEP 5 — Verify Cache Rebuilt');
                await verifyCacheRebuilt(request, config.endpoints, cachedSnapshots);
                logger.pass('Cache rebuilt — data matches pre-invalidation snapshot');

                // ── STEP 6: Verify no unrelated keys deleted ──
                logger.separator('STEP 6 — Verify No Unrelated Keys Deleted');
                const spotChecks = getSpotCheckEndpoints('bank');
                await verifyNoUnrelatedKeysDeleted(request, 'bank', spotChecks);
                logger.pass('No unrelated keys affected');

                logger.banner('BANK CACHE TEST — PASSED ✅');
            });

        });
    }
});
