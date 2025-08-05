import { type Vulnerability, type TeamMember, type AIMessage, type User, type InsertVulnerability, type InsertTeamMember, type InsertAIMessage, type InsertUser } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Vulnerabilities
  getVulnerabilities(): Promise<Vulnerability[]>;
  getVulnerability(id: string): Promise<Vulnerability | undefined>;
  createVulnerability(vulnerability: InsertVulnerability): Promise<Vulnerability>;
  updateVulnerability(id: string, vulnerability: Partial<Vulnerability>): Promise<Vulnerability | undefined>;
  deleteVulnerability(id: string): Promise<boolean>;

  // Team Members
  getTeamMembers(): Promise<TeamMember[]>;
  getTeamMember(id: string): Promise<TeamMember | undefined>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;

  // AI Messages
  getAIMessages(): Promise<AIMessage[]>;
  createAIMessage(message: InsertAIMessage): Promise<AIMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private vulnerabilities: Map<string, Vulnerability>;
  private teamMembers: Map<string, TeamMember>;
  private aiMessages: Map<string, AIMessage>;

  constructor() {
    this.users = new Map();
    this.vulnerabilities = new Map();
    this.teamMembers = new Map();
    this.aiMessages = new Map();
    
    this.initializeData();
  }

  private initializeData() {
    // Initialize default admin user
    const adminUser: User = {
      id: randomUUID(),
      username: "admin",
      password: "password123",
      name: "Admin User",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
    };
    this.users.set(adminUser.id, adminUser);

    // Initialize sample vulnerabilities
    const sampleVulnerabilities: Vulnerability[] = [
      {
        id: randomUUID(),
        name: "SQL Injection in User Login",
        severity: "critical",
        status: "open",
        assignedTo: "Alice Johnson",
        dueDate: "2024-01-15",
        description: "Critical SQL injection vulnerability found in user authentication system.",
        createdAt: new Date().toISOString()
      },
      {
        id: randomUUID(),
        name: "Cross-Site Scripting (XSS)",
        severity: "high",
        status: "in-progress",
        assignedTo: "Bob Smith",
        dueDate: "2024-01-20",
        description: "XSS vulnerability in comment system allows script execution.",
        createdAt: new Date().toISOString()
      },
      {
        id: randomUUID(),
        name: "Outdated SSL Certificate",
        severity: "medium",
        status: "open",
        assignedTo: "Carol Davis",
        dueDate: "2024-01-25",
        description: "SSL certificate is approaching expiration date.",
        createdAt: new Date().toISOString()
      },
      {
        id: randomUUID(),
        name: "Weak Password Policy",
        severity: "low",
        status: "resolved",
        assignedTo: "David Wilson",
        dueDate: "2024-01-10",
        description: "Password policy does not meet security requirements.",
        createdAt: new Date().toISOString()
      }
    ];

    sampleVulnerabilities.forEach(vuln => this.vulnerabilities.set(vuln.id, vuln));

    // Initialize team members
    const sampleTeamMembers: TeamMember[] = [
      {
        id: randomUUID(),
        name: "Alice Johnson",
        role: "Senior Security Analyst",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b05b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
        status: "online",
        email: "alice.johnson@sherpa.com"
      },
      {
        id: randomUUID(),
        name: "Bob Smith",
        role: "Security Engineer",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
        status: "online",
        email: "bob.smith@sherpa.com"
      },
      {
        id: randomUUID(),
        name: "Carol Davis",
        role: "DevOps Engineer",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
        status: "away",
        email: "carol.davis@sherpa.com"
      },
      {
        id: randomUUID(),
        name: "David Wilson",
        role: "Security Consultant",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
        status: "offline",
        email: "david.wilson@sherpa.com"
      }
    ];

    sampleTeamMembers.forEach(member => this.teamMembers.set(member.id, member));
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Vulnerability methods
  async getVulnerabilities(): Promise<Vulnerability[]> {
    return Array.from(this.vulnerabilities.values());
  }

  async getVulnerability(id: string): Promise<Vulnerability | undefined> {
    return this.vulnerabilities.get(id);
  }

  async createVulnerability(insertVulnerability: InsertVulnerability): Promise<Vulnerability> {
    const id = randomUUID();
    const vulnerability: Vulnerability = { 
      ...insertVulnerability, 
      id, 
      createdAt: new Date().toISOString() 
    };
    this.vulnerabilities.set(id, vulnerability);
    return vulnerability;
  }

  async updateVulnerability(id: string, updates: Partial<Vulnerability>): Promise<Vulnerability | undefined> {
    const vulnerability = this.vulnerabilities.get(id);
    if (!vulnerability) return undefined;

    const updated = { ...vulnerability, ...updates };
    this.vulnerabilities.set(id, updated);
    return updated;
  }

  async deleteVulnerability(id: string): Promise<boolean> {
    return this.vulnerabilities.delete(id);
  }

  // Team member methods
  async getTeamMembers(): Promise<TeamMember[]> {
    return Array.from(this.teamMembers.values());
  }

  async getTeamMember(id: string): Promise<TeamMember | undefined> {
    return this.teamMembers.get(id);
  }

  async createTeamMember(insertMember: InsertTeamMember): Promise<TeamMember> {
    const id = randomUUID();
    const member: TeamMember = { ...insertMember, id };
    this.teamMembers.set(id, member);
    return member;
  }

  // AI message methods
  async getAIMessages(): Promise<AIMessage[]> {
    return Array.from(this.aiMessages.values());
  }

  async createAIMessage(insertMessage: InsertAIMessage): Promise<AIMessage> {
    const id = randomUUID();
    const message: AIMessage = { ...insertMessage, id };
    this.aiMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
