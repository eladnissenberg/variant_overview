export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' })
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL,
        to: process.env.NOTIFICATION_EMAIL,
        subject: `Deck Viewer: ${email}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px;">
            <h2 style="color: #1a1a2e;">New Deck Viewer</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Time:</strong> ${new Date().toISOString()}</p>
            <p><strong>Deck:</strong> Variant Sales Overview</p>
          </div>
        `,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      return res.status(500).json({ error: error.message || 'Failed to send' })
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    return res.status(500).json({ error: 'Server error' })
  }
}
