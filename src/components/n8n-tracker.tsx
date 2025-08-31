'use client';

import { useEffect, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackEvent } from '@/app/actions';

// --- Funções Auxiliares ---
function getCookie(name: string): string {
  if (typeof document === 'undefined') return '';
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
  return '';
}

function setCookie(name: string, value: string, days: number): void {
  if (typeof document === 'undefined') return;
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function N8NTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleHomePageVisit = useCallback(() => {
    // Captura e Armazenamento de Parâmetros de Campanha (UTMs)
    const utm_source = searchParams.get('utm_source');
    const utm_medium = searchParams.get('utm_medium');
    const utm_campaign = searchParams.get('utm_campaign');

    if (utm_source || utm_medium || utm_campaign) {
      const campaignParams = {
        utm_source,
        utm_medium,
        utm_campaign,
      };
      localStorage.setItem('campaign_params', JSON.stringify(campaignParams));
    }

    const storedCampaignParams = JSON.parse(
      localStorage.getItem('campaign_params') || '{}'
    );
      
    const external_id = getCookie('my_session_id');
    const eventTime = Math.floor(Date.now() / 1000);
    const event_source_url = window.location.href;
    const userData = {
      external_id: external_id,
      fbc: getCookie('_fbc') || undefined,
      fbp: getCookie('_fbp') || undefined,
      client_user_agent: navigator.userAgent,
    };

    // Evento 1: Para o funil do Quiz (enviado para o webhook do quiz)
    trackEvent({
      eventName: 'HomePageView', // Passo 1 do Funil
      eventTime: eventTime,
      userData: userData,
      customData: {
        quiz_step: 1,
        quiz_question: 'Entrada no Funil',
        quiz_answer: 'Visitou a página inicial',
        ad_id: storedCampaignParams.utm_source || undefined,
        adset_id: storedCampaignParams.utm_medium || undefined,
        campaign_id: storedCampaignParams.utm_campaign || undefined,
      },
      event_source_url: event_source_url,
      action_source: 'website',
    });

    // Evento 2: Para o webhook de PageView do FB (enviado para o webhook de pageview)
    trackEvent({
      eventName: 'PageViewFB', // Evento específico para o webhook de pageview
      eventTime: eventTime,
      userData: userData,
      customData: {
        page: '/',
        ad_id: storedCampaignParams.utm_source || undefined,
        adset_id: storedCampaignParams.utm_medium || undefined,
        campaign_id: storedCampaignParams.utm_campaign || undefined,
      },
      event_source_url: event_source_url,
      action_source: 'website',
    });
  }, [searchParams]);

  useEffect(() => {
    // Identificação Única e Persistente do Usuário
    let sessionId = getCookie('my_session_id');
    if (!sessionId) {
      sessionId = generateUUID();
      setCookie('my_session_id', sessionId, 30); // Validade de 30 dias
    }

    // Dispara eventos apenas na página inicial
    if (pathname === '/') {
      handleHomePageVisit();
    }
  }, [pathname, handleHomePageVisit]);

  return null;
}
