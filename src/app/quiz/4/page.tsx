
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const options = [
  { id: 'falta_tempo', emoji: '⏰', label: 'Falta de tempo para me exercitar' },
  { id: 'falta_motivacao', emoji: '😐', label: 'Falta de motivação para seguir um plano fixo' },
  { id: 'nao_gosto_academia', emoji: '📱', label: 'Não gosto de ir à academia ou gastar com equipamentos' },
  { id: 'dificuldade_resultados', emoji: '😬', label: 'Dificuldade em ver resultados que me incentivem a continuar' },
  { id: 'dores_corpo', emoji: '😟', label: 'Sinto muitas dores no corpo' },
  { id: 'nao_sei_comecar', emoji: '❌', label: 'Não sei por onde começar' },
  { id: 'sem_resultados_rapidos', emoji: '😭', label: 'Nunca achei algo que me dê resultados rápidos' },
];

export default function QuizQuestionFourPage() {
  const router = useRouter();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleCheckboxChange = (optionId: string) => {
    setSelectedOptions((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handleContinueClick = () => {
    console.log('Opções selecionadas:', selectedOptions);
    router.push('/quiz/5'); // Navega para a próxima pergunta
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
          <Progress value={31} className="h-4 bg-gray-200" indicatorClassName="bg-[#52FF00]" />
        </div>

        <h2 className="text-2xl font-bold text-center">Quais são os maiores desafios que você enfrenta para manter uma rotina de exercícios?</h2>
        <p className="text-md text-gray-600">(Marque quantas opções quiser)</p>

        <div className="flex flex-col w-full max-w-md space-y-3 pt-4">
          {options.map((option) => (
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

        <div className="w-full max-w-md pt-4">
          <Button
            size="lg"
            className="w-full h-16 text-xl font-bold text-white bg-primary hover:bg-primary/90 shadow-lg"
            onClick={handleContinueClick}
          >
            Continuar ✅
          </Button>
        </div>
      </main>
    </div>
  );
}
