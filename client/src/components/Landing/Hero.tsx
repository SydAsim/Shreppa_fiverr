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
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 via-blue-900 to-slate-800">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-8 shadow-lg"
          >
            <Shield className="w-8 h-8 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            SHERPA
            <span className="block text-3xl sm:text-4xl lg:text-5xl font-normal text-blue-300 mt-2">
              Security You Can Trust
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Protecting your digital assets with proven vulnerability management. 
            Simple, reliable, and trusted by security teams worldwide.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Button
            onClick={onGetStartedClick}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
          >
            Get Started
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button
            onClick={scrollToFeatures}
            variant="outline"
            size="lg"
            className="border-2 border-slate-400 text-slate-300 hover:bg-slate-800 hover:border-slate-300 text-lg px-8 py-4 rounded-lg font-medium transition-all"
          >
            Learn More
          </Button>
        </motion.div>

        {/* Simple Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="relative max-w-3xl mx-auto"
        >
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700 p-8 shadow-2xl">
            <div className="flex items-center justify-center space-x-8 text-slate-400">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-6 h-6 text-green-400" />
                </div>
                <p className="text-sm">Secure</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <p className="text-sm">Reliable</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-6 h-6 text-purple-400" />
                </div>
                <p className="text-sm">Trusted</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
