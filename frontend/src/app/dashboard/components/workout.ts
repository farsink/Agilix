export interface Workout {
  id: number;
  title: string;
  sets: number;
  reps: number;
  completedSets: number;
  category: string;
  categoryEmoji: string;
  image: string;
}

export const workouts: Workout[] = [
  {
    id: 1,
    title: "Dumbbell Bench Press",
    sets: 3,
    reps: 12,
    completedSets: 1,
    category: "Upper Body",
    categoryEmoji: "💪",
    image:
      "https://images.unsplash.com/photo-1581009137052-c40971b5176b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Bodyweight Squats",
    sets: 4,
    reps: 15,
    completedSets: 2,
    category: "Lower Body",
    categoryEmoji: "🦵",
    image:
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Plank",
    sets: 3,
    reps: 60, // seconds
    completedSets: 0,
    category: "Core",
    categoryEmoji: "🔥",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    title: "Treadmill Run",
    sets: 1,
    reps: 30, // minutes
    completedSets: 1,
    category: "Cardio",
    categoryEmoji: "🏃",
    image:
      "https://images.unsplash.com/photo-1541600384334-78a4175b9854?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    title: "Push Ups",
    sets: 3,
    reps: 20,
    completedSets: 0,
    category: "Upper Body",
    categoryEmoji: "💪",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 6,
    title: "Yoga Flow",
    sets: 1,
    reps: 45, // minutes
    completedSets: 0,
    category: "Flexibility",
    categoryEmoji: "🧘",
    image:
      "https://images.unsplash.com/photo-1506629905607-44077d426c6d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
