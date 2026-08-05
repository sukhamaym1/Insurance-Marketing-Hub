import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Sparkles,
  Edit3,
  Download,
  Heart,
  Crown,
  Share2,
  Clock,
  Shield,
  Layers,
  Settings,
  Plus,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useBrandKit } from '../../context/BrandKitContext';
import { useTemplateContext } from '../../context/TemplateContext';
import { MOCK_TEMPLATES } from '../../data/mockData';
import { TemplateCard } from '../../components/templates/TemplateCard';

export const AgentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { brandKit, updateBrandKit } = useBrandKit();
  const { favorites, downloads, savedDrafts } = useTemplateContext();

  const [activeTab, setActiveTab] = useState<'overview' | 'drafts' | 'downloads' | 'favorites' | 'brandkit'>('overview');

  const favoriteTemplates = MOCK_TEMPLATES.filter((t) => favorites.includes(t.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* AGENT WELCOME BANNER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-5 z-10">
          <img
            src={brandKit.photoUrl || user?.photoURL}
            alt={brandKit.fullName}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-blue-500 shadow-glow"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white">{brandKit.fullName}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-600/20 text-blue-400 text-[10px] font-bold">
                {user?.subscriptionPlan || 'Pro'} Agent
              </span>
            </div>
            <p className="text-xs text-blue-400 font-semibold">{brandKit.designation}</p>
            <p className="text-xs text-slate-400">{brandKit.companyName} • {brandKit.branchName}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 z-10 w-full md:w-auto">
          <button
            onClick={() => setActiveTab('brandkit')}
            className="flex-1 md:flex-none px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center justify-center gap-2 transition"
          >
            <Sparkles className="w-4 h-4 text-blue-400" /> Update Brand Kit
          </button>
          <button
            onClick={() => navigate('/templates')}
            className="flex-1 md:flex-none px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-glow flex items-center justify-center gap-2 transition"
          >
            <Plus className="w-4 h-4" /> Create New Post
          </button>
        </div>
      </div>

      {/* DASHBOARD TAB NAVIGATION BAR */}
      <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'overview', label: 'Overview', icon: Shield },
          { id: 'drafts', label: `My Drafts (${savedDrafts.length})`, icon: Edit3 },
          { id: 'downloads', label: `My Downloads (${downloads.length})`, icon: Download },
          { id: 'favorites', label: `Favorites (${favorites.length})`, icon: Heart },
          { id: 'brandkit', label: 'Brand Kit Settings', icon: Sparkles }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-3 rounded-t-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition border-b-2 ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-400 bg-blue-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex items-center gap-4">
              <div className="p-3.5 rounded-xl bg-blue-600/20 text-blue-400">
                <Download className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-white">{downloads.length}</div>
                <div className="text-xs text-slate-400">Total Posts Downloaded</div>
              </div>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex items-center gap-4">
              <div className="p-3.5 rounded-xl bg-rose-600/20 text-rose-400">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-white">{favorites.length}</div>
                <div className="text-xs text-slate-400">Saved Favorites</div>
              </div>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex items-center gap-4">
              <div className="p-3.5 rounded-xl bg-emerald-600/20 text-emerald-400">
                <Edit3 className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-white">{savedDrafts.length}</div>
                <div className="text-xs text-slate-400">Saved Personalizations</div>
              </div>
            </div>
          </div>

          {/* Continue Editing Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Continue Personalizing</h3>
              <button onClick={() => setActiveTab('drafts')} className="text-xs text-blue-400 hover:text-blue-300">
                View All Drafts
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedDrafts.map((draft) => (
                <div
                  key={draft.id}
                  onClick={() => navigate(`/editor?templateId=${draft.templateId}`)}
                  className="p-4 bg-slate-900 border border-slate-800 rounded-2xl hover:border-blue-500 cursor-pointer transition flex items-center gap-4 group"
                >
                  <img src={draft.thumbnail} alt={draft.templateTitle} className="w-16 h-16 rounded-xl object-cover" />
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-white group-hover:text-blue-400 truncate">
                      {draft.templateTitle}
                    </h4>
                    <span className="text-[10px] text-slate-500">Last edited {draft.updatedAt}</span>
                    <div className="mt-2 text-xs font-semibold text-blue-400 flex items-center gap-1">
                      <Edit3 className="w-3.5 h-3.5" /> Resume Editing
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Templates for Agent */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Recommended for Your Agency</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_TEMPLATES.slice(0, 3).map((tpl) => (
                <TemplateCard key={tpl.id} template={tpl} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MY DRAFTS */}
      {activeTab === 'drafts' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedDrafts.map((draft) => (
            <div key={draft.id} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
              <img src={draft.thumbnail} alt={draft.templateTitle} className="w-full h-48 object-cover rounded-xl" />
              <h4 className="text-sm font-bold text-white truncate">{draft.templateTitle}</h4>
              <button
                onClick={() => navigate(`/editor?templateId=${draft.templateId}`)}
                className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-glow"
              >
                Open in Studio Editor
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: DOWNLOADS HISTORY */}
      {activeTab === 'downloads' && (
        <div className="space-y-3">
          {downloads.map((item) => (
            <div key={item.id} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={item.thumbnailUrl} alt={item.templateTitle} className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <h4 className="text-sm font-bold text-white">{item.templateTitle}</h4>
                  <span className="text-xs text-slate-400">Format: {item.format} • {item.downloadedAt}</span>
                </div>
              </div>
              <button className="p-2 rounded-xl bg-slate-800 text-blue-400 hover:bg-slate-700">
                <Download className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: FAVORITES */}
      {activeTab === 'favorites' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteTemplates.map((tpl) => (
            <TemplateCard key={tpl.id} template={tpl} />
          ))}
        </div>
      )}

      {/* TAB 5: BRAND KIT SETTINGS */}
      {activeTab === 'brandkit' && (
        <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl mx-auto space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-xl font-extrabold text-white">Brand Kit Configuration</h3>
            <p className="text-xs text-slate-400">
              Upload your branding once. It will automatically apply to all templates.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Full Agent Name</label>
              <input
                type="text"
                value={brandKit.fullName}
                onChange={(e) => updateBrandKit({ fullName: e.target.value })}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Designation</label>
              <input
                type="text"
                value={brandKit.designation}
                onChange={(e) => updateBrandKit({ designation: e.target.value })}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Phone Number</label>
              <input
                type="text"
                value={brandKit.phone}
                onChange={(e) => updateBrandKit({ phone: e.target.value })}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Email</label>
              <input
                type="email"
                value={brandKit.email}
                onChange={(e) => updateBrandKit({ email: e.target.value })}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
