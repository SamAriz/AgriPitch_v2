import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Package, DollarSign, TrendingUp, Users, Star, ArrowUpRight } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockProducts, mockOrders, salesData } from '../../data/mockData';
import { Link } from 'react-router';

export function SellerDashboard() {
  const myProducts = mockProducts.filter(p => p.sellerId === 's2');
  const myOrders = mockOrders.filter(o => o.sellerId === 's2');
  const totalRevenue = myOrders.reduce((sum, order) => sum + order.totalPrice, 0);
  const activeProducts = myProducts.filter(p => p.available).length;
  const avgRating = myProducts.reduce((sum, p) => sum + p.rating, 0) / myProducts.length;

  const revenueData = [
    { month: 'Jan', revenue: 4200 },
    { month: 'Feb', revenue: 5100 },
    { month: 'Mar', revenue: 4800 },
    { month: 'Apr', revenue: 6200 },
    { month: 'May', revenue: 7500 },
    { month: 'Jun', revenue: 8200 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-emerald-900">Seller Dashboard</h1>
        <p className="text-emerald-600 mt-1">Manage your business and track performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-emerald-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700">Total Revenue</CardTitle>
            <DollarSign className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-900">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +18% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-emerald-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700">Active Products</CardTitle>
            <Package className="w-4 h-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-900">{activeProducts}</div>
            <p className="text-xs text-emerald-600 mt-1">
              {myProducts.length} total listings
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-emerald-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700">Total Orders</CardTitle>
            <Users className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-900">{myOrders.length}</div>
            <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +7 this week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-emerald-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700">Avg. Rating</CardTitle>
            <Star className="w-4 h-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-900">{avgRating.toFixed(1)}</div>
            <p className="text-xs text-emerald-600 mt-1">
              From {myProducts.reduce((sum, p) => sum + p.reviews, 0)} reviews
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border-emerald-200">
          <CardHeader>
            <CardTitle className="text-emerald-900">Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                <XAxis dataKey="month" stroke="#059669" />
                <YAxis stroke="#059669" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #10b981' }}
                  formatter={(value) => `$${value}`}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white border-emerald-200">
          <CardHeader>
            <CardTitle className="text-emerald-900">Daily Sales</CardTitle>
            <CardDescription>Sales activity this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                <XAxis dataKey="name" stroke="#059669" />
                <YAxis stroke="#059669" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #10b981' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card className="bg-white border-emerald-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-emerald-900">Top Performing Products</CardTitle>
            <CardDescription>Your best sellers this month</CardDescription>
          </div>
          <Link to="/seller/analytics">
            <Button variant="outline" size="sm" className="border-emerald-300">
              View Analytics
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {myProducts.slice(0, 3).map((product, index) => (
              <div key={product.id} className="flex items-center gap-4 p-4 bg-emerald-50 rounded-lg">
                <div className="flex items-center justify-center w-8 h-8 bg-emerald-200 rounded-full font-bold text-emerald-900">
                  {index + 1}
                </div>
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-emerald-900">{product.name}</h4>
                  <div className="flex items-center gap-3 mt-1 text-sm text-emerald-600">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{product.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{product.reviews} reviews</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-900">${product.price}/{product.unit}</p>
                  <p className="text-sm text-emerald-600">{product.quantity} {product.unit} left</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card className="bg-white border-emerald-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-emerald-900">Recent Orders</CardTitle>
            <CardDescription>Latest customer orders</CardDescription>
          </div>
          <Link to="/seller/products">
            <Button variant="outline" size="sm" className="border-emerald-300">
              Manage Products
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {myOrders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors">
                <div className="flex-1">
                  <p className="font-medium text-emerald-900">{order.productName}</p>
                  <p className="text-sm text-emerald-600">{order.buyerName} • {order.quantity} units</p>
                </div>
                <div className="text-right mr-4">
                  <p className="font-medium text-emerald-900">${order.totalPrice.toFixed(2)}</p>
                  <p className="text-xs text-emerald-600">{order.orderDate}</p>
                </div>
                <Badge 
                  variant="outline"
                  className={
                    order.status === 'delivered' ? 'bg-green-500 text-white' :
                    order.status === 'shipped' ? 'bg-blue-500 text-white' :
                    order.status === 'confirmed' ? 'border-green-500 text-green-700' :
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
    </div>
  );
}
