import * as React from 'react'
import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import * as z from 'zod'
import {
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@acronis-platform/shadcn-uikit/react'
import { Input } from '@acronis-platform/shadcn-uikit/react'
import { Textarea } from '@acronis-platform/shadcn-uikit/react'
import { Button } from '@acronis-platform/shadcn-uikit/react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@acronis-platform/shadcn-uikit/react'

const profileSchema = z.object({
  username: z
    .string()
    .min(2, 'Username must be at least 2 characters.')
    .max(30, 'Username must not exceed 30 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  role: z.string().min(1, 'Please select a role.'),
  bio: z.string().max(160, 'Bio must not exceed 160 characters.').optional(),
})

type ProfileValues = z.infer<typeof profileSchema>

export function FormTanstackProfile() {
  const [submitted, setSubmitted] = React.useState<ProfileValues | null>(null)

  const form = useForm({
    defaultValues: {
      username: '',
      email: '',
      role: '',
      bio: '',
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: profileSchema,
    },
    onSubmit: async ({ value }) => {
      setSubmitted(value as ProfileValues)
    },
  })

  if (submitted) {
    return (
      <div className="max-w-md rounded-lg border p-6 space-y-3">
        <p className="text-sm font-medium text-green-600">Profile saved!</p>
        <pre className="text-xs bg-muted rounded p-3 overflow-auto">
          {JSON.stringify(submitted, null, 2)}
        </pre>
        <Button variant="outline" size="sm" onClick={() => setSubmitted(null)}>
          Edit again
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-md">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className="space-y-5"
      >
        <form.Field name="username" validators={{ onChange: profileSchema.shape.username }}>
          {(field) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="johndoe"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              </FormControl>
              <FormDescription>Your public display name.</FormDescription>
              {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                <FormMessage>{field.state.meta.errors[0]?.toString()}</FormMessage>
              )}
            </FormItem>
          )}
        </form.Field>

        <form.Field name="email" validators={{ onChange: profileSchema.shape.email }}>
          {(field) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              </FormControl>
              {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                <FormMessage>{field.state.meta.errors[0]?.toString()}</FormMessage>
              )}
            </FormItem>
          )}
        </form.Field>

        <form.Field name="role" validators={{ onChange: profileSchema.shape.role }}>
          {(field) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select
                value={field.state.value}
                onValueChange={(val) => field.handleChange(val ?? '')}
              >
                <FormControl>
                  <SelectTrigger onBlur={field.handleBlur}>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
              {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                <FormMessage>{field.state.meta.errors[0]?.toString()}</FormMessage>
              )}
            </FormItem>
          )}
        </form.Field>

        <form.Field name="bio" validators={{ onChange: profileSchema.shape.bio }}>
          {(field) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little about yourself"
                  className="resize-none"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              </FormControl>
              <FormDescription>Up to 160 characters.</FormDescription>
              {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                <FormMessage>{field.state.meta.errors[0]?.toString()}</FormMessage>
              )}
            </FormItem>
          )}
        </form.Field>

        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit || isSubmitting}>
              {isSubmitting ? 'Saving…' : 'Save profile'}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </div>
  )
}