import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ExercisePackageList from '@/components/elements/exercise-list-page/ExercisePackageList'
import { ExerciseCategoryEnum } from '@/app/api/routes/exercise/utils/exerciseSchema'
import ExerciseTopicList from '@/components/elements/exercise-list-page/ExerciseTopicList'

export default async function QuestionTopicPage({ params }: { params: { exerciseCategory: keyof typeof ExerciseCategoryEnum } }) {
  const { exerciseCategory } = await params
  return (
    <Tabs defaultValue='exercisePackage' className='pt-2'>
      <TabsList className="w-full flex justify-center">
        <TabsTrigger value="exercisePackage">
          Paket Soal
        </TabsTrigger>
        <TabsTrigger value="exerciseTopic">
          Topik Soal
        </TabsTrigger>
      </TabsList>
      <TabsContent value="exercisePackage" >
        <ExercisePackageList category={ExerciseCategoryEnum[exerciseCategory]} />
      </TabsContent>
      <TabsContent value="exerciseTopic" >
        <ExerciseTopicList category={ExerciseCategoryEnum[exerciseCategory]}/> 
      </TabsContent>
    </Tabs>
  )
}