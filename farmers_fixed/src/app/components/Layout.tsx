import { Outlet, Link, useLocation } from 'react-router';
import { AppProvider, useApp } from '../context/AppContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Search, 
  MessageSquare, 
  User, 
  BarChart3,
  Bell,
  Menu,
  X,
  Moon,
  Sun,
  Sprout
} from 'lucide-react';
import { useState } from 'react';
import logo from '../../assets/46bb90f371e453e6f102bc4fe02a6b20d555d902.png';

function LayoutContent() {
  const { user, unreadMessages, notifications, isDarkMode, toggleDarkMode } = useApp();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getFarmLinks = () => [
    { to: '/farm/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/farm/workers', icon: User, label: 'Workers' },
    { to: '/farm/crops', icon: Sprout, label: 'Crops' },
    { to: '/farm/machines', icon: Package, label: 'Machines' },
    { to: '/farm/fertilizers', icon: ShoppingCart, label: 'Fertilizers' },
    { to: '/farm/tasks', icon: BarChart3, label: 'Tasks' },
  ];

  const getMarketplaceLinks = () => [
    { to: '/marketplace/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/marketplace/browse', icon: Search, label: 'Browse Products' },
    { to: '/marketplace/my-listings', icon: Package, label: 'My Listings' },
    { to: '/marketplace/orders', icon: ShoppingCart, label: 'Orders' },
  ];

  const getNavigationLinks = () => {
    if (user.role === 'farmowner') return getFarmLinks();
    if (user.role === 'marketplace') return getMarketplaceLinks();
    return [];
  };

  const navLinks = getNavigationLinks();
  const isRoleSelection = location.pathname === '/';

  if (isRoleSelection) {
    return <Outlet />;
  }

  const roleLabel = user.role === 'farmowner' ? 'Farm Management' : 'Marketplace';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-[var(--border-color)] sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src={logo} 
                alt="Philagri Logo" 
                className="w-[50px] h-[50px] object-contain"
              />
              <div>
                <h1 className="font-bold text-[var(--text-primary)]">Philagri</h1>
                <p className="text-xs text-[var(--text-secondary)]">{roleLabel}</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.to;
                return (
                  <Link key={link.to} to={link.to}>
                    <Button 
                      variant={isActive ? "default" : "ghost"}
                      className={isActive ? "bg-[var(--primary-green)] hover:bg-[var(--medium-green)] text-white" : ""}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {link.label}
                    </Button>
                  </Link>
                );
              })}
              <Link to="/messages">
                <Button variant="ghost" className="relative">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Messages
                  {unreadMessages > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                      {unreadMessages}
                    </Badge>
                  )}
                </Button>
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                    {notifications}
                  </Badge>
                )}
              </Button>
              <Link to="/profile">
                <Button variant="ghost" size="icon">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
              
              {/* Divider */}
              <div className="w-px h-6 bg-[var(--border-color)] mx-1"></div>

              {/* Dark Mode Toggle */}
              <Button 
                variant="ghost" 
                size="sm"
                onClick={toggleDarkMode}
                className="flex items-center gap-2"
              >
                <div className="relative w-11 h-6 bg-[var(--muted-bg)] rounded-full transition-colors">
                  <div 
                    className={`absolute top-1 w-4 h-4 bg-[var(--primary-green)] rounded-full transition-transform ${
                      isDarkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  ></div>
                </div>
                {isDarkMode ? (
                  <>
                    <Sun className="w-4 h-4" />
                    <span className="text-sm">Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4" />
                    <span className="text-sm">Dark</span>
                  </>
                )}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-[var(--border-color)] pt-4">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.to;
                  return (
                    <Link key={link.to} to={link.to} onClick={() => setMobileMenuOpen(false)}>
                      <Button 
                        variant={isActive ? "default" : "ghost"}
                        className={`w-full justify-start ${isActive ? "bg-[var(--primary-green)] hover:bg-[var(--medium-green)] text-white" : ""}`}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {link.label}
                      </Button>
                    </Link>
                  );
                })}
                <Link to="/messages" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start relative">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Messages
                    {unreadMessages > 0 && (
                      <Badge className="ml-auto bg-red-500">{unreadMessages}</Badge>
                    )}
                  </Button>
                </Link>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                </Link>
                
                {/* Mobile Dark Mode Toggle */}
                <div className="pt-2 border-t border-[var(--border-color)] mt-2">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => {
                      toggleDarkMode();
                      setMobileMenuOpen(false);
                    }}
                  >
                    {isDarkMode ? (
                      <>
                        <Sun className="w-4 h-4 mr-2" />
                        Switch to Light Mode
                      </>
                    ) : (
                      <>
                        <Moon className="w-4 h-4 mr-2" />
                        Switch to Dark Mode
                      </>
                    )}
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-[var(--border-color)] mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-2 text-sm text-[var(--text-secondary)]">
            <img 
              src={logo} 
              alt="Philagri Logo" 
              className="w-[30px] h-[30px] object-contain"
            />
            <p>&copy; 2026 Philagri · Smart Farming. Digital Future.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function Layout() {
  return (
    <AppProvider>
      <LayoutContent />
    </AppProvider>
  );
}