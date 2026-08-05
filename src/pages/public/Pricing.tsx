import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Sparkles, Crown, Zap, Shield, HelpCircle } from 'lucide-react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';

export const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const plans = [
    {
      name: 'Free Plan',
      priceMonthly: 0,
      priceYearly: 0,
      desc: 'Perfect for new insurance agents starting out.',
      popular: false,
      features: [
        'Access to 100+ Free Templates',
        'Basic Personalization (Name, Phone)',
        'Standard SD Downloads (720px)',
        'Default Fonts & Colors',
        'Community Support'
      ]
    },
    {
      name: 'Pro Plan',
      priceMonthly: 499,
      priceYearly: 299, // Per month billed annually
      desc: 'Ideal for active advisors & POSP agents.',
      popular: true,
      features: [
        'Access to ALL 1000+ Premium Templates',
        'Single-Click Brand Kit Auto-Apply',
        'Unlimited HD Downloads (PNG, JPG, PDF)',
        'Custom Logo & Photo Upload',
        'All Social Sizes (Insta, Story, FB)',
        'No Watermark Guaranteed',
        'Priority WhatsApp Support'
      ]
    },
    {
      name: 'Agency Plan',
      priceMonthly: 1299,
      priceYearly: 899,
      desc: 'Built for Development Officers & Agency Leaders.',
      popular: false,
      features: [
        'Everything in Pro Plan',
        'Manage Up to 10 Sub-Agents',
        'Team Brand Kit Distribution',
        'Bulk Watermarked Poster Export',
        'Custom Agency Logo Watermark',
        'Dedicated Account Manager'
      ]
    },
    {
      name: 'Enterprise',
      priceMonthly: 'Custom',
      priceYearly: 'Custom',
      desc: 'For Insurance Companies & Corporate Sales Teams.',
      popular: false,
      features: [
        'Unlimited Team Seats',
        'API Integration & SSO',
        'Custom Template Design On Demand',
        'SLA 99.9% Uptime Guarantee',
        '24/7 Phone & Email Support'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      <Breadcrumbs />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-600/10 text-blue-400 border border-blue-500/30 text-xs font-bold">
          <Crown className="w-4 h-4 text-amber-400" /> Transparent SaaS Pricing
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Simple Plans for <span className="text-gradient">Unlimited Growth</span>
        </h1>
        <p className="text-sm text-slate-300">
          Pick a plan that fits your insurance business needs. Upgrade or cancel anytime.
        </p>

        {/* Monthly vs Yearly Toggle */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <span className={`text-xs font-bold ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-500'}`}>
            Monthly Billing
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'yearly' ? 'monthly' : 'yearly')}
            className="w-14 h-8 rounded-full bg-slate-800 p-1 relative border border-slate-700 transition"
          >
            <div
              className={`w-6 h-6 rounded-full bg-blue-600 shadow-glow transition-transform ${
                billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-xs font-bold flex items-center gap-1.5 ${billingCycle === 'yearly' ? 'text-white' : 'text-slate-500'}`}>
            Annual Billing
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px]">
              Save 40%
            </span>
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative p-6 rounded-3xl bg-slate-900 border flex flex-col justify-between transition-all duration-300 ${
              plan.popular
                ? 'border-blue-500 shadow-glow scale-105 z-10'
                : 'border-slate-800 hover:border-slate-700'
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                Most Popular
              </span>
            )}

            <div className="space-y-4">
              <h3 className="text-lg font-extrabold text-white">{plan.name}</h3>
              <p className="text-xs text-slate-400">{plan.desc}</p>

              <div className="pt-2">
                <span className="text-3xl font-extrabold text-white">
                  {typeof plan.priceMonthly === 'number'
                    ? `₹${billingCycle === 'yearly' ? plan.priceYearly : plan.priceMonthly}`
                    : plan.priceMonthly}
                </span>
                {typeof plan.priceMonthly === 'number' && (
                  <span className="text-xs text-slate-500"> / month</span>
                )}
              </div>

              <div className="border-t border-slate-800 pt-4 space-y-2 text-xs text-slate-300">
                {plan.features.map((f, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => navigate('/register')}
              className={`mt-6 w-full py-3 rounded-xl font-bold text-xs shadow-lg transition ${
                plan.popular
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-glow'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
            >
              Get Started Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
