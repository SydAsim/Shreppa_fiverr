import { motion } from 'framer-motion';
import { ShieldAlert, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedCounter from '@/components/ui/animated-counter';

const overviewCards = [
  {
    title: 'Total Vulnerabilities',
    value: 1247,
    change: '+5.2%',
    changeType: 'increase',
    icon: ShieldAlert,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10'
  },
  {
    title: 'Critical Issues',
    value: 23,
    change: '-12.3%',
    changeType: 'decrease',
    icon: AlertTriangle,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10'
  },
  {
    title: 'Resolved',
    value: 892,
    change: '+18.1%',
    changeType: 'decrease',
    icon: CheckCircle,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10'
  },
  {
    title: 'Security Score',
    value: 87,
    change: '+3.2%',
    changeType: 'decrease',
    icon: TrendingUp,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10'
  }
];

export default function DashboardOverview() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Security Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">Monitor your organization's security posture in real-time</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {overviewCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {card.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      <AnimatedCounter target={card.value} />
                    </p>
                  </div>
                  <div className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center`}>
                    <card.icon className={`w-6 h-6 ${card.color}`} />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <span className={`text-sm font-medium ${
                    card.changeType === 'decrease' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {card.change}
                  </span>
                  <span className="text-gray-600 dark:text-gray-300 text-sm ml-2">
                    from last week
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Additional Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest security events and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Critical vulnerability detected in authentication system
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    SSL certificate renewed successfully
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Security scan completed for web applications
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Team member Alice Johnson assigned new vulnerability
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-left hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                >
                  <ShieldAlert className="w-6 h-6 text-blue-500 mb-2" />
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    New Scan
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">
                    Start vulnerability scan
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-left hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                >
                  <CheckCircle className="w-6 h-6 text-green-500 mb-2" />
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    Review Reports
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">
                    Check latest findings
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-left hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                >
                  <TrendingUp className="w-6 h-6 text-purple-500 mb-2" />
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    View Analytics
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">
                    Security metrics
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-left hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
                >
                  <AlertTriangle className="w-6 h-6 text-orange-500 mb-2" />
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    AI Assistant
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">
                    Get recommendations
                  </div>
                </motion.button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
