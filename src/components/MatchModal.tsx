import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plane } from 'lucide-react';
import { Destination } from './DestinationCard';

interface MatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewDeal: () => void;
  destination: Destination | null;
}

const MatchModal: React.FC<MatchModalProps> = ({ isOpen, onClose, onViewDeal, destination }) => {
  if (!destination) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto p-0 overflow-hidden rounded-3xl">
        <div className="p-6 space-y-6">
          <img  src='/heart.gif' className='max-w-[80%] m-auto rounded-2xl opacity-45'/>

          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold">
              It's a match! ✈️🎉
            </DialogTitle>
          </DialogHeader>
          
          <div className="bg-white rounded-2xl p-4 space-y-4">
            <div className="text-center space-y-2">
              <p className="text-gray-600">
                You and {destination.name} are meant to be. Pack your bags — your dream trip is calling!
              </p>
            </div>

            <div className="space-y-2">
              <Button 
                onClick={onViewDeal}
                className="w-full bg-orange-400 hover:bg-orange-500 text-white rounded-xl py-3"
              >
                See Your Deal →
              </Button>
              <Button variant="outline" className="w-full rounded-xl py-3" onClick={onClose}>
                Continue swiping
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MatchModal;