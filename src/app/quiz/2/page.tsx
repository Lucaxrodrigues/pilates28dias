
'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

const options = [
  { id: 'iniciante', label: '😬 Sou iniciante, nunca pratiquei Pilates.' },
  { id: 'regular_nova_abordagem', label: '🙂 Eu pratico regularmente, mas estou buscando uma nova abordagem.' },
  { id: 'rotina_nao_fixa', label: '🙂 Já fiz algumas aulas, mas não tenho uma rotina fixa.' },
  { id: 'experiente', label: '💪 Tenho muita experiência e quero algo desafiador e prático.' },
];

export default function QuizQuestionTwoPage() {
  const router = useRouter();

  const handleOptionClick = (optionId: string) => {
    // Aqui você pode salvar a resposta do usuário (por exemplo, no localStorage ou em um estado global)
    console.log('Opção selecionada:', optionId);
    router.push('/quiz/3'); // Navega para a próxima pergunta
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white text-center px-4 sm:px-6 lg:px-8">
      <main className="flex flex-col items-center justify-center flex-grow w-full max-w-2xl space-y-6 py-8 animate-in fade-in duration-700">
        <Image
          src="/DM_20250826133017_001.png"
          alt="Logo do Programa"
          width={150}
          height={75}
          data-ai-hint="logo pilates"
          className="mb-4"
        />

        <div className="w-full px-4">
          <Progress value={15} className="h-4 bg-gray-200" indicatorClassName="bg-[#52FF00]" />
        </div>

        <h2 className="text-2xl font-bold text-center">Você já experimentou Pilates de Parede antes?</h2>

        <div className="flex flex-col w-full max-w-md space-y-4 pt-4">
          {options.map((option) => (
            <Button
              key={option.id}
              variant="outline"
              size="lg"
              className="w-full h-auto min-h-[4rem] text-lg justify-start p-4 bg-white border border-gray-300 hover:border-blue-500 hover:bg-gray-50 text-gray-800 text-left whitespace-normal"
              onClick={() => handleOptionClick(option.id)}
            >
              <span className="text-2xl mr-4">{option.label.split(' ')[0]}</span>
              <span>{option.label.substring(option.label.indexOf(' ') + 1)}</span>
            </Button>
          ))}
        </div>
      </main>
    </div>
  );
}
