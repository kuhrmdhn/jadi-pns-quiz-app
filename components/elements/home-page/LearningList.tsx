import { navigation } from '@/constant/navigationListData';
import { PersonStanding, Puzzle, Scroll, Swords } from 'lucide-react';
import React from 'react';
import HomeCard from './HomeCard';

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
            <div className="w-full h-fit flex flex-wrap gap-5 items-center justify-center sm:justify-start">
                {
                    navigation[0].content.map((learning, i) => (
                        <HomeCard
                            key={learning.id}
                            title={learning.title}
                            subTitle={learning.subTitle}
                            url={learning.url}
                            description={learningLists[i].description}
                            icon={learningLists[i].icon}
                        />
                    ))
                }
            </div>
        </section>
    )
}

const learningLists = [
    {
        icon: <Scroll />,
        description: "Pelajari materi seputar Pancasila, UUD 1945, Bhinneka Tunggal Ika, dan NKRI. Tingkatkan pemahamanmu sebelum menghadapi tes!",
    },
    {
        icon: <Puzzle />,
        description: "Asah kemampuan logika, numerik, verbal, dan analisis. Tingkatkan intelegensimu untuk menghadapi soal-soal menantang!",
    },
    {
        icon: <PersonStanding />,
        description: "Kenali dirimu lebih dalam dengan mempelajari soal-soal yang menguji sikap, etika kerja, dan kemampuan interpersonal.",
    },
]
