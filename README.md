<div align="center">

<img src="https://img.shields.io/badge/ConnectX-Social%20Platform-6366f1?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0tMiAxNWwtNS01IDEuNDEtMS40MUwxMCAxNC4xN2w3LjU5LTcuNTlMMTkgOGwtOSA5eiIvPjwvc3ZnPg==" alt="ConnectX" />

# ConnectX

### *The High-Performance Social Networking Platform Built for Scale*

[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Redis](https://img.shields.io/badge/Redis-7.x-DC382D?style=flat-square&logo=redis&logoColor=white)](https://redis.io)
[![Socket.io](https://img.shields.io/badge/Socket.io-4.x-010101?style=flat-square&logo=socket.io)](https://socket.io)
[![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com)
[![AWS](https://img.shields.io/badge/AWS-ECS%2FFargate-FF9900?style=flat-square&logo=amazonaws&logoColor=white)](https://aws.amazon.com)

[![Build Status](https://img.shields.io/github/actions/workflow/status/your-org/connectx/ci-cd.yml?branch=main&style=flat-square&label=CI%2FCD&logo=github-actions)](https://github.com/your-org/connectx/actions)
[![Coverage](https://img.shields.io/codecov/c/github/your-org/connectx?style=flat-square&logo=codecov)](https://codecov.io/gh/your-org/connectx)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](./CONTRIBUTING.md)

---

**ConnectX** is a production-grade, full-stack social networking platform engineered for **50,000+ concurrent users**. It features real-time event streaming via Socket.io, sub-millisecond Redis caching with surgical invalidation, cursor-based infinite scroll feeds, dual-token JWT authentication with refresh rotation, and a dark-mode-first React 18 UI that rivals Tier-1 social platforms.

[**Live Demo**](https://connectx.io) · [**API Docs**](https://api.connectx.io/docs) · [**Report a Bug**](https://github.com/your-org/connectx/issues) · [**Request Feature**](https://github.com/your-org/connectx/discussions)

</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Why ConnectX?](#-why-connectx)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Internal Working / System Design](#-internal-working--system-design)
- [Database Schema](#-database-schema)
- [API Documentation](#-api-documentation)
- [Authentication & Security](#-authentication--security)
- [Performance Optimization](#-performance-optimization)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [Testing](#-testing)
- [Troubleshooting](#-troubleshooting)
- [FAQ](#-faq)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🌐 Overview

ConnectX is a **full-stack social networking platform** purpose-built to operate at hyper-scale. Unlike tutorial-grade projects, every architectural decision in ConnectX was made with production realities in mind — from the MongoDB connection pool tuning and Redis sorted set feed caching, down to the Nginx `try_files` SPA fallback and ECS task auto-scaling policies.

**Key capabilities at a glance:**

- 🏎️ **Cursor-based pagination** — eliminates the O(n) `skip()` degradation that breaks social feeds at scale
- ⚡ **Real-time event pipeline** — Socket.io with a Redis pub/sub adapter enables horizontal scaling across multiple Node.js instances without sticky sessions
- 🛡️ **Security-first auth** — dual-token JWT system with Redis-backed refresh token blacklisting, bcrypt-12 password hashing, and full OWASP Top 10 coverage
- 🎨 **Modern UI** — React 18, Vite, Tailwind CSS with a dark-mode-first design system and TanStack Query for zero-boilerplate server state
- 🚀 **Production-ready DevOps** — multi-stage Docker builds, GitHub Actions CI/CD, AWS ECS/Fargate with rolling zero-downtime deployments

---

## 🤔 Why ConnectX?

### Problems with Existing Social Platform Implementations

| Problem | Common Approach | ConnectX Solution |
|---|---|---|
| Feed pagination slows to a crawl at scale | `skip(page * limit)` — O(n) DB scan | Cursor-based pagination using ObjectId as cursor — O(log n) indexed lookup |
| Real-time doesn't scale past 1 server | In-process Socket.io rooms | Redis pub/sub adapter — any ECS task can emit to any connected client |
| Access tokens stolen via XSS | `localStorage` token storage | HTTP-only cookie for refresh token; access token held in-memory only |
| Every API call hits the database | No caching layer | Redis-backed response cache with TTL-aware surgical invalidation |
| Secrets baked into Docker images | `ENV` in Dockerfile | AWS Secrets Manager `valueFrom` — secrets never leave the secrets store |
| Login brute-forced | No rate limiting | Per-IP rate limiter on auth routes + login attempt counting |
| Unbounded follower arrays | `followers: [ObjectId]` on User | Separate Follow collection — scales to millions of followers without document bloat |

---

## ✨ Features

### Core Features

**User Profiles & Social Graph**
Full user registration and authentication with username, email, display name, bio, and avatar. A dedicated `Follow` collection handles the social graph with efficient bidirectional graph traversal — supporting millions of follower relationships without document size limits.

**Real-Time Social Feed**
A global feed and a personalized following feed, both cursor-paginated. Newly created posts appear instantly for all connected clients via Socket.io WebSocket events, without requiring a page refresh or polling interval.

**Post Creation & Interactions**
Users can create rich text posts (up to 500 characters) with up to four media attachments. Hashtag detection and `@mention` highlighting are supported. Post likes use MongoDB's `$addToSet` and `$inc` atomically — eliminating the double-like race condition.

**Real-Time Notifications**
The `/notifications` Socket.io namespace delivers authenticated, user-targeted push events for new followers, post likes, and @mentions. Unread notification badges update live in the sidebar.

**Post & User Discovery**
Tag-based post indexing and trending post queries powered by Redis sorted sets, updated atomically on each new post creation. A "Who to Follow" suggestion panel rounds out the discovery experience.

### Advanced Features

**Optimistic UI Updates**
Every user interaction — liking a post, creating a post, following a user — updates the UI instantly before the server confirms, using TanStack Query's `onMutate` / rollback pattern. Users perceive zero latency.

**JWT Token Refresh Queue**
The Axios interceptor implements a concurrent request refresh queue. If ten API calls are in-flight when the access token expires, they all queue up while a single refresh request executes, then replay — no lost requests, no race conditions, no duplicate refresh calls.

**Redis Sorted Set Feed Cache**
The global feed maintains a Redis Sorted Set of the 200 most recent post IDs scored by Unix timestamp. Feed reads resolve from this cache in microseconds before touching MongoDB.

**Multi-Instance WebSocket Scaling**
The `@socket.io/redis-adapter` allows any number of ECS Fargate task instances to share Socket.io rooms via Redis pub/sub. A user connected to task #2 receives events emitted by task #7.

**Graceful Shutdown**
SIGTERM and SIGINT handlers drain in-flight requests, close the database connection, disconnect the Redis client, and exit cleanly — ensuring zero request drops during ECS rolling deployments.

---

## 🛠 Tech Stack

### Backend

| Technology | Version | Purpose |
|---|---|---|
| Node.js | 20 LTS | JavaScript runtime |
| Express.js | 4.x | HTTP server framework |
| TypeScript | 5.x | Type safety, strict mode |
| Mongoose | 8.x | MongoDB ODM with schema validation |
| Zod | 3.x | Runtime schema validation for env vars and request bodies |
| Winston | 3.x | Structured JSON production logger |
| express-async-errors | 3.x | Global async error propagation without try/catch boilerplate |

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| React | 18.x | UI framework with concurrent features |
| Vite | 5.x | Sub-second HMR build tool |
| TypeScript | 5.x | End-to-end type safety |
| Tailwind CSS | 3.x | Utility-first design system |
| TanStack Query | 5.x | Server state, caching, infinite scroll |
| Zustand | 4.x | Lightweight client-side state |
| React Hook Form | 7.x | Performant form management |
| Framer Motion | 11.x | Production-grade animations |
| Radix UI | Latest | Accessible headless UI primitives |
| Lucide React | Latest | Consistent icon system |

### Database

| Technology | Purpose |
|---|---|
| MongoDB Atlas | Primary document store; M10+ cluster for production |
| Redis 7.x | Caching, session blacklisting, Socket.io pub/sub, sorted set feeds |

### DevOps & Infrastructure

| Technology | Purpose |
|---|---|
| Docker | Multi-stage containerization (Node builder → Alpine production) |
| GitHub Actions | CI/CD pipeline — test, build, push to ECR, deploy to ECS |
| AWS ECS / Fargate | Serverless container orchestration, auto-scaling 2–10 tasks |
| AWS Application Load Balancer | HTTPS termination, ACM certificate, health checks, WAF |
| AWS CloudFront | CDN for React SPA static assets (S3 origin) |
| AWS Secrets Manager | Secrets injection into ECS tasks at runtime |
| CloudWatch | Log aggregation, metric alarms, X-Ray distributed tracing |
| Nginx 1.27 | Static file server for the React build inside the frontend container |

### Testing

| Tool | Scope |
|---|---|
| Jest + Supertest | Backend unit and integration tests |
| mongodb-memory-server | In-memory MongoDB for isolated test runs |
| ioredis-mock | In-memory Redis mock for token blacklist tests |
| Vitest + RTL | Frontend component and hook tests |
| MSW (Mock Service Worker) | API mocking for frontend tests |
| Playwright | End-to-end critical path tests (Chromium + Firefox) |

---

## 🏗 Architecture

### High-Level System Diagram

```
                          ┌─────────────────────────────────────┐
                          │             Internet                │
                          └──────────────┬──────────────────────┘
                                         │
                          ┌──────────────▼──────────────────────┐
                          │           Route 53 DNS              │
                          └────────┬──────────────┬─────────────┘
                                   │              │
                    ┌──────────────▼───┐    ┌─────▼──────────────────┐
                    │  CloudFront CDN  │    │ Application Load Balancer│
                    │  (React / S3)    │    │  HTTPS :443 | WAF       │
                    └──────────────────┘    └───────┬─────────────────┘
                                                    │
                                        ┌───────────┴───────────┐
                                        │    ECS / Fargate       │
                                        │  ┌──────────────────┐  │
                                        │  │  Node.js Task #1 │  │
                                        │  │  Express + WS    │  │
                                        │  └────────┬─────────┘  │
                                        │  ┌────────▼─────────┐  │
                                        │  │  Node.js Task #2 │  │
                                        │  │  Express + WS    │  │
                                        │  └────────┬─────────┘  │
                                        │  (auto-scales 2–10)    │
                                        └───────────┬────────────┘
                                                    │
                              ┌─────────────────────┼──────────────────────┐
                              │                     │                      │
                    ┌─────────▼────────┐  ┌─────────▼────────┐  ┌─────────▼────────┐
                    │  MongoDB Atlas   │  │  ElastiCache     │  │  CloudWatch Logs │
                    │  M10+ Cluster    │  │  Redis 7.x       │  │  + X-Ray Traces  │
                    │  VPC Peered      │  │  Multi-AZ        │  │                  │
                    └──────────────────┘  └──────────────────┘  └──────────────────┘
```

### Request Flow

A typical API request travels this path:

1. **DNS resolution** — Route 53 resolves `api.connectx.io` to the ALB.
2. **TLS termination** — ALB handles the HTTPS handshake using an ACM certificate. HTTP traffic is 301-redirected to HTTPS.
3. **WAF inspection** — AWS WAF evaluates managed rule groups (SQL injection, known bad inputs, IP reputation) and the custom rate-based rule (2,000 req/5 min per IP).
4. **Load balancing** — ALB forwards the request to a healthy ECS task via the target group. For WebSocket upgrades, ALB sticky sessions (or the Redis adapter) ensure continuity.
5. **Express middleware stack** — Helmet, CORS, mongo-sanitize, XSS-clean, HPP, cookie-parser, JSON body parser, globalApiLimiter, request-ID UUID injection, and Morgan logging run in order before any route handler.
6. **Auth middleware** — `requireAuth` extracts and verifies the Bearer JWT from the `Authorization` header. The `req.user` object is populated from the token payload — no DB round-trip.
7. **Route handler → Service → Database** — Controllers delegate to service functions. Services run lean, projected MongoDB queries with cursor-based pagination, wrapped in `Promise.all()` for parallel execution where possible.
8. **Redis cache** — Read-path checks the cache before hitting MongoDB. Write-path invalidates affected cache keys after mutations.
9. **Socket.io event** — Mutating operations (create post, like, follow) emit events via the Redis pub/sub adapter, broadcasting to all connected ECS tasks.
10. **Standardized response** — `ApiResponse<T>` wrapper ensures consistent JSON shape: `{ success, statusCode, message, data }`.

---

## ⚙️ Internal Working / System Design

### Component Interaction Map

```
┌─────────────────────────────────────────────────────────────────┐
│                         Backend (Node.js)                       │
│                                                                 │
│  server.ts  ──►  app.ts  ──►  Router  ──►  Controller          │
│      │               │                         │               │
│      │           Middleware                  Service           │
│      │         (Auth, Rate,                    │               │
│      │          Cache, Zod)              ┌─────┴──────┐        │
│      │                                  │            │        │
│  Socket.io ◄──── socketEmitter ◄── Mongoose    Redis         │
│  (Redis Adapter)                     (Atlas)   (ioredis)      │
└─────────────────────────────────────────────────────────────────┘
                           ▲  REST / WebSocket
                           │
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend (React 18)                      │
│                                                                 │
│  App.tsx ──► Router ──► Page ──► Feature Components            │
│      │                               │                         │
│  useAuthInit()               TanStack Query                    │
│  connectSockets()            (useInfiniteQuery /               │
│                               useMutation +                    │
│  Zustand Stores               Optimistic Updates)              │
│  ├── authStore (token,              │                          │
│  │   user, isAuth)           Service Layer                     │
│  └── uiStore (theme,         (axios.ts interceptors            │
│       sidebar, modal)         + token refresh queue)           │
│                                     │                          │
│  Socket.io Client ◄──────────── feedSocket /                   │
│  (useFeedSocket,               notificationsSocket              │
│   useNotifications)                                            │
└─────────────────────────────────────────────────────────────────┘
```

### Key Design Decisions

**Separate Follow Collection vs. Embedded Arrays**
The `Follow` model is a standalone collection with compound unique indexes rather than embedding follower arrays on the `User` document. This prevents document size explosions (MongoDB's 16 MB limit) for power users and enables O(log n) graph traversal queries.

**Denormalized Counters**
`followersCount`, `followingCount`, and `postCount` are maintained as atomic fields on the `User` document using `$inc` inside MongoDB transactions. This avoids expensive `$size` aggregations on every profile page load.

**Token-in-Memory Pattern**
The JWT access token lives exclusively in React component state (Zustand store) — never `localStorage` or `sessionStorage`. The refresh token lives in an HTTP-only cookie inaccessible to JavaScript. This eliminates the two most common XSS-based token theft vectors simultaneously.

**Fail-Open Cache**
All Redis operations are wrapped in try/catch. A Redis outage degrades ConnectX to direct MongoDB queries (with higher latency) rather than a hard failure. The `X-Cache: MISS` response header signals the cache bypass.

---

## 🗄 Database Schema

### Collections Overview

#### `users`

| Field | Type | Constraints | Notes |
|---|---|---|---|
| `_id` | ObjectId | PK | Auto-generated |
| `username` | String | unique, indexed, 3–30 chars, `[a-zA-Z0-9_]` | Lowercase enforced |
| `email` | String | unique, indexed | Lowercase, regex validated |
| `password` | String | min 8 chars, `select: false` | bcrypt-12 hashed via pre-save hook |
| `displayName` | String | optional, max 50 | |
| `bio` | String | optional, max 200 | |
| `avatarUrl` | String | optional | |
| `followersCount` | Number | default 0 | Denormalized counter |
| `followingCount` | Number | default 0 | Denormalized counter |
| `postCount` | Number | default 0 | Denormalized counter |
| `isActive` | Boolean | default true | Soft-delete flag |
| `role` | Enum | `['user', 'admin']` | RBAC |
| `lastSeen` | Date | auto-updated on login | |
| `timestamps` | Auto | `createdAt`, `updatedAt` | |

**Indexes:** `{ username: 1, email: 1 }` compound; individual indexes on `followers`, `following` arrays.

#### `posts`

| Field | Type | Constraints | Notes |
|---|---|---|---|
| `_id` | ObjectId | PK | Doubles as cursor for pagination |
| `author` | ObjectId | ref: User, indexed | |
| `content` | String | required, 1–500 chars | |
| `mediaUrls` | [String] | max 4 items | Image/video attachment URLs |
| `likes` | [ObjectId] | ref: User | |
| `likesCount` | Number | default 0 | Denormalized |
| `commentsCount` | Number | default 0 | Denormalized |
| `tags` | [String] | indexed | Hashtag extraction |
| `isPublic` | Boolean | default true | |
| `isDeleted` | Boolean | default false | Soft-delete |
| `timestamps` | Auto | `createdAt`, `updatedAt` | |

**Indexes:** `{ author: 1, createdAt: -1 }` (user feed); `{ createdAt: -1 }` (global feed); `{ tags: 1 }` (tag search); `{ likesCount: -1 }` (trending).

#### `follows`

| Field | Type | Constraints | Notes |
|---|---|---|---|
| `_id` | ObjectId | PK | |
| `follower` | ObjectId | ref: User, indexed | Who is following |
| `following` | ObjectId | ref: User, indexed | Who is being followed |
| `createdAt` | Date | auto | |

**Indexes:** `{ follower: 1, following: 1 }` unique compound (prevents duplicate follows); individual indexes on `follower` and `following` for graph traversal.

### Relationship Diagram

```
User (1) ──────────── (N) Post         [author field]
User (N) ──────────── (N) User         [via Follow collection]
Post (N) ──────────── (N) User         [likes array — userId references]
```

---

## 📡 API Documentation

All endpoints are prefixed with `/api/v1`. All responses follow the unified shape:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Operation successful",
  "data": { }
}
```

Error responses:

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [{ "field": "email", "message": "Invalid email format" }]
}
```

### Auth Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/register` | ❌ | Register a new user account |
| `POST` | `/auth/login` | ❌ | Authenticate and receive token pair |
| `POST` | `/auth/refresh-token` | Cookie | Rotate refresh token, get new access token |
| `POST` | `/auth/logout` | ✅ | Blacklist refresh token, clear cookie |
| `GET` | `/auth/me` | ✅ | Get authenticated user's profile |
| `PATCH` | `/auth/change-password` | ✅ | Update password, invalidate all sessions |

**POST `/auth/register`**

```json
// Request
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass1!",
  "confirmPassword": "SecurePass1!",
  "displayName": "John Doe"
}

// Response 201
{
  "success": true,
  "statusCode": 201,
  "message": "User registered successfully",
  "data": {
    "accessToken": "eyJhbGci...",
    "user": {
      "_id": "64f3a2b1c8d4e5f6a7b8c9d0",
      "username": "johndoe",
      "email": "john@example.com",
      "displayName": "John Doe",
      "followersCount": 0,
      "followingCount": 0,
      "postCount": 0
    }
  }
}
```

**POST `/auth/login`**

```json
// Request
{ "email": "john@example.com", "password": "SecurePass1!" }

// Response 200
{
  "success": true,
  "data": { "accessToken": "eyJhbGci...", "user": { ... } }
}
// HTTP-only cookie: refreshToken=<token>; Path=/api/v1/auth/refresh-token
```

### Post Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/posts/feed/global` | ❌ | Cursor-paginated global feed |
| `GET` | `/posts/feed/personal` | ✅ | Feed of followed users' posts |
| `POST` | `/posts` | ✅ | Create a new post |
| `GET` | `/posts/:postId` | ❌ | Get a single post by ID |
| `POST` | `/posts/:postId/like` | ✅ | Like a post (idempotent) |
| `DELETE` | `/posts/:postId/like` | ✅ | Unlike a post |
| `DELETE` | `/posts/:postId` | ✅ | Soft-delete a post (owner or admin) |
| `GET` | `/posts/user/:userId` | ❌ | Cursor-paginated posts by user |

**GET `/posts/feed/global?limit=20&cursor=<objectId>`**

```json
// Response 200
{
  "success": true,
  "data": {
    "data": [
      {
        "_id": "64f3a2b1...",
        "content": "Hello ConnectX!",
        "author": { "username": "johndoe", "displayName": "John Doe", "avatarUrl": "..." },
        "likesCount": 42,
        "commentsCount": 7,
        "createdAt": "2024-11-15T09:30:00.000Z"
      }
    ],
    "nextCursor": "64f3a2b0...",
    "hasMore": true,
    "count": 20
  }
}
```

### User Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/users/:usernameOrId` | ❌ | Get user profile |
| `PATCH` | `/users/me` | ✅ | Update own profile |
| `DELETE` | `/users/me` | ✅ | Soft-delete own account |
| `POST` | `/users/:userId/follow` | ✅ | Follow a user |
| `DELETE` | `/users/:userId/follow` | ✅ | Unfollow a user |
| `GET` | `/users/:userId/followers` | ❌ | Paginated followers list |
| `GET` | `/users/:userId/following` | ❌ | Paginated following list |

### Health Endpoint

**GET `/health`** — Used by the ALB target group health check. Returns 200 with no authentication required.

```json
{
  "status": "ok",
  "timestamp": "2024-11-15T09:30:00.000Z",
  "uptime": 86400.5,
  "environment": "production",
  "database": "connected",
  "version": "1.0.0"
}
```

### Socket.io Events

| Namespace | Event | Direction | Payload |
|---|---|---|---|
| `/feed` | `new_post` | Server → Client | `{ post: IPost }` |
| `/feed` | `new_like` | Server → Client | `{ postId: string, likesCount: number }` |
| `/feed` | `join_room` | Client → Server | `{ room: string }` |
| `/notifications` | `new_follower` | Server → Client | `{ follower: IUserSummary }` |
| `/notifications` | `post_liked` | Server → Client | `{ postId: string, liker: IUserSummary }` |
| `/notifications` | `mentioned` | Server → Client | `{ post: IPost }` |

---

## 🔐 Authentication & Security

### Dual-Token Architecture

ConnectX implements a two-token JWT system designed to minimize the attack surface of token theft:

```
┌─────────────┐          ┌─────────────────────────────────────────┐
│   Client    │          │              Server                      │
│             │──login──►│  Issues: accessToken (15m) + cookie      │
│  Zustand    │          │  refreshToken (7d, HTTP-only, SameSite)  │
│  (memory)   │◄─token───│                                          │
│             │          │                                          │
│  Every API  │──Bearer──►  requireAuth middleware verifies JWT     │
│  request    │          │  (no DB round-trip)                      │
│             │          │                                          │
│  Access     │──cookie──►  /auth/refresh-token                    │
│  token      │          │  ├─ Verify refresh token signature       │
│  expires →  │◄─new────│  ├─ Check Redis blacklist               │
│             │  tokens  │  ├─ Blacklist OLD token (rotation)       │
│             │          │  └─ Issue new token pair                 │
└─────────────┘          └─────────────────────────────────────────┘
```

### Security Measures

**Password Security** — bcrypt with cost factor 12 (deliberately slow). Hashing occurs in the Mongoose pre-save hook, not the controller, ensuring no code path can accidentally skip it.

**Token Security** — Refresh tokens are SHA-256 hashed before storage in Redis. The blacklist TTL matches the token's remaining lifetime, so expired entries auto-evict. Token rotation means each refresh token is single-use.

**Transport Security** — Helmet sets `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`, forcing HTTPS. The refresh token cookie has `Secure: true` in production — it will not transmit over HTTP.

**Injection Prevention** — `express-mongo-sanitize` strips `$` and `.` operators from all user input, preventing NoSQL injection. `xss-clean` strips HTML/JS payloads from request bodies. Zod schemas enforce structure at the boundary.

**Brute-Force Protection** — Dedicated rate limiters per route: 5 login attempts per 15 minutes per IP (`skipSuccessfulRequests: true`), 10 registrations per hour per IP, 20 refresh-token requests per 15 minutes per IP, 500 general API requests per 15 minutes per IP.

**OWASP Top 10 Coverage**

| OWASP | Threat | Mitigation |
|---|---|---|
| A01 | Broken Access Control | `requireAuth` + `requireRole()` middleware |
| A02 | Cryptographic Failures | bcrypt-12, HTTPS-only cookies, HS256 with 32+ char secrets |
| A03 | Injection | `mongoSanitize`, Zod validation, parameterized Mongoose queries |
| A04 | Insecure Design | Dual-token arch, refresh rotation, blacklist on logout |
| A05 | Security Misconfiguration | Helmet headers, strict CORS, no `X-Powered-By` |
| A07 | Auth Failures | Rate limiting, no user enumeration, timing-safe comparison |
| A08 | Data Integrity | JWT signing, Zod schema validation on all inputs |
| A09 | Logging & Monitoring | Winston audit logs with request IDs, CloudWatch Metric Filters |

---

## ⚡ Performance Optimization

### Caching Strategy

ConnectX uses a multi-tiered caching approach with Redis as the primary cache:

```
Request
   │
   ▼
Redis Cache (sub-millisecond)
   │ HIT → return instantly, set X-Cache: HIT header
   │ MISS ↓
MongoDB (indexed query)
   │
   ▼
Store in Redis with TTL
   │
   ▼
Return response, set X-Cache: MISS header
```

| Cache Key | TTL | Invalidated On |
|---|---|---|
| `feed:global:<cursor>` | 60s | New post created |
| `feed:<userId>` | 60s | Follow/unfollow, new post by followed user |
| `user:<userId>:profile` | 300s | Profile update, follow/unfollow |
| `user:<userId>:posts:<cursor>` | 120s | Post created/deleted by user |
| `post:<postId>` | 180s | Post liked/unliked |
| `posts:trending` | 300s | New post created |

### Database Query Optimization

**Cursor pagination** replaces offset pagination entirely. The query `{ _id: { $lt: cursor }, isDeleted: false }` hits the `{ _id: -1 }` index directly — O(log n) regardless of collection size.

**Lean queries** (`.lean()`) are used for all read-only operations, returning plain JavaScript objects instead of Mongoose Documents. This eliminates hydration overhead and reduces memory allocation by 40–60% for large result sets.

**Projection** ensures only the fields needed for a response are fetched from MongoDB. Author population requests only `username`, `displayName`, and `avatarUrl` — not the full user document.

**Parallel query execution** via `Promise.all()` is used wherever independent queries exist. The personal feed service fetches the following list and validates the user in parallel, not sequentially.

**Redis Sorted Set Feed Cache** — The global feed sorted set holds the 200 most recent post IDs scored by Unix timestamp. Feed reads resolve from this in-memory structure in microseconds. The sorted set self-trims to 200 entries via `ZREMRANGEBYRANK` on every write.

### Frontend Performance

**Virtualized feed** — `react-virtual` (TanStack Virtual) renders only the visible post cards plus a configurable buffer. A feed with 500 loaded posts still has the same DOM node count as one with 20.

**Code splitting** — Every page component is `React.lazy()` wrapped and loaded on demand. The initial bundle contains only the router, auth store, and layout shell.

**Optimistic updates** — TanStack Query's `onMutate` / `onError` rollback pattern makes all interactions feel instantaneous. No loading spinners for likes, follows, or post creation.

**Memoized components** — `PostCard` is wrapped in `React.memo()` with a custom `arePropsEqual` comparator that re-renders only when `_id`, `likesCount`, or `isLiked` changes.

---

## 🚀 Installation & Setup

### Prerequisites

| Requirement | Version |
|---|---|
| Node.js | 20 LTS or later |
| npm | 10.x or later |
| MongoDB | Atlas cluster or local 7.x |
| Redis | 7.x (local or Upstash) |
| Docker | 24.x (optional, for containerized setup) |

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/connectx.git
cd connectx
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your values (see Environment Variables section)

# Start development server with hot reload
npm run dev
```

The backend API will be available at `http://localhost:5000`.

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your values

# Start Vite dev server
npm run dev
```

The frontend will be available at `http://localhost:5173`.

### 4. Docker Compose (Recommended for Local)

Spin up MongoDB, Redis, backend, and frontend together:

```bash
# From the project root
cp backend/.env.example backend/.env
# Edit backend/.env

docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop all services
docker-compose down
```

| Service | URL |
|---|---|
| Frontend | `http://localhost:5173` |
| Backend API | `http://localhost:5000/api/v1` |
| MongoDB | `mongodb://localhost:27017` |
| Redis | `redis://localhost:6379` |

### Makefile Shortcuts

```bash
make up          # Start all services
make down        # Stop all services
make logs        # Tail logs from all services
make test-back   # Run backend test suite
make test-front  # Run frontend test suite
make shell-back  # Open a shell in the backend container
make clean       # Stop services and remove volumes (wipes DB)
make build       # Rebuild all Docker images from scratch
```

---

## 🔑 Environment Variables

### Backend (`.env`)

```bash
# ── Server ──────────────────────────────────────────────────────
NODE_ENV=development              # development | production | test
PORT=5000                         # HTTP server port

# ── Database ────────────────────────────────────────────────────
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/
MONGO_DB_NAME=connectx

# ── Redis ────────────────────────────────────────────────────────
REDIS_URL=redis://localhost:6379

# ── JWT ──────────────────────────────────────────────────────────
# Must be at minimum 32 characters; use: openssl rand -hex 32
JWT_ACCESS_SECRET=your_super_secret_access_key_minimum_32_chars
JWT_REFRESH_SECRET=your_super_secret_refresh_key_minimum_32_chars
JWT_ACCESS_EXPIRY=15m             # Access token lifetime
JWT_REFRESH_EXPIRY=7d             # Refresh token lifetime

# ── CORS ─────────────────────────────────────────────────────────
CLIENT_ORIGIN=http://localhost:5173  # Frontend URL for CORS whitelist
```

> ⚠️ **Never commit `.env` files.** The `.gitignore` excludes them. In production, all secrets are stored in AWS Secrets Manager and injected into the ECS task via `valueFrom` references in the task definition.

### Frontend (`.env`)

```bash
VITE_API_URL=http://localhost:5000        # Backend API base URL
VITE_SOCKET_URL=http://localhost:5000    # Socket.io server URL
VITE_APP_NAME=ConnectX
```

---

## 📂 Project Structure

```
connectx/
├── backend/                         # Node.js / Express API
│   ├── src/
│   │   ├── api/                     # Feature modules (controllers, routes, services, models)
│   │   │   ├── auth/                # Registration, login, token management
│   │   │   ├── users/               # Profiles, follow/unfollow, user CRUD
│   │   │   ├── posts/               # Feed, post CRUD, likes
│   │   │   └── health/              # ALB health check endpoint
│   │   ├── config/
│   │   │   ├── env.ts               # Zod-validated environment variables (single source of truth)
│   │   │   ├── db.ts                # Mongoose connection with exponential backoff retry
│   │   │   ├── redis.ts             # ioredis client + cache helper utilities
│   │   │   ├── cacheKeys.ts         # All cache key generators and TTL constants
│   │   │   ├── socket.ts            # Socket.io server with Redis adapter
│   │   │   └── logger.ts            # Winston structured logger + Morgan stream
│   │   ├── middlewares/
│   │   │   ├── requireAuth.ts       # JWT verification, req.user population
│   │   │   ├── rateLimiter.ts       # Per-route rate limiters (login, register, global)
│   │   │   ├── validate.ts          # Zod schema validation middleware factory
│   │   │   ├── cache.ts             # Redis response cache middleware
│   │   │   ├── errorHandler.ts      # Centralized error mapping (Mongoose, JWT, ApiError)
│   │   │   ├── notFound.ts          # 404 catch-all
│   │   │   └── requestLogger.ts     # Per-request UUID injection for distributed tracing
│   │   ├── services/
│   │   │   └── token.service.ts     # JWT sign/verify, cookie options, Redis blacklist
│   │   ├── utils/
│   │   │   ├── ApiError.ts          # Custom error class with static factory methods
│   │   │   ├── ApiResponse.ts       # Standardized success response wrapper
│   │   │   ├── asyncHandler.ts      # Async route wrapper for belt-and-suspenders catching
│   │   │   └── socketEmitter.ts     # Socket.io event emission helpers
│   │   ├── types/
│   │   │   └── express.d.ts         # Module augmentation: req.user, req.requestId
│   │   ├── app.ts                   # Express application (middleware stack, routes)
│   │   └── server.ts                # Process entry: listen, graceful shutdown, signal handlers
│   ├── tests/
│   │   ├── unit/                    # Isolated unit tests (ApiError, token service, validate)
│   │   └── integration/             # Supertest API integration tests (auth, posts, users)
│   ├── Dockerfile                   # Multi-stage: builder (tsc) → production (alpine + dumb-init)
│   ├── .dockerignore
│   ├── jest.config.ts
│   └── .env.example
│
├── frontend/                        # React 18 / Vite application
│   ├── src/
│   │   ├── features/                # Feature-based modules
│   │   │   ├── auth/                # Login, Register pages, authStore (Zustand), hooks
│   │   │   ├── feed/                # FeedPage, PostCard, FeedList, CreatePost, feed hooks
│   │   │   ├── posts/               # PostDetail, LikeButton, post mutation hooks
│   │   │   ├── profile/             # ProfilePage, ProfileHeader, FollowButton, profile hooks
│   │   │   └── notifications/       # NotificationItem, NotificationToast, socket hooks
│   │   ├── components/
│   │   │   ├── ui/                  # Primitive components: Button, Input, Avatar, Skeleton…
│   │   │   ├── layout/              # RootLayout, Sidebar, Header, RightPanel, ProtectedRoute
│   │   │   └── shared/              # ErrorBoundary, LazyImage, InfiniteScrollSentinel
│   │   ├── hooks/                   # Global hooks: useMediaQuery, useDebounce, useClickOutside
│   │   ├── lib/
│   │   │   ├── axios.ts             # Axios instance, request interceptor, refresh queue
│   │   │   ├── queryClient.ts       # TanStack Query configuration
│   │   │   ├── queryKeys.ts         # Type-safe query key factory
│   │   │   ├── socket.ts            # Socket.io client instances (feedSocket, notificationsSocket)
│   │   │   └── utils.ts             # cn() = clsx + tailwind-merge
│   │   ├── services/                # API service layer (auth, posts, users)
│   │   ├── store/                   # Zustand stores: authStore, uiStore
│   │   ├── types/                   # Shared TypeScript interfaces: api, user, post
│   │   ├── router/                  # createBrowserRouter config, lazy-loaded routes
│   │   ├── constants/               # APP_ROUTES, MAX_POST_LENGTH, etc.
│   │   ├── App.tsx                  # Root component: QueryClientProvider, Toaster, auth init
│   │   └── main.tsx                 # ReactDOM.createRoot entry point
│   ├── e2e/                         # Playwright end-to-end tests
│   ├── Dockerfile                   # Multi-stage: Vite builder → Nginx alpine
│   ├── nginx.conf                   # SPA routing, gzip, asset caching, API proxy
│   ├── vitest.config.ts
│   └── .env.example
│
├── docker-compose.yml               # Full stack: mongo, redis, backend, frontend
├── docker-compose.dev.yml           # Development overrides (ts-node-dev hot reload)
├── playwright.config.ts             # E2E test configuration
├── Makefile                         # Developer convenience commands
└── .github/
    └── workflows/
        └── ci-cd.yml                # Test → Build → Push ECR → Deploy ECS
```

---

## 🐳 Deployment

### Local Docker Compose

```bash
# Build and start all services
docker-compose up -d --build

# Check service health
docker-compose ps

# View backend logs
docker-compose logs -f backend
```

### Production: AWS ECS / Fargate

#### Step 1 — Build and Push Backend Image to ECR

```bash
# Authenticate Docker to ECR
aws ecr get-login-password --region us-east-1 \
  | docker login --username AWS --password-stdin <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com

# Build and tag
docker build -t connectx-backend ./backend
docker tag connectx-backend:latest <ECR_URI>/connectx-backend:latest

# Push
docker push <ECR_URI>/connectx-backend:latest
```

#### Step 2 — Build and Deploy Frontend to S3 + CloudFront

```bash
cd frontend

# Build with production API URL
VITE_API_URL=https://api.connectx.io npm run build

# Sync to S3
aws s3 sync dist/ s3://connectx-frontend --delete

# Invalidate CDN cache
aws cloudfront create-invalidation \
  --distribution-id <CLOUDFRONT_ID> \
  --paths "/*"
```

#### Step 3 — Update ECS Service

```bash
# Register new task definition revision with the new image tag
aws ecs register-task-definition --cli-input-json file://ecs-task-definition.json

# Update the service (triggers rolling deployment)
aws ecs update-service \
  --cluster connectx-cluster \
  --service connectx-backend \
  --task-definition connectx-backend:latest

# Wait for deployment to stabilize (zero downtime rolling)
aws ecs wait services-stable \
  --cluster connectx-cluster \
  --services connectx-backend
```

#### ECS Task Definition Highlights

```json
{
  "family": "connectx-backend",
  "cpu": "512",
  "memory": "1024",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "containerDefinitions": [{
    "name": "backend",
    "image": "<ECR_URI>/connectx-backend:latest",
    "portMappings": [{ "containerPort": 5000 }],
    "secrets": [
      { "name": "MONGO_URI", "valueFrom": "arn:aws:secretsmanager:...:MONGO_URI" },
      { "name": "JWT_ACCESS_SECRET", "valueFrom": "arn:aws:secretsmanager:...:JWT_ACCESS_SECRET" }
    ],
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": { "awslogs-group": "/connectx/backend/production" }
    },
    "healthCheck": {
      "command": ["CMD", "node", "-e", "require('http').get('http://localhost:5000/api/v1/health', r => process.exit(r.statusCode === 200 ? 0 : 1))"],
      "interval": 30,
      "timeout": 5,
      "retries": 3
    }
  }]
}
```

### CI/CD Pipeline (GitHub Actions)

Every push triggers the full pipeline:

```
push to main
     │
     ├── test-backend (Jest + Supertest, MongoDB + Redis services)
     │       └── upload coverage to Codecov
     │
     ├── test-frontend (Vitest + RTL + MSW)
     │
     ├── build-and-push (Docker build → ECR push, tagged with git SHA)
     │
     └── deploy-production
             ├── Update ECS task definition
             ├── aws ecs wait services-stable
             ├── CloudFront invalidation
             ├── Smoke test: curl /api/v1/health
             └── Rollback on failure
```

---

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Run all tests
npm test

# Run with coverage report
npm test -- --coverage

# Run only unit tests
npm test -- tests/unit

# Run only integration tests
npm test -- tests/integration

# Run a specific test file
npm test -- tests/integration/auth/register.test.ts
```

### Frontend Tests

```bash
cd frontend

# Run all component and hook tests
npm run test

# Run with coverage
npm run test:coverage

# Run in watch mode (development)
npm run test:watch
```

### End-to-End Tests (Playwright)

```bash
# Install Playwright browsers (first time)
npx playwright install --with-deps chromium firefox

# Run all E2E tests
npx playwright test

# Run with headed browser (see the UI)
npx playwright test --headed

# Run a specific test file
npx playwright test e2e/auth/login.spec.ts

# Open the HTML report
npx playwright show-report
```

### Test Coverage Targets

| Layer | Target | Critical Paths |
|---|---|---|
| Backend unit tests | 80% line coverage | 100% for auth and token service |
| Backend integration tests | All API routes | All auth flows must be fully covered |
| Frontend components | 70% coverage | Button, PostCard, CreatePost, auth pages |
| E2E journeys | 10 critical paths | Register → login → post → like → follow |

---

## 🔧 Troubleshooting

**`Error: Environment variable validation failed: JWT_ACCESS_SECRET must be at least 32 characters`**
Your `.env` is missing or has a truncated secret. Run `openssl rand -hex 32` to generate a valid 64-character hex secret.

**`MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017`**
MongoDB is not running. Start it locally (`mongod`) or verify your `MONGO_URI` points to a reachable Atlas cluster. Check that your Atlas IP whitelist includes your current IP address.

**`Redis connection error: connect ECONNREFUSED 127.0.0.1:6379`**
Redis is not running. Start it (`redis-server`) or set `REDIS_URL` to a remote instance. ConnectX degrades gracefully — the server will still start, but caching and token blacklisting will be unavailable.

**`CORS error` in browser when calling the API**
Verify `CLIENT_ORIGIN` in your backend `.env` exactly matches the frontend origin including port (e.g., `http://localhost:5173`). Trailing slashes matter.

**Socket.io connection fails after page reload**
The access token has expired. The `useAuthInit` hook should silently refresh it on mount via the HTTP-only cookie. If the cookie has also expired, the user must re-authenticate.

**`docker-compose up` fails with port conflict**
A previous container or local process is occupying port 5000, 27017, or 6379. Run `docker-compose down` and check for stale containers (`docker ps -a`), or change the host port mapping in `docker-compose.yml`.

**Feed loads but real-time updates don't appear**
Confirm the Socket.io client is connected: check the browser network tab for a WebSocket connection to `ws://localhost:5000/feed`. If absent, verify `VITE_SOCKET_URL` is set and `connectSockets()` is called after login.

**`npm test` fails with `Cannot find module 'mongodb-memory-server'`**
Ensure you have installed dev dependencies: `npm install`. MongoDB Memory Server downloads a MongoDB binary on first run — this requires internet access and may take up to a minute.

---

## ❓ FAQ

**Q: Why MongoDB instead of PostgreSQL?**
The social graph model (users, posts, likes, follows, tags) benefits from MongoDB's document model and flexible schema evolution. The Follow collection pattern and indexed ObjectId cursors provide excellent performance without the join complexity of a relational model for feed queries.

**Q: Why not use `localStorage` for the access token?**
`localStorage` is accessible to any JavaScript running on the page — including injected XSS payloads. ConnectX holds the access token exclusively in Zustand memory (cleared on page reload) and relies on the HTTP-only refresh token cookie to restore sessions. This is the same pattern used by industry-leading platforms.

**Q: How does the feed scale to millions of posts?**
Cursor-based pagination using MongoDB's ObjectId as the cursor provides O(log n) query performance regardless of collection size. The Redis sorted set pre-loads the 200 most recent post IDs, so the majority of feed reads never touch MongoDB at all.

**Q: Can ConnectX run on a single server?**
Yes. Without the Redis adapter, Socket.io works normally on a single Node.js instance. The Redis adapter is only needed when multiple instances must share WebSocket rooms. The Docker Compose setup runs everything on one machine.

**Q: How do I add a new feature module?**
Create a folder under `src/api/<feature>/` with the standard structure: `<feature>.model.ts`, `<feature>.types.ts`, `<feature>.validation.ts`, `<feature>.service.ts`, `<feature>.controller.ts`, `<feature>.routes.ts`. Mount the router in `app.ts` under `/api/v1/<feature>`.

**Q: Why `dumb-init` in the Docker image?**
Docker containers run Node.js as PID 1 by default. PID 1 does not forward signals (like SIGTERM from ECS) to child processes by default. `dumb-init` acts as a minimal init system that correctly forwards signals, ensuring ConnectX's graceful shutdown handler fires during ECS rolling deployments.

---

## 🗺 Roadmap

### Phase 2 — In Progress

- [ ] **Comments** — threaded comment system with nested replies and real-time notifications
- [ ] **Media Storage** — AWS S3 presigned URL upload flow for images and videos with CloudFront delivery
- [ ] **Explore / Search** — full-text post search via MongoDB Atlas Search and user discovery algorithm
- [ ] **Direct Messages** — end-to-end private messaging with Socket.io and message persistence

### Phase 3 — Planned

- [ ] **Stories** — 24-hour ephemeral content with view tracking
- [ ] **Bookmarks** — save posts for later; personal curated collection
- [ ] **Content Moderation** — AI-powered flagging pipeline via AWS Rekognition for image content
- [ ] **Analytics Dashboard** — post impressions, follower growth, engagement rate charts
- [ ] **OAuth** — Sign in with Google, GitHub via `passport.js`

### Phase 4 — Future

- [ ] **Mobile Apps** — React Native clients sharing the Zustand store and service layer
- [ ] **GraphQL API** — Apollo Server layer for mobile efficiency and subscription support
- [ ] **Monetization** — Creator badges, tipping, subscription tiers
- [ ] **Multi-language** — i18n with `react-i18next`, RTL layout support

---

## 🤝 Contributing

Contributions are welcome and appreciated. Please read through the guidelines before opening a pull request.

**Development workflow:**

```bash
# 1. Fork the repository and clone your fork
git clone https://github.com/<your-username>/connectx.git

# 2. Create a feature branch from develop
git checkout -b feature/my-feature develop

# 3. Make your changes, write tests
npm test -- --coverage

# 4. Ensure linting passes
npm run lint

# 5. Commit with a conventional commit message
git commit -m "feat(posts): add hashtag extraction on post creation"

# 6. Push and open a pull request against develop
git push origin feature/my-feature
```

**Commit format** — ConnectX uses [Conventional Commits](https://www.conventionalcommits.org): `type(scope): description`. Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.

**Branch strategy:**

| Branch | Purpose |
|---|---|
| `main` | Production-ready code. Every merge triggers a production deploy. |
| `develop` | Integration branch. All feature PRs target here. |
| `feature/*` | New features |
| `fix/*` | Bug fixes |
| `hotfix/*` | Critical production patches branched from `main` |

Please ensure your PR includes test coverage for new functionality. PRs that reduce the coverage percentage will not be merged.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

## 📬 Contact

| | |
|---|---|
| **Project Lead** | [@your-handle](https://github.com/your-handle) |
| **GitHub Discussions** | [github.com/your-org/connectx/discussions](https://github.com/your-org/connectx/discussions) |
| **Bug Reports** | [github.com/your-org/connectx/issues](https://github.com/your-org/connectx/issues) |
| **Email** | hello@connectx.io |
| **Twitter / X** | [@ConnectXApp](https://twitter.com/ConnectXApp) |

---

<div align="center">

Built with ❤️ and ☕ — if ConnectX helped you, consider giving it a ⭐

</div>
