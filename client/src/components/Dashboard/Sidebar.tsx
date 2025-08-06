import { motion } from 'framer-motion';
import { Shield, LayoutDashboard, ShieldAlert, Upload, Bot, FileText, TrendingUp, Users, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useLocation } from 'wouter';
import type { DashboardPage } from '@/pages/dashboard';

interface SidebarProps {
  currentPage: DashboardPage;
  onPageChange: (page: DashboardPage) => void;
  isOpen: boolean;
  onToggle: () => void;
  isMobile: boolean;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'vulnerabilities', label: 'Vulnerabilities', icon: ShieldAlert },
  { id: 'vuln-feed', label: 'Feed Analysis', icon: Upload },
  { id: 'ai-chat', label: 'AI Chat', icon: Bot },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ currentPage, onPageChange, isOpen, onToggle, isMobile }: SidebarProps) {
  const { logout } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    logout();
    setLocation('/');
  };

  return (
    <>
      <motion.div
        initial={false}
        animate={{
          x: isMobile ? (isOpen ? 0 : -280) : 0,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-50 ${
          isMobile ? 'shadow-xl' : ''
        }`}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">SHERPA</span>
          </div>
        </div>

        <nav className="p-4 space-y-2 flex-1">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={currentPage === item.id ? "default" : "ghost"}
              className={`w-full justify-start space-x-3 ${
                currentPage === item.id
                  ? 'bg-primary text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => {
                onPageChange(item.id as DashboardPage);
                if (isMobile) onToggle();
              }}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="ghost"
            className="w-full justify-start space-x-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Button>
        </div>
      </motion.div>
    </>
  );
}
