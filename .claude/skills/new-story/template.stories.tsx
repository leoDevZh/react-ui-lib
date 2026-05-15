/**
 * TEMPLATE — copy and fill in the blanks marked with <REPLACE>.
 *
 * Rules:
 * - `import type` for all interfaces / prop types
 * - `import` (value) for the component itself
 * - tags: ['autodocs'] is mandatory
 * - ThemeProvider is NOT needed — it is injected globally by preview.tsx
 * - AllSizes story is required when the component has a `size` prop
 * - Disabled story is required when the component has a `disabled` prop
 */

import type { Meta, StoryObj } from '@storybook/react'
// import type { <REPLACE: ComponentProps> } from './model'  ← only if you need the type explicitly
import { /* <REPLACE: ComponentName> */ } from './<REPLACE: componentFile>'

const meta: Meta<typeof /* <REPLACE: ComponentName> */ undefined> = {
  title: 'Components/<REPLACE: ComponentName>',
  component: /* <REPLACE: ComponentName> */ undefined,
  tags: ['autodocs'],
  argTypes: {
    // Include size select only when the component accepts a size prop:
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    // Add further argType overrides below as needed
  },
}

export default meta
type Story = StoryObj<typeof /* <REPLACE: ComponentName> */ undefined>

// ── Required: Default ────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    // <REPLACE: add canonical props here>
  },
}

// ── Optional: one story per named variation ──────────────────────────────────

// export const VariationName: Story = {
//   args: { /* variant-specific props */ },
// }

// ── Optional: Disabled (include when component has a disabled prop) ───────────

export const Disabled: Story = {
  args: {
    // <REPLACE: repeat Default args>
    disabled: true,
  },
}

// ── Optional: AllSizes (include when component has a size prop) ───────────────

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        // <REPLACE: ComponentName> key={size} size={size} /* other required props */ />
        <span key={size}>{size}</span>
      ))}
    </div>
  ),
}