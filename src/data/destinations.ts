import { Destination } from '@/components/DestinationCard';
import { Question } from '@/components/QuestionCard';

export const destinations: Destination[] = [
  {
    id: '1',
    name: 'Banff National Park',
    region: 'Alberta, Canada',
    distance: '2,847 km away',
    trivia: 'Home to the largest hot springs in Canada.',
    imageUrl: 'photo-1472396961693-142e6e269027',
    hasDeal: true,
    dealPrice: '$449'
  },
  {
    id: '2',
    name: 'Faroe Islands',
    region: 'Denmark',
    distance: '4,321 km away',
    trivia: 'Has more sheep than people living there.',
    imageUrl: 'photo-1433086966358-54859d0ed716'
  },
  {
    id: '3',
    name: 'California Poppy Fields',
    region: 'California, USA',
    distance: '3,894 km away',
    trivia: 'The state flower blooms best after rainy winters.',
    imageUrl: 'photo-1465146344425-f00d5f5c8f07'
  },
  {
    id: '4',
    name: 'Sahara Desert',
    region: 'Morocco',
    distance: '6,847 km away',
    trivia: 'Larger than the entire United States.',
    imageUrl: 'photo-1482938289607-e9573fc25ebb',
    hasDeal: true,
    dealPrice: '$699'
  },
  {
    id: '5',
    name: 'Northern Lights',
    region: 'Iceland',
    distance: '4,127 km away',
    trivia: 'Best viewed between September and March.',
    imageUrl: 'photo-1470813740244-df37b8c1edcb'
  },
  {
    id: '6',
    name: 'Maldives',
    region: 'Indian Ocean',
    distance: '15,673 km away',
    trivia: 'Made up of 1,192 coral islands.',
    imageUrl: 'photo-1500375592092-40eb2168fd21'
  },
  {
    id: '7',
    name: 'Swiss Alps',
    region: 'Switzerland',
    distance: '6,234 km away',
    trivia: 'Home to 48 peaks over 4,000 meters.',
    imageUrl: 'photo-1458668383970-8ddd3927deed',
    hasDeal: true,
    dealPrice: '$799'
  },
  {
    id: '8',
    name: 'Antelope Canyon',
    region: 'Arizona, USA',
    distance: '3,456 km away',
    trivia: 'Formed by flash flooding over millions of years.',
    imageUrl: 'photo-1504893524553-b855bce32c67'
  }
];

export const questions: Question[] = [
  {
    id: 'q1',
    question: 'What motivates your travel most?',
    options: [
      'Discovering amazing local cuisine',
      'Capturing breathtaking views',
      'Escaping daily routine',
      'Seeking thrilling adventures'
    ],
    category: 'food'
  },
  {
    id: 'q2',
    question: 'Your ideal vacation pace is:',
    options: [
      'Slow and relaxing',
      'Packed with activities',
      'Mix of both',
      'Spontaneous and flexible'
    ],
    category: 'escape'
  },
  {
    id: 'q3',
    question: 'You prefer destinations that are:',
    options: [
      'Off the beaten path',
      'Popular tourist spots',
      'Cultural heritage sites',
      'Natural wonders'
    ],
    category: 'culture'
  },
  {
    id: 'q4',
    question: 'Your travel budget priority is:',
    options: [
      'Luxury accommodations',
      'Unique experiences',
      'Local food tours',
      'Adventure activities'
    ],
    category: 'adventure'
  }
];