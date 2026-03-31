import { execSync } from 'child_process';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { mkdirSync, unlinkSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputPath = resolve(__dirname, '../src/styles/full.scss');
const outputPath = resolve(__dirname, '../dist/shadcn-uikit-full.css');
// Place intermediate file next to source so @config relative paths resolve correctly
const tempCssPath = resolve(__dirname, '../src/styles/.full-intermediate.css');

try {
  mkdirSync(resolve(__dirname, '../dist'), { recursive: true });

  // Step 1: Compile SCSS to CSS (Sass passes through @import, @config directives unchanged)
  execSync(
    `pnpm exec sass --style=expanded --no-source-map ${inputPath} ${tempCssPath}`,
    { stdio: 'inherit' }
  );

  // Step 2: Process with Tailwind v4 CLI (resolves @config, @import, generates utilities, minifies)
  execSync(
    `pnpm exec tailwindcss -i ${tempCssPath} -o ${outputPath} --minify`,
    { stdio: 'inherit' }
  );

  // Clean up intermediate file
  try { unlinkSync(tempCssPath); } catch { /* ignore */ }

  console.log('✓ Generated full unpurged CSS bundle');
} catch (error) {
  console.error('Error generating full CSS:', error);
  try { unlinkSync(tempCssPath); } catch { /* ignore */ }
  process.exit(1);
}