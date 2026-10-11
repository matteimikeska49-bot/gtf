import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { Linter } from 'eslint';
import { hasStandaloneDashSeparator, findPositiveMisleadingClaims, maskInternalComparisonLiterals, jsxUsagePlugin } from '../lib/release-check-precision.mjs';

test('valid Markdown tables are accepted, actual standalone separators still block', () => {
  for (const text of ['| Tool | Input |\n|---|---|\n| A | PDF |', 'A---B', '-\n-\n-', '```\n---\n```']) assert.equal(hasStandaloneDashSeparator(text), false);
  for (const text of ['Before\n---\nAfter', 'Before\n  - - -\nAfter', 'Before\n------\nAfter']) assert.equal(hasStandaloneDashSeparator(text), true);
  const vk = fs.readFileSync(new URL('../../src/content/blog/articles/kontent-plan-dlya-vk.md', import.meta.url), 'utf8');
  assert.equal(hasStandaloneDashSeparator(vk.split(/\n---\s*\n/).slice(1).join('\n')), false);
});

test('explicit negation is not a claim; positive or mixed assertions remain blocking', () => {
  const body = 'Это не обещание идеального извлечения или гарантированной точности обработки: результат сверяют с документом.';
  assert.deepEqual(findPositiveMisleadingClaims(body), []);
  assert.deepEqual(findPositiveMisleadingClaims('GoToFlow не гарантирует результат.'), []);
  assert.deepEqual(findPositiveMisleadingClaims('Идеально подходит для этой темы.'), []);
  for (const text of ['GoToFlow гарантирует результат.', 'PDF извлекается идеально.', 'Экспорт без ошибок.', 'Это не обещание. GoToFlow гарантирует результат.', `${body}\nPDF извлекается идеально.`, 'Идеально подходит для темы. PDF извлекается идеально.']) assert.ok(findPositiveMisleadingClaims(text).length, text);
});

test('internal predicate is excluded but all actual output copy remains inspected', () => {
  const code = `const Page = () => <div>{visualData.variant !== 'text-draft' && <span>Редактор</span>}</div>;`;
  assert.doesNotMatch(maskInternalComparisonLiterals(code), /text-draft/);
  for (const code of [`const Page = () => <div>draft carousel</div>;`, `const Page = () => <div title="draft carousel"/>;`, `const en = {label: 'draft carousel'};`, `const Page = () => <div>{ready ? 'draft carousel' : 'Export'}</div>;`]) assert.match(maskInternalComparisonLiterals(code), /draft carousel/);
  assert.throws(() => maskInternalComparisonLiterals('const broken = <div>'), /parse failed/);
});

test('JSX-use fixes are references, not a no-unused-vars exemption', () => {
  const lint = new Linter();
  const config = [{ languageOptions: { ecmaVersion: 'latest', sourceType: 'module', parserOptions: { ecmaFeatures: { jsx: true } } }, plugins: { jsx: jsxUsagePlugin }, rules: { 'no-unused-vars': 'error', 'jsx/used-vars': 'error' } }];
  const source = `const motion = {}; const Card = ({ Icon }) => <motion.div><Icon/></motion.div>; export default Card;`;
  assert.deepEqual(lint.verify(source, config), []);
  for (const source of [`const motion = {}; export default () => <div/>;`, `const div = {}; export default () => <div/>;`, `export default ({ unused }) => <div/>;`]) assert.ok(lint.verify(source, config).some(x => x.ruleId === 'no-unused-vars'));
});
