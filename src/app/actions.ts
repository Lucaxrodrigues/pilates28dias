'use server';

import { z } from 'zod';
import { headers } from 'next/headers';

const eventSchema = z.object({
  eventName: z.string(),
  eventTime: z.number(),
  userData: z.object({
    external_id: z.string().optional(),
    fbc: z.string().optional(),
    fbp: z.string().optional(),
    client_user_agent: z.string().optional(),
  }),
  customData: z.record(z.any()),
  event_source_url: z.string().url(),
  action_source: z.string(),
});

const WEBHOOK_URL_PAGEVIEW = 'https://redis-n8n.rzilkp.easypanel.host/webhook-test/pageviewfb';
const WEBHOOK_URL_QUIZ = 'https://redis-n8n.rzilkp.easypanel.host/webhook/pilatesn8n';

export async function trackEvent(data: z.infer<typeof eventSchema>) {
  
  try {
    const parsedData = eventSchema.parse(data);

    const webhookUrl = parsedData.eventName === 'HomePageView' 
      ? WEBHOOK_URL_PAGEVIEW 
      : WEBHOOK_URL_QUIZ;

    if (!webhookUrl) {
      console.error('Webhook URL not determined for event:', parsedData.eventName);
      return { success: false, error: 'Webhook URL not configured for this event' };
    }

    // Get IP from headers
    const forwardedFor = headers().get('x-forwarded-for');
    const realIp = headers().get('x-real-ip');
    const ip = forwardedFor ? forwardedFor.split(',')[0] : realIp;

    const payload = {
      ...parsedData,
      userData: {
        ...parsedData.userData,
        ip: ip,
      },
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
