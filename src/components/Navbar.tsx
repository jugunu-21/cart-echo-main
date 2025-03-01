
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Settings, 
  BarChart4, 
  Pen, 
  ArrowLeftRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Navbar = () => {
  const location = useLocation();
  
  const NavItem = ({ to, icon: Icon, label }: { to: string; icon: React.ElementType; label: string }) => {
    const isActive = location.pathname === to;
    
    return (
      <Link to={to}>
        <Button 
          variant="ghost" 
          className={cn(
            "w-full justify-start gap-2 text-base font-normal p-3 h-auto", 
            isActive && "bg-secondary font-medium"
          )}
        >
          <Icon size={20} />
          <span>{label}</span>
        </Button>
      </Link>
    );
  };

  return (
    <div className="h-screen w-64 border-r fixed left-0 top-0 p-4 flex flex-col bg-background animate-fade-in">
      <div className="py-4">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
            <ArrowLeftRight className="h-5 w-5 text-primary-foreground" />
          </div>
          CausalFunnel
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Survey insights for your store</p>
      </div>
      
      <Separator className="my-4" />
      
      <nav className="space-y-1 flex-1">
        <NavItem to="/" icon={LayoutDashboard} label="Dashboard" />
        <NavItem to="/responses" icon={BarChart4} label="Responses" />
        <NavItem to="/designer" icon={Pen} label="Survey Designer" />
        <NavItem to="/settings" icon={Settings} label="Settings" />
      </nav>
      
      <div className="mt-auto pt-4">
        <div className="bg-secondary bg-opacity-50 p-3 rounded-lg">
          <p className="text-sm font-medium">Connected to Store</p>
          <p className="text-xs text-muted-foreground truncate">my-test-store.myshopify.com</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
