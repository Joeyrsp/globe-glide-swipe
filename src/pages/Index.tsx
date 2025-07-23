import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { User, Heart, X } from 'lucide-react';
import SwipeCard from '@/components/SwipeCard';
import DestinationCard from '@/components/DestinationCard';
import QuestionCard from '@/components/QuestionCard';
import MatchModal from '@/components/MatchModal';
import DealScreen from '@/components/DealScreen';
import ProfileView from '@/components/ProfileView';
import IntroScreen from '@/components/IntroScreen';
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
  const [showIntro, setShowIntro] = useState(true);
  const [showDeal, setShowDeal] = useState(false);
  const [matchedDestination, setMatchedDestination] = useState<Destination | null>(null);
  const [removedCards, setRemovedCards] = useState<Set<number>>(new Set());
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
    setRemovedCards(prev => new Set([...prev, currentIndex]));
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
    
    setRemovedCards(prev => new Set([...prev, currentIndex]));
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
  const nextItem = deck[currentIndex + 1];

  if (showIntro) {
    return <IntroScreen onStart={() => setShowIntro(false)} />;
  }

  if (showProfile) {
    return <ProfileView profile={profile} onBack={() => setShowProfile(false)} />;
  }

  if (!currentItem) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 via-orange-300 to-yellow-300 p-4">
        <div className="bg-white rounded-3xl p-8 text-center space-y-4 max-w-sm shadow-2xl">
          <h2 className="text-2xl font-bold text-gray-800">That's all for now! ✈️</h2>
          <p className="text-gray-600">Check your profile to see your travel preferences and wishlist.</p>
          <Button 
            onClick={() => setShowProfile(true)}
            className="bg-orange-400 hover:bg-orange-500 text-white rounded-xl"
          >
            View Profile
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-orange-300 to-yellow-300">
      <MatchModal 
        isOpen={!!matchedDestination && !showDeal}
        onClose={() => setMatchedDestination(null)}
        onViewDeal={() => setShowDeal(true)}
        destination={matchedDestination}
      />
      
      <DealScreen
        isOpen={showDeal}
        onClose={() => {
          setShowDeal(false);
          setMatchedDestination(null);
        }}
        onBack={() => setShowDeal(false)}
        destination={matchedDestination}
      />
      
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <Button variant="ghost" size="icon" onClick={() => setShowProfile(true)} className="text-white">
          <User className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-bold text-white">
          Trip Tease
        </h1>
        <Button variant="ghost" size="icon" onClick={() => setShowProfile(true)} className="text-white">
          <Heart className="w-6 h-6" />
        </Button>
      </div>

      {/* Card Stack */}
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)] p-4">
        <div className="relative">
          {/* Stack of cards - show up to 2 cards behind */}
          {[currentIndex + 2, currentIndex + 1].map((index, stackIndex) => {
            const item = deck[index];
            if (!item || removedCards.has(index)) return null;
            
            const scale = 0.95 - (stackIndex * 0.02);
            const zIndex = 10 - stackIndex - 1;
            
            return (
              <div 
                key={`stack-${index}`}
                className="absolute inset-0"
                style={{
                  transform: `scale(${scale})`,
                  zIndex: zIndex,
                  opacity: 0.5 + (stackIndex * 0.2)
                }}
              >
                <div className="w-80 h-96 bg-white rounded-3xl shadow-lg">
                  {item.type === 'destination' ? (
                    <DestinationCard destination={item.data} />
                  ) : (
                    <QuestionCard 
                      question={item.data} 
                      onAnswer={() => {}}
                    />
                  )}
                </div>
              </div>
            );
          })}
          
          {/* Current card */}
          {!removedCards.has(currentIndex) && (
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
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-8 pb-8">
        <Button
          size="lg"
          variant="outline"
          className="rounded-full w-16 h-16 shadow-lg bg-white border-2 border-white"
          onClick={handleSwipeLeft}
        >
          <X className="w-8 h-8 text-red-500" />
        </Button>
        <Button
          size="lg"
          className="rounded-full w-16 h-16 shadow-lg bg-white hover:bg-gray-50 border-2 border-white"
          onClick={handleSwipeRight}
        >
          <Heart className="w-8 h-8 text-green-500" />
        </Button>
      </div>
    </div>
  );
};

export default Index;
