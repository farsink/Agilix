import React, { useState } from "react";
import { Target } from "lucide-react";
import {
  milestones as initialMilestones,
  Milestone,
} from "./milestone/milestone";
import MilestoneCard from "./milestone/milestonecard";

const MilestoneTracker: React.FC = () => {
  const [milestones, setMilestones] = useState<Milestone[]>(initialMilestones);

  // Distinct gradient colors for each tile
  const gradientColors = [
    "linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)", // Golden yellow to orange
    "linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)", // Red to pink
    "linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)", // Teal to green
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", // Blue to purple
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", // Pink to coral
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", // Blue to cyan
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", // Green to mint
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)", // Pink to yellow
  ];

  const handleMilestoneComplete = (id: number) => {
    setMilestones((prev) =>
      prev.map((milestone) =>
        milestone.id === id
          ? {
              ...milestone,
              isCompleted: true,
              current: milestone.target,
              completedDate: new Date().toISOString(),
            }
          : milestone
      )
    );
  };

  const completedCount = milestones.filter((m) => m.isCompleted).length;
  const totalCount = milestones.length;

  return (
    <div className='w-full py-6 bg-white border-t border-gray-100'>
      <div className='container mx-auto '>
        {/* Header */}
        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center gap-3 px-2'>
            <div className='bg-gradient-to-r from-orange-500 to-orange-400 p-2 rounded-lg'>
              <Target className='w-5 h-5 text-white' />
            </div>
            <div>
              <h2 className='text-xl font-bold text-gray-900'>
                Milestone Tracker
              </h2>
              <p className='text-sm text-gray-500'>
                {completedCount} of {totalCount} milestones completed
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Carousel */}
        <div className='relative'>
          <div className='overflow-x-auto scrollbar-hide'>
            <div className='flex gap-4 pb-4' style={{ width: "max-content" }}>
              {milestones.map((milestone, index) => (
                <div key={milestone.id} className='flex-none'>
                  <MilestoneCard
                    milestone={milestone}
                    onComplete={handleMilestoneComplete}
                    gradientColors={
                      gradientColors[index % gradientColors.length]
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilestoneTracker;
