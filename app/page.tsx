"use client"
import ExerciseList from "@/components/elements/home-page/ExerciseList";
import LearningList from "@/components/elements/home-page/LearningList";

export default function Home() {
  return (
    <section className=" w-full min-h-dvh h-auto">
      <div className="p-5 md:p-10 flex flex-col gap-7">
        <LearningList />
        <ExerciseList />
      </div>
    </section>
  );
}