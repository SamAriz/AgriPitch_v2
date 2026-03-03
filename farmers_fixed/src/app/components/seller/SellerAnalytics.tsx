import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Star } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { topProducts, salesData } from '../../data/mockData';

export function SellerAnalytics() {
  const categoryData = [
    { name: 'Vegetables', value: 35, color: '#10b981' },
    { name: 'Fruits', value: 45, color: '#f59e0b' },
    { name: 'Dairy & Eggs', value: 15, color: '#3b82f6' },
    { name: 'Pantry', value: 5, color: '#8b5cf6' },
  ];

  const customerData = [
    { location: 'California', customers: 245 },
    { location: 'Oregon', customers: 189 },
    { location: 'Washington', customers: 156 },
    { location: 'Nevada', customers: 98 },
    { location: 'Arizona', customers: 76 },
  ];

  const revenueByMonth = [
    { month: 'Jan', revenue: 4200, orders: 45 },
    { month: 'Feb', revenue: 5100, orders: 58 },
    { month: 'Mar', revenue: 4800, orders: 52 },
    { month: 'Apr', revenue: 6200, orders: 67 },
    { month: 'May', revenue: 7500, orders: 82 },
    { month: 'Jun', revenue: 8200, orders: 91 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-emerald-900">Sales Analytics</h1>
        <p className="text-emerald-600 mt-1">Insights into your business performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-emerald-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700">Total Sales</CardTitle>
            <DollarSign className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-900">$35,980</div>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +25% from last period
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-emerald-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700">Total Orders</CardTitle>
            <ShoppingCart className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-900">395</div>
            <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +12% from last period
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-emerald-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700">Avg. Order Value</CardTitle>
            <DollarSign className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-900">$91.09</div>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +8% from last period
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-emerald-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700">Customer Retention</CardTitle>
            <Users className="w-4 h-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-900">78%</div>
            <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
              <TrendingDown className="w-3 h-3" />
              -3% from last period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card className="bg-white border-emerald-200">
        <CardHeader>
          <CardTitle className="text-emerald-900">Revenue & Orders Trend</CardTitle>
          <CardDescription>Monthly performance over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={revenueByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
              <XAxis dataKey="month" stroke="#059669" />
              <YAxis yAxisId="left" stroke="#059669" />
              <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #10b981' }}
              />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="revenue" 
                stroke="#10b981" 
                strokeWidth={3}
                name="Revenue ($)"
                dot={{ fill: '#10b981', r: 5 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="orders" 
                stroke="#3b82f6" 
                strokeWidth={3}
                name="Orders"
                dot={{ fill: '#3b82f6', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card className="bg-white border-emerald-200">
          <CardHeader>
            <CardTitle className="text-emerald-900">Top Selling Products</CardTitle>
            <CardDescription>Best performers by revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topProducts} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                <XAxis type="number" stroke="#059669" />
                <YAxis dataKey="name" type="category" stroke="#059669" width={100} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #10b981' }}
                  formatter={(value) => `$${value}`}
                />
                <Bar dataKey="revenue" fill="#10b981" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sales by Category */}
        <Card className="bg-white border-emerald-200">
          <CardHeader>
            <CardTitle className="text-emerald-900">Sales by Category</CardTitle>
            <CardDescription>Revenue distribution across categories</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Customer Demographics */}
      <Card className="bg-white border-emerald-200">
        <CardHeader>
          <CardTitle className="text-emerald-900">Customer Demographics</CardTitle>
          <CardDescription>Customer distribution by location</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={customerData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
              <XAxis dataKey="location" stroke="#059669" />
              <YAxis stroke="#059669" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #10b981' }}
              />
              <Bar dataKey="customers" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Product Performance Table */}
      <Card className="bg-white border-emerald-200">
        <CardHeader>
          <CardTitle className="text-emerald-900">Product Performance</CardTitle>
          <CardDescription>Detailed breakdown of your products</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center justify-center w-8 h-8 bg-emerald-200 rounded-full font-bold text-emerald-900">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-emerald-900">{product.name}</h4>
                    <p className="text-sm text-emerald-600">{product.sales} units sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-900">${product.revenue.toLocaleString()}</p>
                  <Badge variant="outline" className="border-green-300 text-green-700 mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    High Performer
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
