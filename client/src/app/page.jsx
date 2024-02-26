/** @format */

import NavbarComponent from "@/components/navbar";
import EventListComponent from "@/components/eventList";
import SliderComponent from "@/components/slider";

export const metadata = {
  title: "Kickavenue - Home",
  description: "tempat jualan sepatu",
};

export default function Home() {
  return (
    <>
      <NavbarComponent />
      <div className="flex flex-col justify-center max-w-screen-2xl w-full items-center m-auto">
        <SliderComponent />
        <EventListComponent />
      </div>
    </>
  );
}
