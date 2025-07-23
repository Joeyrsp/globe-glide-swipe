import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Heart, User, MapPin, Settings } from 'lucide-react';
import { Destination } from './DestinationCard';

interface UserProfile {
  preferences: Record<string, string[]>;
  wishlist: Destination[];
}

interface ProfileViewProps {
  profile: UserProfile;
  onBack: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ profile, onBack }) => {
  const getPreferenceIcon = (category: string) => {
    switch (category) {
      case 'food': return '🍽️';
      case 'views': return '🏔️';
      case 'escape': return '🏝️';
      case 'adventure': return '🚀';
      case 'culture': return '🏛️';
      default: return '✈️';
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          ← Back
        </Button>
        <h1 className="text-xl font-bold">Your Profile</h1>
        <Button variant="ghost" size="icon">
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Travel Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(profile.preferences).length > 0 ? (
            Object.entries(profile.preferences).map(([category, answers]) => (
              <div key={category} className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <span>{getPreferenceIcon(category)}</span>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {answers.map((answer, index) => (
                    <Badge key={index} variant="secondary">
                      {answer}
                    </Badge>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-center py-4">
              Start swiping to build your travel profile!
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            Wishlist ({profile.wishlist.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {profile.wishlist.length > 0 ? (
            <div className="space-y-4">
              {profile.wishlist.map((destination) => (
                <div key={destination.id} className="flex items-center gap-4 p-3 border rounded-lg">
                  <img 
                    src={`https://images.unsplash.com/${destination.imageUrl}?w=80&h=80&fit=crop`}
                    alt={destination.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{destination.name}</h4>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {destination.region}
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    View Deals
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              No destinations in your wishlist yet. Start swiping right on places you'd love to visit!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileView;