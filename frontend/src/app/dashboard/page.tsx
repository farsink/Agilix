"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ComposedChart,
} from "recharts";
import Image from "next/image";
import ProfileComponent from "./components/Profilesection";
import TodayActivity from "./TodaysActivity";

const FitnessDashboard = () => {
  const [activeTab, setActiveTab] = useState("week");

  // Sample data for the chart
  const weekData = [
    { day: "M", workout: 45, calories: 320 },
    { day: "T", workout: 60, calories: 450 },
    { day: "W", workout: 30, calories: 280 },
    { day: "T", workout: 90, calories: 650 },
    { day: "F", workout: 75, calories: 520 },
    { day: "S", workout: 120, calories: 780 },
    { day: "S", workout: 45, calories: 310 },
  ];

  const chartConfig = {
    workout: {
      label: "Workout Time",
      color: "#9CA3AF",
    },
    calories: {
      label: "Calories",
      color: "#FF7A00",
    },
  };

  return (
    <div className='min-h-screen bg-[#F8F9FA]'>
      {/* Header */}
      <div className='bg-[#F8F9FA] px-6 py-4 flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <div className='w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center'>
            <span className='text-white text-xl font-semibold'>S</span>
          </div>
          <div>
            <p className='text-base font-bold text-gray-800'>Hello, Sandra</p>
            <p className='text-sm text-gray-500 font-light'>Today 25 Nov.</p>
          </div>
        </div>
        <div className='w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center'>
          <Search className='w-5 h-5 text-gray-600' />
        </div>
      </div>

      {/* Streak and Level Section */}
      <div className='bg-white px-4 py-4 mx-4 mt-4 rounded-2xl'>
        <div className='flex items-center justify-between mb-3'>
          <div className='text-left'>
            <p className='text-xs text-orange-500 font-bold border border-orange-300 bg-amber-50 px-2 py-1 rounded-lg inline-block'>
              12 DAY STREAK
            </p>
          </div>
          <div className='text-right'>
            <p className='text-sm text-gray-500 font-medium'>
              XP: 2,450 LEVEL 8
            </p>
          </div>
        </div>
        <div className='w-full bg-gray-200 rounded-full h-2 mb-2'>
          <div
            className='h-2 rounded-full bg-gradient-to-r from-orange-400 to-orange-600'
            style={{ width: "75%" }}
          ></div>
        </div>
        <p className='text-sm text-gray-600 text-center'>
          You&apos;re on fire! Keep the momentum going!
        </p>
      </div>

      {/* Main Content */}
      <div className='p-4 space-y-6 pb-20'>
        {/* Daily Challenge */}
        <div className='bg-gradient-to-r from-purple-400 to-orange-400 rounded-2xl p-6 text-white relative overflow-hidden'>
          <div className='relative z-10'>
            <h2 className='text-2xl font-bold mb-2'>Daily challenge</h2>
            <p className='text-sm opacity-90 mb-4'>
              Do your plan before 09:00 AM
            </p>
            <div className='flex items-center gap-2'>
              <div className='flex -space-x-2'>
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className='w-6 h-6 bg-white/20 rounded-full border border-white/30'
                  ></div>
                ))}
              </div>
              <span className='text-sm'>+4</span>
            </div>
          </div>
          <div className='absolute right-5 -top-2'>
            {/* <div className='w-19 h-19 bg-white/20 rounded-full flex items-center justify-center'> */}
            <Image
              src='/assets/dashboard-daily-chalenge.png'
              alt='daily-chalenge'
              width={130}
              height={130}
            />
            {/* </div> */}
          </div>
        </div>

        {/* Calendar Week */}
        <div className='flex justify-between items-center'>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (day, index) => (
              <div key={day} className='text-center'>
                <p className='text-xs text-gray-500 mb-1'>{day}</p>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    index === 3
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {22 + index}
                </div>
              </div>
            )
          )}
        </div>
        <div>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-xl font-bold'>Today&apos;s Activity</h3>
            <span className='text-orange-500 font-medium'>start &#8594;</span>
          </div>
          <div className='grid grid-cols-5 gap-4'>
            {/* Calories Card */}
            <div className='col-span-2 bg-gradient-to-b from-red-400 to-pink-500 rounded-2xl p-4 text-white relative overflow-hidden'>
              <div className='flex flex-col items-center justify-center h-full'>
                <div className='mb-3'>
                  <div className='w-8 h-8 text-white'>
                    <svg viewBox='0 0 24 24' fill='currentColor'>
                      <path d='M20.57,14.86L22,13.43L20.57,12L17,15.57L8.43,7L12,3.43L10.57,2L9.14,3.43L7.71,2L5.57,4.14L4.14,2.71L2.71,4.14L4.14,5.57L2,7.71L3.43,9.14L2,10.57L3.43,12L7,8.43L15.57,17L12,20.57L13.43,22L14.86,20.57L16.29,22L18.43,19.86L19.86,21.29L21.29,19.86L19.86,18.43L22,16.29L20.57,14.86Z' />
                    </svg>
                  </div>
                </div>
                <p className='text-lg font-bold'>1.350</p>
                <p className='text-sm opacity-90'>Calories</p>
              </div>
              <div className='absolute bottom-0 left-0 w-full h-6 bg-white/20 rounded-t-full'></div>
            </div>

            {/* Exercise List */}
            <div className='col-span-3 bg-white rounded-2xl p-4'>
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className='w-1 h-8 bg-blue-500 rounded-full'></div>
                    <div>
                      <p className='font-bold text-gray-800'>Push-ups</p>
                      <p className='text-xs text-gray-500'>Chest, Triceps</p>
                    </div>
                  </div>
                  <p className='text-sm text-gray-600'>3x12</p>
                </div>

                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className='w-1 h-8 bg-green-500 rounded-full'></div>
                    <div>
                      <p className='font-bold text-gray-800'>Squats</p>
                      <p className='text-xs text-gray-500'>Legs, Glutes</p>
                    </div>
                  </div>
                  <p className='text-sm text-gray-600'>3x15</p>
                </div>

                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className='w-1 h-8 bg-orange-500 rounded-full'></div>
                    <div>
                      <p className='font-bold text-gray-800'>Lunges</p>
                      <p className='text-xs text-gray-500'>Legs, Core</p>
                    </div>
                  </div>
                  <p className='text-sm text-gray-600'>3x10</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Statistics Panel */}
        <div className='bg-white rounded-xl shadow-sm p-4'>
          {/* Header */}
          <div className='flex items-center justify-between mb-6'>
            <h3 className='text-xl font-bold text-gray-800'>Activity</h3>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className='mb-6'>
            <TabsList className='grid w-full grid-cols-4 bg-gray-100'>
              <TabsTrigger
                value='day'
                className='data-[state=active]:bg-orange-500 data-[state=active]:text-white'
              >
                Day
              </TabsTrigger>
              <TabsTrigger
                value='week'
                className='data-[state=active]:bg-orange-500 data-[state=active]:text-white'
              >
                Week
              </TabsTrigger>
              <TabsTrigger
                value='month'
                className='data-[state=active]:bg-orange-500 data-[state=active]:text-white'
              >
                Month
              </TabsTrigger>
              <TabsTrigger
                value='year'
                className='data-[state=active]:bg-orange-500 data-[state=active]:text-white'
              >
                Year
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className='mt-6'>
              {/* Statistics Summary */}
              <div className='mb-6'>
                <div className='mb-2'>
                  <p className='text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1'>
                    TOTAL
                  </p>
                  <p className='text-2xl font-bold text-gray-800'>5h 30m</p>
                  <p className='text-sm text-gray-500'>for this week</p>
                </div>
                <div className='mt-4'>
                  <p className='text-lg font-bold text-gray-800'>2 200 KCal</p>
                  <p className='text-xs text-gray-400'>
                    for this week&apos;s activity
                  </p>
                </div>
              </div>

              {/* Chart */}
              {/* Chart Wrapper: fixed height on mobile, taller on larger screens to fully contain chart */}
              <div className='w-full h-64 overflow-hidden'>
                <ChartContainer config={chartConfig} className='w-full h-full'>
                  <ComposedChart
                    data={weekData}
                    width={undefined}
                    height={undefined}
                    margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid
                      strokeDasharray='none'
                      stroke='#f0f0f0'
                      vertical={true}
                      horizontal={false}
                    />
                    <XAxis
                      dataKey='day'
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: "#9CA3AF" }}
                    />
                    <YAxis hide />
                    <Bar
                      dataKey='workout'
                      fill='#9CA3AF'
                      opacity={0.6}
                      radius={[2, 2, 0, 0]}
                      barSize={16}
                    />
                    <Line
                      type='monotone'
                      dataKey='calories'
                      stroke='#FF7A00'
                      strokeWidth={3}
                      dot={{ fill: "#FF7A00", strokeWidth: 0, r: 6 }}
                      activeDot={{
                        r: 10,
                        fill: "#FF7A00",
                        stroke: "#FF7A00",
                        strokeOpacity: 0.3,
                        strokeWidth: 8,
                      }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </ComposedChart>
                </ChartContainer>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Profile Component */}
        <ProfileComponent />

        {/* Today's Activity */}
        <TodayActivity />
      </div>
    </div>
  );
};

export default FitnessDashboard;
