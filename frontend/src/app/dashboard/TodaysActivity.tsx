import React, { useState } from "react";
import { GoalCard } from "./components/Goal";
import { AddGoalModal } from "./components/AddGoalmodal";
import { Droplets, Activity, Footprints, Moon } from "lucide-react";

export interface Goal {
  id: string;
  title: string;
  current: number;
  target: number;
  unit: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  backgroundColor: string;
}

const TodayActivity = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "hydration",
      title: "Water",
      current: 1.9,
      target: 2.5,
      unit: "Liters",
      icon: Droplets,
      color: "#3B82F6",
      backgroundColor: "#E0F2FE",
    },
    {
      id: "activity",
      title: "Heart Rate",
      current: 120,
      target: 140,
      unit: "Bpm",
      icon: Activity,
      color: "#EC4899",
      backgroundColor: "#FCE7F3",
    },
    {
      id: "steps",
      title: "Steps",
      current: 4685,
      target: 10000,
      unit: "steps",
      icon: Footprints,
      color: "#10B981",
      backgroundColor: "#D1FAE5",
    },
    {
      id: "sleep",
      title: "Sleep",
      current: 7.5,
      target: 8,
      unit: "Hours",
      icon: Moon,
      color: "#8B5CF6",
      backgroundColor: "#EDE9FE",
    },
  ]);

  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddProgress = (goalId: string, amount: number) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === goalId
          ? { ...goal, current: Math.min(goal.current + amount, goal.target) }
          : goal
      )
    );
    setIsModalOpen(false);
    setSelectedGoal(null);
  };

  const handleCardClick = (goal: Goal) => {
    setSelectedGoal(goal);
    setIsModalOpen(true);
  };

  return (
    <div className='relative p-4 md:p-8 bg-[#F8F9FA] z-0'>
      <div className='max-w-6xl mx-auto'>
        {/* Irregular grid layout with different sizes */}
        <div className='grid grid-cols-2 gap-4 max-w-4xl mx-auto'>
          {/* Water - larger card */}
          <GoalCard
            key={goals[0].id}
            goal={goals[0]}
            onClick={() => handleCardClick(goals[0])}
            className='col-span-1 row-span-2 min-h-[240px]'
          />

          {/* Heart Rate - standard size */}
          <GoalCard
            key={goals[1].id}
            goal={goals[1]}
            onClick={() => handleCardClick(goals[1])}
            className='col-span-1 min-h-[110px]'
          />

          {/* Steps - standard size */}
          <GoalCard
            key={goals[2].id}
            goal={goals[2]}
            onClick={() => handleCardClick(goals[2])}
            className='col-span-1 min-h-[110px]'
          />

          {/* Sleep - wider card */}
          <GoalCard
            key={goals[3].id}
            goal={goals[3]}
            onClick={() => handleCardClick(goals[3])}
            className='col-span-2 min-h-[120px]'
          />
        </div>
      </div>

      <AddGoalModal
        goal={selectedGoal}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedGoal(null);
        }}
        onAdd={handleAddProgress}
      />
    </div>
  );
};

export default TodayActivity;
