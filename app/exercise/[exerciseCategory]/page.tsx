import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ExerciseCategoryEnum } from '@/utils/schema/exerciseSchema'
import ExerciseLists from '@/components/elements/exercise-list-page/ExerciseLists'

type Props = {
  params: {
    exerciseCategory: keyof typeof ExerciseCategoryEnum
  }
}

export default async function QuestionTopicPage({ params }: Props) {
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
        <ExerciseLists type="package" category={ExerciseCategoryEnum[exerciseCategory]} />
      </TabsContent>
      <TabsContent value="exerciseTopic" >
        <ExerciseLists type="topic" category={ExerciseCategoryEnum[exerciseCategory]} />
      </TabsContent>
    </Tabs>
  )
}