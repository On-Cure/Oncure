'use client';

import LandingNavbar from '../../components/landing/LandingNavbar';
import Hero from '../../components/landing/Hero';
import About from '../../components/landing/About';
import Features from '../../components/landing/Features';
import TechStack from '../../components/landing/TechStack';
import Team from '../../components/landing/Team';
import Footer from '../../components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <LandingNavbar />
      <main>
        <Hero />
        <About />
        <Features />
        <TechStack />
        <Team />
      </main>
      <Footer />
    </div>
  );
}