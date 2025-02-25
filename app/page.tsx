import ExerciseList from "@/components/elements/home-page/ExerciseList";
import LearningList from "@/components/elements/home-page/LearningList";
import Navbar from "@/components/elements/home-page/Navbar";

export default function Home() {
  return (
    <section className=" w-full min-h-screen h-full">
      <Navbar />
      <div className="px-10 pt-10 flex flex-col gap-7">
        <LearningList />
        <ExerciseList/>
      </div>
    </section>
  );
}