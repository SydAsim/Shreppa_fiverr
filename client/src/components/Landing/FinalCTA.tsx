import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FinalCTAProps {
  onStartTrialClick: () => void;
}

export default function FinalCTA({ onStartTrialClick }: FinalCTAProps) {
  return (
    <section className="py-20 gradient-bg relative overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-element absolute top-10 left-20 w-16 h-16 bg-white/20 rounded-lg rotate-12"></div>
        <div className="floating-element absolute bottom-20 right-10 w-12 h-12 bg-white/20 rounded-full"></div>
        <div className="floating-element absolute top-1/2 left-10 w-8 h-8 bg-white/20 rounded-full"></div>
        <div className="floating-element absolute top-20 right-1/3 w-14 h-14 bg-white/20 rounded-lg rotate-45"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Secure Your Infrastructure?
          </h2>
          <p className="text-xl text-white/90 mb-12">
            Join thousands of organizations already protecting their digital assets with SHERPA's AI-powered security platform.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={onStartTrialClick}
              size="lg"
              className="bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-xl font-semibold transform hover:scale-105 transition-all"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-4 rounded-xl font-semibold"
            >
              Schedule Demo
              <Calendar className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
