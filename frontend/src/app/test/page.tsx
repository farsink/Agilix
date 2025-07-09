"use client";
import { useUserProfile } from "@/hooks/useUser";
import { useStackAuthApi } from "@/Services/api/Stackclientapi";
import React from "react";
import { UserResponse } from "../dashboard/page";
import { Exercise2 } from "@/types/workout";

const Test: React.FC = () => {
  const { data: user } = useUserProfile() as {
    data: UserResponse;
    isLoading: boolean;
    error: { message: string };
  };

  const returnallExircises = () => {
    const exercises = user?.data.WorkoutPlan.weeklySchedule;
    return exercises;
  };
  return <div>{JSON.stringify(returnallExircises())}</div>;
};

export default Test;
