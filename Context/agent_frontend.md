# Frontend Agent — Dog Adoption Portal

## Role
You are the **Frontend Agent**. Your sole responsibility is to build all HTML, CSS,
and JavaScript files for the Dog Adoption website. You do not touch dogs_data.json,
you do not set up Postman, and you do not write tests.

## Context Files (add to Claude Code context)
- `types.ts`       — Dog interface, page element shapes, utility signatures
- `api.types.ts`   — API_BASE placeholder, ApiClient interface

## Your Deliverables
Create every file below inside the `src/` folder:

```
src/
├── index.html
├── dog.html
├── adopt.html
├── thankyou.html
├── styles.css
├── index.css
├── dog.css
├── adopt.css
├── thankyou.css
├── script.js
├── index.js
├── dog.js
├── adopt.js
└── thankyou.js
```

---

## script.js — Shared Utilities

Define and expose these functions globally (no ES modules):

```js
const API_BASE = "YOUR_POSTMAN_MOCK_URL_HERE"; // replaced by Backend Agent

function getDogIdFromURL() {
  // reads ?id= from window.location.search
  // returns integer
}

function formatBoolean(value) {
  // true  → "Yes"
  // false → "No"
  // null  → "Unknown"
}

function fetchAllDogs() {
  // GET ${API_BASE}/dogs
  // returns Promise<Dog[]>
}

function fetchDogById(arrayIndex) {
  // GET ${API_BASE}/dogs/${arrayIndex}
  // returns Promise<Dog>
}

function postAdoption(arrayIndex, payload) {
  // POST ${API_BASE}/dogs/${arrayIndex}
  // body: { email, fullname, phone }
  // returns Promise<{ success, message }>
}
```

---

## Page Specifications

### index.html
- Heading: `<h1>Dogs for Adoption</h1>`
- Container `<div>` with exactly **6 static** dog card `<div>` elements
- Each card contains: `<img>`, `<h2>`, `<a>` with text "More Info"
- `index.js` calls `fetchAllDogs()`, loops cards, populates:
  - `img.src` ← `dog.first_image_url`
  - `h2.textContent` ← `dog.name`
  - `a.href` ← `dog.html?id=<arrayIndex>` (0-based index, NOT dog.id)

### dog.html
- Heading: `<h1 id="dog-heading"></h1>` → filled with `"<Name> Details"`
- Shows: large image, name, breed, age, sex, house_trained, vaccinated, story
- `house_trained` and `vaccinated` use `formatBoolean()`
- Buttons:
  - `<button id="prev-btn">Prev</button>` — hidden if arrayIndex === 0
  - `<button id="next-btn">Next</button>` — hidden if arrayIndex === 5
  - `<a id="adopt-btn">Adopt Me!</a>` → `adopt.html?id=<arrayIndex>`
  - `<a id="back-link">Back to list</a>` → `index.html`

### adopt.html
- Heading: `<h1>Adopt <span id="dog-name"></span></h1>`
- Shows dog image and name above the form
- `<form id="adopt-form">`:
  - `<input type="email"  name="email"    required>`
  - `<input type="text"   name="fullname" required>`
  - `<input type="tel"    name="phone"    required>`
  - `<button type="submit">Send</button>`
- On submit: `e.preventDefault()` → call `postAdoption()` → navigate to `thankyou.html?id=N`

### thankyou.html
- Heading: `<h1>Thank You!</h1>`
- Shows dog image, dog name, and the text: **"Thank you for your enquiry!"**
- `<a href="index.html">Back to home</a>`

---

## CSS Rules

| File         | Responsibility                                              |
|--------------|-------------------------------------------------------------|
| styles.css   | Reset, box-sizing, body font, container, buttons, links    |
| index.css    | Card grid — flexbox wrap, `object-fit: cover` on images    |
| dog.css      | Detail layout, hero image sizing                           |
| adopt.css    | Form layout, input width/padding/borders                   |
| thankyou.css | Centered confirmation card                                 |

- No CSS frameworks. Plain CSS only.
- Warm, clean, modern design.
- Each HTML page must link `styles.css` **and** its own CSS file.
- Each HTML page must load `script.js` **before** its own JS file.

---

