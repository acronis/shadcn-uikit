'use client';

import { type ReactNode, useState } from 'react';

interface DemoPreviewProps {
  children: ReactNode;
  /** Center content horizontally in the preview area */
  center?: boolean;
  /** Source code string for "View source" toggle */
  source?: string;
}

export function DemoPreview({ children, center, source }: DemoPreviewProps) {
  const [showSource, setShowSource] = useState(false);

  return (
    <div className="demo-preview my-6 rounded-xl border overflow-hidden shadow-sm">
      <div
        className={`demo-preview__canvas p-8 min-h-[120px] flex flex-wrap items-start gap-3${center ? ' justify-center' : ''}`}
      >
        {children}
      </div>
      <div className="demo-preview__footer border-t px-4 py-2 flex items-center justify-between">
        <span className="text-xs opacity-50">Preview</span>
        {source && (
          <button
            onClick={() => setShowSource((v) => !v)}
            className="text-xs opacity-60 hover:opacity-100 transition-opacity"
          >
            {showSource ? 'Hide source' : 'View source'}
          </button>
        )}
      </div>
      {showSource && source && (
        <pre className="demo-preview__source p-4 text-sm overflow-auto border-t m-0">
          <code>{source}</code>
        </pre>
      )}
    </div>
  );
}
