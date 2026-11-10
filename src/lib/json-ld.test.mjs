import test from 'node:test';
import assert from 'node:assert/strict';
import { parseJsonLd, safeJsonLd } from './json-ld.ts';

test('bad editor JSON falls back instead of failing the build', () => {
  assert.equal(parseJsonLd('{"@type": "Article",}'), undefined);
  assert.equal(parseJsonLd(''), undefined);
  assert.deepEqual(parseJsonLd('{"@type":"Article"}'), { '@type': 'Article' });
});

test('a package name containing </script> cannot close the tag', () => {
  const payload = '</script><script>alert(document.domain)</script>';
  const out = safeJsonLd({ name: payload });

  assert.ok(!out.includes('<'), 'raw < leaked into the script body');
  assert.ok(!out.includes('</script'), 'payload closes the script tag');
  assert.deepEqual(JSON.parse(out), { name: payload }, 'escaping broke the JSON');
});

test('normal content is unchanged after parsing', () => {
  const data = { name: 'Himalayan Escape', price: '₹12,000', days: 3 };
  assert.deepEqual(JSON.parse(safeJsonLd(data)), data);
});
