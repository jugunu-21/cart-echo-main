
import React, { useState } from 'react';
import { Question } from './SurveyDesigner';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface SurveyFormProps {
  title: string;
  description: string;
  questions: Question[];
  onSubmit?: (answers: Record<string, string>) => void;
  className?: string;
}

const SurveyForm = ({ 
  title, 
  description, 
  questions,
  onSubmit,
  className
}: SurveyFormProps) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const updateAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const missingRequired = questions
      .filter(q => q.required)
      .find(q => !answers[q.id]);
      
    if (missingRequired) {
      toast.error("Please answer all required questions");
      return;
    }
    
    setSubmitting(true);
    
    // Simulate submit delay
    setTimeout(() => {
      if (onSubmit) {
        onSubmit(answers);
      }
      
      setSubmitting(false);
      setSubmitted(true);
      toast.success("Thank you for your feedback!");
    }, 800);
  };
  
  if (submitted) {
    return (
      <div className={cn("p-6 bg-white rounded-lg border shadow-smooth animate-fade-in", className)}>
        <div className="text-center py-8">
          <div className="h-16 w-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium mb-2">Thank You!</h3>
          <p className="text-muted-foreground">
            Your feedback has been submitted successfully.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <form 
      onSubmit={handleSubmit}
      className={cn(
        "p-6 bg-white rounded-lg border shadow-smooth animate-fade-in",
        className
      )}
    >
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>
      
      <div className="space-y-6">
        {questions.map((question) => (
          <div key={question.id} className="space-y-2">
            <label className="block font-medium">
              {question.label}
              {question.required && <span className="text-destructive ml-1">*</span>}
            </label>
            {question.description && (
              <p className="text-sm text-muted-foreground mb-2">
                {question.description}
              </p>
            )}
            
            {question.type === 'text' && (
              <Textarea
                placeholder="Enter your answer here..."
                value={answers[question.id] || ''}
                onChange={(e) => updateAnswer(question.id, e.target.value)}
                className="w-full"
              />
            )}
            
            {question.type === 'multiplechoice' && (
              <div className="space-y-2">
                {(question.options || []).map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={`${question.id}-${index}`}
                      name={question.id}
                      value={option}
                      checked={answers[question.id] === option}
                      onChange={() => updateAnswer(question.id, option)}
                      className="form-radio"
                    />
                    <label 
                      htmlFor={`${question.id}-${index}`}
                      className="text-sm cursor-pointer"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            )}
            
            {question.type === 'checkbox' && (
              <div className="space-y-2">
                {(question.options || []).map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`${question.id}-${index}`}
                      value={option}
                      checked={answers[question.id]?.includes(option) || false}
                      onChange={(e) => {
                        const currentAnswers = answers[question.id]?.split(',') || [];
                        let newAnswers: string[];
                        
                        if (e.target.checked) {
                          newAnswers = [...currentAnswers, option];
                        } else {
                          newAnswers = currentAnswers.filter(a => a !== option);
                        }
                        
                        updateAnswer(question.id, newAnswers.join(','));
                      }}
                      className="form-checkbox"
                    />
                    <label 
                      htmlFor={`${question.id}-${index}`}
                      className="text-sm cursor-pointer"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            )}
            
            {question.type === 'rating' && (
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(rating => (
                  <Button
                    key={rating}
                    type="button"
                    variant={answers[question.id] === rating.toString() ? "default" : "outline"}
                    onClick={() => updateAnswer(question.id, rating.toString())}
                    className="h-10 w-10 p-0"
                  >
                    {rating}
                  </Button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <Button 
        type="submit" 
        className="w-full mt-6"
        disabled={submitting}
      >
        {submitting ? "Submitting..." : "Submit Feedback"}
      </Button>
    </form>
  );
};

export default SurveyForm;
