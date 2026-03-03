import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Plus, Edit, Trash2, Star, Eye, Upload } from 'lucide-react';
import { mockProducts } from '../../data/mockData';
import { toast } from 'sonner';

export function SellerProducts() {
  const [products, setProducts] = useState(mockProducts.filter(p => p.sellerId === 's2'));
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
          <h1 className="text-3xl font-bold text-emerald-900">Products</h1>
          <p className="text-emerald-600 mt-1">Manage your product listings</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              Add New Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>Create a new product listing</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input id="name" placeholder="e.g., Organic Strawberries" required />
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
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe your product in detail..."
                  rows={4}
                  required
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" type="number" step="0.01" placeholder="0.00" required />
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
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="e.g., Oregon, USA" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Product Photo</Label>
                <div className="border-2 border-dashed border-emerald-300 rounded-lg p-8 text-center hover:border-emerald-500 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <p className="text-sm text-emerald-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-emerald-500 mt-1">PNG, JPG up to 5MB</p>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                  Add Product
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Products Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white border-emerald-200">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-emerald-900">{products.length}</div>
            <p className="text-sm text-emerald-600 mt-1">Total Products</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-green-200">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-700">{products.filter(p => p.available).length}</div>
            <p className="text-sm text-emerald-600 mt-1">Active</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-amber-200">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-amber-700">{products.filter(p => !p.available).length}</div>
            <p className="text-sm text-emerald-600 mt-1">Inactive</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-blue-200">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-700">
              {(products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1)}
            </div>
            <p className="text-sm text-emerald-600 mt-1">Avg. Rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="bg-white border-emerald-200 hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="relative w-full md:w-48 h-48">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                  />
                  <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 flex items-center gap-1 shadow-md">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-medium">{product.rating}</span>
                  </div>
                </div>
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-emerald-900 mb-1">{product.name}</h3>
                      <Badge variant="outline" className="border-emerald-300 text-emerald-700 text-xs">
                        {product.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-sm text-emerald-700 mb-4 line-clamp-2">{product.description}</p>
                  
                  <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-emerald-50 rounded-lg">
                    <div>
                      <p className="text-xs text-emerald-600">Price</p>
                      <p className="font-bold text-emerald-900">${product.price}/{product.unit}</p>
                    </div>
                    <div>
                      <p className="text-xs text-emerald-600">Stock</p>
                      <p className="font-medium text-emerald-900">{product.quantity} {product.unit}</p>
                    </div>
                    <div>
                      <p className="text-xs text-emerald-600">Reviews</p>
                      <p className="font-medium text-emerald-900">{product.reviews}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-emerald-100">
                    <div className="flex items-center gap-2">
                      <Switch 
                        id={`available-${product.id}`}
                        checked={product.available}
                        onCheckedChange={() => handleToggleAvailability(product.id)}
                      />
                      <Label htmlFor={`available-${product.id}`} className="text-sm text-emerald-700">
                        {product.available ? 'Active' : 'Inactive'}
                      </Label>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-blue-300 text-blue-600">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-emerald-300">
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
        <Card className="bg-white border-emerald-200">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Upload className="w-16 h-16 text-emerald-300 mb-4" />
            <h3 className="font-medium text-emerald-900 mb-2">No products yet</h3>
            <p className="text-emerald-600 text-center mb-6">
              Start by adding your first product to the marketplace
            </p>
            <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
