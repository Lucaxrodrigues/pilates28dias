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

// Função para buscar o IP do cliente
async function getClientIp(): Promise<string> {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        if (!response.ok) return '';
        const data = await response.json();
        return data.ip || '';
    } catch (error) {
        console.error('Failed to fetch IP:', error);
        return '';
    }
}


export function CheckoutTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleCheckoutVisit = useCallback(async () => {
    // 1. Tenta pegar os UTMs da URL atual
    const utm_source = searchParams.get('utm_source');
    const utm_medium = searchParams.get('utm_medium');
    const utm_campaign = searchParams.get('utm_campaign');

    // Se encontrar na URL, salva no localStorage para garantir consistência
    if (utm_source || utm_medium || utm_campaign) {
      const campaignParams = {
        utm_source,
        utm_medium,
        utm_campaign,
      };
      localStorage.setItem('campaign_params', JSON.stringify(campaignParams));
    }
    
    // 2. Lê os parâmetros do localStorage (que podem ter vindo da home ou da URL atual)
    const storedCampaignParams = JSON.parse(
      localStorage.getItem('campaign_params') || '{}'
    );
      
    const clientIp = await getClientIp();
    const external_id = getCookie('my_session_id');
    const eventTime = Math.floor(Date.now() / 1000);
    const event_source_url = window.location.href;
    const userData = {
      external_id: external_id,
      fbc: getCookie('_fbc') || undefined,
      fbp: getCookie('_fbp') || undefined,
      client_user_agent: navigator.userAgent,
      ip: clientIp,
    };

    // Evento para o webhook de InitiateCheckout
    trackEvent({
      eventName: 'InitiateCheckout',
      eventTime: eventTime,
      userData: userData,
      customData: {
        page: '/checkout',
        ad_id: storedCampaignParams.utm_source || undefined,
        adset_id: storedCampaignParams.utm_medium || undefined,
        campaign_id: storedCampaignParams.utm_campaign || undefined,
      },
      event_source_url: event_source_url,
      action_source: 'website',
    });
  }, [searchParams]);

  useEffect(() => {
    if (pathname === '/checkout') {
      handleCheckoutVisit();
    }
  }, [pathname, handleCheckoutVisit]);

  return null;
}
