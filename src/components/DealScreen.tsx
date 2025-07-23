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
        <div className="bg-gradient-to-br from-pink-300 via-orange-300 to-yellow-300 p-6 space-y-4">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="icon" onClick={onBack} className="text-white">
                <ArrowLeft className="w-6 h-6" />
              </Button>
              <DialogTitle className="text-center text-xl text-white font-bold">
                Your Deal
              </DialogTitle>
              <div className="w-10"></div>
            </div>
          </DialogHeader>
          
          <div className="bg-white rounded-2xl p-4 space-y-4">
            <div className="relative">
              <img 
                src={`https://images.unsplash.com/${destination.imageUrl}?w=400&h=200&fit=crop`}
                alt={destination.name}
                className="w-full h-32 object-cover rounded-lg"
              />
              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                -75%
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold text-gray-800">{destination.name}</h3>
              <p className="text-gray-600 text-sm">{destination.region}</p>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-orange-600">
                {destination.dealPrice || '$299'}
              </p>
              <p className="text-sm text-gray-600">Round trip • 14 day getaway</p>
            </div>
            
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