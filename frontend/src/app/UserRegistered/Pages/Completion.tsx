import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { Camera, Settings, Sparkles } from "lucide-react";

const Completion = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [progressData, setProgressData] = useState<{
    goal: string;
    level: string;
    schedule: string;
    location: string;
  }>({
    goal: "",
    level: "",
    schedule: "",
    location: "",
  });

  const ParseprogressData = () => {
    const storedGoal = sessionStorage
      .getItem("selectedGoal")
      ?.replace(/\b\w/g, (c) => c.toUpperCase())
      .replace(/-(?=[a-z])/g, " ");
    const storedLevel = JSON.parse(
      sessionStorage.getItem("fitnessInfo") || "{}"
    ).fitnessLevel;
    const storedSchedule = JSON.parse(
      sessionStorage.getItem("workoutPreferences") || "{}"
    ).daysPerWeek;

    const storedLocation = JSON.parse(
      sessionStorage.getItem("workoutPreferences") || "{}"
    ).locations.join(" + ");

    setProgressData({
      goal: storedGoal || "",
      level: storedLevel || "",
      schedule: storedSchedule || "",
      location: storedLocation || "",
    });
  };

  useEffect(() => {
    ParseprogressData();
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
    return () => clearInterval(timer);
  }, []);

  const handleStartJourney = () => {
    ParseprogressData();
  };
       
  

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white sm:mt-0 mt-10'>
      <main className='px-4 py-8'>
        <div className='max-w-md mx-auto'>
          {/* Celebration Header */}
          <div className='text-center mb-8'>
            <div className='flex items-center justify-center mb-4'>
              <Sparkles className='h-8 w-8 text-orange-500 mr-2' />
              <h1 className='text-3xl font-bold text-gray-800'>
                You&apos;re all set! 🎉
              </h1>
            </div>
            <p className='text-gray-600'>
              We&apos;re creating your personalized fitness plan
            </p>
          </div>

          {/* Summary Card */}
          <div className='bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-6'>
            <h2 className='text-lg font-semibold text-gray-800 mb-4'>
              Your Profile Summary
            </h2>
            <div className='space-y-3'>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Goal</span>
                <span className='font-medium text-gray-800'>
                  {progressData.goal}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Level</span>
                <span className='font-medium text-gray-800'>
                  {progressData.level}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Schedule</span>
                <span className='font-medium text-gray-800'>{`${progressData.schedule}x/week`}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Location</span>
                <span className='font-medium text-gray-800'>
                  {progressData.location}
                </span>
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className='bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-6'>
            <div className='flex items-center justify-between mb-3'>
              <span className='text-gray-700 font-medium'>
                Generating your plan...
              </span>
              <span className='text-orange-600 font-semibold'>{progress}%</span>
            </div>
            <Progress value={progress} className='h-3 bg-gray-200' />
          </div>

          {/* Optional Actions */}
          <div className='grid grid-cols-2 gap-3 mb-8'>
            <Button
              variant='outline'
              className='flex items-center justify-center gap-2 py-3 border-gray-200 hover:border-orange-300'
            >
              <Camera className='h-4 w-4' />
              <span className='text-sm'>Progress Photo</span>
            </Button>
            <Button
              variant='outline'
              onClick={() => navigate("/userRegister")}
              className='flex items-center justify-center gap-2 py-3 border-gray-200 hover:border-orange-300'
            >
              <Settings className='h-4 w-4' />
              <span className='text-sm'>Adjust Settings</span>
            </Button>
          </div>

          {/* Start Journey Button */}
          <Button
            onClick={handleStartJourney}
            disabled={progress < 100}
            className='w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:transform-none'
          >
            {progress < 100 ? "Please wait..." : "Start My Journey"}
          </Button>

          <div className='text-center mt-6'>
            <p className='text-xs text-gray-400'>
              Your personalized fitness journey awaits
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Completion;
