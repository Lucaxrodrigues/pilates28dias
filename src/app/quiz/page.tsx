'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { trackEvent } from '@/app/actions';
import { CheckSquare, Siren } from 'lucide-react';
import Link from 'next/link';

// --- Funções Auxiliares do Tracker ---
function getCookie(name: string): string {
  if (typeof document === 'undefined') return '';
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
  return '';
}

const quizQuestions = [
  {
    id: 1,
    type: 'single',
    progress: 8,
    title: 'Perfeito!!',
    subtitle: 'Vamos lá... Qual é a sua idade/ faixa etária?',
    options: [
      { id: '18-29', label: '18 a 29 anos' },
      { id: '30-40', label: '30 a 40 anos' },
      { id: '41-50', label: '41 a 50 anos' },
      { id: '51-60', label: '51 a 60 anos' },
      { id: 'mais_60', label: 'Mais de 60 anos' },
    ],
  },
  {
    id: 2,
    type: 'single-emoji',
    progress: 15,
    title: 'Você já experimentou Pilates de Parede antes?',
    options: [
        { id: 'iniciante', label: '😬 Sou iniciante, nunca pratiquei Pilates.' },
        { id: 'regular_nova_abordagem', label: '🙂 Eu pratico regularmente, mas estou buscando uma nova abordagem.' },
        { id: 'rotina_nao_fixa', label: '🙂 Já fiz algumas aulas, mas não tenho uma rotina fixa.' },
        { id: 'experiente', label: '💪 Tenho muita experiência e quero algo desafiador e prático.' },
    ],
  },
  {
    id: 3,
    type: 'multiple',
    progress: 23,
    title: 'Qual é o seu principal objetivo?',
    subtitle: '(Marque quantas opções quiser)',
    options: [
        { id: 'flacidez', emoji: '😁', label: 'Perder flacidez' },
        { id: 'emagrecer', emoji: '🔥', label: 'Emagrecer' },
        { id: 'flexivel', emoji: '😬', label: 'Ser mais flexível' },
        { id: 'dores', emoji: '😟', label: 'Acabar com as dores' },
        { id: 'rejuvenescer', emoji: '🌿', label: 'Rejuvenescer meu corpo' },
        { id: 'disposicao', emoji: '💪', label: 'Aumentar a disposição no dia a dia' },
        { id: 'envelhecimento', emoji: '👳', label: 'Evitar o envelhecimento precoce' },
        { id: 'melhoras_rapidas', emoji: '⏰', label: 'Melhoras no corpo em pouco tempo' },
    ],
  },
  {
    id: 4,
    type: 'multiple',
    progress: 31,
    title: 'Quais são os maiores desafios que você enfrenta para manter uma rotina de exercícios?',
    subtitle: '(Marque quantas opções quiser)',
    options: [
        { id: 'falta_tempo', emoji: '⏰', label: 'Falta de tempo para me exercitar' },
        { id: 'falta_motivacao', emoji: '😐', label: 'Falta de motivação para seguir um plano fixo' },
        { id: 'nao_gosto_academia', emoji: '📱', label: 'Não gosto de ir à academia ou gastar com equipamentos' },
        { id: 'dificuldade_resultados', emoji: '😬', label: 'Dificuldade em ver resultados que me incentivem a continuar' },
        { id: 'dores_corpo', emoji: '😟', label: 'Sinto muitas dores no corpo' },
        { id: 'nao_sei_comecar', emoji: '❌', label: 'Não sei por onde começar' },
        { id: 'sem_resultados_rapidos', emoji: '😭', label: 'Nunca achei algo que me dê resultados rápidos' },
    ],
  },
  {
    id: 5,
    type: 'single-emoji',
    progress: 38,
    title: 'Você acredita que é possível ter um corpo melhor, mais jovem e sem dores através do pilates na parede?',
    options: [
        { id: 'acredito', label: '✅ Eu acredito!' },
        { id: 'nao_acredito', label: '❌ Eu NÃO acredito.' },
    ],
  },
  {
    id: 6,
    type: 'transition',
    progress: 42,
    title: 'Olha só o que o Programa Pilates na Parede fez com a Silvana e a Marcia em poucos dias! ❤️',
    testimonials: [
        {
            subtitle: 'Texto Silvana - 47 anos',
            imageSrc: '/DM_20250826140527_001.jpg',
            imageAlt: 'Depoimento da Silvana',
            imageHint: 'testimonial chat'
        },
        {
            subtitle: 'Texto Marcia - 62 anos',
            imageSrc: '/DM_20250826140558_001.jpg',
            imageAlt: 'Depoimento da Marcia',
            imageHint: 'testimonial chat'
        }
    ],
    ctaText: 'Responda às últimas perguntas e receba um <b>plano personalizado do Programa Pilates na Parede feito exclusivamente pra você!</b> ✅👇',
  },
  {
    id: 7,
    type: 'multiple',
    progress: 46,
    title: 'Em relação a um <b>Programa de 15 dias de Pilates na Parede, personalizado para você</b>, o que mais te animaria?',
    subtitle: '(Marque quantas opções quiser)',
    options: [
        { id: 'resultados_visiveis', emoji: '⏰', label: 'Saber que posso ver resultados visíveis em pouco tempo' },
        { id: 'jovem_menos_dores', emoji: '💚', label: 'Me sentir mais jovem e com menos dores' },
        { id: 'orientacoes_claras', emoji: '😬', label: 'Receber orientações claras e simples que posso seguir todos os dias' },
        { id: 'exercitar_em_casa', emoji: '💪', label: 'A possibilidade de me exercitar em casa sem precisar de equipamentos' },
        { id: 'motivada_comprometida', emoji: '😎', label: 'Ter um passo a passo que me mantenha motivada e comprometida' },
    ],
  },
  {
    id: 8,
    type: 'multiple',
    progress: 62,
    title: 'O que te faria começar o <strong><u>Programa Pilates na Parede</u></strong> hoje mesmo?',
    subtitle: '(Marque quantas opções quiser)',
    options: [
        { id: 'resultados_15_dias', emoji: '🙏', label: 'Saber que posso ver resultados visíveis em 15 dias' },
        { id: 'cuidar_saude', emoji: '💚', label: 'Saber que preciso cuidar da minha saúde e rejuvenescer meu corpo' },
        { id: 'solucao_pratica', emoji: '✅', label: 'Ter uma solução prática que começa hoje mesmo' },
        { id: 'plano_pratico', emoji: '😬', label: 'Receber um plano prático para seguir diariamente, com instruções claras' },
    ],
    conclusionText: 'Perfeito! Já podemos finalizar as perguntas por aqui! ❤️',
    buttonText: 'Finalizar ✅',
  }
];

