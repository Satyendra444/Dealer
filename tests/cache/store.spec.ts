import { test, expect } from '@playwright/test';
import { STORE_TAGS } from '../../src/data/cache-tags';
import {
    invalidateCache,
    verifyNoUnrelatedKeysDeleted,
    getSpotCheckEndpoints,
    callAndSnapshot,
} from '../../src/utils/api-helper';
import { logger } from '../../src/utils/logger';

test.describe('🏬 Store — Cache Invalidation', () => {
    for (const config of STORE_TAGS) {
        test.describe(config.label, () => {

            test(`Invalidation lifecycle for tag="${config.tag}"`, async ({ request }) => {
                logger.banner(`STORE CACHE TEST — ${config.label}`);

                // NOTE: No direct functional endpoint for store-inventory available.
                // We test invalidation success and no unrelated key deletion.

                // ── STEP 1: Pre-check — Snapshot unrelated modules ──
                logger.separator('STEP 1 — Pre-check Unrelated Modules');
                const spotChecks = getSpotCheckEndpoints('store');
                const preSnapshots: { path: string; label: string; body: unknown }[] = [];
                for (const check of spotChecks) {
                    const snap = await callAndSnapshot(request, check.path);
                    expect(snap.status).toBe(200);
                    preSnapshots.push({ ...check, body: snap.body });
                    logger.pass(`Pre-check OK: ${check.label}`);
                }

                // ── STEP 2: Call Invalidate API ──
                logger.separator('STEP 2 — Call Invalidate API');
                const invalidation = await invalidateCache(request, config.tag);
                expect(invalidation.status, 'Invalidation should return 200').toBe(200);
                logger.pass(`Invalidation returned status ${invalidation.status}`);

                // ── STEP 3: Verify no unrelated keys deleted ──
                logger.separator('STEP 3 — Verify No Unrelated Keys Deleted');
                for (const pre of preSnapshots) {
                    const post = await callAndSnapshot(request, pre.path);
                    expect(post.status).toBe(200);
                    expect(post.body, `${pre.label} data should be unchanged after store invalidation`).toEqual(pre.body);
                    logger.pass(`Unrelated module intact: ${pre.label}`);
                }

                logger.banner('STORE CACHE TEST — PASSED ✅');
            });

        });
    }
});
