import { defineConfig } from 'vite-plus'

export default defineConfig({
  lint: {
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'prefer-const': 'error',
      'no-var': 'error',
    },
    ignorePatterns: ['node_modules/**', 'docs/.vitepress/dist/**', 'docs/.vitepress/cache/**'],
  },
  fmt: {
    semi: false,
    singleQuote: true,
    indentWidth: 2,
  },
  staged: {
    '*.{js,ts,vue,md}': 'vp check --fix',
  },
})
