import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ShoppingBag, Package, Star, TrendingUp, ArrowUpRight } from 'lucide-react';
import { mockProducts, mockOrders } from '../../data/mockData';
import { Link } from 'react-router';

export function BuyerDashboard() {
  const myOrders = mockOrders.filter(o => o.buyerId === 'b1');
  const activeOrders = myOrders.filter(o => o.status === 'pending' || o.status === 'confirmed' || o.status === 'shipped');
  const totalSpent = myOrders.reduce((sum, order) => sum + order.totalPrice, 0);
  const recommendedProducts = mockProducts.filter(p => p.rating >= 4.7).slice(0, 4);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Buyer Dashboard</h1>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">Welcome back! Discover fresh produce from local farmers.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[var(--card)] border-[var(--border-color)]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[var(--text-secondary)]">Active Orders</CardTitle>
            <ShoppingBag className="w-4 h-4 text-[var(--text-muted)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[var(--text-primary)]">{activeOrders.length}</div>
            <p className="text-xs text-sm text-[var(--text-muted)] mt-0.5">
              {myOrders.length} total orders
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[var(--card)] border-[var(--border-color)]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[var(--text-secondary)]">Total Spent</CardTitle>
            <Package className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[var(--text-primary)]">₱{totalSpent.toFixed(2)}</div>
            <p className="text-xs text-sm text-[var(--text-muted)] mt-0.5">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-[var(--card)] border-[var(--border-color)]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[var(--text-secondary)]">Favorite Sellers</CardTitle>
            <Star className="w-4 h-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[var(--text-primary)]">5</div>
            <p className="text-xs text-sm text-[var(--text-muted)] mt-0.5">In your favorites</p>
          </CardContent>
        </Card>

        <Card className="bg-[var(--card)] border-[var(--border-color)]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[var(--text-secondary)]">Savings</CardTitle>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[var(--text-primary)]">₱45.30</div>
            <p className="text-xs text-blue-600 mt-1">vs. retail prices</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Orders */}
      <Card className="bg-[var(--card)] border-[var(--border-color)]">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-[var(--text-primary)]">Active Orders</CardTitle>
            <CardDescription>Track your recent orders</CardDescription>
          </div>
          <Link to="/buyer/orders">
            <Button variant="outline" size="sm" className="border-[var(--border-color)]">
              View All
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {activeOrders.length > 0 ? (
            <div className="space-y-4">
              {activeOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-[var(--text-primary)]">{order.productName}</p>
                    <p className="text-sm text-[var(--text-muted)]">
                      {order.sellerName} • {order.quantity} units
                    </p>
                  </div>
                  <div className="text-right mr-4">
                    <p className="font-medium text-[var(--text-primary)]">₱{order.totalPrice.toFixed(2)}</p>
                    <p className="text-sm text-[var(--text-muted)]">{order.orderDate}</p>
                  </div>
                  <Badge 
                    variant="outline"
                    className={
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
          ) : (
            <div className="text-center py-8">
              <ShoppingBag className="w-12 h-12 text-emerald-300 mx-auto mb-2" />
              <p className="text-[var(--text-muted)]">No active orders</p>
              <Link to="/buyer/search">
                <Button className="mt-4 bg-[var(--primary-green)] hover:bg-[var(--medium-green)]">
                  Browse Products
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recommended Products */}
      <Card className="bg-[var(--card)] border-[var(--border-color)]">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-[var(--text-primary)]">Recommended for You</CardTitle>
            <CardDescription>Top-rated products from verified sellers</CardDescription>
          </div>
          <Link to="/buyer/search">
            <Button variant="outline" size="sm" className="border-[var(--border-color)]">
              Browse All
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendedProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <div className="border border-[var(--border-color)] rounded-lg overflow-hidden bg-[var(--card)] hover:shadow-lg transition-shadow cursor-pointer">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-[var(--text-primary)] text-sm">{product.name}</h3>
                      <div className="flex items-center gap-1 text-xs">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="font-medium text-[var(--text-primary)]">{product.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mb-2">{product.sellerName}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[var(--text-secondary)]">₱{product.price}/{product.unit}</span>
                      <Badge variant="outline" className="border-green-300 text-green-700 text-xs">
                        Available
                      </Badge>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-emerald-500 to-green-600 text-white border-0 cursor-pointer hover:shadow-lg transition-shadow">
          <Link to="/buyer/search">
            <CardContent className="pt-6">
              <ShoppingBag className="w-8 h-8 mb-3" />
              <h3 className="font-bold text-lg mb-1">Browse Products</h3>
              <p className="text-sm text-emerald-100">Discover fresh produce from local farms</p>
            </CardContent>
          </Link>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white border-0 cursor-pointer hover:shadow-lg transition-shadow">
          <Link to="/buyer/orders">
            <CardContent className="pt-6">
              <Package className="w-8 h-8 mb-3" />
              <h3 className="font-bold text-lg mb-1">Track Orders</h3>
              <p className="text-sm text-amber-100">Monitor delivery status in real-time</p>
            </CardContent>
          </Link>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0 cursor-pointer hover:shadow-lg transition-shadow">
          <Link to="/messages">
            <CardContent className="pt-6">
              <Star className="w-8 h-8 mb-3" />
              <h3 className="font-bold text-lg mb-1">Message Sellers</h3>
              <p className="text-sm text-blue-100">Connect directly with farmers and sellers</p>
            </CardContent>
          </Link>
        </Card>
      </div>
    </div>
  );
}
