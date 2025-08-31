'use server';

import { z } from 'zod';

const eventSchema = z.object({
  eventName: z.string(),
  eventTime: z.number(),
  userData: z.object({
    external_id: z.string().optional(),
    fbc: z.string().optional(),
    fbp: z.string().optional(),
    client_user_agent: z.string().optional(),
    ip: z.string().optional(), // IP will now come from the client
  }),
  customData: z.record(z.any()),
  event_source_url: z.string().url(),
  action_source: z.string(),
});

const WEBHOOK_URL_PAGEVIEW = 'https://redis-n8n.rzilkp.easypanel.host/webhook-test/pageviewfb';
const WEBHOOK_URL_QUIZ = 'https://redis-n8n.rzilkp.easypanel.host/webhook/pilatesn8n';
const WEBHOOK_URL_CHECKOUT = 'https://redis-n8n.rzilkp.easypanel.host/webhook-test/checkoutfb';


export async function trackEvent(data: z.infer<typeof eventSchema>) {
  
  try {
    const parsedData = eventSchema.parse(data);

    // Roteamento do webhook baseado no nome do evento
    let webhookUrl;
    switch (parsedData.eventName) {
      case 'PageViewFB':
        webhookUrl = WEBHOOK_URL_PAGEVIEW;
        break;
      case 'InitiateCheckout':
        webhookUrl = WEBHOOK_URL_CHECKOUT;
        break;
      default: // QuizStep, HomePageView, etc.
        webhookUrl = WEBHOOK_URL_QUIZ;
        break;
    }

    if (!webhookUrl) {
      console.error('Webhook URL not determined for event:', parsedData.eventName);
      return { success: false, error: 'Webhook URL not configured for this event' };
    }

    const payload = {
      ...parsedData,
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(`N8N Webhook response was not ok for ${webhookUrl}:`, await response.text());
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending event to N8N:', error);
    return { success: false, error: 'Failed to send event' };
  }
}
