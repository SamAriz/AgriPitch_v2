import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Eye, EyeOff, Sprout, Lock, Mail, User, Phone, ArrowRight, CheckCircle } from 'lucide-react';
import logo from '../../assets/46bb90f371e453e6f102bc4fe02a6b20d555d902.png';
import { toast } from 'sonner';

// Demo credentials
const DEMO_USERS = [
  { email: 'farmer@philagri.ph', password: 'farm123', name: 'Juan dela Cruz' },
  { email: 'buyer@philagri.ph',  password: 'buy123',  name: 'Maria Santos' },
];

export function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Login form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Sign up form
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const user = DEMO_USERS.find(u => u.email === email && u.password === password);
      if (user) {
        sessionStorage.setItem('philagri-auth', JSON.stringify({ name: user.name, email: user.email }));
        toast.success(`Welcome back, ${user.name}!`);
        navigate('/select-role');
      } else {
        toast.error('Invalid email or password. Try: farmer@philagri.ph / farm123');
      }
      setLoading(false);
    }, 800);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (signupPassword !== confirmPassword) {
      toast.error('Passwords do not match.');
      setLoading(false);
      return;
    }
    if (signupPassword.length < 6) {
      toast.error('Password must be at least 6 characters.');
      setLoading(false);
      return;
    }
    setTimeout(() => {
      sessionStorage.setItem('philagri-auth', JSON.stringify({ name, email: signupEmail }));
      toast.success(`Account created! Welcome, ${name}!`);
      navigate('/select-role');
      setLoading(false);
    }, 900);
  };

  const fillDemo = (type: 'farmer' | 'buyer') => {
    const u = type === 'farmer' ? DEMO_USERS[0] : DEMO_USERS[1];
    setEmail(u.email);
    setPassword(u.password);
  };

  return (
    <div className="min-h-screen flex bg-[var(--background)]">

      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] bg-[var(--sidebar-bg)] p-12 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-[var(--primary-green)] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[var(--amber-deep)] translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <img src={logo} alt="Philagri" className="w-12 h-12 object-contain rounded-xl" />
            <span className="text-white text-xl font-black" style={{fontFamily:'Outfit,sans-serif'}}>Philagri</span>
          </div>

          <h1 className="text-4xl font-black text-white leading-tight mb-4" style={{fontFamily:'Outfit,sans-serif'}}>
            Smart Farming.<br />Digital Future.
          </h1>
          <p className="text-white/60 text-base leading-relaxed max-w-sm">
            The all-in-one platform for Filipino farmers — manage your farm and sell your harvest online.
          </p>
        </div>

        {/* Feature list */}
        <div className="relative z-10 space-y-4">
          {[
            'Farm management dashboard',
            'Online agricultural marketplace',
            'Real-time order tracking',
            'Worker & crop management',
          ].map(f => (
            <div key={f} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[var(--primary-green)]/30 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-3.5 h-3.5 text-[var(--primary-green)]" />
              </div>
              <span className="text-white/70 text-sm">{f}</span>
            </div>
          ))}
        </div>

        <p className="relative z-10 text-white/30 text-xs">
          © 2026 Philagri · Designed for Filipino agriculture
        </p>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <img src={logo} alt="Philagri" className="w-10 h-10 object-contain" />
            <span className="text-[var(--text-primary)] text-xl font-black" style={{fontFamily:'Outfit,sans-serif'}}>Philagri</span>
          </div>

          {/* Tab switcher */}
          <div className="flex bg-[var(--muted-bg)] rounded-2xl p-1 mb-8">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                mode === 'login'
                  ? 'bg-[var(--card)] text-[var(--text-primary)] shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
              }`}>
              Sign In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                mode === 'signup'
                  ? 'bg-[var(--card)] text-[var(--text-primary)] shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
              }`}>
              Create Account
            </button>
          </div>

          {/* ── LOGIN FORM ── */}
          {mode === 'login' && (
            <div className="page-enter">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-[var(--text-primary)]" style={{fontFamily:'Outfit,sans-serif'}}>Welcome back</h2>
                <p className="text-sm text-[var(--text-muted)] mt-1">Sign in to your Philagri account</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--muted-bg)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary-green)] focus:ring-2 focus:ring-[var(--primary-green)]/20 transition-all"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
                      Password
                    </label>
                    <button type="button" className="text-xs text-[var(--primary-green)] hover:underline font-medium">
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      className="w-full pl-10 pr-11 py-3 rounded-xl bg-[var(--muted-bg)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary-green)] focus:ring-2 focus:ring-[var(--primary-green)]/20 transition-all"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)]">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--primary-green)] hover:bg-[var(--medium-green)] text-white font-semibold text-sm transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed mt-2">
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Sign In <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </form>

              {/* Demo credentials */}
              <div className="mt-6 p-4 bg-[var(--pale-green)] rounded-xl border border-[var(--soft-green)]/40">
                <p className="text-xs font-semibold text-[var(--primary-green)] mb-2">🌾 Demo Accounts</p>
                <div className="flex gap-2">
                  <button onClick={() => fillDemo('farmer')}
                    className="flex-1 text-xs py-1.5 px-3 rounded-lg bg-[var(--primary-green)] text-white font-medium hover:bg-[var(--medium-green)] transition-colors">
                    Use Farmer Account
                  </button>
                  <button onClick={() => fillDemo('buyer')}
                    className="flex-1 text-xs py-1.5 px-3 rounded-lg bg-[var(--amber-deep)] text-white font-medium hover:bg-[var(--amber-mid)] transition-colors">
                    Use Buyer Account
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── SIGN UP FORM ── */}
          {mode === 'signup' && (
            <div className="page-enter">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-[var(--text-primary)]" style={{fontFamily:'Outfit,sans-serif'}}>Create account</h2>
                <p className="text-sm text-[var(--text-muted)] mt-1">Join thousands of Filipino farmers online</p>
              </div>

              <form onSubmit={handleSignup} className="space-y-4">
                {/* Full name */}
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Juan dela Cruz"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--muted-bg)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary-green)] focus:ring-2 focus:ring-[var(--primary-green)]/20 transition-all"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-1.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="09XX XXX XXXX"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--muted-bg)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary-green)] focus:ring-2 focus:ring-[var(--primary-green)]/20 transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                    <input
                      type="email"
                      value={signupEmail}
                      onChange={e => setSignupEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--muted-bg)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary-green)] focus:ring-2 focus:ring-[var(--primary-green)]/20 transition-all"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={signupPassword}
                      onChange={e => setSignupPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      required
                      className="w-full pl-10 pr-11 py-3 rounded-xl bg-[var(--muted-bg)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary-green)] focus:ring-2 focus:ring-[var(--primary-green)]/20 transition-all"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)]">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm password */}
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter your password"
                      required
                      className={`w-full pl-10 pr-11 py-3 rounded-xl bg-[var(--muted-bg)] border text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 transition-all ${
                        confirmPassword && confirmPassword !== signupPassword
                          ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                          : 'border-[var(--border-color)] focus:border-[var(--primary-green)] focus:ring-[var(--primary-green)]/20'
                      }`}
                    />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)]">
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {confirmPassword && confirmPassword !== signupPassword && (
                    <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                  )}
                </div>

                <button type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--primary-green)] hover:bg-[var(--medium-green)] text-white font-semibold text-sm transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed mt-2">
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Create Account <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>

                <p className="text-xs text-[var(--text-muted)] text-center leading-relaxed">
                  By signing up, you agree to Philagri's Terms of Service and Privacy Policy.
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
