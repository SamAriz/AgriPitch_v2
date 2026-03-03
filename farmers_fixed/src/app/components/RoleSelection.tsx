import { useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tractor, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import logo from '../../assets/46bb90f371e453e6f102bc4fe02a6b20d555d902.png';

export function RoleSelection() {
  const navigate = useNavigate();
  const { setUserRole } = useApp();

  const handleRoleSelect = (role: 'farmowner' | 'marketplace') => {
    setUserRole(role);
    navigate(`/${role === 'farmowner' ? 'farm' : 'marketplace'}/dashboard`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <img 
            src={logo} 
            alt="Philagri Logo" 
            className="w-[120px] h-[120px] object-contain"
          />
        </div>
        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-2">Philagri</h1>
        <p className="text-lg text-[var(--text-secondary)]">Smart Farming. Digital Future.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        <Card className="border-2 border-[var(--border-color)] hover:border-[var(--primary-green)] transition-all cursor-pointer hover:shadow-xl bg-card">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-[var(--pale-green)] rounded-full flex items-center justify-center mx-auto mb-4">
              <Tractor className="w-10 h-10 text-[var(--primary-green)]" />
            </div>
            <CardTitle className="text-2xl text-[var(--text-primary)]">Farm Owner</CardTitle>
            <CardDescription className="text-base text-[var(--text-secondary)]">
              Manage your farm operations, workers, crops, and resources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-[var(--text-secondary)] mb-6">
              <li className="flex items-start gap-2">
                <span className="text-[var(--primary-green)] mt-0.5">✓</span>
                <span>Track and manage farm workers and their tasks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--primary-green)] mt-0.5">✓</span>
                <span>Monitor crop planting, growth, and harvest schedules</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--primary-green)] mt-0.5">✓</span>
                <span>Keep track of machinery and equipment maintenance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--primary-green)] mt-0.5">✓</span>
                <span>Manage fertilizers, seeds, and farm supplies inventory</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--primary-green)] mt-0.5">✓</span>
                <span>Assign and track daily farm tasks and activities</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--primary-green)] mt-0.5">✓</span>
                <span>View farm analytics and performance reports</span>
              </li>
            </ul>
            <Button 
              className="w-full bg-[var(--primary-green)] hover:bg-[var(--medium-green)] text-white text-lg py-6"
              onClick={() => handleRoleSelect('farmowner')}
            >
              Enter Farm Management
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2 border-[var(--border-color)] hover:border-[var(--amber-deep)] transition-all cursor-pointer hover:shadow-xl bg-card">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-[var(--amber-pale)] rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-10 h-10 text-[var(--amber-deep)]" />
            </div>
            <CardTitle className="text-2xl text-[var(--text-primary)]">Marketplace</CardTitle>
            <CardDescription className="text-base text-[var(--text-secondary)]">
              Buy and sell agricultural products online - like Shopee for farms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-[var(--text-secondary)] mb-6">
              <li className="flex items-start gap-2">
                <span className="text-[var(--amber-deep)] mt-0.5">✓</span>
                <span>Browse and buy fresh farm products from verified sellers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--amber-deep)] mt-0.5">✓</span>
                <span>List and sell your own farm products to customers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--amber-deep)] mt-0.5">✓</span>
                <span>Track orders and deliveries in real-time</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--amber-deep)] mt-0.5">✓</span>
                <span>Chat with buyers and sellers directly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--amber-deep)] mt-0.5">✓</span>
                <span>Read and write reviews for products and sellers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--amber-deep)] mt-0.5">✓</span>
                <span>Manage both buying and selling in one account</span>
              </li>
            </ul>
            <Button 
              className="w-full bg-[var(--amber-deep)] hover:bg-[var(--amber-mid)] text-white text-lg py-6"
              onClick={() => handleRoleSelect('marketplace')}
            >
              Enter Marketplace
            </Button>
          </CardContent>
        </Card>
      </div>

      <p className="text-sm text-[var(--text-secondary)] mt-8 text-center max-w-2xl">
        <strong>Farm Owners</strong> can manage their complete farm operations. <strong>Marketplace Users</strong> can both buy fresh agricultural products and sell their own harvest - all in one platform designed for Filipino farmers and agricultural businesses.
      </p>
    </div>
  );
}