// --- Sub-componentes para Loading e Results ---

function LoadingView({ onLoadingComplete }: { onLoadingComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 100); 

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        onLoadingComplete();
      }, 2000); 
    }
  }, [progress, onLoadingComplete]);

  return (
    <main className="flex flex-col items-center justify-center flex-grow w-full max-w-3xl space-y-6">
      <Image
        src="/DM_20250826133017_001.png"
        alt="Logo do Programa"
        width={150}
        height={75}
        data-ai-hint="logo pilates"
      />

      <div className="flex flex-col items-center justify-center w-full max-w-md space-y-4 animate-in fade-in duration-500">
        <h2 className="text-2xl font-bold">Analisando suas respostas...</h2>
        <div className="w-full space-y-2">
          <Progress value={progress} className="h-4 bg-gray-200" indicatorClassName="bg-[#52FF00]" />
          <p className="text-lg font-semibold">{Math.round(progress)}%</p>
        </div>
        <p className="text-md text-gray-600">Isso leva poucos segundos</p>
      </div>
      
      <div className="w-full space-y-6 animate-in fade-in duration-700 pt-6">
        <p className="text-center text-lg md:text-xl">
          Prontinho! Nosso sistema já analisou suas respostas e <strong>achamos alguns pontos interessantes</strong> e com base nisso, preparamos algumas recomendações para você.
        </p>

        <h2 className="text-2xl font-bold text-red-600 text-center">
          Sua análise pessoal:
        </h2>

        <div className="w-full space-y-4">
            <Card className="border-2 border-[#E836D7]">
              <CardHeader className="flex flex-row items-center space-x-3 pb-2 text-left">
                <CheckSquare className="w-8 h-8 text-white bg-blue-500 rounded-md p-1 shrink-0" />
                <CardTitle>Análise</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-base text-left">
                <p>
                  Com base nas suas respostas, você deseja rejuvenescer, aliviar desconfortos no corpo e melhorar sua qualidade de vida, mas enfrenta desafios e incertezas.
                </p>
                <p>
                  Você sabe que precisa cuidar do seu corpo para se sentir mais leve, disposta e confiante, mas precisa de um caminho claro e acessível para alcançar esses resultados de forma prática, eficaz e rápido.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#E836D7]">
              <CardHeader className="flex flex-row items-center space-x-3 pb-2 text-left">
                <Siren className="w-8 h-8 text-red-500 shrink-0" />
                <CardTitle className="text-red-600">ATENÇÃO</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-base text-left">
                <p>
                  Se você continuar do jeito que está, com o tempo, isso pode levar ao <strong>enrijecimento das articulações, dores crônicas e perda de mobilidade</strong>, o que pode se tornar irreversível se não for tratado a tempo. Além disso, problemas posturais mal corrigidos podem se agravar, causando cansaço excessivo, inchaço e até impactando sua autoestima.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#E836D7]">
              <CardHeader className="flex flex-row items-center space-x-3 pb-2 text-left">
                <CheckSquare className="w-8 h-8 text-white bg-green-500 rounded-md p-1 shrink-0" />
                <CardTitle>RECOMENDAÇÃO</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-base text-left">
                <p>
                    A boa notícia é que <strong>ainda não é tarde para mudar!</strong> Com apenas <strong>6 minutos por dia</strong>, você pode restaurar sua postura, aliviar dores, fortalecer seu corpo e até rejuvenescer sua pele, graças ao aumento da circulação e oxigenação. Com o Programa Pilates na Parede, você sentirá mais leveza, flexibilidade e disposição, sem precisar sair de casa ou investir em equipamentos caros.
                </p>
              </CardContent>
            </Card>
          </div>
           <p className="text-center text-lg md:text-xl font-semibold max-w-2xl pt-4">
              <strong>Nosso sistema analisou suas respostas</strong> e, com base nelas, <strong>preparamos um guia personalizado para você seguir e chegar da maneira mais rápida e fácil aos seus objetivos!</strong>
          </p>
           <p className="text-center text-lg md:text-xl font-semibold max-w-2xl">
              Você será redirecionado em instantes...
          </p>
      </div>
    </main>
  );
}

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

