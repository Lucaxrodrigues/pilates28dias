'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckSquare, Siren } from 'lucide-react';

export default function LoadingPage() {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 100); // 10 seconds total duration

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        router.push('/results'); 
      }, 2000); // Wait 2 seconds after loading before redirecting
    }
  }, [progress, router]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-white text-center px-4 sm:px-6 lg:px-8 py-8">
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
    </div>
  );
}
