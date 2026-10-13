# 01 - Hero Section Specification

## Design Directives (from User & Hand-drawn Sketch)
- **Classy Roman Typeface**: Cormorant Garamond italic serif (`clamp(5rem, 12vw, 10rem)`).
- **Navigation**: Right side, vertical column:
  - Links: `Home`, `About`, `Projects`, `Contact`.
  - Font: `Cinzel` serif, increased by 10px (~`1.525rem`), letter-spaced.
- **Scroll-Driven Cards**:
  - Centered vertically in the hero section.
  - Sourced from `/public/abs/` (`image.png`, `image copy.png`, `image copy 2.png`).
  - Slide into view from offscreen left to center as user scrolls.
- **GSAP ScrollTrigger**:
  - `pin: true` locks hero for `+=180%` scroll distance.
  - `scrub: 1.4` provides smooth fluid motion tracking the scrollbar.
