"use client";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./Pages/Index";
import PhysicalInfo from "./Pages/PhysicalInfo";
import FitnessLevel from "./Pages/FitnessLevel";
import WorkoutPreferences from "./Pages/WorkoutPreferences";
import EquipmentSpace from "./Pages/EquipmentSpace";
import HealthSafety from "./Pages/Health";
import Completion from "./Pages/Completion";

const UserRegistered: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/UserRegistered' element={<Index />} />
        <Route path='/physical-info' element={<PhysicalInfo />} />
        <Route path='/fitness-level' element={<FitnessLevel />} />
        <Route path='/workout-preferences' element={<WorkoutPreferences />} />
        <Route path='/equipment-space' element={<EquipmentSpace />} />
        <Route path='/health-safety' element={<HealthSafety />} />
        <Route path='/completion/:id' element={<Completion />} />

        <Route path='*' element={<Index />} />
      </Routes>
    </BrowserRouter>
  );
};

export default UserRegistered;
