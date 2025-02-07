import { FaBalanceScale, FaBrain } from 'react-icons/fa'
import { IoIosPerson } from "react-icons/io";
import ExerciseCategoryCard from './ExerciseCategoryCard'

export default function ExerciseTopicList() {
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
            icon: <IoIosPerson />,
            className: "bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500"
        }
    ]

    return (
        <section className='home-section-container'>
            <h1 className='text-xl'>Latihan Sesuai Topik</h1>
            <div className='w-full h-fit flex gap-5 justify-center'>
                {
                    cardData.map((card) => (
                        <ExerciseCategoryCard
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
