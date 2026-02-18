import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const contactUrl = env.GOOGLE_SCRIPT_CONTACT_URL || env.VITE_CONTACT_API_URL
  const membershipUrl = env.GOOGLE_SCRIPT_MEMBERSHIP_URL || env.VITE_MEMBERSHIP_API_URL
  const defaultUrl = env.GOOGLE_SCRIPT_WEB_APP_URL

  const localSubmitApi = {
    name: 'local-submit-api',
    configureServer(server) {
      server.middlewares.use('/api/submit', async (req, res, next) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ ok: false, error: 'Method not allowed' }))
          return
        }

        try {
          const body = await new Promise((resolve, reject) => {
            let raw = ''
            req.on('data', (chunk) => {
              raw += chunk
            })
            req.on('end', () => resolve(raw || '{}'))
            req.on('error', reject)
          })

          let payload = {}
          try {
            payload = body ? JSON.parse(body) : {}
          } catch {
            payload = {}
          }

          const formType = String(payload.formType || '').toLowerCase()
          const targetUrl =
            (formType === 'contact' ? contactUrl : membershipUrl) ||
            defaultUrl ||
            membershipUrl ||
            contactUrl

          if (!targetUrl) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: false, error: 'Google Script URL is not configured' }))
            return
          }

          const response = await fetch(targetUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body,
          })

          if (!response.ok) {
            const rawError = await response.text().catch(() => '')
            res.statusCode = 502
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: false, error: rawError || `Upstream request failed with status ${response.status}` }))
            return
          }

          const raw = await response.text()
          let parsed = null
          try {
            parsed = raw ? JSON.parse(raw) : null
          } catch {
            parsed = null
          }

          if (parsed && parsed.ok === false) {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: false, error: parsed.error || 'Google Script rejected the request' }))
            return
          }

          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ ok: true }))
        } catch (error) {
          res.statusCode = 502
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ ok: false, error: error?.message || 'Unable to submit form' }))
        }
      })
    },
  }

  return {
    plugins: [react(), localSubmitApi],
  }
})
