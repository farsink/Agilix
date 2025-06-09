import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toast } from "@/hooks/use-toast";
import ProgressIndicator from "@/components/ProgressIndicator";
import { Minus, Plus, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";


const PhysicalInfo = () => {
  const navigate = useNavigate();
  const [age, setAge] = useState(25);
  const [height, setHeight] = useState([68]); // inches
  const [weight, setWeight] = useState([150]); // pounds
  const [heightUnit, setHeightUnit] = useState("imperial"); // imperial or metric
  const [weightUnit, setWeightUnit] = useState("imperial"); // imperial or metric
  const [gender, setGender] = useState("");

  useEffect(() => {
    const parsePhysicalInfo = () => {
      const storedPhysicalInfo = sessionStorage.getItem("physicalInfo");
      if (storedPhysicalInfo) {
        const parsedPhysicalInfo = JSON.parse(storedPhysicalInfo);
        setAge(parsedPhysicalInfo.age);
        setHeight([parsedPhysicalInfo.height]);
        setWeight([parsedPhysicalInfo.weight]);
        setHeightUnit(parsedPhysicalInfo.heightUnit);
        setWeightUnit(parsedPhysicalInfo.weightUnit);
        setGender(parsedPhysicalInfo.gender);
      }
    };

    parsePhysicalInfo();
  }, []);

  const handleAgeChange = (increment: boolean) => {
    setAge((prev) => {
      if (increment) return Math.min(prev + 1, 100);
      return Math.max(prev - 1, 13);
    });
  };

  const convertHeight = (inches: number, toMetric: boolean) => {
    if (toMetric) {
      return Math.round(inches * 2.54); // to cm
    }
    return inches;
  };

  const convertWeight = (pounds: number, toMetric: boolean) => {
    if (toMetric) {
      return Math.round(pounds * 0.453592); // to kg
    }
    return pounds;
  };

  const formatHeight = (value: number, unit: string) => {
    if (unit === "imperial") {
      const feet = Math.floor(value / 12);
      const inches = value % 12;
      return `${feet}'${inches}"`;
    }
    return `${value} cm`;
  };

  const formatWeight = (value: number, unit: string) => {
    return unit === "imperial" ? `${value} lbs` : `${value} kg`;
  };

  const handleHeightUnitToggle = (newUnit: string) => {
    if (newUnit && newUnit !== heightUnit) {
      setHeightUnit(newUnit);
      if (newUnit === "metric") {
        setHeight([convertHeight(height[0], true)]);
      } else {
        setHeight([Math.round(height[0] / 2.54)]);
      }
    }
  };

  const handleWeightUnitToggle = (newUnit: string) => {
    if (newUnit && newUnit !== weightUnit) {
      setWeightUnit(newUnit);
      if (newUnit === "metric") {
        setWeight([convertWeight(weight[0], true)]);
      } else {
        setWeight([Math.round(weight[0] / 0.453592)]);
      }
    }
  };

  const handleBack = () => {
    navigate("/UserRegistered");
  };

  const handleContinue = () => {
    const physicalData = {
      age,
      height: height[0],
      heightUnit,
      weight: weight[0],
      weightUnit,
      gender: gender || "not specified",
    };

    console.log("Physical information:", physicalData);

    sessionStorage.setItem("physicalInfo", JSON.stringify(physicalData));

    toast({
      title: "Information saved!",
      description: `Age: ${age}, Height: ${formatHeight(
        height[0],
        heightUnit
      )}, Weight: ${formatWeight(weight[0], weightUnit)}`,
    });

    navigate("/fitness-level");
  };

  const heightRange = heightUnit === "imperial" ? [48, 84] : [122, 213]; // 4'0" to 7'0" or 122cm to 213cm
  const weightRange = weightUnit === "imperial" ? [80, 400] : [36, 181]; // 80-400 lbs or 36-181 kg

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white sm:mt-0 mt-10'>
      <main className='px-4 py-8'>
        <div className='max-w-md mx-auto'>
          <div className='flex items-center justify-between mb-8'>
            <Button
              variant='ghost'
              size='icon'
              onClick={handleBack}
              className='ml-2.5 sm:ml-0 text-gray-500 hover:text-gray-700 hover:cursor-pointer'
            >
              <ArrowLeft className='h-5 w-5' />
            </Button>
            <ProgressIndicator currentStep={2} totalSteps={6} />
            <div className='w-10' /> {/* Spacer for alignment */}
          </div>

          <div className='text-center mb-8'>
            <h1 className='text-2xl md:text-3xl font-semibold text-gray-800 mb-2'>
              Tell us about yourself
            </h1>
            <p className='text-gray-500 text-sm'>
              This helps us create a personalized plan for you
            </p>
          </div>

          <div className='space-y-6 mb-8'>
            {/* Age Input */}
            <div className='bg-white p-4 rounded-lg border border-gray-200'>
              <label className='block text-gray-700 font-medium mb-3'>
                Age
              </label>
              <div className='flex items-center justify-between'>
                <Button
                  variant='outline'
                  size='icon'
                  onClick={() => handleAgeChange(false)}
                  disabled={age <= 13}
                  className='h-10 w-10'
                >
                  <Minus className='h-4 w-4' />
                </Button>
                <span className='text-2xl font-semibold text-gray-800 px-4'>
                  {age}
                </span>
                <Button
                  variant='outline'
                  size='icon'
                  onClick={() => handleAgeChange(true)}
                  disabled={age >= 100}
                  className='h-10 w-10'
                >
                  <Plus className='h-4 w-4' />
                </Button>
              </div>
            </div>

            {/* Height Input */}
            <div className='bg-white p-4 rounded-lg border border-gray-200'>
              <div className='flex justify-between items-center mb-3'>
                <label className='text-gray-700 font-medium'>Height</label>
                <ToggleGroup
                  type='single'
                  value={heightUnit}
                  onValueChange={handleHeightUnitToggle}
                  className='h-8'
                >
                  <ToggleGroupItem
                    value='imperial'
                    className='h-8 px-3 text-xs'
                  >
                    ft/in
                  </ToggleGroupItem>
                  <ToggleGroupItem value='metric' className='h-8 px-3 text-xs'>
                    cm
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
              <div className='space-y-3'>
                <Slider
                  value={height}
                  onValueChange={setHeight}
                  max={heightRange[1]}
                  min={heightRange[0]}
                  step={1}
                  className='w-full'
                />
                <div className='text-center text-lg font-semibold text-gray-800'>
                  {formatHeight(height[0], heightUnit)}
                </div>
              </div>
            </div>

            {/* Weight Input */}
            <div className='bg-white p-4 rounded-lg border border-gray-200'>
              <div className='flex justify-between items-center mb-3'>
                <label className='text-gray-700 font-medium'>
                  Current Weight
                </label>
                <ToggleGroup
                  type='single'
                  value={weightUnit}
                  onValueChange={handleWeightUnitToggle}
                  className='h-8'
                >
                  <ToggleGroupItem
                    value='imperial'
                    className='h-8 px-3 text-xs'
                  >
                    lbs
                  </ToggleGroupItem>
                  <ToggleGroupItem value='metric' className='h-8 px-3 text-xs'>
                    kg
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
              <div className='space-y-3'>
                <Slider
                  value={weight}
                  onValueChange={setWeight}
                  max={weightRange[1]}
                  min={weightRange[0]}
                  step={1}
                  className='w-full'
                />
                <div className='text-center text-lg font-semibold text-gray-800'>
                  {formatWeight(weight[0], weightUnit)}
                </div>
              </div>
            </div>

            {/* Gender Input */}
            <div className='bg-white p-4 rounded-lg border border-gray-200'>
              <label className='block text-gray-700 font-medium mb-3'>
                Gender <span className='text-gray-400 text-sm'>(optional)</span>
              </label>
              <ToggleGroup
                type='single'
                value={gender}
                onValueChange={setGender}
                className='grid grid-cols-3 gap-2'
              >
                <ToggleGroupItem value='male' className='h-10'>
                  Male
                </ToggleGroupItem>
                <ToggleGroupItem value='female' className='h-10'>
                  Female
                </ToggleGroupItem>
                <ToggleGroupItem value='other' className='h-10 text-xs'>
                  Prefer not to say
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>

          <Button
            onClick={handleContinue}
            className='w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95'
          >
            Continue
          </Button>

          <div className='text-center mt-6'>
            <p className='text-xs text-gray-400'>
              Step 2 of 4 • Personalized fitness journey
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PhysicalInfo;
