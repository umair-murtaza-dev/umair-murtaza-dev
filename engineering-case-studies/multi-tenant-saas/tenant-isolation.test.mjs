import test from 'node:test';
import assert from 'node:assert/strict';

// Synthetic data; users have server-side, trusted workspace membership.
const memberships = new Map([
  ['alice', new Set(['tenant-a'])],
  ['bob', new Set(['tenant-b'])],
]);
const invoices = [
  { id: 'inv-1', tenantId: 'tenant-a', total: 125 },
  { id: 'inv-2', tenantId: 'tenant-b', total: 250 },
];

function getInvoice(userId, workspaceId, invoiceId) {
  const allowed = memberships.get(userId);
  if (!allowed?.has(workspaceId)) {
    return { status: 403 };
  }
  // Scope the object query by the authorized tenant, not just the record id.
  const record = invoices.find(i => i.id === invoiceId && i.tenantId === workspaceId);
  return record ? { status: 200, data: record } : { status: 404 };
}

test('user can access an invoice in their own workspace', () => {
  assert.equal(getInvoice('alice', 'tenant-a', 'inv-1').status, 200);
});
test('user cannot select a workspace they do not belong to', () => {
  assert.equal(getInvoice('alice', 'tenant-b', 'inv-2').status, 403);
});
test('record lookup is scoped to the active workspace', () => {
  assert.equal(getInvoice('alice', 'tenant-a', 'inv-2').status, 404);
});
test('unknown user has no permissions', () => {
  assert.equal(getInvoice('eve', 'tenant-a', 'inv-1').status, 403);
});
