# State — sme-erp-core-backend

## Project Map

### Real (existing)

```
docs/
  project-docs/project-brief-en.md
  project-docs/detail-erp-bussiness-description-en.md
  project-docs/project-brief-vi.md
  project-docs/detail-erp-bussiness-description-vi.md
  database-docs/module1-schemas.md
  tutorial-docs/  (init-project.md, schema-definition-template.md,
    declarative-syntax.md, id-declaration.md, data-type-library.md,
    postgresql-data-type.md, postgresql-schema.md)
sme-erp-core-backend/requirements.txt
sme-erp-core-backend/app/database.py   (partial — sync engine/SessionLocal/Base/get_db)
sme-erp-core-backend/app/main.py, app/__init__.py, app/models/, app/schemas/
  (empty placeholders; schemas/ also holds schemas.sql reference)
sme-erp-core-backend/.env, .env.example (empty, gitignored)
sme-erp-core-backend/.gitignore

# the four files created by this task
sme-erp-core-backend/README.md
sme-erp-core-backend/PROJECT_CONTEXT.md
sme-erp-core-backend/CODING_CONVENTION.md
sme-erp-core-backend/STATE.md
```

### Planned (not created)

```
sme-erp-core-backend/app/core/       (config, enums, mixins, security, MetaData)
sme-erp-core-backend/app/crud/       (query helpers)
sme-erp-core-backend/app/services/   (transactional business logic)
sme-erp-core-backend/app/api/        (routers)
sme-erp-core-backend/alembic/        (migrations)
sme-erp-core-backend/tests/          (test suite)
sme-erp-core-frontend/               (does not exist yet — side-by-side repo)
```

## Open Questions

- Migration tool: Alembic to be added to `requirements.txt` by the human (not yet present) → migration commands TBD.
- Auth/JWT: PyJWT / python-jose + `python-multipart` to be added to `requirements.txt` by the human.
- Testing: pytest to be added to `requirements.txt` by the human → test tooling TBD.
- Lint/typecheck: ruff / mypy to be added to `requirements.txt` by the human → lint & typecheck commands TBD.
- Run command: exact `uvicorn` entrypoint depends on `app/main.py` defining `app` (currently empty). Needs clarification once code is written.
- DB URL: `SQLALCHEMY_DATABASE_URL` is an empty placeholder in `app/database.py`; `.env` variable name(s) not yet defined. Needs clarification.
- Module 4 naming: brief says "Business Intelligence & Reporting"; Vietnamese docs say "Tài chính, Báo cáo & Đối soát". Consolidated as "Finance & BI" — confirm acceptable.
- `purchase_receipts` immutability vs draft: doc marks `confirmed` receipts immutable, but `status` enum includes `draft`. **Which fields are editable in `draft`?** Is draft→confirmed irreversible? Needs clarification.
- Tooling & auth sequencing: minimal auth (JWT + RBAC) is needed before Module 1 routers; tooling (`alembic`, `pytest`, `ruff`, `mypy`, `psycopg2-binary`) to be added to `requirements.txt` by human.

## Tasks

### Build DB schema for Module 1 — todo

- [ ] **(1)** project skeleton + db session/`Base` (`app/database.py`, `app/__init__.py`, `app/main.py` stub)
- [ ] **(2)** mixins + enums (`core/mixins.py`: UUID/audit/soft-delete/immutable-doc; enums with doc values)
- [ ] **(3)** models per domain group (organization, catalog, inventory, purchasing, stocktake)
- [ ] **(4)** Alembic setup + initial migration (Alembic to be added by human; see Open Questions)
- [ ] **(5)** Pydantic schemas (Base/Create/Update/Read; sensitive-field hidden Read variants)
- [ ] **(6)** crud/service (queries + stock/reservation/avg-price/stocktake-close logic)
- [ ] **(7)** routers (kebab-case endpoints; no business logic)

> Current focus: schema-layer sub-tasks **(1)–(5)** only. Sub-tasks (6)–(7) and Modules 2–4 are future.

## Known issues

- None yet.

## Temporary decisions

- Module 2–4 references (`orders.order_id`, `roles`, `permissions`, `employee_contracts`, `cash_receipts`, `accounting_periods`) are **FK-less plain UUID columns** until those modules are built; only true Module 1 foreign keys get constraints.
- `users` materialized with Module 1-relevant fields only (id, username/email/phone, branch, role); full HRM schema deferred to Module 3.
- Sync stack chosen because `psycopg2` (blocking driver) is the only DB driver in `requirements.txt`; async would require `asyncpg`.
- Module 4 name consolidated to **"Finance & BI"** pending confirmation (see Open Questions).
- Enum values kept exactly as lowercase strings in `docs/database-docs/module1-schemas.md`.
