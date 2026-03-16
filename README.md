<p align="center">
  <strong style="font-size: 32px;">Enter<span style="color: #6366F1">CRM</span></strong>
</p>

<p align="center">
  Enterprise-grade CRM platform with real-time tracking, smart segmentation, and multi-channel automation.
</p>

<p align="center">
  <a href="#features">Features</a> &nbsp;&middot;&nbsp;
  <a href="#tech-stack">Tech Stack</a> &nbsp;&middot;&nbsp;
  <a href="#architecture">Architecture</a> &nbsp;&middot;&nbsp;
  <a href="#getting-started">Getting Started</a> &nbsp;&middot;&nbsp;
  <a href="#demo">Demo</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-12-FF2D20?style=flat-square&logo=laravel&logoColor=white" alt="Laravel 12" />
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js&logoColor=white" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/PHP-8.2-777BB4?style=flat-square&logo=php&logoColor=white" alt="PHP 8.2" />
</p>

---

## About

**EnterCRM** is a SaaS CRM platform built by [EnterSolutions](https://entersolutions.io) that helps businesses understand their customers through data. It tracks website interactions via a lightweight JavaScript snippet and customer-provided API integrations, generates actionable analytics (RFM segmentation, CLV predictions), and triggers automated multi-channel actions — email, SMS, and call lists.

Built with a modern two-app architecture: a Laravel 12 REST API handles all business logic, authentication, and data processing, while a Next.js 16 frontend delivers a fast, responsive dashboard experience.

### Key Highlights

- **Dual Data Ingestion** — JS tracking snippet + server-side API bridge
- **RFM Analysis** — 5x5x5 matrix generating 125 customer segments automatically
- **CLV Predictions** — Customer lifetime value tracking and forecasting
- **Visual Automation Builder** — Drag-and-drop workflow editor with conditional branching
- **Multi-tenant** — Complete data isolation per workspace
- **Bilingual** — Full English / Croatian (HR) interface with runtime language switching

---

## Features

### Customer Intelligence
- Real-time event tracking (page views, purchases, custom events)
- RFM segmentation (Recency, Frequency, Monetary)
- Customer lifetime value (CLV) calculation and prediction
- Automatic and manual segment creation
- Customer profile with full activity timeline

### Campaigns & Automation
- Multi-channel campaigns: Email, SMS, Call Lists, Ads
- Visual automation builder with 4 node types:
  - **Trigger** — Event-based workflow initiation
  - **Condition** — Yes/No branching logic
  - **Action** — Send email, SMS, add to list
  - **Delay** — Time-based waiting periods
- Campaign analytics with delivery, open, click, and bounce rates
- Ad platform integration (Google, Meta, TikTok, LinkedIn)

### Analytics & Dashboard
- Real-time overview with KPI cards and trend indicators
- Revenue tracking with monthly breakdown charts
- RFM distribution visualization
- Customer growth and engagement metrics
- Top customers by CLV leaderboard

### Platform
- Token-based authentication (Laravel Sanctum)
- API key management with `eck_` prefixed keys
- Multi-tenant architecture with workspace isolation
- Contact form with email integration
- Full documentation site with API reference

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org) | App Router, SSR, file-based routing |
| [React 19](https://react.dev) | UI rendering |
| [TypeScript 5](https://typescriptlang.org) | Type safety |
| [Tailwind CSS 4](https://tailwindcss.com) | Utility-first styling |
| [shadcn/ui](https://ui.shadcn.com) + Radix UI | Component library |
| [Framer Motion](https://motion.dev) | Animations |
| [React Flow 12](https://reactflow.dev) | Visual automation builder |
| [Recharts](https://recharts.org) | Dashboard charts |
| [TanStack Table](https://tanstack.com/table) | Data tables |

### Backend
| Technology | Purpose |
|---|---|
| [Laravel 12](https://laravel.com) | REST API framework |
| [PHP 8.2](https://php.net) | Server-side language |
| [Laravel Sanctum](https://laravel.com/docs/sanctum) | Token-based auth |
| SQLite / PostgreSQL | Database |

### Infrastructure
| Technology | Purpose |
|---|---|
| Google Cloud | Deployment |
| Docker | Containerization |

---

## Architecture

```
enter-crm/
├── backend/                 # Laravel 12 REST API
│   ├── app/
│   │   ├── Http/Controllers/Api/   # 8 controllers
│   │   ├── Models/                 # 12 models
│   │   └── ...
│   ├── routes/api.php              # 34 API routes
│   └── database/
│       ├── migrations/             # 15 tables
│       └── seeders/                # Demo data
│
├── frontend/                # Next.js 16 App
│   ├── src/app/
│   │   ├── page.tsx                # Marketing landing page
│   │   ├── (auth)/login/           # Authentication
│   │   ├── dashboard/              # 10 dashboard pages
│   │   ├── docs/                   # Documentation (3 pages)
│   │   └── [legal pages]           # Privacy, Terms, GDPR, etc.
│   ├── src/components/
│   │   ├── automation/             # Visual workflow builder
│   │   ├── dashboard/              # Dashboard components
│   │   ├── marketing/              # Landing page sections
│   │   └── ui/                     # shadcn components
│   └── src/lib/
│       ├── api.ts                  # API client with auto-auth
│       ├── auth.ts                 # Token management
│       └── i18n.tsx                # EN/HR language system
│
└── tracker/                 # JS tracking snippet
    └── enter-track.js
```

### Data Flow

```
Client Website ──→ JS Snippet / Customer API ──→ Laravel API ──→ Database
                                                       │
                                                       ▼
                                               Analytics Engine
                                                       │
                                                       ▼
                                            Segmentation (RFM/CLV)
                                                       │
                                                       ▼
                                         Automation Triggers (Email/SMS/Call)
```

---

## Getting Started

### Prerequisites

- **PHP** >= 8.2
- **Composer** >= 2.x
- **Node.js** >= 20.x
- **npm** >= 10.x

### Backend Setup

```bash
cd backend

# Install dependencies
composer install

# Environment setup
cp .env.example .env
php artisan key:generate

# Database (SQLite for development)
touch database/database.sqlite
php artisan migrate --seed

# Start the server
php artisan serve
```

The API will be available at `http://localhost:8000/api`.

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## Demo

Use the built-in demo account to explore the full dashboard:

| | |
|---|---|
| **Email** | `demo@entercrm.io` |
| **Password** | `password` |

The demo comes pre-loaded with 20 customers, 8 segments, 4 campaigns, and 3 automations.

---

## API Overview

All API endpoints are prefixed with `/api` and require Bearer token authentication (except tracking).

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/login` | Authenticate user |
| `GET` | `/dashboard/overview` | Dashboard KPIs and charts |
| `GET` | `/customers` | List customers (paginated) |
| `GET` | `/customers/{id}` | Customer detail + activity |
| `GET` | `/segments` | List segments |
| `GET` | `/campaigns` | List campaigns |
| `POST` | `/campaigns` | Create campaign |
| `GET` | `/automations` | List automations |
| `POST` | `/automations/{id}/design` | Save automation workflow |
| `POST` | `/track/event` | Track event (API key auth) |

Full API documentation is available at `/docs/api` in the running application.

---

## Design System

EnterCRM uses a dark, minimal design language inspired by [Huly](https://huly.io) and [Liveblocks](https://liveblocks.io).

| Token | Value | Usage |
|---|---|---|
| Background | `#0A0A0B` | Page background |
| Card | `#111113` | Cards, panels |
| Sidebar | `#0E0E10` | Navigation sidebar |
| Accent | `#6366F1` | Primary actions, links |
| Border | `#1F1F23` | Dividers, card borders |
| Text Primary | `#FAFAFA` | Headings, body text |
| Text Secondary | `#A1A1AA` | Labels, descriptions |
| Text Muted | `#71717A` | Captions, timestamps |

---

## Roadmap

- [x] Marketing site with 10+ sections
- [x] Full EN/HR internationalization
- [x] Authentication system (login + demo)
- [x] Dashboard with 10 sub-pages
- [x] Customer management with data tables
- [x] RFM segmentation engine
- [x] Campaign management (Email, SMS, Call, Ads)
- [x] Visual automation builder (React Flow)
- [x] API key management
- [x] Documentation site + API reference
- [x] Legal pages (Privacy, Terms, GDPR, DPA, Cookies)
- [ ] Email integration (Resend / SendGrid)
- [ ] Real-time WebSocket notifications
- [ ] Docker deployment configuration
- [ ] Google Cloud production deployment
- [ ] Webhook system for external integrations

---

## License

This is a proprietary project of [EnterSolutions](https://entersolutions.io). All rights reserved.

---

<p align="center">
  Built with care in Zagreb, Croatia
  <br />
  <a href="https://entersolutions.io">entersolutions.io</a>
</p>
