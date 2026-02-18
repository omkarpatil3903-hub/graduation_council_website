import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const scriptUrl = env.GOOGLE_SCRIPT_WEB_APP_URL || env.VITE_CONTACT_API_URL || env.VITE_MEMBERSHIP_API_URL

  let server
  if (scriptUrl) {
    try {
      const parsed = new URL(scriptUrl)
      server = {
        proxy: {
          '/api/submit': {
            target: parsed.origin,
            changeOrigin: true,
            secure: true,
            rewrite: () => parsed.pathname,
          },
        },
      }
    } catch {
      server = undefined
    }
  }

  return {
    plugins: [react()],
    server,
  }
})
