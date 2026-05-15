# Worked Example — Button

This is the exact output expected when running `/new-story Button`.

## Source files read (Step 1–2)

**`src/components/button/variations/model.ts`**
```ts
import { ButtonHTMLAttributes, ReactNode } from 'react'
import { ComponentSize } from '../../provider'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
  size?: ComponentSize
  icon?: ReactNode
  drawIcon?: boolean
  invert?: boolean
  simpleColor?: boolean
  accentColor?: string
}
```

**`src/components/button/variations/fill-out/button.tsx`** (excerpt)
- Accepts: `label`, `size`, `onClick`, `className`, `...props` (spread of ButtonHTMLAttributes)
- Has touch handlers (`onTouchStart`, `onTouchEnd`) — internal, not a prop
- Branches on `theme.style` for morphism vs classic — not a user-facing prop
- `disabled` is inherited from `ButtonHTMLAttributes<HTMLButtonElement>` ✓
- Variations: `fill-out`, `light-btn`, `link`, `download`

## Decision log

| Question | Decision |
|---|---|
| Does it have a `size` prop? | Yes → include AllSizes |
| Does it have `disabled`? | Yes (via ButtonHTMLAttributes) → include Disabled |
| Variations to cover? | fill-out is the primary; link/light/download are separate components with their own files — not covered in this story |
| Import style for ButtonProps? | `import type` — it's an interface |
| ThemeProvider needed? | No — global decorator already wraps all stories |

## Output file

**`src/components/button/variations/fill-out/Button.stories.tsx`**

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    label: 'Click me',
    size: 'md',
  },
}

export const Small: Story = {
  args: {
    label: 'Small',
    size: 'sm',
  },
}

export const Large: Story = {
  args: {
    label: 'Large',
    size: 'lg',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    size: 'md',
    disabled: true,
  },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Button key={size} size={size} label={size} />
      ))}
    </div>
  ),
}
```

## What good output looks like in Storybook

- **Docs tab**: prop table shows `label`, `size` (select control), `icon`, `drawIcon`, `invert`, `simpleColor`, `accentColor`, and all inherited HTML button attributes
- **Canvas tab**: Default story renders a mid-size button with the library's classic or morphism theme applied (from global ThemeProvider)
- **AllSizes canvas**: five buttons in a row, xs through xl, all unstyled controls in the sidebar
- **Disabled canvas**: button rendered with `disabled` attribute, visually greyed per the component's CSS

## Common mistakes to avoid

1. `import { ButtonProps } from './model'` — wrong, strips the interface at runtime. Always `import type`.
2. Wrapping `<ThemeProvider>` in a decorator — redundant, already global.
3. Putting the story at the wrong path (e.g. `src/components/button/Button.stories.tsx`) — story must sit next to its component file.
4. Skipping `tags: ['autodocs']` — the Docs tab will be empty.
5. Using `render:` for Default/Disabled when `args:` suffices — keep it simple unless you need layout control.