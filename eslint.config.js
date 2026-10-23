import js from '@eslint/js'
import tseslint from 'typescript-eslint'

// Shared by every app and package. Legacy app/ and backend/ are not linted here.
export default tseslint.config(
  { ignores: ['**/dist/**', '**/coverage/**', '**/node_modules/**', 'app/**', 'backend/**', 'services/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
)
