import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { workouts } from "./workout";
import WorkoutCard from "./WorkoutCard";

export function WorkoutPlan() {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: false,
    inViewThreshold: 0.7,
  });

  return (
    <div className='overflow-hidden -ml-4' ref={emblaRef}>
      <div className='flex'>
        {workouts.map((workout) => (
          <div
            className='flex-[0_0_calc(50%-8px)] sm:flex-[0_0_calc(50%-12px)] md:flex-[0_0_calc(33.333%-16px)] lg:flex-[0_0_calc(25%-16px)] min-w-0 pl-4'
            key={workout.id}
          >
            <WorkoutCard workout={workout} />
          </div>
        ))}
      </div>
    </div>
  );
}
