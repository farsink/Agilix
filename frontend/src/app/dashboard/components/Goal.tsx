import React from "react";
import { Goal } from "@/app/dashboard/TodaysActivity";

interface GoalCardProps {
  goal: Goal;
  onClick: () => void;
  className?: string;
}

export const GoalCard: React.FC<GoalCardProps> = ({
  goal,
  onClick,
  className,
}) => {
  const progress = (goal.current / goal.target) * 100;
  const isWaterCard = goal.id === "hydration";

  return (
    <div
      className={`rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer ${className} ${
        isWaterCard ? "relative overflow-hidden" : ""
      }`}
      style={{ backgroundColor: goal.backgroundColor }}
      onClick={onClick}
    >
      {/* Water card special background elements */}
      {isWaterCard && (
        <>
          {/* Floating water drops */}
          <div className='absolute top-4 right-4 opacity-10'>
            <div
              className='w-12 h-12 rounded-full'
              style={{ backgroundColor: goal.color }}
            ></div>
          </div>
          <div className='absolute top-16 right-8 opacity-5'>
            <div
              className='w-8 h-8 rounded-full'
              style={{ backgroundColor: goal.color }}
            ></div>
          </div>
          <div className='absolute bottom-20 left-4 opacity-8'>
            <div
              className='w-6 h-6 rounded-full'
              style={{ backgroundColor: goal.color }}
            ></div>
          </div>

          {/* Wave effect at bottom */}
          <div
            className='absolute bottom-0 left-0 right-0 h-8 opacity-10'
            style={{
              background: `linear-gradient(45deg, ${goal.color}40, ${goal.color}20)`,
              clipPath: "polygon(0 50%, 100% 80%, 100% 100%, 0% 100%)",
            }}
          ></div>
        </>
      )}

      {/* Header with icon and title */}
      <div className='flex items-center justify-between mb-4 relative z-10'>
        <div className='flex items-center gap-3'>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isWaterCard
                ? "shadow-lg transform hover:scale-110 transition-transform"
                : ""
            }`}
            style={{ backgroundColor: goal.color }}
          >
            <goal.icon className='w-5 h-5 text-white' />
          </div>
          <h3 className='text-base font-semibold text-gray-700'>
            {goal.title}
          </h3>
        </div>
      </div>

      {/* Main metric display - enhanced for water card */}
      <div
        className={`mb-4 relative z-10 ${
          isWaterCard ? "text-center mt-8" : ""
        }`}
      >
        <div className='flex items-baseline gap-2 justify-center'>
          <span
            className={`font-bold text-gray-800 font-mono ${
              isWaterCard ? "text-5xl" : "text-4xl"
            }`}
          >
            {goal.unit === "Hours" || goal.unit === "Liters"
              ? goal.current.toFixed(1)
              : Math.floor(goal.current)}
          </span>
          <span className='text-lg text-gray-500 font-medium'>{goal.unit}</span>
        </div>

        {/* Target display for water card */}
        {isWaterCard && (
          <div className='mt-2 text-sm text-gray-400'>
            of {goal.target} {goal.unit}
          </div>
        )}
      </div>

      {/* Enhanced progress indicator for water card */}
      <div
        className={`flex items-center justify-end relative z-10 ${
          isWaterCard ? "mt-8" : ""
        }`}
      >
        {isWaterCard ? (
          /* Vertical progress bar for water */
          <div className='flex flex-col items-center'>
            <div className='text-xs text-gray-500 mb-2'>
              {Math.round(progress)}%
            </div>
            <div className='w-3 h-16 bg-gray-200 rounded-full overflow-hidden'>
              <div
                className='w-full bg-gradient-to-t from-blue-400 to-blue-300 rounded-full transition-all duration-500 ease-out'
                style={{
                  height: `${Math.min(progress, 100)}%`,
                  backgroundColor: goal.color,
                }}
              ></div>
            </div>
          </div>
        ) : (
          /* Dot indicators for other cards */
          <div className='flex gap-1'>
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className='w-2 h-2 rounded-full'
                style={{
                  backgroundColor:
                    index < progress / 25 ? goal.color : "#E5E7EB",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
