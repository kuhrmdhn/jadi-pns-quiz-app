import { Button } from '@/components/ui/button';
import { ButtonIconAnimation } from '@/components/ui/button-icon-animation';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, PersonStanding, ArrowUpRight, Puzzle, Scroll, Swords } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

type LearningLists = {
    id?: number
    url: string
    icon: React.ReactNode
    title: string
    description: string
    cta: string
}

export default function LearningList() {
    return (
        <section>
            <div className='mb-4'>
                <h1 className='text-xl font-bold mb-1 inline-flex gap-2 items-center'>
                    <Swords className='text-primary' />
                    Asah Pedangmu!
                </h1>
                <p>Tingkatkan kemampuanmu sebelum terjun ke medan ujian. Pelajari, pahami, dan menangkan!</p>
            </div>
            <div className="w-full h-fit flex flex-wrap gap-10 items-center">
                {
                    learningLists.map((learning) => (
                        <LearningCard
                            key={learning.id}
                            {...learning}
                        />
                    ))
                }
            </div>
        </section>
    )
}

function LearningCard({ url, title, description, cta, icon }: LearningLists) {
    return (
        <Card className="w-96">
            <CardHeader>
                <CardTitle className='flex items-center gap-3'>
                    {icon}{title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm leading-relaxed text-justify">
                    {description}
                </p>
            </CardContent>
            <CardFooter>
                <Link href={url}>
                    <ButtonIconAnimation
                        icon={<ArrowUpRight />}
                    >
                        <h6>
                            {cta}
                        </h6>
                    </ButtonIconAnimation>
                </Link>
            </CardFooter>
        </Card>
    );
}

const learningLists: LearningLists[] = [
    {
        id: 1,
        url: "/",
        icon: <Scroll />,
        title: "TWK - Wawasan Kebangsaan",
        description: "Pelajari materi seputar Pancasila, UUD 1945, Bhinneka Tunggal Ika, dan NKRI. Tingkatkan pemahamanmu sebelum menghadapi tes!",
        cta: "Uji Nasionalismu!",
    },
    {
        id: 2,
        url: "/",
        icon: <Puzzle />,
        title: "TIU - Intelegensi Umum",
        description: "Asah kemampuan logika, numerik, verbal, dan analisis. Tingkatkan intelegensimu untuk menghadapi soal-soal menantang!",
        cta: "Asah Logikamu!",
    },
    {
        id: 3,
        url: "/",
        icon: <PersonStanding />,
        title: "TKP - Karakteristik Pribadi",
        description: "Kenali dirimu lebih dalam dengan mempelajari soal-soal yang menguji sikap, etika kerja, dan kemampuan interpersonal.",
        cta: "Kenali Dirimu!",
    },
]
