# Detailed Business Specifications (Administrator's View)

This section details the domain logic, entities, lifecycle states, and strict business rules required to prevent fraud, eliminate inventory loss, and guarantee operational clarity.

---

## MODULE 1: INVENTORY & SUPPLY CHAIN MANAGEMENT

### 1. Domain Data Entities

- **Master Product Data:**
- _Identifiers:_ Internal SKU, Barcode/EAN-13, Serial/IMEI Numbers (for electronics warranty tracking).

- _Categorization:_ Category (Smartphones, Accessories...), Brand, Default Supplier.

- _Attributes:_ Color, storage capacity, weight, dimensions.

- _Pricing Structure:_ Last Cost Price, Moving Average Cost, Listed Retail Price, Wholesale Price, Floor Price (minimum allowed discount threshold).

- **Supplier Data (Vendor):**
- Company Name, Tax ID, Sourcing Type (OEM/Authorized Distributor), Reliability Score.

- Contact Person details, Credit Line limit, Payment Terms (e.g., Net 30).

- **Stock Card & Ledger:**
- Physical Stock, Available Stock (Physical minus reserved/unfulfilled order quantities), Safety Stock level, Maximum Stock level.

### 2. Business Rules & Constraints

- **Strict Non-Negative Inventory Rule:** The system must reject any dispatch or POS sale if Available Stock equals 0. Physical stock present without system record requires a formal "Stock Adjustment Audit" before fulfillment.

- **Serial/IMEI Enforcement:** For high-value electronics, sales dispatches require selecting **exact Serial/IMEI items** leaving the warehouse to eliminate counterfeit/used unit substitution during returns.

- **Stocktake Locking:** Opening a stock audit locks all Stock In/Out/Sales operations for that specific product group/branch until audit approval, preventing count mismatches.

- **Discrepancy Attribution:** Unexplained negative stock counts require selecting a loss category (Damaged/Stolen) and assigning financial liability (Employee compensation deduction or Corporate write-off).

---

## MODULE 2: SALES (POS), CRM & ORDER MANAGEMENT (OMS)

### 1. Domain Data Entities

- **Customer Profile (CRM):**
- Demographics (Name, Phone number as Unique ID, Email, Address).

- Loyalty Metrics: Tier (Bronze, Silver, Gold, Diamond), Active Points Balance, Lifetime Value (LTV).

- Activity Logs: Historical orders, warranty requests, interaction notes.

- **Order Entity:**
- Order ID, Channel Source (POS/Web/Marketplace), Salesperson ID, Cashier ID.

- Line items, Listed price, Applied discounts/vouchers, Final Payable Amount.

- Payment Status (Unpaid / Partially Paid / Paid / Refunded), Fulfillment Status.

### 2. Business Rules & Constraints

- **Discount Approval Hierarchy:**
- Sales staff can apply direct discounts up to **X%**.

- Discounts between **(X+1)% and Y%** require Supervisor OTP/Override Authorization.

- No discount can drive the net unit price below the defined Product **Floor Price**.

- **Strict Order State Machine:**
  Transitions follow a strict single-direction flow:

$$\text{Created} \longrightarrow \text{Confirmed (Reserve Stock)} \longrightarrow \text{Packing} \longrightarrow \text{Dispatched} \longrightarrow \text{Shipping} \longrightarrow \text{Completed}$$

_Constraint:_ Orders at or past the "Dispatched" stage cannot be cancelled directly; they must undergo a formal "Return/RMA Workflow".

- **Loyalty Reward Granting:** Loyalty points are awarded only when an order transitions to **"Completed"** status and passes the eligible return window ($N$ days).

---

## MODULE 3: HUMAN RESOURCES (HRM), COMMISSIONS & RBAC

### 1. Domain Data Entities

- **Employee Profile:**
- Personal details, Employment Contract, Base Salary, Assigned Branch/Department, Job Title/Level.

- **RBAC Configuration:**
- _Roles:_ Executive, Store Manager, Sales Associate, Warehouse Manager, Accountant.

- _Permissions:_ Fine-grained CRUD & Approval flags (Read, Create, Update, Delete, Approve) on specific system endpoints.

- **Commission Matrix:**
- Calculation formulas based on % Revenue or fixed amount per unit sold.

### 2. Business Rules & Constraints

- **Branch Data Isolation:** Store staff can access only their assigned store's orders and stock levels. Regional managers or Executives hold cross-branch visibility privileges.

- **Commission Fraud Prevention:**
- Sales commission is calculated strictly on **Net Realized Revenue** (after discounts, vouchers, and product returns).

- Product returns within 14 days trigger an automatic **Commission Clawback** on the employee's subsequent payroll cycle.

- **Cost Price Confidentiality:** Cost of Goods Sold (COGS) and net margin figures are restricted from Sales and Warehouse roles, accessible only by Accounting and Management roles.

---

## MODULE 4: FINANCE, REPORTING & RECONCILIATION

### 1. Domain Data Entities

- **Cash Journals & Bank Accounts:** Cash register balances and bank/e-wallet ledger accounts.

- **Receipt & Disbursement Vouchers:**
- Voucher ID, Type (Sales Collection, Utility Expense, Procurement Payment, Payroll), Amount, Entity (Customer/Supplier/Employee), Attachments.

- **Gross Profit Calculations:**

$$\text{Gross Profit} = \text{Net Revenue} - \text{Cost of Goods Sold (COGS)}$$

### 2. Business Rules & Constraints

- **Financial Immutability Rule:** Approved/Cleared Payment Vouchers **cannot be edited or deleted**. Corrections require reversing entries or adjustment vouchers to preserve a clear Audit Trail.

- **Period Closing:** Monthly accounting closes freeze all transaction, stock movement, and sales records for that period. No adjustments are permitted post-close.

- **End-of-Day Register Reconciliation:** Cashiers must execute shift-end reconciliation:

$$\text{Actual Cash Counted} = \text{Starting Float} + \text{Cash Receipts} - \text{Cash Disbursements}$$

Discrepancies require mandatory written explanations before shifting roles.

---

## CROSS-FUNCTIONAL DATA FLOW

1. **Procurement Receipt:** Warehouse Manager creates _Goods Receipt_ $\rightarrow$ Inventory increases $\rightarrow$ _Accounts Payable_ voucher logged.

2. **POS Checkout:** Barcode scanned $\rightarrow$ System verifies _Available Stock > 0_ $\rightarrow$ Applies _CRM_ tier discount $\rightarrow$ Payment processed & Receipt printed.

3. **Automated Event Processing Engine:**

- Available Inventory decreases by 1 unit.

- Cash/Bank Ledger entry generated.

- Loyalty points credited to customer.

- Sales commission calculated.

- Realtime Dashboard revenue metrics updated.
