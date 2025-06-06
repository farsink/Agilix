"use client";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./Pages/Index";
import PhysicalInfo from "./Pages/PhysicalInfo";
import NotFound from "./Pages/NotFound";
import FitnessLevel from "./Pages/FitnessLevel";
import WorkoutPreferences from "./Pages/WorkoutPreferences";
import EquipmentSpace from "./Pages/EquipmentSpace";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HealthSafety from "./Pages/Health";
import Completion from "./Pages/Completion";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache data for 5 minutes
      staleTime: 5 * 60 * 1000,
      // Keep data in cache for 10 minutes
      gcTime: 10 * 60 * 1000,
      // Retry failed requests 3 times
      retry: 3,
      // Don't refetch on window focus
      refetchOnWindowFocus: false,
      // Refetch on network reconnect
      refetchOnReconnect: true,
    },
  },
});

const UserRegistered: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/UserRegistered' element={<Index />} />
          <Route path='/physical-info' element={<PhysicalInfo />} />
          <Route path='/fitness-level' element={<FitnessLevel />} />
          <Route path='/workout-preferences' element={<WorkoutPreferences />} />
          <Route path='/equipment-space' element={<EquipmentSpace />} />
          <Route path='/health-safety' element={<HealthSafety />} />
          <Route path='/completion' element={<Completion />} />

          <Route path='*' element={<Index />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default UserRegistered;
