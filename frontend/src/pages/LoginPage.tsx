import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/status';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login({ email, password });
      navigate(redirectPath);
    } catch (err: any) {
      setError(err.message || 'Invalid credentials. Please verify your email and password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoFill = () => {
    setEmail('testuser@chennaitransit.in');
    setPassword('Password123!');
  };

  return (
    <div className="min-h-[calc(100vh-73px)] bg-[#F9F8F6] flex flex-col lg:flex-row">
      {/* Left Column: Editorial Imagery & Magazine Storytelling */}
      <div className="relative w-full lg:w-1/2 min-h-[320px] lg:min-h-auto flex flex-col justify-between p-8 lg:p-16 overflow-hidden bg-[#1A1A1A] text-white">
        <img
          src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1600&q=85"
          alt="Chennai Metro Architectural Concourse"
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/60 to-transparent" />

        <div className="relative z-10">
          <span className="inline-block text-[10px] tracking-[0.25em] uppercase font-mono font-semibold px-2.5 py-1 bg-white/10 text-white/90 border border-white/20 mb-4">
            Commuter Dossier • Vol. IV
          </span>
          <p className="font-serif italic text-sm text-stone-300">
            "The journey between the historic Central towers and the southern IT corridors is not merely travel—it is the living pulse of Chennai."
          </p>
        </div>

        <div className="relative z-10 mt-12 lg:mt-0">
          <h2 className="font-serif text-3xl lg:text-4xl leading-tight font-normal text-stone-100">
            Aesthetic Navigation for the Modern Coromandel Traveler.
          </h2>
          <div className="mt-4 flex items-center gap-6 text-xs text-stone-300 font-mono">
            <span>CMRL METRO</span>
            <span>•</span>
            <span>MTC BUS RAPID</span>
            <span>•</span>
            <span>SOUTHERN EMU</span>
          </div>
        </div>
      </div>

      {/* Right Column: Clean Editorial Authentication Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md bg-white border border-stone-200 p-8 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
          <div className="mb-8">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C26A4A] font-semibold">
              Member Access
            </span>
            <h1 className="font-serif text-3xl font-medium text-[#1A1A1A] mt-1">
              Sign In to Transit
            </h1>
            <p className="text-sm text-stone-500 mt-2 font-sans">
              Enter your credentials to unlock live bulletins, carbon scorecards, and multi-line journeys.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="login-email" className="block text-xs font-mono uppercase tracking-wider text-stone-600 mb-1.5">
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@chennaitransit.in"
                className="w-full px-4 py-3 bg-[#F9F8F6] border border-stone-200 text-[#1A1A1A] placeholder-stone-400 text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="login-password" className="block text-xs font-mono uppercase tracking-wider text-stone-600">
                  Password
                </label>
                <button
                  type="button"
                  onClick={handleDemoFill}
                  className="text-[11px] font-mono text-[#C26A4A] hover:underline"
                >
                  Use Demo Account
                </button>
              </div>
              <input
                id="login-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 bg-[#F9F8F6] border border-stone-200 text-[#1A1A1A] placeholder-stone-400 text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors"
              />
            </div>

            <button
              id="login-submit-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-[#1A1A1A] hover:bg-[#2E4034] text-white text-sm font-medium transition-colors flex items-center justify-center gap-2 mt-4 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Proceed to Terminal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-2">
            <span>New commuter?</span>
            <Link
              to={`/register?redirect=${encodeURIComponent(redirectPath)}`}
              className="font-medium text-[#1A1A1A] hover:text-[#C26A4A] underline underline-offset-4"
            >
              Register for Transit Pass
            </Link>
          </div>

          <div className="mt-6 p-3 bg-stone-50 border border-stone-100 text-[11px] text-stone-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#2E4034] shrink-0" />
            <span>Protected by JWT session authentication & SHA-256 tokens</span>
          </div>
        </div>
      </div>
    </div>
  );
};
