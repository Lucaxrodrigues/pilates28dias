
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
  { id: 'flacidez', emoji: '😁', label: 'Perder flacidez' },
  { id: 'emagrecer', emoji: '🔥', label: 'Emagrecer' },
  { id: 'flexivel', emoji: '😬', label: 'Ser mais flexível' },
  { id: 'dores', emoji: '😟', label: 'Acabar com as dores' },
  { id: 'rejuvenescer', emoji: '🌿', label: 'Rejuvenescer meu corpo' },
  { id: 'disposicao', emoji: '💪', label: 'Aumentar a disposição no dia a dia' },
  { id: 'envelhecimento', emoji: '👳', label: 'Evitar o envelhecimento precoce' },
  { id: 'melhoras_rapidas', emoji: '⏰', label: 'Melhoras no corpo em pouco tempo' },
];

export default function QuizQuestionThreePage() {
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
    router.push('/quiz/4'); // Navega para a próxima pergunta
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
          <Progress value={23} className="h-4 bg-gray-200" indicatorClassName="bg-[#52FF00]" />
        </div>

        <h2 className="text-2xl font-bold">Qual é o seu principal objetivo?</h2>
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
