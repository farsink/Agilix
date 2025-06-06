import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import ProgressIndicator from "@/components/ProgressIndicator";
import GoalCard from "@/components/GoalCard";

interface Goal {
  id: string;
  emoji: string;
  title: string;
  description: string;
}

const goals: Goal[] = [
  {
    id: "build-muscle",
    emoji: "💪",
    title: "Build Muscle",
    description: "Gain strength and muscle mass",
  },
  {
    id: "lose-weight",
    emoji: "🔥",
    title: "Lose Weight",
    description: "Burn fat and get lean",
  },
  {
    id: "improve-endurance",
    emoji: "🏃",
    title: "Improve Endurance",
    description: "Boost cardiovascular fitness",
  },
  {
    id: "stay-healthy",
    emoji: "💯",
    title: "Stay Healthy",
    description: "Maintain overall wellness",
  },
  {
    id: "multiple-goals",
    emoji: "🎯",
    title: "Multiple Goals",
    description: "Combine different objectives",
  },
];

const Index = () => {
  const navigate = useNavigate();
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [showSecondaryGoals, setShowSecondaryGoals] = useState(false);
  const [secondaryGoals, setSecondaryGoals] = useState<string[]>([]);

  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal(goalId);

    if (goalId === "multiple-goals") {
      setShowSecondaryGoals(true);
    } else {
      setShowSecondaryGoals(false);
      setSecondaryGoals([]);
    }
  };

  const handleSecondaryGoalToggle = (goalId: string) => {
    setSecondaryGoals((prev) =>
      prev.includes(goalId)
        ? prev.filter((id) => id !== goalId)
        : [...prev, goalId]
    );
  };

  const handleContinue = () => {
    if (!selectedGoal) {
      toast({
        title: "Please select a goal",
        description: "Choose your main fitness goal to continue.",
        variant: "destructive",
      });
      return;
    }

    const selectedGoalData = goals.find((goal) => goal.id === selectedGoal);
    const secondaryGoalData = secondaryGoals
      .map((id) => goals.find((goal) => goal.id === id)?.title)
      .filter(Boolean);

    console.log("Selected goal:", selectedGoalData?.title);
    console.log("Secondary goals:", secondaryGoalData);

    toast({
      title: "Goal selected!",
      description: `Your main goal: ${selectedGoalData?.title}${
        secondaryGoalData.length > 0
          ? `. Additional goals: ${secondaryGoalData.join(", ")}`
          : ""
      }`,
    });

    navigate("/physical-info");
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white sm:mt-0 mt-10'>
      <main className='px-4 py-8'>
        <div className='max-w-md mx-auto'>
          <ProgressIndicator currentStep={1} totalSteps={6} />

          <div className='text-center mb-8'>
            <h1 className='text-2xl md:text-3xl font-semibold text-gray-800 mb-2'>
              What&#39;s your main fitness goal?
            </h1>
            <p className='text-gray-500 text-sm'>
              Choose the goal that matters most to you right now
            </p>
          </div>

          <div className='space-y-4 mb-8'>
            {goals.map((goal) => (
              <GoalCard
                key={goal.id}
                emoji={goal.emoji}
                title={goal.title}
                description={goal.description}
                isSelected={selectedGoal === goal.id}
                onClick={() => handleGoalSelect(goal.id)}
              />
            ))}
          </div>

          {showSecondaryGoals && (
            <div className='mb-8 p-4 bg-orange-50 rounded-lg border border-orange-200'>
              <h3 className='font-semibold text-gray-800 mb-3'>
                Select additional goals:
              </h3>
              <div className='space-y-2'>
                {goals
                  .filter((goal) => goal.id !== "multiple-goals")
                  .map((goal) => (
                    <div
                      key={goal.id}
                      className='flex items-center space-x-3 p-2 rounded cursor-pointer hover:bg-orange-100'
                      onClick={() => handleSecondaryGoalToggle(goal.id)}
                    >
                      <div
                        className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                          secondaryGoals.includes(goal.id)
                            ? "bg-orange-500 border-orange-500"
                            : "border-gray-300"
                        }`}
                      >
                        {secondaryGoals.includes(goal.id) && (
                          <svg
                            className='w-3 h-3 text-white'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M5 13l4 4L19 7'
                            />
                          </svg>
                        )}
                      </div>
                      <span className='text-sm'>
                        {goal.emoji} {goal.title}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          <Button
            onClick={handleContinue}
            className='w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95'
            disabled={!selectedGoal}
          >
            Continue
          </Button>

          <div className='text-center mt-6'>
            <p className='text-xs text-gray-400'>
              Step 1 of 4 • Personalized fitness journey
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
