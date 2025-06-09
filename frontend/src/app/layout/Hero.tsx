"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface imagedatatype {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const imagedata: imagedatatype[] = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Strava_Logo.svg",
    alt: "Strava Logo",
    width: 50,
    height: 300,
  },

  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Rablid-Health%2C_fitness_and_wellness.svg/640px-Rablid-Health%2C_fitness_and_wellness.svg.png",
    alt: "Rablid Logo",
    width: 50,
    height: 600,
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Logo-verticale-accademia-italiana-fitness.svg/640px-Logo-verticale-accademia-italiana-fitness.svg.png",
    alt: "Accademia Logo",
    width: 50,
    height: 100,
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Fitness_First_Logo.svg/640px-Fitness_First_Logo.svg.png",
    alt: "Fitness First Logo",
    width: 100,
    height: 100,
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Fitbit_logo16.svg/640px-Fitbit_logo16.svg.png",
    alt: "Fitbit Logo",
    width: 100,
    height: 100,
  },
];

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      className='relative bg-gradient-to-br from-[#fff2ec] via-white to-white pt-24 lg:pt-32 pb-16 lg:pb-20 overflow-hidden'
      id='home'
    >
      <div className='container px-4 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center'>
          <div
            className={cn(
              "max-w-2xl transition-all duration-700 transform",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            )}
          >
            <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 lg:mb-6 leading-tight'>
              <span className='bg-gradient-to-r from-[#ea8455] to-[#ff6b2b] text-transparent bg-clip-text'>
                Train Smarter.
              </span>
              <br />
              <span className='text-neutral-900'> Move Freer.</span>
            </h1>
            <p className='text-neutral-600 text-base sm:text-lg mb-6 lg:mb-8 leading-relaxed max-w-lg'>
              Join the waitlist for AI-powered workouts that adapt to you.
              Experience personalized training plans crafted around your unique
              body, goals, and available equipment. We focus on building real
              agility, strength, and measurable progress - delivering pure
              results without any unnecessary complications.
            </p>

            <div className='flex flex-wrap gap-3 sm:gap-4 mb-8 lg:mb-12'>
              <Button
                size='lg'
                className='bg-[#ea8455] hover:bg-[#ff6b2b] text-white rounded-full px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg w-full sm:w-auto'
                onClick={() => navigate.push("/handler/sign-up")}
              >
                Get Started
              </Button>
              <Button
                variant='outline'
                size='lg'
                className='rounded-full px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg border-[#ea8455] hover:bg-[#fff2ec] text-[#ea8455] flex items-center gap-2 w-full sm:w-auto justify-center'
              >
                <Play className='w-4 h-4 sm:w-5 sm:h-5' /> Watch a demo
              </Button>
            </div>

            <div className='space-y-1 sm:space-y-2'>
              <div className='flex items-center gap-2'>
                <div className='flex'>
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className='w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current'
                      viewBox='0 0 24 24'
                    >
                      <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
                    </svg>
                  ))}
                </div>
                <span className='font-semibold text-base sm:text-lg'>4.9</span>
                <span className='text-neutral-500 text-sm sm:text-base'>
                  /5.0
                </span>
              </div>
              <p className='text-neutral-600 text-sm sm:text-base'>
                Tested software reviewers
              </p>
            </div>
          </div>

          <div
            className={cn(
              "relative transition-all duration-1000 delay-300 transform",
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-8 opacity-0"
            )}
          >
            <div className='relative aspect-[4/3] max-w-xl mx-auto lg:max-w-none'>
              <div className='absolute inset-0 bg-gradient-to-br from-[#ffd4c2] to-[#fff2ec] rounded-2xl sm:rounded-3xl transform rotate-6 scale-95' />
              <div className='absolute inset-0 bg-gradient-to-br from-[#fff2ec]/80 to-white rounded-2xl sm:rounded-3xl shadow-xl'>
                <div className='absolute inset-0 bg-gradient-to-br from-[#ffd4c2]/50 to-transparent rounded-2xl sm:rounded-3xl overflow-hidden' />
                <Image
                  src='/assets/watercolor.png'
                  alt='watercolr'
                  width={500}
                  height={500}
                  className='w-full h-full object-cover inline-block align-middle hover:scale-110 hover:-translate-y-1 transition-all duration-300 hover:blur-lg ease-in-out rounded-2xl sm:rounded-3xl'
                  style={{
                    transform: "perspective(1px) translateZ(0)",
                    boxShadow: "0 0 1px rgba(0, 0, 0, 0)",
                  }}
                />
                <div className='absolute inset-0 rounded-2xl sm:rounded-3xl overflow-visible'>
                  <Image
                    src='/assets/hero-im.png'
                    alt='hero'
                    width={500}
                    height={500}
                    className='absolute inset-0 w-full h-full object-contain z-10 inline-block align-middle hover:scale-110 hover:-translate-y-4 hover:rotate-1 duration-300 ease-in-out transition-all'
                    style={{
                      transform: "perspective(1000px) translateZ(0)",
                      boxShadow: "0 0 1px rgba(0, 0, 0, 0)",
                      transformStyle: "preserve-3d",
                      willChange: "transform",
                    }}
                  />
                </div>
                <div className='absolute top-2 sm:top-4 right-2 sm:right-4 flex gap-2 sm:gap-3'>
                  <div className='w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-orange-400 shadow-lg'>
                    <svg
                      width='16'
                      height='16'
                      className='sm:w-5 sm:h-5'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='#ea8455'
                      strokeWidth='2'
                    >
                      <path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' />
                    </svg>
                  </div>
                  <div className='w-8 h-8 sm:w-10 sm:h-10 bg-[#ea8455] shadow-purple-700  rounded-full flex items-center justify-center shadow-lg'>
                    <svg
                      width='16'
                      height='16'
                      className='sm:w-5 sm:h-5'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='white'
                      strokeWidth='2'
                    >
                      <path d='M5 12h14M12 5l7 7-7 7' />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-8 lg:mt-12 bg-[#2d2d3d] py-6 lg:py-5 mx-5 lg:mx-8 rounded-xl'>
        <div className='container px-4 lg:px-8 overflow-hidden'>
          <div className='flex justify-between items-center gap-4 sm:gap-6 min-w-[600px] animate-marquee'>
            {imagedata.length > 0 &&
              imagedata.map((e, idx) => (
                <Image
                  key={idx}
                  width={e.width}
                  height={e.height}
                  src={e.src}
                  alt={e.alt}
                  className='h-3 sm:h-5 brightness-0 invert opacity-70 hover:opacity-100 transition-opacity'
                />
              ))}
          </div>
        </div>
      </div>
      <section className='my-16' id='feature'>
        <h2
          className='text-4xl font-bold text-center mb-12'
          style={{ color: "#333" }}
        >
          Key Features
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-5xl mx-auto'>
          {/* Personalized Plans */}
          <div className='flex flex-col items-center text-center px-4 py-6 rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer'>
            <div
              className='w-30 h-24 mb-6 rounded-full flex items-center justify-center'
              style={{ backgroundColor: "#E8F5E9" }}
            >
              {/* Placeholder for Personalized Plans Icon */}
              <Image
                src='https://cdn.prod.website-files.com/5e51c674258ffe10d286d30a/5e5358c38e249393f1066ab8_peep-61.svg'
                alt='Personalized Plans Icon'
                width={300}
                height={100}
              />
            </div>
            <h3
              className='text-xl font-semibold mb-2'
              style={{ color: "#333" }}
            >
              Personalized Plans
            </h3>
            <p className='text-gray-700'>Custom workouts for you</p>
          </div>

          {/* Progress Tracking */}
          <div className='flex flex-col items-center text-center px-4 py-6 rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer'>
            <div
              className='w-30 h-24 mb-6 rounded-full flex items-center justify-center'
              style={{ backgroundColor: "#E8F5E9" }}
            >
              {/* Placeholder for Progress Tracking Icon */}
              <Image
                src='https://cdn.prod.website-files.com/5e51c674258ffe10d286d30a/5e535aa1d871310896104715_peep-77.svg'
                alt='Progress Tracking Icon'
                width={300}
                height={80}
              />
            </div>
            <h3
              className='text-xl font-semibold mb-2'
              style={{ color: "#333" }}
            >
              Progress Tracking
            </h3>
            <p className='text-gray-700'>Monitor your performance</p>
          </div>

          {/* Smart Notifications */}
          <div className='flex flex-col items-center text-center px-4 py-6 rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer'>
            <div
              className='w-30 h-24 mb-6 rounded-full flex items-center justify-center'
              style={{ backgroundColor: "#E8F5E9" }}
            >
              {/* Placeholder for Smart Notifications Icon */}
              <Image
                src='https://cdn.prod.website-files.com/5e51c674258ffe10d286d30a/5e5354c88e249320e005285e_peep-32.svg'
                alt='Smart Notifications Icon'
                width={300}
                height={80}
              />
            </div>
            <h3
              className='text-xl font-semibold mb-2'
              style={{ color: "#333" }}
            >
              Smart Notifications
            </h3>
            <p className='text-gray-700'>Get helpful reminders</p>
          </div>
        </div>
      </section>
    </section>
  );
}
