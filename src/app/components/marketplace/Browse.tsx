import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { Search, Star, MapPin, Filter, X, ShoppingCart } from 'lucide-react';
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Browse Products</h1>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">Fresh agricultural products from Filipino farmers</p>
        </div>
        <span className="text-sm text-[var(--text-muted)] bg-[var(--muted-bg)] px-3 py-1 rounded-full">
          {filteredProducts.length} products found
        </span>
      </div>

      {/* Search & Filter */}
      <div className="bg-[var(--card)] border border-[var(--border-color)] rounded-2xl p-4 space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <Input
              placeholder="Search rice, vegetables, fruits..."
              className="pl-9 bg-[var(--muted-bg)] border-[var(--border-color)] text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-[var(--border-color)] text-[var(--text-secondary)]"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4 mr-1.5" />
            Filters
            {showFilters && <X className="w-3.5 h-3.5 ml-1.5" />}
          </Button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[var(--border-color)]">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="border-[var(--border-color)] bg-[var(--muted-bg)] text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat} className="capitalize">{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="border-[var(--border-color)] bg-[var(--muted-bg)] text-sm">
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
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
                Price Range: ₱{priceRange[0]} – ₱{priceRange[1]}
              </label>
              <Slider min={0} max={300} step={10} value={priceRange} onValueChange={setPriceRange} className="mt-2" />
            </div>
          </div>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <div className="group bg-[var(--card)] border border-[var(--border-color)] rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer h-full flex flex-col">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-44 object-cover"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5 flex items-center gap-1 shadow-sm">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-semibold text-gray-800">{product.rating}</span>
                  </div>
                  <div className="absolute top-2.5 left-2.5">
                    <Badge className="bg-[var(--primary-green)] text-white text-[10px] px-2 py-0.5 rounded-full">
                      {product.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-[var(--text-primary)] mb-1">{product.name}</h3>
                  <p className="text-xs text-[var(--text-muted)] line-clamp-2 mb-3 flex-1">{product.description}</p>

                  <div className="flex items-center gap-1 text-xs text-[var(--text-muted)] mb-1">
                    <MapPin className="w-3 h-3" />
                    {product.location}
                  </div>
                  <div className="text-xs text-[var(--text-muted)] mb-3">
                    {product.sellerName} · {product.reviews} reviews
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[var(--border-color)]">
                    <div>
                      <span className="text-xl font-extrabold text-[var(--primary-green)]">₱{product.price}</span>
                      <span className="text-xs text-[var(--text-muted)]">/{product.unit}</span>
                    </div>
                    <div className="w-8 h-8 rounded-xl bg-[var(--pale-green)] flex items-center justify-center group-hover:bg-[var(--primary-green)] transition-colors">
                      <ShoppingCart className="w-4 h-4 text-[var(--primary-green)] group-hover:text-white" />
                    </div>
                  </div>
                  <p className="text-[10px] text-[var(--text-muted)] mt-1.5">{product.quantity} {product.unit} available</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-[var(--card)] border border-[var(--border-color)] rounded-2xl py-16 text-center">
          <Search className="w-12 h-12 text-[var(--border-color)] mx-auto mb-3" />
          <p className="font-semibold text-[var(--text-primary)]">No products found</p>
          <p className="text-sm text-[var(--text-muted)] mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
