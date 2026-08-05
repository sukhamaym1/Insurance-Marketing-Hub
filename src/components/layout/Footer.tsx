import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Send, CheckCircle2 } from 'lucide-react';
import { useTemplateContext } from '../../context/TemplateContext';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { addToast } = useTemplateContext();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    addToast('Subscribed to Marketing Hub Newsletter!', 'success');
  };

  return (
    <footer className="bg-[#070C16] border-t border-slate-800 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-xl text-white">
                Insurance<span className="text-blue-500">Hub</span>
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Create, personalize and share professional insurance social media posts to grow your business, attract POSP agents, and build client trust.
            </p>

            <div className="pt-2">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                Subscribe to Design Updates
              </span>
              {subscribed ? (
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold bg-emerald-950/50 border border-emerald-800 p-3 rounded-xl">
                  <CheckCircle2 className="w-4 h-4" /> You're subscribed to weekly design templates!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-1.5 transition shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="hover:text-blue-400 transition">Home</Link>
              </li>
              <li>
                <Link to="/templates" className="hover:text-blue-400 transition">Templates Library</Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-blue-400 transition">Browse Categories</Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-blue-400 transition">Membership Pricing</Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/about" className="hover:text-blue-400 transition">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition">Contact Us</Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-blue-400 transition">Careers</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-blue-400 transition">Marketing Blog</Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">Support & Legal</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/faq" className="hover:text-blue-400 transition">Help Center & FAQ</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-blue-400 transition">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-blue-400 transition">Terms of Service</Link>
              </li>
              <li>
                <Link to="/legal" className="hover:text-blue-400 transition">Refund & Disclaimer</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Social & Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Insurance Marketing Hub (IMH). All Rights Reserved. Enterprise SaaS Grade.
          </p>

          <div className="flex items-center space-x-3 text-slate-400">
            {['Facebook', 'Instagram', 'YouTube', 'Telegram', 'WhatsApp'].map((platform) => (
              <a
                key={platform}
                href={`#${platform}`}
                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-blue-600 hover:text-white flex items-center justify-center text-xs transition"
                title={platform}
              >
                {platform[0]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
