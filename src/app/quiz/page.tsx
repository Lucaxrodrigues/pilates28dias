'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';

const quizQuestions = [
  {
    id: 0,
    type: 'intro',
    progress: 2,
    title: 'Já Somos + de 58 Mil mulheres pelo Brasil 🇧🇷🏆',
    imageSrc: '/DM_20250826133020_001.png',
    imageAlt: 'Mulheres praticando Pilates na Parede',
    imageHint: 'pilates wall exercise',
    ctaText: 'Continuar ✅',
  },
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

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < quizQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
      setSelectedOptions([]); // Reset for next multi-select question
    } else {
      console.log('Quiz completed!', answers);
      router.push('/loading');
    }
  };

  const handleSingleSelect = (optionId: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: optionId });
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
    handleNextQuestion();
  };


  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'intro':
        return (
            <div className="w-full max-w-md space-y-6 pt-4 flex flex-col items-center">
                <Image
                    src={currentQuestion.imageSrc}
                    alt={currentQuestion.imageAlt}
                    width={500}
                    height={300}
                    className="rounded-lg shadow-md"
                    data-ai-hint={currentQuestion.imageHint}
                />
                <Button
                    size="lg"
                    className="w-full h-16 text-xl font-bold text-white bg-[#E836D7] hover:bg-[#E836D7]/90 shadow-lg"
                    onClick={handleNextQuestion}
                >
                    {currentQuestion.ctaText}
                </Button>
            </div>
        );
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
                        onClick={() => handleCheckboxChange(option.id)}
                        >
                        <CardContent className="p-4">
                            <Label htmlFor={option.id} className="flex items-center justify-between w-full cursor-pointer">
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
                        disabled={selectedOptions.length === 0 && currentQuestion.id !== 7}
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
                    onClick={handleNextQuestion}
                >
                    Continuar ✅
                </Button>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white text-center px-4 sm:px-6 lg:px-8">
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
    </div>
  );
}
