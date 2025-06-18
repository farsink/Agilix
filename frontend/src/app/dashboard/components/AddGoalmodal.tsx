import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Goal } from "@/app/dashboard/TodaysActivity";

interface AddGoalModalProps {
  goal: Goal | null;
  isOpen: boolean;
  onClose: () => void;
  onAdd: (goalId: string, amount: number) => void;
}

export const AddGoalModal: React.FC<AddGoalModalProps> = ({
  goal,
  isOpen,
  onClose,
  onAdd,
}) => {
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (isOpen) {
      setAmount("");
    }
  }, [isOpen]);

  if (!goal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (numAmount > 0) {
      onAdd(goal.id, numAmount);
    }
  };

  const getQuickAddValues = () => {
    switch (goal.id) {
      case "hydration":
        return [8, 16, 24];
      case "activity":
        return [15, 30, 45];
      case "steps":
        return [500, 1000, 2000];
      case "sleep":
        return [0.5, 1, 1.5];
      default:
        return [];
    }
  };

  const quickValues = getQuickAddValues();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <goal.icon className='w-5 h-5' style={{ color: goal.color }} />
            Add {goal.title}
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-4'>
          <div className='text-center p-4 bg-gray-50 rounded-lg'>
            <div className='text-sm text-gray-600 mb-1'>Current Progress</div>
            <div className='text-2xl font-bold text-gray-800'>
              {goal.unit === "hours"
                ? goal.current.toFixed(1)
                : Math.floor(goal.current)}{" "}
              / {goal.target} {goal.unit}
            </div>
          </div>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Amount to add ({goal.unit})
              </label>
              <Input
                type='number'
                step={goal.unit === "hours" ? "0.1" : "1"}
                min='0'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={`Enter ${goal.unit}`}
                className='text-center text-lg'
              />
            </div>

            {quickValues.length > 0 && (
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Quick add
                </label>
                <div className='grid grid-cols-3 gap-2'>
                  {quickValues.map((value) => (
                    <Button
                      key={value}
                      type='button'
                      variant='outline'
                      onClick={() => setAmount(value.toString())}
                      className='hover:bg-orange-50 hover:border-orange-200'
                    >
                      +{value}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className='flex gap-2 pt-4'>
              <Button
                type='button'
                variant='outline'
                onClick={onClose}
                className='flex-1'
              >
                Cancel
              </Button>
              <Button
                type='submit'
                className='flex-1 bg-orange-500 hover:bg-orange-600'
                disabled={!amount || parseFloat(amount) <= 0}
              >
                Add Progress
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
