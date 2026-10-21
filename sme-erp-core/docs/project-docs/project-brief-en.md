# Project Brief: Omnichannel Retail Management System (SME Enterprise Resource Planning - ERP Lite)

---

## 1. Business Context & Problem Statement

A small and medium-sized enterprise (SME) specializing in tech products and consumer electronics currently sells across multiple sales channels: **Physical Showrooms**, an **E-commerce Website**, and **E-commerce Marketplaces (Shopee, Lazada)**.

Currently, HR, inventory, financial, and order management processes are handled separately across Excel spreadsheets and fragmented software tools. This leads to critical business issues:

- **Inventory leakage and discrepancies** due to a lack of real-time multi-channel inventory synchronization.

- **Delays** in expense approvals and revenue reconciliation.

- **Inaccurate performance evaluation (KPIs)** for sales representatives and consultants.

---

## 2. System Requirements

The system must cover four core functional modules:

### Module 1: Inventory & Supply Chain Management

- **Product Catalog Management:** Categories, variant attributes (color, specs), SKU codes, Barcodes/QR codes, and IMEI/Serial Number tracking for electronic gadgets.

- **Warehouse Operations:** Goods Receipts (from suppliers), Goods Issues (sales/stock transfer), Stock Counts (periodic physical audits), and automated Alerts when inventory falls below Safety Stock thresholds.

- **Inventory Synchronization:** Real-time inventory deduction whenever an order is placed on the website or fulfilled at a physical store.

### Module 2: Sales & Customer Relationship Management (POS & CRM)

- **Point of Sale (POS):** Fast invoice creation, barcode scanning, multiple payment methods (Cash, VNPay/MOMO, Bank Transfer), and receipt printing.

- **Customer Management (CRM):** Purchase history tracking, loyalty points accumulation, and membership tiering (Bronze, Silver, Gold, Diamond).

- **Order Management System (OMS):** Order lifecycle status tracking:

`Created` $\rightarrow$ `Confirmed` $\rightarrow$ `Packing` $\rightarrow$ `Shipping` $\rightarrow$ `Completed` / `Cancelled` / `Returned`.

### Module 3: Human Resource Management & Access Control (HRM & RBAC)

- **Employee Profiles:** Base salary, allowances, departments, and job titles.

- **Role-Based Access Control (RBAC):**
- **Admin:** Full system privileges.

- **Warehouse Manager:** Access restricted to Inventory operations (view, receive, dispatch, count).

- **Cashier/Sales:** Access restricted to POS and CRM interfaces.

- **Accountant:** Access to financial reports and revenue/expense approvals.

- **Time Tracking & Performance (KPI):** Sales performance recording to calculate dynamic sales commissions (% commission).

### Module 4: Business Intelligence & Reporting (BI Dashboard)

- **Revenue & Profit Margin Reports:** Daily, weekly, monthly views with period-over-period growth comparisons.

- **Top-Selling Products:** Reports identifying items generating the highest revenue and gross profit.

- **Debt & Receivables/Payables:** Customer accounts receivable and Supplier accounts payable management.

---

## 3. Technical Deliverables

The system must adhere to modern production-ready technical standards:

### Architecture & Backend

- **Database Design:** Normalized relational schema (minimum 12–15 tables with explicit foreign keys: `Users`, `Roles`, `Products`, `Categories`, `Inventories`, `StockMovements`, `Orders`, `OrderItems`, `Customers`, `Transactions`, etc.).

- **RESTful API or GraphQL:** Complete CRUD APIs with JWT-based Authentication (Access/Refresh Tokens) and Role/Permission-based Authorization.

- **Transaction Safety:** Data integrity guarantees (ACID) during payment and stock deduction operations using Database Transactions to prevent race conditions.

### Frontend / UI-UX

- **Admin Dashboard:** Responsive administration UI supporting Data Pagination, Filtering, Search, and Export capabilities (Excel/PDF).

- **POS Interface:** Keyboard-optimized interface engineered for sub-second execution speeds per transaction.

### Advanced / Bonus Requirements

- **Payment Integration:** Integration with Payment Gateways (VNPAY sandbox / Momo test environment).

- **Realtime Features:** WebSocket integration for instant new order notifications and low-stock alerts on the Admin dashboard.

---

## 4. Suggested Implementation Roadmap (4 Sprints)

| Sprint       | Objective                 | Deliverables                                                                    |
| ------------ | ------------------------- | ------------------------------------------------------------------------------- |
| **Sprint 1** | Database & Authentication | DB Schema (ERD), Auth APIs (Login/Register/JWT), RBAC Authorization Middleware. |

|
| **Sprint 2** | Inventory & Product Management | Product CRUD APIs & UI, Warehouse Receipts/Dispatches, Automated Stock Level Calculations.

|
| **Sprint 3** | Sales (POS/OMS) & CRM | POS UI, Order Lifecycle Workflow, Transactional Stock Deduction, Loyalty Points System.

|
| **Sprint 4** | Dashboard, Reporting & Deployment | Revenue Charts (Chart.js/Recharts), Excel Exporting, Dockerization & Deployment.

|

---

## 5. Evaluation Criteria

1. **Business Logic Correctness:** Seamless execution of end-to-end workflows: `Goods Receipt` $\rightarrow$ `Sales Transaction` $\rightarrow$ `Stock Deduction` $\rightarrow$ `Revenue Recognition` $\rightarrow$ `Commission Calculation`.

2. **Security:** Unauthorized API calls must be blocked with appropriate HTTP status codes (`403 Forbidden`).

3. **Code Quality:** Clean architecture (Layered/Clean/MVC), comprehensive error handling, and appropriate Database Indexing for analytical query performance.
