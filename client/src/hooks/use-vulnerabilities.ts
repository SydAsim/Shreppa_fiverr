import { useState, useEffect } from 'react';
import { Vulnerability, InsertVulnerability } from '@shared/schema';
import { useAppContext } from '@/contexts/AppContext';
import { mockApi } from '@/utils/api';

export function useVulnerabilities() {
  const { vulnerabilities, setVulnerabilities } = useAppContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadVulnerabilities();
  }, []);

  const loadVulnerabilities = async () => {
    setLoading(true);
    try {
      const data = await mockApi.getVulnerabilities();
      setVulnerabilities(data);
    } catch (error) {
      console.error('Failed to load vulnerabilities:', error);
    } finally {
      setLoading(false);
    }
  };

  const addVulnerability = async (vulnerability: InsertVulnerability) => {
    try {
      const newVuln = await mockApi.createVulnerability(vulnerability);
      setVulnerabilities(prev => [...prev, newVuln]);
      return newVuln;
    } catch (error) {
      console.error('Failed to add vulnerability:', error);
      throw error;
    }
  };

  const updateVulnerability = async (id: string, updates: Partial<Vulnerability>) => {
    try {
      const updated = await mockApi.updateVulnerability(id, updates);
      setVulnerabilities(prev => 
        prev.map(v => v.id === id ? updated : v)
      );
      return updated;
    } catch (error) {
      console.error('Failed to update vulnerability:', error);
      throw error;
    }
  };

  const deleteVulnerability = async (id: string) => {
    try {
      await mockApi.deleteVulnerability(id);
      setVulnerabilities(prev => prev.filter(v => v.id !== id));
    } catch (error) {
      console.error('Failed to delete vulnerability:', error);
      throw error;
    }
  };

  return {
    vulnerabilities,
    loading,
    addVulnerability,
    updateVulnerability,
    deleteVulnerability,
    refresh: loadVulnerabilities
  };
}
