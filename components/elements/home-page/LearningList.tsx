import { ButtonIconAnimation } from '@/components/ui/button-icon-animation';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { navigation, NavigationContent } from '@/constant/navigationListData';
import { ArrowUpRight, PersonStanding, Puzzle, Scroll, Swords } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type LearningLists = {
    icon: React.ReactNode
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
            <div className="w-full h-fit flex flex-wrap gap-10 items-center justify-center sm:justify-start">
                {
                    navigation[0].content.map((learning,i) => (
                        <LearningCard
                            key={learning.id}
                            title={learning.title}
                            subTitle={learning.subTitle}
                            url={learning.url}
                            cta={learningLists[i].cta}
                            description={learningLists[i].description}
                            icon={learningLists[i].icon}
                        />
                    ))
                }
            </div>
        </section>
    )
}

function LearningCard({ url, title, subTitle, description, cta, icon }: LearningLists & NavigationContent) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className='flex flex-col gap-3'>
                    <h1 className='inline-flex gap-3 items-center'>
                    {icon}{title}
                    </h1>
                    <h2>
                        {subTitle}
                    </h2>
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
        icon: <Scroll />,
        description: "Pelajari materi seputar Pancasila, UUD 1945, Bhinneka Tunggal Ika, dan NKRI. Tingkatkan pemahamanmu sebelum menghadapi tes!",
        cta: "Uji Nasionalismu!",
    },
    {
        icon: <Puzzle />,
        description: "Asah kemampuan logika, numerik, verbal, dan analisis. Tingkatkan intelegensimu untuk menghadapi soal-soal menantang!",
        cta: "Asah Logikamu!",
    },
    {
        icon: <PersonStanding />,
        description: "Kenali dirimu lebih dalam dengan mempelajari soal-soal yang menguji sikap, etika kerja, dan kemampuan interpersonal.",
        cta: "Kenali Dirimu!",
    },
]
