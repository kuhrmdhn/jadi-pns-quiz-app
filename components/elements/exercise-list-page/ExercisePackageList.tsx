"use client"
import useFetch from '@/utils/hooks/useFetch';
import ExerciseCard from './ExerciseCard';
import { Exercise, ExerciseCategoryEnum } from '@/utils/schema/exerciseSchema';
import Loading from '@/components/ui/loading';

type Props = {
    category: ExerciseCategoryEnum;
}

export default function ExercisePackageList({ category }: Props) {
    const { response, loading, error } = useFetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/exercise/exercise-list/${category}/package`,{cache: "force-cache"});
    if (error) throw new Error(error.message);

    return (
        <div className='min-h-fit w-full bg-white-darken'>
            {
                loading ? <Loading /> :
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 w-full min-h-[25svh]">
                        {
                            response.data.map((exercise: Exercise) => (
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
            }
        </div>
    );
}