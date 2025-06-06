
import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex justify-center space-x-2 mb-8">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={cn(
            "w-3 h-3 rounded-full transition-all duration-300",
            index < currentStep
              ? "bg-orange-500 scale-110"
              : "bg-gray-200"
          )}
        />
      ))}
    </div>
  );
};

export default ProgressIndicator;
