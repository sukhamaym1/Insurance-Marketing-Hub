import React, { useState } from 'react';
import { Search, X, Shield, Grid, BookOpen, HelpCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOCK_TEMPLATES, MOCK_CATEGORIES, MOCK_BLOGS, MOCK_FAQS } from '../../data/mockData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const filteredTemplates = query.trim()
    ? MOCK_TEMPLATES.filter((t) => t.title.toLowerCase().includes(query.toLowerCase()))
    : [];

  const filteredCategories = query.trim()
    ? MOCK_CATEGORIES.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  const filteredBlogs = query.trim()
    ? MOCK_BLOGS.filter((b) => b.title.toLowerCase().includes(query.toLowerCase()))
    : [];

  const filteredFaqs = query.trim()
    ? MOCK_FAQS.filter((f) => f.question.toLowerCase().includes(query.toLowerCase()))
    : [];

  const hasResults =
    filteredTemplates.length > 0 ||
    filteredCategories.length > 0 ||
    filteredBlogs.length > 0 ||
    filteredFaqs.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-[#0B1220] border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Search Bar Input */}
        <div className="flex items-center px-4 border-b border-slate-800 bg-slate-900/50">
          <Search className="w-5 h-5 text-blue-500 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search templates, categories, articles, FAQs..."
            className="w-full py-4 bg-transparent text-white placeholder-slate-500 outline-none text-base font-medium"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Results */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-6">
          {!query.trim() && (
            <div className="space-y-4">
              <span className="text-xs uppercase font-semibold tracking-wider text-slate-500">
                Popular Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {['Life Insurance', 'Health Insurance', 'Diwali Wishes', 'POSP Recruitment', 'SIP Investment'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-blue-600/20 hover:text-blue-400 border border-slate-700/50 text-xs text-slate-300 transition"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query.trim() && !hasResults && (
            <div className="text-center py-10 text-slate-400">
              <p>No results matching "{query}"</p>
              <span className="text-xs text-slate-500">Try searching for 'Life', 'Diwali', or 'Recruitment'</span>
            </div>
          )}

          {/* Templates Match */}
          {filteredTemplates.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs uppercase font-semibold text-blue-400 mb-2">
                <Shield className="w-4 h-4" /> Templates
              </div>
              <div className="space-y-1">
                {filteredTemplates.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => {
                      navigate(`/template/${t.slug}`);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/80 cursor-pointer transition"
                  >
                    <div className="flex items-center gap-3">
                      <img src={t.thumbnail} alt={t.title} className="w-10 h-10 object-cover rounded-lg" />
                      <div>
                        <div className="text-sm font-medium text-white">{t.title}</div>
                        <div className="text-xs text-slate-400">{t.category}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Categories Match */}
          {filteredCategories.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs uppercase font-semibold text-emerald-400 mb-2">
                <Grid className="w-4 h-4" /> Categories
              </div>
              <div className="grid grid-cols-2 gap-2">
                {filteredCategories.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => {
                      navigate(`/categories`);
                      onClose();
                    }}
                    className="p-3 rounded-xl bg-slate-800/40 hover:bg-slate-800 cursor-pointer transition border border-slate-800"
                  >
                    <div className="text-sm font-semibold text-white">{c.name}</div>
                    <div className="text-xs text-slate-400">{c.templateCount} Templates</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Blogs Match */}
          {filteredBlogs.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs uppercase font-semibold text-purple-400 mb-2">
                <BookOpen className="w-4 h-4" /> Articles & Guides
              </div>
              <div className="space-y-1">
                {filteredBlogs.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => {
                      navigate(`/blog`);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl hover:bg-slate-800/80 cursor-pointer transition"
                  >
                    <div className="text-sm font-medium text-white">{b.title}</div>
                    <div className="text-xs text-slate-400">{b.readTime}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
