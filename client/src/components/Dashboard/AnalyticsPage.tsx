import { motion } from 'framer-motion';
import { TrendingUp, Target, Clock, Users, Shield, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AnimatedCounter from '@/components/ui/animated-counter';

const kpiMetrics = [
  {
    title: 'Mean Time to Resolve',
    value: 4.2,
    unit: 'days',
    target: 3.0,
    trend: -0.8,
    icon: Clock,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10'
  },
  {
    title: 'Security Coverage',
    value: 94.8,
    unit: '%',
    target: 95.0,
    trend: +2.1,
    icon: Shield,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10'
  },
  {
    title: 'Team Efficiency',
    value: 87.3,
    unit: '%',
    target: 90.0,
    trend: +5.4,
    icon: Users,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10'
  },
  {
    title: 'Risk Reduction',
    value: 78.9,
    unit: '%',
    target: 80.0,
    trend: +12.6,
    icon: TrendingUp,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10'
  }
];

const progressMetrics = [
  { label: 'Critical Vulnerabilities', current: 23, total: 28, color: 'bg-red-500' },
  { label: 'High Priority Issues', current: 67, total: 82, color: 'bg-orange-500' },
  { label: 'Medium Priority', current: 145, total: 156, color: 'bg-yellow-500' },
  { label: 'Low Priority', current: 234, total: 245, color: 'bg-green-500' }
];

export default function AnalyticsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Analytics</h1>
          <p className="text-gray-600 dark:text-gray-300">Deep insights into your security metrics</p>
        </div>
        <Select defaultValue="30">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
            <SelectItem value="365">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiMetrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
                    <metric.icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${metric.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.trend > 0 ? '+' : ''}{metric.trend}%
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    <AnimatedCounter target={metric.value} format={(value) => value.toFixed(1)} />
                    <span className="text-lg text-gray-500 dark:text-gray-400 ml-1">{metric.unit}</span>
                  </p>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <Target className="w-3 h-3 mr-1" />
                    Target: {metric.target}{metric.unit}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Progress Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Resolution Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {progressMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {metric.label}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {metric.current}/{metric.total}
                    </span>
                  </div>
                  <div className="relative">
                    <Progress
                      value={(metric.current / metric.total) * 100}
                      className="h-2"
                    />
                    <div 
                      className={`absolute top-0 left-0 h-2 ${metric.color} rounded-full transition-all duration-1000`}
                      style={{ width: `${(metric.current / metric.total) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {((metric.current / metric.total) * 100).toFixed(1)}% Complete
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 relative">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-gray-200 dark:text-gray-700"
                      />
                      <motion.circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                        className="text-blue-500"
                        strokeDasharray={314}
                        initial={{ strokeDashoffset: 314 }}
                        animate={{ strokeDashoffset: 314 - (314 * 0.87) }}
                        transition={{ duration: 2, delay: 0.5 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          <AnimatedCounter target={87} suffix="%" duration={2000} />
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-300">Overall Score</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <Activity className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                      <AnimatedCounter target={99.7} format={(value) => value.toFixed(1)} suffix="%" />
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">Uptime</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <Shield className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                      <AnimatedCounter target={256} />
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">Scans/Day</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Detailed Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Vulnerability Discovery Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex flex-col items-center justify-center">
              <TrendingUp className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Interactive timeline chart showing vulnerability discovery patterns<br />
                <span className="text-sm">Identifies peak vulnerability periods and trends</span>
              </p>
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">
                  <AnimatedCounter target={23} />
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Critical This Month</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  <AnimatedCounter target={4.2} format={(value) => value.toFixed(1)} />
                  <span className="text-lg"> days</span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Avg. Resolution Time</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  <AnimatedCounter target={89} suffix="%" />
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">On-Time Resolution</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
