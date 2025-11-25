import config from '@lvce-editor/eslint-config'
import actions from '@lvce-editor/eslint-plugin-github-actions'

export default [
  ...config,
  ...actions,
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
]
