import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ShoppingBag, Package, Star, TrendingUp, ArrowUpRight, ShoppingCart, Plus } from 'lucide-react';
import { mockProducts, mockOrders } from '../../data/mockData';
import { Link } from 'react-router';

const orderStatusClass: Record<string, string> = {
  pending: 'badge-warning', confirmed: 'badge-neutral', shipped: 'badge-neutral',
  delivered: 'badge-success', cancelled: 'badge-danger',
};

export function MarketplaceDashboard() {
  const myListings  = mockProducts.filter(p => p.sellerId === 's1');
  const myPurchases = mockOrders.filter(o => o.buyerId === 'b1');
  const mySales     = mockOrders.filter(o => o.sellerId === 's1');
  const totalSpent  = myPurchases.reduce((s, o) => s + o.totalPrice, 0);
  const totalEarned = mySales.reduce((s, o) => s + o.totalPrice, 0);

  const stats = [
    { label: 'My Listings',    value: myListings.length,              sub: `${myListings.filter(p=>p.available).length} active`,   icon: Package,    accent: 'stat-card-green' },
    { label: 'My Purchases',   value: myPurchases.length,             sub: `₱${totalSpent.toLocaleString()} total spent`,          icon: ShoppingBag,accent: 'stat-card-sky' },
    { label: 'Sales Revenue',  value: `₱${totalEarned.toLocaleString()}`, sub: `${mySales.length} completed orders`,               icon: TrendingUp,  accent: 'stat-card-amber' },
    { label: 'Seller Rating',  value: '4.8 ★',                        sub: '156 customer reviews',                                 icon: Star,        accent: 'stat-card-violet' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 page-enter">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Marketplace</h1>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">Buy and sell agricultural products online</p>
        </div>
        <Link to="/marketplace/my-listings"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--primary-green)] text-white text-sm font-semibold hover:bg-[var(--medium-green)] transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Add Listing
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 page-enter-delay-1">
        {stats.map(s => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className={`${s.accent}`}>
              <CardContent className="pt-5 pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 rounded-lg bg-[var(--pale-green)]">
                    <Icon className="w-4 h-4 text-[var(--primary-green)]" />
                  </div>
                </div>
                <div className="text-2xl font-black text-[var(--text-primary)]" style={{fontFamily:'Outfit,sans-serif'}}>{s.value}</div>
                <p className="text-xs font-semibold text-[var(--text-secondary)] mt-0.5">{s.label}</p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{s.sub}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick action banners */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 page-enter-delay-2">
        {[
          { to: '/marketplace/browse',      bg: 'from-[var(--primary-green)] to-[var(--medium-green)]', icon: ShoppingCart, title: 'Browse Products', sub: 'Find fresh crops & farm goods', cta: 'Shop Now' },
          { to: '/marketplace/my-listings', bg: 'from-[var(--amber-deep)] to-[var(--amber-mid)]',       icon: Package,      title: 'My Listings',     sub: 'Manage your product listings',   cta: 'Manage' },
          { to: '/marketplace/orders',      bg: '',                                                      icon: ShoppingBag,  title: 'My Orders',       sub: 'Track purchases and sales',       cta: 'View Orders', outline: true },
        ].map(a => {
          const Icon = a.icon;
          return (
            <Link key={a.to} to={a.to} className="block">
              <div className={`rounded-2xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer h-full
                ${a.outline
                  ? 'bg-[var(--card)] border border-[var(--border-color)]'
                  : `bg-gradient-to-br ${a.bg} text-white`
                }`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${a.outline ? 'bg-[var(--pale-green)]' : 'bg-white/20'}`}>
                  <Icon className={`w-5 h-5 ${a.outline ? 'text-[var(--primary-green)]' : ''}`} />
                </div>
                <h3 className={`font-bold text-base mb-1 ${a.outline ? 'text-[var(--text-primary)]' : ''}`} style={{fontFamily:'Outfit,sans-serif'}}>{a.title}</h3>
                <p className={`text-xs mb-3 ${a.outline ? 'text-[var(--text-muted)]' : 'opacity-75'}`}>{a.sub}</p>
                <div className={`flex items-center gap-1 text-xs font-semibold ${a.outline ? 'text-[var(--primary-green)]' : 'opacity-90'}`}>
                  {a.cta} <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 page-enter-delay-3">
        {/* Recent Purchases */}
        <Card>
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base">Recent Purchases</CardTitle>
            <Link to="/marketplace/orders" className="text-xs text-[var(--primary-green)] font-semibold hover:underline flex items-center gap-1">
              View all <ArrowUpRight className="w-3 h-3" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-1">
            {myPurchases.slice(0, 4).map(order => (
              <div key={order.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--muted-bg)] transition-colors">
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{order.productName}</p>
                  <p className="text-xs text-[var(--text-muted)]">{order.sellerName} · {order.orderDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[var(--primary-green)]">₱{order.totalPrice.toFixed(2)}</p>
                  <span className={orderStatusClass[order.status]}>{order.status}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* My Listings preview */}
        <Card>
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base">My Listings</CardTitle>
            <Link to="/marketplace/my-listings" className="text-xs text-[var(--primary-green)] font-semibold hover:underline flex items-center gap-1">
              View all <ArrowUpRight className="w-3 h-3" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-1">
            {myListings.slice(0, 4).map(product => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--muted-bg)] transition-colors">
                  <img src={product.image} alt={product.name} className="w-11 h-11 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{product.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{product.quantity} {product.unit} available</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-[var(--primary-green)]">₱{product.price}</p>
                    <span className={product.available ? 'badge-success' : 'badge-neutral'}>
                      {product.available ? 'Active' : 'Off'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
