import React from "react";
import { Workout } from "./workout";
import { Timer } from "lucide-react";

interface WorkoutCardProps {
  workout: Workout;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  const progressDots = Array.from(
    { length: workout.sets },
    (_, i) => i < workout.completedSets
  );

  return (
    <div className='bg-white rounded-[24px] shadow-lg overflow-hidden h-64 relative animate-scale-in'>
      <div className='w-full h-full relative'>
        <img
          src={workout.image}
          alt={workout.title}
          className='w-full h-full object-cover'
        />

        {/* Bottom gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent'></div>

        {/* Bottom content */}
        <div className='absolute bottom-0 left-0 right-0 p-4 text-white'>
          <h3 className='text-lg font-bold mb-1'>{workout.title}</h3>
          <p className='text-sm text-white/90 mb-3'>
            {workout.sets} sets × {workout.reps} reps
          </p>

          <div className='flex items-center justify-between'>
            <div className='flex space-x-1.5'>
              {progressDots.map((isCompleted, index) => (
                <div
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full ${
                    isCompleted ? "bg-[#F88923]" : "bg-white/40"
                  }`}
                ></div>
              ))}
            </div>
            <button
              title='Time'
              className='bg-[#F88923] text-white rounded-full p-2 hover:bg-green-600 transition-colors'
            >
              <Timer size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
