import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export default function CheckoutPage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-white text-center px-4 sm:px-6 lg:px-8 py-12">
      <main className="flex flex-col items-center justify-center w-full max-w-3xl space-y-8 animate-in fade-in duration-700">
        <Image
          src="/DM_20250826133017_001.png"
          alt="Logo do Programa"
          width={150}
          height={75}
          data-ai-hint="logo pilates"
        />

        <h2 className="text-2xl font-bold" style={{ color: '#E836D7' }}>
          Parabéns por ter chegado até aqui!
        </h2>

        <p className="text-lg">
          Seu plano personalizado está pronto e te esperando{' '}
          <span className="underline">
            para você começar hoje mesmo e mudar de vida em 2025!
          </span>
        </p>

        <h3 className="text-xl font-bold">
          Confira abaixo tudo que você vai receber:
        </h3>

        <Image
          src="/DM_20250826151131_001.png"
          alt="O que você vai receber"
          width={600}
          height={400}
          className="rounded-lg shadow-lg"
          data-ai-hint="product content offer"
        />

        <h3 className="text-xl font-bold">
          Vídeos demonstrativos com profissionais
        </h3>
        
        <Image
          src="/DM_20250826151134_001.png"
          alt="Vídeos demonstrativos"
          width={600}
          height={400}
          className="rounded-lg shadow-lg"
          data-ai-hint="video thumbnails pilates"
        />

        <h2 className="text-2xl font-bold">
          Apenas <span style={{ color: 'green' }}>HOJE</span>, você ganha 2
          bônus exclusivos, de <span style={{ color: 'green' }}>GRAÇA</span>!
        </h2>
        
        <p className="text-lg">Confira os bônus que você ganhou!</p>
        
        <Image
          src="/DM_20250826151133_001.gif"
          alt="Bônus"
          width={600}
          height={400}
          className="rounded-lg shadow-lg"
          data-ai-hint="bonus offer content"
        />
        
        <Image
          src="/DM_20250826152758_001.png"
          alt="Bônus adicional"
          width={600}
          height={400}
          className="rounded-lg shadow-lg"
          data-ai-hint="bonus offer content"
        />

        <h2 className="text-2xl font-bold underline">
            <span style={{ color: '#E836D7' }}>Programa Pilates na Parede Light 3.0</span> está mudando vidas
        </h2>
        
        <div className="flex flex-col items-center space-y-4 w-full">
            <Image
                src="/DM_20250826152000_001.png"
                alt="Depoimento 1"
                width={400}
                height={533}
                className="rounded-lg shadow-lg"
                data-ai-hint="testimonial social media"
            />
            <Image
                src="/DM_20250826152003_001.png"
                alt="Depoimento 3"
                width={400}
                height={533}
                className="rounded-lg shadow-lg"
                data-ai-hint="testimonial social media"
            />
            <Image
                src="/DM_20250826152006_001.png"
                alt="Depoimento 4"
                width={400}
                height={533}
                className="rounded-lg shadow-lg"
                data-ai-hint="testimonial social media"
            />
            <Image
                src="/DM_20250826152007_001.png"
                alt="Depoimento 5"
                width={400}
                height={533}
                className="rounded-lg shadow-lg"
                data-ai-hint="testimonial social media"
            />
             <Image
                src="/DM_20250826151138_001.png"
                alt="Prova social - Antes e Depois"
                width={400}
                height={267}
                className="rounded-lg shadow-lg"
                data-ai-hint="before after results"
            />
        </div>

        <h2 className="text-2xl font-bold">
          🚀 Agora é com VOCÊ! O que vai ser?{' '}
          <span style={{ color: '#E836D7' }}>Esperar</span> ou{' '}
          <span style={{ color: '#E836D7' }}>transformar seu corpo agora?</span>
        </h2>

        <p className="text-base max-w-2xl">
            Nós preparamos seu programa personalizado com profissionais experientes e qualificados! Aulas com máxima qualidade, e tudo que te ensinamos e recomendamos é feito em base de anos de estudos e resultados positivos!
        </p>

        <Card className="border-2 border-green-500 w-full">
            <CardHeader className="flex flex-row items-center space-x-3 pb-2 text-left">
                <span className="text-2xl">✅</span>
                <CardTitle>Nosso grande objetivo é...</CardTitle>
            </CardHeader>
            <CardContent className="text-base text-left">
                <p>Mudar a vida do máximo de pessoas possíveis! Por isso, não queremos que o PREÇO seja uma barreira para você ter uma vida mais saúdavel, livre de dores, doenças e que você consiga rejuvenescer seu corpo!</p>
            </CardContent>
        </Card>

        <Card className="border-2 border-green-500 w-full">
            <CardHeader className="flex flex-row items-center space-x-3 pb-2 text-left">
                 <span className="text-2xl">😁</span>
                <CardTitle>E para ter acesso a tudo isso!?</CardTitle>
            </CardHeader>
            <CardContent className="text-base text-left space-y-2">
                <p>
                    Pensando em <span className="underline">você</span>, nós decidimos te dar essa oportunidade por um preço mais do que especial! Hoje você terá acesso ao <span className="font-bold underline" style={{color: "#E836D7"}}>Programa Pilates na Parede Light 3.0</span>
                </p>
                <p className="text-center">Por apenas...</p>
            </CardContent>
        </Card>

        <div className="w-full max-w-xl border-2 border-gray-200 rounded-lg shadow-lg overflow-hidden">
            <div className="bg-[#E836D7] text-white font-bold p-2 text-center">
                Apenas HOJE!
            </div>
            <div className="bg-[#F0FFF4] p-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
                <div className="text-left">
                    <p className="text-xl font-bold">Programa Pilates na Parede Light 3.0</p>
                </div>
                <div className="bg-green-700 text-white p-4 rounded-lg text-center">
                    <p className="line-through">De 99,90 por:</p>
                    <p className="text-3xl font-bold">R$ 29,90 à vista</p>
                </div>
            </div>
             <div className="bg-[#F0FFF4] pb-4 text-center">
                <p className="text-lg">Ou apenas <strong className="text-green-600">7x de R$5,04</strong></p>
            </div>
        </div>

        <p className="text-lg font-bold underline text-center">
            Clique no botão e faça sua inscrição! 👇
        </p>


        <Link href="https://pay.cakto.com.br/4hq9554_540351" passHref className="w-full max-w-md pt-4">
            <Button
              size="lg"
              className="w-full h-20 text-2xl font-bold text-white shadow-lg"
              style={{ backgroundColor: '#00D053' }}
            >
              EU QUERO ESSA OPORTUNIDADE!
            </Button>
        </Link>
      </main>
    </div>
  );
}
