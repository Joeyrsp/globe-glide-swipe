import React from 'react';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export interface Question {
  id: string;
  question: string;
  options: string[];
  category: 'food' | 'views' | 'escape' | 'adventure' | 'culture';
}

interface QuestionCardProps {
  question: Question;
  onAnswer: (questionId: string, answer: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer }) => {
  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl text-primary">Tell us about your travel style</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col justify-center space-y-4 p-6">
        <h3 className="text-lg font-semibold text-center mb-6">
          {question.question}
        </h3>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full py-3 text-left justify-start"
              onClick={() => onAnswer(question.id, option)}
            >
              {option}
            </Button>
          ))}
        </div>
      </CardContent>
    </div>
  );
};

export default QuestionCard;