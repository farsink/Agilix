export interface Milestone {
  id: number;
  title: string;
  description: string;
  current: number;
  target: number;
  isCompleted: boolean;
  category: "runs" | "steps" | "workouts" | "calories";
  icon: string;
  completedDate?: string;
}

export const milestones: Milestone[] = [
  {
    id: 1,
    title: "Complete 5 Runs This Week",
    description: "Keep up your cardio momentum",
    current: 2,
    target: 5,
    isCompleted: false,
    category: "runs",
    icon: "🏃‍♂️",
  },
  {
    id: 2,
    title: "Log 10,000 Steps Daily",
    description: "Stay active throughout the day",
    current: 7500,
    target: 10000,
    isCompleted: false,
    category: "steps",
    icon: "👟",
  },
  {
    id: 3,
    title: "Complete 12 Workouts This Month",
    description: "Build a consistent routine",
    current: 12,
    target: 12,
    isCompleted: true,
    category: "workouts",
    icon: "💪",
    completedDate: "2024-01-15",
  },
  {
    id: 4,
    title: "Burn 2000 Calories This Week",
    description: "Push your limits",
    current: 1650,
    target: 2000,
    isCompleted: false,
    category: "calories",
    icon: "🔥",
  },
  {
    id: 5,
    title: "30-Day Streak Challenge",
    description: "Don't break the chain",
    current: 18,
    target: 30,
    isCompleted: false,
    category: "workouts",
    icon: "⚡",
  },
];
