# Full-Stack Developer Test
## Marketplace App — WordPress + MERN

**Time Limit:** 3–4 hours  
**Stack:** Node.js · Express · MongoDB · React · WordPress (written task)  
**Submission:** GitHub Pull Request (private repo will be shared with you)

---

> 📌 **Before you begin, read this document in full.**
> There is a submission requirement buried in the instructions below — missing it will affect your score.

---

## Overview

You are given a small **Marketplace web app** with a Node.js/Express backend and a React frontend.

The app is **intentionally broken** in some areas. Your job is to:
1. Find and fix the bugs
2. Implement a missing feature
3. Complete a WordPress task (written + code)
4. Answer a system design question
5. Fix a broken unit test

---

## Getting Started

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env        # Update MONGO_URI if needed
node seed.js                # Populate sample products
npm run dev                 # Starts on http://localhost:5001
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
npm run dev                 # Starts on http://localhost:5173
npm test                    # Runs the unit tests
```

---

## Task 1 — Debugging a Broken Feature (25 pts)

### Background
The app has a `GET /api/products` endpoint that handles filtering. The frontend filter **does not work** correctly.

### Your Tasks
1. Identify **all the bugs** causing the category filter to be broken (check both backend and frontend).
2. Fix them so filtering works and products are displayed **newest first**.
3. In your PR description, briefly explain **each bug you found**.

---

## Task 2 — WordPress REST API Endpoint (15 pts)

Write the PHP code to register a `GET /wp-json/marketplace/v1/top-stories` endpoint that returns the 5 most recent posts with a calculated `reading_time`.

(Details in `wordpress-task.php` stub or root directory).

---

## Task 3 — Implement "Save to Favorites" (25 pts)

Implement the `POST /api/products/:id/favorite` endpoint (Backend) and update the UI (Frontend) so the Favorite button toggles state without a full page refresh.

---

## Task 4 — System Design: Scalable Waitlist (15 pts)

Describe how you would architect a scalable waitlist system in **300–500 words** (write in `system-design.md`).

---

## Task 5 — Frontend Unit Testing (20 pts)

### Background
We use **Vitest** and **React Testing Library** for frontend tests.

### Your Task
Run `npm test` in the `frontend` directory. You will see that **one test for `ProductCard` is failing.**

1. Investigate why the test is failing.
2. Fix the test (or the component) so that the test suite passes.
3. Ensure that your fix respects the design requirement: prices should always be displayed with a `$` prefix and two decimal places.

---

## Submission Instructions

1. Create a branch: `test/your-name`
2. Open a **Pull Request** to `main`
3. In your PR description:
   - Summarize your changes
   - Include the sentence exactly: **"I have followed all instructions and checked for case sensitivity."**
4. Record a **2-minute Loom video** explaining your approach.

---

## Evaluation Criteria

| Task | Points |
|------|--------|
| Task 1 – Debugging | 25 |
| Task 2 – WordPress | 15 |
| Task 3 – Favorites | 25 |
| Task 4 – Design | 15 |
| Task 5 – Testing | 20 |
| **Total** | **100** |

Missing the hidden sentence = -10 pts.
