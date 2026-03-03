import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Users, Sprout, Tractor, Package, AlertCircle, CheckCircle, ArrowUpRight, ClipboardList } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockWorkers, mockCrops, mockMachines, mockTasks, harvestData, expenseData } from '../../data/mockData';
import { Link } from 'react-router';

const statusColor = (s: string) => ({
  ready: 'badge-success', growing: 'badge-neutral', harvested: 'badge-success',
  planted: 'badge-neutral', 'needs-attention': 'badge-danger',
}[s] || 'badge-neutral');

const priorityColor = (p: string) => ({
  high: 'badge-danger', medium: 'badge-warning', low: 'badge-neutral',
}[p] || 'badge-neutral');

const taskStatusColor = (s: string) => ({
  'in-progress': 'badge-success', pending: 'badge-warning', completed: 'badge-neutral',
}[s] || 'badge-neutral');

export function FarmDashboard() {
  const activeWorkers    = mockWorkers.filter(w => w.status === 'active').length;
  const growingCrops     = mockCrops.filter(c => c.status === 'growing' || c.status === 'planted').length;
  const availableMachines = mockMachines.filter(m => m.status === 'available').length;
  const pendingTasks     = mockTasks.filter(t => t.status === 'pending' || t.status === 'in-progress').length;

  const stats = [
    { label: 'Active Workers',     value: activeWorkers,     sub: `${mockWorkers.length} total`,    icon: Users,         accent: 'stat-card-green' },
    { label: 'Growing Crops',      value: growingCrops,      sub: `${mockCrops.length} crop areas`, icon: Sprout,        accent: 'stat-card-green' },
    { label: 'Available Machines', value: availableMachines, sub: `${mockMachines.length} total`,   icon: Tractor,       accent: 'stat-card-sky' },
    { label: 'Pending Tasks',      value: pendingTasks,      sub: `${mockTasks.length} total tasks`,icon: ClipboardList, accent: 'stat-card-amber' },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="page-enter">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Farm Dashboard</h1>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">Welcome back! Here's your farm overview.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 page-enter-delay-1">
        {stats.map(s => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className={`${s.accent} bg-[var(--card)]`}>
              <CardContent className="pt-5 pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 rounded-lg bg-[var(--pale-green)]">
                    <Icon className="w-4 h-4 text-[var(--primary-green)]" />
                  </div>
                </div>
                <div className="text-3xl font-black text-[var(--text-primary)]" style={{fontFamily:'Outfit,sans-serif'}}>{s.value}</div>
                <p className="text-xs font-semibold text-[var(--text-secondary)] mt-0.5">{s.label}</p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{s.sub}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 page-enter-delay-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Harvest Trend (kg)</CardTitle>
            <CardDescription>Monthly harvest output</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={harvestData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="month" stroke="var(--text-muted)" tick={{fontSize:11}} />
                <YAxis stroke="var(--text-muted)" tick={{fontSize:11}} />
                <Tooltip contentStyle={{backgroundColor:'var(--card)',border:'1px solid var(--border-color)',borderRadius:8,fontSize:12}} />
                <Line type="monotone" dataKey="harvest" stroke="var(--primary-green)" strokeWidth={2.5} name="Harvest (kg)" dot={{fill:'var(--primary-green)',r:4}} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Farm Expenses (₱)</CardTitle>
            <CardDescription>Monthly expense breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={expenseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="category" stroke="var(--text-muted)" tick={{fontSize:10}} />
                <YAxis stroke="var(--text-muted)" tick={{fontSize:11}} />
                <Tooltip contentStyle={{backgroundColor:'var(--card)',border:'1px solid var(--border-color)',borderRadius:8,fontSize:12}}
                  formatter={(v: any) => `₱${Number(v).toLocaleString()}`} />
                <Bar dataKey="amount" fill="var(--primary-green)" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Priority Tasks */}
      <Card className="page-enter-delay-3">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-base">Today's Priority Tasks</CardTitle>
            <CardDescription>Tasks that need attention</CardDescription>
          </div>
          <Link to="/farm/tasks" className="flex items-center gap-1 text-xs font-semibold text-[var(--primary-green)] hover:underline">
            View All <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockTasks.filter(t => t.status !== 'completed').slice(0, 4).map(task => (
              <div key={task.id} className="flex items-center justify-between p-3.5 bg-[var(--muted-bg)] rounded-xl">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h4 className="font-semibold text-sm text-[var(--text-primary)] truncate">{task.title}</h4>
                    <span className={priorityColor(task.priority)}>{task.priority}</span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] truncate">{task.assignedWorker} · {task.crop} · Due: {task.dueDate}</p>
                </div>
                <span className={`ml-3 flex-shrink-0 ${taskStatusColor(task.status)}`}>
                  {task.status === 'pending' ? 'Pending' : 'In Progress'}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Crop Status */}
      <Card className="page-enter-delay-4">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-base">Crop Status Overview</CardTitle>
            <CardDescription>Current status of all planted crops</CardDescription>
          </div>
          <Link to="/farm/crops" className="flex items-center gap-1 text-xs font-semibold text-[var(--primary-green)] hover:underline">
            Manage <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {mockCrops.map(crop => (
              <div key={crop.id} className="p-4 border border-[var(--border-color)] rounded-xl bg-[var(--card)] hover:border-[var(--soft-green)] transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-sm text-[var(--text-primary)]">{crop.name} — {crop.variety}</h4>
                    <p className="text-xs text-[var(--text-muted)]">{crop.location} · {crop.area} ha</p>
                  </div>
                  <span className={statusColor(crop.status)}>{crop.status}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs mt-3">
                  <div className="bg-[var(--muted-bg)] rounded-lg p-2">
                    <p className="text-[var(--text-muted)]">Planted</p>
                    <p className="font-semibold text-[var(--text-primary)] mt-0.5">{crop.plantingDate}</p>
                  </div>
                  <div className="bg-[var(--muted-bg)] rounded-lg p-2">
                    <p className="text-[var(--text-muted)]">Expected Harvest</p>
                    <p className="font-semibold text-[var(--text-primary)] mt-0.5">{crop.expectedHarvest}</p>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-1.5">
                  {crop.healthStatus === 'excellent' && <span className="badge-success flex items-center gap-1"><CheckCircle className="w-3 h-3" />Excellent</span>}
                  {crop.healthStatus === 'good'      && <span className="badge-neutral flex items-center gap-1"><CheckCircle className="w-3 h-3" />Good</span>}
                  {crop.healthStatus === 'needs-attention' && <span className="badge-danger flex items-center gap-1"><AlertCircle className="w-3 h-3" />Needs Attention</span>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 page-enter-delay-4">
        {[
          { to: '/farm/workers',     icon: Users,    title: 'Manage Workers',   sub: 'Track tasks & performance',  bg: 'bg-[var(--primary-green)]' },
          { to: '/farm/machines',    icon: Tractor,  title: 'Equipment Status', sub: 'Monitor maintenance',        bg: 'bg-[var(--medium-green)]' },
          { to: '/farm/fertilizers', icon: Package,  title: 'Inventory Stock',  sub: 'Check fertilizer levels',    bg: 'bg-[var(--amber-deep)]' },
        ].map(a => {
          const Icon = a.icon;
          return (
            <Link key={a.to} to={a.to}>
              <Card className={`${a.bg} border-0 text-white cursor-pointer hover:opacity-90 hover:shadow-lg transition-all group`}>
                <CardContent className="pt-5 pb-5">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base mb-0.5" style={{fontFamily:'Outfit,sans-serif'}}>{a.title}</h3>
                  <p className="text-sm opacity-80">{a.sub}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
