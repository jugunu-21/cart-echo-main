import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const Settings = () => {
  const [apiKey, setApiKey] = useState('9efb9e8a963537b1d3c9d5085dfc3597');
  const [apiSecret, setApiSecret] = useState('47f17a07923907423d8ebba1259aadfa');
  const [isScriptInjected, setIsScriptInjected] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState('');
  const [notifyOnSubmit, setNotifyOnSubmit] = useState(false);
  const [surveyDisplayLimit, setSurveyDisplayLimit] = useState('once');

  const handleSaveGeneral = () => {
    toast.success("General settings saved successfully!");
  };

  const handleSaveNotifications = () => {
    toast.success("Notification settings saved successfully!");
  };

  const handleSaveDisplay = () => {
    toast.success("Display settings saved successfully!");
  };

  const handleUpdateScript = () => {
    toast.success("Survey script updated successfully!");
  };

  const copyScriptToClipboard = () => {
    const scriptContent = document.getElementById('script-content') as HTMLTextAreaElement;
    if (scriptContent) {
      navigator.clipboard.writeText(scriptContent.value);
      toast.success("Script copied to clipboard");
    }
  };

  return (
    <div className="animate-fade-in">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight mb-6">Settings</h1>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="display">Display</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Shopify Connection</CardTitle>
              <CardDescription>
                Configure your Shopify app connection settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input 
                  id="api-key" 
                  value={apiKey} 
                  onChange={(e) => setApiKey(e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="api-secret">API Secret Key</Label>
                <Input 
                  id="api-secret" 
                  value={apiSecret} 
                  onChange={(e) => setApiSecret(e.target.value)} 
                  type="password"
                />
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Switch 
                  id="connection-status" 
                  checked={true} 
                  disabled 
                />
                <Label htmlFor="connection-status">Connected to Shopify</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveGeneral}>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Storage</CardTitle>
              <CardDescription>
                Configure how survey responses are stored
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="storage-period">Data Retention Period</Label>
                <Select defaultValue="unlimited">
                  <SelectTrigger id="storage-period">
                    <SelectValue placeholder="Select retention period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30days">30 days</SelectItem>
                    <SelectItem value="90days">90 days</SelectItem>
                    <SelectItem value="1year">1 year</SelectItem>
                    <SelectItem value="unlimited">Unlimited</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="export-format">Export Format</Label>
                <Select defaultValue="csv">
                  <SelectTrigger id="export-format">
                    <SelectValue placeholder="Select export format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="mr-2">
                Export All Data
              </Button>
              <Button variant="destructive">
                Clear All Data
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="display" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Display Settings</CardTitle>
              <CardDescription>
                Configure when and how your survey appears to customers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="display-frequency">Display Frequency</Label>
                <Select 
                  value={surveyDisplayLimit} 
                  onValueChange={setSurveyDisplayLimit}
                >
                  <SelectTrigger id="display-frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="always">Every visit</SelectItem>
                    <SelectItem value="once">Once per customer</SelectItem>
                    <SelectItem value="daily">Once per day</SelectItem>
                    <SelectItem value="weekly">Once per week</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="trigger-delay">Display Delay (seconds)</Label>
                <Input 
                  id="trigger-delay" 
                  type="number" 
                  min="0" 
                  defaultValue="3" 
                />
                <p className="text-sm text-muted-foreground">
                  How long to wait before showing the survey
                </p>
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Switch 
                  id="mobile-display" 
                  defaultChecked={true} 
                />
                <Label htmlFor="mobile-display">Show on mobile devices</Label>
              </div>
              <Separator className="my-4" />
              <div className="space-y-2">
                <Label htmlFor="custom-css">Custom CSS (Optional)</Label>
                <Textarea 
                  id="custom-css" 
                  placeholder=".causal-funnel-survey { /* your custom styles */ }" 
                  className="font-mono text-sm"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveDisplay}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>
                Configure email notifications for new survey responses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="notify-on-submit" 
                  checked={notifyOnSubmit}
                  onCheckedChange={setNotifyOnSubmit}
                />
                <Label htmlFor="notify-on-submit">
                  Receive email notifications for new submissions
                </Label>
              </div>
              
              {notifyOnSubmit && (
                <div className="space-y-2 animate-slide-down">
                  <Label htmlFor="notification-email">Notification Email</Label>
                  <Input 
                    id="notification-email" 
                    type="email" 
                    placeholder="your@email.com" 
                    value={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.value)}
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="notification-frequency">Notification Frequency</Label>
                <Select defaultValue="instant">
                  <SelectTrigger id="notification-frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instant">Instant</SelectItem>
                    <SelectItem value="hourly">Hourly Digest</SelectItem>
                    <SelectItem value="daily">Daily Digest</SelectItem>
                    <SelectItem value="weekly">Weekly Digest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveNotifications}>Save Changes</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Webhooks</CardTitle>
              <CardDescription>
                Send survey responses to an external service via webhooks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="enable-webhooks" />
                <Label htmlFor="enable-webhooks">Enable webhooks</Label>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input 
                  id="webhook-url" 
                  placeholder="https://example.com/webhook" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="webhook-secret">Webhook Secret</Label>
                <Input 
                  id="webhook-secret" 
                  type="password" 
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Webhook</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Script Injection</CardTitle>
              <CardDescription>
                Configure how the survey script is injected into your store
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="script-injected" 
                  checked={isScriptInjected}
                  onCheckedChange={setIsScriptInjected}
                />
                <Label htmlFor="script-injected">
                  Automatically inject survey script
                </Label>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="script-content">Manual Script Installation</Label>
                <div className="relative">
                  <Textarea 
                    id="script-content" 
                    className="font-mono text-xs h-32"
                    readOnly
                    value={`<!-- CausalFunnel Survey Widget -->
<script>
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://app.causalfunnel.com/widget.js?shop=my-test-store.myshopify.com";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'causal-funnel-widget'));
</script>`}
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="absolute right-2 top-2"
                    onClick={copyScriptToClipboard}
                  >
                    Copy
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  {isScriptInjected 
                    ? "The script is automatically injected, but you can also add it manually if needed." 
                    : "Copy this code and paste it before the closing </body> tag in your theme."}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleUpdateScript}>Update Script</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                Configure advanced options for the survey app
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="data-integration">Data Integration</Label>
                <Select defaultValue="none">
                  <SelectTrigger id="data-integration">
                    <SelectValue placeholder="Select integration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="ga4">Google Analytics 4</SelectItem>
                    <SelectItem value="shopify">Shopify Metafields</SelectItem>
                    <SelectItem value="custom">Custom API</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="survey-timeout">Survey Timeout (seconds)</Label>
                <Input 
                  id="survey-timeout" 
                  type="number" 
                  min="0" 
                  defaultValue="300" 
                />
                <p className="text-sm text-muted-foreground">
                  How long before an incomplete survey is marked as abandoned
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="debug-mode" />
                <Label htmlFor="debug-mode">Debug Mode</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Advanced Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
