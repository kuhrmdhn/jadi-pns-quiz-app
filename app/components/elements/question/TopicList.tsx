import React from 'react'
import { FaBalanceScale, FaBrain } from 'react-icons/fa'
import QuestionTopicCard from './QuestionTopicCard'

export default function TopicList() {
    const cardData = [
        {
            id: 1,
            title: "TWK",
            description: "Tes Wawasan Kebangsaan",
            icon: <FaBalanceScale />,
            className: "bg-gradient-to-tr from-[#FE6F2D] to-[#FDCE38]"
        },
        {
            id: 2,
            title: "TIU",
            description: "Tes Intelegensi Umum",
            icon: <FaBrain />,
            className: "bg-gradient-to-tr from-[#5B49CF] to-[#23D3A4]"
        },
        {
            id: 3,
            title: "TKP",
            description: "Tes Karakteristik Pribadi",
            icon: <FaBalanceScale />,
            className: "bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500"
        }
    ]

    return (
        <section className='pl-12 pt-10 flex flex-col gap-5 h-[40svh]'>
            <h1 className='text-xl'>Belajar Sesuai Topik</h1>
            <div className='w-full h-fit flex gap-5 justify-center'>
                {
                    cardData.map((card) => (
                        <QuestionTopicCard
                            key={card.id}
                            icon={card.icon}
                            title={card.title}
                            description={card.description}
                            className={card.className}
                        />
                    ))
                }
            </div>
        </section>
    )
}
