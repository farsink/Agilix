import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  MoreHorizontal,
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  Square,
  Flame,
  Heart,
  Award,
  Clock,
} from "lucide-react";

interface Round {
  name: string;
  duration: string;
  imageUrl: string;
}

interface Workout {
  title: string;
  rounds: Round[];
}

interface WorkoutFlowProps {
  workout: Workout;
  onFinish: () => void;
}

const parseDuration = (duration: string): number => {
  const [minutes, seconds] = duration.split(":").map(Number);
  return minutes * 60 + seconds;
};

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
};

const WorkoutFlow: React.FC<WorkoutFlowProps> = ({ workout, onFinish }) => {
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const totalRounds = workout.rounds.length;
  const currentRound = workout.rounds[currentRoundIndex];

  const initialDuration = parseDuration(currentRound.duration);
  const [timeLeft, setTimeLeft] = useState(initialDuration);

  useEffect(() => {
    setTimeLeft(parseDuration(workout.rounds[currentRoundIndex].duration));
  }, [currentRoundIndex, workout.rounds]);

  useEffect(() => {
    if (timeLeft <= 0 || !isPlaying) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (currentRoundIndex < totalRounds - 1) {
      setCurrentRoundIndex((prev) => prev + 1);
      setIsPlaying(true);
    } else {
      onFinish();
    }
  };

  const handlePrevious = () => {
    if (currentRoundIndex > 0) {
      setCurrentRoundIndex((prev) => prev - 1);
      setIsPlaying(true);
    }
  };

  const handleRestart = () => {
    setTimeLeft(parseDuration(workout.rounds[currentRoundIndex].duration));
    setIsPlaying(true);
  };

  const handleStop = () => {
    setIsPlaying(false);
    onFinish();
  };

  const sessionProgress = ((currentRoundIndex + 1) / totalRounds) * 100;

  return (
    <div className='min-h-screen bg-gray-100'>
      {/* Workout Player Panel - Full Screen Height */}
      <div className='relative h-screen overflow-hidden bg-gray-800'>
        <img
          src={currentRound.imageUrl}
          alt={currentRound.name}
          className='w-full h-full object-cover opacity-40'
        />
        <div className='absolute inset-0 bg-black/20'></div>

        {/* Top Controls with Session Indicator */}
        <div className='absolute top-4 left-4 right-4 flex justify-between items-center'>
          <Button
            onClick={onFinish}
            className='w-8 h-8 p-0 bg-transparent hover:bg-white/20 border-none'
          >
            <ArrowLeft className='w-6 h-6 text-white' />
          </Button>

          <span className='text-sm font-medium text-white'>Session 1/3</span>

          <Button className='w-8 h-8 p-0 bg-transparent hover:bg-white/20 border-none'>
            <MoreHorizontal className='w-6 h-6 text-white' />
          </Button>
        </div>

        {/* Timer and Exercise Info - Positioned in Lower Third */}
        <div className='absolute bottom-32 left-0 right-0 flex flex-col items-center'>
          <div className='text-5xl font-bold text-white mb-2'>
            {formatTime(timeLeft)}
          </div>
          <div className='text-lg font-medium text-white mb-10'>
            20× {currentRound.name}
          </div>
        </div>

        {/* Media Controls - Bottom Row */}
        <div className='absolute bottom-4 left-4 right-4 flex justify-center items-center gap-6'>
          {/* Restart Button */}
          <Button
            onClick={handleRestart}
            className='w-12 h-12 p-0 bg-transparent hover:bg-white/10 border-2 border-white rounded-full'
          >
            <RotateCcw className='w-6 h-6 text-white' />
          </Button>

          {/* Previous Button */}
          <Button
            onClick={handlePrevious}
            className='w-12 h-12 p-0 bg-transparent hover:bg-white/10 border-2 border-white rounded-full'
            disabled={currentRoundIndex === 0}
          >
            <SkipBack className='w-6 h-6 text-white' />
          </Button>

          {/* Play/Pause Button - Central Orange */}
          <Button
            onClick={handlePlayPause}
            className='w-16 h-16 p-0 bg-[#FF7A00] hover:bg-[#E66A00] border-none rounded-full shadow-lg'
          >
            {isPlaying ? (
              <Pause className='w-6 h-6 text-white' />
            ) : (
              <Play className='w-6 h-6 text-white ml-1' />
            )}
          </Button>

          {/* Next Button */}
          <Button
            onClick={handleNext}
            className='w-12 h-12 p-0 bg-transparent hover:bg-white/10 border-2 border-white rounded-full'
          >
            <SkipForward className='w-6 h-6 text-white' />
          </Button>

          {/* Stop Button */}
          <Button
            onClick={handleStop}
            className='w-12 h-12 p-0 bg-transparent hover:bg-white/10 border-2 border-white rounded-full'
          >
            <Square className='w-6 h-6 text-white' />
          </Button>
        </div>
      </div>

      {/* Round Progress Indicator */}
      <div className='sticky top-0 bg-white px-4 py-3 border-b border-gray-200 z-10'>
        <div className='flex justify-between items-center mb-2'>
          <span className='text-xs text-gray-500'>
            {currentRoundIndex + 1} of {totalRounds}
          </span>
        </div>
        <Progress value={sessionProgress} className='h-1' />
      </div>

      <div className='p-4 space-y-6'>
        {/* Workout Summary Card */}
        <div className='bg-white rounded-xl p-4 shadow-sm'>
          <div className='grid grid-cols-3 gap-4'>
            <div className='text-center'>
              <Flame className='w-6 h-6 text-orange-500 mx-auto mb-2' />
              <div className='text-lg font-bold text-gray-800'>1200 cal</div>
              <div className='text-xs text-gray-500'>Burned</div>
            </div>
            <div className='text-center'>
              <Heart className='w-6 h-6 text-blue-500 mx-auto mb-2' />
              <div className='text-lg font-bold text-gray-800'>70 bpm</div>
              <div className='text-xs text-gray-500'>Average</div>
            </div>
            <div className='text-center'>
              <Award className='w-6 h-6 text-teal-500 mx-auto mb-2' />
              <div className='text-lg font-bold text-gray-800'>+100</div>
              <div className='text-xs text-gray-500'>Points</div>
            </div>
          </div>
        </div>
        {/* Workout Sets Overview */}
        <div className='bg-gray-800 rounded-2xl p-4 text-white'>
          <h3 className='text-lg font-semibold mb-1'>Cardio Workout Sets</h3>
          <p className='text-sm text-gray-400 mb-3'>12 trainings • 20-30 min</p>
          <Progress value={16.7} className='h-1.5 mb-2' />
          <p className='text-sm text-gray-400'>2 / 12 trainings completed</p>
        </div>

        {/* Exercise List Section */}
        <div className='bg-white rounded-xl shadow-sm'>
          <div className='p-4'>
            <h3 className='text-lg font-semibold text-gray-800 mb-3'>
              Current Workout
            </h3>
          </div>
          <div className='divide-y divide-gray-100'>
            {workout.rounds.map((round, index) => (
              <div
                key={index}
                className='p-4 flex items-center justify-between'
              >
                <div className='flex items-center gap-3'>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                      index === currentRoundIndex
                        ? "bg-orange-500 text-white"
                        : index < currentRoundIndex
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <div className='font-medium text-gray-800'>
                      {round.name}
                    </div>
                    <div className='text-sm text-gray-500'>
                      {round.duration}
                    </div>
                  </div>
                </div>
                <Button className='w-8 h-8 p-0 border border-orange-500 text-orange-500 bg-transparent hover:bg-orange-50'>
                  <Clock className='w-4 h-4' />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Tips and Alerts */}
        <div className='space-y-3'>
          <div className='bg-yellow-50 border border-yellow-200 rounded-xl p-4'>
            <div className='flex items-start gap-3'>
              <div className='w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0 mt-0.5'>
                <span className='text-white text-xs font-bold'>!</span>
              </div>
              <p className='text-sm text-gray-700'>
                Blood Pressure Modifications Active
              </p>
            </div>
          </div>

          <div className='bg-blue-50 border border-blue-200 rounded-xl p-4'>
            <div className='flex items-start gap-3'>
              <div className='w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5'>
                <span className='text-white text-xs'>💡</span>
              </div>
              <p className='text-sm text-gray-700'>
                Remember to breathe steadily throughout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutFlow;
