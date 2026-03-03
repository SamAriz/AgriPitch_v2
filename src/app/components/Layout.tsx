import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router';
import { AppProvider, useApp } from '../context/AppContext';
import { Badge } from './ui/badge';
import {
  LayoutDashboard, Package, ShoppingCart, Search,
  MessageSquare, User, BarChart3, Bell, Menu, X,
  Moon, Sun, Sprout, Users, Tractor, FlaskConical,
  ClipboardList, ShoppingBag, TrendingUp, LogOut, ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import logo from '../../assets/46bb90f371e453e6f102bc4fe02a6b20d555d902.png';

function LayoutContent() {
  const { user, unreadMessages, notifications, isDarkMode, toggleDarkMode, authName, logout } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const farmLinks = [
    { to: '/farm/dashboard',   icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/farm/workers',     icon: Users,           label: 'Workers' },
    { to: '/farm/crops',       icon: Sprout,          label: 'Crops' },
    { to: '/farm/machines',    icon: Tractor,         label: 'Machines' },
    { to: '/farm/fertilizers', icon: FlaskConical,    label: 'Fertilizers' },
    { to: '/farm/tasks',       icon: ClipboardList,   label: 'Tasks' },
  ];

  const marketLinks = [
    { to: '/marketplace/dashboard',   icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/marketplace/browse',      icon: Search,          label: 'Browse' },
    { to: '/marketplace/my-listings', icon: Package,         label: 'My Listings' },
    { to: '/marketplace/orders',      icon: ShoppingCart,    label: 'Orders' },
  ];

  const sharedLinks = [
    { to: '/messages', icon: MessageSquare, label: 'Messages', badge: unreadMessages },
    { to: '/profile',  icon: User,          label: 'Profile' },
  ];

  const navLinks = user.role === 'farmowner' ? farmLinks : marketLinks;
  const isRoleSelection = location.pathname === '/';

  if (isRoleSelection) return <Outlet />;

  const roleLabel = user.role === 'farmowner' ? 'Farm Management' : 'Marketplace';
  const roleColor = user.role === 'farmowner' ? 'bg-[var(--primary-green)]' : 'bg-[var(--amber-deep)]';

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-[var(--sidebar-border)]">
        <Link to="/" className="flex items-center gap-3" onClick={() => setSidebarOpen(false)}>
          <img src={logo} alt="Philagri" className="w-10 h-10 object-contain rounded-lg" />
          <div>
            <div className="font-bold text-white text-base leading-tight" style={{fontFamily:'Outfit,sans-serif'}}>Philagri</div>
            <div className="text-[10px] text-[var(--sidebar-foreground)] opacity-60 leading-tight">Smart Farming. Digital Future.</div>
          </div>
        </Link>
      </div>

      {/* Role badge */}
      <div className="px-5 py-3">
        <span className={`${roleColor} text-white text-[11px] font-semibold px-3 py-1 rounded-full`}>{roleLabel}</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 pb-3 overflow-y-auto space-y-0.5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--sidebar-foreground)] opacity-40 px-2 py-2">
          {user.role === 'farmowner' ? 'Farm' : 'Marketplace'}
        </p>
        {navLinks.map(link => {
          const Icon = link.icon;
          const active = location.pathname === link.to;
          return (
            <Link key={link.to} to={link.to} onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group
                ${active
                  ? 'bg-[var(--primary-green)] text-white shadow-md'
                  : 'text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] hover:text-white'
                }`}>
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1">{link.label}</span>
              {active && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
            </Link>
          );
        })}

        <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--sidebar-foreground)] opacity-40 px-2 py-2 mt-3">
          Account
        </p>
        {sharedLinks.map(link => {
          const Icon = link.icon;
          const active = location.pathname === link.to;
          return (
            <Link key={link.to} to={link.to} onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
                ${active
                  ? 'bg-[var(--primary-green)] text-white shadow-md'
                  : 'text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] hover:text-white'
                }`}>
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1">{link.label}</span>
              {link.badge ? (
                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {link.badge}
                </span>
              ) : active ? <ChevronRight className="w-3.5 h-3.5 opacity-60" /> : null}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-[var(--sidebar-border)] space-y-1">
        {/* Dark mode toggle */}
        <button onClick={toggleDarkMode}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] hover:text-white transition-all">
          <div className={`relative w-9 h-5 rounded-full transition-colors ${isDarkMode ? 'bg-[var(--primary-green)]' : 'bg-white/20'}`}>
            <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${isDarkMode ? 'translate-x-4' : 'translate-x-0.5'}`} />
          </div>
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>

        <Link to="/" onClick={() => setSidebarOpen(false)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--sidebar-foreground)] hover:bg-white/10 hover:text-white transition-all">
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </Link>
        <button onClick={() => { setSidebarOpen(false); handleLogout(); }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--sidebar-foreground)] hover:bg-red-500/20 hover:text-red-300 transition-all">
          <LogOut className="w-4 h-4 rotate-180" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--background)]">

      {/* ── DESKTOP SIDEBAR ── */}
      <aside className="hidden lg:flex flex-col w-60 flex-shrink-0 bg-[var(--sidebar-bg)]">
        <SidebarContent />
      </aside>

      {/* ── MOBILE SIDEBAR OVERLAY ── */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-64 bg-[var(--sidebar-bg)] flex flex-col z-10 shadow-2xl">
            <button onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <header className="flex-shrink-0 bg-[var(--card)] border-b border-[var(--border-color)] px-4 lg:px-6 py-3 flex items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-[var(--muted-bg)] text-[var(--text-secondary)] transition-colors">
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb */}
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <span className="text-[var(--text-muted)]">{roleLabel}</span>
              <ChevronRight className="w-3.5 h-3.5 text-[var(--text-muted)]" />
              <span className="font-semibold text-[var(--text-primary)] capitalize">
                {location.pathname.split('/').pop()?.replace(/-/g,' ') || 'Dashboard'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-[var(--muted-bg)] text-[var(--text-secondary)] transition-colors">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>

            {/* Messages */}
            <Link to="/messages" className="relative p-2 rounded-lg hover:bg-[var(--muted-bg)] text-[var(--text-secondary)] transition-colors">
              <MessageSquare className="w-5 h-5" />
              {unreadMessages > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--primary-green)] rounded-full" />
              )}
            </Link>

            {/* Dark mode (desktop shortcut) */}
            <button onClick={toggleDarkMode}
              className="hidden lg:flex p-2 rounded-lg hover:bg-[var(--muted-bg)] text-[var(--text-secondary)] transition-colors">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Avatar */}
            <Link to="/profile" className="flex items-center gap-2 pl-2 border-l border-[var(--border-color)] ml-1">
              <div className="w-8 h-8 rounded-full bg-[var(--pale-green)] flex items-center justify-center">
                <User className="w-4 h-4 text-[var(--primary-green)]" />
              </div>
              <span className="hidden sm:block text-sm font-medium text-[var(--text-primary)]">{authName}</span>
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
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
