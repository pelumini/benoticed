module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'no-use-before-define': 'off',
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: '(useApi)',
      },
    ],
    'func-names': 'off',
    '@typescript-eslint/no-unused-vars': [
      'off',
      { args: 'all', argsIgnorePattern: '^_' },
    ],
    'react/jsx-no-useless-fragment': 'off',
    '@typescript-eslint/ban-types': [
      'warn',
      {
        types: {
          // add a custom message to help explain why not to use it
          Foo: "Don't use Foo because it is unsafe",

          // add a custom message, AND tell the plugin how to fix it
          String: {
            message: 'Use string instead',
            fixWith: 'string',
          },

          '{}': {
            message: 'Use object instead',
            fixWith: 'object',
          },
        },
      },
    ],
    'no-underscore-dangle': 'off',
    'no-shadow': 'off',
    'no-alert': 'off',
    'no-unused-expressions': 'off',
    'no-restricted-exports': 'off',
    'no-nested-ternary': 'off',
    'no-unused-vars': 'warn',
    'object-curly-newline': 'off',
    'consistent-return': 'off',
    'react/jsx-no-bind': 'off',
    'react/jsx-no-constructed-context-values': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'prefer-template': 'error',
    'jsx-a11y/anchor-is-valid': [
      'warn',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight', 'to'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    radix: 'error',
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'jsx-a11y/label-has-for': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'jsx-a11y/alt-text': 'warn',
    'react/react-in-jsx-scope': 'off',
    'space-before-blocks': 'error',
    'react/state-in-constructor': 0,
    'react/button-has-type': 0,
    'react/jsx-filename-extension': [0],
    'import/extensions': 'off',
    'import/no-named-as-default': 0,
    'import/no-duplicates': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'warn',
      {
        devDependencies: [
          'jest.setup.ts',
          '**/*.test.tsx',
          '**/*.spec.tsx',
          '**/*.snapshot.tsx',
          '**/*.test.ts',
          '**/*.spec.ts',
          '**/*.snapshot.ts',
        ],
      },
    ],
    'react/destructuring-assignment': 0,
    'react/prop-types': 0,
    'no-param-reassign': 0,
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': [0],
    'react/jsx-indent': [0],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'max-len': [
      'off',
      {
        code: 80,
      },
    ],

    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'object', 'index'],
        ],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'never',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'react/function-component-definition': [0],
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      // use <root>/tsconfig.json
      typescript: {
        project: '.',
      },
    },
  },
};
