import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plane, Star } from 'lucide-react';
import { Destination } from './DestinationCard';

interface MatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination: Destination | null;
}

const MatchModal: React.FC<MatchModalProps> = ({ isOpen, onClose, destination }) => {
  if (!destination) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl text-primary">
            It's a Match! ✈️
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <img 
              src={`https://images.unsplash.com/${destination.imageUrl}?w=400&h=200&fit=crop`}
              alt={destination.name}
              className="w-full h-32 object-cover rounded-lg"
            />
            <Badge className="absolute top-2 right-2 bg-red-500 text-white">
              Special Deal!
            </Badge>
          </div>
          
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold">{destination.name}</h3>
            <p className="text-muted-foreground">{destination.region}</p>
          </div>
          
          <div className="bg-primary/5 p-4 rounded-lg text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold">Exclusive Deal</span>
            </div>
            <p className="text-2xl font-bold text-primary">
              {destination.dealPrice || '$299'}
            </p>
            <p className="text-sm text-muted-foreground">Round trip from your location</p>
          </div>
          
          <div className="space-y-2">
            <Button className="w-full" size="lg">
              Book Now
            </Button>
            <Button variant="outline" className="w-full" onClick={onClose}>
              Save for Later
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MatchModal;