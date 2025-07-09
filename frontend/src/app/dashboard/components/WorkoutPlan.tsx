import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import WorkoutCard from "./WorkoutCard";

import { useUserProfile } from "@/hooks/useUser";
import { UserResponse } from "../page";

export function WorkoutPlan() {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: false,
    inViewThreshold: 0.7,
  });

  const { data: user, isLoading } = useUserProfile() as {
    data: UserResponse;
    isLoading: boolean;
    error: { message: string };
  };

  const getCurrentDayWorkoutExercises = () => {
    const today = new Date().toLocaleString("en-US", { weekday: "long" });
    const currentDayWorkout = user?.data.WorkoutPlan.weeklySchedule.find(
      (workout) => workout.day.toLowerCase() === today.toLowerCase()
    );
    return currentDayWorkout?.exercises || [];
  };
  const workouts = getCurrentDayWorkoutExercises();
  

  return (
    <div className='overflow-hidden -ml-4' ref={emblaRef}>
      <div className='flex'>
        {workouts.map((workout, index) => (
          <div
            className='flex-[0_0_calc(50%-8px)] sm:flex-[0_0_calc(50%-12px)] md:flex-[0_0_calc(33.333%-16px)] lg:flex-[0_0_calc(25%-16px)] min-w-0 pl-4'
            key={index}
          >
            <WorkoutCard workout={workout} isLoading={isLoading} />
          </div>
        ))}
      </div>
    </div>
  );
}
