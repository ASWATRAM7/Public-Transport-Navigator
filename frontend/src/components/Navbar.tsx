import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, ArrowRight, ShieldCheck } from 'lucide-react';
import { UserStats } from '../types/transit';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  stats: UserStats | null;
}

export const Navbar: React.FC<NavbarProps> = ({ stats }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeStr, setTimeStr] = useState('');
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-IN', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { to: '/', label: 'Overview' },
    { to: '/search', label: 'Route Planner' },
    { to: '/lines', label: 'Line Directory' },
    { to: '/status', label: 'Live Status' },
    { to: '/about', label: 'About & Lore' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const displayedXp = user?.stats?.xp || stats?.xp || 260;
  const displayedCarbon = user?.stats?.carbonSavedGrams || stats?.carbonSavedGrams || 5840;

  return (
    <header className="sticky top-0 z-40 bg-[#F9F8F6]/95 backdrop-blur-md border-b border-[#E8E6E1]">
      {/* Top Editorial Metadata Banner */}
      <div className="border-b border-[#E8E6E1] px-4 sm:px-8 py-1.5 text-[11px] font-sans text-[#5A5A5A] flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="font-semibold text-[#1A1A1A] tracking-wider uppercase text-[10px]">
            Chennai Transit Journal · Vol. IV
          </span>
          <span className="text-[#E8E6E1]">|</span>
          <span className="hidden sm:inline">13.0827° N, 80.2707° E</span>
          <span className="hidden md:inline text-[#E8E6E1]">|</span>
          <span className="hidden md:inline">Live IST: <strong className="font-mono text-[#1A1A1A]">{timeStr}</strong></span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5">
            <span className="text-[10px] uppercase tracking-wider text-[#5A5A5A]">Mobility XP:</span>
            <span className="font-mono font-semibold bg-[#1A1A1A] text-[#F9F8F6] text-[10px] px-2 py-0.5 rounded-none">
              {displayedXp} XP
            </span>
          </div>

          <div className="hidden sm:flex items-center space-x-1.5">
            <span className="text-[10px] uppercase tracking-wider text-[#5A5A5A]">Carbon Averted:</span>
            <span className="font-mono font-semibold text-[#2E4034] text-[10px]">
              {((displayedCarbon / 1000)).toFixed(1)}kg CO₂
            </span>
          </div>
        </div>
      </div>

      {/* Main Magazine Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
        {/* Brand */}
        <NavLink to="/" className="flex items-baseline space-x-2 group">
          <span className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-[#1A1A1A] group-hover:text-[#C26A4A] transition-colors">
            Chennai<span className="italic font-serif font-light text-[#C26A4A] ml-1">Transit</span>
          </span>
          <span className="text-[9px] font-sans uppercase tracking-widest text-[#8C8C8C] font-semibold hidden md:inline">
            Editorial Guide
          </span>
        </NavLink>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-xs uppercase tracking-widest transition-all duration-200 pb-0.5 border-b ${
                  isActive
                    ? 'border-[#1A1A1A] text-[#1A1A1A] font-semibold'
                    : 'border-transparent text-[#5A5A5A] hover:text-[#1A1A1A] hover:border-[#E8E6E1]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Dynamic Auth / CTA Section */}
        <div className="hidden sm:flex items-center space-x-4">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-[#1A1A1A] px-2.5 py-1 bg-stone-100 border border-stone-200">
                <User className="w-3.5 h-3.5 text-[#2E4034]" />
                <span className="font-medium max-w-[120px] truncate">{user.name.split(' ')[0]}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-xs uppercase tracking-wider text-stone-500 hover:text-stone-900 transition-colors flex items-center gap-1"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Exit</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                className="text-xs uppercase tracking-wider px-3 py-1.5 text-stone-700 hover:text-black font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="text-xs uppercase tracking-wider px-3.5 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-900 transition-colors font-medium"
              >
                Register
              </Link>
            </div>
          )}

          <NavLink
            to="/search"
            className="text-xs uppercase tracking-wider px-4 py-2 bg-[#1A1A1A] text-[#F9F8F6] hover:bg-[#2E4034] transition-colors duration-300 font-medium rounded-none"
          >
            Plan Itinerary →
          </NavLink>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-[#1A1A1A] border border-[#E8E6E1] hover:bg-[#F0EDE6] transition-colors"
          aria-label="Toggle Navigation"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-[#F9F8F6] border-b border-[#E8E6E1] px-4 py-4 space-y-3">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 text-xs uppercase tracking-wider font-medium ${
                  isActive ? 'bg-[#1A1A1A] text-white' : 'text-[#1A1A1A] hover:bg-[#F0EDE6]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
            {isAuthenticated && user ? (
              <div className="flex items-center justify-between px-3 py-2 bg-stone-100">
                <span className="text-xs font-medium text-stone-800">{user.name}</span>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="text-xs text-rose-600 font-medium"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-center py-2 text-xs uppercase tracking-wider border border-stone-300 bg-white"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-center py-2 text-xs uppercase tracking-wider bg-[#1A1A1A] text-white"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
