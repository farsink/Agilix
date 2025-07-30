// .prettierrc.js

/** @type {import("prettier").Config} */
module.exports = {
  // Specifies the maximum line length that the printer will wrap on.
  // Code will be broken into multiple lines if it exceeds this length.
  printWidth: 150,

  // Specifies the number of spaces per indentation-level.
  tabWidth: 2,

  // Use single quotes instead of double quotes for strings.
  singleQuote: true,

  // Print semicolons at the ends of statements.
  semi: true,

  // Print trailing commas wherever possible in multi-line comma-separated syntactic structures.
  // "es5" - Trailing commas where valid in ES5 (objects, arrays, etc.). No trailing commas in type parameters in TypeScript.
  trailingComma: 'es5',

  // Include parentheses around a sole arrow function parameter.
  // "always" - Always include parens. Example: (x) => x
  // "avoid" - Omit parens when possible. Example: x => x
  arrowParens: 'always',
};
