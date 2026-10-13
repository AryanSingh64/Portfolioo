# 05 - GSAP Animations & Motion Architecture

## GSAP Plugins
- **Core GSAP 3**
- **ScrollTrigger** (`gsap/ScrollTrigger`)

## Key Animations Implemented

### 1. Hero Entrance Animation
- **Name & Role**: Staggered opacity and vertical rise on page load.
- **Nav Links**: Staggered slide-in from the right edge with `delay: 0.4`.

### 2. Scroll-Pinned Cards Scrub
- **Trigger**: `#home` section.
- **Pin**: `true` (pinned for `+=180%` of viewport height).
- **Scrub**: `1.4` (smooth inertia interpolation).
- **Timeline**:
  - Box 1: `x: -110vw` ➔ `0` (offset: 0)
  - Box 2: `x: -110vw` ➔ `0` (offset: 0.25)
  - Box 3: `x: -110vw` ➔ `0` (offset: 0.5)

### 3. About Section Stagger Reveal
- **Timeline Milestones**: Staggered `y: 24` ➔ `0`, `opacity: 0` ➔ `1` when scrolled into view (`start: "top 85%"`).
- **Image Cards Grid**: Staggered `y: 40` ➔ `0`, `opacity: 0` ➔ `1` with `power3.out` curve (`start: "top 80%"`).

### 4. Projects-to-Contact Three.js WebGL Volumetric Cloud Transition
- **Trigger**: `.cloudTransitionZone` (pinned for `+=120%` scroll height between Projects and Contact).
- **Engine**: Three.js WebGL with high-resolution volumetric cumulus particle sprites (`/cloud_puff.png` with feathered alpha).
- **Lighting**: Directional moonlight (`0xffffff`, intensity 2.5), ambient sky light (`0x7c8ba1`), and indigo rim lighting (`0xa5b4fc`).
- **Scrubbing**: GSAP ScrollTrigger `scrub: 1.2` with `anticipatePin: 1`.
- **Phase 1 (Convergence & Billow, 0 ➔ 0.45)**: Left and right 3D cloud clusters converge into screen center, center cluster billows upward, camera dives forward (`z: 1050 ➔ 750`), envelops viewport in realistic moonlight clouds; badge and title reveal.
- **Phase 2 (Curtain Parting & Descent, 0.55 ➔ 1.0)**: Clouds part horizontally to the left (`x: -1100`) and right (`x: 1100`), center clouds drift down, camera pushes through the parted clearing (`z: 450`), revealing the Contact section and stars below.


