# HandyHub Server Architecture Guide

Welcome to the **HandyHub Server** architecture documentation. This document explains the folder structure, design pattern (Controller-Service-Route architecture), data flow, and responsibilities of each module in the project.

---

## 🏗️ Architectural Overview

The server follows a **Layered Architecture** (Separation of Concerns). Instead of keeping all database operations, route handlers, and middleware inside a single file, the application is divided into distinct operational layers:

```
                  ┌──────────────────────┐
                  │    HTTP Client       │
                  └──────────┬───────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │     index.ts         │ (App Entry Point & Global Middleware)
                  └──────────┬───────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │   src/routes/        │ (Route Matching & Endpoint Definition)
                  └──────────┬───────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │   src/middleware/    │ (Auth & Role Verification Guards)
                  └──────────┬───────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │   src/controllers/   │ (Request Validation & HTTP Response Formatting)
                  └──────────┬───────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │   src/services/      │ (Business Logic & Database Operations)
                  └──────────┬───────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │    src/config/db.ts  │ (MongoDB Connection & Collections)
                  └──────────────────────┘
```

---

## 📁 Directory & File Structure

```
handyhub-server/
│
├── index.ts                     # Main application entry point
├── package.json                 # Project dependencies & scripts
├── tsconfig.json                # TypeScript configuration
├── .env                         # Environment configurations
├── .gitignore                   # Ignored files list
├── plan.md                      # Refactoring plan documentation
├── architecture.md              # Architecture guide (This document)
│
└── src/
    ├── config/                  # Database & external configuration
    │   └── db.ts                # MongoDB connection lifecycle & collection exports
    │
    ├── middleware/              # Express custom middlewares
    │   └── auth.middleware.ts   # Authentication guards & role-based authorization
    │
    ├── routes/                  # Express Router definitions (URL path definitions)
    │   ├── auth.routes.ts       # Authentication routes (/api/v1/auth)
    │   ├── customer.routes.ts   # Customer routes (/api/v1/customer)
    │   ├── provider.routes.ts   # Service Provider routes (/api/v1/provider)
    │   └── admin.routes.ts      # Admin management routes (/api/v1/admin)
    │
    ├── controllers/             # Request handlers (HTTP Request/Response logic)
    │   ├── auth.controller.ts   # Auth request processing
    │   ├── customer.controller.ts # Customer request processing
    │   ├── provider.controller.ts # Provider request processing
    │   └── admin.controller.ts  # Admin request processing
    │
    ├── services/                # Business logic & Database layer
    │   ├── auth.service.ts      # Auth database queries
    │   ├── customer.service.ts  # Customer database queries
    │   ├── provider.service.ts  # Provider database queries
    │   └── admin.service.ts     # Admin database queries
    │
    └── types/                   # TypeScript interfaces & global declarations
        └── index.ts             # Custom type definitions & Express Request extensions
```

---

## 🔍 Detailed Folder & Layer Breakdown

### 1. Root Entry (`index.ts`)
- **What happens here**:
  - Initializes Express application.
  - Applies global middlewares (`cors`, `express.json`, `dbMiddleware`).
  - Mounts all modular API routes (`/api/v1/auth`, `/api/v1/customer`, `/api/v1/provider`, `/api/v1/admin`).
  - Starts listening on the configured PORT.

---

### 2. Configuration (`src/config/`)
- **File**: `db.ts`
- **What happens here**:
  - Establishes connection to MongoDB via `MongoClient`.
  - Exports collections (`userCollection`, `sessionCollection`, `serviceCollection`, `bookingCollection`).
  - Provides `dbMiddleware` to verify database connectivity on each request.

---

### 3. Type Definitions (`src/types/`)
- **File**: `index.ts`
- **What happens here**:
  - Defines TypeScript models such as `IUser`, `ISession`, and `UserRole`.
  - Extends `Express.Request` so TypeScript recognizes `req.user` across all controllers and middlewares.

---

### 4. Middleware (`src/middleware/`)
- **File**: `auth.middleware.ts`
- **What happens here**:
  - `verifyToken`: Reads the `Authorization` Bearer token header, validates session token in `sessionCollection`, finds the user in `userCollection`, and attaches it to `req.user`.
  - `verifyCustomer` / `verifyUser`: Restricts access to users with `customer` or `user` role.
  - `verifyProvider`: Restricts access to users with `provider` role.
  - `verifyAdmin`: Restricts access to users with `admin` role.

---

### 5. Services Layer (`src/services/`)
- **Files**: `auth.service.ts`, `customer.service.ts`, `provider.service.ts`, `admin.service.ts`
- **What happens here**:
  - Contains **pure business logic** and direct MongoDB queries (`findOne`, `insertOne`, `find`, `updateOne`, `deleteOne`).
  - Decouples database queries from Express HTTP objects (`req`, `res`).

---

### 6. Controllers Layer (`src/controllers/`)
- **Files**: `auth.controller.ts`, `customer.controller.ts`, `provider.controller.ts`, `admin.controller.ts`
- **What happens here**:
  - Handles HTTP requests: extracts parameters, request body (`req.body`), URL params (`req.params`), and authenticated user (`req.user`).
  - Calls the corresponding Service methods.
  - Returns structured JSON responses (`res.status(200).json(...)`) or error messages (`res.status(500).json(...)`).

---

### 7. Routes Layer (`src/routes/`)
- **Files**: `auth.routes.ts`, `customer.routes.ts`, `provider.routes.ts`, `admin.routes.ts`
- **What happens here**:
  - Defines endpoint paths and HTTP verbs (`GET`, `POST`, `PATCH`, `DELETE`).
  - Connects endpoint paths with specific middlewares (e.g. `verifyToken`, `verifyAdmin`) and controller functions.

---

## 🔄 Request Lifecycle Example

Here is what happens when a client makes a request to `GET /api/v1/customer/bookings`:

1. **Client Request**: Sends HTTP request with `Authorization: Bearer <token>`.
2. **`index.ts`**: Receives request, passes through `cors()`, `express.json()`, and `dbMiddleware`.
3. **`customer.routes.ts`**: Matches path `/api/v1/customer/bookings`.
4. **`auth.middleware.ts`**:
   - `verifyToken`: Validates Bearer token, attaches `req.user`.
   - `verifyCustomer`: Ensures `req.user.role` is `"customer"` or `"user"`.
5. **`customer.controller.ts`**: `getMyBookings()` reads `req.user._id` and invokes `CustomerService.getCustomerBookings()`.
6. **`customer.service.ts`**: Queries `bookingCollection.find({ customerId })`.
7. **Response**: Controller receives data from service and sends JSON response `200 OK` back to client.

---

## ➕ How to Add a New Feature

When adding a new feature (e.g. **Reviews**):

1. **Add Type Definition** in `src/types/index.ts` (e.g., `IReview`).
2. **Add Collection export** in `src/config/db.ts` (e.g., `reviewCollection`).
3. **Add Service** in `src/services/` (e.g., `ReviewService`).
4. **Add Controller** in `src/controllers/` (e.g., `ReviewController`).
5. **Add Router** in `src/routes/` (e.g., `review.routes.ts`).
6. **Register Route** in `index.ts` (e.g., `app.use("/api/v1/reviews", reviewRoutes)`).
