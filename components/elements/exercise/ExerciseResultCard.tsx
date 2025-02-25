import { Exercise } from '@/utils/store/useUserStore';
import { Rubik } from 'next/font/google';
import { AiFillWarning } from "react-icons/ai";
import { GiPodiumSecond, GiStarMedal } from "react-icons/gi";
import { HiOutlinePresentationChartLine } from "react-icons/hi";

const rubik = Rubik({
    weight: ["300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"]
})

export default function ExerciseResultCard(exercise: Exercise) {
    const { name, score, max_score } = exercise
    const scorePercentage = score / max_score * 100

    let Icon, iconColor

    switch (true) {
        case scorePercentage <= 25:
            Icon = AiFillWarning;
            iconColor = 'text-red-600';
            break;
        case (scorePercentage <= 50):
            Icon = HiOutlinePresentationChartLine;
            iconColor = 'text-pink-700';
            break;
        case (scorePercentage <= 85):
            Icon = GiPodiumSecond;
            iconColor = 'text-orange-400';
            break;
        default:
            Icon = GiStarMedal;
            iconColor = 'text-yellow-500';
            break;
    }

    return (
        <section className={`w-max min-w-72 h-28 p-4 shadow-lg rounded-2xl flex ${rubik.className}`}>
            <div className='w-3/4 xl:w-4/5 h-full'>
                <div className='flex flex-row items-center justify-between'>
                    <h1>{name}</h1>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-base xl:text-lg font-semibold">Skor: {score} / {max_score}</p>
                    <progress className="progress progress-primary bg-gray-100" value={score} max={max_score}></progress>
                </div>
            </div>
            <div className='flex justify-center items-center h-full w-1/5'>
                <Icon className={`${iconColor} text-3xl`} />
            </div>
        </section>
    )
}
