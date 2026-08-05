import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Shield,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Download,
  Share2,
  Users,
  Star,
  Zap,
  TrendingUp,
  Heart,
  Gift,
  Award,
  Layers,
  Search
} from 'lucide-react';
import { MOCK_TEMPLATES, MOCK_CATEGORIES } from '../../data/mockData';
import { TemplateCard } from '../../components/templates/TemplateCard';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [activeBeforeAfter, setActiveBeforeAfter] = useState<'before' | 'after'>('after');

  return (
    <div className="space-y-20 pb-20">
      {/* HERO SECTION */}
      <section className="relative pt-12 md:pt-20 overflow-hidden">
        {/* Background Decorative Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
                <Sparkles className="w-4 h-4" /> #1 Marketing Platform for Insurance Advisors
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Create Professional <br />
                <span className="text-gradient">Insurance Social Posts</span> <br />
                in Seconds
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Personalize, download and share stunning social media posts to grow your insurance business, attract POSP agents, and build client trust.
              </p>

              {/* Checklist */}
              <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto lg:mx-0 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>1000+ Professional Templates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>Personalize with Your Details</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>HD Download in One Click</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>Share to All Social Platforms</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <button
                  onClick={() => navigate('/templates')}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-glow flex items-center justify-center gap-2 transition"
                >
                  Explore Templates
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-base flex items-center justify-center gap-2 transition"
                >
                  Login & Personalize
                </button>
              </div>
            </div>

            {/* Right Visual Comparison Card: Before & After Personalization */}
            <div className="lg:col-span-5 relative">
              <div className="p-4 sm:p-6 bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl backdrop-blur-md">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Live Personalization Preview
                  </span>
                  <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
                    <button
                      onClick={() => setActiveBeforeAfter('before')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                        activeBeforeAfter === 'before' ? 'bg-slate-800 text-slate-200' : 'text-slate-500'
                      }`}
                    >
                      Default Template
                    </button>
                    <button
                      onClick={() => setActiveBeforeAfter('after')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                        activeBeforeAfter === 'after' ? 'bg-blue-600 text-white shadow-glow' : 'text-slate-500'
                      }`}
                    >
                      After Personalization
                    </button>
                  </div>
                </div>

                {/* Poster Container Card */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 group shadow-inner">
                  <img
                    src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80"
                    alt="Template Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />

                  <div className="absolute top-6 left-6 right-6 text-white space-y-1">
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-600/80 text-[10px] font-bold tracking-wider uppercase">
                      Life Insurance
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight drop-shadow-md">
                      Secure Your Family's Future
                    </h3>
                  </div>

                  {/* Agent Branding Footer injected dynamically */}
                  {activeBeforeAfter === 'after' ? (
                    <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-emerald-950/90 border border-emerald-500/50 backdrop-blur-md flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-300">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                        alt="Sukhamay Adhikary"
                        className="w-12 h-12 rounded-full object-cover border-2 border-emerald-400"
                      />
                      <div className="text-left min-w-0">
                        <div className="text-sm font-bold text-white truncate">Sukhamay Adhikary</div>
                        <div className="text-xs text-emerald-300 truncate">Senior Life Insurance Advisor</div>
                        <div className="text-[11px] text-slate-300 font-mono">+91 98765 43210</div>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-900/90 border border-slate-700 backdrop-blur-md flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center gap-1.5 font-semibold text-slate-300">
                        <Shield className="w-4 h-4 text-blue-500" /> Default Platform Branding
                      </span>
                      <span className="text-[10px] text-slate-500">www.insurancemarketinghub.com</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-slate-900/60 border border-slate-800 rounded-2xl backdrop-blur-md text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-400">1000+</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Professional Templates</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">5000+</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Happy Insurance Agents</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-400">25,000+</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">HD Post Downloads</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">100%</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Trusted & Secure</div>
          </div>
        </div>
      </section>

      {/* BROWSE CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Browse Categories</h2>
            <p className="text-xs text-slate-400">Find posters tailored for every line of insurance business</p>
          </div>
          <Link to="/categories" className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1">
            View All Categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {MOCK_CATEGORIES.slice(0, 5).map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate('/templates')}
              className="p-5 bg-slate-900 border border-slate-800 rounded-2xl hover:border-blue-500/50 hover:bg-slate-800/80 cursor-pointer transition text-center group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-100 group-hover:text-blue-400 transition">{cat.name}</h3>
              <p className="text-[11px] text-slate-400 mt-1">{cat.templateCount} Templates</p>
            </div>
          ))}
        </div>
      </section>

      {/* LATEST TEMPLATES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Latest Marketing Templates</h2>
            <p className="text-xs text-slate-400">Updated daily with fresh insurance posters</p>
          </div>
          <Link to="/templates" className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1">
            Explore All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_TEMPLATES.map((tpl) => (
            <TemplateCard key={tpl.id} template={tpl} />
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold text-white">How It Works</h2>
          <p className="text-sm text-slate-400">Personalize professional marketing banners in 5 simple steps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { step: '1', title: 'Create Account', desc: 'Sign up or login to get started.' },
            { step: '2', title: 'Add Your Details', desc: 'Upload your photo, logo, and contact info.' },
            { step: '3', title: 'Choose Template', desc: 'Select any template you like.' },
            { step: '4', title: 'Download HD', desc: 'Download in high resolution quality.' },
            { step: '5', title: 'Share Everywhere', desc: 'Share directly on WhatsApp & Facebook.' }
          ].map((s) => (
            <div key={s.step} className="p-5 bg-slate-900 border border-slate-800 rounded-2xl text-center space-y-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center mx-auto">
                {s.step}
              </div>
              <h4 className="text-sm font-bold text-white">{s.title}</h4>
              <p className="text-xs text-slate-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold text-white">Why Choose Us</h2>
          <p className="text-sm text-slate-400">Everything you need to scale your insurance agency marketing</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Shield, title: 'Professional Designs', desc: 'High quality templates created by expert agency designers.' },
            { icon: Sparkles, title: 'Easy to Personalize', desc: 'Change details and make it yours in seconds with single click Brand Kit.' },
            { icon: Download, title: 'HD Quality Download', desc: 'Download high resolution images for print and social media for free.' },
            { icon: Share2, title: 'One Click Share', desc: 'Share directly to all social media platforms seamlessly.' },
            { icon: Zap, title: 'Secure & Fast', desc: 'Your brand data is safe with enterprise grade cloud encryption.' },
            { icon: TrendingUp, title: 'Always Updated', desc: 'New templates added every single day for festivals and insurance themes.' }
          ].map((item, idx) => (
            <div key={idx} className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center">
                <item.icon className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">{item.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold text-white">What Our Users Say</h2>
          <p className="text-sm text-slate-400">Trusted by over 5000+ insurance advisors across the country</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Arindam Saha',
              role: 'Life Insurance Advisor',
              comment: 'This website has made my work so easy. I get amazing posts everyday to share with my clients on WhatsApp.'
            },
            {
              name: 'Puja Das',
              role: 'Insurance Consultant',
              comment: 'Beautiful templates and super easy to personalize. Highly recommended for all insurance advisors.'
            },
            {
              name: 'Rakesh Roy',
              role: 'Agency Manager',
              comment: 'I love how I can add my details and download HD posts in one click. Excellent platform for POSP recruitment!'
            }
          ].map((t, i) => (
            <div key={i} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, starIdx) => (
                  <Star key={starIdx} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed italic">"{t.comment}"</p>
              <div className="pt-2 border-t border-slate-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-600/20 text-blue-400 font-bold text-xs flex items-center justify-center">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{t.name}</div>
                  <div className="text-[10px] text-slate-400">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 rounded-3xl bg-gradient-to-r from-blue-600 to-blue-800 text-center space-y-6 shadow-glow relative overflow-hidden">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Ready to Grow Your Insurance Business?
          </h2>
          <p className="text-sm text-blue-100 max-w-xl mx-auto font-medium">
            Join thousands of insurance professionals using our templates to win client trust and close more policies.
          </p>
          <button
            onClick={() => navigate('/register')}
            className="px-8 py-4 rounded-xl bg-white text-blue-600 font-extrabold text-sm shadow-xl hover:bg-slate-100 transition inline-flex items-center gap-2"
          >
            Get Started Free <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