function ResultsView() {
    return (
        <main className="flex flex-col items-center justify-center w-full max-w-3xl space-y-6 animate-in fade-in duration-700">
            <Image
            src="/DM_20250826133017_001.png"
            alt="Logo do Programa"
            width={150}
            height={75}
            data-ai-hint="logo pilates"
            />

            <p className="text-center text-lg md:text-xl"
            dangerouslySetInnerHTML={{ __html: 'Após nossa análise, vimos que o Plano Personalizado para você é o <b><span style="color:#E836D7;">Programa Pilates na Parede Light 3.0</span></b>' }}
            />

            <h2 className="text-2xl font-bold text-center"
                dangerouslySetInnerHTML={{ __html: 'Detalhes do seu plano personalizado <span style="color:#E836D7; text-decoration:underline;">Programa Pilates na Parede Light 3.0</span>' }}
            />

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
    );
}


// --- Componente Principal da Página ---

export default function QuizPage() {
  const [pageState, setPageState] = useState<'start' | 'quiz' | 'loading' | 'results'>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const sendQuizStepEvent = (question: any, answer: any) => {
    const external_id = getCookie('my_session_id');
    const questionIndex = quizQuestions.findIndex(q => q.id === question.id);
    const quizStep = questionIndex + 3; // Home é 1, Início do Quiz é 2

    const answerLabel = Array.isArray(answer)
      ? answer
          .map(ansId => {
            const opt = question.options?.find((o: any) => o.id === ansId);
            return opt ? opt.label : ansId;
          })
          .join(', ')
      : (question.options?.find((o: any) => o.id === answer)?.label) || answer;
      
    trackEvent({
        eventName: 'QuizStep',
        eventTime: Math.floor(Date.now() / 1000),
        userData: {
            external_id: external_id,
            client_user_agent: navigator.userAgent
        },
        customData: {
            quiz_step: quizStep,
            quiz_question: question.title.replace(/<[^>]*>?/gm, ''), // Remove HTML tags
            quiz_answer: answerLabel,
        },
        event_source_url: window.location.href,
        action_source: 'website'
    });
  };

  useEffect(() => {
    // Evento para a "antiga página start" que agora é o início do quiz
    if (pageState === 'quiz') {
      trackEvent({
        eventName: 'QuizStep',
        eventTime: Math.floor(Date.now() / 1000),
        userData: {
          external_id: getCookie('my_session_id'),
          client_user_agent: navigator.userAgent
        },
        customData: {
            quiz_step: 2, // Início do quiz é a etapa 2
            quiz_question: 'Início do Quiz',
            quiz_answer: 'Usuário clicou para iniciar o quiz'
        },
        event_source_url: window.location.href,
        action_source: 'website'
      });
    }
  }, [pageState]);


  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < quizQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
      setSelectedOptions([]);
    } else {
      console.log('Quiz completed!', answers);
      setPageState('loading');
    }
  };

  const handleSingleSelect = (optionId: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: optionId });
    sendQuizStepEvent(currentQuestion, optionId);
    handleNextQuestion();
  };
  
  const handleCheckboxChange = (optionId: string) => {
    const newSelectedOptions = selectedOptions.includes(optionId)
      ? selectedOptions.filter((id) => id !== optionId)
      : [...selectedOptions, optionId];
    setSelectedOptions(newSelectedOptions);
  };

  const handleMultipleSelectContinue = () => {
    setAnswers({ ...answers, [currentQuestion.id]: selectedOptions });
    sendQuizStepEvent(currentQuestion, selectedOptions);
    handleNextQuestion();
  };


  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'single':
        return (
          <div className="flex flex-col w-full max-w-md space-y-4 pt-4">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={option.id}
                variant="outline"
                size="lg"
                className="w-full h-16 text-lg justify-start p-4 bg-white border border-gray-300 hover:border-primary hover:bg-gray-50 text-gray-800"
                onClick={() => handleSingleSelect(option.id)}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center mr-4">
                    <span className="text-white font-bold">{String.fromCharCode(65 + index)}</span>
                  </div>
                  <span>{option.label}</span>
                </div>
              </Button>
            ))}
          </div>
        );
      case 'single-emoji':
        return (
            <div className="flex flex-col w-full max-w-md space-y-4 pt-4">
            {currentQuestion.options.map((option) => (
              <Button
                key={option.id}
                variant="outline"
                size="lg"
                className="w-full h-auto min-h-[4rem] text-lg justify-start p-4 bg-white border border-gray-300 hover:border-primary hover:bg-gray-50 text-gray-800 text-left whitespace-normal"
                onClick={() => handleSingleSelect(option.id)}
              >
                <span className="text-2xl mr-4">{option.label.split(' ')[0]}</span>
                <span>{option.label.substring(option.label.indexOf(' ') + 1)}</span>
              </Button>
            ))}
          </div>
        );
      case 'multiple':
        return (
            <>
                <div className="flex flex-col w-full max-w-md space-y-3 pt-4">
                    {currentQuestion.options.map((option) => (
                        <Card
                        key={option.id}
                        className="bg-[#F0FFF4] border-[#A9D7B8] cursor-pointer"
                        >
                            <CardContent className="p-0">
                                <Label 
                                    htmlFor={option.id} 
                                    className="flex items-center justify-between w-full cursor-pointer p-4"
                                    onClick={() => handleCheckboxChange(option.id)}
                                >
                                    <div className="flex items-center">
                                        <span className="text-2xl mr-4">{option.emoji}</span>
                                        <span className="text-lg text-gray-800">{option.label}</span>
                                    </div>
                                    <Checkbox
                                        id={option.id}
                                        checked={selectedOptions.includes(option.id)}
                                        onCheckedChange={() => handleCheckboxChange(option.id)}
                                        className="w-6 h-6 rounded-full border-2 border-[#A9D7B8] data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                    />
                                </Label>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                 {currentQuestion.conclusionText && (
                  <p className="text-lg font-bold text-gray-800 mt-6">{currentQuestion.conclusionText}</p>
                )}
                <div className="w-full max-w-md pt-4">
                    <Button
                        size="lg"
                        className="w-full h-16 text-xl font-bold text-white bg-[#E836D7] hover:bg-[#E836D7]/90 shadow-lg"
                        onClick={handleMultipleSelectContinue}
                        disabled={selectedOptions.length === 0}
                    >
                        {currentQuestion.buttonText || 'Continuar ✅'}
                    </Button>
                </div>
            </>
        );
      case 'transition':
        return (
            <div className="w-full max-w-md space-y-6 pt-4">
                {currentQuestion.testimonials.map((testimonial, index) => (
                    <div key={index} className="flex flex-col items-center space-y-2">
                        <h3 className="text-lg font-semibold">{testimonial.subtitle}</h3>
                        <Image
                            src={testimonial.imageSrc}
                            alt={testimonial.imageAlt}
                            width={400}
                            height={250}
                            className="rounded-lg shadow-md"
                            data-ai-hint={testimonial.imageHint}
                        />
                    </div>
                ))}
                <p 
                  className="text-lg text-gray-800"
                  dangerouslySetInnerHTML={{ __html: currentQuestion.ctaText }}
                />
                <Button
                    size="lg"
                    className="w-full h-16 text-xl font-bold text-white bg-[#E836D7] hover:bg-[#E836D7]/90 shadow-lg"
                    onClick={() => {
                        sendQuizStepEvent(currentQuestion, "Continuou após depoimentos");
                        handleNextQuestion();
                    }}
                >
                    Continuar ✅
                </Button>
            </div>
        );
      default:
        return null;
    }
  };

  const renderPageContent = () => {
    switch(pageState) {
        case 'start':
            return (
                <main className="flex flex-col items-center justify-center flex-grow w-full max-w-2xl space-y-6 py-12 animate-in fade-in duration-700">
                    <Image
                    src="/DM_20250826133017_001.png"
                    alt="Logo do Programa"
                    width={150}
                    height={75}
                    data-ai-hint="logo pilates"
                    />

                    <h2 className="text-2xl font-bold text-[#E836D7]">
                    Já Somos + de 58 Mil mulheres pelo Brasil 🇧🇷🏆
                    </h2>

                    <Image
                    src="/DM_20250826134053_001.png"
                    alt="Matéria sobre o programa"
                    width={225}
                    height={150}
                    className="rounded-lg"
                    data-ai-hint="social proof article"
                    />

                    <p className="text-lg">
                    Você será a <b>próxima</b> a experimentar o nosso plano de treino de pilates na parede...
                    </p>

                    <p className="text-lg">👇 Está pronta para isso? 👇</p>

                    <Button
                        size="lg"
                        className="w-full max-w-md h-16 text-xl font-bold text-white bg-[#E836D7] hover:bg-[#E836D7]/90 shadow-lg rounded-full"
                        onClick={() => setPageState('quiz')}
                    >
                        SIM! Estou pronta!!
                    </Button>

                    <p className="text-base pt-2">
                    🎯 Em poucos segundos, você saberá a <b>maneira certa</b> para sua rotina e objetivos!
                    </p>
                </main>
            );
        case 'quiz':
            return (
                <main className="flex flex-col items-center justify-center flex-grow w-full max-w-2xl space-y-5 py-8 animate-in fade-in duration-700">
                    <Image
                    src="/DM_20250826133017_001.png"
                    alt="Logo do Programa"
                    width={150}
                    height={75}
                    data-ai-hint="logo pilates"
                    className="mb-4"
                    />
                    
                    <div className="w-full px-4">
                        <Progress value={currentQuestion.progress} className="h-4 bg-gray-200" indicatorClassName="bg-[#52FF00]" />
                    </div>
                    
                    <h2 className="text-2xl font-bold" dangerouslySetInnerHTML={{ __html: currentQuestion.title }}></h2>
                    {currentQuestion.subtitle && <p className="text-md text-gray-600">{currentQuestion.subtitle}</p>}
                    
                    {renderQuestion()}
                </main>
            );
        case 'loading':
            return <LoadingView onLoadingComplete={() => setPageState('results')} />;
        case 'results':
            return <ResultsView />;
        default:
            return null;
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-white text-center px-4 sm:px-6 lg:px-8 py-8">
      {renderPageContent()}
    </div>
  );
}
