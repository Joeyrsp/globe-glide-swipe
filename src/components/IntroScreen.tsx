import React from 'react';
import { Button } from '@/components/ui/button';
import { Plane } from 'lucide-react';

interface IntroScreenProps {
  onStart: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen  flex flex-col gap-8 items-center justify-center p-4">
          <div className="text-2xl font-bold text-gray-800 w-[80%] text-center">Where will your heart take you next?</div>
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center space-y-6 basis-[80%]">
        <div className="space-y-2">
        
        <div className="space-y-4">
          <div className="text-lg font-semibold text-gray-800">
            Matched with Magic
          </div>
        </div>
          <div className="text-sm text-gray-600">
            Swipe through dreamy destinations and discover your next adventures
          </div>
        </div>
        
        <Button 
          onClick={onStart}
          className="w-full bg-orange-400 hover:bg-orange-500 text-white rounded-2xl py-3 text-lg font-medium"
        >
          Start swiping
        </Button>
      </div>
    </div>
  );
};

export default IntroScreen;