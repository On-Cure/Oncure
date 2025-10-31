'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';

export default function LandingNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/landing" className="flex items-center space-x-2">
            <img 
              src="/images/oncare-logo.png" 
              alt="onCare Logo" 
              className="h-8 w-auto"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/oncare-logo2.png";
                e.target.className = "h-100 w-100 opacity-50";
              }}
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text">
              onCare
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-1 text-sm bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <span>Testnet</span>
            </div>
            
            <ThemeToggle />
            
            <button className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-full transition-colors">
              Join Waitlist
            </button>
            
            <Link 
              href="/login" 
              className="text-foreground hover:text-primary transition-colors"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-center space-x-1 text-sm bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full w-fit mx-auto">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                <span>Testnet</span>
              </div>
              
              <div className="flex justify-center">
                <ThemeToggle />
              </div>
              
              <button className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-full transition-colors mx-auto w-fit">
                Join Waitlist
              </button>
              
              <Link 
                href="/login" 
                className="text-foreground hover:text-primary transition-colors text-center"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}