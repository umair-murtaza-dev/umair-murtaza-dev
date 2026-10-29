# Multi-tenant SaaS — authorization and data isolation

**Type:** independent demonstration with synthetic records. **Status:** runnable authorization example; not a production security audit.

## Risk

A multi-tenant API can inadvertently return records from another workspace when it trusts a tenant ID supplied in a request or queries by record ID alone.

## Secure design principles

- Treat the authenticated identity and permitted workspace membership as the source of truth.
- Authorize workspace selection before querying records.
- Scope every read/update/delete to authorized workspace IDs.
- Test both positive cases and cross-tenant denial.
- Apply the same checks in background jobs, exports, files, caching and admin flows.
- Use database-level controls where appropriate as *defense in depth*, not a replacement for application authorization.

## Runnable example

[tenant-isolation.test.mjs](tenant-isolation.test.mjs) uses built-in Node.js assertions and test runner, with no dependencies or network access. Run:

```bash
node --test tenant-isolation.test.mjs
```

This intentionally small sample exercises allowed access, denied cross-tenant access and untrusted workspace requests. It is *not* an entire web application, nor proof of production-grade isolation.

## Important production considerations

A real SaaS needs authenticated identities, membership changes, audit trails, authorization checks at every entry point, safe cache keys, robust object storage access, and possibly PostgreSQL row-level security. Test races, soft-deleted tenants, system accounts and data migrations.

## Evidence to add

- API integration tests with actual authentication/session middleware
- Tests for background jobs, reports and exports
- Query plans / database security controls
- CI results and a threat model
