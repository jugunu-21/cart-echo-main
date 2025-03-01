import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { GripVertical, Plus, Trash2, Settings, EyeIcon, PenBox } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export interface Question {
  id: string;
  type: 'text' | 'multiplechoice' | 'checkbox' | 'rating';
  label: string;
  description?: string;
  required: boolean;
  options?: string[];
}

export interface SurveyConfig {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  isActive: boolean;
  position: 'cart' | 'checkout' | 'thankyou';
  triggerCondition?: string;
}

interface SurveyDesignerProps {
  initialConfig?: SurveyConfig;
  onSave?: (config: SurveyConfig) => void;
}

const defaultSurveyConfig: SurveyConfig = {
  id: 'default',
  title: 'Customer Feedback',
  description: 'We value your feedback. Please take a moment to answer these questions.',
  questions: [
    {
      id: 'q1',
      type: 'text',
      label: 'What brought you to our store today?',
      required: false
    },
    {
      id: 'q2',
      type: 'multiplechoice',
      label: 'How did you hear about us?',
      options: ['Social Media', 'Friend/Family', 'Search Engine', 'Advertisement', 'Other'],
      required: true
    },
    {
      id: 'q3',
      type: 'rating',
      label: 'How likely are you to recommend our products?',
      required: true
    }
  ],
  isActive: true,
  position: 'cart'
};

