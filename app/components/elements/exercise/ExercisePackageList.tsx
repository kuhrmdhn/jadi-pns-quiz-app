"use client"
import useFetch from '@/app/utils/hooks/useFetch';
import React from 'react';
import BannerImage from '../banner/BannerImage';
import ExercisePackageCard from './ExercisePackageCard';
import { Exercise } from '@/app/types/exerciseType';
import { motion } from "framer-motion"

type Props = {
    category: "TWK" | "TIU" | "TKP";
}

const subCategory = {
    TWK: {
        description: "Tes Wawasan Kebangsaan",
        gradient: "from-[rgba(255,255,255,0.2)] to-[#FE772E]",
    },
    TIU: {
        description: "Tes Intelegensia Umum",
        gradient: "from-[rgba(255,255,255,0.2)] to-[#5654CC]",
    },
    TKP: {
        description: "Tes Karakteristik Pribadi",
        gradient: "from-[rgba(255,255,255,0.2)] to-[#7562F3]",
    },
}

export default function ExercisePackageList({ category }: Props) {
    const { response, loading, error } = useFetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/question/question-list/${category}`);

    if (error) throw new Error(error.message);

    return (
        <div className='min-h-screen w-full bg-white-darken'>
            <section className="h-[75svh] w-full relative overflow-hidden">
                <BannerImage
                    source={`/assets/${category.toLowerCase()}_banner.png`}
                />
                <div className={`absolute capitalize text-4xl font-bold text-white-darken flex flex-col justify-center items-center top-0 z-10 w-full h-full bg-gradient-to-b ${subCategory[category].gradient}`}>
                    <h1>{category}</h1>
                    <p>{subCategory[category].description}</p>
                </div>
            </section>
            <section className="pt-10 px-4">
                <h1 className='font-bold text-3xl'>Paket Soal {category}</h1>
                {
                    loading ? <Loading /> :
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 w-full min-h-[25svh]">
                            {
                                response.data.map((exercise: Exercise, i: number) => (
                                    <motion.section
                                        initial={{ opacity: 0, y: 120 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: i / 10 }}
                                        key={exercise.id}
                                    >
                                        <ExercisePackageCard
                                            exercise={exercise}
                                        />
                                    </motion.section>
                                ))
                            }
                        </div>
                }
            </section>
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