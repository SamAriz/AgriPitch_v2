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

export function BuyerSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 20]);
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

  const categories = ['all', 'vegetables', 'fruits', 'dairy & eggs', 'pantry'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Search Products</h1>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">Find fresh produce from verified farmers and sellers</p>
      </div>

      {/* Search and Filter Bar */}
      <Card className="bg-[var(--card)] border-[var(--border-color)]">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                <Input 
                  placeholder="Search for products..." 
                  className="pl-10 border-[var(--border-color)]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button 
                variant="outline" 
                className="border-[var(--border-color)]"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {showFilters && <X className="w-4 h-4 ml-2" />}
              </Button>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[var(--border-color)]">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--text-secondary)]">Category</label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="border-[var(--border-color)]">
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
                  <label className="text-sm font-medium text-[var(--text-secondary)]">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="border-[var(--border-color)]">
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
                  <label className="text-sm font-medium text-[var(--text-secondary)]">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <Slider 
                    min={0}
                    max={20}
                    step={1}
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
        <p className="text-sm text-[var(--text-muted)] mb-4">
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <Card className="bg-[var(--card)] border-[var(--border-color)] hover:shadow-lg transition-all cursor-pointer h-full">
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 right-2 bg-[var(--card)] rounded-full px-2 py-1 flex items-center gap-1 shadow-md">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-medium text-[var(--text-primary)]">{product.rating}</span>
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-bold text-[var(--text-primary)] mb-1">{product.name}</h3>
                      <Badge variant="outline" className="border-[var(--border-color)] text-[var(--text-secondary)] text-xs">
                        {product.category}
                      </Badge>
                    </div>

                    <p className="text-sm text-[var(--text-muted)] line-clamp-2">{product.description}</p>

                    <div className="flex items-center gap-1 text-sm text-[var(--text-muted)]">
                      <MapPin className="w-3 h-3" />
                      <span className="text-xs">{product.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                      <span>{product.sellerName}</span>
                      <span>•</span>
                      <span>{product.reviews} reviews</span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-emerald-100">
                      <div>
                        <span className="text-2xl font-bold text-[var(--text-secondary)]">₱{product.price}</span>
                        <span className="text-sm text-[var(--text-muted)]">/{product.unit}</span>
                      </div>
                      <Button size="sm" className="bg-[var(--primary-green)] hover:bg-[var(--medium-green)]">
                        View Details
                      </Button>
                    </div>

                    <p className="text-xs text-[var(--text-muted)]">
                      {product.quantity} {product.unit} available
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <Card className="bg-[var(--card)] border-[var(--border-color)]">
            <CardContent className="py-12 text-center">
              <Search className="w-16 h-16 text-emerald-300 mx-auto mb-4" />
              <h3 className="font-medium text-[var(--text-primary)] mb-2">No products found</h3>
              <p className="text-[var(--text-muted)]">
                Try adjusting your search or filters
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
