
'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

const options = [
  { id: '18-29', label: '18 a 29 anos' },
  { id: '30-40', label: '30 a 40 anos' },
  { id: '41-50', label: '41 a 50 anos' },
  { id: '51-60', label: '51 a 60 anos' },
  { id: 'mais_60', label: 'Mais de 60 anos' },
];

export default function QuizQuestionOnePage() {
  const router = useRouter();

  const handleOptionClick = (optionId: string) => {
    // Aqui você pode salvar a resposta do usuário (por exemplo, no localStorage ou em um estado global)
    console.log('Opção selecionada:', optionId);
    router.push('/quiz/2'); // Navega para a próxima pergunta
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
          <Progress value={20} className="h-4 bg-gray-200" indicatorClassName="bg-[#52FF00]" />
        </div>

        <h2 className="text-2xl font-bold">Perfeito!!</h2>
        <p className="text-lg">Vamos lá... Qual é a sua idade/ faixa etária?</p>

        <div className="flex flex-col w-full max-w-md space-y-4 pt-4">
          {options.map((option, index) => (
            <Button
              key={option.id}
              variant="outline"
              size="lg"
              className="w-full h-16 text-lg justify-start p-4 bg-white border border-gray-300 hover:border-blue-500 hover:bg-gray-50 text-gray-800"
              onClick={() => handleOptionClick(option.id)}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-md bg-[#007BFF] flex items-center justify-center mr-4">
                  <span className="text-white font-bold">{index + 1}</span>
                </div>
                <span>{option.label}</span>
              </div>
            </Button>
          ))}
        </div>
      </main>
    </div>
  );
}
