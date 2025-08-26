'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';

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
    }, 100); // Update progress every 100ms for a 10s total duration

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        router.push('/results');
      }, 500); // Short delay before redirecting
    }
  }, [progress, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4 sm:px-6 lg:px-8">
      <main className="flex flex-col items-center justify-center flex-grow w-full max-w-md space-y-6">
        <Image
          src="/DM_20250826133017_001.png"
          alt="Logo do Programa"
          width={150}
          height={75}
          data-ai-hint="logo pilates"
        />
        <h2 className="text-2xl font-bold">Analisando suas respostas...</h2>
        <div className="w-full space-y-2">
            <Progress value={progress} className="h-4 bg-gray-200" indicatorClassName="bg-[#52FF00]" />
            <p className="text-lg font-semibold">{Math.round(progress)}%</p>
        </div>
        <p className="text-md text-gray-600">Isso leva poucos segundos</p>
      </main>
    </div>
  );
}
