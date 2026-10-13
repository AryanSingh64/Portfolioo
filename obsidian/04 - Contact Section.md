# 04 - Contact Section Specification: Monochrome & Bottom Wave

## Visual Architecture
- **Wave Position**: Moved from the top to the **bottom** of the section.
- **Monochrome Black & White Palette**:
  - Removed blue tint in favor of pure luxury monochrome (deep pitch black `#000000` foundation with crisp silver and white lines).
  - Glowing white crest line (`stroke: #ffffff; filter: drop-shadow(0 0 16px rgba(255, 255, 255, 0.8))`).
- **Shiny Diamond Stars**:
  - 6 bright white 4-pointed flare stars positioned along the undulating wave crest at the bottom.
  - Animated with a twinkling rotation & shimmer effect (`@keyframes starGlisten`).
- **Calligraphy Typography**:
  - `Contact Me` in `Pinyon Script` with delicate hanging heart ornaments.
  - Hover contraction & intense diamond white bloom.
- **Three.js Volumetric Cloud Background**:
  - Embedded directly as the background canvas (`.cloudCanvasBg`) of the Contact section.
  - As user scrolls from Projects into Contact, 3D textured cumulus clouds billow inwards and part to frame the calligraphy and stars.
  - Scrubbed with GSAP ScrollTrigger (`trigger: #contact`, `start: "top bottom"`, `end: "bottom top"`).

