import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Users, Sprout, Tractor, Package, AlertCircle, CheckCircle, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockWorkers, mockCrops, mockMachines, mockFertilizers, mockTasks, harvestData, expenseData } from '../../data/mockData';
import { Link } from 'react-router';

export function FarmDashboard() {
  const activeWorkers = mockWorkers.filter(w => w.status === 'active').length;
  const growingCrops = mockCrops.filter(c => c.status === 'growing' || c.status === 'planted').length;
  const availableMachines = mockMachines.filter(m => m.status === 'available').length;
  const pendingTasks = mockTasks.filter(t => t.status === 'pending' || t.status === 'in-progress').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Farm Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's your farm overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Workers</CardTitle>
            <Users className="w-4 h-4 text-[var(--primary-green)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeWorkers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {mockWorkers.length} total workers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Growing Crops</CardTitle>
            <Sprout className="w-4 h-4 text-[var(--primary-green)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{growingCrops}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {mockCrops.length} total crop areas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Available Machines</CardTitle>
            <Tractor className="w-4 h-4 text-[var(--primary-green)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableMachines}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {mockMachines.length} total equipment
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <Package className="w-4 h-4 text-[var(--amber-deep)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingTasks}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {mockTasks.length} total tasks
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Harvest Trend (kg)</CardTitle>
            <CardDescription>Monthly harvest output over 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={harvestData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                <XAxis dataKey="month" stroke="#059669" />
                <YAxis stroke="#059669" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #10b981' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="harvest" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  name="Harvest (kg)"
                  dot={{ fill: '#10b981', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Farm Expenses (₱)</CardTitle>
            <CardDescription>Breakdown of monthly expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={expenseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                <XAxis dataKey="category" stroke="#059669" />
                <YAxis stroke="#059669" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #10b981' }}
                  formatter={(value) => `₱${value.toLocaleString()}`}
                />
                <Bar dataKey="amount" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Urgent Tasks */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Today's Priority Tasks</CardTitle>
            <CardDescription>Tasks that need attention</CardDescription>
          </div>
          <Link to="/farm/tasks">
            <Button variant="outline" size="sm" className="border-emerald-300">
              View All
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockTasks.filter(t => t.status !== 'completed').slice(0, 4).map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{task.title}</h4>
                    <Badge 
                      variant="outline" 
                      className={
                        task.priority === 'high' ? 'border-red-500 text-red-700' :
                        task.priority === 'medium' ? 'border-amber-500 text-amber-700' :
                        'border-blue-500 text-blue-700'
                      }
                    >
                      {task.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {task.assignedWorker} • {task.crop} • Due: {task.dueDate}
                  </p>
                </div>
                <Badge 
                  variant={task.status === 'in-progress' ? 'default' : 'outline'}
                  className={task.status === 'in-progress' ? 'bg-blue-500' : 'border-amber-500 text-amber-700'}
                >
                  {task.status === 'pending' ? 'Pending' : 'In Progress'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Crop Status Overview */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Crop Status Overview</CardTitle>
            <CardDescription>Current status of all planted crops</CardDescription>
          </div>
          <Link to="/farm/crops">
            <Button variant="outline" size="sm" className="border-emerald-300">
              Manage Crops
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockCrops.map((crop) => (
              <div key={crop.id} className="p-4 border border-emerald-200 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{crop.name} - {crop.variety}</h4>
                    <p className="text-sm text-muted-foreground">{crop.location} • {crop.area} hectares</p>
                  </div>
                  <Badge 
                    variant="outline"
                    className={
                      crop.status === 'ready' ? 'bg-green-500 text-white' :
                      crop.status === 'growing' ? 'border-blue-500 text-blue-700' :
                      crop.status === 'harvested' ? 'bg-emerald-500 text-white' :
                      'border-amber-500 text-amber-700'
                    }
                  >
                    {crop.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Planted</p>
                    <p className="font-medium">{crop.plantingDate}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Expected Harvest</p>
                    <p className="font-medium">{crop.expectedHarvest}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  {crop.healthStatus === 'excellent' && (
                    <Badge variant="outline" className="border-green-500 text-green-700">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Excellent Health
                    </Badge>
                  )}
                  {crop.healthStatus === 'good' && (
                    <Badge variant="outline" className="border-blue-500 text-blue-700">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Good Health
                    </Badge>
                  )}
                  {crop.healthStatus === 'needs-attention' && (
                    <Badge variant="outline" className="border-red-500 text-red-700">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Needs Attention
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/farm/workers">
          <Card className="bg-[var(--primary-green)] hover:bg-[var(--medium-green)] text-white border-0 cursor-pointer hover:shadow-lg transition-all">
            <CardContent className="pt-6">
              <Users className="w-8 h-8 mb-3" />
              <h3 className="font-bold text-lg mb-1">Manage Workers</h3>
              <p className="text-sm opacity-90">Track tasks and performance</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/farm/machines">
          <Card className="bg-[var(--primary-green)] hover:bg-[var(--medium-green)] text-white border-0 cursor-pointer hover:shadow-lg transition-all">
            <CardContent className="pt-6">
              <Tractor className="w-8 h-8 mb-3" />
              <h3 className="font-bold text-lg mb-1">Equipment Status</h3>
              <p className="text-sm opacity-90">Monitor machine maintenance</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/farm/fertilizers">
          <Card className="bg-[var(--amber-deep)] hover:bg-[var(--amber-mid)] text-white border-0 cursor-pointer hover:shadow-lg transition-all">
            <CardContent className="pt-6">
              <Package className="w-8 h-8 mb-3" />
              <h3 className="font-bold text-lg mb-1">Inventory Stock</h3>
              <p className="text-sm opacity-90">Check fertilizer levels</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}