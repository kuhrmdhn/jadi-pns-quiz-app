"use client"
import useFetch from '@/utils/hooks/useFetch';
import { Exercise, ExerciseCategoryEnum } from '@/utils/schema/exerciseSchema';
import ExerciseCard from './ExerciseCard';

type Props = {
    category: ExerciseCategoryEnum;
}

export default function ExerciseTopicList({ category }: Props) {
    const { response, error } = useFetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/exercise/exercise-list/${category}/topic`);
    if (error) throw new Error(error.message);

    return (
        <div className='min-h-fit w-full bg-white-darken'>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 w-full min-h-[25svh]">
                {
                    response?.data.map((exercise: Exercise) => (
                        <section
                            key={exercise.id}
                        >
                            <ExerciseCard
                                exercise={exercise}
                            />
                        </section>
                    ))
                }
            </div>
        </div>
    );
}