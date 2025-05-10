import { navigation } from "@/constant/navigationListData";
import { Brain, ShieldAlert, Target } from "lucide-react";
import HomeCard from "./HomeCard";

type ExerciseCard = {
    description: string
    cta: string
    icon: React.ReactNode
}

export default function ExerciseList() {
    return (
        <section>
            <div className="mb-4">
                <h1 className="text-xl mb-1 font-bold inline-flex gap-2 items-center">
                    <ShieldAlert className="text-primary" strokeWidth={3} />
                    Saatnya Berperang!
                </h1>
                <p>Bersiaplah menghadapi medan tempur soal-soal menantang ini. Fokus, strategi, dan kecepatan adalah kuncinya!</p>
            </div>
            <div className="w-full h-fit flex flex-wrap gap-5 items-center justify-center sm:justify-start">
                {
                    navigation[1].content.map((exercise, i) => (
                        <HomeCard
                            key={exercise.id}
                            title={exercise.title}
                            url={exercise.url}
                            subTitle={exercise.subTitle}
                            description={exerciseCard[i].description}
                            icon={exerciseCard[i].icon}
                        />
                    ))
                }
            </div>
        </section>
    );
}

const exerciseCard: ExerciseCard[] = [
    {
        description: "Uji ketangguhan nasionalismu di medan soal TWK. Pahami dasar negara untuk bertahan!",
        cta: "Masuki Arena!",
        icon: <ShieldAlert />,
    },
    {
        description: "Tantang logikamu! Pecahkan soal dengan strategi dan kecepatan.",
        cta: "Mulai Pertarungan!",
        icon: <Target />,
    },
    {
        description: "Hadapi tes yang mengukur ketangguhan dan keputusanmu dalam situasi sulit.",
        cta: "Buktikan Dirimu!",
        icon: <Brain />,
    },
];