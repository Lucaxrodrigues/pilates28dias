import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-white text-center px-4 sm:px-6 lg:px-8">
      <main className="flex flex-col items-center justify-center flex-grow w-full max-w-4xl space-y-8 py-12 animate-in fade-in duration-700">
        {/* Elemento 1: Logo */}
        <div className="mb-4">
          <Image
            src="/DM_20250826133017_001.png"
            alt="Logo do Programa"
            width={150}
            height={75}
            data-ai-hint="logo pilates"
            priority
          />
        </div>

        {/* Elemento 2: Título Principal */}
        <h1 className="text-3xl sm:text-4xl font-bold text-black font-headline">
          Você sabia que o Pilates na Parede pode rejuvenescer seu corpo, suas articulações, até mesmo sua pele e prevenir doenças?
        </h1>

        {/* Elemento 3: Subtítulo de Impacto */}
        <p className="text-lg sm:text-xl text-gray-700 underline">
          Tudo isso em 15 dias, fazendo o Pilates na Parede por apenas 6 minutos ao dia!
        </p>

        {/* Elemento 4: Imagem Ilustrativa Central */}
        <div className="my-6">
          <Image
            src="/DM_20250826133020_001.png"
            alt="Mulher praticando Pilates na Parede"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
            data-ai-hint="pilates wall exercise"
          />
        </div>

        {/* Elemento 5: Parágrafo de Contexto */}
        <p className="text-base sm:text-lg text-gray-800 max-w-2xl">
          Responda a algumas <b>perguntas rápidas</b> e veja se o <i>Programa de 15 Dias de Pilates na Parede</i> é o método perfeito para você <b>fortalecer o core, acabar com as dores, melhorar a postura e rejuvenescer seu corpo</b> sem sair de casa.
        </p>

        {/* Elemento 6: Botão Principal de Ação (CTA) */}
        <Link href="/start" passHref className="w-full max-w-md">
            <Button
              size="lg"
              className="w-full h-16 text-xl font-bold text-white bg-primary hover:bg-primary/90 shadow-lg"
            >
              ✅ SIM! Quero Começar Agora!!
            </Button>
        </Link>

        {/* Elemento 7: Texto de Apoio Final */}
        <p className="text-base sm:text-lg text-gray-800 max-w-2xl pt-2">
          👆 <b>Clique no botão</b> e em poucos segundos, você saberá se esse método é <b>o ideal para sua rotina e objetivos!</b>
        </p>
      </main>
    </div>
  );
}
