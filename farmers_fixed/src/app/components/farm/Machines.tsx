import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Plus, Tractor, Wrench, Calendar } from 'lucide-react';
import { mockMachines } from '../../data/mockData';

export function Machines() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500 text-white';
      case 'in-use': return 'bg-blue-500 text-white';
      case 'maintenance': return 'border-red-500 text-red-700';
      default: return '';
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'border-green-500 text-green-700';
      case 'good': return 'border-blue-500 text-blue-700';
      case 'fair': return 'border-amber-500 text-amber-700';
      case 'poor': return 'border-red-500 text-red-700';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-emerald-900">Farm Machinery</h1>
          <p className="text-emerald-600 mt-1">Manage equipment and maintenance</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Machine
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white border-emerald-200">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-emerald-900">{mockMachines.length}</div>
            <p className="text-sm text-emerald-600">Total Equipment</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-green-200">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-green-700">
              {mockMachines.filter(m => m.status === 'available').length}
            </div>
            <p className="text-sm text-emerald-600">Available</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-blue-200">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-blue-700">
              {mockMachines.filter(m => m.status === 'in-use').length}
            </div>
            <p className="text-sm text-emerald-600">In Use</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-red-200">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-red-700">
              {mockMachines.filter(m => m.status === 'maintenance').length}
            </div>
            <p className="text-sm text-emerald-600">Maintenance</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockMachines.map((machine) => (
          <Card key={machine.id} className="bg-white border-emerald-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Tractor className="w-6 h-6 text-emerald-600" />
                  <div>
                    <CardTitle className="text-emerald-900">{machine.name}</CardTitle>
                    <p className="text-sm text-emerald-600">{machine.type}</p>
                  </div>
                </div>
                <Badge variant="outline" className={getStatusColor(machine.status)}>
                  {machine.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                <span className="text-sm text-emerald-700">Condition</span>
                <Badge variant="outline" className={getConditionColor(machine.condition)}>
                  {machine.condition}
                </Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Last: {machine.lastMaintenance}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Next: {machine.nextMaintenance}</span>
                </div>
              </div>

              <Button variant="outline" className="w-full border-emerald-300">
                Schedule Maintenance
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
