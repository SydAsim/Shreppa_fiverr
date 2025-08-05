import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Edit, Trash2, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Modal from '@/components/ui/modal';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useVulnerabilities } from '@/hooks/use-vulnerabilities';
import { Vulnerability } from '@shared/schema';

const severityColors = {
  critical: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  high: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
};

const statusColors = {
  open: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  resolved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
};

export default function VulnerabilitiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingVuln, setEditingVuln] = useState<Vulnerability | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    severity: '',
    status: 'open',
    assignedTo: '',
    dueDate: '',
    description: ''
  });

  const { toast } = useToast();
  const { vulnerabilities, loading, addVulnerability, updateVulnerability, deleteVulnerability } = useVulnerabilities();

  const filteredVulnerabilities = useMemo(() => {
    return vulnerabilities.filter(vuln => {
      const matchesSearch = vuln.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           vuln.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSeverity = !severityFilter || vuln.severity === severityFilter;
      const matchesStatus = !statusFilter || vuln.status === statusFilter;
      
      return matchesSearch && matchesSeverity && matchesStatus;
    });
  }, [vulnerabilities, searchTerm, severityFilter, statusFilter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.severity || !formData.assignedTo || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (editingVuln) {
        await updateVulnerability(editingVuln.id, {
          name: formData.name,
          description: formData.description,
          status: formData.status as 'open' | 'in-progress' | 'resolved',
          severity: formData.severity as 'low' | 'medium' | 'high' | 'critical',
          assignedTo: formData.assignedTo,
          dueDate: formData.dueDate
        });
        toast({
          title: "Vulnerability Updated",
          description: "The vulnerability has been updated successfully.",
        });
      } else {
        await addVulnerability({
          name: formData.name,
          description: formData.description,
          status: formData.status as 'open' | 'in-progress' | 'resolved',
          severity: formData.severity as 'low' | 'medium' | 'high' | 'critical',
          assignedTo: formData.assignedTo,
          dueDate: formData.dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        });
        toast({
          title: "Vulnerability Added",
          description: "New vulnerability has been added successfully.",
        });
      }
      
      resetForm();
      setShowAddModal(false);
      setEditingVuln(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save vulnerability.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (vuln: Vulnerability) => {
    setEditingVuln(vuln);
    setFormData({
      name: vuln.name,
      severity: vuln.severity,
      status: vuln.status,
      assignedTo: vuln.assignedTo,
      dueDate: vuln.dueDate,
      description: vuln.description
    });
    setShowAddModal(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this vulnerability?')) {
      try {
        await deleteVulnerability(id);
        toast({
          title: "Vulnerability Deleted",
          description: "The vulnerability has been deleted successfully.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete vulnerability.",
          variant: "destructive",
        });
      }
    }
  };

  const handleAssign = async (id: string) => {
    try {
      await updateVulnerability(id, { status: 'in-progress' });
      toast({
        title: "Vulnerability Assigned",
        description: "Vulnerability status updated to in-progress.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to assign vulnerability.",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      severity: '',
      status: 'open',
      assignedTo: '',
      dueDate: '',
      description: ''
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Vulnerabilities</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage and track security vulnerabilities</p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setEditingVuln(null);
            setShowAddModal(true);
          }}
          className="bg-primary hover:bg-primary-600"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Vulnerability
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search vulnerabilities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Severities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="text-gray-600 dark:text-gray-300 mt-2">Loading vulnerabilities...</p>
            </div>
          ) : filteredVulnerabilities.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-300">No vulnerabilities found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Severity</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Assigned To</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Due Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVulnerabilities.map((vuln, index) => (
                    <motion.tr
                      key={vuln.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900 dark:text-white">{vuln.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300 truncate max-w-xs">
                          {vuln.description}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={severityColors[vuln.severity]}>
                          {vuln.severity.charAt(0).toUpperCase() + vuln.severity.slice(1)}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={statusColors[vuln.status]}>
                          {vuln.status.charAt(0).toUpperCase() + vuln.status.slice(1).replace('-', ' ')}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900 dark:text-white">{vuln.assignedTo}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900 dark:text-white">{vuln.dueDate}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          {vuln.status === 'open' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleAssign(vuln.id)}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              Assign
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(vuln)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(vuln.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Vulnerability Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditingVuln(null);
          resetForm();
        }}
        title={editingVuln ? 'Edit Vulnerability' : 'Add New Vulnerability'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter vulnerability name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="severity">Severity *</Label>
              <Select value={formData.severity} onValueChange={(value) => setFormData({ ...formData, severity: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="assignedTo">Assign To *</Label>
              <Select value={formData.assignedTo} onValueChange={(value) => setFormData({ ...formData, assignedTo: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select team member" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Alice Johnson">Alice Johnson</SelectItem>
                  <SelectItem value="Bob Smith">Bob Smith</SelectItem>
                  <SelectItem value="Carol Davis">Carol Davis</SelectItem>
                  <SelectItem value="David Wilson">David Wilson</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide detailed information about the vulnerability..."
              required
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary-600">
              {editingVuln ? 'Update Vulnerability' : 'Add Vulnerability'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowAddModal(false);
                setEditingVuln(null);
                resetForm();
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
