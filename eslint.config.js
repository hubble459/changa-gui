import js from '@eslint/js';
import { includeIgnoreFile } from '@eslint/compat';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default ts.config(
    includeIgnoreFile(gitignorePath),
    js.configs.recommended,
    ...ts.configs.strict,
    ...svelte.configs['flat/recommended'],
    {
        plugins: { '@stylistic': stylistic },
        ...stylistic.configs['recommended-flat'],
    },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },
    {
        files: ['**/*.svelte'],

        languageOptions: {
            parserOptions: {
                parser: ts.parser,
            },
        },

        rules: {
            'svelte/indent': ['error', {
                indent: 4,
            }],
            'svelte/block-lang': ['error', {
                enforceScriptPresent: true,
                script: ['ts'],
            }],
        },
    },
    // Style rules
    {
        rules: {
            '@stylistic/array-bracket-spacing': ['error', 'never'],
            '@stylistic/arrow-parens': ['error', 'always'],
            '@stylistic/arrow-spacing': 'error',
            '@stylistic/block-spacing': 'error',
            '@stylistic/eol-last': ['error', 'always'],
            '@stylistic/indent': ['error', 4],
            '@stylistic/quote-props': ['error', 'consistent-as-needed'],
            '@stylistic/quotes': ['error', 'single'],
            '@stylistic/semi': ['error', 'always'],
            '@stylistic/space-before-function-paren': ['error', {
                named: 'never',
                anonymous: 'always',
                asyncArrow: 'always',
            }],
            '@stylistic/brace-style': ['error', '1tbs'],
        },
    },
    {
        files: ['**/*.svelte', '**/*.ts', '**/*.js'],

        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-vars': ['error', {
                args: 'all',
                argsIgnorePattern: '^_',
                caughtErrors: 'all',
                caughtErrorsIgnorePattern: '^_',
                destructuredArrayIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                ignoreRestSiblings: true,
            }],
        },
    },
);
