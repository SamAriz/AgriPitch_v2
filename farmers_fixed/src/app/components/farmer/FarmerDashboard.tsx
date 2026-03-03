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
        <h1 className="text-3xl font-bold text-emerald-900">Farmer Dashboard</h1>
        <p className="text-emerald-600 mt-1">Welcome back! Here's your farm overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-emerald-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700">Active Products</CardTitle>
            <Package className="w-4 h-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-900">{activeProducts}</div>
            <p className="text-xs text-emerald-600 mt-1">
              {myProducts.length} total products
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-emerald-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700">Pending Orders</CardTitle>
            <ShoppingCart className="w-4 h-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-900">{pendingOrders}</div>
            <p className="text-xs text-emerald-600 mt-1">
              {myOrders.length} total orders
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-emerald-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700">Total Revenue</CardTitle>
            <DollarSign className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-900">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-emerald-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700">Total Views</CardTitle>
            <Eye className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-900">2,847</div>
            <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +8% this week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border-emerald-200">
          <CardHeader>
            <CardTitle className="text-emerald-900">Market Price Trends</CardTitle>
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

        <Card className="bg-white border-emerald-200">
          <CardHeader>
            <CardTitle className="text-emerald-900">Weekly Sales</CardTitle>
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
      <Card className="bg-white border-emerald-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-emerald-900">Recent Orders</CardTitle>
            <CardDescription>Latest orders from your products</CardDescription>
          </div>
          <Link to="/farmer/orders">
            <Button variant="outline" size="sm" className="border-emerald-300">
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
                  <p className="font-medium text-emerald-900">{order.productName}</p>
                  <p className="text-sm text-emerald-600">
                    {order.buyerName} • {order.quantity} units
                  </p>
                </div>
                <div className="text-right mr-4">
                  <p className="font-medium text-emerald-900">${order.totalPrice.toFixed(2)}</p>
                  <p className="text-sm text-emerald-600">{order.orderDate}</p>
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
      <Card className="bg-white border-emerald-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-emerald-900">Your Products</CardTitle>
            <CardDescription>Active listings on the marketplace</CardDescription>
          </div>
          <Link to="/farmer/products">
            <Button variant="outline" size="sm" className="border-emerald-300">
              Manage Products
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myProducts.slice(0, 3).map((product) => (
              <div key={product.id} className="border border-emerald-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium text-emerald-900">{product.name}</h3>
                  <p className="text-sm text-emerald-600 mt-1">{product.quantity} {product.unit} available</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-bold text-emerald-700">${product.price}/{product.unit}</span>
                    <Badge variant="outline" className="border-emerald-300 text-emerald-700">
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
