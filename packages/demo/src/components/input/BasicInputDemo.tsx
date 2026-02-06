import { DemoWithCode } from '@/components/DemoWithCode.tsx';
import inputBasicCode from '../../demos/input/InputBasic.tsx?raw';
import { InputBasic } from '../../demos/input/index.ts';
import * as React from 'react';

export function BasicInputDemo() {
  return (
    <section className="demo-section">
      <h2>Basic Input demos</h2>

      <div className="demo-grid">
        <DemoWithCode
          title="Basic Input"
          description="Simple input fields with placeholder and default values."
          code={inputBasicCode}
        >
          <InputBasic />
        </DemoWithCode>
      </div>
    </section>
  )
}
