
import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FitnessCardProps {
  emoji: string;
  title: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}

const FitnessCard: React.FC<FitnessCardProps> = ({
  emoji,
  title,
  description,
  isSelected,
  onClick
}) => {
  return (
    <Card
      className={cn(
        "p-4 cursor-pointer transition-all duration-300 hover:shadow-md border-2",
        "active:scale-95 transform",
        isSelected
          ? "border-orange-500 bg-orange-50 shadow-lg scale-105"
          : "border-gray-200 hover:border-gray-300 bg-white"
      )}
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <div className="text-3xl">{emoji}</div>
        <div className="flex-1">
          <h3 className={cn(
            "font-semibold text-lg",
            isSelected ? "text-orange-700" : "text-gray-800"
          )}>
            {title}
          </h3>
          <p className={cn(
            "text-sm",
            isSelected ? "text-orange-600" : "text-gray-500"
          )}>
            {description}
          </p>
        </div>
        {isSelected && (
          <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        )}
      </div>
    </Card>
  );
};

export default FitnessCard;
