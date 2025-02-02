"use client";
import BannerImage from "./components/elements/banner/BannerImage";
import TextSlideShow from "./components/elements/banner/TextSlideShow";
import TopicList from "./components/elements/question/TopicList";

export default function Home() {
  return (
    <section className="bg-white-darken">
      <div className="h-[75svh] w-full relative overflow-hidden">
        <TextSlideShow/>
        <BannerImage/>
      </div>
      <div>
        <TopicList/>
      </div>
    </section>
  );
}
