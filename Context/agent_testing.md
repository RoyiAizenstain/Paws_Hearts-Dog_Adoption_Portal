# Testing Agent — Dog Adoption Portal

## Role
You are the **Testing Agent**. Your sole responsibility is to write and run automated
tests that verify the Dog Adoption website works correctly.
You do not write HTML, CSS, JS pages, or set up Postman.

## Context Files (add to Claude Code context)
- `types.ts`        — Dog interface, page element shapes, constants
- `api.types.ts`    — ApiClient interface, endpoint definitions
- `tests.types.ts`  — TestResult, MockFetch, all real dog fixtures

## Prerequisites
- Frontend Agent has completed all 14 files in `src/`
- Backend Agent has set `API_BASE` in `script.js`

---

## Your Deliverable
Create `src/tests.js` — a self-contained vanilla JS test suite that:
- Mocks `fetch` globally for all API tests
- Logs `✅ PASS` or `❌ FAIL: <reason>` for each test
- Prints a final summary: `X/Y tests passed`
- Runs by opening browser console on any page, or via `node src/tests.js`

---

## Test Cases

### 1. Utility Functions (script.js)

| Test | Description |
|------|-------------|
| `formatBoolean(true)`  | Returns `"Yes"` |
| `formatBoolean(false)` | Returns `"No"` |
| `formatBoolean(null)`  | Returns `"Unknown"` |
| `getDogIdFromURL()`    | Returns correct integer when `?id=3` in URL |
| `fetchAllDogs()`       | Calls `fetch` with URL ending in `/dogs` |
| `fetchDogById(2)`      | Calls `fetch` with URL ending in `/dogs/2` |

### 2. index.html — Dog List Page

| Test | Description |
|------|-------------|
| Six cards exist       | DOM has exactly 6 card `<div>` elements |
| Cards have `<img>`    | Each card contains an `<img>` element |
| Cards have `<h2>`     | Each card contains an `<h2>` element |
| Cards have "More Info"| Each card has an `<a>` with text "More Info" |
| Links contain `?id=`  | Each `<a>` href contains `"dog.html?id="` |
| img.src populated     | After fetch mock resolves, `img.src` is not empty |

### 3. dog.html — Detail Page

| Test | Description |
|------|-------------|
| Reads `?id` from URL        | `getDogIdFromURL()` returns correct index |
| Dog name in heading         | `<h1>` contains dog name after load |
| `prev-btn` hidden at id=0   | Button with id `prev-btn` is hidden when arrayIndex=0 |
| `next-btn` hidden at id=5   | Button with id `next-btn` is hidden when arrayIndex=5 |
| Both visible at id=2        | Both `prev-btn` and `next-btn` are visible when arrayIndex=2 |
| `adopt-btn` href correct    | Contains `"adopt.html?id="` |

### 4. adopt.html — Form Page

| Test | Description |
|------|-------------|
| Email input exists   | `input[type="email"]` is present and `required` |
| Name input exists    | `input[type="text"]` is present and `required` |
| Phone input exists   | `input[type="tel"]` is present and `required` |
| `preventDefault` called | Form submit does not navigate away |
| POST fetch called    | `fetch` called with method `POST` and correct body |
| Redirects to thankyou | After submit, `window.location` changes to `thankyou.html?id=N` |

### 5. thankyou.html — Confirmation Page

| Test | Description |
|------|-------------|
| Dog name displayed       | Dog name appears in the DOM |
| Enquiry message shown    | `"Thank you for your enquiry!"` text is present |
| Back link correct        | `<a>` with `href="index.html"` exists |

---

## Mock Fetch Template

```js
function mockFetch(responseData, status = 200) {
  const calls = [];
  const original = window.fetch;
  window.fetch = async (url, options) => {
    calls.push({ url, options });
    return {
      ok: status >= 200 && status < 300,
      status,
      json: async () => responseData,
    };
  };
  return {
    calls,
    restore: () => { window.fetch = original; },
  };
}
```

---

## Real Fixtures to Use (from tests.types.ts)

```js
// Use these exact values — they match dogs_data.json
const MOCK_DOGS = [ /* all 6 real dogs */ ];

// Edge cases to test formatBoolean:
// MOCK_DOGS[0] → vaccinated: true  → should display "Yes"
// MOCK_DOGS[1] → vaccinated: null  → should display "Unknown"
// MOCK_DOGS[3] → vaccinated: null  → should display "Unknown"
// MOCK_DOGS[0] → house_trained: true → should display "Yes"
```

---

## ⚠️ ID vs Array Index Reminder
Always test with **array index** (0–5) in URL params, not `dog.id` (1–6).

---

## Verification Checklist
- [ ] All utility function tests pass
- [ ] `prev-btn` hidden correctly at arrayIndex=0
- [ ] `next-btn` hidden correctly at arrayIndex=5
- [ ] `formatBoolean(null)` returns `"Unknown"` (covers Juno, Ez, Monty, Bodger)
- [ ] Form POST sends correct body keys: `email`, `fullname`, `phone`
- [ ] Redirect after submit goes to `thankyou.html?id=N`
- [ ] "Thank you for your enquiry!" message is present on thankyou page

---

# Phase 2 — Tests for Gamification

## File location
`tests.js` lives in the **project root, NOT inside `src/`**. The PDF submission
allows only the 14 listed files in `src/`. `tests.js` is a dev-only artifact and
must NOT be included in the final ZIP.

## New test cases (append to existing suite)

### 1. sessionStorage cache (script.js)
| Test | Description |
|------|-------------|
| First `fetchAllDogs` call hits fetch | Mock fetch is called once |
| Second `fetchAllDogs` call uses cache | Mock fetch call count stays at 1 |
| Cache key is `dogs_cache` | `sessionStorage.getItem('dogs_cache')` is non-null after first call |

Setup: clear `sessionStorage.removeItem('dogs_cache')` before each test.

### 2. Favorites helpers (script.js)
| Test | Description |
|------|-------------|
| `getFavorites()` returns empty array initially | After clearing localStorage |
| `toggleFavorite(2)` adds index 2 | `getFavorites()` includes 2 |
| `toggleFavorite(2)` again removes index 2 | `getFavorites()` does not include 2 |
| `isFavorite(2)` reflects state | true after add, false after remove |
| Favorites persist across calls | Survives `localStorage` reload |

Setup: `localStorage.removeItem('favorites')` before each test.

### 3. Index page favorites UI
| Test | Description |
|------|-------------|
| Each card has a heart button | `card.querySelector('button')` exists |
| `#fav-count` updates on toggle | Counter increments when heart clicked |
| Heart shows filled state | Heart text changes to ❤️ when favorited |

### 4. Dog page favorites UI
| Test | Description |
|------|-------------|
| `#fav-btn` exists | Element with id `fav-btn` is present |
| Click toggles favorite for current dog | localStorage updates with current `id` |

### 5. Confetti on thankyou (visual smoke test)
| Test | Description |
|------|-------------|
| Confetti elements exist after load | `document.querySelectorAll('.confetti').length > 0` |

## Important
- Tests must NOT break the existing Phase 1 tests
- Always clean up `localStorage` and `sessionStorage` after each test group
- `tests.js` excluded from submission
