import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { BuyerOrders } from '../buyer/BuyerOrders';
import { FarmerOrders } from '../farmer/FarmerOrders';

export function Orders() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-emerald-900">My Orders</h1>
        <p className="text-emerald-600 mt-1">Manage both purchases and sales</p>
      </div>

      <Tabs defaultValue="purchases" className="space-y-6">
        <TabsList className="bg-white border border-emerald-200">
          <TabsTrigger value="purchases">My Purchases</TabsTrigger>
          <TabsTrigger value="sales">My Sales</TabsTrigger>
        </TabsList>

        <TabsContent value="purchases">
          <BuyerOrders />
        </TabsContent>

        <TabsContent value="sales">
          <FarmerOrders />
        </TabsContent>
      </Tabs>
    </div>
  );
}
