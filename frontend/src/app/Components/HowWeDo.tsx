import Image from "next/image";
import React from "react";

const HowWeDoIt: React.FC = () => {
  return (
    <section id='Howitworks'>
      <div className='max-w-6xl mx-auto px-6 py-16 bg-gray-50 overflow-hidden'>
        <div className='text-center mb-16'>
          <span className='inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold tracking-wide uppercase mb-4'>
            PROCESS
          </span>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900'>
            How It Works
          </h2>
        </div>

        <div className='space-y-24 overflow-hidden'>
          {/* Step 01 - Tell Us About Yourself */}
          <div className='flex flex-col lg:flex-row items-center gap-12 relative'>
            {/* Step Number - positioned at top of dashed line */}
            <div className='absolute hidden sm:block  top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:left-1/2 lg:top-0 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 z-10 mt-5'>
              <div className='bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-sm border border-gray-200'>
                <span className='text-sm font-medium text-gray-700'>01</span>
              </div>
            </div>

            {/* Dashed Line - starts from the number */}
            <div className='hidden lg:block absolute left-1/2 top-5 bottom-0 w-px border-l-2 border-dashed border-gray-300 transform -translate-x-1/2'></div>

            {/* Illustration */}
            <div className='flex-1 lg:pr-8 relative'>
              {/* Number positioned at middle bottom for small screens */}
              <div className='lg:hidden absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-10'>
                <div className='bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-sm border border-gray-200'>
                  <span className='text-sm font-medium text-gray-700'>01</span>
                </div>
              </div>

              <div className='relative h-80 flex items-center justify-center'>
                {/* Enhanced Gradient Background Effect */}
                <div className='absolute inset-0 bg-gradient-to-br from-purple-200/80 via-pink-100/60 to-blue-200/80 rounded-3xl transform scale-150 blur-3xl animate-gradient'></div>
                <div className='absolute inset-4 bg-gradient-to-tr from-purple-100 via-transparent to-pink-100 rounded-3xl transform scale-125 blur-2xl'></div>
                <div className='absolute inset-8 bg-gradient-to-r from-blue-100/50 via-purple-100/50 to-pink-100/50 rounded-3xl transform scale-110 blur-xl'></div>

                {/* Illustration */}
                <div className='relative z-10'>
                  <Image
                    src={"/assets/illustration_1.png"}
                    width={300}
                    height={300}
                    alt='training'
                    className='relative z-10 drop-shadow-xl'
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className='flex-1 lg:pl-8'>
              <h3 className='text-2xl md:text-3xl font-bold text-gray-900 mb-6'>
                Tell Us About Yourself
              </h3>
              <ul className='space-y-4 text-gray-600 text-lg'>
                <li className='flex items-start'>
                  <span className='w-2 h-2 bg-blue-500 rounded-full mt-3 mr-4 flex-shrink-0'></span>
                  Answer 3 Questions: Share your weight, height, and fitness
                  goal (e.g., weight loss, muscle gain).
                </li>
                <li className='flex items-start'>
                  <span className='w-2 h-2 bg-blue-500 rounded-full mt-3 mr-4 flex-shrink-0'></span>
                  Upload a Photo: Snap a selfie to help us estimate body metrics
                  like posture and muscle tone.
                </li>
                <li className='flex items-start'>
                  <span className='w-2 h-2 bg-blue-500 rounded-full mt-3 mr-4 flex-shrink-0'></span>
                  Select Your Equipment: Choose what you have access to
                  (dumbbells, treadmill, resistance bands, etc.).
                </li>
              </ul>
            </div>
          </div>

          {/* Step 02 - Let AI Do the Work */}
          <div className='flex flex-col lg:flex-row-reverse items-center gap-12 relative'>
            {/* Step Number - positioned at top of dashed line */}
            <div className='absolute top-0  hidden sm:block left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:left-1/2 lg:top-0 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 z-10'>
              <div className='bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-sm border border-gray-200'>
                <span className='text-sm font-medium text-gray-700'>02</span>
              </div>
            </div>

            {/* Dashed Line - starts from the number */}
            <div className='hidden lg:block absolute left-1/2 top-5 bottom-0 w-px border-l-2 border-dashed border-gray-300 transform -translate-x-1/2'></div>

            {/* Illustration */}
            <div className='flex-1 lg:pl-8 relative'>
              {/* Number positioned at middle bottom for small screens */}
              <div className='lg:hidden absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-10'>
                <div className='bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-sm border border-gray-200'>
                  <span className='text-sm font-medium text-gray-700'>02</span>
                </div>
              </div>

              <div className='relative h-80 flex items-center justify-center'>
                {/* Gradient Background Effect */}
                <div className='absolute inset-0 bg-gradient-to-br from-[#F9CB11]/80 via-pink-100/60 to-blue-200/80 rounded-3xl transform scale-150 blur-3xl animate-gradient'></div>
                <div className='absolute inset-4 bg-gradient-to-tr from-purple-100 via-transparent to-pink-100 rounded-3xl transform scale-125 blur-2xl'></div>
                <div className='absolute inset-8 bg-gradient-to-r from-blue-100/50 via-purple-100/50 to-[#B32D8B]/10 rounded-3xl transform scale-110 blur-xl'></div>
                {/* <div className='absolute inset-8 bg-gradient-to-r from-[#CB0241]/50 via-[#EBEE34]/50 to-[#CB0241]/50 rounded-3xl transform scale-110 blur-6xl'></div> */}
                {/* Placeholder Illustration */}
                <div className='relative z-10 text-gray-400 text-center'>
                  <Image
                    src={"/assets/illustration_2.png"}
                    width={300}
                    height={300}
                    alt='training'
                    className='relative z-10 drop-shadow-xl'
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className='flex-1 lg:pr-8'>
              <h3 className='text-2xl md:text-3xl font-bold text-gray-900 mb-6'>
                Let AI Do the Work
              </h3>
              <ul className='space-y-4 text-gray-600 text-lg'>
                <li className='flex items-start'>
                  <span className='w-2 h-2 bg-blue-500 rounded-full mt-3 mr-4 flex-shrink-0'></span>
                  Smart Analysis: Our AI reviews your data, goals, and
                  equipment.
                </li>
                <li className='flex items-start'>
                  <span className='w-2 h-2 bg-blue-500 rounded-full mt-3 mr-4 flex-shrink-0'></span>
                  Custom Plan Generation: A 30-day workout plan is created with
                  exercises, reps, and rest days.
                </li>
                <li className='flex items-start'>
                  <span className='w-2 h-2 bg-blue-500 rounded-full mt-3 mr-4 flex-shrink-0'></span>
                  Instant Feedback: Review your plan and request adjustments if
                  needed.
                </li>
              </ul>
            </div>
          </div>

          {/* Step 03 - Train & Track Progress */}
          <div className='flex flex-col lg:flex-row items-center gap-12 relative'>
            {/* Step Number - positioned at top of dashed line */}
            <div className='absolute top-0 left-1/2  hidden sm:block transform -translate-x-1/2 -translate-y-1/2 lg:left-1/2 lg:top-0 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 z-10'>
              <div className='bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-sm border border-gray-200'>
                <span className='text-sm font-medium text-gray-700'>03</span>
              </div>
            </div>

            {/* Dashed Line - starts from the number */}
            <div className='hidden lg:block absolute left-1/2 top-5 bottom-0 w-px border-l-2 border-dashed border-gray-300 transform -translate-x-1/2'></div>

            {/* Illustration */}
            <div className='flex-1 lg:pr-8 relative'>
              {/* Number positioned at middle bottom for small screens */}
              <div className='lg:hidden absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-10'>
                <div className='bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-sm border border-gray-200'>
                  <span className='text-sm font-medium text-gray-700'>03</span>
                </div>
              </div>

              <div className='relative h-80 flex items-center justify-center'>
                {/* Gradient Background Effect */}
                <div className='absolute inset-0 bg-gradient-to-br from-[#DA31EC]/10 via-pink-100/60 to-[#DBEB56]/40 rounded-3xl transform scale-150 blur-3xl animate-gradient'></div>
                <div className='absolute inset-4 bg-gradient-to-tr from-[#F33326]/20 via-transparent to-[DBEB56]/80 rounded-3xl transform scale-125 blur-2xl'></div>
                <div className='absolute inset-8 bg-gradient-to-r from-blue-100/50 via-purple-100/50 to-[#F33326]/10 rounded-3xl transform scale-110 blur-xl'></div>

                {/* Placeholder Illustration */}
                <div className='relative z-10 text-gray-400 text-center'>
                  <Image
                    src={"/assets/illustration_3.png"}
                    width={300}
                    height={300}
                    alt='training'
                    className='relative z-10 drop-shadow-xl'
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className='flex-1 lg:pl-8'>
              <h3 className='text-2xl md:text-3xl font-bold text-gray-900 mb-6'>
                Train & Track Progress
              </h3>
              <ul className='space-y-4 text-gray-600 text-lg'>
                <li className='flex items-start'>
                  <span className='w-2 h-2 bg-blue-500 rounded-full mt-3 mr-4 flex-shrink-0'></span>
                  Daily Workouts: Follow step-by-step routines tailored to your
                  schedule.
                </li>
                <li className='flex items-start'>
                  <span className='w-2 h-2 bg-blue-500 rounded-full mt-3 mr-4 flex-shrink-0'></span>
                  Progress Dashboard: Track metrics like reps completed, weight
                  lifted, or calories burned.
                </li>
                <li className='flex items-start'>
                  <span className='w-2 h-2 bg-blue-500 rounded-full mt-3 mr-4 flex-shrink-0'></span>
                  Adaptive Updates: The AI adjusts your plan as you improve or
                  change goals.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeDoIt;
