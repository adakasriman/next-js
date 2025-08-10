// prettierrc.mjs

/** @type {import("prettier").Config} */
const config = {
    semi: true, // Use semicolons at the end of statements
    singleQuote: true, // Use single quotes instead of double quotes
    printWidth: 120, // Wrap lines after 100 characters
    trailingComma: "all", // Add trailing commas wherever possible
    tabWidth: 2, // Use 2 spaces per tab
    useTabs: false, // Use spaces instead of tabs
    arrowParens: "always", // Always include parentheses in arrow functions
    bracketSpacing: true, // Add spaces inside object brackets
    endOfLine: "lf", // Use LF (line feed) for new lines
    jsxSingleQuote: false, // Use double quotes in JSX attributes
    jsxBracketSameLine: false, // Place closing `>` of JSX elements on a new line
    proseWrap: "preserve", // Keep markdown formatting as-is
    quoteProps: "consistent", // Only quote object properties when necessary
  };
  
  export default config;
  