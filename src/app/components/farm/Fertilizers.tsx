import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Plus, Package, AlertTriangle, TrendingDown } from 'lucide-react';
import { mockFertilizers } from '../../data/mockData';

export function Fertilizers() {
  const lowStockItems = mockFertilizers.filter(f => f.quantity < f.minimumStock);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Fertilizers & Supplies</h1>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">Manage inventory and track stock levels</p>
        </div>
        <Button className="bg-[var(--primary-green)] hover:bg-[var(--medium-green)]">
          <Plus className="w-4 h-4 mr-2" />
          Add Supply
        </Button>
      </div>

      {lowStockItems.length > 0 && (
        <Card className="bg-amber-50 border-amber-300">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-900 mb-1">Low Stock Alert</h4>
                <p className="text-sm text-amber-700">
                  {lowStockItems.length} item{lowStockItems.length > 1 ? 's' : ''} below minimum stock level. Please reorder soon.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[var(--card)] border-[var(--border-color)]">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-[var(--text-primary)]">{mockFertilizers.length}</div>
            <p className="text-sm text-[var(--text-muted)]">Total Items</p>
          </CardContent>
        </Card>
        <Card className="bg-[var(--card)] border-green-200">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-green-700">
              {mockFertilizers.filter(f => f.quantity >= f.minimumStock).length}
            </div>
            <p className="text-sm text-[var(--text-muted)]">Good Stock</p>
          </CardContent>
        </Card>
        <Card className="bg-[var(--card)] border-red-200">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-red-700">{lowStockItems.length}</div>
            <p className="text-sm text-[var(--text-muted)]">Low Stock</p>
          </CardContent>
        </Card>
        <Card className="bg-[var(--card)] border-blue-200">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-blue-700">
              ₱{mockFertilizers.reduce((sum, f) => sum + (f.quantity * f.cost), 0).toLocaleString()}
            </div>
            <p className="text-sm text-[var(--text-muted)]">Total Value</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockFertilizers.map((fertilizer) => {
          const isLowStock = fertilizer.quantity < fertilizer.minimumStock;
          
          return (
            <Card key={fertilizer.id} className={`bg-[var(--card)] ${isLowStock ? 'border-red-300' : 'border-[var(--border-color)]'}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-[var(--text-muted)]" />
                    <div>
                      <CardTitle className="text-lg text-[var(--text-primary)]">{fertilizer.name}</CardTitle>
                      <p className="text-sm text-[var(--text-muted)]">{fertilizer.type}</p>
                    </div>
                  </div>
                  {isLowStock && (
                    <Badge variant="outline" className="border-red-500 text-red-700">
                      <TrendingDown className="w-3 h-3 mr-1" />
                      Low
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-emerald-50 rounded-lg">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-[var(--text-muted)]">Current Stock</p>
                      <p className="text-lg font-bold text-[var(--text-primary)]">
                        {fertilizer.quantity} {fertilizer.unit}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--text-muted)]">Minimum</p>
                      <p className="text-lg font-bold text-[var(--text-primary)]">
                        {fertilizer.minimumStock} {fertilizer.unit}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Cost per {fertilizer.unit}</span>
                    <span className="font-medium text-[var(--text-primary)]">₱{fertilizer.cost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Total Value</span>
                    <span className="font-medium text-[var(--text-primary)]">
                      ₱{(fertilizer.quantity * fertilizer.cost).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Supplier</span>
                    <span className="font-medium text-[var(--text-primary)] text-right">{fertilizer.supplier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Last Purchase</span>
                    <span className="font-medium text-[var(--text-primary)]">{fertilizer.lastPurchase}</span>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className={`w-full ${isLowStock ? 'border-red-300 text-red-600 hover:bg-red-50' : 'border-emerald-300'}`}
                >
                  {isLowStock ? 'Reorder Now' : 'Update Stock'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
