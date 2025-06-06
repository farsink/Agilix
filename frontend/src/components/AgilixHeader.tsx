import React from "react";
import { Button } from "@/components/ui/button";

const AgilixHeader = () => {
  return (
    <header className='w-full bg-white border-b border-gray-100 px-4 py-3'>
      <div className='max-w-md mx-auto flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <div className='w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg flex items-center justify-center'>
            <span className='text-white font-bold text-sm'>A</span>
          </div>
          <span className='text-xl font-semibold text-gray-800'>Agilix</span>
        </div>
        <Button variant='ghost' className='text-gray-500 hover:text-gray-700'>
          Skip
        </Button>
      </div>
    </header>
  );
};

export default AgilixHeader;
