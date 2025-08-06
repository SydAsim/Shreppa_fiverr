import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import Navigation from '@/components/ui/navigation';
import Hero from '@/components/Landing/Hero';
import Features from '@/components/Landing/Features';
import HowItWorks from '@/components/Landing/HowItWorks';
import VulnerabilityFeed from '@/components/Landing/VulnerabilityFeed';
import Testimonials from '@/components/Landing/Testimonials';
import FinalCTA from '@/components/Landing/FinalCTA';
import Footer from '@/components/Landing/Footer';

export default function Landing() {
  const [, setLocation] = useLocation();

  const handleLoginClick = () => {
    setLocation('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation onLoginClick={handleLoginClick} />
      <Hero onGetStartedClick={handleLoginClick} />
      <Features />
      <HowItWorks />
      <VulnerabilityFeed />
      <Testimonials />
      <FinalCTA onStartTrialClick={handleLoginClick} />
      <Footer />
    </div>
  );
}
