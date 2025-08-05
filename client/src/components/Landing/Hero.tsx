import { motion } from 'framer-motion';
import { Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  onGetStartedClick: () => void;
}

export default function Hero({ onGetStartedClick }: HeroProps) {
  const scrollToFeatures = () => {
    const element = document.getElementById('features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-bg">
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-element absolute top-20 left-10 w-20 h-20 bg-white/20 rounded-full"></div>
        <div className="floating-element absolute top-40 right-20 w-16 h-16 bg-white/20 rounded-lg rotate-45"></div>
        <div className="floating-element absolute bottom-32 left-1/4 w-12 h-12 bg-white/20 rounded-full"></div>
        <div className="floating-element absolute top-60 right-1/3 w-8 h-8 bg-white/20 rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6"
          >
            <Shield className="w-12 h-12 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6"
          >
            Secure Your
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1.5, duration: 3, ease: "linear" }}
              className="block typewriter text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400 overflow-hidden whitespace-nowrap border-r-2 border-white"
            >
              Digital Assets
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-xl sm:text-2xl text-white/90 mb-12 max-w-3xl mx-auto"
          >
            AI-powered vulnerability management platform that identifies, prioritizes, and resolves security threats before they impact your business.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Button
            onClick={onGetStartedClick}
            size="lg"
            className="bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-xl font-semibold transform hover:scale-105 transition-all"
          >
            Get Started Free
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button
            onClick={scrollToFeatures}
            variant="outline"
            size="lg"
            className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-4 rounded-xl font-semibold"
          >
            Learn More
          </Button>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="relative max-w-4xl mx-auto"
        >
          <img
            src="https://images.unsplash.com/photo-1551808525-51a94da548ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=700"
            alt="SHERPA Dashboard Interface"
            className="rounded-2xl shadow-2xl w-full h-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
        </motion.div>
      </div>
    </section>
  );
}
