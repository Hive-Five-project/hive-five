module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:json/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'postcss.config.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['react-refresh'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // Basics
    'no-unused-vars': 'off',

    // Forbids console.log (prevent accidental commits)
    'no-console': ['error', { 'allow': ['debug', 'info', 'warn', 'error'] }],

    // React Refresh
    'react-refresh/only-export-components': 'off',

    // React
    // https://eslint.org/docs/latest/rules/jsx-quotes
    'jsx-quotes': ['error', 'prefer-double'],
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md
    'react/jsx-curly-spacing': ['error', {
      when: 'never',
      children: true
    }],

    // TypeScript
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/comma-dangle': ['error', {
      // https://eslint.org/docs/latest/rules/comma-dangle#options
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'always-multiline',
      // https://typescript-eslint.io/rules/comma-dangle/
      enums: 'always-multiline',
      generics: 'always-multiline',
      tuples: 'always-multiline'
    }],

    '@typescript-eslint/member-delimiter-style': ['error', {
      // https://typescript-eslint.io/rules/member-delimiter-style/
      multiline: {
        delimiter: 'none',
        requireLast: false
      },
      singleline: {
        delimiter: 'comma',
        requireLast: false
      },
      multilineDetection: 'brackets'
    }],

    "@typescript-eslint/no-unused-vars": [
      "error"
    ],

    "indent": ["warn", 2]
  },
}
