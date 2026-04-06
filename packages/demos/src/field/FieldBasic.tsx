import * as React from 'react'
import {
  Field,
  FieldLabel,
  FieldDescription,
} from '@acronis-platform/shadcn-uikit/react'
import { Input } from '@acronis-platform/shadcn-uikit/react'

export function FieldBasic() {
  return (
    <div className="max-w-sm">
      <Field>
        <FieldLabel htmlFor="username">Username</FieldLabel>
        <Input id="username" placeholder="johndoe" />
        <FieldDescription>This is your public display name.</FieldDescription>
      </Field>
    </div>
  )
}
