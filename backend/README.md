# Backend — Marketplace API

Node.js + Express + MongoDB backend for the Full-Stack Developer Test.

## Prerequisites

- Node.js 18+
- MongoDB running locally (or a MongoDB Atlas URI)

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Create your .env file
cp .env.example .env
# Edit .env if your MongoDB URI is different

# 3. Seed sample products
npm run seed

# 4. Start the dev server
npm run dev
```

Server runs at **http://localhost:5000**

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/products` | List all products (supports `?category=` filter) |
| GET | `/api/products/:id` | Get a single product |
| POST | `/api/products/:id/favorite` | Toggle favorite status (stub — not implemented) |
