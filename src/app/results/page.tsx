import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckSquare, Siren } from 'lucide-react';
import Link from 'next/link';

export default function ResultsPage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-white text-center px-4 sm:px-6 lg:px-8 py-12">
      <main className="flex flex-col items-center justify-center w-full max-w-3xl space-y-6 animate-in fade-in duration-700">
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
        
        <Link href="#" passHref className="w-full max-w-md pt-4">
            <Button
              size="lg"
              className="w-full h-16 text-xl font-bold text-white bg-[#E836D7] hover:bg-[#E836D7]/90 shadow-lg"
            >
              Eu quero meu plano personalizado ✅
            </Button>
        </Link>
      </main>
    </div>
  );
}
