import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/status';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError('Password must be at least 6 characters in length.');
      return;
    }

    setIsSubmitting(true);

    try {
      await register({ name, email, password });
      navigate(redirectPath);
    } catch (err: any) {
      setError(err.message || 'Registration failed. That email might already be registered.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-73px)] bg-[#F9F8F6] flex flex-col lg:flex-row">
      {/* Left Column: Editorial Imagery & Magazine Storytelling */}
      <div className="relative w-full lg:w-1/2 min-h-[320px] lg:min-h-auto flex flex-col justify-between p-8 lg:p-16 overflow-hidden bg-[#1A1A1A] text-white">
        <img
          src="https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1600&q=85"
          alt="Southern Railway Station tracks in Chennai"
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/60 to-transparent" />

        <div className="relative z-10">
          <span className="inline-block text-[10px] tracking-[0.25em] uppercase font-mono font-semibold px-2.5 py-1 bg-white/10 text-white/90 border border-white/20 mb-4">
            Membership • Issue 08
          </span>
          <p className="font-serif italic text-sm text-stone-300">
            "Every ticket punched, every electric suburban stop traversed, shapes a cleaner and more connected metropolis."
          </p>
        </div>

        <div className="relative z-10 mt-12 lg:mt-0">
          <h2 className="font-serif text-3xl lg:text-4xl leading-tight font-normal text-stone-100">
            Join the Modern Movement for Sustainable Transit.
          </h2>
          <div className="mt-4 flex items-center gap-6 text-xs text-stone-300 font-mono">
            <span>+100 XP STARTER BONUS</span>
            <span>•</span>
            <span>CARBON TRACKING</span>
            <span>•</span>
            <span>LIVE DISPATCH</span>
          </div>
        </div>
      </div>

      {/* Right Column: Clean Editorial Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md bg-white border border-stone-200 p-8 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
          <div className="mb-8">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#2E4034] font-semibold">
              New Commuter
            </span>
            <h1 className="font-serif text-3xl font-medium text-[#1A1A1A] mt-1">
              Create Transit Pass
            </h1>
            <p className="text-sm text-stone-500 mt-2 font-sans">
              Sign up to personalize your routes, accrue carbon badges, and record your journeys.
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
              <label htmlFor="register-name" className="block text-xs font-mono uppercase tracking-wider text-stone-600 mb-1.5">
                Full Name
              </label>
              <input
                id="register-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Radhika Sundaram"
                className="w-full px-4 py-3 bg-[#F9F8F6] border border-stone-200 text-[#1A1A1A] placeholder-stone-400 text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors"
              />
            </div>

            <div>
              <label htmlFor="register-email" className="block text-xs font-mono uppercase tracking-wider text-stone-600 mb-1.5">
                Email Address
              </label>
              <input
                id="register-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@chennaitransit.in"
                className="w-full px-4 py-3 bg-[#F9F8F6] border border-stone-200 text-[#1A1A1A] placeholder-stone-400 text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors"
              />
            </div>

            <div>
              <label htmlFor="register-password" className="block text-xs font-mono uppercase tracking-wider text-stone-600 mb-1.5">
                Password (min 6 characters)
              </label>
              <input
                id="register-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 bg-[#F9F8F6] border border-stone-200 text-[#1A1A1A] placeholder-stone-400 text-sm focus:outline-none focus:border-[#1A1A1A] transition-colors"
              />
            </div>

            <button
              id="register-submit-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-[#1A1A1A] hover:bg-[#2E4034] text-white text-sm font-medium transition-colors flex items-center justify-center gap-2 mt-4 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Registering Account...</span>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-2">
            <span>Already have an account?</span>
            <Link
              to={`/login?redirect=${encodeURIComponent(redirectPath)}`}
              className="font-medium text-[#1A1A1A] hover:text-[#C26A4A] underline underline-offset-4"
            >
              Sign In Instead
            </Link>
          </div>

          <div className="mt-6 p-3 bg-stone-50 border border-stone-100 text-[11px] text-stone-500 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#A87C39] shrink-0" />
            <span>Includes 100 bonus Commuter XP and instant verification</span>
          </div>
        </div>
      </div>
    </div>
  );
};
