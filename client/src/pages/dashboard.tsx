import { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/Dashboard/Sidebar';
import TopBar from '@/components/Dashboard/TopBar';
import DashboardOverview from '@/components/Dashboard/DashboardOverview';
import VulnerabilitiesPage from '@/components/Dashboard/VulnerabilitiesPage';
import AIChatPage from '@/components/Dashboard/AIChatPage';
import ReportsPage from '@/components/Dashboard/ReportsPage';
import AnalyticsPage from '@/components/Dashboard/AnalyticsPage';
import TeamPage from '@/components/Dashboard/TeamPage';
import SettingsPage from '@/components/Dashboard/SettingsPage';
import { useIsMobile } from '@/hooks/use-mobile';

export type DashboardPage = 'dashboard' | 'vulnerabilities' | 'ai-chat' | 'reports' | 'analytics' | 'team' | 'settings';

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState<DashboardPage>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'vulnerabilities':
        return <VulnerabilitiesPage />;
      case 'ai-chat':
        return <AIChatPage />;
      case 'reports':
        return <ReportsPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'team':
        return <TeamPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        isMobile={isMobile}
      />
      
      <div className={`transition-all duration-300 ${isMobile ? 'ml-0' : 'ml-64'}`}>
        <TopBar onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} isMobile={isMobile} />
        
        <motion.main
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6"
        >
          {renderPage()}
        </motion.main>
      </div>
      
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
