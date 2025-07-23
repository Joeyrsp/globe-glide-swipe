import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { User, Heart, X } from 'lucide-react';
import SwipeCard from '@/components/SwipeCard';
import DestinationCard from '@/components/DestinationCard';
import QuestionCard from '@/components/QuestionCard';
import MatchModal from '@/components/MatchModal';
import ProfileView from '@/components/ProfileView';
import { destinations, questions } from '@/data/destinations';
import { toast } from 'sonner';
import type { Destination } from '@/components/DestinationCard';

interface UserProfile {
  preferences: Record<string, string[]>;
  wishlist: Destination[];
}

const Index = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [matchedDestination, setMatchedDestination] = useState<Destination | null>(null);
  const [profile, setProfile] = useState<UserProfile>({
    preferences: {},
    wishlist: []
  });

  // Create mixed deck of destinations and questions
  const [deck, setDeck] = useState<Array<{ type: 'destination' | 'question'; data: any }>>([]);

  useEffect(() => {
    // Mix destinations with questions every 3-4 destinations
    const mixedDeck = [];
    let questionIndex = 0;
    
    destinations.forEach((dest, index) => {
      mixedDeck.push({ type: 'destination', data: dest });
      
      // Add a question every 3 destinations
      if ((index + 1) % 3 === 0 && questionIndex < questions.length) {
        mixedDeck.push({ type: 'question', data: questions[questionIndex] });
        questionIndex++;
      }
    });
    
    setDeck(mixedDeck);
  }, []);

  const handleSwipeLeft = () => {
    // Pass/reject
    nextCard();
  };

  const handleSwipeRight = () => {
    const currentItem = deck[currentIndex];
    
    if (currentItem?.type === 'destination') {
      const destination = currentItem.data as Destination;
      
      if (destination.hasDeal) {
        // Show match modal for destinations with deals
        setMatchedDestination(destination);
        toast.success(`It's a match with ${destination.name}! 🎉`);
      } else {
        // Add to wishlist
        setProfile(prev => ({
          ...prev,
          wishlist: [...prev.wishlist, destination]
        }));
        toast.success(`Added ${destination.name} to your wishlist! ❤️`);
      }
    }
    
    nextCard();
  };

  const handleQuestionAnswer = (questionId: string, answer: string) => {
    const question = questions.find(q => q.id === questionId);
    if (question) {
      setProfile(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [question.category]: [...(prev.preferences[question.category] || []), answer]
        }
      }));
      toast.success('Preference saved! 📝');
    }
    nextCard();
  };

  const nextCard = () => {
    setCurrentIndex(prev => prev + 1);
  };

  const currentItem = deck[currentIndex];

  if (showProfile) {
    return <ProfileView profile={profile} onBack={() => setShowProfile(false)} />;
  }

  if (!currentItem) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">That's all for now! ✈️</h2>
          <p className="text-muted-foreground">Check your profile to see your travel preferences and wishlist.</p>
          <Button onClick={() => setShowProfile(true)}>View Profile</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <MatchModal 
        isOpen={!!matchedDestination}
        onClose={() => setMatchedDestination(null)}
        destination={matchedDestination}
      />
      
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <Button variant="ghost" size="icon" onClick={() => setShowProfile(true)}>
          <User className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          FlightSwipe
        </h1>
        <Button variant="ghost" size="icon" onClick={() => setShowProfile(true)}>
          <Heart className="w-6 h-6" />
        </Button>
      </div>

      {/* Card Stack */}
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)] p-4">
        <div className="relative">
          {/* Next card preview */}
          {deck[currentIndex + 1] && (
            <div className="absolute inset-0 transform scale-95 opacity-50 z-0">
              <div className="w-80 h-96 bg-card rounded-lg shadow-lg"></div>
            </div>
          )}
          
          {/* Current card */}
          <div className="relative z-10">
            <SwipeCard
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
            >
              {currentItem.type === 'destination' ? (
                <DestinationCard destination={currentItem.data} />
              ) : (
                <QuestionCard 
                  question={currentItem.data} 
                  onAnswer={handleQuestionAnswer}
                />
              )}
            </SwipeCard>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-8 pb-8">
        <Button
          size="lg"
          variant="outline"
          className="rounded-full w-16 h-16 shadow-lg"
          onClick={handleSwipeLeft}
        >
          <X className="w-8 h-8 text-red-500" />
        </Button>
        <Button
          size="lg"
          className="rounded-full w-16 h-16 shadow-lg bg-green-500 hover:bg-green-600"
          onClick={handleSwipeRight}
        >
          <Heart className="w-8 h-8" />
        </Button>
      </div>
    </div>
  );
};

export default Index;
