# HandyHub

**AI-powered Local Service Marketplace** — ইলেকট্রিশিয়ান, প্লাম্বার, AC মেকানিক, ক্লিনার-এর মতো লোকাল সার্ভিস প্রোভাইডার খুঁজে বুক করার প্ল্যাটফর্ম।

Full-Stack Team Project | Deadline: **23 September 2026**

---

## 📌 Project Overview

HandyHub-এ ইউজার তাদের সমস্যা লিখে (যেমন *"পাইপ লিক করছে"*) অথবা সরাসরি ক্যাটাগরি থেকে ব্রাউজ করে সার্ভিস প্রোভাইডার খুঁজে বের করতে পারবে। AI প্রথমে সমস্যাটা বিশ্লেষণ করে সঠিক ক্যাটাগরি সাজেস্ট করে, তারপর database থেকে real verified provider দেখায়।

---

## 👥 User Roles

| Role | কাজ |
|---|---|
| **User** | সার্ভিস খুঁজবে, request পাঠাবে, রিভিউ দেবে |
| **Provider** | প্রোফাইল/সার্ভিস তৈরি করবে, request accept/reject করবে |
| **Admin** | User/Provider ম্যানেজ করবে, Provider verify করবে, Category কন্ট্রোল করবে |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js (App Router) + TypeScript + Tailwind CSS v4 |
| UI Components | HeroUI v3 |
| Animation | Framer Motion |
| Backend | Express.js + TypeScript |
| Database | MongoDB Atlas |
| Authentication | Better Auth (Email/Password, Google OAuth পরে যোগ হবে) |
| AI | LLM API — Problem Analyzer + Provider Recommendation |

---

## 🎨 Design System

**সর্বোচ্চ ৩টা Main Color** (assignment requirement অনুযায়ী):

| Color | Light Mode | Dark Mode | ব্যবহার |
|---|---|---|---|
| Primary | `#15803D` | `#22C55E` | Logo, buttons, links |
| Accent | `#F59E0B` | `#FBBF24` | CTA highlight, badges |
| Neutral (bg) | `#FAF9F7` | `#181818` | Background/surface |

Text/border-এ standard black/white/gray shade ব্যবহার হয় (brand color হিসেবে গণনা হয় না)।

Light/Dark mode toggle → `src/Components/ThemeToggle.tsx` + `src/lib/core/theme.ts`

---

## 📁 Repository Structure (Monorepo)

```
handyhub/
├── handyhub-client/   ← Next.js frontend (port 3000)
└── handyhub-server/   ← Express backend (port 5000)
```

### Client — `handyhub-client/src/`

```
app/
├── (auth)/
│   ├── signin/page.tsx
│   └── signup/page.tsx
├── api/auth/[...all]/route.ts     ← Better Auth handler
├── all-services/
│   ├── page.tsx                   ← Provider listing (search + filter)
│   └── [id]/page.tsx              ← Provider details
├── dashboard/                     ← নিচে বিস্তারিত
├── layout.tsx
└── page.tsx                       ← Home

Components/
├── Navbar.tsx
├── Themetoggle.tsx
└── ... (আরো যোগ হবে)

lib/
├── core/
│   ├── auth.ts
│   ├── auth-client.ts
│   └── theme.ts
├── actions/
├── api/
└── ...

types/
```

### Server — `handyhub-server/`

```
index.ts
config/db.ts
models/
routes/
controllers/
middleware/
```

---

## 🔐 Dashboard Structure (Role-Based)

প্রতিটা role-এর জন্য আলাদা dashboard section, `layout.tsx` দিয়ে role-check করে protect করা হবে (ভুল role হলে `/unauthorized`-এ redirect):

