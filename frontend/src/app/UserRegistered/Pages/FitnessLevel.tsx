import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import ProgressIndicator from "@/components/ProgressIndicator";
import FitnessCard from "@/components/FitnessCard";

interface FitnessLevel {
  id: string;
  emoji: string;
  title: string;
  description: string;
}

interface ActivityLevel {
  id: string;
  emoji: string;
  title: string;
  description: string;
}

const fitnessLevels: FitnessLevel[] = [
  {
    id: "beginner",
    emoji: "🌱",
    title: "Beginner",
    description: "New to working out",
  },
  {
    id: "intermediate",
    emoji: "💪",
    title: "Intermediate",
    description: "Some experience",
  },
  {
    id: "advanced",
    emoji: "🔥",
    title: "Advanced",
    description: "Regular gym-goer",
  },
];

const activityLevels: ActivityLevel[] = [
  {
    id: "sedentary",
    emoji: "🛋️",
    title: "Sedentary",
    description: "Mostly sitting or lying down",
  },
  {
    id: "lightly-active",
    emoji: "🚶",
    title: "Lightly Active",
    description: "Light exercise 1-3 days per week",
  },
  {
    id: "very-active",
    emoji: "🏃",
    title: "Very Active",
    description: "Intense exercise 6-7 days per week",
  },
];

const FitnessLevel = () => {
  const navigate = useNavigate();
  const [selectedFitnessLevel, setSelectedFitnessLevel] = useState<
    string | null
  >(null);
  const [selectedActivityLevel, setSelectedActivityLevel] = useState<
    string | null
  >(null);

  const handleBack = () => {
    navigate("/physical-info");
  };

  const handleContinue = () => {
    if (!selectedFitnessLevel || !selectedActivityLevel) {
      toast({
        title: "Please complete your selection",
        description:
          "Choose both your fitness experience and activity level to continue.",
        variant: "destructive",
      });
      return;
    }

    const selectedFitnessData = fitnessLevels.find(
      (level) => level.id === selectedFitnessLevel
    );
    const selectedActivityData = activityLevels.find(
      (level) => level.id === selectedActivityLevel
    );

    console.log("Fitness experience:", selectedFitnessData?.title);
    console.log("Activity level:", selectedActivityData?.title);

    toast({
      title: "Fitness information saved!",
      description: `Experience: ${selectedFitnessData?.title}, Activity: ${selectedActivityData?.title}`,
    });

    navigate("/workout-preferences");
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
            <ProgressIndicator currentStep={3} totalSteps={6} />
            <div className='w-10' /> {/* Spacer for alignment */}
          </div>

          <div className='text-center mb-8'>
            <h1 className='text-2xl md:text-3xl font-semibold text-gray-800 mb-2'>
              What&apos;s your fitness experience level?
            </h1>
            <p className='text-gray-500 text-sm'>
              This helps us create the right workout intensity for you
            </p>
          </div>

          <div className='space-y-4 mb-8'>
            {fitnessLevels.map((level) => (
              <FitnessCard
                key={level.id}
                emoji={level.emoji}
                title={level.title}
                description={level.description}
                isSelected={selectedFitnessLevel === level.id}
                onClick={() => setSelectedFitnessLevel(level.id)}
              />
            ))}
          </div>

          <div className='text-center mb-6'>
            <h2 className='text-xl font-semibold text-gray-800 mb-2'>
              How active are you?
            </h2>
            <p className='text-gray-500 text-sm'>
              Tell us about your current activity level
            </p>
          </div>

          <div className='space-y-4 mb-8'>
            {activityLevels.map((level) => (
              <FitnessCard
                key={level.id}
                emoji={level.emoji}
                title={level.title}
                description={level.description}
                isSelected={selectedActivityLevel === level.id}
                onClick={() => setSelectedActivityLevel(level.id)}
              />
            ))}
          </div>

          <Button
            onClick={handleContinue}
            className='w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95'
            disabled={!selectedFitnessLevel || !selectedActivityLevel}
          >
            Continue
          </Button>

          <div className='text-center mt-6'>
            <p className='text-xs text-gray-400'>
              Step 3 of 4 • Personalized fitness journey
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FitnessLevel;
