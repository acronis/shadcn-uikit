'use client';

import { type ReactNode, useState } from 'react';

interface DemoPreviewProps {
  children: ReactNode;
  /** Source code string for "View source" toggle */
  source?: string;
}

export function DemoPreview({ children, source }: DemoPreviewProps) {
  const [showSource, setShowSource] = useState(false);

  return (
    <div className="my-6 rounded-lg border overflow-hidden">
      <div className="p-6 bg-background">{children}</div>
      {source && (
        <>
          <div className="border-t px-4 py-2 flex justify-end bg-muted/50">
            <button
              onClick={() => setShowSource((v) => !v)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {showSource ? 'Hide source' : 'View source'}
            </button>
          </div>
          {showSource && (
            <pre className="p-4 text-sm overflow-auto bg-muted">
              <code>{source}</code>
            </pre>
          )}
        </>
      )}
    </div>
  );
}
