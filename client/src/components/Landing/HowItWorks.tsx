import { motion } from 'framer-motion';
import { Search, Cpu, CheckCircle, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Discover & Scan',
    description: 'Comprehensive scanning of your infrastructure to identify vulnerabilities across all systems and applications.',
    color: 'bg-blue-500'
  },
  {
    icon: Cpu,
    title: 'Analyze & Prioritize',
    description: 'AI algorithms assess risk levels and business impact to prioritize vulnerabilities for maximum security improvement.',
    color: 'bg-purple-500'
  },
  {
    icon: CheckCircle,
    title: 'Remediate & Monitor',
    description: 'Automated remediation workflows and continuous monitoring ensure vulnerabilities are resolved and don\'t reoccur.',
    color: 'bg-emerald-500'
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How SHERPA Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our streamlined process ensures comprehensive vulnerability management from discovery to resolution.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center relative"
            >
              <div className="relative mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.2 + 0.3, type: "spring", stiffness: 200 }}
                  viewport={{ once: true }}
                  className={`w-20 h-20 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <step.icon className="w-10 h-10 text-white" />
                </motion.div>
                
                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 + 0.5 }}
                    viewport={{ once: true }}
                    className="absolute top-10 left-1/2 transform -translate-x-1/2 translate-x-16 hidden md:block"
                  >
                    <ArrowRight className="w-6 h-6 text-gray-400" />
                  </motion.div>
                )}
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Visual Process Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-20"
      >
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=600"
            alt="SHERPA Security Process Workflow"
            className="rounded-2xl shadow-2xl w-full h-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 rounded-2xl"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h3 className="text-2xl font-bold mb-2">See SHERPA in Action</h3>
              <p className="text-white/90">Real-time vulnerability management dashboard</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
