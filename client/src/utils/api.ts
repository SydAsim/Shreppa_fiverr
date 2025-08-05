import { Vulnerability, TeamMember, AIMessage, InsertVulnerability } from '@shared/schema';

// Mock API with Promise delays to simulate real API calls
class MockAPI {
  private delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  async getVulnerabilities(): Promise<Vulnerability[]> {
    await this.delay(500);
    const stored = localStorage.getItem('vulnerabilities');
    if (stored) {
      return JSON.parse(stored);
    }
    
    // Default vulnerabilities
    const defaultVulns: Vulnerability[] = [
      {
        id: '1',
        name: 'SQL Injection in User Login',
        severity: 'critical',
        status: 'open',
        assignedTo: 'Alice Johnson',
        dueDate: '2024-01-15',
        description: 'Critical SQL injection vulnerability found in user authentication system.',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Cross-Site Scripting (XSS)',
        severity: 'high',
        status: 'in-progress',
        assignedTo: 'Bob Smith',
        dueDate: '2024-01-20',
        description: 'XSS vulnerability in comment system allows script execution.',
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Outdated SSL Certificate',
        severity: 'medium',
        status: 'open',
        assignedTo: 'Carol Davis',
        dueDate: '2024-01-25',
        description: 'SSL certificate is approaching expiration date.',
        createdAt: new Date().toISOString()
      },
      {
        id: '4',
        name: 'Weak Password Policy',
        severity: 'low',
        status: 'resolved',
        assignedTo: 'David Wilson',
        dueDate: '2024-01-10',
        description: 'Password policy does not meet security requirements.',
        createdAt: new Date().toISOString()
      }
    ];
    
    localStorage.setItem('vulnerabilities', JSON.stringify(defaultVulns));
    return defaultVulns;
  }

  async createVulnerability(data: InsertVulnerability): Promise<Vulnerability> {
    await this.delay(300);
    const vulnerabilities = await this.getVulnerabilities();
    const newVuln: Vulnerability = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    const updated = [...vulnerabilities, newVuln];
    localStorage.setItem('vulnerabilities', JSON.stringify(updated));
    return newVuln;
  }

  async updateVulnerability(id: string, updates: Partial<Vulnerability>): Promise<Vulnerability> {
    await this.delay(300);
    const vulnerabilities = await this.getVulnerabilities();
    const index = vulnerabilities.findIndex(v => v.id === id);
    if (index === -1) throw new Error('Vulnerability not found');
    
    const updated = { ...vulnerabilities[index], ...updates };
    vulnerabilities[index] = updated;
    localStorage.setItem('vulnerabilities', JSON.stringify(vulnerabilities));
    return updated;
  }

  async deleteVulnerability(id: string): Promise<void> {
    await this.delay(300);
    const vulnerabilities = await this.getVulnerabilities();
    const filtered = vulnerabilities.filter(v => v.id !== id);
    localStorage.setItem('vulnerabilities', JSON.stringify(filtered));
  }

  async getTeamMembers(): Promise<TeamMember[]> {
    await this.delay(300);
    return [
      {
        id: '1',
        name: 'Alice Johnson',
        role: 'Senior Security Analyst',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b05b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150',
        status: 'online',
        email: 'alice.johnson@sherpa.com'
      },
      {
        id: '2',
        name: 'Bob Smith',
        role: 'Security Engineer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150',
        status: 'online',
        email: 'bob.smith@sherpa.com'
      },
      {
        id: '3',
        name: 'Carol Davis',
        role: 'DevOps Engineer',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150',
        status: 'away',
        email: 'carol.davis@sherpa.com'
      },
      {
        id: '4',
        name: 'David Wilson',
        role: 'Security Consultant',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150',
        status: 'offline',
        email: 'david.wilson@sherpa.com'
      }
    ];
  }

  async getAIResponses(): Promise<string[]> {
    await this.delay(200);
    return [
      "Based on the vulnerability data, I recommend prioritizing critical and high-severity issues first. Focus on the SQL injection vulnerability as it poses the highest risk.",
      "For XSS vulnerabilities, implement Content Security Policy (CSP) headers and input validation. This will significantly reduce your attack surface.",
      "Regular security audits should be conducted monthly. I can help you schedule automated scans for continuous monitoring.",
      "The outdated SSL certificate should be renewed immediately. I can guide you through the certificate renewal process.",
      "Consider implementing a Web Application Firewall (WAF) to provide an additional layer of protection against common attacks.",
      "Multi-factor authentication (MFA) would greatly enhance your security posture. Would you like me to explain the implementation process?",
      "Your current security score is good, but there's room for improvement. Let's focus on addressing the remaining vulnerabilities.",
      "I notice patterns in your vulnerability reports. Consider implementing automated security testing in your CI/CD pipeline.",
      "The team workload seems balanced, but Alice Johnson might need additional support with the critical vulnerabilities.",
      "Based on industry best practices, your response time for critical vulnerabilities should be under 24 hours."
    ];
  }
}

export const mockApi = new MockAPI();
