import { test } from 'bun:test';
import assert from 'node:assert/strict';
import { main } from '../../src/index.js';
import { resolve } from '../../src/util/path.js';
import baseArguments from '../helpers/baseArguments.js';
import baseCounters from '../helpers/baseCounters.js';

const cwd = resolve('fixtures/plugins/next');

test('Find dependencies with the Next.js plugin', async () => {
  const { issues, counters } = await main({
    ...baseArguments,
    cwd,
  });

  assert(issues.unlisted['next.config.js']['next-transpile-modules']);
  assert(issues.unlisted['pages/[[...route]].tsx']['react']);
  assert(issues.unlisted['pages/[[...route]].tsx']['react-helmet']);
  assert(issues.unlisted['pages/page.tsx']['react']);
  assert(issues.unlisted['app/layout.tsx']['react']);
  assert(issues.unlisted['app/home/page.tsx']['react']);

  assert.deepEqual(counters, {
    ...baseCounters,
    files: 1,
    devDependencies: 0,
    unlisted: 6,
    processed: 10,
    total: 10,
  });
});
