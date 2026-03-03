import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ShoppingBag, Package, Star, TrendingUp, ArrowUpRight, DollarSign } from 'lucide-react';
import { mockProducts, mockOrders } from '../../data/mockData';
import { Link } from 'react-router';

export function MarketplaceDashboard() {
  const myListings = mockProducts.filter(p => p.sellerId === 's1');
  const myPurchases = mockOrders.filter(o => o.buyerId === 'b1');
  const mySales = mockOrders.filter(o => o.sellerId === 's1');
  const totalSpent = myPurchases.reduce((sum, order) => sum + order.totalPrice, 0);
  const totalEarned = mySales.reduce((sum, order) => sum + order.totalPrice, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-emerald-900">Marketplace Dashboard</h1>
        <p className="text-emerald-600 mt-1">Buy and sell agricultural products online</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-emerald-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700">My Listings</CardTitle>
            <Package className="w-4 h-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-900">{myListings.length}</div>
            <p className="text-xs text-emerald-600 mt-1">
              {myListings.filter(p => p.available).length} active
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700">My Purchases</CardTitle>
            <ShoppingBag className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-900">{myPurchases.length}</div>
            <p className="text-xs text-emerald-600 mt-1">
              ₱{totalSpent.toLocaleString()} spent
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-green-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700">Sales Revenue</CardTitle>
            <DollarSign className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-900">₱{totalEarned.toLocaleString()}</div>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {mySales.length} orders
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-amber-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700">Seller Rating</CardTitle>
            <Star className="w-4 h-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-900">4.8</div>
            <p className="text-xs text-emerald-600 mt-1">156 reviews</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/marketplace/browse">
          <Card className="bg-gradient-to-br from-emerald-500 to-green-600 text-white border-0 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <ShoppingBag className="w-8 h-8 mb-3" />
              <h3 className="font-bold text-lg mb-1">Browse Products</h3>
              <p className="text-sm text-emerald-100">Find fresh agricultural products</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/marketplace/my-listings">
          <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white border-0 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Package className="w-8 h-8 mb-3" />
              <h3 className="font-bold text-lg mb-1">My Listings</h3>
              <p className="text-sm text-amber-100">Manage your product listings</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/marketplace/orders">
          <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0 cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <ShoppingBag className="w-8 h-8 mb-3" />
              <h3 className="font-bold text-lg mb-1">Orders</h3>
              <p className="text-sm text-blue-100">Track purchases and sales</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border-emerald-200">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-emerald-900">Recent Purchases</CardTitle>
              <CardDescription>Your latest orders</CardDescription>
            </div>
            <Link to="/marketplace/orders">
              <Button variant="outline" size="sm" className="border-emerald-300">
                View All
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {myPurchases.slice(0, 3).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-emerald-900">{order.productName}</p>
                    <p className="text-sm text-emerald-600">{order.sellerName}</p>
                  </div>
                  <Badge 
                    variant="outline"
                    className={
                      order.status === 'delivered' ? 'bg-green-500 text-white' :
                      order.status === 'shipped' ? 'bg-blue-500 text-white' :
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

        <Card className="bg-white border-emerald-200">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-emerald-900">Recent Sales</CardTitle>
              <CardDescription>Orders from your listings</CardDescription>
            </div>
            <Link to="/marketplace/orders">
              <Button variant="outline" size="sm" className="border-emerald-300">
                View All
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mySales.slice(0, 3).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-emerald-900">{order.productName}</p>
                    <p className="text-sm text-emerald-600">{order.buyerName} • ₱{order.totalPrice.toLocaleString()}</p>
                  </div>
                  <Badge 
                    variant="outline"
                    className={
                      order.status === 'delivered' ? 'bg-green-500 text-white' :
                      order.status === 'shipped' ? 'bg-blue-500 text-white' :
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

      {/* Featured Products */}
      <Card className="bg-white border-emerald-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-emerald-900">Featured Products</CardTitle>
            <CardDescription>Top-rated products available now</CardDescription>
          </div>
          <Link to="/marketplace/browse">
            <Button variant="outline" size="sm" className="border-emerald-300">
              Browse All
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockProducts.slice(0, 4).map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <div className="border border-emerald-200 rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow cursor-pointer">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3">
                    <h4 className="font-medium text-emerald-900 text-sm mb-1">{product.name}</h4>
                    <p className="text-xs text-emerald-600 mb-2">{product.sellerName}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-700">₱{product.price}/{product.unit}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-medium">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
