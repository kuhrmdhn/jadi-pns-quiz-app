"use client"
import { Question } from '@/app/types/questionType'
import { firestore } from '@/app/utils/firebase/firebase'
import { useUserStore } from '@/app/utils/store/useUserStore'
import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { useShallow } from 'zustand/shallow'

export default function QuestionCard() {
    const { userData } = useUserStore(useShallow((state) => ({
        userData: state.userData
    })))
    // useEffect(() => {
    //     const cek = async () => {
    //         const { id } = userData
    //         if (id) {
    //             const testCompletedCollection = collection(firestore, `users/${id}/test_completed`)
    //             const test_completed = await getDocs(testCompletedCollection).then(data => data.docs.map(doc => doc.data()))
    //             console.log(test_completed)
    //         }
    //     }
    //     cek()
    // })
    return (
        <div className='w-[27rem] h-32 bg-white shadow-lg shadow-gray-300 rounded-md flex justify-center'>
            <div className='w-2/3 h-full flex justify-center flex-col'>
                <h1>Paket 1</h1>
                <h2 className='text-xs'>Kategori Soal: <span className='font-bold'>TWK</span></h2>
                <h2 className='text-xs'>Jumlah Soal: <span className='font-bold'>25</span></h2>
                <h2 className='text-xs'>Waktu: <span className='font-bold'>2 Menit</span></h2>
            </div>
            <div className='w-1/3 h-full flex items-center justify-center flex-col'>
                <h3>
                    20/25
                </h3>
                <progress className="progress progress-primary w-1/2 bg-blue-200" value={(20 / 25) * 100} max="100"></progress>
            </div>
        </div>
    )
}
