"use client";
import { useUserProfile } from "@/hooks/useUser";
import React from "react";
import { UserResponse } from "../dashboard/page";

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
