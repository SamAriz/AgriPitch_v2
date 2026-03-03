import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { BuyerOrders } from '../buyer/BuyerOrders';
import { FarmerOrders } from '../farmer/FarmerOrders';

export function Orders() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">My Orders</h1>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">Manage your purchases and sales</p>
      </div>

      <Tabs defaultValue="purchases" className="space-y-5">
        <TabsList className="bg-[var(--muted-bg)] border border-[var(--border-color)] rounded-xl p-1 h-auto">
          <TabsTrigger value="purchases" className="rounded-lg text-sm font-medium data-[state=active]:bg-[var(--card)] data-[state=active]:shadow-sm">
            My Purchases
          </TabsTrigger>
          <TabsTrigger value="sales" className="rounded-lg text-sm font-medium data-[state=active]:bg-[var(--card)] data-[state=active]:shadow-sm">
            My Sales
          </TabsTrigger>
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
