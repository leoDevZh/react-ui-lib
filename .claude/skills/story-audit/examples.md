# Worked Example — story-audit

This shows the exact process and output format expected when running `/story-audit` against this repository.

## Commands run (Step 1–2)

```bash
find src/components -name "*.tsx" ! -name "*.stories.tsx" ! -name "*.test.tsx" | sort
```

Yields ~30 files. After filtering (exclude `3-state-animation-item-example/`, `utils/` helpers, barrels), ~24 standalone components remain.

```bash
find src/components -name "*.stories.tsx" | sort
```

Result at time of writing:
```
src/components/button/variations/fill-out/Button.stories.tsx
```

One story file exists. All other components have no coverage.

## Props extraction (Step 3)

**`button/variations/model.ts`** — custom props:
```
label        string
size         ComponentSize   ← union, needs select
icon         ReactNode       ← needs control: false
drawIcon     boolean
invert       boolean
simpleColor  boolean
accentColor  string
```
`disabled` is inherited from `ButtonHTMLAttributes`, not re-declared — not a custom prop, but triggers the `Disabled` required story.

**`dialog/Dialog.tsx`** — inline interface — custom props:
```
closeDialog  () => void
title        string
text         string
dto          DialogCTO       ← complex object, needs control: false
acceptText   string
rejectText   string
onAccept     () => void
onReject     () => void
size         ComponentSize   ← union, needs select
```

**`tab/TabMenu.tsx`** — inline interface — custom props:
```
items        TabMenuItem[]   ← complex array, needs control: false
arrowLeft    ReactNode       ← needs control: false
arrowRight   ReactNode       ← needs control: false
size         ComponentSize   ← union, needs select
displayArrow boolean
```

**`interaction/flipping-card/FlippingCard.tsx`** — inline interface — custom props:
```
duration      number
ease          string
horizontal    boolean
scroller      RefObject<any>
trigger       RefObject<any>
pin           boolean
pinSpacing    string
start         string
end           string
toggleActions string
scrub         boolean | number  ← union, needs select
markers       boolean
```

## Story evaluation (Step 4)

**`button/variations/fill-out/Button.stories.tsx`**

```bash
grep -c "autodocs" Button.stories.tsx          # → 1  ✓
grep "^export const" Button.stories.tsx        # → Default, Small, Large
grep -A 30 "argTypes" Button.stories.tsx       # → size (select) present; icon absent
```

- autodocs: ✓
- `Default` exported: ✓
- `AllSizes` exported: ✗ (component has `size`)
- `Disabled` exported: ✗ (component inherits `disabled`)
- Missing argTypes: `icon` (ReactNode, `control: false` needed)

## Output

| Component | Story | autodocs | Missing argTypes | Missing stories |
|---|---|---|---|---|
| `animation/appear-timeline/AppearTimeline` | ✗ | — | — | all |
| `animation/appear/AnimationItem` | ✗ | — | — | all |
| `animation/state-orchestrator/StoryTellingOrchestrator` | ✗ | — | — | all |
| `animation/text/TextAnimator` | ✗ | — | — | all |
| `button/variations/download/DownloadButton` | ✗ | — | — | all |
| `button/variations/fill-out/button` | ✓ | ✓ | `icon` | `AllSizes`, `Disabled` |
| `button/variations/light-btn/LightButton` | ✗ | — | — | all |
| `button/variations/link/LinkButton` | ✗ | — | — | all |
| `carousel/basic-carousel/BasicCarousel` | ✗ | — | — | all |
| `carousel/index-indicator/BasicIndexIndicator` | ✗ | — | — | all |
| `carousel/index-indicator/NumberIndexIndicator` | ✗ | — | — | all |
| `carousel/toggle-btn/BasicCarouselToggleBtn` | ✗ | — | — | all |
| `dialog/Dialog` | ✗ | — | — | all |
| `form/Form` | ✗ | — | — | all |
| `form/input/basic/BasicInput` | ✗ | — | — | all |
| `form/input/calendar/Calendar` | ✗ | — | — | all |
| `form/input/checkbox/Checkbox` | ✗ | — | — | all |
| `form/input/dropdown/Dropdown` | ✗ | — | — | all |
| `form/input/phone/PhoneNumberInput` | ✗ | — | — | all |
| `form/input/photo/PhotoInput` | ✗ | — | — | all |
| `form/input/plain/PlainInput` | ✗ | — | — | all |
| `form/input/slider/ProgressInput` | ✗ | — | — | all |
| `form/input/textarea/TextArea` | ✗ | — | — | all |
| `form/searchform/SearchForm` | ✗ | — | — | all |
| `interaction/flipping-card/FlippingCard` | ✗ | — | — | all |
| `svg/draw/SvgDraw` | ✗ | — | — | all |
| `svg/morph/SvgMorph` | ✗ | — | — | all |
| `tab/TabMenu` | ✗ | — | — | all |

**Summary**
- 28 components scanned
- 27 missing story file entirely
- 0 stories missing `autodocs` tag
- 1 story missing required stories (`AllSizes`, `Disabled`)
- 1 story with argType gaps (`icon`)

## Common mistakes to avoid

1. Including `utils/` helper files (e.g. `DialogCTOs.tsx`, `submittingIndicator.tsx`) as auditable components — they are not standalone Storybook stories.
2. Flagging `boolean`, plain `string`, or `number` props as missing argTypes — Storybook auto-generates controls for those.
3. Flagging callback props (`() => void`, `onAccept`, `closeDialog`) — they are not UI controls and do not need argTypes.
4. Missing that `disabled` comes from `ButtonHTMLAttributes` and still triggers the `Disabled` required story check.
5. Reporting `AllSizes` as missing when the component has no `size` prop.