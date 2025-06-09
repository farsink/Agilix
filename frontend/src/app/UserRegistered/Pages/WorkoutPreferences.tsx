import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import ProgressIndicator from "@/components/ProgressIndicator";
import FitnessCard from "@/components/FitnessCard";


interface WorkoutLocation {
  id: string;
  emoji: string;
  title: string;
  description: string;
}

const workoutLocations: WorkoutLocation[] = [
  {
    id: "home",
    emoji: "🏠",
    title: "At Home",
    description: "Workout from your living space",
  },
  {
    id: "gym",
    emoji: "🏋️",
    title: "At Gym",
    description: "Access to gym equipment",
  },
  {
    id: "outdoors",
    emoji: "🌳",
    title: "Outdoors",
    description: "Parks, trails, and fresh air",
  },
];

const WorkoutPreferences = () => {
  const navigate = useNavigate();
  const [workoutTime, setWorkoutTime] = useState<string>("");
  const [daysPerWeek, setDaysPerWeek] = useState([4]);
  const [sessionDuration, setSessionDuration] = useState<string>("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  useEffect(() => {
    const parseWorkoutPreferences = () => {
      const workoutPreferences = sessionStorage.getItem("workoutPreferences");
      if (workoutPreferences) {
        const parsedPreferences = JSON.parse(workoutPreferences);
        setWorkoutTime(parsedPreferences.workoutTime);
        setDaysPerWeek([parsedPreferences.daysPerWeek]);
        setSessionDuration(parsedPreferences.sessionDuration);
        setSelectedLocations(parsedPreferences.locations);
      }
    };

    parseWorkoutPreferences();
  }, []);

  const handleBack = () => {
    navigate("/fitness-level");
  };

  const handleLocationToggle = (locationId: string) => {
    setSelectedLocations((prev) =>
      prev.includes(locationId)
        ? prev.filter((id) => id !== locationId)
        : [...prev, locationId]
    );
  };

  const handleContinue = () => {
    if (!workoutTime || !sessionDuration || selectedLocations.length === 0) {
      toast({
        title: "Please complete your preferences",
        description:
          "Fill in your workout time, duration, and location preferences to continue.",
        variant: "destructive",
      });
      return;
    }

    const preferencesData = {
      workoutTime,
      daysPerWeek: daysPerWeek[0],
      sessionDuration,
      locations: selectedLocations,
    };

    console.log("Workout preferences:", preferencesData);

    sessionStorage.setItem(
      "workoutPreferences",
      JSON.stringify(preferencesData)
    );

    toast({
      title: "Preferences saved!",
      description: `${workoutTime} workouts, ${daysPerWeek[0]} days/week, ${sessionDuration}`,
    });

    navigate("/equipment-space");
  };

  const renderDayCircles = (days: number) => {
    return (
      <div className='flex justify-center space-x-2 mt-2'>
        {Array.from({ length: 7 }, (_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index < days ? "bg-orange-500" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white sm:mt-0 mt-10'>
      <main className='px-4 py-8'>
        <div className='max-w-md mx-auto'>
          <div className='flex items-center justify-between mb-6'>
            <Button
              variant='ghost'
              size='icon'
              onClick={handleBack}
              className='h-10 w-10 text-gray-500 hover:text-gray-700'
            >
              <ArrowLeft className='h-5 w-5' />
            </Button>
            <ProgressIndicator currentStep={4} totalSteps={6} />
            <div className='w-10' />
          </div>

          <div className='text-center mb-8'>
            <h1 className='text-2xl md:text-3xl font-semibold text-gray-800 mb-2'>
              When do you prefer to workout?
            </h1>
            <p className='text-gray-500 text-sm'>
              Choose your ideal workout schedule
            </p>
          </div>

          <div className='space-y-8 mb-8'>
            {/* Workout Time */}
            <div className='bg-white p-4 rounded-lg border border-gray-200'>
              <label className='block text-gray-700 font-medium mb-3'>
                Preferred Time
              </label>
              <ToggleGroup
                type='single'
                value={workoutTime}
                onValueChange={setWorkoutTime}
                className='grid grid-cols-3 gap-2'
              >
                <ToggleGroupItem
                  value='morning'
                  className='h-12 flex flex-col items-center'
                >
                  <span className='text-lg mb-1'>🌅</span>
                  <span className='text-xs'>Morning</span>
                </ToggleGroupItem>
                <ToggleGroupItem
                  value='afternoon'
                  className='h-12 flex flex-col items-center'
                >
                  <span className='text-lg mb-1'>☀️</span>
                  <span className='text-xs'>Afternoon</span>
                </ToggleGroupItem>
                <ToggleGroupItem
                  value='evening'
                  className='h-12 flex flex-col items-center'
                >
                  <span className='text-lg mb-1'>🌙</span>
                  <span className='text-xs'>Evening</span>
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            {/* Days per Week */}
            <div className='bg-white p-4 rounded-lg border border-gray-200'>
              <label className='block text-gray-700 font-medium mb-3'>
                How many days per week?
              </label>
              <div className='space-y-3'>
                <Slider
                  value={daysPerWeek}
                  onValueChange={setDaysPerWeek}
                  max={7}
                  min={1}
                  step={1}
                  className='w-full'
                />
                <div className='text-center text-lg font-semibold text-gray-800'>
                  {daysPerWeek[0]} {daysPerWeek[0] === 1 ? "day" : "days"} per
                  week
                </div>
                {renderDayCircles(daysPerWeek[0])}
              </div>
            </div>

            {/* Session Duration */}
            <div className='bg-white p-4 rounded-lg border border-gray-200'>
              <label className='block text-gray-700 font-medium mb-3'>
                How long per session?
              </label>
              <ToggleGroup
                type='single'
                value={sessionDuration}
                onValueChange={setSessionDuration}
                className='grid grid-cols-3 gap-2'
              >
                <ToggleGroupItem value='15-30 min' className='h-10 text-xs'>
                  15-30 min
                </ToggleGroupItem>
                <ToggleGroupItem value='30-45 min' className='h-10 text-xs'>
                  30-45 min
                </ToggleGroupItem>
                <ToggleGroupItem value='45-60+ min' className='h-10 text-xs'>
                  45-60+ min
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            {/* Workout Location */}
            <div>
              <div className='text-center mb-6'>
                <h2 className='text-xl font-semibold text-gray-800 mb-2'>
                  Where will you workout?
                </h2>
                <p className='text-gray-500 text-sm'>
                  You can select multiple locations
                </p>
              </div>

              <div className='space-y-4'>
                {workoutLocations.map((location) => (
                  <FitnessCard
                    key={location.id}
                    emoji={location.emoji}
                    title={location.title}
                    description={location.description}
                    isSelected={selectedLocations.includes(location.id)}
                    onClick={() => handleLocationToggle(location.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          <Button
            onClick={handleContinue}
            className='w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95'
            disabled={
              !workoutTime || !sessionDuration || selectedLocations.length === 0
            }
          >
            Continue
          </Button>

          <div className='text-center mt-6'>
            <p className='text-xs text-gray-400'>
              Step 4 of 5 • Personalized fitness journey
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WorkoutPreferences;
