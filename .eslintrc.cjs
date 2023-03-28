module.exports = {
  root: true,
  extends: [
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'react-app',
    // 'react-app/jest',
    'airbnb',
  ],
  // parser: '@typescript-eslint/parser',
  plugins: [
    'prettier',
    // '@typescript-eslint',
  ],
  globals: {
    // 这里填入你的项目需要的全局变量
    // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
    //
    // React: false,
    // ReactDOM: false
  },
  settings: {
    'import/resolver': { node: { extensions: ['.mjs', '.js', '.json', '.ts', '.tsx'] } },
    // 'import/extensions': ['.js', '.mjs', '.jsx', '.ts', '.tsx'],
  },
  rules: {
    // 这里填入你的项目需要的个性化配置
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-unused-vars': 'warn',
    'no-shadow': 'off',
    'max-len': [
      'warn',
      {
        code: 120,
        ignoreComments: true,
        ignoreStrings: true,
      },
    ],
    yoda: ['error', 'always'],
    'no-undefined': 1,
    'no-debugger': 1,
    'arrow-body-style': ['off', 'as-needed'],
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: { consistent: true },
        ObjectPattern: { consistent: true },
        ImportDeclaration: { consistent: true },
        ExportDeclaration: { consistent: true },
      },
    ],
    'prefer-promise-reject-errors': 'warn',
    'implicit-arrow-linebreak': 'off',
    'operator-linebreak': 'off',
    indent: 'warn',

    'react/jsx-wrap-multilines': [
      'error',
      {
        declaration: 'parens',
        assignment: 'parens',
        return: 'parens',
        arrow: 'parens',
        condition: 'parens',
        logical: 'parens',
        prop: 'ignore',
      },
    ],
    'react/jsx-curly-newline': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.tsx', '.ts'] }],
    'react/require-default-props': 'off',
    'react/function-component-definition': 'off',

    'react/jsx-indent': ['warn', 2],
    // '@typescript-eslint/no-unused-vars': 'error',
    // '@typescript-eslint/no-shadow': 'error',
  },
};
