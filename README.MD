# Todos Example Application

This repository contains both the **frontend** and **backend** for the Todos Example Application.

---

## Table of Contents

- [Todos Example Application](#todos-example-application)
  - [Table of Contents](#table-of-contents)
  - [Project Structure](#project-structure)
  - [Frontend](#frontend)
    - [Getting Started (Frontend)](#getting-started-frontend)
    - [Scripts (Frontend)](#scripts-frontend)
    - [Environment Variables (Frontend)](#environment-variables-frontend)
    - [Deployment (Frontend)](#deployment-frontend)
  - [Backend](#backend)
    - [Getting Started (Backend)](#getting-started-backend)
    - [Scripts (Backend)](#scripts-backend)
    - [Database](#database)
    - [Deployment (Backend)](#deployment-backend)
  - [Learn More](#learn-more)

---

## Project Structure

```
.
├── backend/
│   ├── db/
│   ├── src/
│   ├── package.json
│   ├── README.md
│   ├── tsconfig.json
│   ├── wrangler.jsonc
│   └── ...
└── frontend/
    ├── public/
    ├── src/
    ├── package.json
    ├── README.md
    ├── tsconfig.json
    ├── wrangler.jsonc
    └── ...
```

---

## Frontend

A [Next.js](https://nextjs.org) app (TypeScript) for the Todos UI, deployable to Cloudflare Pages/Workers.

### Getting Started (Frontend)

1. Install dependencies:

   ```bash
   cd frontend
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Scripts (Frontend)

- `npm run dev` – Start Next.js dev server
- `npm run build` – Build for production
- `npm run start` – Start production server
- `npm run lint` – Lint code
- `npm run build:worker` – Build for Cloudflare Worker
- `npm run deploy` – Deploy to Cloudflare Worker

### Environment Variables (Frontend)

- `.env.development`, `.env.production` – Set environment-specific variables
- See [`frontend/wrangler.jsonc`](frontend/wrangler.jsonc) for Cloudflare bindings and secrets

### Deployment (Frontend)

- Deploy to Cloudflare Pages/Workers using:

  ```bash
  npm run build:worker
  npm run deploy
  ```

---

## Backend

A Cloudflare Worker API using [Hono](https://hono.dev/) and [Kysely](https://kysely.dev/) with a D1 database.

### Getting Started (Backend)

1. Install dependencies:

   ```bash
   cd backend
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

### Scripts (Backend)

- `npm run dev` – Start local dev server with Wrangler
- `npm run deploy` – Deploy to Cloudflare Workers

### Database

- Uses [Cloudflare D1](https://developers.cloudflare.com/d1/).
- Schema and seed scripts are in [`backend/db/`](backend/db/).
- To apply schema and seed data:

  ```bash
  wrangler d1 execute <DB_NAME> --file=db/schema.sql
  wrangler d1 execute <DB_NAME> --file=db/seed.sql
  ```

### Deployment (Backend)

- Deploy to Cloudflare Workers with:

  ```bash
  npm run deploy
  ```

- See [`backend/wrangler.jsonc`](backend/wrangler.jsonc) for configuration.

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Cloudflare D1 Documentation](https://developers.cloudflare.com/d1/)
- [Hono Documentation](https://hono.dev/)
- [Kysely Documentation](https://kysely.dev/)

---
