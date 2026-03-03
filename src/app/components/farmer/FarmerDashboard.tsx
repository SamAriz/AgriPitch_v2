import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Package, ShoppingCart, TrendingUp, DollarSign, Eye, ArrowUpRight } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockProducts, mockOrders, marketTrends, salesData } from '../../data/mockData';
import { Link } from 'react-router';

export function FarmerDashboard() {
  const myProducts = mockProducts.filter(p => p.sellerId === 's1');
  const myOrders = mockOrders.filter(o => o.sellerId === 's1');
  const totalRevenue = myOrders.reduce((sum, order) => sum + order.totalPrice, 0);
  const activeProducts = myProducts.filter(p => p.available).length;
  const pendingOrders = myOrders.filter(o => o.status === 'pending' || o.status === 'confirmed').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Farmer Dashboard</h1>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">Welcome back! Here's your farm overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[var(--card)] border-[var(--border-color)]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[var(--text-secondary)]">Active Products</CardTitle>
            <Package className="w-4 h-4 text-[var(--text-muted)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[var(--text-primary)]">{activeProducts}</div>
            <p className="text-xs text-sm text-[var(--text-muted)] mt-0.5">
              {myProducts.length} total products
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[var(--card)] border-[var(--border-color)]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[var(--text-secondary)]">Pending Orders</CardTitle>
            <ShoppingCart className="w-4 h-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[var(--text-primary)]">{pendingOrders}</div>
            <p className="text-xs text-sm text-[var(--text-muted)] mt-0.5">
              {myOrders.length} total orders
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[var(--card)] border-[var(--border-color)]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[var(--text-secondary)]">Total Revenue</CardTitle>
            <DollarSign className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[var(--text-primary)]">₱{totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[var(--card)] border-[var(--border-color)]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[var(--text-secondary)]">Total Views</CardTitle>
            <Eye className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[var(--text-primary)]">2,847</div>
            <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +8% this week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[var(--card)] border-[var(--border-color)]">
          <CardHeader>
            <CardTitle className="text-[var(--text-primary)]">Market Price Trends</CardTitle>
            <CardDescription>Average prices over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={marketTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                <XAxis dataKey="month" stroke="#059669" />
                <YAxis stroke="#059669" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #10b981' }}
                />
                <Legend />
                <Line type="monotone" dataKey="tomatoes" stroke="#ef4444" strokeWidth={2} name="Tomatoes" />
                <Line type="monotone" dataKey="carrots" stroke="#f97316" strokeWidth={2} name="Carrots" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-[var(--card)] border-[var(--border-color)]">
          <CardHeader>
            <CardTitle className="text-[var(--text-primary)]">Weekly Sales</CardTitle>
            <CardDescription>Sales performance this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                <XAxis dataKey="name" stroke="#059669" />
                <YAxis stroke="#059669" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #10b981' }}
                />
                <Bar dataKey="sales" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="bg-[var(--card)] border-[var(--border-color)]">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-[var(--text-primary)]">Recent Orders</CardTitle>
            <CardDescription>Latest orders from your products</CardDescription>
          </div>
          <Link to="/farmer/orders">
            <Button variant="outline" size="sm" className="border-[var(--border-color)]">
              View All
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {myOrders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-[var(--text-primary)]">{order.productName}</p>
                  <p className="text-sm text-[var(--text-muted)]">
                    {order.buyerName} • {order.quantity} units
                  </p>
                </div>
                <div className="text-right mr-4">
                  <p className="font-medium text-[var(--text-primary)]">₱{order.totalPrice.toFixed(2)}</p>
                  <p className="text-sm text-[var(--text-muted)]">{order.orderDate}</p>
                </div>
                <Badge 
                  variant={
                    order.status === 'delivered' ? 'default' : 
                    order.status === 'shipped' ? 'secondary' : 
                    'outline'
                  }
                  className={
                    order.status === 'delivered' ? 'bg-green-500' :
                    order.status === 'shipped' ? 'bg-blue-500' :
                    'border-amber-500 text-amber-700'
                  }
                >
                  {order.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Products */}
      <Card className="bg-[var(--card)] border-[var(--border-color)]">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-[var(--text-primary)]">Your Products</CardTitle>
            <CardDescription>Active listings on the marketplace</CardDescription>
          </div>
          <Link to="/farmer/products">
            <Button variant="outline" size="sm" className="border-[var(--border-color)]">
              Manage Products
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myProducts.slice(0, 3).map((product) => (
              <div key={product.id} className="border border-[var(--border-color)] rounded-lg overflow-hidden bg-[var(--card)] hover:shadow-md transition-shadow">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium text-[var(--text-primary)]">{product.name}</h3>
                  <p className="text-sm text-sm text-[var(--text-muted)] mt-0.5">{product.quantity} {product.unit} available</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-bold text-[var(--text-secondary)]">₱{product.price}/{product.unit}</span>
                    <Badge variant="outline" className="border-[var(--border-color)] text-[var(--text-secondary)]">
                      {product.available ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
