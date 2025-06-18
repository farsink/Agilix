import { WorkoutPlan } from "../components/WorkoutPlan";
import { ArrowRight } from "lucide-react";

const TodaysIndex = () => {
  return (
    <div className='w-full bg-[#F8F9FA] text-foreground py-8 md:py-16 overflow-x-hidden'>
      <main className='container mx-auto'>
        <div className='flex items-center justify-between mb-8 px-4'>
          <h1 className='text-3xl md:text-4xl font-bold text-left text-[#2C3E50]'>
            Todays&apos;
            <br />
            Workout Plan
          </h1>
          <button
            title='View Workout Plan'
            className='bg-[#F88923] text-white rounded-full p-3 hover:bg-[#FF6B35] transition-colors shadow-lg'
          >
            <ArrowRight size={20} />
          </button>
        </div>
        <WorkoutPlan />
      </main>
    </div>
  );
};

export default TodaysIndex;
