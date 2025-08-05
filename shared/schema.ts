import { z } from "zod";

export const vulnerabilitySchema = z.object({
  id: z.string(),
  name: z.string(),
  severity: z.enum(["critical", "high", "medium", "low"]),
  status: z.enum(["open", "in-progress", "resolved"]),
  assignedTo: z.string(),
  dueDate: z.string(),
  description: z.string(),
  createdAt: z.string(),
});

export const teamMemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  avatar: z.string(),
  status: z.enum(["online", "offline", "away"]),
  email: z.string(),
});

export const aiMessageSchema = z.object({
  id: z.string(),
  content: z.string(),
  type: z.enum(["user", "ai"]),
  timestamp: z.string(),
});

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  password: z.string(),
  name: z.string(),
  avatar: z.string(),
});

export type Vulnerability = z.infer<typeof vulnerabilitySchema>;
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type AIMessage = z.infer<typeof aiMessageSchema>;
export type User = z.infer<typeof userSchema>;

export const insertVulnerabilitySchema = vulnerabilitySchema.omit({ id: true, createdAt: true });
export const insertTeamMemberSchema = teamMemberSchema.omit({ id: true });
export const insertAIMessageSchema = aiMessageSchema.omit({ id: true });
export const insertUserSchema = userSchema.omit({ id: true });

export type InsertVulnerability = z.infer<typeof insertVulnerabilitySchema>;
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type InsertAIMessage = z.infer<typeof insertAIMessageSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
