import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Package, Truck, CheckCircle, MapPin, MessageSquare } from 'lucide-react';
import { mockOrders } from '../../data/mockData';
import { Link } from 'react-router';

export function BuyerOrders() {
  const myOrders = mockOrders.filter(o => o.buyerId === 'b1');

  const getStatusProgress = (status: string) => {
    switch (status) {
      case 'pending': return 25;
      case 'confirmed': return 50;
      case 'shipped': return 75;
      case 'delivered': return 100;
      default: return 0;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'border-amber-500 text-amber-700 bg-amber-50';
      case 'confirmed': return 'border-blue-500 text-blue-700 bg-blue-50';
      case 'shipped': return 'border-purple-500 text-purple-700 bg-purple-50';
      case 'delivered': return 'bg-green-500 text-white';
      default: return '';
    }
  };

  const OrderCard = ({ order }: { order: typeof myOrders[0] }) => (
    <Card className="bg-white border-emerald-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-emerald-900">Order #{order.id}</CardTitle>
            <CardDescription className="mt-1">
              Placed on {order.orderDate}
            </CardDescription>
          </div>
          <Badge variant="outline" className={getStatusColor(order.status)}>
            {order.status === 'pending' && <Package className="w-3 h-3 mr-1" />}
            {order.status === 'confirmed' && <Package className="w-3 h-3 mr-1" />}
            {order.status === 'shipped' && <Truck className="w-3 h-3 mr-1" />}
            {order.status === 'delivered' && <CheckCircle className="w-3 h-3 mr-1" />}
            <span className="capitalize">{order.status}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Order Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-emerald-600">Order Progress</span>
            <span className="font-medium text-emerald-900">{getStatusProgress(order.status)}%</span>
          </div>
          <Progress value={getStatusProgress(order.status)} className="h-2" />
          <div className="flex justify-between text-xs text-emerald-600 mt-2">
            <span className={order.status === 'pending' ? 'font-medium text-emerald-900' : ''}>Pending</span>
            <span className={order.status === 'confirmed' ? 'font-medium text-emerald-900' : ''}>Confirmed</span>
            <span className={order.status === 'shipped' ? 'font-medium text-emerald-900' : ''}>Shipped</span>
            <span className={order.status === 'delivered' ? 'font-medium text-emerald-900' : ''}>Delivered</span>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 bg-emerald-50 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-emerald-900">{order.productName}</h4>
            <span className="font-bold text-emerald-700">${order.totalPrice.toFixed(2)}</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-emerald-600">Seller</p>
              <p className="font-medium text-emerald-900">{order.sellerName}</p>
            </div>
            <div>
              <p className="text-emerald-600">Quantity</p>
              <p className="font-medium text-emerald-900">{order.quantity} units</p>
            </div>
          </div>
        </div>

        {/* Tracking Info */}
        {order.trackingNumber && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-blue-900 mb-1">Package is on the way!</p>
                <p className="text-sm text-blue-700">
                  Tracking: <span className="font-mono">{order.trackingNumber}</span>
                </p>
                {order.deliveryDate && (
                  <p className="text-sm text-blue-700 mt-1">
                    Expected delivery: {order.deliveryDate}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Delivery Info */}
        {order.deliveryDate && order.status === 'delivered' && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-green-900 mb-1">Order Delivered!</p>
                <p className="text-sm text-green-700">
                  Delivered on {order.deliveryDate}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Link to="/messages" className="flex-1">
            <Button variant="outline" className="w-full border-emerald-300">
              <MessageSquare className="w-4 h-4 mr-2" />
              Contact Seller
            </Button>
          </Link>
          {order.status === 'delivered' && (
            <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">
              Leave Review
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const filterOrders = (status?: string) => {
    if (!status) return myOrders;
    return myOrders.filter(o => o.status === status);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-emerald-900">My Orders</h1>
        <p className="text-emerald-600 mt-1">Track and manage your purchases</p>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-white border-emerald-200">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-emerald-900">{myOrders.length}</div>
            <p className="text-sm text-emerald-600 mt-1">Total Orders</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-blue-200">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-blue-700">
              {filterOrders('shipped').length}
            </div>
            <p className="text-sm text-emerald-600 mt-1">In Transit</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-amber-200">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-amber-700">
              {filterOrders('pending').length + filterOrders('confirmed').length}
            </div>
            <p className="text-sm text-emerald-600 mt-1">Processing</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-green-200">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-green-700">
              {filterOrders('delivered').length}
            </div>
            <p className="text-sm text-emerald-600 mt-1">Delivered</p>
          </CardContent>
        </Card>
      </div>

      {/* Orders List */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="bg-white border border-emerald-200">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {myOrders.map(order => <OrderCard key={order.id} order={order} />)}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {myOrders.filter(o => o.status !== 'delivered').map(order => 
            <OrderCard key={order.id} order={order} />
          )}
          {myOrders.filter(o => o.status !== 'delivered').length === 0 && (
            <Card className="bg-white border-emerald-200">
              <CardContent className="py-12 text-center">
                <Package className="w-12 h-12 text-emerald-300 mx-auto mb-2" />
                <p className="text-emerald-600">No active orders</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="delivered" className="space-y-4">
          {filterOrders('delivered').map(order => <OrderCard key={order.id} order={order} />)}
          {filterOrders('delivered').length === 0 && (
            <Card className="bg-white border-emerald-200">
              <CardContent className="py-12 text-center">
                <CheckCircle className="w-12 h-12 text-emerald-300 mx-auto mb-2" />
                <p className="text-emerald-600">No delivered orders yet</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
