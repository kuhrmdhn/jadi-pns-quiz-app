"use client"
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ExercisePackageList from '@/components/elements/exercise-list-page/ExercisePackageList'
// import { ExerciseCategory } from '@/types/exerciseType'

export default function QuestionTopicPage() {
  // const { exerciseCategory } = await params
  function handleClick() {
    alert("Aku di klik")
  }

  return (
    <Tabs defaultValue='exercisePackage'>
      <TabsList>
        <TabsTrigger value="exercisePackage" onClick={handleClick}>
          Paket Soal
        </TabsTrigger>
        <TabsTrigger value="exerciseTopic">
          Topik Soal
        </TabsTrigger>
      </TabsList>
      <TabsContent value="exercisePackage">
          Semua
        {/* <ExercisePackageList category={ExerciseCategory[exerciseCategory]} /> */}
      </TabsContent>
      <TabsContent value="exerciseTopic">
        <h1>Topik</h1>
      </TabsContent>
    </Tabs>
  )
}