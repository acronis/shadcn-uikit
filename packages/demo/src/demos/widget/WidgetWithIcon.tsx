import {
  Widget,
  WidgetHeader,
  WidgetIcon,
  WidgetTitle,
  WidgetActions,
  WidgetContent,
  WidgetValue,
  WidgetLabel,
} from '@acronis-platform/shadcn-uikit/react'
import { Button } from '@acronis-platform/shadcn-uikit/react'
import { Shield, MoreVertical } from 'lucide-react'

export function WidgetWithIcon() {
  return (
    <Widget className="w-[350px]">
      <WidgetHeader>
        <WidgetIcon>
          <Shield className="h-4 w-4" />
        </WidgetIcon>
        <WidgetTitle>Protection Status</WidgetTitle>
        <WidgetActions>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </WidgetActions>
      </WidgetHeader>
      <WidgetContent>
        <WidgetValue>All Clear</WidgetValue>
        <WidgetLabel>No issues detected</WidgetLabel>
      </WidgetContent>
    </Widget>
  )
}
