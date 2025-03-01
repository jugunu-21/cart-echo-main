
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutDashboard, Settings, Pen, BarChart4, ArrowLeftRight } from 'lucide-react';
import SurveyForm from '@/components/SurveyForm';
import Navbar from '@/components/Navbar';

const Index = () => {
  // Sample survey data
  const sampleSurvey = {
    title: 'Customer Feedback',
    description: 'We value your feedback. Please take a moment to answer these questions.',
    questions: [
      {
        id: 'q1',
        type: 'text' as const,
        label: 'What brought you to our store today?',
        required: false
      },
      {
        id: 'q2',
        type: 'multiplechoice' as const,
        label: 'How did you hear about us?',
        options: ['Social Media', 'Friend/Family', 'Search Engine', 'Advertisement', 'Other'],
        required: true
      },
      {
        id: 'q3',
        type: 'rating' as const,
        label: 'How likely are you to recommend our products?',
        required: true
      }
    ]
  };

  return (
    <div className="flex">
      <Navbar />
      
      <div className="flex-1 p-8 ml-64 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10 items-center">
            <div>
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold mb-4 bg-secondary">
                CausalFunnel v1.0
              </div>
              <h1 className="text-4xl font-bold tracking-tight mb-3">
                Welcome to CausalFunnel
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Collect valuable customer insights with dynamic survey forms on your Shopify store's cart page.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="gap-2">
                  <Link to="/dashboard">
                    <LayoutDashboard className="h-5 w-5" />
                    Go to Dashboard
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <Link to="/designer">
                    <Pen className="h-5 w-5" />
                    Design Survey
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="bg-secondary/50 rounded-xl p-6 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl" />
              <div className="relative">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center">
                      <ArrowLeftRight className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium">CausalFunnel</h3>
                      <p className="text-xs text-muted-foreground">Connected to your store</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">Active</div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-4xl font-bold">438</div>
                      <div className="text-sm text-muted-foreground">Total Responses</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-4xl font-bold">24%</div>
                      <div className="text-sm text-muted-foreground">Response Rate</div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex items-center justify-between gap-4">
                  <Button asChild variant="secondary" size="sm" className="w-full justify-start gap-2">
                    <Link to="/dashboard">
                      <BarChart4 className="h-4 w-4" />
                      Analytics
                    </Link>
                  </Button>
                  <Button asChild variant="secondary" size="sm" className="w-full justify-start gap-2">
                    <Link to="/settings">
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-semibold tracking-tight mb-6">Getting Started</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Step 1: Design Your Survey</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Create custom surveys with multiple question types to gather the insights you need.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/designer">Design Survey</Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Step 2: Configure Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Choose when and where your survey appears and how responses are handled.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/settings">Go to Settings</Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Step 3: Analyze Responses</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    View analytics and insights from your collected survey responses.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/dashboard">View Dashboard</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight mb-6">Preview Your Survey</h2>
            <Tabs defaultValue="cart" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="cart">Cart Page</TabsTrigger>
                <TabsTrigger value="checkout">Checkout</TabsTrigger>
                <TabsTrigger value="thankyou">Thank You Page</TabsTrigger>
              </TabsList>
              
              <TabsContent value="cart">
                <div className="border rounded-lg p-6 bg-card">
                  <div className="max-w-md mx-auto">
                    <SurveyForm 
                      title={sampleSurvey.title}
                      description={sampleSurvey.description}
                      questions={sampleSurvey.questions}
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="checkout">
                <div className="border rounded-lg p-12 bg-card flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-lg font-medium mb-2">Checkout Page Survey</h3>
                    <p className="text-muted-foreground mb-4">
                      Surveys can be displayed during the checkout process.
                    </p>
                    <Button asChild variant="outline">
                      <Link to="/designer">Design Checkout Survey</Link>
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="thankyou">
                <div className="border rounded-lg p-12 bg-card flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-lg font-medium mb-2">Thank You Page Survey</h3>
                    <p className="text-muted-foreground mb-4">
                      Capture post-purchase feedback on the order confirmation page.
                    </p>
                    <Button asChild variant="outline">
                      <Link to="/designer">Design Thank You Survey</Link>
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
