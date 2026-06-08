# Choose Your Faction

An interactive "Choose Your Faction" screen built from the provided design reference, with an animated slat-reveal hero and a faction selector.

**Live demo:** _<add deployed URL here>_

## Tech stack

React 19 + TypeScript + Vite (fast DX), **Tailwind CSS v4** (CSS-first, no config file) for styling, and **GSAP** (+ `@gsap/react`) for the slat-reveal and wheel-scroll animations because it gives precise control over staggered, interruptible timelines that CSS transitions can't.

## What's complete

- Full layout: heading (Oxanium font), body copy, angled **UTILITY** button, `#000 → #0d0d12` gradient background.
- **Hero panel** — image revealed through 6 horizontal slats. On hover, slats expand center-out, sharpen (blur→0) and brighten in a top-to-bottom stagger; on hover-out the exact inverse plays, returning to a blurred, dimmed resting state showing the active faction's icon silhouette.
- **Faction strip** — clickable cards that swap the hero image + icon, active-card highlight, vertical-wheel → horizontal scroll (GSAP `Observer`), hidden scrollbar, pointer cursors.

## What's incomplete / simplified

- **Faction icons are custom inline-SVG approximations**, not the original game art.
- **One shared `main-image.png`** is used for every faction (no per-faction artwork supplied), so the hero image is the same regardless of selection.
- **UTILITY button is non-functional** (visual only); not pixel-perfect to the mock.
- Tuned for **desktop**; only light responsive handling, and no automated tests.

## Decisions & trade-offs

- **Tailwind v4 CSS-first** — registered Oxanium via `@theme` instead of a config file to keep setup minimal.
- **Slat technique** — one image sliced via `background-size`/`background-position` across 6 elements rather than 6 pre-cropped files; simpler to maintain, but the source PNG is ~2.2 MB (would convert to WebP given more time).
- **GSAP over CSS** — needed `overwrite`-based interruption so rapid hover in/out reverses cleanly, plus `Observer` for wheel-to-horizontal scroll.
- **Prioritized animation fidelity** (the core of the brief) over filling in real per-faction assets.

## AI tools used

Built with **Claude Code (Claude Opus)** for essentially the entire task: scaffolding the component, Tailwind setup, all GSAP animation logic, and this README. Used as a pair-programmer with iterative review of each step against the design.

## Time spent

~2 hours.
