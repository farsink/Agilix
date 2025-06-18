import React from "react";
import { MapPin, Ruler, Weight, Target } from "lucide-react";

export default function ProfileComponent() {
  return (
    <div className='bg-white rounded-xl p-6 border border-gray-100'>
      <div className='flex items-start gap-4'>
        {/* Profile Photo - Left side */}
        <div className='w-12 h-12 rounded-full overflow-hidden flex-shrink-0'>
          <div
            className='w-full h-full flex items-center justify-center'
            style={{
              background: "linear-gradient(135deg, #F88923 0%, #FF6B35 100%)",
            }}
          >
            <span className='text-white text-xl font-medium'>E</span>
          </div>
        </div>

        {/* Content */}
        <div className='flex-1'>
          <div className='flex items-start justify-between'>
            <div>
              <h3 className='text-sm font-semibold' style={{ color: "#2C3E50" }}>
                Ellen Jackson
              </h3>
              <div className='flex items-center gap-1 mt-1'>
                <MapPin className='w-3.5 h-3.5' style={{ color: "#6C757D" }} />
                <span className='text-sm' style={{ color: "#6C757D" }}>
                  Hartford
                </span>
              </div>
            </div>

            {/* Metrics - Right side */}
            <div className='flex gap-6'>
              <div className='text-center'>
                <Ruler
                  className='w-4 h-4 mx-auto mb-1'
                  style={{ color: "#6C757D" }}
                />
                <p className='text-sm font-light' style={{ color: "#2C3E50" }}>
                  164 cm
                </p>
                <p className='text-xs font-light' style={{ color: "#6C757D" }}>
                  Height
                </p>
              </div>
              <div className='text-center'>
                <Weight
                  className='w-4 h-4 mx-auto mb-1'
                  style={{ color: "#6C757D" }}
                />
                <p className='text-sm font-light' style={{ color: "#2C3E50" }}>
                  50 kg
                </p>
                <p className='text-xs font-light' style={{ color: "#6C757D" }}>
                  Weight
                </p>
              </div>
              <div className='text-center'>
                <Target
                  className='w-4 h-4 mx-auto mb-1'
                  style={{ color: "#6C757D" }}
                />
                <p className='text-sm font-light' style={{ color: "#2C3E50" }}>
                  48 kg
                </p>
                <p className='text-xs font-light' style={{ color: "#6C757D" }}>
                  Goal
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
