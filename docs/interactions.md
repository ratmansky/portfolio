# Link interactions

## Letter-fill hover (desktop)

Links with the `hover-link` class use a gradient clipped to text. On `:hover` / `:focus-visible`, `background-position` animates over **520ms** so text fills with the accent color.

Project titles use the same effect via `.project-title.hover-link` inside `.project-item-link`.

## Touch / mobile tap delay

On devices without hover (`(hover: none)` or `(pointer: coarse)`), the first tap does **not** navigate immediately:

1. Click is intercepted (`preventDefault`).
2. Class `hover-link--filled` is applied to the animated text node.
3. After the fill transition ends (or a timeout fallback), the class is removed, link focus is cleared, then navigation runs:
   - internal routes → React Router `navigate`
   - `mailto:` / relative `href` → `location.assign`
   - `http(s)` → `window.open` in a new tab

Used in `HoverLink` (contact links, case back link) and `ProjectItem` (project list).

**Home contact row** (`src/pages/Home.jsx`, `introLinks`): `e-mail`, `telegram`, `cv` (Google Doc — opens in a new tab like other `http` links).

Desktop pointer hover is unchanged; clicks navigate immediately.

## Reduced motion

When `prefers-reduced-motion: reduce` is on, the gradient fill is disabled. Touch taps navigate immediately with no artificial delay.
