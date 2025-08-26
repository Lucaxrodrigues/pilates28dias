import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function QuizIntroPage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-white text-center px-4 sm:px-6 lg:px-8">
      <main className="flex flex-col items-center justify-center flex-grow w-full max-w-4xl space-y-6 py-12 animate-in fade-in duration-700">
        {/* Elemento 1: Logo */}
        <div className="mb-4">
          <Image
            src="/DM_20250826133017_001.png"
            alt="Logo do Programa"
            width={150}
            height={75}
            data-ai-hint="logo pilates"
          />
        </div>

        {/* Elemento 2: Título de Prova Social */}
        <h2 className="text-lg sm:text-xl font-bold text-primary">
          Já Somos + de 58 Mil mulheres pelo Brasil 🇧🇷🏆
        </h2>

        {/* Elemento 3: Imagem de Matéria (Prova Social) */}
        <div className="my-4">
          <Image
            src="/DM_20250826134053_001.png"
            alt="Matéria sobre o programa de Pilates"
            width={225}
            height={150}
            className="rounded-lg shadow-lg"
            data-ai-hint="pilates social proof"
          />
        </div>

        {/* Elemento 4: Texto de Conexão */}
        <p className="text-lg sm:text-xl text-gray-800 max-w-2xl">
          Você será a <b>próxima</b> a experimentar o nosso plano de treino de pilates na parede...
        </p>

        {/* Elemento 5: Texto de Chamada */}
        <p className="text-lg sm:text-xl text-gray-800 font-semibold">
          👇 Está pronta para isso? 👇
        </p>

        {/* Elemento 6: Botão Principal de Ação (CTA) */}
        <Link href="/quiz/1" passHref className="w-full max-w-md">
            <Button
              size="lg"
              className="w-full h-16 text-xl font-bold text-white bg-primary hover:bg-primary/90 shadow-lg rounded-full"
            >
              SIM! Estou pronta!!
            </Button>
        </Link>

        {/* Elemento 7: Texto de Benefício Final */}
        <p className="text-base sm:text-lg text-gray-800 max-w-2xl pt-2">
          🎯 Em poucos segundos, você saberá a <b>maneira certa</b> para sua rotina e objetivos!
        </p>
      </main>
    </div>
  );
}
