# HandyHub
<img width="1911" height="999" alt="image" src="https://github.com/user-attachments/assets/5c01229a-320f-4d4f-b19c-15a1f71b5be0" />

**Local Service Marketplace** — ইলেকট্রিশিয়ান, প্লাম্বার, AC মেকানিক, ক্লিনারের মতো লোকাল সার্ভিস প্রোভাইডার খুঁজে বুক করার প্ল্যাটফর্ম।

🔗 **Live:** [handyhub-silk.vercel.app](https://handyhub-silk.vercel.app/)
📂 **Repo:** [github.com/WebdeveloperNahid/handyhub](https://github.com/WebdeveloperNahid/handyhub)

---

## Overview

ইউজার সমস্যা লিখে বা ক্যাটাগরি থেকে ব্রাউজ করে সার্ভিস প্রোভাইডার খুঁজে বের করতে পারবে, request পাঠাবে, আর provider সেটা accept/reject করবে।

## User Roles

- **User** — সার্ভিস খুঁজবে, request পাঠাবে, রিভিউ দেবে
- **Provider** — প্রোফাইল/সার্ভিস তৈরি করবে, request accept/reject করবে
- **Admin** — User/Provider ম্যানেজ করবে, category কন্ট্রোল করবে

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js (App Router) · TypeScript · Tailwind CSS v4 · HeroUI v3 · Framer Motion |
| Backend | Express.js · TypeScript · Layered (Route → Middleware → Controller → Service) |
| Database | MongoDB Atlas |
| Auth | Better Auth (Email/Password, Google OAuth) |
| Deployment | Vercel (client + server) |

## Repository Structure

```
handyhub/
├── handyhub-client/   Next.js frontend
└── handyhub-server/   Express backend (Route–Controller–Service architecture)
```

## Design System

সর্বোচ্চ ৩টা main color, Light/Dark mode toggle সহ:

| Role | Light | Dark |
|---|---|---|
| Primary | `#15803D` | `#22C55E` |
| Accent | `#F59E0B` | `#FBBF24` |
| Neutral (bg) | `#FAF9F7` | `#181818` |

## Status

✅ Auth (email/password) · Navbar · Theme toggle · Dashboard structure · Service listing UI
🔲 Google OAuth · Request workflow · Reviews · AI assistant · Full CRUD backend

## Team

Built as a team project — **Team Lead:** Omar Faruk Nahid ([@WebdeveloperNahid](https://github.com/WebdeveloperNahid))

## Local Setup

```bash
git clone https://github.com/WebdeveloperNahid/handyhub.git

# Frontend
cd handyhub-client && npm install && npm run dev

# Backend
cd handyhub-server && npm install && npm run dev
```

Both need their own `.env` (MongoDB URI, Better Auth secret, etc.) — see each folder's setup docs.
