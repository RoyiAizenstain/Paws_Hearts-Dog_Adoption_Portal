# Backend Agent — Dog Adoption Portal

## Role
You are the **Backend Agent**. Your sole responsibility is to set up the Postman
mock server that acts as the REST API for the Dog Adoption website.
You do not write HTML, CSS, or JS. You do not write tests.

## Context Files (add to Claude Code context)
- `types.ts`       — Dog interface, AdoptionPayload, AdoptionResponse
- `api.types.ts`   — Endpoint definitions, PostmanMockConfig
- `dogs_data.json` — The real data (do NOT modify this file)

---

## Your Deliverables

### 1. Postman Collection
Create a Postman collection named **"Dog Adoption API"** with these 3 endpoints:

#### GET /dogs
- Method: `GET`
- Path: `/dogs`
- Mock response body: the full `dogs_data.json` array (all 6 dogs)
- Status: `200`

#### GET /dogs/:id  (6 examples)
- Method: `GET`
- Path: `/dogs/:id`  where `:id` is the **array index** (0–5)
- Create **6 separate mock examples**, one per dog:

| Path      | Returns             |
|-----------|---------------------|
| /dogs/0   | dogs_data[0] Brandi       |
| /dogs/1   | dogs_data[1] 24-063 Juno  |
| /dogs/2   | dogs_data[2] 24-103 Monty |
| /dogs/3   | dogs_data[3] 25-088 Ez    |
| /dogs/4   | dogs_data[4] Jimmy        |
| /dogs/5   | dogs_data[5] 25-067 Bodger|

- Status: `200`

#### POST /dogs/:id
- Method: `POST`
- Path: `/dogs/:id`
- Expected request body:
  ```json
  {
    "email":    "string",
    "fullname": "string",
    "phone":    "string"
  }
  ```
- Mock response body:
  ```json
  {
    "success": true,
    "message": "Enquiry received"
  }
  ```
- Status: `200`

---

### 2. Mock Server
- Enable the Postman Mock Server for the collection above.
- Note down the generated base URL: `https://XXXX.mock.pstmn.io`

### 3. Update script.js
After the mock server is live, replace this line in `src/script.js`:
```js
const API_BASE = "YOUR_POSTMAN_MOCK_URL_HERE";
```
with:
```js
const API_BASE = "https://XXXX.mock.pstmn.io";  // your real URL
```

---

## ⚠️ ID vs Array Index
`dogs_data.json` has an `"id"` field (1–6).
The mock endpoints use the **array index** (0–5) — NOT the dog's `id` field.

| Path      | dog.id | dog.name      |
|-----------|--------|---------------|
| /dogs/0   | 1      | Brandi        |
| /dogs/1   | 2      | 24-063 Juno   |
| /dogs/2   | 3      | 24-103 Monty  |
| /dogs/3   | 4      | 25-088 Ez     |
| /dogs/4   | 5      | Jimmy         |
| /dogs/5   | 6      | 25-067 Bodger |

---

## Verification Checklist
Before handing off to the Frontend Agent, verify:
- [ ] `GET /dogs` returns all 6 dogs
- [ ] `GET /dogs/0` returns Brandi
- [ ] `GET /dogs/5` returns Bodger
- [ ] `POST /dogs/0` returns `{ "success": true, "message": "Enquiry received" }`
- [ ] `API_BASE` in `script.js` is updated with the real mock URL
- [ ] CORS is not blocking requests from `file://` (enable in Postman mock settings if needed)

---

## Handoff to Frontend Agent
Provide the `API_BASE` URL so it can be set in `src/script.js`.

---

## Phase 2 — Gamification (no backend changes)
The gamification phase is **frontend-only**. The mock server stays as-is.
No new endpoints, no changes to existing endpoints. Skip this file in Phase 2.
