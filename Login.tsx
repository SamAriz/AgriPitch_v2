import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Eye, EyeOff, Sprout, Moon, Sun } from 'lucide-react';
import logo from '../../assets/46bb90f371e453e6f102bc4fe02a6b20d555d902.png';

export function Login() {
  const { login, isLoggedIn, isDarkMode, toggleDarkMode } = useApp();
  const navigate = useNavigate();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', phone: '', location: '' });

  if (isLoggedIn) return <Navigate to="/" replace />;

  const ic = "w-full px-4 py-3 rounded-xl bg-[var(--muted-bg)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary-green)] focus:ring-2 transition-all";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value }); setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); setError("");
    if (mode === 'signup') {
      if (!form.name.trim()) return setError('Please enter your full name.');
      if (!form.email.includes('@')) return setError('Please enter a valid email.');
      if (form.password.length < 6) return setError('Password must be at least 6 characters.');
      if (form.password !== form.confirm) return setError('Passwords do not match.');
    } else {
      if (!form.email.trim()) return setError('Please enter your email.');
      if (!form.password.trim()) return setError('Please enter your password.');
    }
    setLoading(true);
    setTimeout(() => {
      login({ id: 'u1', name: mode === 'signup' ? form.name : 'Demo User', email: form.email, role: 'farmowner', location: form.location || 'Philippines', phone: form.phone || '+63 917 123 4567', verified: true, joinDate: new Date().toISOString().split('T')[0], avatar: '' });
      setLoading(false); navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex">
      <div className="hidden lg:flex flex-col justify-between w-[45%] bg-[var(--sidebar-bg)] p-10 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <img src={logo} alt="Philagri" className="w-10 h-10 object-contain rounded-xl" />
            <span className="text-white font-bold text-xl" style={{fontFamily:"Outfit,sans-serif"}}>Philagri</span>
          </div>
          <h1 className="text-4xl font-black text-white leading-tight mb-4" style={{fontFamily:"Outfit,sans-serif"}}>Smart Farming.<br />Digital Future.</h1>
          <p className="text-white/60 text-base max-w-xs">The all-in-one platform for Filipino farmers.</p>
        </div>
        <div className="relative z-10 space-y-3">
          {[{e:"🌾",t:"Farm management"},{e:"🛒",t:"Marketplace"},{e:"📊",t:"Analytics"},{e:"💬",t:"Direct chat"}].map(f=>(
            <div key={f.t} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
              <span className="text-xl">{f.e}</span><span className="text-white/80 text-sm font-medium">{f.t}</span>
            </div>
          ))}
        </div>
        <p className="relative z-10 text-white/30 text-xs">2026 Philagri.</p>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between px-6 lg:px-10 py-5">
          <div className="lg:hidden flex items-center gap-2">
            <img src={logo} alt="Philagri" className="w-8 h-8 object-contain" />
            <span className="font-bold text-[var(--text-primary)]" style={{fontFamily:"Outfit,sans-serif"}}>Philagri</span>
          </div>
          <div className="hidden lg:block" />
          <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-[var(--muted-bg)] text-[var(--text-muted)] transition-colors">
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-8">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h2 className="text-3xl font-black text-[var(--text-primary)] mb-1" style={{fontFamily:"Outfit,sans-serif"}}>
                {mode === "login" ? "Welcome back!" : "Create account"}
              </h2>
              <p className="text-[var(--text-muted)] text-sm">{mode === "login" ? "Sign in to your Philagri account" : "Join thousands of Filipino farmers"}</p>
            </div>

            <div className="flex bg-[var(--muted-bg)] rounded-xl p-1 mb-7">
              {(["login", "signup"] as const).map((m) => (
                <button key={m} onClick={() => { setMode(m); setError(""); setForm({ name:"", email:"", password:"", confirm:"", phone:"", location:"" }); }}
                  className={mode === m ? "flex-1 py-2 rounded-lg text-sm font-semibold bg-[var(--card)] text-[var(--text-primary)] shadow-sm" : "flex-1 py-2 rounded-lg text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--text-secondary)]"}>
                  {m === "login" ? "Sign In" : "Sign Up"}
                </button>
              ))}
            </div>

            {mode === "login" && (
              <div className="bg-[var(--pale-green)] border border-[var(--soft-green)] rounded-xl px-4 py-3 mb-6">
                <p className="text-xs text-[var(--primary-green)] font-medium">Demo: Use any email and password to sign in</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 uppercase tracking-wide">Full Name</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Juan dela Cruz" className={ic} />
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 uppercase tracking-wide">Email Address</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="juan@farmph.com" className={ic} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 uppercase tracking-wide">Password</label>
                <div className="relative">
                  <input name="password" type={showPassword ? "text" : "password"} value={form.password} onChange={handleChange} placeholder="Enter password" className={ic + " pr-11"} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              {mode === "signup" && (
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 uppercase tracking-wide">Confirm Password</label>
                  <div className="relative">
                    <input name="confirm" type={showConfirm ? "text" : "password"} value={form.confirm} onChange={handleChange} placeholder="Confirm password" className={ic + " pr-11"} />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}
              {mode === "signup" && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 uppercase tracking-wide">Phone</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+63 9XX XXX XXXX" className={ic} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 uppercase tracking-wide">Location</label>
                    <input name="location" value={form.location} onChange={handleChange} placeholder="e.g. Batangas" className={ic} />
                  </div>
                </div>
              )}
              {mode === "login" && (
                <div className="flex justify-end">
                  <button type="button" className="text-xs text-[var(--primary-green)] hover:underline font-medium">Forgot password?</button>
                </div>
              )}
              {error && <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-medium px-4 py-3 rounded-xl">{error}</div>}
              <button type="submit" disabled={loading}
                className="w-full bg-[var(--primary-green)] hover:bg-[var(--medium-green)] disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-all text-sm shadow-md mt-2">
                {loading
                  ? <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{mode === "login" ? "Signing in..." : "Creating account..."}</span>
                  : mode === "login" ? "Sign In" : "Create Account"
                }
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-[var(--text-muted)]">
                {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}
                  className="text-[var(--primary-green)] font-semibold hover:underline">
                  {mode === "login" ? "Sign up free" : "Sign in"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
