import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  SlidersHorizontal,
  ChevronRight,
  Heart,
  Download,
  Edit3,
  Upload,
  Crown,
  Shield,
  Grid
} from 'lucide-react';
import { MOCK_TEMPLATES, MOCK_CATEGORIES } from '../../data/mockData';
import { TemplateCard } from '../../components/templates/TemplateCard';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { useTemplateContext } from '../../context/TemplateContext';

export const Templates: React.FC = () => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, favorites, downloads, savedDrafts } = useTemplateContext();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeSort, setActiveSort] = useState<'latest' | 'popular' | 'trending'>('latest');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTemplates = MOCK_TEMPLATES.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = activeCategory === 'All' || t.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <Breadcrumbs />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT SIDEBAR FILTERS & QUICK ACTIONS */}
        <div className="lg:col-span-3 space-y-6">
          {/* All Templates Header & Category List */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4">
            <button
              onClick={() => setActiveCategory('All')}
              className={`w-full p-3 rounded-xl font-bold text-sm flex items-center justify-between transition ${
                activeCategory === 'All'
                  ? 'bg-blue-600 text-white shadow-glow'
                  : 'bg-slate-950/60 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <Grid className="w-4 h-4" />
                <span>All Templates</span>
              </div>
              <span className="text-xs text-blue-200">1280</span>
            </button>

            <div className="space-y-1 pt-2 border-t border-slate-800/80">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block px-2 mb-2">
                Categories
              </span>
              {MOCK_CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.name;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`w-full px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition ${
                      isActive
                        ? 'bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] font-mono opacity-60">{cat.templateCount}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Quick Actions
            </span>

            <button
              onClick={() => navigate('/dashboard')}
              className="w-full p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 flex items-center justify-between transition"
            >
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400" />
                <span>My Favorites</span>
              </div>
              <span className="text-xs text-slate-500">{favorites.length}</span>
            </button>

            <button
              onClick={() => navigate('/dashboard')}
              className="w-full p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 flex items-center justify-between transition"
            >
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-emerald-400" />
                <span>My Downloads</span>
              </div>
              <span className="text-xs text-slate-500">{downloads.length}</span>
            </button>

            <button
              onClick={() => navigate('/dashboard')}
              className="w-full p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 flex items-center justify-between transition"
            >
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-blue-400" />
                <span>My Personalization</span>
              </div>
              <span className="text-xs text-slate-500">{savedDrafts.length}</span>
            </button>
          </div>

          {/* Upgrade Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-900/60 to-purple-900/60 border border-blue-500/40 text-center space-y-3">
            <Crown className="w-7 h-7 text-amber-400 mx-auto" />
            <h4 className="text-sm font-bold text-white">Go Premium</h4>
            <p className="text-[11px] text-slate-300">
              Unlock unlimited HD templates, custom fonts, and agency branding features.
            </p>
            <button
              onClick={() => navigate('/pricing')}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-glow transition"
            >
              Upgrade Now 🚀
            </button>
          </div>
        </div>

        {/* RIGHT TEMPLATES GRID CONTENT */}
        <div className="lg:col-span-9 space-y-6">
          {/* Header Title & Global Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">All Templates</h1>
              <p className="text-xs text-slate-400">High quality insurance social posts for your business.</p>
            </div>

            {/* Search & Sort Toolbar */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search templates..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-xs font-medium outline-none focus:border-blue-500"
                />
              </div>

              <select
                value={activeSort}
                onChange={(e: any) => setActiveSort(e.target.value)}
                className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold text-slate-300 outline-none"
              >
                <option value="latest">Sort: Latest</option>
                <option value="popular">Sort: Popular</option>
                <option value="trending">Sort: Trending</option>
              </select>
            </div>
          </div>

          {/* Category Tag Horizontal Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {['All', 'Life Insurance', 'Health Insurance', 'Investment', 'Motivation', 'Festival', 'Recruitment', 'Savings'].map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveCategory(tag)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                  activeCategory === tag
                    ? 'bg-blue-600 text-white shadow-glow'
                    : 'bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Showing Count Indicator */}
          <div className="text-xs text-slate-400">
            Showing <span className="font-bold text-white">{filteredTemplates.length}</span> of 1280+ templates
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>

          {/* Pagination */}
          <div className="pt-6 border-t border-slate-800 flex items-center justify-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-400 disabled:opacity-40"
            >
              Previous
            </button>
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-xl text-xs font-bold transition ${
                  currentPage === page ? 'bg-blue-600 text-white shadow-glow' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-400 hover:text-white"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
