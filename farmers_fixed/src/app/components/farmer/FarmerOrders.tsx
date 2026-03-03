import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';
import { mockOrders } from '../../data/mockData';
import { toast } from 'sonner';

export function FarmerOrders() {
  const [orders, setOrders] = useState(mockOrders.filter(o => o.sellerId === 's1'));

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(o => 
      o.id === orderId ? { ...o, status: newStatus as any } : o
    ));
    toast.success(`Order ${orderId} updated to ${newStatus}`);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'confirmed': return <Package className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'border-amber-500 text-amber-700 bg-amber-50';
      case 'confirmed': return 'border-blue-500 text-blue-700 bg-blue-50';
      case 'shipped': return 'border-purple-500 text-purple-700 bg-purple-50';
      case 'delivered': return 'bg-green-500 text-white';
      case 'cancelled': return 'border-red-500 text-red-700 bg-red-50';
      default: return '';
    }
  };

  const filterOrders = (status?: string) => {
    if (!status) return orders;
    return orders.filter(o => o.status === status);
  };

  const OrderCard = ({ order }: { order: typeof orders[0] }) => (
    <Card className="bg-white border-emerald-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-emerald-900">Order #{order.id}</CardTitle>
            <CardDescription className="mt-1">
              {order.buyerName} • {order.orderDate}
            </CardDescription>
          </div>
          <Badge variant="outline" className={getStatusColor(order.status)}>
            {getStatusIcon(order.status)}
            <span className="ml-1 capitalize">{order.status}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 p-4 bg-emerald-50 rounded-lg">
          <div>
            <p className="text-sm text-emerald-600">Product</p>
            <p className="font-medium text-emerald-900">{order.productName}</p>
          </div>
          <div>
            <p className="text-sm text-emerald-600">Quantity</p>
            <p className="font-medium text-emerald-900">{order.quantity} units</p>
          </div>
          <div>
            <p className="text-sm text-emerald-600">Total Price</p>
            <p className="font-bold text-emerald-900">${order.totalPrice.toFixed(2)}</p>
          </div>
          {order.deliveryDate && (
            <div>
              <p className="text-sm text-emerald-600">Delivery Date</p>
              <p className="font-medium text-emerald-900">{order.deliveryDate}</p>
            </div>
          )}
        </div>

        {order.trackingNumber && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">
              <span className="font-medium">Tracking Number:</span> {order.trackingNumber}
            </p>
          </div>
        )}

        <div className="flex gap-2">
          {order.status === 'pending' && (
            <>
              <Button 
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                onClick={() => handleUpdateStatus(order.id, 'confirmed')}
              >
                Confirm Order
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                onClick={() => handleUpdateStatus(order.id, 'cancelled')}
              >
                Cancel
              </Button>
            </>
          )}
          {order.status === 'confirmed' && (
            <Button 
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              onClick={() => handleUpdateStatus(order.id, 'shipped')}
            >
              <Truck className="w-4 h-4 mr-2" />
              Mark as Shipped
            </Button>
          )}
          {order.status === 'shipped' && (
            <Button 
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              onClick={() => handleUpdateStatus(order.id, 'delivered')}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark as Delivered
            </Button>
          )}
          {order.status === 'delivered' && (
            <Badge variant="outline" className="w-full justify-center py-2 bg-green-50 border-green-500 text-green-700">
              <CheckCircle className="w-4 h-4 mr-2" />
              Order Completed
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-emerald-900">Order Management</h1>
        <p className="text-emerald-600 mt-1">Track and manage your orders</p>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="bg-white border-emerald-200">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-emerald-900">{orders.length}</div>
            <p className="text-sm text-emerald-600 mt-1">Total Orders</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-amber-200">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-amber-700">{filterOrders('pending').length}</div>
            <p className="text-sm text-emerald-600 mt-1">Pending</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-blue-200">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-blue-700">{filterOrders('confirmed').length}</div>
            <p className="text-sm text-emerald-600 mt-1">Confirmed</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-purple-200">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-purple-700">{filterOrders('shipped').length}</div>
            <p className="text-sm text-emerald-600 mt-1">Shipped</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-green-200">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-green-700">{filterOrders('delivered').length}</div>
            <p className="text-sm text-emerald-600 mt-1">Delivered</p>
          </CardContent>
        </Card>
      </div>

      {/* Orders Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="bg-white border border-emerald-200">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {orders.map(order => <OrderCard key={order.id} order={order} />)}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {filterOrders('pending').map(order => <OrderCard key={order.id} order={order} />)}
          {filterOrders('pending').length === 0 && (
            <Card className="bg-white border-emerald-200">
              <CardContent className="py-12 text-center">
                <Clock className="w-12 h-12 text-emerald-300 mx-auto mb-2" />
                <p className="text-emerald-600">No pending orders</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {[...filterOrders('confirmed'), ...filterOrders('shipped')].map(order => 
            <OrderCard key={order.id} order={order} />
          )}
          {[...filterOrders('confirmed'), ...filterOrders('shipped')].length === 0 && (
            <Card className="bg-white border-emerald-200">
              <CardContent className="py-12 text-center">
                <Package className="w-12 h-12 text-emerald-300 mx-auto mb-2" />
                <p className="text-emerald-600">No active orders</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {filterOrders('delivered').map(order => <OrderCard key={order.id} order={order} />)}
          {filterOrders('delivered').length === 0 && (
            <Card className="bg-white border-emerald-200">
              <CardContent className="py-12 text-center">
                <CheckCircle className="w-12 h-12 text-emerald-300 mx-auto mb-2" />
                <p className="text-emerald-600">No completed orders</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
