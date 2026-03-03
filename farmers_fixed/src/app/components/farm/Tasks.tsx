import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Plus, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { mockTasks } from '../../data/mockData';
import { toast } from 'sonner';

export function Tasks() {
  const [tasks, setTasks] = useState(mockTasks);

  const handleUpdateStatus = (taskId: string, newStatus: 'pending' | 'in-progress' | 'completed') => {
    setTasks(tasks.map(t => 
      t.id === taskId ? { ...t, status: newStatus } : t
    ));
    toast.success(`Task updated to ${newStatus}`);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 text-red-700';
      case 'medium': return 'border-amber-500 text-amber-700';
      case 'low': return 'border-blue-500 text-blue-700';
      default: return '';
    }
  };

  const TaskCard = ({ task }: { task: typeof tasks[0] }) => (
    <Card className="bg-white border-emerald-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-emerald-900 mb-2">{task.title}</CardTitle>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className={getPriorityColor(task.priority)}>
                <AlertCircle className="w-3 h-3 mr-1" />
                {task.priority}
              </Badge>
              <Badge variant="outline" className="border-emerald-300 text-emerald-700">
                {task.crop}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="p-3 bg-emerald-50 rounded-lg space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-emerald-600">Assigned to</span>
            <span className="font-medium text-emerald-900">{task.assignedWorker}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-emerald-600">Due date</span>
            <span className="font-medium text-emerald-900">{task.dueDate}</span>
          </div>
        </div>

        <div className="flex gap-2">
          {task.status === 'pending' && (
            <Button 
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={() => handleUpdateStatus(task.id, 'in-progress')}
            >
              Start Task
            </Button>
          )}
          {task.status === 'in-progress' && (
            <Button 
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={() => handleUpdateStatus(task.id, 'completed')}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark Complete
            </Button>
          )}
          {task.status === 'completed' && (
            <Badge variant="outline" className="w-full justify-center py-2 bg-green-50 border-green-500 text-green-700">
              <CheckCircle className="w-4 h-4 mr-2" />
              Completed
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-emerald-900">Farm Tasks</h1>
          <p className="text-emerald-600 mt-1">Manage and track daily farm activities</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white border-emerald-200">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-emerald-900">{tasks.length}</div>
            <p className="text-sm text-emerald-600">Total Tasks</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-amber-200">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-amber-700">
              {tasks.filter(t => t.status === 'pending').length}
            </div>
            <p className="text-sm text-emerald-600">Pending</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-blue-200">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-blue-700">
              {tasks.filter(t => t.status === 'in-progress').length}
            </div>
            <p className="text-sm text-emerald-600">In Progress</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-green-200">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-green-700">
              {tasks.filter(t => t.status === 'completed').length}
            </div>
            <p className="text-sm text-emerald-600">Completed</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="bg-white border border-emerald-200">
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tasks.map(task => <TaskCard key={task.id} task={task} />)}
        </TabsContent>

        <TabsContent value="pending" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tasks.filter(t => t.status === 'pending').map(task => <TaskCard key={task.id} task={task} />)}
        </TabsContent>

        <TabsContent value="in-progress" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tasks.filter(t => t.status === 'in-progress').map(task => <TaskCard key={task.id} task={task} />)}
        </TabsContent>

        <TabsContent value="completed" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tasks.filter(t => t.status === 'completed').map(task => <TaskCard key={task.id} task={task} />)}
        </TabsContent>
      </Tabs>
    </div>
  );
}
