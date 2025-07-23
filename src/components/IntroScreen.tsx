import React from 'react';
import { Button } from '@/components/ui/button';
import { Plane } from 'lucide-react';

interface IntroScreenProps {
  onStart: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-orange-300 to-yellow-300 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center space-y-6">
        <div className="space-y-2">
          <div className="text-2xl font-bold text-gray-800">Trip Tease</div>
          <div className="text-sm text-gray-600">
            Swipe through dreamy destinations and discover your next adventure
          </div>
        </div>
        
        <div className="space-y-4">
          <Plane className="w-8 h-8 mx-auto text-orange-400" />
          <div className="text-lg font-semibold text-gray-800">
            Where will your heart take you next?
          </div>
        </div>
        
        <div className="space-y-3 pt-4">
          <div className="flex space-x-2 justify-center">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-orange-300 rounded-full"></div>
            ))}
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