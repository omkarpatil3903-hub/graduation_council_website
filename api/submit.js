export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const payload = req.body || {}
  const requestedFormType = String(payload.formType || '').toLowerCase()
  const formType = ['membership', 'grievance'].includes(requestedFormType)
    ? requestedFormType
    : 'membership'

  const membershipUrl = process.env.GOOGLE_SCRIPT_MEMBERSHIP_URL || process.env.VITE_MEMBERSHIP_API_URL
  const grievanceUrl = process.env.GOOGLE_SCRIPT_GRIEVANCE_URL || process.env.VITE_GRIEVANCE_API_URL
  const defaultUrl = process.env.GOOGLE_SCRIPT_WEB_APP_URL

  const routeMap = {
    membership: {
      url: membershipUrl,
      upstreamFormType: process.env.GOOGLE_SCRIPT_MEMBERSHIP_FORM_TYPE || 'membership',
      sheetName: process.env.GOOGLE_SCRIPT_MEMBERSHIP_SHEET_NAME || 'Membership',
    },
    grievance: {
      url: grievanceUrl,
      upstreamFormType: process.env.GOOGLE_SCRIPT_GRIEVANCE_FORM_TYPE || 'grievance',
      sheetName: process.env.GOOGLE_SCRIPT_GRIEVANCE_SHEET_NAME || 'Grievance',
    },
  }

  const selectedRoute = routeMap[formType]

  const targetUrl =
    selectedRoute?.url ||
    defaultUrl ||
    grievanceUrl ||
    membershipUrl

  if (!targetUrl) {
    return res.status(500).json({ ok: false, error: 'Google Script URL is not configured' })
  }

  const outboundPayload = {
    ...payload,
    formType: selectedRoute?.upstreamFormType || formType,
    sheetName: selectedRoute?.sheetName,
  }

  try {
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(outboundPayload),
    })

    if (!response.ok) {
      const rawError = await response.text().catch(() => '')
      return res.status(502).json({
        ok: false,
        error: rawError || `Upstream request failed with status ${response.status}`,
      })
    }

    const raw = await response.text()
    let parsed = null
    try {
      parsed = raw ? JSON.parse(raw) : null
    } catch {
      parsed = null
    }

    if (parsed && parsed.ok === false) {
      const upstreamError = String(parsed.error || 'Google Script rejected the request')
      const appendRowHint = upstreamError.includes("appendRow")
        ? ` (sheet lookup failed for formType='${outboundPayload.formType}' and sheetName='${outboundPayload.sheetName || ''}')`
        : ''

      return res.status(200).json({ ok: false, error: `${upstreamError}${appendRowHint}` })
    }

    return res.status(200).json({ ok: true })
  } catch (error) {
    return res.status(502).json({ ok: false, error: error?.message || 'Unable to submit form' })
  }
}