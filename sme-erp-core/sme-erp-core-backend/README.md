# sme-erp-core-backend

Backend for **SME ERP Lite** — a multi-channel retail ERP (showroom + e-commerce + Shopee/Lazada marketplaces) with centralized inventory as the single source of truth. FastAPI + SQLAlchemy 2.0 + PostgreSQL, sync stack.

## Module roadmap

| Module | Scope | Status |
| --- | --- | --- |
| Module 1 — Inventory & Supply Chain | Catalog, warehouses, stock card, reservations, movements, purchase receipts, stocktakes | **In progress** — DB schema definition |
| Module 2 — Sales (POS/OMS) & CRM | Orders, customers, loyalty, POS checkout | Roadmap (after Module 1) |
| Module 3 — HRM, Commissions & RBAC | Employees, roles, permissions, commissions | Roadmap (after Module 2) |
| Module 4 — Finance & BI | Cash journals, vouchers, receivables/payables, BI reports | Roadmap |

> Module 4 naming differs between briefs (`docs/project-docs/project-brief-en.md` says "Business Intelligence & Reporting"; Vietnamese briefs say "Tài chính, Báo cáo & Đối soát"). Consolidated as **"Finance & BI"**; see `STATE.md` → Open Questions.

## Backend stack

From `requirements.txt` only:

| Library | Version | Role |
| --- | --- | --- |
| `fastapi` | latest | Web framework |
| `uvicorn[standard]` | latest | ASGI server + live reload |
| `sqlalchemy` | `>=2.0.0` | ORM (2.0 style, `Mapped`/`mapped_column`) |
| `pydantic` | `>=2.0.0` | Request/response validation + schemas |
| `python-dotenv` | latest | `.env` loading |
| `psycopg2` | latest | PostgreSQL driver (**sync** — rules out asyncpg/aiomysql) |

> The following are **not** in `requirements.txt` yet — to be added by the human: `alembic` (migrations), `pytest` (tests), `ruff` + `mypy` (lint/typecheck), `psycopg2-binary`. See `STATE.md` → Open Questions.

Full architecture & layering: `PROJECT_CONTEXT.md`. Style rules: `CODING_CONVENTION.md`.

## Planned folder layout

```
sme-erp-core-backend/            # planned — only placeholders exist today
├── app/
│   ├── api/        # routers, kebab-case endpoints, no business logic
│   ├── core/       # config, enums, mixins, security, shared MetaData
│   ├── crud/       # raw SQLAlchemy queries (no commit)
│   ├── models/     # SQLAlchemy 2.0 ORM models (Module 1 tables)
│   ├── schemas/    # Pydantic Base/Create/Update/Read schemas
│   ├── services/   # transactional logic, stock rules, commit boundary
│   ├── database.py # engine, SessionLocal, Base, get_db()
│   └── main.py     # FastAPI app, router registration
├── alembic/        # planned — not yet added
└── tests/          # planned — not yet added
```

> Only `app/database.py` (partial, sync) and empty placeholders currently exist. Full layout created during implementation.

## Setup

```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

### To be defined (see STATE.md → Open Questions)

- PostgreSQL connection URL — `SQLALCHEMY_DATABASE_URL` is an empty placeholder in `app/database.py`
- `.env` variable name(s) for the DB URL (once `python-dotenv` is wired in)
- Exact `uvicorn` entrypoint (once `app/main.py` defines `app`)
- Alembic migration commands (Alembic to be added to `requirements.txt` by the human)

## Docs

- `PROJECT_CONTEXT.md` — architecture, domains, stock rules
- `CODING_CONVENTION.md` — naming, model/schema, error handling, Alembic, agent rules
- `STATE.md` — tasks, open questions, decisions
- `../docs/project-docs/project-brief-en.md` — system brief, 4-module roadmap, sprints
- `../docs/project-docs/detail-erp-bussiness-description-en.md` — business rules, cross-module flow
- `../docs/database-docs/module1-schemas.md` — Module 1 DB schema (source of truth for this build)