```
src/app/(dashboard)dashboard/
│
├── admin/                          ← শুধু Admin role access করবে
│   ├── manage-users/
│   │   └── page.tsx                ← সব user দেখা, Suspend/Activate করা
│   ├── manage-providers/
│   │   └── page.tsx                ← Provider verification (Approve/Reject)
│   ├── manage-categories/
│   │   └── page.tsx                ← Service category Add/Edit/Delete
│   └── page.tsx                    ← Admin Overview (stats, summary)
│
├── provider/                       ← শুধু Provider role access করবে
│   ├── my-services/
│   │   └── page.tsx                ← নিজের services দেখা/এডিট করা
│   ├── add-service/
│   │   └── page.tsx                ← নতুন service যোগ করা
│   ├── availability/
│   │   └── page.tsx                ← কবে/কখন available সেট করা
│   ├── incoming-requests/
│   │   └── page.tsx                ← User-দের পাঠানো request দেখা, Accept/Reject
│   ├── active-jobs/
│   │   └── page.tsx                ← যেসব কাজ চলমান (In Progress)
│   └── page.tsx                    ← Provider Overview
│
├── user/                           ← শুধু সাধারণ User role access করবে
│   ├── my-requests/
│   │   └── page.tsx                ← নিজের পাঠানো সব service request-এর status
│   ├── saved-providers/
│   │   └── page.tsx                ← পছন্দের provider সেভ করা লিস্ট
│   └── page.tsx                    ← User Overview
│
└── layout.tsx                      ← Role check করবে, ভুল role হলে /unauthorized এ পাঠাবে
```

**নামকরণের নিয়ম:** প্রতিটা folder-এর নাম = ভেতরে কী কাজ হবে তার বর্ণনা (verb+noun pattern, যেমন `add-service`, `manage-categories`), generic নাম (`page1`, `data`) এড়ানো হয়েছে।

---

## 🔄 Core Workflow

```
User সমস্যা লিখে/browse করে
        ↓
AI ক্যাটাগরি সাজেস্ট করে (optional)
        ↓
Provider list দেখানো হয় (real DB data)
        ↓
User Service Request পাঠায়
        ↓
Provider Accept/Reject করে
        ↓
Status: In Progress → Completed
        ↓
User Review দেয়
```

Request status flow: `PENDING → ACCEPTED/REJECTED → IN_PROGRESS → COMPLETED` (অথবা `CANCELLED` pending অবস্থায়)

---

## 🗄️ Database Collections (MongoDB)

`users`, `providerProfiles`, `categories`, `providerServices`, `availability`, `serviceRequests`, `reviews`

---

## ✅ এখন পর্যন্ত যা সম্পূর্ণ হয়েছে

- [x] Monorepo GitHub setup + Branch protection + PR workflow
- [x] Better Auth + MongoDB সংযুক্ত (Email/Password কাজ করছে)
- [x] Sign in / Sign up page
- [x] Navbar (logo, nav links, theme toggle, auth-aware button)
- [x] Light/Dark mode toggle
- [x] `all-services` listing + details page (structure তৈরি, content বাকি)

## 🔲 বাকি আছে

- [ ] Google OAuth login
- [ ] Forgot Password flow
- [ ] Dashboard-এর সব page (Admin/Provider/User) এর actual content ও logic
- [ ] Role-based route protection (`dashboard/layout.tsx`)
- [ ] Service Request workflow (Create → Accept/Reject → Status update)
- [ ] Review & Rating system
- [ ] AI Assistant feature (Problem Analyzer + Recommendation)
- [ ] Search + Filter (Explore/all-services page)
- [ ] Express backend API routes (models, controllers)
- [ ] Deployment (Client → Vercel, Server → TBD)

---

## 🌿 Git Workflow

**Team Member:**
```bash
git checkout main
git pull origin main
git checkout -b feature/[name]
# কোড লেখা
git add .
git commit -m "feat: description"
git push origin feature/[name]
# → GitHub-এ PR বানানো
```

**Team Lead:** PR-এর Files changed রিভিউ → Approve → **Merge pull request** ক্লিক → Branch delete

Branch naming: `feature/xyz` (নতুন কাজ), `fix/xyz` (bug fix)

---

## 📝 Assignment Requirements Checklist

- [x] Next.js + TypeScript + Tailwind
- [x] Better Auth
- [ ] Google Social Login
- [x] JWT Authentication (Better Auth handles)
- [ ] Private/Protected Routes (role-based, in progress)
- [ ] Full CRUD (in progress)
- [ ] Search & min. 2 Filters
- [x] Light/Dark Mode
- [x] Max 3 main colors
- [ ] Form Validation (signup/login-এ আছে, বাকি form-এ বাকি)
- [ ] At least 1 AI Feature
- [ ] Working Deployment