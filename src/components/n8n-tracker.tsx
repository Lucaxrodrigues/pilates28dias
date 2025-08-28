'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    ttq: any;
  }
}

export function N8NTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // --- FUNÇÕES AUXILIARES ---
    // 1. getCookie: A ferramenta para ler os cookies do navegador.
    function getCookie(name: string): string {
      if (typeof document === 'undefined') return '';
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2)
        return parts.pop()?.split(';').shift() || '';
      return '';
    }

    // 2. setCookie: A ferramenta para criar ou atualizar um cookie.
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

    // 3. generateUUID: Cria um ID único para a sessão do usuário.
    function generateUUID(): string {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }

    // --- FUNÇÃO PRINCIPAL DE ENVIO ---
    async function sendPageViewEvent(ttpCookieValue: string | null) {
      // A. Cria ou recupera o ID da sessão para este visitante.
      const sessionId = getCookie('my_session_id') || generateUUID();
      setCookie('my_session_id', sessionId, 1); // O ID de sessão dura 1 dia.

      // B. URL do seu webhook N8N.
      const N8N_WEBHOOK_URL =
        'https://redis-n8n.rzilkp.easypanel.host/webhook-test/pageviewttk';

      if (!N8N_WEBHOOK_URL) {
        console.error('N8N Webhook URL não está configurada.');
        return;
      }

      // C. Lê os parâmetros da URL atual (para UTMs, fbclid, ttclid).
      const currentParams = new URLSearchParams(window.location.search);

      // D. Montagem do Objeto de Dados (O "Payload").
      // É aqui que toda a captura acontece.
      const dadosParaN8N = {
        event_name: 'PageView',
        event_time: Math.floor(Date.now() / 1000),
        user_data: {
          // Captura os cookies do Facebook. O Pixel do FB os cria automaticamente.
          fbc: getCookie('_fbc') || undefined,
          fbp: getCookie('_fbp') || undefined,

          // Captura o ttclid da URL e o cookie _ttp do TikTok.
          ttclid: currentParams.get('ttclid') || undefined,
          ttp: ttpCookieValue || undefined,

          // Captura o "User-Agent" para saber o navegador e o sistema operacional.
          client_user_agent: navigator.userAgent,

          // Envia nosso ID de sessão como 'external_id'.
          external_id: sessionId,
        },
        attribution_data: {
          // Captura os parâmetros UTM da URL.
          ad_id: currentParams.get('utm_term') || undefined,
          adset_id: currentParams.get('utm_content') || undefined,
          campaign_id: currentParams.get('utm_campaign') || undefined,
        },
        custom_data: {}, // Espaço para dados extras no futuro.
        event_source_url: window.location.href, // A URL completa da página.
        action_source: 'website',
      };

      // E. Envia os dados para o N8N.
      try {
        await fetch(N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dadosParaN8N),
        });
        console.log(
          'Evento PageView enviado para o N8N com sucesso!',
          dadosParaN8N
        );
      } catch (error) {
        console.error(
          'Erro de rede ao enviar evento PageView para o N8N:',
          error
        );
      }
    }

    // --- A ESTRATÉGIA DE EXECUÇÃO ---
    // Dispara o ttq.page() para o TikTok começar a trabalhar.
    if (typeof window.ttq !== 'undefined') {
      window.ttq.page();
    }

    // Aguarda 500ms para dar tempo do cookie _ttp ser criado.
    const timer = setTimeout(() => {
      const ttp = getCookie('_ttp');
      sendPageViewEvent(ttp || null); // Chama a função principal de envio.
    }, 500);

    return () => clearTimeout(timer); // Limpa o timer se o usuário sair da página.
  }, [pathname, searchParams]);

  return null; // O componente não renderiza nada visível na tela.
}
