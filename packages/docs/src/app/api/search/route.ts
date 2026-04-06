import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

// Required for Next.js static export (output: "export") — route handlers
// must explicitly declare static rendering.
export const dynamic = 'force-static';

export const { GET } = createFromSource(source);
