import { useNavigate } from 'react-router';
import { Button } from './ui/button';
import { Tractor, ShoppingBag, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import logo from '../../assets/46bb90f371e453e6f102bc4fe02a6b20d555d902.png';

export function RoleSelection() {
  const navigate = useNavigate();
  const { setUserRole } = useApp();

  const handleRoleSelect = (role: 'farmowner' | 'marketplace') => {
    setUserRole(role);
    navigate(`/${role === 'farmowner' ? 'farm' : 'marketplace'}/dashboard`);
  };

  const farmFeatures = [
    'Track and manage farm workers & tasks',
    'Monitor crop planting, growth & harvest',
    'Track machinery and equipment maintenance',
    'Manage fertilizers & supplies inventory',
    'View farm analytics & performance reports',
  ];

  const marketFeatures = [
    'Browse & buy fresh farm products',
    'List and sell your own harvest',
    'Track orders & deliveries in real-time',
    'Chat with buyers and sellers directly',
    'Manage both buying and selling in one place',
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center p-6">
      {/* Hero */}
      <div className="text-center mb-12 page-enter">
        <img src={logo} alt="Philagri" className="w-24 h-24 object-contain mx-auto mb-5 drop-shadow-md" />
        <h1 className="text-5xl font-black text-[var(--text-primary)] mb-2 tracking-tight" style={{fontFamily:'Outfit,sans-serif'}}>
          Philagri
        </h1>
        <p className="text-[var(--text-muted)] text-base font-medium">Smart Farming. Digital Future.</p>
        <div className="mt-4 w-12 h-1 bg-[var(--primary-green)] rounded-full mx-auto" />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl w-full page-enter-delay-1">

        {/* Farm Owner */}
        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border-color)] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer group"
          onClick={() => handleRoleSelect('farmowner')}>
          <div className="bg-[var(--sidebar-bg)] px-6 py-7 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[var(--primary-green)] flex items-center justify-center shadow-lg">
              <Tractor className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white" style={{fontFamily:'Outfit,sans-serif'}}>Farm Owner</h2>
              <p className="text-sm text-white/60">Manage your entire farm</p>
            </div>
          </div>
          <div className="px-6 py-5">
            <ul className="space-y-2.5 mb-6">
              {farmFeatures.map(f => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                  <CheckCircle className="w-4 h-4 text-[var(--primary-green)] mt-0.5 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <button
              className="w-full bg-[var(--primary-green)] hover:bg-[var(--medium-green)] text-white font-semibold py-3 rounded-xl transition-colors text-sm"
              onClick={() => handleRoleSelect('farmowner')}>
              Enter Farm Management →
            </button>
          </div>
        </div>

        {/* Marketplace */}
        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border-color)] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer"
          onClick={() => handleRoleSelect('marketplace')}>
          <div className="bg-gradient-to-br from-[var(--amber-deep)] to-amber-600 px-6 py-7 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shadow-lg">
              <ShoppingBag className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white" style={{fontFamily:'Outfit,sans-serif'}}>Marketplace</h2>
              <p className="text-sm text-white/70">Buy & sell agri products</p>
            </div>
          </div>
          <div className="px-6 py-5">
            <ul className="space-y-2.5 mb-6">
              {marketFeatures.map(f => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                  <CheckCircle className="w-4 h-4 text-[var(--amber-deep)] mt-0.5 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <button
              className="w-full bg-[var(--amber-deep)] hover:bg-[var(--amber-mid)] text-white font-semibold py-3 rounded-xl transition-colors text-sm"
              onClick={() => handleRoleSelect('marketplace')}>
              Enter Marketplace →
            </button>
          </div>
        </div>
      </div>

      <p className="mt-8 text-xs text-[var(--text-muted)] text-center page-enter-delay-2">
        Designed for Filipino farmers and agricultural businesses.
      </p>
    </div>
  );
}
