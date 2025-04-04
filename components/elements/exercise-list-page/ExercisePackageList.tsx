"use client"
import { ExerciseCategory } from '@/types/exerciseType';
import useFetch from '@/utils/hooks/useFetch';
import ExercisePackageCard from './ExercisePackageCard';
import { Exercise } from '@/app/api/routes/exercise/utils/exerciseSchema';

type Props = {
    category: ExerciseCategory;
}

export default function ExercisePackageList({ category }: Props) {
    const { response, loading, error } = useFetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/exercise/exercise-list/${category}`);
    if (error) throw new Error(error.message);

    return (
        <div className='min-h-screen w-full bg-white-darken'>
            <h1 className='font-bold text-3xl'>Paket Soal {category}</h1>
            {
                loading ? <Loading /> :
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 w-full min-h-[25svh]">
                        {
                            response.data.map((exercise: Exercise) => (
                                <section
                                    key={exercise.id}
                                >
                                    <ExercisePackageCard
                                        category={category}
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


function Loading() {
    return (
        <div className='h-[25svh] w-full flex justify-center items-center'>
            <span className="loading text-primary loading-dots loading-md"></span>
        </div>
    )
}