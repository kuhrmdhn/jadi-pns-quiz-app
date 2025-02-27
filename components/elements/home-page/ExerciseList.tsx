import { ButtonIconAnimation } from "@/components/ui/button-icon-animation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { navigation, NavigationContent } from "@/constant/navigationListData";
import { ShieldAlert, Target, Brain, Sword } from "lucide-react";
import Link from "next/link";

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
            <div className="flex flex-wrap gap-10 justify-center items-center sm:justify-start">
                {
                    navigation[1].content.map((exercise, i) => (
                        <ExerciseCard
                            key={exercise.id}
                            title={exercise.title}
                            url={exercise.url}
                            description={exerciseCard[i].description}
                            icon={exerciseCard[i].icon}
                            cta={exerciseCard[i].cta}
                        />
                    ))
                }
            </div>
        </section>
    );
}

function ExerciseCard({ title, url, icon, cta, description }: ExerciseCard & NavigationContent) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className='flex items-center gap-3'>
                    {icon}{title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-justify">{description}</p>
            </CardContent>
            <CardFooter>
                <Link href={url}>
                    <ButtonIconAnimation
                        icon={<Sword className="rotate-90" />}
                    >
                        {cta}
                    </ButtonIconAnimation>
                </Link>
            </CardFooter>
        </Card>
    )
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