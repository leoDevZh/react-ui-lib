# UI Library — Audit & Issue Tracker

> Full scope audit conducted 2026-06-25.  
> Check off `[ ]` items as they are resolved. Group by phase = recommended cleanup order.  
> Reference this file in new Claude sessions to skip re-deriving context.

---

## Stable — do not touch

These are already correct. Use them as the reference pattern when fixing the issues below.

| What | Why it's the reference |
|------|------------------------|
| Theme system (`src/components/provider/theme/`) | Clean CSS-variable injection, SSR-safe, runtime-switchable |
| `SearchForm.tsx` | Only form component with correct `forwardRef` + `useImperativeHandle` |
| `StepInput.tsx` | Best accessibility in the entire form suite — `role="group"`, `aria-pressed`, keyboard nav |
| Animation components (`animation/`) | All use `forwardRef` and expose imperative handles correctly |
| `SvgMorph.tsx` / `SvgDraw.tsx` / `FlippingCard.tsx` | Correct GSAP cleanup via `gsap.context()` + `ctx.revert()` |
| CSS Modules discipline | Colocated `.module.css`, `filter(Boolean).join(' ')` class composition |
| Bundle config (`rollup.config.mjs`) | All peer deps externalised, CJS + ESM + `.d.ts` output |
| `ComponentSize` type | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` — applied consistently everywhere |
| TypeScript strict config | `strict`, `noUnusedLocals`, `noImplicitReturns`, `noUncheckedIndexedAccess` all on |

---

## Phase 1 — Correctness bugs
*Fix these first — highest confidence, no behaviour risk.*

- [ ] **CheckboxInput: `useRef` created inside `.map()` render loop**  
  `src/components/form/input/checkbox/Checkbox.tsx:48`  
  Violates Rules of Hooks; ref recreated every render, breaks animation targeting. Pre-create a ref array at component level (same pattern `TabMenu` uses with `tabItemsRef`).  
  *Effort: quick win — Priority: high*

- [ ] **PhoneNumberInput: module-level array mutated on each mount**  
  `src/components/form/input/phone/PhoneNumberInput.tsx:30,70`  
  `countriesSelection` is module-level, then filtered in-place based on `whiteList` prop. Second instance or remount receives an already-mutated list. Move inside component or `useMemo`.  
  *Effort: quick win — Priority: high*

- [ ] **BasicCarousel: resize listener not cleaned up**  
  `src/components/carousel/basic-carousel/BasicCarousel.tsx:72`  
  `window.addEventListener('resize', resizeItems)` has no matching `removeEventListener` in the `useEffect` cleanup return.  
  *Effort: quick win — Priority: medium*

- [ ] **SvgDraw: dependency array incomplete**  
  `src/components/svg/draw/SvgDraw.tsx:88`  
  Array is `[triggerMode, duration, ease]` — missing `scroller`, `trigger`, `pin`, `className`. Causes stale closures when those props change. Mirror `SvgMorph`'s complete dependency array.  
  *Effort: quick win — Priority: medium*

- [ ] **Form: `field.label` used as list key**  
  `src/components/form/Form.tsx:322`  
  Labels may not be unique; use `field.name` which is guaranteed unique by `FieldValues`.  
  *Effort: quick win — Priority: medium*

---

## Phase 2 — Accessibility
*High aggregate impact. Each component is self-contained — pick off one at a time.*

- [ ] **Dialog: missing all semantic dialog structure**  
  `src/components/dialog/Dialog.tsx`  
  Add `role="dialog"`, `aria-modal="true"`, `aria-labelledby`/`aria-describedby`. Add focus trap (small utility or `<FocusTrap>`). Add ESC key handler and backdrop-click dismiss.  
  *Effort: medium — Priority: high*

- [ ] **TabMenu: ARIA wiring half-done**  
  `src/components/tab/TabMenu.tsx`  
  `role="tablist"` and `aria-selected` exist but: tab buttons have no `id="tab-{idx}"` so `aria-labelledby` on the panel points to nothing; `aria-controls` on tabs is absent; no `ArrowLeft`/`ArrowRight` key navigation.  
  *Effort: quick win (attrs) + small key handler — Priority: high*

- [ ] **All form inputs: labels not associated with inputs**  
  `BasicInput.tsx`, `TextArea.tsx`, `Checkbox.tsx`, `PhoneNumberInput.tsx`  
  `<label>` wraps text but has no `htmlFor`; input has no `id`. Screen readers can't announce the label on focus.  
  *Effort: quick win per component — Priority: high*

- [ ] **All form inputs: no `aria-invalid` / `aria-describedby` on errors**  
  All files under `src/components/form/input/`  
  Validation errors render visually but inputs don't carry `aria-invalid="true"` or `aria-describedby` linking to the error message.  
  *Effort: quick win per component — Priority: high*

- [ ] **Dropdown: non-semantic `<div>` with no ARIA**  
  `src/components/form/input/dropdown/Dropdown.tsx:84`  
  Has `tabIndex={0}` but no `role="combobox"`, no `aria-expanded`, no `role="listbox"` on the option list, no arrow-key navigation.  
  *Effort: medium (full combobox pattern) — Priority: high*

- [ ] **Calendar: day cells are `<span>` elements**  
  `src/components/form/input/calendar/Calendar.tsx`  
  Clickable day spans have no `role="button"`, no `tabIndex`, no keyboard handlers. Convert to `<button>` or add role + key handling.  
  *Effort: medium — Priority: high*

- [ ] **Carousel: no accessibility structure**  
  `src/components/carousel/basic-carousel/BasicCarousel.tsx`  
  `src/components/carousel/toggle-btn/BasicCarouselToggleBtn.tsx`  
  Missing `role="region"`, `aria-roledescription="carousel"`, `aria-label` on toggle buttons, keyboard navigation, `aria-live` on index indicator.  
  *Effort: medium — Priority: medium*

- [ ] **FlippingCard: mouse-only interaction**  
  `src/components/interaction/flipping-card/FlippingCard.tsx`  
  Only `mouseenter`/`mouseleave` triggers flip. Add `role="button"`, `tabIndex={0}`, `onFocus`/`onBlur` equivalents.  
  *Effort: quick win — Priority: medium*

- [ ] **SVG components: not hidden from assistive tech**  
  `src/components/svg/draw/SvgDraw.tsx`, `src/components/svg/morph/SvgMorph.tsx`  
  Decorative animated SVGs should carry `aria-hidden="true"`.  
  *Effort: quick win — Priority: low*

---

## Phase 3 — Quick-win type safety

- [ ] **`zIndex.heigh` typo in `Theme` type**  
  `src/components/provider/theme/ThemeContext.tsx`  
  Key should be `high`. Also used as `--zIndex-heigh` in `SearchForm` CSS. Rename both — find all usages with grep first.  
  *Effort: quick win — Priority: medium*

- [ ] **Calendar: add `locale` prop**  
  `src/components/form/input/calendar/Calendar.tsx:76,87,94`  
  Locale hardcoded to `'de'`. Add `locale?: string` prop defaulting to `'de'` (non-breaking).  
  *Effort: quick win — Priority: high*

- [ ] **`RefObject<any>` in StoryTellingOrchestrator**  
  `src/components/animation/state-orchestrator/StoryTellingOrchestrator.tsx:34`  
  `scroller` prop should be `RefObject<HTMLElement>`.  
  *Effort: quick win — Priority: low*

- [ ] **`position: any` in ProgressInput**  
  `src/components/form/input/slider/ProgressInput.tsx`  
  Local variable should be typed `number`.  
  *Effort: quick win — Priority: low*

- [ ] **`FieldConfig.type` switch not exhaustiveness-checked**  
  `src/components/form/Form.tsx:221`  
  Add a `never`-assertion on the `default` branch so TypeScript errors when a new type is added without a case.  
  *Effort: quick win — Priority: medium*

---

## Phase 4 — `forwardRef` on form inputs and buttons
*Non-breaking — refs are opt-in. Add a typed `Ref` interface per component.*

- [ ] **Form inputs: add `forwardRef`**  
  `src/components/form/input/basic/BasicInput.tsx`  
  `src/components/form/input/checkbox/Checkbox.tsx`  
  `src/components/form/input/dropdown/Dropdown.tsx`  
  `src/components/form/input/calendar/Calendar.tsx`  
  `src/components/form/input/textarea/TextArea.tsx`  
  `src/components/form/input/phone/PhoneNumberInput.tsx`  
  `src/components/form/input/photo/PhotoInput.tsx`  
  `src/components/form/input/slider/ProgressInput.tsx`  
  `src/components/form/input/stepper/StepInput.tsx`  
  Use `SearchForm.tsx` as the reference implementation.  
  *Effort: medium per component — Priority: high*

- [ ] **Button variations: add `forwardRef`**  
  `src/components/button/variations/fill-out/button.tsx`  
  `src/components/button/variations/link/LinkButton.tsx` (renders `<a>`, consumers need DOM ref)  
  `src/components/button/variations/light-btn/LightButton.tsx`  
  `src/components/button/variations/download/DownloadButton.tsx`  
  *Effort: quick win per component — Priority: medium*

---

## Phase 5 — Extract shared utilities

- [ ] **`useIsomorphicLayoutEffect` defined in two places**  
  `src/components/svg/morph/SvgMorph.tsx`  
  `src/components/svg/draw/SvgDraw.tsx`  
  Extract to `src/hooks/useIsomorphicLayoutEffect.ts` and re-import.  
  *Effort: quick win — Priority: low*

- [ ] **Font-size `useLayoutEffect` pattern duplicated in three files**  
  `src/components/form/Form.tsx`, `src/components/form/searchform/SearchForm.tsx`, `src/components/form/input/basic/BasicInput.tsx`  
  Same "read computed fontSize → set `--calc-font-size` CSS var" block. Extract to `src/hooks/useCalcFontSize.ts`.  
  *Effort: quick win — Priority: low*

- [ ] **Animation-type switch duplicated across two components**  
  `src/components/animation/appear/AnimationItem.tsx`  
  `src/components/animation/text/TextAnimator.tsx`  
  The same 8 animation-type → GSAP-props mapping appears in both. Extract to `src/components/animation/utils/animationPresets.ts`.  
  *Effort: quick win — Priority: medium*

---

## Phase 6 — Public `any` types
*Threading generics is technically a breaking change for consumers. Consider a major version bump or deprecation path.*

- [ ] **`SelectionNode.value: any`**  
  `src/components/form/Form.tsx:74`  
  Thread a generic `V` through `SelectionNode<V>` and update all usages.  
  *Effort: medium — Priority: high*

- [ ] **`FieldConfig.validationFn: (value: any) => …`**  
  `src/components/form/Form.tsx`  
  Should be `(value: T[keyof T]) => boolean | string`.  
  *Effort: medium — Priority: high*

- [ ] **`DialogCTO.props?: any`**  
  `src/components/dialog/utils/DialogCTOs.tsx:3`  
  Use a generic `P` or at minimum `Record<string, unknown>`.  
  *Effort: quick win — Priority: medium*

- [ ] **`SubmittingIndicator.props?: any`**  
  `src/components/form/utils/submittingIndicator.tsx:8`  
  Same as above — `Record<string, unknown>` or a generic.  
  *Effort: quick win — Priority: medium*

---

## Phase 7 — Larger refactors
*Tackle last, after everything else is stable.*

- [ ] **PhoneNumberInput: consolidate nested `useForm`**  
  `src/components/form/input/phone/PhoneNumberInput.tsx:40`  
  Currently has an inner `react-hook-form` instance for country + phone number, disconnected from the outer form. Drive both from a single controlled state sourced from the outer form's `setValue`/`currentValue` pattern.  
  *Effort: larger refactor — Priority: medium*

- [ ] **StoryTellingOrchestrator: replace `cloneElement` + `@ts-ignore`**  
  `src/components/animation/state-orchestrator/StoryTellingOrchestrator.tsx:117-118`  
  Uses `cloneElement(child as any, …)` to inject refs. A wrapper component pattern avoids `cloneElement` and the `@ts-ignore` entirely.  
  *Effort: larger refactor — Priority: medium*

- [ ] **`JSON.stringify` for form change detection**  
  `src/components/form/Form.tsx:179`  
  `src/components/form/searchform/SearchForm.tsx:74`  
  `useMemo` uses `JSON.stringify(watch())` as a stability key — serialises the entire form on every render. Replace with `useWatch` per-field or `react-hook-form`'s subscription API.  
  *Effort: medium — Priority: medium*