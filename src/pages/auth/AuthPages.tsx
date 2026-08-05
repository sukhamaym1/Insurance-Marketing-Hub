import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTemplateContext } from '../../context/TemplateContext';

interface AuthPageProps {
  mode: 'login' | 'register' | 'forgot' | 'verify';
}

export const AuthPages: React.FC<AuthPageProps> = ({ mode }) => {
  const navigate = useNavigate();
  const { login, register, loginWithGoogle, resetPassword } = useAuth();
  const { addToast } = useTemplateContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === 'login') {
        await login(email, password);
        addToast('Logged in successfully as Agent!', 'success');
        navigate('/dashboard');
      } else if (mode === 'register') {
        await register(name || 'New Advisor', email, password);
        addToast('Account created successfully!', 'success');
        navigate('/dashboard');
      } else if (mode === 'forgot') {
        await resetPassword(email);
        setResetSent(true);
        addToast('Password reset link sent to your email!', 'info');
      }
    } catch (error: any) {
      addToast(error.message || 'Authentication failed', 'error');
    }
  };

  const handleGoogleAuth = async () => {
    try {
      await loginWithGoogle();
      addToast('Authenticated with Google successfully!', 'success');
      navigate('/dashboard');
    } catch (error: any) {
      addToast(error.message || 'Google authentication failed', 'error');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        {/* Header Logo & Title */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto shadow-glow">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            {mode === 'login' && 'Welcome Back to IMH'}
            {mode === 'register' && 'Create Your Agent Account'}
            {mode === 'forgot' && 'Reset Password'}
          </h2>
          <p className="text-xs text-slate-400">
            {mode === 'login' && 'Enter your credentials to access your brand kit and saved posts.'}
            {mode === 'register' && 'Get started with 1000+ free insurance marketing posters.'}
            {mode === 'forgot' && 'Enter your registered email to receive reset instructions.'}
          </p>
        </div>

        {/* Google Login Placeholder Button */}
        {mode !== 'forgot' && (
          <button
            onClick={handleGoogleAuth}
            className="w-full py-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 transition"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.15C3.25 21.3 7.31 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.27C.46 8.2 0 10.04 0 12s.46 3.8 1.27 5.42l4.01-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.27 6.58l4.01 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            Continue with Google
          </button>
        )}

        {mode !== 'forgot' && (
          <div className="flex items-center gap-3 my-2">
            <div className="h-px bg-slate-800 flex-grow" />
            <span className="text-[10px] text-slate-500 font-bold uppercase">or email</span>
            <div className="h-px bg-slate-800 flex-grow" />
          </div>
        )}

        {resetSent ? (
          <div className="p-4 bg-blue-950/50 border border-blue-800 text-center space-y-2 rounded-2xl">
            <CheckCircle2 className="w-8 h-8 text-blue-400 mx-auto" />
            <h4 className="text-sm font-bold text-white">Reset Link Sent</h4>
            <p className="text-xs text-blue-200">Check your inbox for password reset instructions.</p>
            <Link to="/login" className="inline-block pt-2 text-xs font-bold text-blue-400">
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {mode === 'register' && (
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Sukhamay Adhikary"
                    className="w-full pl-9 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="font-semibold text-slate-300 block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="agent@example.com"
                  className="w-full pl-9 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-semibold text-slate-300">Password</label>
                  {mode === 'login' && (
                    <Link to="/forgot-password" className="text-[10px] text-blue-400 hover:text-blue-300">
                      Forgot Password?
                    </Link>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-glow flex items-center justify-center gap-2 transition"
            >
              {mode === 'login' && 'Sign In to Account'}
              {mode === 'register' && 'Create Account'}
              {mode === 'forgot' && 'Send Reset Link'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-800">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="font-bold text-blue-400 hover:text-blue-300">
                Sign Up Free
              </Link>
            </p>
          ) : (
            <p>
              Already registered?{' '}
              <Link to="/login" className="font-bold text-blue-400 hover:text-blue-300">
                Sign In
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
