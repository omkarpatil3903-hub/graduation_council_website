export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const targetUrl = process.env.GOOGLE_SCRIPT_WEB_APP_URL || process.env.VITE_MEMBERSHIP_API_URL
  if (!targetUrl) {
    return res.status(500).json({ ok: false, error: 'Google Script URL is not configured' })
  }

  try {
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(req.body || {}),
    })

    if (!response.ok) {
      return res.status(502).json({ ok: false, error: 'Upstream request failed' })
    }

    return res.status(200).json({ ok: true })
  } catch {
    return res.status(502).json({ ok: false, error: 'Unable to submit form' })
  }
}