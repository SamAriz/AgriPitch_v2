import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Plus, Edit, Trash2, Star } from 'lucide-react';
import { mockProducts } from '../../data/mockData';
import { toast } from 'sonner';

export function FarmerProducts() {
  const [products, setProducts] = useState(mockProducts.filter(p => p.sellerId === 's1'));
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Product added successfully!');
    setIsAddDialogOpen(false);
  };

  const handleToggleAvailability = (id: string) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, available: !p.available } : p
    ));
    toast.success('Product availability updated!');
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast.success('Product deleted successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">My Products</h1>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">Manage your produce listings</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[var(--primary-green)] hover:bg-[var(--medium-green)]">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>List a new product on the marketplace</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input id="name" placeholder="e.g., Organic Tomatoes" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vegetables">Vegetables</SelectItem>
                      <SelectItem value="fruits">Fruits</SelectItem>
                      <SelectItem value="dairy">Dairy & Eggs</SelectItem>
                      <SelectItem value="pantry">Pantry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₱)</Label>
                  <Input id="price" type="number" step="0.01" placeholder="e.g. 120.00" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input id="quantity" type="number" placeholder="0" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="lbs">lbs</SelectItem>
                      <SelectItem value="dozen">dozen</SelectItem>
                      <SelectItem value="units">units</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe your product..."
                  rows={4}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Product Image URL</Label>
                <Input id="image" type="url" placeholder="https://..." required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="e.g., Batangas, Philippines" required />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-[var(--primary-green)] hover:bg-[var(--medium-green)]">
                  Add Product
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="bg-[var(--card)] border-[var(--border-color)]">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full md:w-48 h-48 object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                />
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-lg text-[var(--text-primary)]">{product.name}</h3>
                      <p className="text-sm text-[var(--text-muted)]">{product.category}</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-medium text-[var(--text-primary)]">{product.rating}</span>
                      <span className="text-[var(--text-muted)]">({product.reviews})</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">{product.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-[var(--text-muted)]">Price</p>
                      <p className="font-bold text-[var(--text-primary)]">₱{product.price}/{product.unit}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--text-muted)]">Available</p>
                      <p className="font-medium text-[var(--text-primary)]">{product.quantity} {product.unit}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-emerald-100">
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`available-${product.id}`} className="text-sm text-[var(--text-secondary)]">
                        {product.available ? 'Active' : 'Inactive'}
                      </Label>
                      <Switch 
                        id={`available-${product.id}`}
                        checked={product.available}
                        onCheckedChange={() => handleToggleAvailability(product.id)}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-[var(--border-color)]">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-red-300 text-red-600 hover:bg-red-50"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {products.length === 0 && (
        <Card className="bg-[var(--card)] border-[var(--border-color)]">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="w-16 h-16 text-emerald-300 mb-4" />
            <h3 className="font-medium text-[var(--text-primary)] mb-2">No products yet</h3>
            <p className="text-[var(--text-muted)] text-center mb-4">
              Start by adding your first product to the marketplace
            </p>
            <Button className="bg-[var(--primary-green)] hover:bg-[var(--medium-green)]" onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
