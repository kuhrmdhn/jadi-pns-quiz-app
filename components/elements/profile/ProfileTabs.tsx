import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import UserCompletedExercise from './UserCompletedExercise'

export default function ProfileTabs() {
    return (
        <Tabs defaultValue={"completedExercise"}>
            <TabsList className='w-full flex justify-center'>
                <TabsTrigger value="completedExercise">Riwayat Tes</TabsTrigger>
            </TabsList>
            <TabsContent value="completedExercise">
                <UserCompletedExercise/>
            </TabsContent>
        </Tabs>
    )
}
