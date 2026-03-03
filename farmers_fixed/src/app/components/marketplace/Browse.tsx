import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { Search, Star, MapPin, Filter, X } from 'lucide-react';
import { mockProducts } from '../../data/mockData';
import { Link } from 'react-router';

export function Browse() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = mockProducts
    .filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           p.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === 'all' || p.category.toLowerCase() === category.toLowerCase();
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice && p.available;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'name': return a.name.localeCompare(b.name);
        default: return 0;
      }
    });

  const categories = ['all', 'rice & grains', 'fruits', 'vegetables', 'poultry & eggs'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-emerald-900">Browse Products</h1>
        <p className="text-emerald-600 mt-1">Discover fresh agricultural products from Filipino farmers</p>
      </div>

      {/* Search and Filter Bar */}
      <Card className="bg-white border-emerald-200">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-emerald-600" />
                <Input 
                  placeholder="Search for rice, vegetables, fruits..." 
                  className="pl-10 border-emerald-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button 
                variant="outline" 
                className="border-emerald-300"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {showFilters && <X className="w-4 h-4 ml-2" />}
              </Button>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-emerald-200">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-emerald-700">Category</label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="border-emerald-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat} className="capitalize">
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-emerald-700">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="border-emerald-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="name">Name A-Z</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-emerald-700">
                    Price Range: ₱{priceRange[0]} - ₱{priceRange[1]}
                  </label>
                  <Slider 
                    min={0}
                    max={300}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mt-2"
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div>
        <p className="text-sm text-emerald-600 mb-4">
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <Card className="bg-white border-emerald-200 hover:shadow-lg transition-all cursor-pointer h-full">
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 flex items-center gap-1 shadow-md">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-medium text-emerald-900">{product.rating}</span>
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-bold text-emerald-900 mb-1">{product.name}</h3>
                      <Badge variant="outline" className="border-emerald-300 text-emerald-700 text-xs">
                        {product.category}
                      </Badge>
                    </div>

                    <p className="text-sm text-emerald-600 line-clamp-2">{product.description}</p>

                    <div className="flex items-center gap-1 text-sm text-emerald-600">
                      <MapPin className="w-3 h-3" />
                      <span className="text-xs">{product.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-emerald-600">
                      <span>{product.sellerName}</span>
                      <span>•</span>
                      <span>{product.reviews} reviews</span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-emerald-100">
                      <div>
                        <span className="text-2xl font-bold text-emerald-700">₱{product.price}</span>
                        <span className="text-sm text-emerald-600">/{product.unit}</span>
                      </div>
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                        View
                      </Button>
                    </div>

                    <p className="text-xs text-emerald-600">
                      {product.quantity} {product.unit} available
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <Card className="bg-white border-emerald-200">
            <CardContent className="py-12 text-center">
              <Search className="w-16 h-16 text-emerald-300 mx-auto mb-4" />
              <h3 className="font-medium text-emerald-900 mb-2">No products found</h3>
              <p className="text-emerald-600">
                Try adjusting your search or filters
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
