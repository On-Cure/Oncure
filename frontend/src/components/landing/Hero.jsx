'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background image with gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/images/hero-bg-light.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.5
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/20 to-accent/20"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Healing Together with{" "}
            <span className="text-primary">Hope</span> and{" "}
            <span className="text-primary">Tech</span>
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A safe, stigma-free social network where cancer patients, survivors, caregivers, 
            and health coaches connect, support each other, and earn blockchain-powered rewards 
            for their journey toward healing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/register"
              className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all font-medium"
            >
              Join the Community
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <button 
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center justify-center border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-4 rounded-full transition-all font-medium"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}