const SurveyDesigner = ({ initialConfig = defaultSurveyConfig, onSave }: SurveyDesignerProps) => {
  const [activeTab, setActiveTab] = useState('edit');
  const [config, setConfig] = useState<SurveyConfig>(initialConfig);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: `q${Date.now()}`,
      type: 'text',
      label: 'New Question',
      required: false
    };

    setConfig({
      ...config,
      questions: [...config.questions, newQuestion]
    });

    setCurrentQuestion(newQuestion);
  };

  const updateQuestion = (updatedQuestion: Question) => {
    setConfig({
      ...config,
      questions: config.questions.map(q => 
        q.id === updatedQuestion.id ? updatedQuestion : q
      )
    });
  };

  const removeQuestion = (id: string) => {
    setConfig({
      ...config,
      questions: config.questions.filter(q => q.id !== id)
    });

    if (currentQuestion?.id === id) {
      setCurrentQuestion(null);
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const questions = Array.from(config.questions);
    const [reorderedItem] = questions.splice(result.source.index, 1);
    questions.splice(result.destination.index, 0, reorderedItem);

    setConfig({
      ...config,
      questions
    });
  };

  const saveForm = () => {
    if (onSave) {
      onSave(config);
    }
    toast.success("Survey saved successfully!");
  };

  const renderQuestionEditor = () => {
    if (!currentQuestion) return null;

    const updateCurrentQuestion = (updates: Partial<Question>) => {
      const updated = { ...currentQuestion, ...updates };
      setCurrentQuestion(updated);
      updateQuestion(updated);
    };

    return (
      <Card className="animate-slide-up">
        <CardHeader>
          <CardTitle className="text-lg">Edit Question</CardTitle>
          <CardDescription>Customize your question properties</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="question-type">Question Type</Label>
            <Select 
              value={currentQuestion.type} 
              onValueChange={(value: any) => updateCurrentQuestion({ type: value })}
            >
              <SelectTrigger id="question-type">
                <SelectValue placeholder="Select a question type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text Input</SelectItem>
                <SelectItem value="multiplechoice">Multiple Choice</SelectItem>
                <SelectItem value="checkbox">Checkbox</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="question-label">Question Label</Label>
            <Input
              id="question-label"
              value={currentQuestion.label}
              onChange={e => updateCurrentQuestion({ label: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="question-description">Description (Optional)</Label>
            <Textarea
              id="question-description"
              value={currentQuestion.description || ''}
              onChange={e => updateCurrentQuestion({ description: e.target.value })}
              placeholder="Add a description to help users understand the question"
            />
          </div>
          
          {(currentQuestion.type === 'multiplechoice' || currentQuestion.type === 'checkbox') && (
            <div className="space-y-2">
              <Label>Options</Label>
              <div className="space-y-2">
                {(currentQuestion.options || []).map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={option}
                      onChange={e => {
                        const newOptions = [...(currentQuestion.options || [])];
                        newOptions[index] = e.target.value;
                        updateCurrentQuestion({ options: newOptions });
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const newOptions = [...(currentQuestion.options || [])];
                        newOptions.splice(index, 1);
                        updateCurrentQuestion({ options: newOptions });
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-1"
                  onClick={() => {
                    const newOptions = [...(currentQuestion.options || []), 'New Option'];
                    updateCurrentQuestion({ options: newOptions });
                  }}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Option
                </Button>
              </div>
            </div>
          )}
          
          <div className="flex items-center space-x-2 pt-2">
            <Switch
              id="question-required"
              checked={currentQuestion.required}
              onCheckedChange={checked => updateCurrentQuestion({ required: checked })}
            />
            <Label htmlFor="question-required">Required Question</Label>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="edit" className="gap-1.5">
                <PenBox className="h-4 w-4" />
                Edit
              </TabsTrigger>
              <TabsTrigger value="preview" className="gap-1.5">
                <EyeIcon className="h-4 w-4" />
                Preview
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-1.5">
                <Settings className="h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>
            <Button onClick={saveForm}>Save Survey</Button>
          </div>

          <TabsContent value="edit" className="mt-0 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  <Input
                    value={config.title}
                    onChange={e => setConfig({ ...config, title: e.target.value })}
                    className="text-xl font-semibold border-none px-0 h-auto focus-visible:ring-0"
                  />
                </CardTitle>
                <CardDescription>
                  <Textarea
                    value={config.description}
                    onChange={e => setConfig({ ...config, description: e.target.value })}
                    className="border-none p-0 resize-none focus-visible:ring-0"
                  />
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="questions">
                    {(provided) => (
                      <div 
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-3"
                      >
                        {config.questions.map((question, index) => (
                          <Draggable key={question.id} draggableId={question.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className={cn(
                                  "border rounded-lg p-3 bg-card flex justify-between items-start group transition-colors",
                                  currentQuestion?.id === question.id && "ring-2 ring-primary/20"
                                )}
                              >
                                <div className="flex gap-2">
                                  <div 
                                    {...provided.dragHandleProps}
                                    className="p-1 rounded-md hover:bg-secondary/80 cursor-grab"
                                  >
                                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                                  </div>
                                  <div>
                                    <p className="font-medium">
                                      {question.label}
                                      {question.required && <span className="text-destructive ml-1">*</span>}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      {question.type === 'text' && 'Text Input'}
                                      {question.type === 'multiplechoice' && 'Multiple Choice'}
                                      {question.type === 'checkbox' && 'Checkbox'}
                                      {question.type === 'rating' && 'Rating'}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setCurrentQuestion(question)}
                                  >
                                    <PenBox className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeQuestion(question.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </CardContent>
              <CardFooter className="border-t pt-6">
                <Button 
                  variant="outline" 
                  onClick={addQuestion} 
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Question
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="preview" className="mt-0">
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle>{config.title}</CardTitle>
                <CardDescription>{config.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {config.questions.map((question) => (
                  <div key={question.id} className="space-y-2">
                    <Label>
                      {question.label}
                      {question.required && <span className="text-destructive ml-1">*</span>}
                    </Label>
                    {question.description && (
                      <p className="text-sm text-muted-foreground -mt-1">{question.description}</p>
                    )}
                    
                    {question.type === 'text' && (
                      <Textarea placeholder="Enter your answer here..." />
                    )}
                    
                    {question.type === 'multiplechoice' && (
                      <div className="space-y-2">
                        {(question.options || []).map((option, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <input type="radio" id={`${question.id}-${i}`} name={question.id} />
                            <Label htmlFor={`${question.id}-${i}`} className="font-normal cursor-pointer">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {question.type === 'checkbox' && (
                      <div className="space-y-2">
                        {(question.options || []).map((option, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <input type="checkbox" id={`${question.id}-${i}`} />
                            <Label htmlFor={`${question.id}-${i}`} className="font-normal cursor-pointer">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {question.type === 'rating' && (
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map(rating => (
                          <Button 
                            key={rating}
                            variant="outline"
                            className="h-10 w-10 p-0"
                          >
                            {rating}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button className="w-full">Submit</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-0">
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle>Survey Settings</CardTitle>
                <CardDescription>Configure when and where your survey appears</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="active-status">Active Status</Label>
                    <Switch
                      id="active-status"
                      checked={config.isActive}
                      onCheckedChange={isActive => setConfig({ ...config, isActive })}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {config.isActive 
                      ? "Survey is currently active and will be shown to customers" 
                      : "Survey is currently inactive and will not be shown to customers"}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="display-position">Display Position</Label>
                  <Select 
                    value={config.position} 
                    onValueChange={(position: any) => setConfig({ ...config, position })}
                  >
                    <SelectTrigger id="display-position">
                      <SelectValue placeholder="Select where to display the survey" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cart">Shopping Cart Page</SelectItem>
                      <SelectItem value="checkout">Checkout Page</SelectItem>
                      <SelectItem value="thankyou">Thank You Page</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="trigger-condition">Trigger Condition (Optional)</Label>
                  <Textarea
                    id="trigger-condition"
                    placeholder="e.g. Cart value > $100, Contains product X, etc."
                    value={config.triggerCondition || ''}
                    onChange={e => setConfig({ ...config, triggerCondition: e.target.value })}
                  />
                  <p className="text-sm text-muted-foreground">
                    Specify conditions when this survey should appear. Leave blank to show for all customers.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={saveForm} className="w-full">Save Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="lg:col-span-1">
        {renderQuestionEditor()}
      </div>
    </div>
  );
};

export default SurveyDesigner;
