# Express.js API Behavioral Guidelines

Behavioral guidelines to reduce common LLM coding mistakes when working on this Express.js backend.

**Tradeoff:** These guidelines bias toward caution, simplicity, and maintainable backend architecture over speed.

---

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:

* State your assumptions explicitly if they affect the implementation.
* If multiple interpretations exist, present them instead of silently choosing one.
* If a simpler approach exists, prefer it.
* If something is unclear and would materially affect the implementation, stop and ask.
* Understand the existing project structure before creating new files or patterns.

---

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

* No features beyond what was asked.
* No abstractions for single-use code.
* No unnecessary design patterns.
* No unnecessary repositories, factories, interfaces, or dependency injection.
* Don't introduce Clean Architecture, DDD, or other complex patterns unless the project already uses them or they are explicitly requested.
* Prefer simple functions and existing project conventions.
* If 200 lines can reasonably become 50, simplify it.

Ask:

> "Would a senior Express.js engineer consider this unnecessarily complicated?"

If yes, simplify.

Use Skill Ponytail.

---

## 3. Express.js Layering

Use a simple layered architecture:

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Model / Database
```

### Controller

**Controller is responsible only for HTTP concerns.**

Controllers may:

* Read `req.params`
* Read `req.query`
* Read `req.body`
* Read `req.user`
* Call a service
* Return HTTP responses
* Pass errors to `next(error)`

Controllers must NOT contain business logic.

Avoid putting the following in controllers:

* Business rules
* Complex conditionals
* Calculations
* Database operations
* Multi-step workflows
* Authorization/business decisions
* Payment logic
* Order processing
* Event state transitions
* Password/business authentication logic
* External API orchestration

The controller should be thin.

---

## 4. Service Layer

**All business logic must live in the Service layer.**

Create or use a `*.service.js` file for each feature/module when appropriate.

Services are responsible for:

* Business rules
* Use-case logic
* Calculations
* Business validation
* Authorization decisions related to business rules
* Multi-step operations
* Database orchestration
* Transactions
* External service orchestration
* Payment workflows
* Authentication workflows
* Password operations
* Event/order/user workflows

### Service Rules

Services:

* MUST NOT use `req`.
* MUST NOT use `res`.
* MUST NOT send HTTP responses.
* MUST NOT depend on Express request/response objects.
* SHOULD receive plain values or objects as arguments.
* SHOULD return data or throw errors.

---

## 5. Model / Database Layer

Models handle data persistence according to the existing project's ORM/database approach.

Do not move business rules into models unless the existing project already follows that pattern.

The general responsibility is:

```text
Controller
→ HTTP

Service
→ Business logic

Model
→ Data persistence
```

---

## 6. Controller → Service Rule

Whenever implementing a new endpoint:

**Do not implement the business logic directly inside the controller.**

Always follow:

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Model / Database
```

---

## 7. Validation vs Business Logic

Keep HTTP/input validation separate from business logic.

* Validation (required fields, string/email/password/number/enum formats, request schema) can be handled by validation middleware or the project's existing validation mechanism.
* Business rules belong in services. Do not put business rules into request validation middleware.

---

## 8. Error Handling

Preserve the existing error-handling strategy (`next(error)`).

Services should throw errors instead of returning HTTP responses. The Controller is responsible for HTTP status codes and responses.

---

## 9. External Services

External API integrations (payment gateway, email/SMS provider, Firebase, cloud storage, third-party APIs) belong in the Service layer, never directly inside controllers.

---

## 10. Surgical Changes

**Touch only what you must.**

* Don't refactor unrelated code.
* Don't change existing formatting unnecessarily.
* Don't rename unrelated variables.
* Don't change API contracts unless requested.
* Don't change business behavior.
* Match the existing project style.
* Remove only imports/variables/functions made unused by your changes.
* Don't clean up unrelated technical debt.

---

## 11. Refactoring Existing Controllers

Move business logic from Controller → Service while preserving existing behavior. Do not rewrite working models, routes, API responses, or database schema unless requested.

---

## 12. Goal-Driven Execution & Task Workflow

**Always define workflow, tasks, and track implementation checklist before coding.**

1. Outline Workflow
2. Break Down Tasks & Checklist (`- [ ]` → `- [x]`)
3. Implement Business Logic in Service (Keep Controller Thin)
4. Verify Implementation (Test / Lint / Build)
5. Update `dev_documentation.md` (and `README.md` if relevant)

---

## 13. Final Checklist & Documentation

Before finishing backend work, verify:

* [ ] Workflow and task checklist were defined and marked complete.
* [ ] Controller only handles HTTP concerns.
* [ ] Business logic is inside Service.
* [ ] Service does not use `req` or `res`.
* [ ] Service does not return HTTP responses.
* [ ] Database operations are not unnecessarily duplicated.
* [ ] Existing API contract is preserved.
* [ ] Existing error handling is preserved.
* [ ] No unnecessary abstraction was introduced.
* [ ] No unrelated files were changed.
* [ ] Tests/lint/build pass when available.
* [ ] Updated `dev_documentation.md` (and `README.md` if relevant).

Every new feature, API endpoint, behavior change, or significant refactoring must update `api/dev_documentation.md` (and `api/README.md` when relevant).

**Core rule:**

> In this Express.js backend, Controllers handle HTTP. Services handle business logic. Always define workflow & task checklist first.
