import { Button } from "@/components/ui/button";
import { ButtonIconAnimation } from "@/components/ui/button-icon-animation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert, Target, Brain, Sword } from "lucide-react";
import Link from "next/link";

type ExerciseLists = {
    id: number
    title: string
    description: string
    cta: string
    icon: React.ReactNode
    url: string
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
            <div className="flex flex-wrap gap-10">
                {
                    exerciseLists.map((exercise) => (
                        <ExerciseCard
                            key={exercise.id}
                            {...exercise}
                        />
                    ))
                }
            </div>
        </section>
    );
}

function ExerciseCard({ title, url, icon, cta, description }: ExerciseLists) {
    return (
        <Card className="relative w-96">
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
                        icon={<Sword className="rotate-90"/>}
                    >
                        {cta}
                    </ButtonIconAnimation>
                </Link>
            </CardFooter>
        </Card>
    )
}

const exerciseLists: ExerciseLists[] = [
    {
        id: 1,
        title: "TWK - Wawasan Kebangsaan",
        description: "Uji ketangguhan nasionalismu di medan soal TWK. Pahami dasar negara untuk bertahan!",
        cta: "Masuki Arena!",
        icon: <ShieldAlert />,
        url: "/"
    },
    {
        id: 2,
        title: "TIU - Intelegensi Umum",
        description: "Tantang logikamu! Pecahkan soal dengan strategi dan kecepatan.",
        cta: "Mulai Pertarungan!",
        icon: <Target />,
        url: "/"
    },
    {
        id: 3,
        title: "TKP - Karakteristik Pribadi",
        description: "Hadapi tes yang mengukur ketangguhan dan keputusanmu dalam situasi sulit.",
        cta: "Buktikan Dirimu!",
        icon: <Brain />,
        url: "/"
    },
];