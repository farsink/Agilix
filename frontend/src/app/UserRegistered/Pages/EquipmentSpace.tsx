import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clipboard } from "lucide-react";

import ProgressIndicator from "@/components/ProgressIndicator";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import EquipmentSelectionModal from "@/components/EquipmentSelectModal";

const EquipmentSpace = () => {
  const navigate = useNavigate();
  const [spaceSize, setSpaceSize] = useState<string>("");
  const [noiseRestrictions, setNoiseRestrictions] = useState(false);
  const [limitedTimeSlots, setLimitedTimeSlots] = useState(false);
  const [equipmentLevel, setEquipmentLevel] = useState<string>("");
  const [showEquipmentDetails, setShowEquipmentDetails] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);

  const handleBack = () => {
    navigate("/workout-preferences");
  };

  const handleEquipmentLevelChange = (value: string) => {
    setEquipmentLevel(value);
    // Show accordion for basic or full equipment levels
    setShowEquipmentDetails(value === "basic" || value === "full");
  };

  const handleSelectSpecificEquipment = () => {
    setIsModalOpen(true);
  };

  const handleEquipmentSelection = (equipment: string[]) => {
    setSelectedEquipment(equipment);
    setIsModalOpen(false);
  };

  const handleContinue = () => {
    if (!spaceSize || !equipmentLevel) {
      toast({
        title: "Please complete the assessment",
        description:
          "Select your space size and equipment availability to continue.",
        variant: "destructive",
      });
      return;
    }

    const equipmentData = {
      spaceSize,
      constraints: {
        noiseRestrictions,
        limitedTimeSlots,
      },
      equipmentLevel,
      selectedEquipment,
    };

    console.log("Equipment and space assessment:", equipmentData);

    // Navigate to health & safety page
    navigate("/health-safety");
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
            <ProgressIndicator currentStep={5} totalSteps={6} />
            <div className='w-10' />
          </div>

          <div className='text-center mb-8'>
            <h1 className='text-2xl md:text-3xl font-semibold text-gray-800 mb-2'>
              Tell us about your workout space
            </h1>
            <p className='text-gray-500 text-sm'>
              This helps us recommend suitable exercises
            </p>
          </div>

          <div className='space-y-8 mb-8'>
            {/* Space Size */}
            <div className='bg-white p-4 rounded-lg border border-gray-200'>
              <label className='block text-gray-700 font-medium mb-3'>
                Space Size
              </label>
              <ToggleGroup
                type='single'
                value={spaceSize}
                onValueChange={setSpaceSize}
                className='grid grid-cols-1 gap-2'
              >
                <ToggleGroupItem value='small' className='h-12 justify-start'>
                  <div className='flex items-center space-x-3'>
                    <span className='text-lg'>🏠</span>
                    <div className='text-left'>
                      <div className='font-medium'>Small Room</div>
                      <div className='text-xs text-gray-500'>
                        Limited floor space
                      </div>
                    </div>
                  </div>
                </ToggleGroupItem>
                <ToggleGroupItem value='medium' className='h-12 justify-start'>
                  <div className='flex items-center space-x-3'>
                    <span className='text-lg'>🏡</span>
                    <div className='text-left'>
                      <div className='font-medium'>Medium Room</div>
                      <div className='text-xs text-gray-500'>
                        Comfortable workout space
                      </div>
                    </div>
                  </div>
                </ToggleGroupItem>
                <ToggleGroupItem value='large' className='h-12 justify-start'>
                  <div className='flex items-center space-x-3'>
                    <span className='text-lg'>🏢</span>
                    <div className='text-left'>
                      <div className='font-medium'>Large Room/Gym</div>
                      <div className='text-xs text-gray-500'>
                        Plenty of space for any workout
                      </div>
                    </div>
                  </div>
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            {/* Constraints */}
            <div className='bg-white p-4 rounded-lg border border-gray-200'>
              <label className='block text-gray-700 font-medium mb-3'>
                Workout Constraints
              </label>
              <div className='space-y-4'>
                <div className='flex items-center space-x-3'>
                  <Checkbox
                    id='noise'
                    checked={noiseRestrictions}
                    onCheckedChange={(checked) =>
                      setNoiseRestrictions(checked === true)
                    }
                  />
                  <label
                    htmlFor='noise'
                    className='text-sm font-medium text-gray-700'
                  >
                    Noise Restrictions
                  </label>
                </div>
                <div className='flex items-center space-x-3'>
                  <Checkbox
                    id='time'
                    checked={limitedTimeSlots}
                    onCheckedChange={(checked) =>
                      setLimitedTimeSlots(checked === true)
                    }
                  />
                  <label
                    htmlFor='time'
                    className='text-sm font-medium text-gray-700'
                  >
                    Limited Time Slots
                  </label>
                </div>
              </div>
            </div>

            {/* Equipment Level */}
            <div className='bg-white p-4 rounded-lg border border-gray-200'>
              <label className='block text-gray-700 font-medium mb-3'>
                What equipment do you have?
              </label>
              <ToggleGroup
                type='single'
                value={equipmentLevel}
                onValueChange={handleEquipmentLevelChange}
                className='grid grid-cols-1 gap-2'
              >
                <ToggleGroupItem value='none' className='h-12 justify-start'>
                  <div className='flex items-center space-x-3'>
                    <span className='text-lg'>🤸</span>
                    <div className='text-left'>
                      <div className='font-medium'>None</div>
                      <div className='text-xs text-gray-500'>
                        Bodyweight exercises only
                      </div>
                    </div>
                  </div>
                </ToggleGroupItem>
                <ToggleGroupItem value='basic' className='h-12 justify-start'>
                  <div className='flex items-center space-x-3'>
                    <span className='text-lg'>🏃</span>
                    <div className='text-left'>
                      <div className='font-medium'>Basic</div>
                      <div className='text-xs text-gray-500'>
                        Resistance bands, dumbbells
                      </div>
                    </div>
                  </div>
                </ToggleGroupItem>
                <ToggleGroupItem value='full' className='h-12 justify-start'>
                  <div className='flex items-center space-x-3'>
                    <span className='text-lg'>🏋️</span>
                    <div className='text-left'>
                      <div className='font-medium'>Full Gym Setup</div>
                      <div className='text-xs text-gray-500'>
                        Complete home gym or gym access
                      </div>
                    </div>
                  </div>
                </ToggleGroupItem>
              </ToggleGroup>

              <Collapsible
                open={showEquipmentDetails}
                onOpenChange={setShowEquipmentDetails}
              >
                <CollapsibleContent className='transition-all duration-300 ease-in-out'>
                  <div className='mt-4'>
                    <Button
                      variant='outline'
                      onClick={handleSelectSpecificEquipment}
                      className='w-full border-orange-200 text-orange-600 hover:bg-orange-50 animate-fade-in'
                    >
                      <Clipboard className='h-4 w-4 mr-2' />
                      Select Specific Equipment
                    </Button>

                    {selectedEquipment.length > 0 && (
                      <div className='mt-3 p-3 bg-orange-50 rounded-lg animate-fade-in'>
                        <p className='text-sm font-medium text-orange-800 mb-2'>
                          Selected Equipment ({selectedEquipment.length}):
                        </p>
                        <div className='flex flex-wrap gap-1'>
                          {selectedEquipment.slice(0, 3).map((item, index) => (
                            <span
                              key={index}
                              className='text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded'
                            >
                              {item}
                            </span>
                          ))}
                          {selectedEquipment.length > 3 && (
                            <span className='text-xs text-orange-600'>
                              +{selectedEquipment.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>

          <Button
            onClick={handleContinue}
            className='w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95'
            disabled={!spaceSize || !equipmentLevel}
          >
            Continue
          </Button>

          <div className='text-center mt-6'>
            <p className='text-xs text-gray-400'>
              Step 5 of 6 • Personalized fitness journey
            </p>
          </div>
        </div>
      </main>

      <EquipmentSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectEquipment={handleEquipmentSelection}
        equipmentType={equipmentLevel}
        selectedEquipment={selectedEquipment}
      />
    </div>
  );
};

export default EquipmentSpace;
