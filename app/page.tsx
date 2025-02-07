"use client";
import BannerImage from "./components/elements/banner/BannerImage";
import TextSlideShow from "./components/elements/banner/TextSlideShow";
import ExerciseResultList from "./components/elements/exercise/ExerciseResultList";
import ExerciseCategoryList from "./components/elements/exercise/ExerciseCategoryList";

export default function Home() {
  return (
    <section className="bg-white-darken">
      <div className="h-[50svh] lg:h-[75svh] w-full relative overflow-hidden">
        <TextSlideShow />
        <BannerImage 
          source="/assets/banner.png"
        />
      </div>
      <div className="px-5 xl:px-10 pt-7 flex flex-col gap-7">
        <ExerciseCategoryList />
        <ExerciseResultList/>
      </div>
    </section>
  );
}
