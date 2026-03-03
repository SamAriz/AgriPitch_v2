import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';
import { Star, MapPin, Package, Truck, Shield, MessageSquare, ShoppingCart, ChevronLeft, User } from 'lucide-react';
import { mockProducts, mockReviews } from '../data/mockData';
import { toast } from 'sonner';

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const product = mockProducts.find(p => p.id === id);
  const productReviews = mockReviews.filter(r => r.productId === id);

  if (!product) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 text-emerald-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Product not found</h2>
        <Link to="/buyer/search">
          <Button className="bg-[var(--primary-green)] hover:bg-[var(--medium-green)] mt-4">
            Browse Products
          </Button>
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    toast.success(`Order placed for ${quantity} ${product.unit} of ${product.name}!`);
    setTimeout(() => navigate('/buyer/orders'), 1500);
  };

  const handleContactSeller = () => {
    navigate('/messages');
  };

  const totalPrice = product.price * quantity;

  return (
    <div className="space-y-6">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Images & Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-[var(--card)] border-[var(--border-color)]">
            <CardContent className="p-0">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-96 object-cover rounded-t-lg"
              />
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">{product.name}</h1>
                    <Badge variant="outline" className="border-[var(--border-color)] text-[var(--text-secondary)]">
                      {product.category}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                      <span className="text-2xl font-bold text-[var(--text-primary)]">{product.rating}</span>
                    </div>
                    <p className="text-sm text-[var(--text-muted)]">({product.reviews} reviews)</p>
                  </div>
                </div>

                <Separator className="my-6" />

                <div>
                  <h3 className="font-medium text-[var(--text-primary)] mb-2">Description</h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed">{product.description}</p>
                </div>

                <Separator className="my-6" />

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-emerald-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Package className="w-4 h-4 text-[var(--text-muted)]" />
                      <span className="text-sm text-[var(--text-muted)]">Available</span>
                    </div>
                    <p className="font-medium text-[var(--text-primary)]">{product.quantity} {product.unit}</p>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-4 h-4 text-[var(--text-muted)]" />
                      <span className="text-sm text-[var(--text-muted)]">Location</span>
                    </div>
                    <p className="font-medium text-[var(--text-primary)]">{product.location}</p>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Truck className="w-4 h-4 text-[var(--text-muted)]" />
                      <span className="text-sm text-[var(--text-muted)]">Delivery</span>
                    </div>
                    <p className="font-medium text-[var(--text-primary)]">2-5 days</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seller Info */}
          <Card className="bg-[var(--card)] border-[var(--border-color)]">
            <CardHeader>
              <CardTitle className="text-[var(--text-primary)]">Seller Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-emerald-200 text-[var(--text-primary)]">
                      {product.sellerName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-[var(--text-primary)]">{product.sellerName}</h4>
                    <div className="flex items-center gap-1 text-sm text-[var(--text-muted)]">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>4.9 seller rating</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="border-[var(--border-color)]" onClick={handleContactSeller}>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  <Link to="/profile">
                    <Button variant="outline" className="border-[var(--border-color)]">
                      <User className="w-4 h-4 mr-2" />
                      View Profile
                    </Button>
                  </Link>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-[var(--text-primary)]">245</p>
                  <p className="text-sm text-[var(--text-muted)]">Products</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[var(--text-primary)]">98%</p>
                  <p className="text-sm text-[var(--text-muted)]">Positive</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[var(--text-primary)]">1.2k</p>
                  <p className="text-sm text-[var(--text-muted)]">Sales</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card className="bg-[var(--card)] border-[var(--border-color)]">
            <CardHeader>
              <CardTitle className="text-[var(--text-primary)]">Customer Reviews</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {productReviews.length > 0 ? (
                productReviews.map((review) => (
                  <div key={review.id} className="p-4 bg-emerald-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-emerald-200 text-[var(--text-primary)] text-xs">
                            {review.buyerName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-[var(--text-primary)]">{review.buyerName}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-[var(--text-secondary)] text-sm">{review.comment}</p>
                    <p className="text-xs text-[var(--text-muted)] mt-2">{review.date}</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-[var(--text-muted)] py-4">No reviews yet</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Order Card */}
        <div className="lg:col-span-1">
          <Card className="bg-[var(--card)] border-[var(--border-color)] sticky top-24">
            <CardContent className="pt-6">
              <div className="text-center mb-6">
                <p className="text-2xl font-bold text-[var(--text-primary)] mb-1">
                  ₱{product.price}
                  <span className="text-lg font-normal text-[var(--text-muted)]">/{product.unit}</span>
                </p>
                <Badge variant="outline" className="border-green-300 text-green-700">
                  <Shield className="w-3 h-3 mr-1" />
                  In Stock
                </Badge>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-[var(--text-secondary)] mb-2 block">
                    Quantity ({product.unit})
                  </label>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="border-[var(--border-color)]"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </Button>
                    <Input 
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="text-center border-[var(--border-color)]"
                      min="1"
                      max={product.quantity}
                    />
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="border-[var(--border-color)]"
                      onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                    >
                      +
                    </Button>
                  </div>
                  <p className="text-xs text-sm text-[var(--text-muted)] mt-0.5">
                    Max: {product.quantity} {product.unit} available
                  </p>
                </div>

                <div className="p-4 bg-emerald-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[var(--text-secondary)]">Subtotal</span>
                    <span className="font-medium text-[var(--text-primary)]">₱{(product.price * quantity).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[var(--text-secondary)]">Shipping</span>
                    <span className="font-medium text-[var(--text-primary)]">₱5.00</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[var(--text-primary)]">Total</span>
                    <span className="text-xl font-bold text-[var(--text-primary)]">
                      ₱{(totalPrice + 5).toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-[var(--primary-green)] hover:bg-[var(--medium-green)]"
                  onClick={handlePlaceOrder}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Place Order
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full border-[var(--border-color)]"
                  onClick={handleContactSeller}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contact Seller
                </Button>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-[var(--text-muted)] mt-0.5" />
                  <span className="text-[var(--text-secondary)]">Secure payment processing</span>
                </div>
                <div className="flex items-start gap-2">
                  <Truck className="w-4 h-4 text-[var(--text-muted)] mt-0.5" />
                  <span className="text-[var(--text-secondary)]">Fast & reliable delivery</span>
                </div>
                <div className="flex items-start gap-2">
                  <Package className="w-4 h-4 text-[var(--text-muted)] mt-0.5" />
                  <span className="text-[var(--text-secondary)]">Quality guaranteed</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
