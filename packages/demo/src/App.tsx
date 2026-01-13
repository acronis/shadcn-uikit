import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from '@/components/Layout.tsx'
import { Home } from '@/pages/Home.tsx'
import { ButtonDemo } from '@/components/ButtonDemo.tsx'
import { AlertDemo } from '@/components/AlertDemo.tsx'
import { BreadcrumbDemo } from '@/components/BreadcrumbDemo.tsx'
import { TooltipDemo } from '@/components/TooltipDemo.tsx'
import { DropdownMenuDemo } from '@/components/DropdownMenuDemo.tsx'
import { InputLayout } from '@/components/input/InputLayout.tsx'
import { BasicInputDemo } from '@/components/input/BasicInputDemo.tsx'
import { InputTypesDemo } from '@/components/input/InputTypesDemo.tsx'
import { InputWithLabelsDemo } from '@/components/input/InputWithLabelsDemo.tsx'
import { InputWithIconsDemo } from '@/components/input/InputWithIconsDemo.tsx'
import { InputStatesDemo } from '@/components/input/InputStatesDemo.tsx'
import { InputValidationDemo } from '@/components/input/InputValidationDemo.tsx'
import { InputSizesDemo } from '@/components/input/InputSizesDemo.tsx'
import { InputFormDemo } from '@/components/input/InputFormDemo.tsx'
import { InputSearchDemo } from '@/components/input/InputSearchDemo.tsx'
import { TextareaDemo } from '@/components/TextareaDemo.tsx'
import { SidebarDemo } from '@/components/SidebarDemo.tsx'
import { DialogDemo } from '@/components/DialogDemo.tsx'
import { EmptyDemo } from '@/components/EmptyDemo.tsx'
import { ChipDemo } from '@/components/ChipDemo.tsx'
import { TagDemo } from '@/components/TagDemo.tsx'
import { ComboboxDemo } from '@/components/ComboboxDemo.tsx'
import { DatePickerDemo } from '@/components/DatePickerDemo.tsx'
import { CalendarDemo } from '@/components/CalendarDemo.tsx'
import { NavigationMenuDemo } from '@/components/NavigationMenuDemo.tsx'
import { PopoverDemo } from '@/components/PopoverDemo.tsx'
import { ProgressDemo } from '@/components/ProgressDemo.tsx'
import { RadioGroupDemo } from '@/components/RadioGroupDemo.tsx'
import { SelectDemo } from '@/components/SelectDemo.tsx'
import { SwitchDemo } from '@/components/SwitchDemo.tsx'
import { TabsDemo } from '@/components/TabsDemo.tsx'
import { CardDemo } from '@/components/CardDemo.tsx'
import { SeparatorDemo } from '@/components/SeparatorDemo.tsx'
import { TableDemo } from '@/components/TableDemo.tsx'
import { BadgeDemo } from '@/components/BadgeDemo.tsx'
import { CheckboxDemo } from '@/components/CheckboxDemo.tsx'
import { FormDemo } from '@/components/FormDemo.tsx'
import { SonnerDemo } from '@/components/SonnerDemo.tsx'
import { SpinnerDemo } from '@/components/SpinnerDemo.tsx'
import { TreeDemo } from '@/components/TreeDemo.tsx'
import { DesignTokensDemo } from '@/components/DesignTokensDemo.tsx'
import { IconsDemo } from '@/components/IconsDemo.tsx'
import { ButtonGroupDemo } from '@/components/ButtonGroupDemo.tsx'
import { CarouselDemo } from '@/components/CarouselDemo.tsx'
import { FilterDemo } from '@/components/FilterDemo.tsx'
import { ContainerDemo } from '@/components/ContainerDemo.tsx'
import { DataTableDemo } from '@/components/DataTableDemo.tsx'
import { ChartDemo } from '@/components/ChartDemo.tsx'
import { PaginationDemo } from '@/components/PaginationDemo.tsx'
import { PasswordInputDemo } from '@/components/PasswordInputDemo.tsx'
import { InputDemoWithSecondaryMenu } from '@/components/InputDemoWithSecondaryMenu.tsx'
import { SecondaryMenuDemo } from '@/components/SecondaryMenuDemo.tsx'
import { PlaygroundPage } from '@/pages/playground/PlaygroundPage.tsx'
import '@/App.css'
import { ThemeProvider } from '@acronis-platform/shadcn-uikit/react'
import { DemoApp } from '@/app/App'
import { Toaster } from 'sonner'

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/demo/*" element={<DemoApp />} />
          <Route path="/playground" element={<PlaygroundPage />} />
          <Route path="/input-with-secondary-menu" element={<InputDemoWithSecondaryMenu />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="button" element={<ButtonDemo />} />
            <Route path="button-group" element={<ButtonGroupDemo />} />
            <Route path="alert" element={<AlertDemo />} />
            <Route path="badge" element={<BadgeDemo />} />
            <Route path="breadcrumb" element={<BreadcrumbDemo />} />
            <Route path="carousel" element={<CarouselDemo />} />
            <Route path="checkbox" element={<CheckboxDemo />} />
            <Route path="tooltip" element={<TooltipDemo />} />
            <Route path="dropdown-menu" element={<DropdownMenuDemo />} />
            <Route path="filter" element={<FilterDemo />} />
            <Route path="form" element={<FormDemo />} />
            <Route path="input" element={<InputLayout />}>
              <Route index element={<Navigate to="/input/basic" replace />} />
              <Route path="basic" element={<BasicInputDemo />} />
              <Route path="types" element={<InputTypesDemo />} />
              <Route path="labels" element={<InputWithLabelsDemo />} />
              <Route path="icons" element={<InputWithIconsDemo />} />
              <Route path="states" element={<InputStatesDemo />} />
              <Route path="validation" element={<InputValidationDemo />} />
              <Route path="sizes" element={<InputSizesDemo />} />
              <Route path="form" element={<InputFormDemo />} />
              <Route path="search" element={<InputSearchDemo />} />
            </Route>
            <Route path="textarea" element={<TextareaDemo />} />
            <Route path="sidebar" element={<SidebarDemo />} />
            <Route path="dialog" element={<DialogDemo />} />
            <Route path="empty" element={<EmptyDemo />} />
            <Route path="chip" element={<ChipDemo />} />
            <Route path="tag" element={<TagDemo />} />
            <Route path="combobox" element={<ComboboxDemo />} />
            <Route path="datepicker" element={<DatePickerDemo />} />
            <Route path="calendar" element={<CalendarDemo />} />
            <Route path="navigation-menu" element={<NavigationMenuDemo />} />
            <Route path="popover" element={<PopoverDemo />} />
            <Route path="progress" element={<ProgressDemo />} />
            <Route path="chart" element={<ChartDemo />} />
            <Route path="radio-group" element={<RadioGroupDemo />} />
            <Route path="select" element={<SelectDemo />} />
            <Route path="sonner" element={<SonnerDemo />} />
            <Route path="spinner" element={<SpinnerDemo />} />
            <Route path="switch" element={<SwitchDemo />} />
            <Route path="tabs" element={<TabsDemo />} />
            <Route path="tree" element={<TreeDemo />} />
            <Route path="card" element={<CardDemo />} />
            <Route path="separator" element={<SeparatorDemo />} />
            <Route path="table" element={<TableDemo />} />
            <Route path="data-table" element={<DataTableDemo />} />
            <Route path="pagination" element={<PaginationDemo />} />
            <Route path="password-input" element={<PasswordInputDemo />} />
            <Route path="secondary-menu" element={<SecondaryMenuDemo />} />
            <Route path="design-tokens" element={<DesignTokensDemo />} />
            <Route path="icons" element={<IconsDemo />} />
            <Route path="container" element={<ContainerDemo />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
