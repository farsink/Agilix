import React, { useState } from "react";
import { Milestone } from "../milestone/milestone";
import { Target } from "lucide-react";

const CircleProgress: React.FC<{
  value: number;
  size?: number;
  strokeColor?: string;
}> = ({ value, size = 60, strokeColor = "#ffffff" }) => {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className='relative inline-flex items-center justify-center flex-shrink-0'>
      <svg width={size} height={size} className='transform -rotate-90'>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill='none'
          stroke='rgba(255, 255, 255, 0.2)'
          strokeWidth='3'
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill='none'
          stroke={strokeColor}
          strokeWidth='3'
          strokeLinecap='round'
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{
            transition: "stroke-dashoffset 0.5s ease-in-out",
          }}
        />
      </svg>
      <div className='absolute inset-0 flex items-center justify-center'>
        <span className='text-white font-bold text-sm'>
          {Math.round(value)}%
        </span>
      </div>
    </div>
  );
};

interface MilestoneCardProps {
  milestone: Milestone;
  onComplete?: (id: number) => void;
  gradientColors: string;
}

const MilestoneCard: React.FC<MilestoneCardProps> = ({
  milestone,
  onComplete,
  gradientColors,
}) => {
  const [showConfetti, setShowConfetti] = useState(false);

  const progressPercentage = Math.round(
    (milestone.current / milestone.target) * 100
  );
  const isNearCompletion = progressPercentage >= 80 && !milestone.isCompleted;

  const handleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onComplete) {
      onComplete(milestone.id);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  const formatProgress = () => {
    if (milestone.category === "steps") {
      return `${milestone.current.toLocaleString()} / ${milestone.target.toLocaleString()}`;
    }
    return `${milestone.current} / ${milestone.target}`;
  };

  const ariaLabel = `Milestone: ${milestone.title}, ${formatProgress()}`;

  return (
    <div className='relative' aria-label={ariaLabel}>
      {showConfetti && (
        <div className='absolute inset-0 pointer-events-none z-50'>
          <div className='confetti-animation'>
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className='absolute w-2 h-2 animate-bounce'
                style={{
                  left: `${Math.random() * 100}%`,
                  backgroundColor:
                    i % 3 === 0
                      ? "#FF6200"
                      : i % 3 === 1
                      ? "#FFD700"
                      : "#FFA500",
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div
        className='relative w-[280px] sm:w-[320px] md:w-[280px] h-[140px] sm:h-[160px] md:h-[140px] rounded-2xl shadow-lg flex items-center p-6 transition-all duration-300 transform hover:scale-[1.02] overflow-hidden'
        style={{
          background: gradientColors,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Near completion star */}
        {isNearCompletion && (
          <div className='absolute top-3 right-3 animate-pulse z-10'>
            <svg
              width='16'
              height='16'
              viewBox='0 0 22 22'
              fill='rgba(255, 255, 255, 0.9)'
            >
              <path d='M11 2l2.39 6.79H20l-5.2 3.84 2.39 6.79L11 15.58l-6.19 3.84 2.39-6.79L2 8.79h6.61z' />
            </svg>
          </div>
        )}

        {/* Completed trophy */}
        {milestone.isCompleted && (
          <div className='absolute top-3 right-3 z-10'>
            <svg width='18' height='18' viewBox='0 0 24 24' fill='none'>
              <path
                d='M7 21h10m-5-6a6 6 0 0 0 6-6V5H6v4a6 6 0 0 0 6 6z'
                stroke='rgba(255, 255, 255, 0.9)'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        )}

        {/* Left side - Circular Progress */}
        <div className='flex items-center justify-center flex-shrink-0'>
          <CircleProgress
            value={progressPercentage}
            size={64}
            strokeColor='rgba(255, 255, 255, 0.9)'
          />
        </div>

        {/* Right side - Text Content */}
        <div className='flex-1 ml-6 flex flex-col justify-center'>
          <h3 className='text-white font-bold text-lg leading-tight mb-1'>
            {milestone.title}
          </h3>
          <p className='text-white/80 text-sm mb-2'>{formatProgress()}</p>

          {!milestone.isCompleted && (
            <button
              className='self-start bg-white/20 hover:bg-white/30 text-white text-xs py-1 px-3 rounded-full transition-colors flex items-center gap-1 backdrop-blur-sm'
              onClick={handleComplete}
            >
              <Target className='w-3 h-3' />
              Complete
            </button>
          )}

          {milestone.isCompleted && (
            <div className='text-white/90 text-xs'>
              🎉 Completed{" "}
              {milestone.completedDate
                ? new Date(milestone.completedDate).toLocaleDateString()
                : "recently"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MilestoneCard;
