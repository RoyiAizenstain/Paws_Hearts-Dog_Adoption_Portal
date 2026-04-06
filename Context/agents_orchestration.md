# agents_orchestration.md
# Dog Adoption Portal — Multi-Agent Build Plan

## Overview

This project is built by **3 specialized agents** working in sequence.
Each agent has its own instruction file and a defined set of context files to load.
No agent starts until the one before it has completed its checklist.

```
┌─────────────────────┐
│   Backend Agent     │  Step 1 — Sets up Postman mock API
│   agent_backend.md  │
└────────┬────────────┘
         │  provides API_BASE URL
         ▼
┌─────────────────────┐
│   Frontend Agent    │  Step 2 — Builds all 14 HTML/CSS/JS files
│   agent_frontend.md │
└────────┬────────────┘
         │  provides completed src/ folder
         ▼
┌─────────────────────┐
│   Testing Agent     │  Step 3 — Writes & runs tests.js
│   agent_testing.md  │
└─────────────────────┘
```

---

## File Map

```
project-root/
│
├── dogs_data.json              ← PROVIDED. Do NOT modify.
│
├── types.ts                    ← Shared types (all agents use this)
├── api.types.ts                ← API types (Backend + Frontend agents)
├── tests.types.ts              ← Test fixtures (Testing agent)
│
├── agent_backend.md            ← Backend Agent instructions
├── agent_frontend.md           ← Frontend Agent instructions
├── agent_testing.md            ← Testing Agent instructions
├── agents_orchestration.md     ← This file
│
└── src/                        ← All website files go here
    ├── dogs_data.json          ← Copy of the data file
    ├── index.html
    ├── dog.html
    ├── adopt.html
    ├── thankyou.html
    ├── styles.css
    ├── index.css
    ├── dog.css
    ├── adopt.css
    ├── thankyou.css
    ├── script.js               ← API_BASE set by Backend Agent
    ├── index.js
    ├── dog.js
    ├── adopt.js
    ├── thankyou.js
    └── tests.js                ← Created by Testing Agent
```

---

## Step 1 — Backend Agent

**Goal:** Create the Postman mock server so the Frontend Agent has a live API.

**Load into Claude Code context:**
```
types.ts
api.types.ts
dogs_data.json
agent_backend.md   ← main instructions
```

**Run prompt:**
```
You are the Backend Agent for the Dog Adoption Portal.
Read agent_backend.md carefully and follow every instruction.
Use dogs_data.json as the data source. Do not modify it.
Set up the Postman mock server and give me the API_BASE URL when done.
```

**Completion checklist:**
- [ ] Postman collection "Dog Adoption API" created
- [ ] `GET /dogs` returns all 6 dogs
- [ ] `GET /dogs/0` through `GET /dogs/5` each return the correct dog
- [ ] `POST /dogs/:id` returns `{ "success": true, "message": "Enquiry received" }`
- [ ] Mock server is live and base URL is confirmed
- [ ] CORS enabled in mock server settings

**Output:** `API_BASE = "https://XXXX.mock.pstmn.io"`

---

## Step 2 — Frontend Agent

**Goal:** Build all 14 website files using the live API from Step 1.

**Before starting:** Replace `YOUR_POSTMAN_MOCK_URL_HERE` in the prompt below
with the real URL from Step 1.

**Load into Claude Code context:**
```
types.ts
api.types.ts
dogs_data.json
agent_frontend.md   ← main instructions
```

**Run prompt:**
```
You are the Frontend Agent for the Dog Adoption Portal.
Read agent_frontend.md carefully and follow every instruction.
The API base URL is: https://XXXX.mock.pstmn.io   ← replace with real URL
Set this as API_BASE in script.js from the start.
Create all files inside the src/ folder.
Do not use any CSS or JS frameworks.
```

**Completion checklist:**
- [ ] All 14 files exist in `src/`
- [ ] `script.js` has correct `API_BASE`
- [ ] `script.js` exposes: `getDogIdFromURL`, `formatBoolean`, `fetchAllDogs`, `fetchDogById`, `postAdoption`
- [ ] `index.html` shows 6 static cards populated from API
- [ ] `dog.html` shows full dog details, prev/next navigation, Adopt Me button
- [ ] `adopt.html` has form with email, fullname, phone — all required
- [ ] `thankyou.html` shows dog image, name, and "Thank you for your enquiry!"
- [ ] Each HTML page links `styles.css` + its own CSS
- [ ] Each HTML page loads `script.js` before its own JS
- [ ] `prev-btn` hidden at index 0, `next-btn` hidden at index 5
- [ ] Site opens correctly in Chrome from `src/index.html`

---

## Step 3 — Testing Agent

**Goal:** Write `src/tests.js` and verify all functionality.

**Load into Claude Code context:**
```
types.ts
api.types.ts
tests.types.ts
agent_testing.md   ← main instructions
```

**Run prompt:**
```
You are the Testing Agent for the Dog Adoption Portal.
Read agent_testing.md carefully.
All 14 source files are already built in src/.
Write src/tests.js with a complete test suite covering all pages and utilities.
Mock fetch globally. Use the real dog fixtures from tests.types.ts.
Log PASS/FAIL for each test and print a final summary.
```

**Completion checklist:**
- [ ] `src/tests.js` created
- [ ] All utility tests pass (`formatBoolean`, `getDogIdFromURL`, `fetchAllDogs`, `fetchDogById`)
- [ ] Index page: 6 cards, correct links
- [ ] Dog page: prev/next hidden correctly, adopt link correct
- [ ] Adopt page: required fields, POST fetch, redirect
- [ ] Thank you page: message present, back link correct
- [ ] Final summary prints to console with all tests passing

---

## Shared Rules for All Agents

| Rule | Detail |
|------|--------|
| Do NOT modify `dogs_data.json` | It is the source of truth |
| ID ≠ Index | `dog.id` is 1–6; URL `?id=` param is array index 0–5 |
| No frameworks | Vanilla HTML, CSS, JS only |
| DOMContentLoaded | All JS must run inside this event |
| fetch only | All API calls use `fetch()` — no XMLHttpRequest |
| `prev-btn` / `next-btn` | These exact IDs are required for auto-testing |

---

## ID vs Index Reference Table

| arrayIndex (URL ?id=) | dog.id (JSON field) | dog.name      |
|-----------------------|---------------------|---------------|
| 0                     | 1                   | Brandi        |
| 1                     | 2                   | 24-063 Juno   |
| 2                     | 3                   | 24-103 Monty  |
| 3                     | 4                   | 25-088 Ez     |
| 4                     | 5                   | Jimmy         |
| 5                     | 6                   | 25-067 Bodger |

---

## User Flow (for reference)

```
index.html
  └─ click "More Info" → dog.html?id=N
       └─ click "Adopt Me!" → adopt.html?id=N
            └─ submit form → thankyou.html?id=N
                 └─ click "Back to home" → index.html
```
