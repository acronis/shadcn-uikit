import * as React from 'react'
import { Switch } from '@acronis-platform/shadcn-uikit/react'
import { Label } from '@acronis-platform/shadcn-uikit/react'

export function SwitchDemo() {
  const [switch1, setSwitch1] = React.useState(false)
  const [switch2, setSwitch2] = React.useState(true)
  const [switch3, setSwitch3] = React.useState(false)
  const [notifications, setNotifications] = React.useState(true)
  const [marketing, setMarketing] = React.useState(false)
  const [social, setSocial] = React.useState(true)

  return (
    <section className="demo-section">
      <h2>Switch Component</h2>
      <p className="demo-description">
        Used to turn an individual option on or off. It is usually used to activate or deactivate a
        specific setting.
      </p>

      <div className="space-y-8">
        <div className="demo-item">
          <h3>Basic Switch</h3>
          <p className="text-sm text-gray-600 mb-4">Simple on/off toggle switch.</p>
          <Switch />
        </div>

        <div className="demo-item">
          <h3>With Label</h3>
          <p className="text-sm text-gray-600 mb-4">Switch with an associated label.</p>
          <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode">Airplane Mode</Label>
          </div>
        </div>

        <div className="demo-item">
          <h3>Controlled Switch</h3>
          <p className="text-sm text-gray-600 mb-4">Switch with controlled state.</p>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="switch1" checked={switch1} onCheckedChange={setSwitch1} />
              <Label htmlFor="switch1">Enable Feature</Label>
            </div>
            <p className="text-sm text-gray-600">Status: {switch1 ? 'Enabled' : 'Disabled'}</p>
          </div>
        </div>

        <div className="demo-item">
          <h3>Default Checked</h3>
          <p className="text-sm text-gray-600 mb-4">Switch that is checked by default.</p>
          <div className="flex items-center space-x-2">
            <Switch id="default-on" defaultChecked />
            <Label htmlFor="default-on">Auto-save</Label>
          </div>
        </div>

        <div className="demo-item">
          <h3>Disabled States</h3>
          <p className="text-sm text-gray-600 mb-4">
            Switches in disabled state (both on and off).
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="disabled-off" disabled />
              <Label htmlFor="disabled-off" className="opacity-50">
                Disabled (Off)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="disabled-on" disabled defaultChecked />
              <Label htmlFor="disabled-on" className="opacity-50">
                Disabled (On)
              </Label>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Multiple Switches</h3>
          <p className="text-sm text-gray-600 mb-4">Group of related switches.</p>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="wifi" defaultChecked />
              <Label htmlFor="wifi">Wi-Fi</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="bluetooth" />
              <Label htmlFor="bluetooth">Bluetooth</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="location" defaultChecked />
              <Label htmlFor="location">Location Services</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="nfc" />
              <Label htmlFor="nfc">NFC</Label>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>In a Form</h3>
          <p className="text-sm text-gray-600 mb-4">Switches used within a form context.</p>
          <div className="max-w-md space-y-6 rounded-lg border p-6">
            <div>
              <h4 className="mb-4 font-semibold">Notification Preferences</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications on your device.
                    </p>
                  </div>
                  <Switch
                    id="notifications"
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="marketing">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails about new products and features.
                    </p>
                  </div>
                  <Switch id="marketing" checked={marketing} onCheckedChange={setMarketing} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="social">Social Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when someone follows you.
                    </p>
                  </div>
                  <Switch id="social" checked={social} onCheckedChange={setSocial} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Settings Panel</h3>
          <p className="text-sm text-gray-600 mb-4">Switches in a settings panel layout.</p>
          <div className="max-w-md space-y-6 rounded-lg border p-6">
            <div>
              <h4 className="mb-4 font-semibold">Privacy Settings</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="profile-public">Public Profile</Label>
                  <Switch id="profile-public" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="show-email">Show Email</Label>
                  <Switch id="show-email" />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="show-activity">Show Activity</Label>
                  <Switch id="show-activity" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="searchable">Searchable</Label>
                  <Switch id="searchable" defaultChecked />
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h4 className="mb-4 font-semibold">Security</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <Switch id="two-factor" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="login-alerts">Login Alerts</Label>
                  <Switch id="login-alerts" defaultChecked />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Feature Toggles</h3>
          <p className="text-sm text-gray-600 mb-4">Switches for enabling/disabling features.</p>
          <div className="max-w-md space-y-4 rounded-lg border p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Enable dark theme across the application.
                </p>
              </div>
              <Switch id="dark-mode" />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="animations">Animations</Label>
                <p className="text-sm text-muted-foreground">
                  Enable smooth animations and transitions.
                </p>
              </div>
              <Switch id="animations" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sound">Sound Effects</Label>
                <p className="text-sm text-muted-foreground">
                  Play sounds for notifications and actions.
                </p>
              </div>
              <Switch id="sound" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="beta">Beta Features</Label>
                <p className="text-sm text-muted-foreground">
                  Try out experimental features (may be unstable).
                </p>
              </div>
              <Switch id="beta" />
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Interactive Example</h3>
          <p className="text-sm text-gray-600 mb-4">Toggle switches with real-time feedback.</p>
          <div className="max-w-md space-y-4 rounded-lg border p-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="switch2">Feature Toggle</Label>
              <Switch id="switch2" checked={switch2} onCheckedChange={setSwitch2} />
            </div>
            <div className="rounded-md bg-muted p-4">
              <p className="text-sm">
                {switch2 ? (
                  <span className="text-green-600">✓ Feature is currently enabled</span>
                ) : (
                  <span className="text-gray-600">✗ Feature is currently disabled</span>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Compact Layout</h3>
          <p className="text-sm text-gray-600 mb-4">Switches in a compact grid layout.</p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center space-x-2">
              <Switch id="compact1" defaultChecked />
              <Label htmlFor="compact1">Auto-update</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="compact2" />
              <Label htmlFor="compact2">Backup</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="compact3" defaultChecked />
              <Label htmlFor="compact3">Sync</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="compact4" />
              <Label htmlFor="compact4">Offline Mode</Label>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>With State Indicator</h3>
          <p className="text-sm text-gray-600 mb-4">Switches with visual state indicators.</p>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center space-x-2">
                <Switch id="switch3" checked={switch3} onCheckedChange={setSwitch3} />
                <Label htmlFor="switch3">Service Status</Label>
              </div>
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${
                  switch3 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}
              >
                {switch3 ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
