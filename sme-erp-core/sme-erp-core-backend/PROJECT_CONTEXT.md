# Project Context — sme-erp-core-backend

## Stack & Architecture

- FastAPI web framework; Uvicorn (`standard`) ASGI server.
- SQLAlchemy `>=2.0.0` ORM, 2.0 style (`Mapped`/`mapped_column`, `DeclarativeBase`).
- Pydantic v2 for request/response validation and schema serialization.
- PostgreSQL 13+ target; `psycopg2` driver → **sync** stack (no asyncpg/aiomysql in requirements).
- `python-dotenv` present but not yet wired into `database.py`.
- Request flow: **router → crud/service → model**; Pydantic schemas validate at the boundary.
- DB access: single shared `SessionLocal` (sync `sessionmaker`) injected via `Depends(get_db)` (see `app/database.py`).
- No JWT/auth library in `requirements.txt` → auth deferred (Sprint 1) until a JWT lib is added.
- Sync over async chosen because `psycopg2` is the only DB driver declared.

## Folder structure (planned)

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

## Main modules/domains

### Module 1 — Inventory & Supply Chain (in scope now)

15 table groups, grouped by domain:

- **Organization:** `branches`, `warehouses`, `users` (users skeleton only — full HRM in Module 3)
- **Catalog:** `categories`, `brands`, `attributes` + `attribute_values`, `vendors`, `products`, `product_attributes`, `product_serials`
- **Inventory:** `stock_cards`, `stock_reservations`, `stock_movements`
- **Purchasing:** `purchase_receipts` + `purchase_receipt_lines`
- **Stocktake:** `stocktakes` + `stocktake_lines`

### Module 2 — Sales (POS/OMS) & CRM (roadmap)

- Depends on Module 1: consumes `product_serials` (serial sales), `products` (pricing/floor_price), `stock_cards` (physical_stock), `stock_reservations` (order_id). References Module 1 via plain UUID `order_id` (no FK) until it exists.

### Module 3 — HRM, Commissions & RBAC (roadmap)

- Defines `users`, `roles`, `permissions`, `employee_contracts`, commission matrix. Module 1 tables reference `users`/`roles` as plain UUID columns (no FK) until this module lands.

### Module 4 — Finance & BI (roadmap)

- Reads `purchase_receipts.total_amount` as payables input; owns `cash_receipts`/`cash_payments`/`accounting_periods`. Module 1 must exist first.

## Current code conventions

- Repo has **no application code yet** — only `app/database.py` (partial) and empty placeholders.
- Conventions below are the agreed defaults, written down to guide the first commit.
- Full rules: see `CODING_CONVENTION.md` (naming, model/schema patterns, error handling, Alembic, agent run limits).

## Notes for generating task prompts (implicit constraints, non-inferable from code)

- **Soft-delete everywhere:** never hard delete; "unique" = unique among `deleted_at IS NULL` → **partial unique indexes** on `deleted_at IS NULL`.
- **Parent-delete guard:** soft-deleting a parent with active children must be rejected at app/trigger layer (DB `RESTRICT` does not block soft-delete).
- **PK:** UUID, app-default (`uuid.uuid4()`), stored as `String(36)` or native `postgresql.UUID`.
- **Audit:** `created_at/updated_at/deleted_at` + `created_by/updated_by/deleted_by` (→ `users`, `ON DELETE SET NULL`).
- **Money:** `Numeric(15, 2)`, Python `Decimal`, `CheckConstraint(... >= 0)` named `ck_<table>_<col>_nonneg`.
- **Timestamps:** timezone-aware (`DateTime(timezone=True)`).
- **FKs:** explicit `ON DELETE` on every foreign key; index every FK column.
- **Constraint naming:** shared `MetaData` naming-convention dict (`ix_%(column_0_label)s`, `uq_<table>_<cols>`, `fk_<table>_<col>_fkey`, `pk_<table>`, `ck_<table>_<cols>_<rule>`).
- **Relationships:** string targets (`relationship("Product")`) to avoid import cycles; no `cascade="all"` on soft-deletable children.
- **Immutable documents:** `stock_movements` (append-only), `confirmed` `purchase_receipts` (no `updated_at/updated_by`), closed `stocktakes`. Corrections only via reversal/adjustment rows — see `CODING_CONVENTION.md` immutable-doc mixin and STATE.md Open Questions on `purchase_receipts` draft edits.
- **No negative stock:** `export` and creating an `active` reservation must check `available_stock ≥ |qty|` inside one transaction locking `stock_cards` with `SELECT ... FOR UPDATE`; reject as **409** if insufficient. All other movements only must keep `physical_stock ≥ 0`.
- **`available_stock` is computed**, never a stored column: `physical_stock − SUM(active reservations matching product+warehouse)`.
- **Serial enforcement:** if `product.is_serial_tracked`, every export `stock_movements` row **must** carry `serial_id`; the serial must be `in_stock` or `reserved` by the same order; after export set `serial_status = 'sold'`. Create one `product_serial` per unit on confirmed receipt.
- **Cost confidentiality:** hide `last_import_price`, `average_import_price`, `purchase_receipt_lines.unit_cost`, `stock_movements.unit_cost`, `product_serials.import_price`, and all COGS/margin from `sales`/`warehouse_staff` at the **schema layer** (role-specific Read schema, never runtime `exclude=`). Only `accountant`/`admin`.
- **`average_import_price`:** recompute on receipt confirm as `(old_stock × old_avg + new_qty × new_cost) / (old_stock + new_qty)`; `last_import_price` = newest `unit_cost`.
- **`purchase_receipt.total_amount`** computed from lines (never user-input).
- **Branch isolation:** route queries through `warehouse → branch`; staff see only their branch; managers/execs see all (filter built into service layer).
- **Multi-channel reservations:** POS/Web/Shopee/Lazada all call the **same** reservation creation path on order "Confirmed"; `stock_reservations.order_id` is a plain UUID (no FK) until Module 2 exists.
- **Transfer pairing:** `transfer_group_id` (UUID) pairs the `transfer_out` and `transfer_in` of one transfer.
- **Movement sign rule:** `import`/`transfer_in`/`return_in` > 0; `export`/`transfer_out`/`return_out` < 0.
- **Price ordering:** `floor_price ≤ wholesale_price ≤ listed_retail_price`.
- **Stocktake locking:** `stocktakes` `open` blocks `stock_movements` for the matching warehouse (and `scope_category` if set) until closed.
- **Stocktake close:** all lines must have `counted_quantity`; short lines require `variance_reason` + `responsibility`; close auto-creates `stocktake_adjust` movements to reconcile `physical_stock = counted_quantity`.

## Areas needing a tight SCOPE in later task prompts

- Stock movement + reservation logic (race-free available_stock checks).
- Average price recalculation on purchase receipt confirm.
- Stocktake close / reconciliation movement generation.
