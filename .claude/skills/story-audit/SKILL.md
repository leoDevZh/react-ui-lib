---
description: Audit Storybook coverage for every component in the library and output a gap table
disable-model-invocation: false
---

# story-audit

Scan every component under `src/components/`, evaluate its Storybook coverage, and print a gap table. Takes no arguments.

## Step 1 — Inventory all component files

Run a single find to collect every non-story, non-test `.tsx` file:

```bash
find src/components -name "*.tsx" ! -name "*.stories.tsx" ! -name "*.test.tsx" | sort
```

From the results, exclude files that are clearly internal utilities:
- Files whose path contains `utils/` and that export only helper functions or React fragments (not a standalone component)
- Files inside example subfolders (e.g. `3-state-animation-item-example/`)
- Files that only re-export from an index barrel

When in doubt, include the file.

## Step 2 — Identify all existing story files

```bash
find src/components -name "*.stories.tsx" | sort
```

Cross-reference with the component list from Step 1: a component at `<dir>/<Name>.tsx` has a story if `<dir>/<Name>.stories.tsx` exists as a sibling.

## Step 3 — Extract custom props for each component

For every component, locate its props interface:

1. **Has a `model.ts`?** Check the same directory first, then the nearest ancestor within `src/components/`:
   ```bash
   find src/components/<category> -name "model.ts" | head -1
   ```
   Read the file and collect all property names declared in the interface body (lines matching `^\s+\w+\??:`).

2. **No `model.ts`?** Read the `.tsx` file itself and extract the inline `interface <Name>Props` block.

**Custom prop definition:** a property declared explicitly in the interface body, *not* one inherited from an HTML attribute base type (`HTMLAttributes`, `ButtonHTMLAttributes`, `InputHTMLAttributes`, etc.). For example: `size`, `label`, `icon`, `drawIcon` are custom; `className`, `onClick`, `children` (when only inherited) are not.

Exception: if `disabled` is re-declared in the custom interface, treat it as a custom prop.

## Step 4 — Evaluate each story file

For each component that has a story, run:

```bash
# autodocs tag presence
grep -c "autodocs" <story-file>

# named story exports
grep "^export const" <story-file>

# argTypes block (grab enough lines to see all entries)
grep -A 50 "argTypes" <story-file>
```

### autodocs
`✓` if `'autodocs'` appears in the file; `✗` otherwise.

### Required stories — what to check

| Story name | Required when |
|---|---|
| `Default` | always |
| `AllSizes` | component has a `size` prop |
| `Disabled` | component has a `disabled` prop (inherited from `ButtonHTMLAttributes` or declared) |

Compare the `export const` names against this list and record which are absent.

### Missing argTypes — what to flag

For each custom prop, decide whether an explicit argType is needed:

| Prop type | Explicit argType needed? | Reason |
|---|---|---|
| Union type / `ComponentSize` / string literals | **Yes** — `control: 'select'` | Storybook cannot infer options |
| `ReactNode` | **Yes** — `control: false` | Cannot render node in controls panel |
| `boolean` | No | Storybook auto-generates a checkbox |
| `string` | No | Auto text input |
| `number` | No | Auto number input |
| Function / callback (`() => void`) | No | Excluded from controls |
| `RefObject<any>` | No | Not a UI control |
| Complex object / array | **Yes** — `control: false` | Cannot render inline |

Flag a prop only if it falls in a "Yes" row and has no entry in the `argTypes` block of the story.

## Step 5 — Output the gap table

Print a markdown table with one row per component, ordered by path.

```
| Component | Story | autodocs | Missing argTypes | Missing stories |
|---|---|---|---|---|
| `path/to/ComponentName` | ✓ | ✓ | — | — |
| `path/to/OtherComponent` | ✗ | — | — | all |
```

**Column rules:**

| Column | Value |
|---|---|
| **Component** | Path relative to `src/components/`, no `.tsx` extension, including variation subfolder |
| **Story** | `✓` story file sibling exists · `✗` it does not |
| **autodocs** | `✓` / `✗` when story exists · `—` when no story |
| **Missing argTypes** | Comma-separated prop names needing an explicit argType but absent from the story · `—` if none or no story |
| **Missing stories** | Comma-separated required story names not exported · `all` if no story file exists · `—` if all required stories are present |

Follow the table with a **Summary** section:

```
**Summary**
- X components scanned
- X missing story file entirely
- X stories missing `autodocs` tag
- X stories missing required stories (Default / AllSizes / Disabled)
- X stories with argType gaps
```

## Step 6 — Do not write files

This skill is **read-only**. Output the table and summary to the conversation. Do not create or modify any file.