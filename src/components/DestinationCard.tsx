import React from 'react';
import { CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Plane } from 'lucide-react';

export interface Destination {
  id: string;
  name: string;
  region: string;
  distance: string;
  trivia: string;
  imageUrl: string;
  hasDeal?: boolean;
  dealPrice?: string;
}

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(https://images.unsplash.com/${destination.imageUrl}?w=800&h=600&fit=crop)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      
      {destination.hasDeal && (
        <Badge className="absolute top-4 right-4 bg-red-500 text-white">
          Deal Available!
        </Badge>
      )}
      
      <CardContent className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">{destination.name}</h2>
          
          <div className="flex items-center gap-2 text-white/90">
            <MapPin className="w-4 h-4" />
            <span>{destination.region}</span>
          </div>
          
          <div className="flex items-center gap-2 text-white/90">
            <Plane className="w-4 h-4" />
            <span>{destination.distance}</span>
          </div>
          
          <p className="text-white/80 text-sm italic">
            {destination.trivia}
          </p>
        </div>
      </CardContent>
    </div>
  );
};

export default DestinationCard;