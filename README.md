# 🐾 Paws & Hearts — Dog Adoption Portal

A warm, gamified dog adoption website built with vanilla HTML, CSS & JavaScript. Browse adorable dogs, favorite the ones you love, and submit adoption inquiries — all with delightful micro-interactions.

## Preview

```
index.html → dog.html?id=N → adopt.html?id=N → thankyou.html?id=N
   cards        details          form             confetti!
```

## Features

**Core**
- 6 dog profiles fetched from a REST API (Postman mock)
- Detail pages with breed, age, story, vaccination status
- Prev/Next navigation between dogs
- Adoption inquiry form with validation

**Gamification (Bonus)**
- ❤️ **Favorites** — heart any dog, count persists in localStorage
- ⚡ **Instant navigation** — sessionStorage caches API responses
- 🎉 **Confetti celebration** — 60 animated pieces on the thank-you page
- ✅ **Animated checkmark** — SVG draw-in on submission success
- 🐾 **Paw favicon** — inline SVG, no extra files

## Quick Start

```bash
# Option 1: Static server
npx serve src -p 3000
open http://localhost:3000/index.html

# Option 2: Direct file
open src/index.html   # in Chrome
```

## Project Structure

```
src/
├── index.html          Main page — dog card grid
├── dog.html            Detail page — full profile + prev/next
├── adopt.html          Form page — email, name, phone
├── thankyou.html       Confirmation — confetti + checkmark
├── styles.css          Shared design system (CSS variables, Nunito font)
├── index.css           Card grid, heart buttons, hover effects
├── dog.css             Detail layout, favorite button
├── adopt.css           Form styling
├── thankyou.css        Confetti animation, checkmark draw-in
├── script.js           API client, utilities, favorites helpers
├── index.js            Card population, heart toggles
├── dog.js              Detail rendering, prev/next, favorites
├── adopt.js            Form handling, POST submission
├── thankyou.js         Confetti spawner, dog info display
└── dogs_data.json      Source data (do not modify)
```

## REST API

| Endpoint | Method | Body | Returns |
|----------|--------|------|---------|
| `/dogs` | GET | — | All 6 dogs |
| `/dogs/:id` | GET | — | Single dog by array index (0–5) |
| `/dogs/:id` | POST | `{email, fullname, phone}` | `{success, message}` |

> **Note:** `:id` is the array index (0–5), not the dog's `id` field (1–6).

## Tech

- HTML5 / CSS3 / vanilla JS — zero dependencies
- Postman mock server for data
- Google Fonts (Nunito) loaded via CDN
- localStorage for favorites, sessionStorage for API cache

## Design

- Warm cream/orange palette with CSS custom properties
- Nunito font family
- Cards with hover lift + shadow transitions
- Fade-in page animations
- Responsive flex-wrap grid

---

Built for Web Development Assignment 1.
