export async function POST(req){
  try{
    const { message } = await req.json()
    if (!message) return new Response(JSON.stringify({ error: 'message required' }), { status: 400 })

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      // Fallback mock response when API key is missing
      const mock = `สวัสดี! นี่เป็นตัวอย่างการตอบจาก AI (ไม่มี OPENAI_API_KEY ตั้งค่าไว้)`
      return new Response(JSON.stringify({ text: mock }), { status: 200 })
    }

    // Proxy request to OpenAI Chat Completions
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'คุณคือผู้ช่วยที่สุภาพและสั้นกระชับ' },
          { role: 'user', content: message }
        ],
        max_tokens: 400
      })
    })

    if (!resp.ok) {
      const text = await resp.text()
      return new Response(JSON.stringify({ error: 'OpenAI error', details: text }), { status: 502 })
    }

    const data = await resp.json()
    const text = data.choices?.[0]?.message?.content || ''
    return new Response(JSON.stringify({ text }), { status: 200 })
  }catch(err){
    console.error(err)
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 })
  }
}
