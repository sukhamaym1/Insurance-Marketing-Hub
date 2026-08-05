import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Grid,
  Shield,
  Heart,
  TrendingUp,
  Award,
  Gift,
  Users,
  PiggyBank,
  Lightbulb,
  FileCheck,
  Sun,
  ArrowRight,
  Crown,
  Layers,
  Edit3,
  Download,
  Share2
} from 'lucide-react';
import { MOCK_CATEGORIES } from '../../data/mockData';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';

export const Categories: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filteredCategories = MOCK_CATEGORIES.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumbs />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT SIDEBAR CATEGORY MENU */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <button className="w-full p-3 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center gap-2 shadow-glow">
              <Grid className="w-4 h-4" /> All Categories
            </button>

            <div className="space-y-1 pt-2">
              {MOCK_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => navigate('/templates')}
                  className="w-full px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 flex items-center justify-between transition"
                >
                  <span className="truncate">{cat.name}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{cat.templateCount}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Upgrade Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-900 to-purple-900 border border-blue-500/40 text-center space-y-3 shadow-2xl">
            <Crown className="w-8 h-8 text-amber-400 mx-auto" />
            <h4 className="text-sm font-bold text-white">Unlock Premium Templates</h4>
            <p className="text-[11px] text-slate-300">
              Get access to premium templates and exclusive features.
            </p>
            <button
              onClick={() => navigate('/pricing')}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-bold shadow-glow transition"
            >
              Upgrade Now 🚀
            </button>
          </div>
        </div>

        {/* RIGHT CATEGORIES MAIN CONTENT */}
        <div className="lg:col-span-9 space-y-6">
          {/* Header & Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-white">All Categories</h1>
              <p className="text-xs text-slate-400">
                Browse templates by category and find the perfect post for your insurance business.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative w-full md:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search categories..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-xs outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Categories Grid matching reference image 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => navigate('/templates')}
                className="p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-blue-500/50 hover:bg-slate-800/80 cursor-pointer transition flex flex-col justify-between group space-y-4 shadow-lg"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition">
                      {cat.name}
                    </h3>
                    <div className="text-xs font-semibold text-blue-400 mt-0.5">
                      {cat.templateCount} Templates
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center text-xs font-bold text-blue-400 group-hover:text-blue-300 transition gap-1">
                  View Templates <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Statistics Highlight Bar */}
          <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-slate-300">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-blue-600/20 text-blue-400">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">1200+</div>
                <div className="text-[11px] text-slate-400">Professional Templates</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-purple-600/20 text-purple-400">
                <Edit3 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Easy to Customize</div>
                <div className="text-[11px] text-slate-400">Personalize with logo & info</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-emerald-600/20 text-emerald-400">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">HD Quality Download</div>
                <div className="text-[11px] text-slate-400">High resolution graphics</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-amber-600/20 text-amber-400">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">One Click Share</div>
                <div className="text-[11px] text-slate-400">Share to WhatsApp & FB</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
