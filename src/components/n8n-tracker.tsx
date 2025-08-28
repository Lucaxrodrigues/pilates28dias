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

  const handleHomePageView = useCallback(() => {
    // Requisito 2: Captura e Armazenamento de Parâmetros de Campanha (UTMs)
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

    // Requisito 3: Webhook de Visita na Página Inicial (HomePageView)
    const storedCampaignParams = JSON.parse(
      localStorage.getItem('campaign_params') || '{}'
    );
      
    const external_id = getCookie('my_session_id');

    trackEvent({
      eventName: 'HomePageView',
      eventTime: Math.floor(Date.now() / 1000),
      userData: {
        external_id: external_id,
        fbc: getCookie('_fbc') || undefined,
        fbp: getCookie('_fbp') || undefined,
        client_user_agent: navigator.userAgent,
      },
      customData: {
        quiz_step: 1, // Página de entrada é a etapa 1
        quiz_question: 'Entrada no Funil',
        quiz_answer: 'Visitou a página inicial',
        ad_id: storedCampaignParams.utm_source || undefined,
        adset_id: storedCampaignParams.utm_medium || undefined,
        campaign_id: storedCampaignParams.utm_campaign || undefined,
      },
      event_source_url: window.location.href,
      action_source: 'website',
    });
  }, [searchParams]);

  useEffect(() => {
    // Requisito 1: Identificação Única e Persistente do Usuário
    let sessionId = getCookie('my_session_id');
    if (!sessionId) {
      sessionId = generateUUID();
      setCookie('my_session_id', sessionId, 30); // Validade de 30 dias
    }

    // Dispara evento apenas na página inicial
    if (pathname === '/') {
      handleHomePageView();
    }
  }, [pathname, handleHomePageView]);

  return null; // O componente não renderiza nada visível na tela.
}