## Technical Rules
- Vanilla HTML / CSS / JS only — no libraries or frameworks
- All JS runs inside `document.addEventListener('DOMContentLoaded', ...)`
- Use `fetch()` for all API calls
- Use DOM manipulation: `createElement`, `appendChild`, `querySelector`, etc.

---

## ⚠️ ID vs Array Index
`dogs_data.json` has an `"id"` field (1–6).
URL params use the **array index** (0–5).

| arrayIndex | dog.id | dog.name     |
|------------|--------|--------------|
| 0          | 1      | Brandi       |
| 1          | 2      | 24-063 Juno  |
| 2          | 3      | 24-103 Monty |
| 3          | 4      | 25-088 Ez    |
| 4          | 5      | Jimmy        |
| 5          | 6      | 25-067 Bodger|

Never use `dog.id` as the URL param. Always use the array index.

---

## Handoff to Backend Agent
Leave `API_BASE = "YOUR_POSTMAN_MOCK_URL_HERE"` in `script.js`.
The Backend Agent will provide the real URL to replace it with.

---

# Phase 2 — Gamification & UI Polish (Minimal)

## Hard constraint
The submission must contain **exactly the 14 files** listed above inside `src/`.
**No new files allowed.** All Phase 2 features live inside the existing 14 files.

## Scope (4 features only)

### 1. Design system — `styles.css`
- Add Google Fonts link in every HTML page `<head>`: Nunito (weights 400, 700)
- Define CSS variables on `:root`:
  - `--primary: #f97316` (warm orange)
  - `--primary-dark: #ea580c`
  - `--accent: #fbbf24`
  - `--bg: #fffaf5` (cream)
  - `--card: #ffffff`
  - `--text: #1f2937`
  - `--muted: #6b7280`
  - `--success: #10b981`
  - `--shadow-md: 0 6px 18px rgba(0,0,0,0.08)`
  - `--radius: 14px`
- Replace existing colors throughout `styles.css` with these variables
- Body uses `font-family: 'Nunito', system-ui, sans-serif`
- Body fade-in animation on load

### 2. sessionStorage cache — `script.js`
- `fetchAllDogs()` checks `sessionStorage.getItem('dogs_cache')` first
- On cache miss: fetch, store as JSON, return
- On cache hit: parse and return immediately
- Eliminates the slow Next button (no network round-trip)

### 3. Favorites — `script.js` + page files
Add these helpers to `script.js` (alongside the existing utilities):
```js
function getFavorites() { /* returns array of indexes from localStorage */ }
function toggleFavorite(index) { /* adds/removes, returns new state */ }
function isFavorite(index) { /* boolean */ }
```

In `index.html`: add a `<header>` element above the dogs container with:
- Site title on the left
- `<a href="#" id="fav-counter">❤️ <span id="fav-count">0</span></a>` on the right

In `index.js`:
- After populating cards, add a heart button to each card (`createElement('button')`)
- Heart shows filled (❤️) or empty (🤍) based on `isFavorite(index)`
- Click toggles favorite, updates heart, updates `#fav-count`
- On load, set `#fav-count` from `getFavorites().length`

In `dog.html`: add `<button id="fav-btn"></button>` next to the Adopt Me button.
In `dog.js`: same toggle behavior, syncs with `localStorage`.

In `index.css` and `dog.css`: heart button styling — no border, large emoji, hover scale.

### 4. Confetti on Thank You — `thankyou.js` + `thankyou.css`
Pure JS/CSS confetti, no library:
- On `DOMContentLoaded`, after dog data loads, spawn 40 `<div class="confetti">` elements with random `left`, `background-color`, `animation-delay`
- CSS keyframe `@keyframes fall` translates Y from -10vh to 110vh with rotation
- Add a big animated checkmark above the heading (SVG with `stroke-dasharray` draw-in)

## What NOT to do in Phase 2
- ❌ Don't create new HTML/CSS/JS files
- ❌ Don't add a quiz, badges modal, points system, shortlist page
- ❌ Don't break existing element IDs (`prev-btn`, `next-btn`, `dog-heading`, `adopt-form`, `adopt-btn`, `back-link`)
- ❌ Don't modify `dogs_data.json`
