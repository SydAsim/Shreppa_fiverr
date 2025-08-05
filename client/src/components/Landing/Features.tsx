import { motion } from 'framer-motion';
import { Brain, Zap, Users, TrendingUp, Shield, Activity } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Advanced machine learning algorithms analyze and prioritize vulnerabilities based on your specific environment and threat landscape.',
    color: 'bg-blue-500'
  },
  {
    icon: Zap,
    title: 'Real-time Monitoring',
    description: 'Continuous monitoring of your systems with instant alerts and automated response capabilities for critical threats.',
    color: 'bg-purple-500'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Streamlined workflows for security teams with role-based access, assignment tracking, and progress reporting.',
    color: 'bg-cyan-500'
  },
  {
    icon: TrendingUp,
    title: 'Advanced Analytics',
    description: 'Comprehensive reporting and analytics to track security posture improvements and compliance metrics.',
    color: 'bg-emerald-500'
  },
  {
    icon: Shield,
    title: 'Automated Remediation',
    description: 'Intelligent automation for patch management and vulnerability remediation with minimal manual intervention.',
    color: 'bg-orange-500'
  },
  {
    icon: Activity,
    title: 'Integration Ready',
    description: 'Seamless integration with existing security tools, SIEM platforms, and development workflows via REST APIs.',
    color: 'bg-yellow-500'
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Comprehensive Security Management
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Advanced AI-driven features designed to protect your infrastructure from emerging threats and vulnerabilities.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl hover:shadow-lg transition-all cursor-pointer"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                viewport={{ once: true }}
                className={`w-16 h-16 ${feature.color} rounded-xl flex items-center justify-center mb-6`}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
