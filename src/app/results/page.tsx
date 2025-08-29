import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

const ListItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start">
    <span className="mr-2 shrink-0">⚫</span>
    <span>{children}</span>
  </li>
);

const IconListItem = ({ icon, children }: { icon: string, children: React.ReactNode }) => (
    <li className="flex items-start">
        <span className="mr-2 text-xl shrink-0">{icon}</span>
        <span>{children}</span>
    </li>
);

export default function ResultsPage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-white px-4 sm:px-6 lg:px-8 py-12">
      <main className="flex flex-col items-center justify-center w-full max-w-3xl space-y-6 animate-in fade-in duration-700">
        {/* Elemento 1: Logo */}
        <Image
          src="/DM_20250826133017_001.png"
          alt="Logo do Programa"
          width={150}
          height={75}
          data-ai-hint="logo pilates"
        />

        {/* Elemento 2: Texto Introdutório */}
        <p className="text-center text-lg md:text-xl"
           dangerouslySetInnerHTML={{ __html: 'Após nossa análise, vimos que o Plano Personalizado para você é o <b><span style="color:#E836D7;">Programa Pilates na Parede Light 3.0</span></b>' }}
        />

        {/* Elemento 3: Título do Plano */}
        <h2 className="text-2xl font-bold text-center"
            dangerouslySetInnerHTML={{ __html: 'Detalhes do seu plano personalizado <span style="color:#E836D7; text-decoration:underline;">Programa Pilates na Parede Light 3.0</span>' }}
        />

        {/* Elemento 4: Card "Detalhes do Plano" */}
        <Card className="w-full border-2" style={{ borderColor: '#A9D7B8' }}>
          <CardHeader className="flex flex-row items-center space-x-3 pb-2 text-left">
            <span className="text-2xl p-1 bg-green-100 rounded-md">✅</span>
            <CardTitle className="font-bold">Detalhes do Plano</CardTitle>
          </CardHeader>
          <CardContent className="text-base text-left">
            <ul className="space-y-2">
              <ListItem><b>Dificuldade:</b> Fácil (iniciante ao intermediário)</ListItem>
              <ListItem><b>Tempo de prática:</b> 6 a 10 minutos por dia</ListItem>
              <ListItem><b>Duração do plano:</b> 15 dias</ListItem>
              <ListItem><b>Equipamento necessário:</b> Nenhum</ListItem>
              <ListItem><b>Resultados esperados:</b> Mais flexibilidade, menos dores, postura melhorada, sensação de rejuvenescimento, mais disposição e energia no dia a dia</ListItem>
              <ListItem><b>Resultados visíveis:</b> Seguindo o Plano da maneira ensinada, é esperado resultados expressivos e aparentes após 7 dias</ListItem>
            </ul>
          </CardContent>
        </Card>

        {/* Elemento 5: Card "O que você vai encontrar no plano?" */}
        <Card className="w-full border-2" style={{ borderColor: '#A9D7B8' }}>
          <CardHeader className="flex flex-row items-center space-x-3 pb-2 text-left">
            <span className="text-2xl">🔥</span>
            <CardTitle className="font-bold">O que você vai encontrar no plano?</CardTitle>
          </CardHeader>
          <CardContent className="text-base text-left">
            <ul className="space-y-2">
              <IconListItem icon="✅"><b>Aquecimento rápido:</b> Ativação muscular em 2 minutos</IconListItem>
              <IconListItem icon="✅"><b>Série de exercícios diários:</b> Movimentos estratégicos para alongamento, força e mobilidade</IconListItem>
              <IconListItem icon="✅"><b>Técnicas de respiração:</b> Aumento da oxigenação e relaxamento muscular</IconListItem>
              <IconListItem icon="✅"><b>Correção postural:</b> Ajustes simples para evitar dores e melhorar a postura</IconListItem>
              <IconListItem icon="✅"><b>Modo express:</b> Exercícios eficazes para quem tem pouco tempo</IconListItem>
              <IconListItem icon="✅"><b>Dicas extras:</b> Pequenos ajustes que potencializam seus resultados</IconListItem>
              <IconListItem icon="✅"><b>Guia de exercícios:</b> Exercícios fáceis, intermediários e avançados, para você começar de maneira fácil e evoluir</IconListItem>
            </ul>
          </CardContent>
        </Card>

        {/* Elemento 6: Card "Como será a entrega do seu Plano?" */}
        <Card className="w-full border-2" style={{ borderColor: '#A9D7B8' }}>
          <CardHeader className="flex flex-row items-center space-x-3 pb-2 text-left">
            <span className="text-2xl">📲</span>
            <CardTitle className="font-bold">Como será a entrega do seu Plano?</CardTitle>
          </CardHeader>
          <CardContent className="text-base text-left space-y-3">
            <p>Assim que sua inscrição for confirmada, você receberá acesso imediato ao plano através do seu e-mail e WhatsApp.</p>
            <ul className="space-y-2">
                <IconListItem icon="✅"><b>Formato:</b> Vídeos demonstrativos + Guia prático</IconListItem>
                <IconListItem icon="✅"><b>Acesso:</b> 100% online, podendo assistir de qualquer dispositivo (celular, tablet ou computador)</IconListItem>
                <IconListItem icon="✅"><b>Tempo de acesso:</b> Vitalício – assista quantas vezes quiser, quando quiser</IconListItem>
                <IconListItem icon="✅"><b>Suporte:</b> Você terá um acompanhamento exclusivo e individual</IconListItem>
            </ul>
          </CardContent>
        </Card>

        {/* Elemento 7: Card "Recomendações" */}
        <Card className="w-full border-2" style={{ borderColor: '#A9D7B8' }}>
          <CardHeader className="flex flex-row items-center space-x-3 pb-2 text-left">
            <span className="text-2xl">🚨</span>
            <CardTitle className="font-bold">Recomendações</CardTitle>
          </CardHeader>
          <CardContent className="text-base text-left">
            <ul className="space-y-2">
                <IconListItem icon="✔️">Não pare após 15 dias, os resultados serão cada vez melhores, e isso mudará sua vida</IconListItem>
                <IconListItem icon="✔️">Faça os exercícios descalço para melhor controle e equilíbrio</IconListItem>
                <IconListItem icon="✔️">Mantenha a postura correta durante os movimentos</IconListItem>
                <IconListItem icon="✔️">Respire fundo e de forma controlada para melhores resultados</IconListItem>
            </ul>
          </CardContent>
        </Card>
        
        {/* Elemento 8: Botão Principal de Ação (CTA) */}
        <Link href="/checkout" passHref className="w-full max-w-md pt-4">
            <Button
              size="lg"
              className="w-full h-16 text-xl font-bold text-white shadow-lg"
              style={{ backgroundColor: '#E836D7', borderRadius: '8px' }}
            >
              Continuar ✅
            </Button>
        </Link>
      </main>
    </div>
  );
}
