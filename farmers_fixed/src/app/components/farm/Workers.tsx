import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Plus, Phone, Calendar, Edit, Trash2, CheckCircle } from 'lucide-react';
import { mockWorkers } from '../../data/mockData';
import { toast } from 'sonner';

export function Workers() {
  const [workers, setWorkers] = useState(mockWorkers);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddWorker = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Worker added successfully!');
    setIsAddDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500 text-white';
      case 'on-leave': return 'border-amber-500 text-amber-700';
      case 'inactive': return 'border-red-500 text-red-700';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-emerald-900">Farm Workers</h1>
          <p className="text-emerald-600 mt-1">Manage your farm workers and their tasks</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Worker
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Worker</DialogTitle>
              <DialogDescription>Add a new worker to your farm</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddWorker} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Juan dela Cruz" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="supervisor">Farm Supervisor</SelectItem>
                    <SelectItem value="harvester">Harvester</SelectItem>
                    <SelectItem value="operator">Tractor Operator</SelectItem>
                    <SelectItem value="planter">Planting Specialist</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+63 917 123 4567" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rate">Daily Rate (₱)</Label>
                <Input id="rate" type="number" placeholder="500" required />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                  Add Worker
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white border-emerald-200">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-emerald-900">{workers.length}</div>
            <p className="text-sm text-emerald-600">Total Workers</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-green-200">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-green-700">
              {workers.filter(w => w.status === 'active').length}
            </div>
            <p className="text-sm text-emerald-600">Active</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-amber-200">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-amber-700">
              {workers.filter(w => w.status === 'on-leave').length}
            </div>
            <p className="text-sm text-emerald-600">On Leave</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-blue-200">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-blue-700">
              ₱{workers.reduce((sum, w) => sum + w.dailyRate, 0).toLocaleString()}
            </div>
            <p className="text-sm text-emerald-600">Total Daily Cost</p>
          </CardContent>
        </Card>
      </div>

      {/* Workers List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {workers.map((worker) => (
          <Card key={worker.id} className="bg-white border-emerald-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-emerald-900">{worker.name}</CardTitle>
                  <CardDescription>{worker.position}</CardDescription>
                </div>
                <Badge variant="outline" className={getStatusColor(worker.status)}>
                  {worker.status === 'active' && <CheckCircle className="w-3 h-3 mr-1" />}
                  {worker.status.replace('-', ' ')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">{worker.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Since {worker.dateHired}</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-lg grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-emerald-600">Daily Rate</p>
                  <p className="font-bold text-emerald-900">₱{worker.dailyRate}</p>
                </div>
                <div>
                  <p className="text-xs text-emerald-600">Tasks Completed</p>
                  <p className="font-bold text-emerald-900">{worker.tasksCompleted}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 border-emerald-300">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
