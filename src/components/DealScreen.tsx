import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plane, ArrowLeft } from 'lucide-react';
import { Destination } from './DestinationCard';

interface DealScreenProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  destination: Destination | null;
}

const DealScreen: React.FC<DealScreenProps> = ({ isOpen, onClose, onBack, destination }) => {
  if (!destination) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto p-0 overflow-hidden rounded-3xl">
        <div className=" p-6 space-y-4">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-center text-xl  font-bold">
                ♡ Your Heart Picked {destination.name} ♡
Now Let’s Make It Official 💍🌅
              </DialogTitle>
              <div className="w-10"></div>
            </div>
          </DialogHeader>

          <img  src='/deal.png' className='max-w-[80%] m-auto'/>

          
          <div className="bg-white rounded-2xl p-4 space-y-4">
            
            
            <div className="space-y-2">
              <Button className="w-full bg-orange-400 hover:bg-orange-500 text-white rounded-xl py-3">
                Book now →
              </Button>
              <Button variant="outline" className="w-full rounded-xl py-3" onClick={onClose}>
                Save for later
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DealScreen;