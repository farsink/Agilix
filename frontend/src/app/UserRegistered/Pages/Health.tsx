import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Hospital, Lightbulb } from "lucide-react";

import ProgressIndicator from "@/components/ProgressIndicator";
import { useStackAuthApi } from "@/Services/api/Stackclientapi";
import { AxiosResponse } from "axios";

const HealthSafety = () => {
  const navigate = useNavigate();
  const [injuries, setInjuries] = useState<string[]>([]);
  const [otherInjury, setOtherInjury] = useState("");
  const [medicalConditions, setMedicalConditions] = useState<string[]>([]);
  const [otherCondition, setOtherCondition] = useState("");
  const { api } = useStackAuthApi();

  const injuryOptions = [
    { id: "back", label: "Back problems" },
    { id: "knee", label: "Knee issues" },
    { id: "shoulder", label: "Shoulder problems" },
    { id: "other", label: "Other" },
    { id: "none", label: "None" },
  ];

  const medicalOptions = [
    { id: "heart", label: "Heart condition" },
    { id: "diabetes", label: "Diabetes" },
    { id: "blood_pressure", label: "High blood pressure" },
    { id: "other", label: "Other" },
    { id: "none", label: "None" },
  ];

  useEffect(() => {
    const storedHealthData = sessionStorage.getItem("healthData");
    if (storedHealthData) {
      const parsedHealthData = JSON.parse(storedHealthData);
      setInjuries(parsedHealthData.injuries);
      setMedicalConditions(parsedHealthData.medicalConditions);
    }
  }, []);

  const handleBack = () => {
    navigate("/equipment-space");
  };

  const handleInjuryChange = (injuryId: string, checked: boolean) => {
    if (injuryId === "none") {
      setInjuries(checked ? ["none"] : []);
      setOtherInjury("");
    } else {
      setInjuries((prev) => {
        const filtered = prev.filter((item) => item !== "none");
        return checked
          ? [...filtered, injuryId]
          : filtered.filter((item) => item !== injuryId);
      });
      if (injuryId !== "other") {
        setOtherInjury("");
      }
    }
  };

  const SentProfileData = async () => {
    try {
      // Retrieve data from sessionStorage
      const equipmentData = JSON.parse(
        sessionStorage.getItem("equipmentData") || "{}"
      );
      const fitnessInfo = JSON.parse(
        sessionStorage.getItem("fitnessInfo") || "{}"
      );
      const healthData = JSON.parse(
        sessionStorage.getItem("healthData") || "{}"
      );
      const physicalInfo = JSON.parse(
        sessionStorage.getItem("physicalInfo") || "{}"
      );
      const selectedGoal = sessionStorage.getItem("selectedGoal") || "";
      const secondaryGoals = sessionStorage.getItem("secondaryGoals") || "";
      const workoutPreferences = JSON.parse(
        sessionStorage.getItem("workoutPreferences") || "{}"
      );

      // Retrieve userStackId (assuming it's stored in sessionStorage)
      const userStackId = sessionStorage.getItem("userStackId");

      if (!userStackId) {
        console.error("User Stack ID is missing");
        return;
      }

      // Create FormData object
      const formData = new FormData();
      formData.append("userStackId", userStackId);
      formData.append("equipmentData", JSON.stringify(equipmentData));
      formData.append("fitnessInfo", JSON.stringify(fitnessInfo));
      formData.append("healthData", JSON.stringify(healthData));
      formData.append("physicalInfo", JSON.stringify(physicalInfo));
      formData.append("selectedGoal", selectedGoal);
      formData.append("secondaryGoals", secondaryGoals);
      formData.append("workoutPreferences", JSON.stringify(workoutPreferences));

      // Send data to the server
      const response: AxiosResponse = await api.post(
        "/user/profile/setup",
        formData
      );
      console.log("Data sent successfully:", response);
    } catch (error) {
      console.error("Error sending profile data:", error);
    }
  };
  const handleMedicalChange = (conditionId: string, checked: boolean) => {
    if (conditionId === "none") {
      setMedicalConditions(checked ? ["none"] : []);
      setOtherCondition("");
    } else {
      setMedicalConditions((prev) => {
        const filtered = prev.filter((item) => item !== "none");
        return checked
          ? [...filtered, conditionId]
          : filtered.filter((item) => item !== conditionId);
      });
      if (conditionId !== "other") {
        setOtherCondition("");
      }
    }
  };

  const handleFinish = () => {
    const healthData = {
      injuries: injuries.includes("none")
        ? []
        : injuries
            .filter((i) => i !== "other")
            .concat(otherInjury ? [otherInjury] : []),
      medicalConditions: medicalConditions.includes("none")
        ? []
        : medicalConditions
            .filter((c) => c !== "other")
            .concat(otherCondition ? [otherCondition] : []),
      completedAt: new Date().toISOString(),
    };

    console.log("Health & Safety information:", healthData);
    if (healthData !== null) {
      sessionStorage.setItem("healthData", JSON.stringify(healthData));
    }

    SentProfileData();
    navigate("/completion");
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white sm:mt-0 mt-10'>
      <main className='px-4 py-8'>
        <div className='max-w-md mx-auto'>
          <div className='flex items-center justify-between mb-6'>
            <Button
              variant='ghost'
              size='icon'
              onClick={handleBack}
              className='h-10 w-10 text-gray-500 hover:text-gray-700'
            >
              <ArrowLeft className='h-5 w-5' />
            </Button>
            <ProgressIndicator currentStep={6} totalSteps={6} />
            <div className='w-10'></div>
          </div>

          <div className='text-center mb-8'>
            <div className='flex items-center justify-center mb-4'>
              <Hospital className='h-8 w-8 text-orange-500 mr-2' />
              <h1 className='text-2xl md:text-3xl font-semibold text-gray-800'>
                Health & Safety
              </h1>
            </div>
            <p className='text-gray-500 text-sm'>Optional but helpful</p>
          </div>

          <div className='space-y-6 mb-8'>
            {/* Injuries Section */}
            <div className='bg-white p-6 rounded-xl border border-gray-100 shadow-sm'>
              <h2 className='text-lg font-bold text-gray-900 mb-4'>
                Any injuries or limitations?
              </h2>
              <div className='space-y-3'>
                {injuryOptions.map((option) => (
                  <div key={option.id} className='flex items-center space-x-3'>
                    <Checkbox
                      id={`injury-${option.id}`}
                      checked={injuries.includes(option.id)}
                      onCheckedChange={(checked) =>
                        handleInjuryChange(option.id, checked === true)
                      }
                      className='data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500'
                    />
                    <label
                      htmlFor={`injury-${option.id}`}
                      className='text-gray-700 font-medium flex-1 cursor-pointer'
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
                {injuries.includes("other") && (
                  <div className='ml-6 animate-fade-in'>
                    <Input
                      placeholder='Please specify...'
                      value={otherInjury}
                      onChange={(e) => setOtherInjury(e.target.value)}
                      className='focus:ring-orange-500 focus:border-orange-500'
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Medical Conditions Section */}
            <div className='bg-white p-6 rounded-xl border border-gray-100 shadow-sm'>
              <h2 className='text-lg font-bold text-gray-900 mb-4'>
                Medical conditions?
              </h2>
              <div className='space-y-3'>
                {medicalOptions.map((option) => (
                  <div key={option.id} className='flex items-center space-x-3'>
                    <Checkbox
                      id={`medical-${option.id}`}
                      checked={medicalConditions.includes(option.id)}
                      onCheckedChange={(checked) =>
                        handleMedicalChange(option.id, checked === true)
                      }
                      className='data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500'
                    />
                    <label
                      htmlFor={`medical-${option.id}`}
                      className='text-gray-700 font-medium flex-1 cursor-pointer'
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
                {medicalConditions.includes("other") && (
                  <div className='ml-6 animate-fade-in'>
                    <Input
                      placeholder='Please specify...'
                      value={otherCondition}
                      onChange={(e) => setOtherCondition(e.target.value)}
                      className='focus:ring-orange-500 focus:border-orange-500'
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Info Note */}
            <div className='bg-orange-50 p-4 rounded-lg border border-orange-200'>
              <div className='flex items-start space-x-3'>
                <Lightbulb className='h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0' />
                <p className='text-sm text-orange-800'>
                  This helps us create safer workouts for you
                </p>
              </div>
            </div>
          </div>

          <Button
            onClick={handleFinish}
            className='w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95'
          >
            Finish Setup
          </Button>

          <div className='text-center mt-6'>
            <p className='text-xs text-gray-400'>
              Step 6 of 6 • Personalized fitness journey
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HealthSafety;
