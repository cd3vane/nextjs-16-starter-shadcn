import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import turboPlugin from 'eslint-plugin-turbo';
import * as tseslint from 'typescript-eslint';

export default [
    // Base ESLint recommended rules
    js.configs.recommended,

    // TypeScript ESLint recommended configs
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,

    // Main configuration
    {
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            react: reactPlugin,
            'react-hooks': reactHooksPlugin,
            'react-refresh': reactRefreshPlugin,
            import: importPlugin,
            'jsx-a11y': jsxA11yPlugin,
            '@next/next': nextPlugin,
            turbo: turboPlugin
        },

        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true
                },
                projectService: true
            },
            globals: {
                // React and JSX are handled by TypeScript, not needed as globals
                NodeJS: 'readonly',
                console: 'readonly',
                process: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                module: 'readonly',
                require: 'readonly',
                global: 'readonly',
                window: 'readonly',
                document: 'readonly',
                navigator: 'readonly',
                fetch: 'readonly'
            }
        },

        settings: {
            react: {
                version: 'detect'
            },
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                    project: [
                        './tsconfig.json',
                        './apps/*/tsconfig.json',
                        './packages/*/tsconfig.json',
                        './packages/@fpfx-technologies-llc/*/tsconfig.json'
                    ]
                },
                node: true
            },
            'import/parsers': {
                '@typescript-eslint/parser': ['.ts', '.tsx']
            }
        },

        rules: {
            // TypeScript specific rules
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_'
                }
            ],
            '@typescript-eslint/consistent-type-imports': [
                'error',
                {
                    prefer: 'type-imports',
                    fixStyle: 'separate-type-imports'
                }
            ],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/no-misused-promises': [
                'error',
                {
                    checksVoidReturn: false
                }
            ],
            '@typescript-eslint/await-thenable': 'error',
            '@typescript-eslint/no-unnecessary-type-assertion': 'error',
            '@typescript-eslint/prefer-nullish-coalescing': 'warn',
            '@typescript-eslint/prefer-optional-chain': 'warn',
            '@typescript-eslint/no-unnecessary-condition': 'warn',
            '@typescript-eslint/no-unnecessary-type-constraint': 'error',
            '@typescript-eslint/ban-ts-comment': [
                'error',
                {
                    'ts-expect-error': 'allow-with-description',
                    'ts-ignore': 'allow-with-description',
                    'ts-nocheck': 'allow-with-description',
                    'ts-check': false,
                    minimumDescriptionLength: 10
                }
            ],
            // Targeted type banning rules (preferred over `ban-types` in newer versions)
            '@typescript-eslint/no-restricted-types': [
                'error',
                {
                    types: {
                        FC: {
                            message: 'Use an explicit function component signature `(props: Props)`.'
                        },
                        'React.FC': {
                            message: 'Use an explicit function component signature `(props: Props)`.'
                        },
                        'JSX.Element': {
                            message: 'Use `React.ReactNode` instead of `JSX.Element`.',
                            fixWith: 'React.ReactNode'
                        },
                        'React.JSX.Element': {
                            message: 'Use `React.ReactNode` instead of `React.JSX.Element`.',
                            fixWith: 'React.ReactNode'
                        },
                        ReactElement: {
                            message: 'Prefer `React.ReactNode` or an explicit JSX element type when appropriate.'
                        },
                        ReactNode: {
                            message: 'Use the global `React.ReactNode` type rather than importing `ReactNode`.',
                            fixWith: 'React.ReactNode'
                        }
                    }
                }
            ],

            // Switched off until `any` types are fixed across the codebase
            '@typescript-eslint/no-unsafe-assignment': 'off',

            '@typescript-eslint/no-empty-object-type': 'error',
            '@typescript-eslint/no-unsafe-argument': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-function-type': 'error',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-return': 'off',
            '@typescript-eslint/no-wrapper-object-types': 'error',

            'no-restricted-imports': [
                'error',
                {
                    paths: [
                        {
                            name: 'react',
                            importNames: ['FC'],
                            message: 'Use an explicit function component signature like `(props: Props)`.'
                        },
                        {
                            name: 'react',
                            importNames: ['ReactNode'],
                            message: 'Use global `React.ReactNode` type instead.'
                        }
                    ]
                }
            ],

            // Import organization rules
            'import/order': [
                'warn',
                {
                    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
                    'newlines-between': 'always',
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true
                    },
                    pathGroups: [
                        {
                            pattern: '@fpfx-technologies-llc/**',
                            group: 'internal',
                            position: 'before'
                        },
                        {
                            pattern: '@/**',
                            group: 'internal',
                            position: 'after'
                        }
                    ],
                    pathGroupsExcludedImportTypes: ['builtin']
                }
            ],
            'import/no-duplicates': 'error',
            'import/first': 'error',
            'import/newline-after-import': 'warn',
            'import/no-anonymous-default-export': [
                'warn',
                {
                    allowArray: false,
                    allowArrowFunction: false,
                    allowAnonymousClass: false,
                    allowAnonymousFunction: false,
                    allowCallExpression: true,
                    allowNew: false,
                    allowLiteral: false,
                    allowObject: true
                }
            ],
            // TypeScript handles these checks better
            'import/no-unresolved': 'off',
            'import/named': 'off',
            'import/namespace': 'off',
            'import/default': 'off',
            'import/no-named-as-default': 'off',
            'import/no-named-as-default-member': 'off',

            // React specific rules
            'react/prop-types': 'off', // Using TypeScript for prop validation
            'react/react-in-jsx-scope': 'off', // Not needed with React 17+ JSX transform
            'react/jsx-uses-react': 'off', // Not needed with React 17+ JSX transform
            'react/jsx-key': ['error', { checkFragmentShorthand: true }],
            'react/jsx-no-target-blank': ['error', { enforceDynamicLinks: 'always' }],
            'react/no-unescaped-entities': 'warn',
            'react/no-unknown-property': 'error',
            'react/self-closing-comp': 'warn',
            'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
            'react/jsx-boolean-value': ['warn', 'never'],
            'react/jsx-fragments': ['warn', 'syntax'],
            'react/no-array-index-key': 'warn',

            // React Hooks rules
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            // React Refresh rules (for Vite/dev)
            'react-refresh/only-export-components': [
                'warn',
                {
                    allowConstantExport: true
                }
            ],

            // JSX Accessibility rules
            'jsx-a11y/alt-text': 'warn',
            'jsx-a11y/anchor-has-content': 'warn',
            'jsx-a11y/anchor-is-valid': 'warn',
            'jsx-a11y/aria-props': 'warn',
            'jsx-a11y/aria-proptypes': 'warn',
            'jsx-a11y/aria-unsupported-elements': 'warn',
            'jsx-a11y/click-events-have-key-events': 'warn',
            'jsx-a11y/heading-has-content': 'warn',
            'jsx-a11y/html-has-lang': 'warn',
            'jsx-a11y/img-redundant-alt': 'warn',
            'jsx-a11y/no-access-key': 'warn',
            'jsx-a11y/no-autofocus': 'warn',
            'jsx-a11y/role-has-required-aria-props': 'warn',
            'jsx-a11y/role-supports-aria-props': 'warn',

            // Next.js specific rules
            '@next/next/no-html-link-for-pages': 'off', // Handled by Next.js
            '@next/next/no-img-element': 'warn',
            '@next/next/no-sync-scripts': 'error',

            // Turbo rules
            'turbo/no-undeclared-env-vars': 'warn',

            // General code quality rules
            'no-console': 'warn',
            'no-debugger': 'error',
            'prefer-const': 'error',
            'no-var': 'error',
            'object-shorthand': 'warn',
            'prefer-arrow-callback': 'warn',
            'prefer-template': 'warn',
            'no-nested-ternary': 'warn',
            'no-unneeded-ternary': 'warn'
        }
    },

    // Prettier config (must be last to override formatting rules)
    prettierConfig,

    // Linter options
    {
        linterOptions: {
            reportUnusedDisableDirectives: 'warn'
        }
    }
];
