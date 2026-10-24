import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Token demo page: `npm run demo -w @shazlo/ui`.
// The Voyage files are not part of this package (licence unconfirmed, see README),
// so the demo serves them from the legacy site's public folder, where they are hosted today.
export default defineConfig({
  root: 'demo',
  publicDir: '../../../app/public',
  plugins: [react()],
})
