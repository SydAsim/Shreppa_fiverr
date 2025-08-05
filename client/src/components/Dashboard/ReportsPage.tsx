import { motion } from 'framer-motion';
import { FileText, Download, Calendar, TrendingUp, Shield, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AnimatedCounter from '@/components/ui/animated-counter';

const reportCards = [
  {
    title: 'Security Summary',
    description: 'Overall security posture and key metrics',
    icon: Shield,
    color: 'bg-blue-500',
    lastGenerated: '2024-01-08'
  },
  {
    title: 'Vulnerability Report',
    description: 'Detailed analysis of all security vulnerabilities',
    icon: AlertTriangle,
    color: 'bg-red-500',
    lastGenerated: '2024-01-08'
  },
  {
    title: 'Compliance Report',
    description: 'Regulatory compliance status and requirements',
    icon: FileText,
    color: 'bg-green-500',
    lastGenerated: '2024-01-07'
  },
  {
    title: 'Trend Analysis',
    description: 'Security trends and performance over time',
    icon: TrendingUp,
    color: 'bg-purple-500',
    lastGenerated: '2024-01-06'
  }
];

const mockChartData = [
  { month: 'Jan', vulnerabilities: 45, resolved: 38 },
  { month: 'Feb', vulnerabilities: 52, resolved: 44 },
  { month: 'Mar', vulnerabilities: 38, resolved: 35 },
  { month: 'Apr', vulnerabilities: 61, resolved: 48 },
  { month: 'May', vulnerabilities: 55, resolved: 52 },
  { month: 'Jun', vulnerabilities: 43, resolved: 41 }
];

export default function ReportsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Security Reports</h1>
          <p className="text-gray-600 dark:text-gray-300">Comprehensive security analytics and reporting</p>
        </div>
        <div className="flex gap-3">
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
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {reportCards.map((report, index) => (
          <motion.div
            key={report.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${report.color} rounded-lg flex items-center justify-center`}>
                    <report.icon className="w-6 h-6 text-white" />
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{report.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{report.description}</p>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <Calendar className="w-3 h-3 mr-1" />
                  Last: {report.lastGenerated}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Vulnerability Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex flex-col items-center justify-center">
                <TrendingUp className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Interactive vulnerability trend chart<br />
                  <span className="text-sm">Shows monthly vulnerability discovery and resolution rates</span>
                </p>
              </div>
              {/* Mock chart data display */}
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    <AnimatedCounter target={294} />
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Total Found</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    <AnimatedCounter target={258} />
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Resolved</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-600">
                    <AnimatedCounter target={36} />
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Outstanding</p>
                </div>
              </div>
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
              <CardTitle>Security Score History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex flex-col items-center justify-center">
                <Shield className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Security score progression chart<br />
                  <span className="text-sm">Track your security posture improvements over time</span>
                </p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-300">Current Score</p>
                  <p className="text-3xl font-bold text-blue-600">
                    <AnimatedCounter target={87} suffix="%" />
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-300">Previous Month</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">84%</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-300">Improvement</p>
                  <p className="text-2xl font-semibold text-green-600">+3%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Severity Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Vulnerability Severity Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-red-600">
                    <AnimatedCounter target={23} />
                  </span>
                </div>
                <p className="font-medium text-gray-900 dark:text-white">Critical</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">High impact issues</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-orange-600">
                    <AnimatedCounter target={45} />
                  </span>
                </div>
                <p className="font-medium text-gray-900 dark:text-white">High</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Significant risks</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-yellow-600">
                    <AnimatedCounter target={89} />
                  </span>
                </div>
                <p className="font-medium text-gray-900 dark:text-white">Medium</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Moderate concerns</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-green-600">
                    <AnimatedCounter target={137} />
                  </span>
                </div>
                <p className="font-medium text-gray-900 dark:text-white">Low</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Minor issues</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
