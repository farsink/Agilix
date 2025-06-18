import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Calendar as CalendarIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface WorkoutData {
  status: "completed" | "scheduled" | "rest" | "modified" | "missed";
  type?: string;
  calories?: number;
  duration?: number;
}

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(8);
  const [legendOpen, setLegendOpen] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<{
    date: number;
    data: WorkoutData;
  } | null>(null);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Sample workout data with more details
  const workoutData: { [key: number]: WorkoutData } = {
    3: { status: "completed", type: "Cardio", calories: 350, duration: 45 },
    5: { status: "scheduled", type: "Strength Training", duration: 60 },
    7: { status: "rest" },
    10: { status: "modified", type: "Light Yoga", calories: 150, duration: 30 },
    12: { status: "missed", type: "HIIT", duration: 30 },
    15: { status: "completed", type: "Running", calories: 450, duration: 60 },
    18: { status: "scheduled", type: "Pilates", duration: 50 },
    20: { status: "rest" },
    22: { status: "modified", type: "Swimming", calories: 280, duration: 40 },
    25: { status: "missed", type: "Boxing", duration: 45 },
  };

  const statusConfig = {
    completed: {
      color: "bg-calendar-success",
      label: "Completed",
      textColor: "text-calendar-success",
    },
    scheduled: {
      color: "bg-calendar-primary",
      label: "Scheduled",
      textColor: "text-calendar-primary",
    },
    rest: {
      color: "bg-calendar-text-medium",
      label: "Rest Day",
      textColor: "text-calendar-text-medium",
    },
    modified: {
      color: "bg-calendar-warning",
      label: "Modified",
      textColor: "text-calendar-warning",
    },
    missed: {
      color: "bg-destructive",
      label: "Missed",
      textColor: "text-destructive",
    },
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1;
  };

  const getPreviousMonthDays = (date: Date) => {
    const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 0);
    return prevMonth.getDate();
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getMonthStats = () => {
    const workouts = Object.values(workoutData);
    const completed = workouts.filter((w) => w.status === "completed").length;
    const missed = workouts.filter((w) => w.status === "missed").length;
    const total = workouts.filter((w) => w.status !== "rest").length;
    const completionRate = total > 0 ? (completed / total) * 100 : 0;

    return { completed, missed, total, completionRate };
  };

  const handleDateClick = (day: number, workout?: WorkoutData) => {
    setSelectedDate(day);
    if (workout) {
      setSelectedWorkout({ date: day, data: workout });
    }
  };

  const renderStatusIndicator = (status: WorkoutData["status"]) => {
    const config = statusConfig[status];
    return (
      <div className={`w-2 h-2 rounded-full ${config.color} mx-auto mt-1`} />
    );
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const prevMonthDays = getPreviousMonthDays(currentDate);
    const days = [];

    // Previous month's trailing days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push(
        <button
          key={`prev-${prevMonthDays - i}`}
          className='h-12 w-full text-muted-foreground text-sm hover:bg-muted/50 rounded-md transition-colors flex flex-col items-center justify-center'
        >
          <span>{prevMonthDays - i}</span>
        </button>
      );
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = selectedDate === day;
      const workout = workoutData[day];

      const dayButton = (
        <button
          key={day}
          onClick={() => handleDateClick(day, workout)}
          className={`h-12 w-full text-sm transition-all font-medium flex flex-col items-center justify-center gap-1 rounded-md
            ${
              isSelected
                ? "ring-2 ring-calendar-primary ring-offset-2 bg-calendar-primary/5 text-calendar-primary"
                : "text-foreground hover:bg-muted/50"
            }
            ${workout ? "cursor-pointer" : ""}
          `}
        >
          <span className='text-sm font-medium'>{day}</span>
          {workout && renderStatusIndicator(workout.status)}
        </button>
      );

      if (workout) {
        days.push(
          <TooltipProvider key={day}>
            <Tooltip>
              <TooltipTrigger asChild>{dayButton}</TooltipTrigger>
              <TooltipContent>
                <div className='text-xs'>
                  <div className='font-medium'>
                    {statusConfig[workout.status].label}
                  </div>
                  {workout.type && <div>{workout.type}</div>}
                  {workout.calories && <div>{workout.calories} cal</div>}
                  {workout.duration && <div>{workout.duration} min</div>}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      } else {
        days.push(dayButton);
      }
    }

    // Next month's leading days
    const remainingCells = 42 - days.length;
    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <button
          key={`next-${day}`}
          className='h-12 w-full text-muted-foreground text-sm hover:bg-muted/50 rounded-md transition-colors flex flex-col items-center justify-center'
        >
          <span>{day}</span>
        </button>
      );
    }

    return days;
  };

  const stats = getMonthStats();

  return (
    <TooltipProvider>
      <Card className='w-full max-w-md mx-auto p-4 bg-background border border-border shadow-sm'>
        {/* Header */}
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center gap-2'>
            <CalendarIcon className='h-5 w-5 text-calendar-primary' />
            <span className='text-sm font-medium text-foreground'>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
          </div>
          <div className='flex items-center gap-1'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => navigateMonth("prev")}
              className='h-8 w-8 p-0 rounded-full hover:bg-calendar-primary hover:text-white'
            >
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={() => navigateMonth("next")}
              className='h-8 w-8 p-0 rounded-full hover:bg-calendar-primary hover:text-white'
            >
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        </div>

        {/* Progress Summary */}
        <div className='mb-4 p-3 bg-muted/30 rounded-lg'>
          <div className='flex items-center justify-between mb-2'>
            <h3 className='text-sm font-medium text-foreground'>
              Monthly Progress
            </h3>
            <span className='text-xs text-muted-foreground'>
              {stats.completed} completed, {stats.missed} missed
            </span>
          </div>
          <Progress value={stats.completionRate} className='h-2' />
          <div className='text-xs text-muted-foreground mt-1'>
            {Math.round(stats.completionRate)}% completion rate
          </div>
        </div>

        {/* Collapsible Legend */}
        <Collapsible open={legendOpen} onOpenChange={setLegendOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant='ghost'
              size='sm'
              className='w-full justify-between mb-2 h-8'
            >
              <span className='text-xs font-medium'>Legend</span>
              <ChevronDown
                className={`h-3 w-3 transition-transform ${
                  legendOpen ? "rotate-180" : ""
                }`}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className='mb-4'>
            <div className='grid grid-cols-2 gap-2 text-xs p-2 bg-muted/20 rounded-lg'>
              {Object.entries(statusConfig).map(([status, config]) => (
                <div key={status} className='flex items-center gap-2'>
                  <div className={`w-2 h-2 rounded-full ${config.color}`} />
                  <span className='text-muted-foreground'>{config.label}</span>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Day Headers */}
        <div className='grid grid-cols-7 gap-1 mb-2'>
          {dayNames.map((day, index) => (
            <div
              key={day + index}
              className='h-8 flex items-center justify-center text-xs font-medium text-muted-foreground'
            >
              <span className='hidden sm:inline'>{day}</span>
              <span className='sm:hidden'>{day.charAt(0)}</span>
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className='grid grid-cols-7 gap-1 mb-4'>
          {renderCalendarDays()}
        </div>

        {/* Workout Detail Dialog */}
        {selectedWorkout && (
          <Dialog
            open={!!selectedWorkout}
            onOpenChange={() => setSelectedWorkout(null)}
          >
            <DialogContent className='sm:max-w-md'>
              <DialogHeader>
                <DialogTitle className='flex items-center gap-2'>
                  <div
                    className={`w-3 h-3 rounded-full ${
                      statusConfig[selectedWorkout.data.status].color
                    }`}
                  />
                  {monthNames[currentDate.getMonth()]} {selectedWorkout.date}
                </DialogTitle>
              </DialogHeader>
              <div className='space-y-3'>
                <div>
                  <Badge
                    variant={
                      selectedWorkout.data.status === "completed"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {statusConfig[selectedWorkout.data.status].label}
                  </Badge>
                </div>
                {selectedWorkout.data.type && (
                  <div>
                    <span className='text-sm font-medium'>Workout Type: </span>
                    <span className='text-sm text-muted-foreground'>
                      {selectedWorkout.data.type}
                    </span>
                  </div>
                )}
                {selectedWorkout.data.duration && (
                  <div>
                    <span className='text-sm font-medium'>Duration: </span>
                    <span className='text-sm text-muted-foreground'>
                      {selectedWorkout.data.duration} minutes
                    </span>
                  </div>
                )}
                {selectedWorkout.data.calories && (
                  <div>
                    <span className='text-sm font-medium'>Calories: </span>
                    <span className='text-sm text-muted-foreground'>
                      {selectedWorkout.data.calories} cal
                    </span>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </Card>
    </TooltipProvider>
  );
};

export default Calendar;
