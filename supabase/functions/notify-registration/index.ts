import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const payload = await req.json()

    const webhookUrl = Deno.env.get('WHATSAPP_WEBHOOK_URL')

    if (!webhookUrl) {
      console.log('WhatsApp webhook URL not configured. Skipping notification.')
      return new Response(
        JSON.stringify({ success: true, message: 'Webhook not configured, notification skipped' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    const message = [
      '🛩️ *Novo pré-cadastro recebido!*\n',
      `*Nome:* ${payload.nome || 'N/A'}`,
      `*E-mail:* ${payload.email || 'N/A'}`,
      `*WhatsApp:* ${payload.whatsapp || 'N/A'}`,
      `*Cidade:* ${payload.cidade || 'N/A'} - ${payload.uf || 'N/A'}`,
      `*Canal de contato:* ${payload.canal_contato || 'N/A'}`,
    ].join('\n')

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: message, data: payload }),
      })

      if (!response.ok) {
        console.warn(`Webhook returned status ${response.status}`)
      }
    } catch (webhookError) {
      console.warn('Failed to send WhatsApp notification:', webhookError)
    }

    return new Response(JSON.stringify({ success: true, message: 'Notification processed' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
    console.error('notify-registration error:', error)
    return new Response(
      JSON.stringify({ success: true, message: 'Notification skipped due to error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }
})
