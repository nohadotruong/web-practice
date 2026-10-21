# Coding Convention — sme-erp-core-backend

FastAPI + SQLAlchemy 2.0 + PostgreSQL (sync). Rules below assume only the libraries in `requirements.txt`.

## Naming

- Files: `snake_case` (e.g. `product_serials.py`).
- Classes: `PascalCase` (models, schemas, enums, services).
- Tables: `snake_case`, **plural** (e.g. `stock_movements`).
- Columns: `snake_case` (`created_at`, never `createdAt`).
- Endpoints: `kebab-case`, plural nouns, `/api/v1/...`.
- Enum classes: `PascalCase`; string values **exactly** as in `docs/database-docs/module1-schemas.md` — lowercase: `in_stock`, `draft`, `genuine`, `pos`, `active`, `damaged`, ...

## SQLAlchemy

- 2.0 declarative style: `Mapped[...]` + `mapped_column(...)`, `class Base(DeclarativeBase)`.
- PK: UUID, app default (`uuid.uuid4()`), native `postgresql.UUID(as_uuid=True)`. Decision: UUID PK = native `postgresql.UUID(as_uuid=True)`; `UUIDBase.id` is `Mapped[uuid.UUID]` (not `str`/`String(36)`).
- Enums: **String-backed** (`native_enum=False`) with `values_callable`, so the lowercase values from `docs/database-docs/module1-schemas.md` are stored in PostgreSQL as text (no native `ENUM` type).
- Money: `Numeric(15, 2)`, Python `Decimal`; `CheckConstraint(col >= 0, name="ck_<table>_<col>_nonneg")`.
- Timestamps: `DateTime(timezone=True)` with `server_default=func.now()`; `onupdate=func.now()` for mutable rows.
- FK: explicit `ForeignKey("table.col", ondelete=...)` on every FK; index every FK column.
- Soft-delete uniqueness: `Index(..., unique=True, postgresql_where=text("deleted_at IS NULL"))` only — never `UniqueConstraint` for soft-deleted fields.
- Shared `MetaData` naming-convention dict: `ix_%(column_0_label)s`, `uq_<table>_<cols>`, `fk_<table>_<col>_fkey`, `pk_<table>`, `ck_<table>_<cols>_<rule>`. Decision (constraint naming): pass **only the suffix** as the constraint name; the MetaData naming-convention dict adds the standard prefix (`ix_`, `uq_`, `fk_`, `pk_`, `ck_`).
- Relationships use **string** targets (`relationship("Product")`) to dodge import cycles; never `cascade="all"` on soft-deletable children.
- Circular FKs (`users ↔ branches`, `warehouses.warehouse_manager`): declare with `use_alter=True` so Alembic emits them via `ALTER TABLE` after both tables exist.
- Mixins in `core/mixins.py`:
  - `UUIDBase` — `id: Mapped[uuid.UUID]` default UUID.
  - `AuditSoftDeleteMixin` — `created_at/updated_at/deleted_at` + `created_by/updated_by/deleted_by` (FK users, `ON DELETE SET NULL`).
  - `ImmutableDocMixin` — audit columns only, **no** `updated_at/updated_by`; corrections = new rows.
  - (Optional) branch-scoping helper for `warehouse → branch` isolation.

## Layering

- **Routers (`api/`):** route + `Depends(get_db)` + DTO dispatch only; no queries, no business logic.
- **Services (`services/`):** transactions, `SELECT ... FOR UPDATE`, stock/reservation checks, stocktake lock+close, price recompute; `db.commit()` only here. One transaction per business op.
- **CRUD (`crud/`):** pure SELECT/INSERT/UPDATE/DELETE helpers; no `commit` (caller commits).
- **Models (`models/`):** persistence mapping only; **no** business logic or invariant checks.

## Pydantic schemas

- Per resource: `Base` / `Create` (no server-managed fields) / `Update` (mutable fields only) / `Read` (`from_attributes=True`).
- Sensitive cost fields (`last_import_price`, `average_import_price`, `purchase_receipt_lines.unit_cost`, `stock_movements.unit_cost`, `product_serials.import_price`) excluded by **schema type**, not runtime `exclude=` — provide a restricted `Read` schema for `sales`/`warehouse_staff`.
- Immutable entities: no `Update` schema.
- `id`, `created_at`, computed `physical_stock=0` excluded from `Create`.

## Errors

- `HTTPException`: 403 permission, 404 not found, 409 conflict (e.g. insufficient stock), 422 validation.
- No swallowed exceptions; log + re-raise. Central `@app.exception_handler` for a domain base exception → consistent JSON.

## Alembic

- One migration per logical change; review `alembic revision --autogenerate` output always.
- **Never edit an applied migration** — add a new one.
- Descriptive revision messages; short hash revision IDs.
- Alembic to be added to `requirements.txt` by the human (not yet present); migration commands TBD (see STATE.md).

## Tooling

- Only tools in `requirements.txt` are usable. ruff/mypy/pytest/black/flake8 are **absent** → to be added to `requirements.txt` by the human; lint/typecheck/test commands TBD once added (see STATE.md).
- Agents may run **static** checks only once a lint/typecheck tool is added; **never** server, alembic, or DB touch.

## Language

- Code, comments, docstrings, commit messages, and these `.md` files: **English**.
- Vietnamese business terms, field names, file names (`Chi nhánh`, `phiếu kiểm kê`): keep **as-is**.

## Commits

- Conventional Commits: `feat|fix|chore|docs|refactor`, imperative subject, ≤ 72 chars.
- Scope by domain: `feat(models): add product_serials`; `feat(schemas): add purchase_receipt line read`.

## Agent rules

- Agents may run **static** checks only (lint/typecheck) — if/when a tool is added to `requirements.txt`.
- Agents must **NOT** run: server start, Alembic upgrade/downgrade, DB DDL, or any DB-touching command. List such commands for the human in `STATE.md` instead.
