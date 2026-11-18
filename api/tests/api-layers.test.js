const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Verify no controller imports prisma directly and no service accesses req/res.
const controllersDir = path.resolve(__dirname, '../src/controllers');
const servicesDir = path.resolve(__dirname, '../src/services');

for (const file of fs.readdirSync(controllersDir)) {
  const content = fs.readFileSync(path.join(controllersDir, file), 'utf8');
  assert.equal(content.includes('prisma'), false, `${file} must not access prisma directly`);
}

for (const file of fs.readdirSync(servicesDir)) {
  const content = fs.readFileSync(path.join(servicesDir, file), 'utf8');
  assert.equal(/\breq\b/.test(content), false, `${file} must not reference req`);
  assert.equal(/\bres\b/.test(content), false, `${file} must not reference res`);
}

console.log('Layering checks passed!');
