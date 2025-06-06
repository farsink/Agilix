import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEquipment } from "@/hooks/useEquipment";

interface Equipment {
  id: string;
  name: string;
  category: "cardio" | "strength" | "flexibility" | "functional" | "bodyweight";
  subcategory?: string;
  description: string;
  muscleGroups: string[];
  spaceRequired: "small" | "medium" | "large";
  difficultyLevel: "beginner" | "intermediate" | "advanced" | "all";
  isPopular: boolean;
  tags: string[];
}

interface EquipmentSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEquipment: (equipment: string[]) => void;
  equipmentType: string;
  selectedEquipment: string[];
}

const EquipmentSelectionModal: React.FC<EquipmentSelectionModalProps> = ({
  isOpen,
  onClose,
  onSelectEquipment,
  equipmentType,
  selectedEquipment,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [localSelectedEquipment, setLocalSelectedEquipment] =
    useState<string[]>(selectedEquipment);

  const { data: equipmentData, isLoading, isError, error } = useEquipment();

  useEffect(() => {
    setLocalSelectedEquipment(selectedEquipment);
  }, [selectedEquipment]);

  // Filter equipment based on type (basic vs full)
  const getFilteredEquipment = () => {
    let equipment = equipmentData || [];

    // Filter by equipment type
    if (equipmentType === "basic") {
      equipment = equipment.filter(
        (item: Equipment) =>
          item.spaceRequired === "small" ||
          (item.spaceRequired === "medium" &&
            ["Yoga Mat", "Kettlebell", "Medicine Ball", "Pull-up Bar"].includes(
              item.name
            ))
      );
    } else if (equipmentType === "full") {
      equipment = equipmentData || []; // Replace with your full gym equipment data'; // Show all equipment for full gym
    }

    // Filter by search term
    if (searchTerm) {
      equipment = equipment.filter(
        (item: Equipment) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      equipment = equipment.filter(
        (item: Equipment) => item.category === selectedCategory
      );
    }

    return equipment;
  };

  const handleEquipmentToggle = (equipmentName: string) => {
    setLocalSelectedEquipment((prev) =>
      prev.includes(equipmentName)
        ? prev.filter((item) => item !== equipmentName)
        : [...prev, equipmentName]
    );
  };

  const handleSave = () => {
    onSelectEquipment(localSelectedEquipment);
  };

  const filteredEquipment = getFilteredEquipment();
  const categories = ["all", "cardio", "strength", "flexibility", "functional"];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-2xl max-h-[100vh] animate-slide-in-from-bottom'>
        <DialogHeader>
          <DialogTitle className='text-xl font-semibold text-gray-800'>
            Select Your Equipment
          </DialogTitle>
          <p className='text-sm text-gray-500'>
            Choose the equipment you have available for workouts
          </p>
        </DialogHeader>

        <div className='space-y-4 overflow-hidden'>
          {/* Search and Filter */}
          <div className='flex gap-3'>
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
              <Input
                placeholder='Search equipment...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10'
              />
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className='w-40'>
                <Filter className='h-4 w-4 mr-2' />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all"
                      ? "All Categories"
                      : category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Selected Equipment Count */}
          {localSelectedEquipment.length > 0 && (
            <div className='bg-orange-50 p-3 rounded-lg'>
              <p className='text-sm font-medium text-orange-800'>
                {localSelectedEquipment.length} equipment selected
              </p>
            </div>
          )}

          {/* Equipment List */}
          <div className='max-h-96 overflow-y-scroll space-y-3 w-full h-60 scrollbar-thin scrollbar-thumb-orange-500  scrollbar-track-gray-100'>
            {filteredEquipment.length === 0 ? (
              <div className='text-center py-8 text-gray-500'>
                <p>No equipment found matching your criteria</p>
              </div>
            ) : (
              filteredEquipment.map((equipment: Equipment) => (
                <div
                  key={equipment.id}
                  className='flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'
                >
                  <Checkbox
                    id={equipment.id}
                    checked={localSelectedEquipment.includes(equipment.name)}
                    onCheckedChange={() =>
                      handleEquipmentToggle(equipment.name)
                    }
                    className='mt-1'
                  />
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center justify-between'>
                      <label
                        htmlFor={equipment.id}
                        className='font-medium text-gray-900 cursor-pointer'
                      >
                        {equipment.name}
                      </label>
                      {equipment.isPopular && (
                        <Badge variant='secondary' className='text-xs'>
                          Popular
                        </Badge>
                      )}
                    </div>
                    <p className='text-sm text-gray-600 mt-1'>
                      {equipment.description}
                    </p>
                    <div className='flex flex-wrap gap-1 mt-2'>
                      <Badge variant='outline' className='text-xs'>
                        {equipment.category}
                      </Badge>
                      <Badge variant='outline' className='text-xs'>
                        {equipment.spaceRequired} space
                      </Badge>
                      {equipment.tags.slice(0, 2).map((tag) => (
                        <Badge
                          key={tag}
                          variant='outline'
                          className='text-xs text-gray-500'
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Action Buttons */}
          <div className='flex justify-end space-x-3 pt-4 border-t'>
            <Button variant='outline' onClick={onClose}>
              Cancel
            </Button>
            <Button
              disabled={localSelectedEquipment.length === 0}
              onClick={handleSave}
              className='bg-orange-500 hover:bg-orange-600 text-white'
            >
              Save Selection{" "}
              {localSelectedEquipment.length > 0 &&
                `(${localSelectedEquipment.length})`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EquipmentSelectionModal;
