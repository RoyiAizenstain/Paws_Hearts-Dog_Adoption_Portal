# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the Project

No build step. Serve the root folder with any static server:
```
npx serve . -p 3000
```
Then open http://localhost:3000 in Chrome.

## Architecture

Multi-page static site (plain HTML/CSS/JS, no frameworks) for dog adoption. Four pages linked via URL query parameters (`?id=N` where N is the array index).

**Page flow:** index.html -> dog.html?id=N -> adopt.html?id=N -> thankyou.html?id=N

**Each HTML page** loads two CSS files (`styles.css` + page-specific) and two JS files (`script.js` + page-specific). `script.js` must load before page-specific scripts.

**script.js** contains shared utilities:
- `API_BASE` — Postman mock server base URL
- `getDogIdFromURL()` — extracts `id` query param as integer
- `formatBoolean(value)` — true->"Yes", false->"No", null->"Unknown"
- `fetchAllDogs()` — GET `/dogs`
- `fetchDogById(id)` — GET `/dogs/{id}`
- `postAdoption(arrayIndex, payload)` — POST `/dogs/{arrayIndex}` with `{email, fullname, phone}`

**Data source:** Postman mock server (URL in `script.js`). All data fetching uses `fetch()`. The POST endpoint (`/dogs/{id}`) accepts `{email, fullname, phone}`.

## Multi-Agent Workflow

This project uses 3 specialized agents defined in the `Context/` folder. Read the orchestration file first, then the relevant agent file before starting work.

| Agent | Instruction File | Role |
|-------|-----------------|------|
| Orchestrator | `Context/agents_orchestration.md` | Defines agent sequence, file map, shared rules, ID vs index table |
| Backend | `Context/agent_backend.md` | Postman mock server setup (DONE — API is live) |
| Frontend | `Context/agent_frontend.md` | All HTML/CSS/JS page specs, element IDs, page behavior |
| Testing | `Context/agent_testing.md` | Test suite spec — utility tests, DOM tests, form tests |

**How to use:** When asked to work on a specific area, read the matching agent file from `Context/` for the detailed spec. The frontend agent file is the source of truth for element IDs, page structure, and behavior. The testing agent file defines all required test cases.

## Key Constraints

- `dogs_data.json` must not be modified — it's the source data for the Postman mock
- No libraries or CSS frameworks allowed — vanilla only
- `index.html` has 6 static card `<div>`s in HTML; JS populates them (not dynamically created)
- Navigation buttons in `dog.html` must have IDs `prev-btn` and `next-btn` (auto-tested)
- `fetchAllDogs`, `fetchDogById`, and `postAdoption` must be defined in `script.js` (auto-tested)
- ID ≠ Index: `dog.id` is 1–6 (JSON field), URL `?id=` param is array index 0–5
- All JS must run inside `DOMContentLoaded` event listener

## Efficiency Rules (token usage)

Be terse and efficient. The user is on a usage-limited plan.

- **Don't re-read files you just edited** — the harness tracks file state
- **Don't verify with Playwright after every change** — only at end of a feature, or when asked
- **Don't re-snapshot the same page** — one snapshot per check is enough
- **Batch related edits** in a single message, not one-by-one
- **Don't kill/restart the dev server** between checks — keep it alive
- **Lead with the action**, not preamble like "Let me…" or "Now I'll…"
- **No trailing summary tables** after every task — one-line confirmation only
- **Don't quote the assignment PDF or spec back** — the user has read it
- **Implement directly when told to** — don't write a plan unless asked
- **Skip "Done — here's what I changed" recaps** unless the change is non-obvious
- **Long bulleted suggestion lists only when asked** for options/brainstorming

Submission constraint: `src/` must contain **exactly the 14 required files** —
no extras (no `gamification.js`, `header.js`, new pages, etc.). All features
must fit inside the existing 14 files. `tests.js` and `serve.json` are dev-only
and live outside `src/` (or are excluded from the submission ZIP).
