import React, { useState } from 'react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { ShieldCheck, FileText, RefreshCw, Cookie, AlertTriangle } from 'lucide-react';

export const LegalPages: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'refund' | 'cookie' | 'disclaimer'>('privacy');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumbs />

      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl font-extrabold text-white">Legal & Compliance Suite</h1>
        <p className="text-xs text-slate-400">Official terms, privacy, and user policies for Insurance Marketing Hub</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-2 bg-slate-900 border border-slate-800 p-3 rounded-2xl">
          {[
            { id: 'privacy', label: 'Privacy Policy', icon: ShieldCheck },
            { id: 'terms', label: 'Terms of Service', icon: FileText },
            { id: 'refund', label: 'Refund Policy', icon: RefreshCw },
            { id: 'cookie', label: 'Cookie Policy', icon: Cookie },
            { id: 'disclaimer', label: 'Disclaimer', icon: AlertTriangle }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full p-3 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white shadow-glow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Content Box */}
        <div className="lg:col-span-9 p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-6 text-sm text-slate-300 leading-relaxed">
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Privacy Policy</h2>
              <p>
                At Insurance Marketing Hub, we respect your privacy. We collect personal credentials (such as your name, agent photo, logo, and phone number) solely for the purpose of auto-generating marketing materials on your behalf.
              </p>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider pt-2">Data Protection & Security</h4>
              <p className="text-xs text-slate-400">
                Your uploaded logos and photos are encrypted in Firebase Storage and are never sold or distributed to third parties.
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Terms of Service</h2>
              <p>
                By using Insurance Marketing Hub, you agree not to use generated templates for fraudulent insurance claims or misleading financial promises. You represent that you hold proper licensing (POSP / Advisor) in your jurisdiction.
              </p>
            </div>
          )}

          {activeTab === 'refund' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Refund Policy</h2>
              <p>
                We offer a 7-day money-back guarantee for all Pro and Agency subscription plans. If you are unsatisfied with template exports, contact support for an instant refund.
              </p>
            </div>
          )}

          {activeTab === 'cookie' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Cookie Policy</h2>
              <p>
                We use cookies and browser local storage to maintain your active login session and store your Brand Kit preferences offline.
              </p>
            </div>
          )}

          {activeTab === 'disclaimer' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Disclaimer</h2>
              <p>
                Insurance Marketing Hub is an independent design SaaS platform. We are not affiliated with IRDAI or specific insurance carriers unless explicitly designated.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
