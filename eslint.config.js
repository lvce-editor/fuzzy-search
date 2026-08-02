import { defineConfig } from 'eslint/config'
import config, { recommendedActions } from '@lvce-editor/eslint-config'

export default defineConfig([
  ...config,
  ...recommendedActions,
  {
    rules: {
      'github-actions/ci-versions': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
    },
  },
  {
    ignores: ['src/index.d.ts'],
  },
])
