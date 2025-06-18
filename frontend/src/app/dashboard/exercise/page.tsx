"use client";
import { ArrowLeft, Clock, Flame, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useState } from "react";
import WorkoutFlow from "./components/WorkoutFlow";

const workoutData = {
  title: "Lower Body Training",
  description:
    "The lower abdomen and hips are the most difficult areas of the body to reduce when we are on a diet. Even so, in this area, you can reduce weight even if you don't use tools.",
  time: 20,
  calories: 95,
  imageUrl:
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop",
  rounds: [
    {
      name: "Jumping Jacks",
      duration: "00:30",
      imageUrl:
        "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?q=80&w=400&auto=format&fit=crop",
    },
    {
      name: "Squats",
      duration: "00:30",
      imageUrl:
        "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=400&auto=format&fit=crop",
    },
    {
      name: "Backward Lunge",
      duration: "00:30",
      imageUrl:
        "https://images.unsplash.com/photo-1533681018288-a695b1065554?q=80&w=400&auto=format&fit=crop",
    },
  ],
};

const Index = () => {
  const router = useRouter();
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);

  if (isWorkoutStarted) {
    return (
      <WorkoutFlow
        workout={workoutData}
        onFinish={() => setIsWorkoutStarted(false)}
      />
    );
  }

  return (
    <div className='min-h-screen bg-gray-200 flex justify-center font-sans'>
      <main className='w-full max-w-md bg-background text-foreground'>
        <div className='p-4 md:p-6 space-y-6'>
          <header className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <Button
                variant='outline'
                size='icon'
                onClick={() => router.back()}
                className='rounded-full h-10 w-10'
              >
                <ArrowLeft className='w-4 h-4' />
              </Button>
              <h1 className='text-lg font-normal text-foreground'>Calendar</h1>
            </div>

            <div className='flex items-center'>
              <div className='px-3 py-1 border border-border rounded-full bg-card'>
                <span className='text-sm font-medium text-muted-foreground'>
                  {format(new Date(), "MMMM d")}
                </span>
              </div>
            </div>
          </header>

          <div className='relative rounded-2xl overflow-hidden shadow-lg'>
            <img
              src={workoutData.imageUrl}
              alt='Woman doing lower body workout'
              className='w-full h-64 object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/10 to-transparent'></div>
            <div className='absolute bottom-0 left-0 right-0 p-4 flex justify-center gap-4'>
              <div className='flex items-center gap-2 bg-white/70 backdrop-blur-md rounded-full px-4 py-2 text-sm shadow-md'>
                <Clock className='h-5 w-5 text-primary' />
                <span className='font-semibold text-foreground'>
                  {workoutData.time} min
                </span>
              </div>
              <div className='flex items-center gap-2 bg-white/70 backdrop-blur-md rounded-full px-4 py-2 text-sm shadow-md'>
                <Flame className='h-5 w-5 text-primary' />
                <span className='font-semibold text-foreground'>
                  {workoutData.calories} kcal
                </span>
              </div>
            </div>
          </div>

          <section className='bg-card p-6 rounded-2xl shadow-sm'>
            <h2 className='text-2xl font-bold text-foreground'>
              {workoutData.title}
            </h2>
            <p className='mt-3 text-muted-foreground leading-relaxed'>
              {workoutData.description}
            </p>
          </section>

          <section className='space-y-4'>
            <div className='flex justify-between items-baseline'>
              <h3 className='text-xl font-bold text-foreground'>Rounds</h3>
              <span className='text-sm font-semibold text-muted-foreground'>
                1/8
              </span>
            </div>
            <div className='space-y-3'>
              {workoutData.rounds.map((round) => (
                <div
                  key={round.name}
                  className='bg-card p-4 rounded-xl flex items-center justify-between shadow-sm transition-transform duration-200 hover:scale-[1.02] hover:shadow-md'
                >
                  <div className='flex items-center gap-4'>
                    <img
                      src={round.imageUrl}
                      alt={round.name}
                      className='w-16 h-16 object-cover rounded-lg'
                    />
                    <div>
                      <p className='font-bold text-foreground'>{round.name}</p>
                      <p className='text-sm text-muted-foreground'>
                        {round.duration}
                      </p>
                    </div>
                  </div>
                  <button
                    aria-label={`Play ${round.name}`}
                    className='bg-secondary p-3 rounded-full text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-200'
                  >
                    <Play className='h-5 w-5' fill='currentColor' />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <footer className='pt-4 pb-2'>
            <button
              onClick={() => setIsWorkoutStarted(true)}
              className='w-full bg-orange-500 text-white font-bold py-4 rounded-full text-lg shadow-lg shadow-primary/30 hover:opacity-90 transition-all duration-200 transform hover:scale-[1.03]'
            >
              Let&apos;s Workout
            </button>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Index;
