import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ExerciseCategoryEnum } from '@/utils/schema/exerciseSchema'
import ExerciseLists from '@/components/elements/exercise-list-page/ExerciseLists'

type PageProps = {
  params: Promise<{
    exerciseCategory: keyof typeof ExerciseCategoryEnum
  }>;
};

export default async function QuestionTopicPage({ params }: PageProps) {
  const { exerciseCategory } = await params

  const validCategory = ExerciseCategoryEnum[exerciseCategory];

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
      <TabsContent value="exercisePackage">
        <ExerciseLists type="package" category={validCategory} />
      </TabsContent>
      <TabsContent value="exerciseTopic">
        <ExerciseLists type="topic" category={validCategory} />
      </TabsContent>
    </Tabs>
  );
}
