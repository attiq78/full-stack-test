# Frontend — Marketplace App

React (Vite) frontend for the Full-Stack Developer Test.

## Prerequisites

- Node.js 18+
- Backend server running on port 5000

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Create your .env file
cp .env.example .env

# 3. Start dev server
npm run dev

# 4. Run tests
npm test
```

App runs at **http://localhost:5173**

## Project Structure

```
src/
├── components/
│   ├── ProductList.jsx    ← Fetches & displays products with category filter
│   ├── ProductCard.jsx    ← Individual product display card
│   └── FavoriteButton.jsx ← Favorite toggle button (partially implemented)
├── App.jsx                ← Root component
└── index.css              ← Global styles
```
