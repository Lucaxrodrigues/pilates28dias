import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function StartPage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-white text-center px-4 sm:px-6 lg:px-8">
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
          width={600}
          height={400}
          className="rounded-lg"
          data-ai-hint="social proof article"
        />

        <p className="text-lg">
          Você será a <b>próxima</b> a experimentar o nosso plano de treino de pilates na parede...
        </p>

        <p className="text-lg">👇 Está pronta para isso? 👇</p>

        <Link href="/quiz" passHref className="w-full max-w-md">
          <Button
            size="lg"
            className="w-full h-16 text-xl font-bold text-white bg-[#E836D7] hover:bg-[#E836D7]/90 shadow-lg rounded-full"
          >
            SIM! Estou pronta!!
          </Button>
        </Link>

        <p className="text-base pt-2">
          🎯 Em poucos segundos, você saberá a <b>maneira certa</b> para sua rotina e objetivos!
        </p>
      </main>
    </div>
  );
}
