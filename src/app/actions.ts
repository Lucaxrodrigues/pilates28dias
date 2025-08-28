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

const WEBHOOK_URL = 'https://redis-n8n.rzilkp.easypanel.host/webhook/pilatesn8n';

export async function trackEvent(data: z.infer<typeof eventSchema>) {
  try {
    const parsedData = eventSchema.parse(data);

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

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error('N8N Webhook response was not ok:', await response.text());
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending event to N8N:', error);
    return { success: false, error: 'Failed to send event' };
  }
}
