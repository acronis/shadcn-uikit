import type { TestRunnerConfig } from '@storybook/test-runner';
import process from 'node:process';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

const config: TestRunnerConfig = {
    setup() {
        expect.extend({ toMatchImageSnapshot });
    },
    async postVisit(page, context) {
        // Wait for fonts and images to load
        await page.waitForLoadState('networkidle');

        // Screenshot the story root element with padding to avoid a tight crop on tiny components
        const root = page.locator('#storybook-root');
        const box = await root.boundingBox();
        const padding = 24;
        const image = await page.screenshot({
            animations: 'disabled',
            clip: box ? {
                x: Math.max(0, box.x - padding),
                y: Math.max(0, box.y - padding),
                width: box.width + padding * 2,
                height: box.height + padding * 2,
            } : undefined,
        });
        expect(image).toMatchImageSnapshot({
            customSnapshotsDir: `${process.cwd()}/test/__snapshots__`,
            customSnapshotIdentifier: context.id,
            failureThreshold: 0.03,
            failureThresholdType: 'percent',
        });
    },
};

export default config;
