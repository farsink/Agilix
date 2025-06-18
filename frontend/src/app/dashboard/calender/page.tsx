"use client";
import React from "react";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

import Calendar from "./calender";
import { useRouter } from "next/navigation";
import TodaysIndex from "./TodaysIndex";
import MilestoneTracker from "./milestonetracker";

export default function WorkoutCalendar() {
  const router = useRouter();
  // Today's workout data

  return (
    <div className='min-h-[200vh] font-sans bg-[#F8F9FA]'>
      <div className='max-w-full mx-auto p-0 bg-[#F8F9FA] min-h-screen'>
        {/* Header */}
        <div className='flex items-center justify-between px-4 py-3 bg-white'>
          {/* Left side - Back button and title */}
          <div className='flex items-center gap-3'>
            <Button
              onClick={() => router.back()}
              className='flex items-center justify-center w-10 h-10 bg-white hover:bg-gray-100 text-gray-600 hover:text-black border border-gray-300 hover:border-gray-500 rounded-full transition-all duration-200 ease-in-out active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-200'
            >
              <ArrowLeft className='w-4 h-4' />
            </Button>
            <h1 className='text-lg font-normal text-gray-900 font-sans'>
              Calendar
            </h1>
          </div>

          {/* Right side - Today's date */}
          <div className='flex items-center'>
            <div className='px-2 border border-gray-300 rounded-2xl bg-gray-50'>
              <span className='text-xs font-normal text-gray-600 font-sans'>
                June 15
              </span>
            </div>
          </div>
        </div>

        {/* Monthly Overview Section */}
        <div className='m-3'>
          <Calendar />
        </div>

        {/* Today's Workout Section */}
        <TodaysIndex />

        {/* Milestone Tracker Section */}
        <MilestoneTracker />
      </div>
    </div>
  );
}
