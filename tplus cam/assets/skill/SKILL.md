Frontend Design Skills
Core Philosophy

Mobile-first: Design for small screens, then scale up
Component-driven: Build reusable, composable UI components
Accessibility first: WCAG 2.1 AA compliance is the baseline, not an afterthought
Performance-aware: Every design decision has a performance cost — weigh it
Consistency over cleverness: Follow established patterns before inventing new ones


Layout & Structure
Grid & Spacing

Use an 8pt spacing system (4, 8, 12, 16, 24, 32, 48, 64px)
Prefer CSS Grid for two-dimensional layouts; Flexbox for one-dimensional
Max content width: 1280px (with 1536px for wide/dashboard layouts)
Maintain consistent horizontal padding: 16px (mobile), 32px (tablet), 64px (desktop)

Responsive Breakpoints
xs:  < 480px    (small mobile)
sm:  480–767px  (mobile)
md:  768–1023px (tablet)
lg:  1024–1279px (desktop)
xl:  1280–1535px (wide desktop)
2xl: ≥ 1536px  (ultra-wide)

Typography

Scale: Use a modular type scale (e.g., 1.25 ratio)

xs: 12px, sm: 14px, base: 16px, lg: 18px, xl: 20px, 2xl: 24px, 3xl: 30px, 4xl: 36px, 5xl: 48px


Line height: 1.5 for body text; 1.2–1.3 for headings
Max line length: 60–75 characters (max-w: 65ch) for body copy
Font weight hierarchy: 400 body, 500 medium/labels, 600 semibold/subheadings, 700 bold/headings
Avoid: More than 2–3 typefaces per project; system fonts are often the best choice


Color
System

Define a semantic color palette, not just raw values:

--color-bg, --color-surface, --color-border
--color-text-primary, --color-text-secondary, --color-text-disabled
--color-primary, --color-primary-hover, --color-primary-active
--color-success, --color-warning, --color-error, --color-info



Contrast & Accessibility

Normal text: minimum 4.5:1 contrast ratio
Large text (18px+ or 14px+ bold): minimum 3:1
UI components & focus indicators: minimum 3:1
Never rely on color alone to convey meaning — always pair with an icon or label

Dark Mode

Use CSS custom properties (var(--color-*)) for all color values
Support prefers-color-scheme via media query or [data-theme] attribute
Test both themes at design time, not as an afterthought


Components
Buttons

Minimum touch target: 44×44px
States: default, hover, focus, active, disabled, loading
Variants: primary, secondary, ghost, destructive, icon-only
Always include a visible focus ring (outline or box-shadow)

Forms

Labels must always be visible (no placeholder-only labels)
Show validation errors inline, beneath the field, in red with an icon
Group related fields with <fieldset> + <legend>
Required fields: mark with an asterisk and a legend note
Disable submit only after first submission attempt, not before

Navigation

Highlight current page/section in nav
Hamburger menus must be keyboard and screen-reader accessible
Skip-to-content link as the first focusable element on every page

Modals & Overlays

Trap focus inside open modals
Close on Escape key and backdrop click (unless destructive action)
Return focus to the trigger element on close
Use aria-modal="true" and role="dialog"

Loading States

Use skeleton screens for content-heavy loads (preferred over spinners)
Show spinners for short, action-triggered operations (<3s)
Never leave the UI in an ambiguous state — always indicate progress


Motion & Animation

Respect prefers-reduced-motion — wrap all non-essential animations:

css  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }

Duration guide: micro-interactions 100–200ms, transitions 200–400ms, page-level 300–500ms
Easing: ease-out for elements entering; ease-in for elements leaving; ease-in-out for continuous motion
Animate transform and opacity whenever possible (GPU-composited)
Avoid animating width, height, top, left (triggers layout)


Accessibility (a11y)

Semantic HTML first: use the right element before reaching for role
All images need alt text (empty alt="" for decorative images)
Interactive elements must be keyboard operable (tab, enter, space, arrow keys)
Use aria-label, aria-describedby, and aria-live where native semantics fall short
Test with a screen reader (VoiceOver, NVDA) and keyboard-only navigation
Never remove outline without providing an equivalent visible focus style


Performance

Lazy-load images and below-the-fold components
Use next/image, <img loading="lazy">, or IntersectionObserver
Prefer CSS for animations over JavaScript
Minimize layout shifts (set explicit width/height on images and embeds)
Avoid large bundle imports — tree-shake and code-split aggressively
Target Core Web Vitals: LCP < 2.5s, FID/INP < 200ms, CLS < 0.1


Code Style
CSS / Tailwind

Prefer utility classes (Tailwind) for rapid UI; extract components for repeated patterns
Avoid deeply nested selectors (max 3 levels)
Use logical properties (margin-inline, padding-block) for RTL support

React / Component Structure
ComponentName/
  index.tsx          # Main component
  ComponentName.tsx  # Implementation
  ComponentName.test.tsx
  ComponentName.stories.tsx
  styles.module.css  # (if not using Tailwind)

Keep components small and single-responsibility
Lift state only as high as needed
Use React.memo / useMemo / useCallback judiciously — profile before optimizing


Design Tokens (Reference)
css:root {
  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;

  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0,0,0,0.1);

  /* Z-index scale */
  --z-base: 0;
  --z-raised: 10;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-overlay: 300;
  --z-modal: 400;
  --z-toast: 500;
  --z-tooltip: 600;
}

Checklist Before Shipping

 Tested on mobile (real device or accurate emulation)
 Keyboard navigation works end-to-end
 Color contrast passes WCAG AA
 Dark mode looks correct
 All images have alt text
 Loading, empty, and error states are handled
 prefers-reduced-motion respected
 No console errors or warnings
 Lighthouse score: Performance ≥ 90, Accessibility ≥ 95