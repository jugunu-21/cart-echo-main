
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeftRight } from 'lucide-react';
import { toast } from 'sonner';

interface ShopifyAuthParams {
  shop?: string;
  hmac?: string;
  timestamp?: string;
  code?: string;
}

const Auth = () => {
  const [shopName, setShopName] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const navigate = useNavigate();

  // Parse query params for Shopify OAuth flow
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const params: ShopifyAuthParams = {};
    
    for (const [key, value] of urlParams.entries()) {
      params[key as keyof ShopifyAuthParams] = value;
    }
    
    // Check if we're in the OAuth callback
    if (params.shop && params.code) {
      setIsAuthenticating(true);
      
      // Simulate API call to exchange auth code for token
      setTimeout(() => {
        toast.success(`Successfully authenticated ${params.shop}`);
        setIsAuthenticating(false);
        navigate('/');
      }, 1500);
    }
  }, [navigate]);

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!shopName) {
      toast.error('Please enter your shop name');
      return;
    }
    
    // Normalize the shop name
    let normalizedShopName = shopName.trim().toLowerCase();
    if (!normalizedShopName.includes('.myshopify.com')) {
      normalizedShopName += '.myshopify.com';
    }
    
    setIsValidating(true);
    
    // Simulate validating the shop
    setTimeout(() => {
      setIsValidating(false);
      
      // Simulate redirecting to Shopify OAuth page
      toast.success(`Redirecting to Shopify for authorization...`);
      
      // In a real app, we would redirect to Shopify OAuth
      // window.location.href = `https://...`;
      
      // For demo purposes, we'll just navigate to the dashboard
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }, 1000);
  };

  if (isAuthenticating) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-secondary/30">
        <Card className="w-[400px] animate-pulse">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Connecting to Shopify</CardTitle>
            <CardDescription>Please wait while we connect your store</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="h-16 w-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin mb-4"></div>
            <p>Finalizing authentication...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary/30 animate-fade-in">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center">
          <div className="h-12 w-12 rounded-md bg-primary flex items-center justify-center mb-4">
            <ArrowLeftRight className="h-6 w-6 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-3xl font-bold">CausalFunnel</h1>
        <p className="text-muted-foreground">Shopify Survey & Feedback App</p>
      </div>
      
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Connect your Shopify store</CardTitle>
          <CardDescription>
            Enter your store name to install the CausalFunnel app
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleConnect}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="shop">Shopify Store URL</Label>
              <div className="flex items-center">
                <Input
                  id="shop"
                  placeholder="your-store"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="rounded-r-none"
                  disabled={isValidating}
                />
                <div className="bg-muted border border-l-0 border-input px-3 rounded-r-md h-10 flex items-center text-muted-foreground">
                  .myshopify.com
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isValidating}
            >
              {isValidating ? 'Connecting...' : 'Connect Store'}
            </Button>
          </CardFooter>
        </form>
      </Card>
      
      <p className="mt-6 text-sm text-muted-foreground">
        By connecting your store, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
};

export default Auth;
