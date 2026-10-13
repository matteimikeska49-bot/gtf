import { Linter } from 'eslint';
import { stripCodeForTemplateGuardrails } from '../blog-template-guardrails.mjs';

// A table delimiter or an inline dash sequence is not a standalone separator.
export const hasStandaloneDashSeparator = (body) =>
  /^ {0,3}(?:-[\t ]*){3,}$/m.test(stripCodeForTemplateGuardrails(body));

const misleadingClaims = ['гарантирует', 'идеально', 'без ошибок', 'автоматически создаёт бесшовную карусель', 'seamless guaranteed'];
export function findPositiveMisleadingClaims(body) {
  const text = body.toLowerCase();
  return misleadingClaims.filter((claim) => [...text.matchAll(new RegExp(claim, 'g'))].some((match) => {
    const prefix = text.slice(Math.max(0, match.index - 70), match.index);
    // Only adjacent explicit negation: a disclaimer never excuses a later claim.
    if (/(?:^|[^\p{L}])не\s+(?:(?:является\s+)?обещание(?:м)?\s+)?$/u.test(prefix)) return false;
    if (claim === 'идеально' && /^\s+подходит(?:[^\p{L}]|$)/u.test(text.slice(match.index + claim.length))) return false;
    return true;
  }));
}

// Keep visible JSX text, attributes, i18n values and return values in scope.
// A comparison operand is a control discriminator, not rendered output copy.
export function maskInternalComparisonLiterals(source) {
  const ranges = [];
  const lint = new Linter();
  const messages = lint.verify(source, [{
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module', parserOptions: { ecmaFeatures: { jsx: true } } },
    plugins: { copy: { rules: { inspect: { create() { return { Literal(node) {
      if (typeof node.value === 'string' && node.parent?.type === 'BinaryExpression'
        && ['===', '!==', '==', '!='].includes(node.parent.operator)) ranges.push(node.range);
    } }; } } } } },
    rules: { 'copy/inspect': 'error' },
  }]);
  if (messages.some((message) => message.fatal)) throw new Error('Product copy parse failed; positioning check cannot skip invalid source.');
  let text = source;
  for (const [start, end] of ranges.sort((a, b) => b[0] - a[0])) {
    text = text.slice(0, start) + text.slice(start, end).replace(/[^\n\r]/g, ' ') + text.slice(end);
  }
  return text;
}

// ESLint core does not count JSX identifiers as variable references. Mark only
// actual component/root references; do not ignore arbitrary unused bindings.
export const jsxUsagePlugin = { rules: { 'used-vars': {
  create(context) { return { JSXOpeningElement(node) {
    let name = node.name;
    const member = name.type === 'JSXMemberExpression';
    while (name.type === 'JSXMemberExpression') name = name.object;
    if (name.type === 'JSXIdentifier' && (member || /^[A-Z]/.test(name.name))) {
      context.sourceCode.markVariableAsUsed(name.name, node);
    }
  } }; },
} } };
