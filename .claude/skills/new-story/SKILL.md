---
description: Generate a Storybook story file for a component in this library
argument-hint: ComponentName
disable-model-invocation: false
---

# new-story

Generate a complete `.stories.tsx` file for the given component. Follow every rule below — do not improvise.

## Step 1 — Locate the component

The argument is the component name (e.g. `Button`, `Dialog`, `TabMenu`).

Components live under `src/components/`. Each category may contain a flat component or a `variations/` subfolder. Common layouts:

```
src/components/<category>/
  <ComponentName>.tsx          # flat component (Dialog, TabMenu, FlippingCard)
  index.ts

src/components/<category>/variations/
  model.ts                     # shared props for all variations
  <variation>/<ComponentName>.tsx
  <variation>/<ComponentName>.test.tsx
```

To find the file, `grep -r "export.*ComponentName" src/components/` or scan the folder structure.

## Step 2 — Read before writing

Read in order:
1. The `model.ts` nearest to the component (contains the props interface)
2. The component `.tsx` file itself (reveals which props it actually uses, what variants exist)
3. Any sibling variations if they share the same model

Do not guess props. Read the source.

## Step 3 — Export rules

This project uses Vite (via Storybook). Interfaces exported as values (`export { ButtonProps }`) vanish at runtime. Always import props with `import type`:

```ts
import type { Meta, StoryObj } from '@storybook/react'
import type { ButtonProps } from './model'   // ← always `import type` for interfaces
import { Button } from './button'            // ← component as value import
```

Never write `import { ComponentProps }` when `ComponentProps` is an interface.

## Step 4 — Story placement

Place the story file next to the component `.tsx` file it covers:

```
src/components/button/variations/fill-out/Button.stories.tsx   ✓
src/components/dialog/Dialog.stories.tsx                        ✓
```

## Step 5 — Meta block

```ts
const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',   // use the display name, not the variation folder
  component: ComponentName,
  tags: ['autodocs'],                  // always — enables the Docs tab
  argTypes: {
    // add a select entry for every string union / enum prop:
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    someUnionProp: {
      control: 'select',
      options: [undefined, 'OptionA', 'OptionB'],  // include undefined when prop is optional
    },
  },
}
```

Rules for `argTypes`:
- Add a `control: 'select'` entry for **every** prop whose type is a string union or enum (not just `size`)
- When the prop is optional, include `undefined` as the first option so the control can be cleared
- Booleans, strings, and numbers are inferred automatically — no entry needed
- `ReactNode` props cannot be controlled — omit them from argTypes

`tags: ['autodocs']` is mandatory on every meta object.

## Step 6 — ThemeProvider

Do NOT add a ThemeProvider decorator in the story file. It is already injected globally in `.storybook/preview.tsx`. Adding it again nests providers unnecessarily.

## Step 7 — Required stories

Generate all of the following that apply:

| Story name | When to include | Notes |
|---|---|---|
| `Default` | always | all configurable props exposed as args — see rules below |
| One per variation | when component has named variants (e.g. `fill-out`, `light`, `link`) | use the variation's display name as the story name |
| `Disabled` | when the component has an HTML `disabled` prop | `args: { disabled: true }` |
| `AllSizes` | when the component has a `size` prop | render block showing all 5 sizes side by side — use a `render` function, not just args |

### Default story rules

The Default story must expose **every configurable prop** as an arg so the Storybook controls panel can toggle them without a page refresh:

1. List **all non-ReactNode, non-callback props** in `args` with sensible default values.
2. If the component needs a wrapper element (for sizing) or requires children, use a `render` function that **receives `args` and spreads them** into the component:

```tsx
export const Default: Story = {
  args: {
    propA: 'value',
    propB: true,
    propC: 'OptionA',
  },
  render: (args) => (
    <div style={{ height: '300px', width: '100%' }}>
      <ComponentName {...args}>
        {dummyChildren}
      </ComponentName>
    </div>
  ),
}
```

3. Never hardcode prop values inside a `render` function — always read them from `args`. Hardcoding breaks the controls panel.
4. When no wrapper or children are needed, `args` alone is sufficient (no `render` needed).

## AllSizes render pattern

```tsx
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <ComponentName key={size} size={size} label={size} />
      ))}
    </div>
  ),
}
```

## Step 8 — Full file structure

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from './model'   // only if needed for types
import { ComponentName } from './componentFile'

const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
  argTypes: { /* one entry per string union/enum prop */ },
}

export default meta
type Story = StoryObj<typeof ComponentName>

export const Default: Story = {
  args: { /* ALL configurable props */ },
  // render: (args) => <Wrapper><ComponentName {...args}>{children}</ComponentName></Wrapper>
  // ↑ only when wrapper or children are required
}
// ... other stories
```

## Step 9 — Dummy components for stories

Some components (carousels, dialogs, tabs, etc.) require meaningful children to be useful in Storybook. When a story needs a dummy/placeholder component to fill that role, **never define it inline in the story file**. Instead:

1. Create a `__stories__/` folder inside the component's **category** directory (one level above the specific component folder). This makes it reusable by any future stories in that category and the folder name signals clearly that it contains non-production code.

   ```
   src/components/carousel/__stories__/FeatureCard.tsx   ✓
   src/components/dialog/__stories__/SampleContent.tsx   ✓
   ```

2. Export the dummy component and any associated data (arrays, constants) from that file.

3. Import into the story with a relative path:
   ```ts
   import { FeatureCard, featureSlides } from '../__stories__/FeatureCard'
   ```

4. Never export these files from `src/index.ts` — they must not become part of the library's public API.

## Step 10 — Reactive props check

Before writing the story, scan the component's `useEffect` / `useLayoutEffect` calls. If any prop is read inside an effect that has an **empty dependency array** (`[]`), that prop will not update when the Storybook control changes — the user will need to refresh the page.

If you find this pattern, fix it in the component file by splitting the effect:

```ts
// Before — prop only applied on mount:
useLayoutEffect(() => {
  ref.current?.style.setProperty('--my-var', myProp ? '0' : '1')
  // ...other init logic
}, [])

// After — prop reactive, init logic stays mount-only:
useLayoutEffect(() => {
  ref.current?.style.setProperty('--my-var', myProp ? '0' : '1')
}, [myProp])

useLayoutEffect(() => {
  // ...other init logic
}, [])
```

Report the fix to the user when you make it.

## Step 11 — Confirm

After writing the file, run:

```bash
npx storybook dev -p 6006 --ci &
sleep 20 && kill %1
```

Check the output for build errors. Report any errors that appear; do not silently claim success.