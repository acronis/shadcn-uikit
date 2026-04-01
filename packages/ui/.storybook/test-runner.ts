import type { TestRunnerConfig } from '@storybook/test-runner';
import { getStoryContext } from '@storybook/test-runner';
import * as process from 'node:process';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

const config: TestRunnerConfig = {
    setup() {
        expect.extend({ toMatchImageSnapshot });
    },
    async postVisit(page, context) {
        // Wait for fonts and images to load
        await page.waitForLoadState('networkidle');

        // For portal-based overlays (dialog, sheet, etc.) the content renders outside
        // #storybook-root, so screenshot the overlay element directly. Otherwise
        // screenshot the story root element with padding.
        // Give Sonner's enter animation time to settle (animations: 'disabled' only
        // affects Playwright's screenshot, not Sonner's CSS transitions in the page)
        await page.waitForTimeout(400);

        const storyContext = await getStoryContext(page, context);
        const snapshotFullPage = storyContext.parameters?.snapshot?.fullPage === true;

        // If a Sonner <Toaster> is mounted, give the toast up to 1.5 s to appear.
        // The play function's DOM click is not awaited, so React state updates may
        // not have settled yet by the time postVisit runs.
        const sonnerContainer = page.locator('[data-sonner-toaster]');
        if ((await sonnerContainer.count()) > 0) {
            await page.locator('[data-sonner-toaster]:has([data-sonner-toast])')
                .waitFor({ state: 'attached', timeout: 1500 })
                .catch(() => {}); // silence timeout — no toast is a valid state
        }

        const toaster = page.locator('[data-sonner-toaster]:has([data-sonner-toast])');
        const hasToasts = (await toaster.count()) > 0;

        let image: Buffer;
        if (hasToasts || snapshotFullPage) {
            // Toasts render in a fixed portal, and some stories are too tall for the
            // default viewport — screenshot the full page so nothing is clipped.
            image = await page.screenshot({ animations: 'disabled', fullPage: true });
        } else {
            const overlay = page.locator('[role="dialog"], [role="alertdialog"], [role="menu"], [role="listbox"]').first();
            const hasOverlay = (await overlay.count()) > 0;
            const target = hasOverlay ? overlay : page.locator('#storybook-root');
            const box = await target.boundingBox();
            const padding = 24;
            image = await page.screenshot({
                animations: 'disabled',
                clip: box ? {
                    x: Math.max(0, box.x - padding),
                    y: Math.max(0, box.y - padding),
                    width: box.width + padding * 2,
                    height: box.height + padding * 2,
                } : undefined,
            });
        }
        expect(image).toMatchImageSnapshot({
            customSnapshotsDir: `${process.cwd()}/test/__snapshots__`,
            customSnapshotIdentifier: context.id,
            failureThreshold: 0.03,
            failureThresholdType: 'percent',
        });
    },
};

export default config;
