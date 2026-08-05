import React, { useState } from 'react';
import {
  Crown,
  Users,
  Layers,
  Download,
  DollarSign,
  Settings,
  Shield,
  Activity,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  Search,
  Database
} from 'lucide-react';
import { MOCK_ADMIN_STATS, MOCK_TEMPLATES, MOCK_CATEGORIES, MOCK_AUDIT_LOGS } from '../../data/mockData';
import { useTemplateContext } from '../../context/TemplateContext';

export const AdminDashboard: React.FC = () => {
  const { addToast } = useTemplateContext();
  const [activeSection, setActiveSection] = useState<'analytics' | 'users' | 'templates' | 'categories' | 'logs' | 'settings'>('analytics');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* ADMIN CONTROL CENTER HEADER */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center">
            <Crown className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white">Enterprise Control Center</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-bold">
                Admin Mode
              </span>
            </div>
            <p className="text-xs text-slate-400">Manage users, templates, categories, system settings and audit logs</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => addToast('System Cache Purged Successfully', 'info')}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 transition"
          >
            Clear Cache
          </button>
        </div>
      </div>

      {/* ADMIN SECTION TABS */}
      <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'analytics', label: 'Dashboard Analytics', icon: Activity },
          { id: 'users', label: 'User Directory', icon: Users },
          { id: 'templates', label: 'Template CMS', icon: Layers },
          { id: 'categories', label: 'Categories CMS', icon: Database },
          { id: 'logs', label: 'Audit Logs', icon: Shield },
          { id: 'settings', label: 'System Settings', icon: Settings }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as any)}
            className={`px-4 py-3 rounded-t-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition border-b-2 ${
              activeSection === tab.id
                ? 'border-amber-500 text-amber-400 bg-amber-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* SECTION 1: DASHBOARD ANALYTICS */}
      {activeSection === 'analytics' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Total Users</span>
                <Users className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-3xl font-extrabold text-white">{MOCK_ADMIN_STATS.totalUsers.toLocaleString()}</div>
              <span className="text-[10px] text-emerald-400 font-semibold">+12% this month</span>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Total Downloads</span>
                <Download className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-3xl font-extrabold text-white">{MOCK_ADMIN_STATS.totalDownloads.toLocaleString()}</div>
              <span className="text-[10px] text-purple-400 font-semibold">184.5k HD exports</span>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Active Pro Subscribers</span>
                <Crown className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-3xl font-extrabold text-white">{MOCK_ADMIN_STATS.activeProUsers.toLocaleString()}</div>
              <span className="text-[10px] text-amber-400 font-semibold">₹4,28,000 / month</span>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Total Templates</span>
                <Layers className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-extrabold text-white">{MOCK_ADMIN_STATS.totalTemplates}</div>
              <span className="text-[10px] text-emerald-400 font-semibold"> across 10 categories</span>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-white">Live System Activity Timeline</h3>
            <div className="space-y-3">
              {MOCK_ADMIN_STATS.recentActivity.map((act) => (
                <div key={act.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <div>
                      <span className="font-bold text-white">{act.user}</span>
                      <span className="text-slate-400"> - {act.details}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500">{act.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: TEMPLATE CMS */}
      {activeSection === 'templates' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Template CMS Library</h3>
            <button
              onClick={() => addToast('Template Creation Form Triggered', 'info')}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-glow"
            >
              <Plus className="w-4 h-4" /> Upload New Template
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden text-xs">
            <div className="grid grid-cols-12 p-3 bg-slate-950 font-bold text-slate-400 border-b border-slate-800">
              <span className="col-span-5">Template Name & Category</span>
              <span className="col-span-3">Downloads</span>
              <span className="col-span-2">Badge</span>
              <span className="col-span-2 text-right">Actions</span>
            </div>
            {MOCK_TEMPLATES.map((tpl) => (
              <div key={tpl.id} className="grid grid-cols-12 p-3 border-b border-slate-800/60 items-center">
                <div className="col-span-5 flex items-center gap-3">
                  <img src={tpl.thumbnail} alt={tpl.title} className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <div className="font-bold text-white truncate">{tpl.title}</div>
                    <div className="text-[10px] text-slate-400">{tpl.category}</div>
                  </div>
                </div>
                <div className="col-span-3 text-slate-300 font-mono">{tpl.downloadsCount}</div>
                <div className="col-span-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${tpl.isPremium ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'}`}>
                    {tpl.isPremium ? 'PRO' : 'FREE'}
                  </span>
                </div>
                <div className="col-span-2 flex items-center justify-end gap-2">
                  <button className="p-1 text-slate-400 hover:text-white"><Edit className="w-4 h-4" /></button>
                  <button className="p-1 text-slate-400 hover:text-rose-400"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 5: AUDIT LOGS */}
      {activeSection === 'logs' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white">System Audit & Compliance Logs</h3>
          <div className="space-y-2 text-xs font-mono">
            {MOCK_AUDIT_LOGS.map((log) => (
              <div key={log.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-slate-300">
                <div>
                  <span className="text-blue-400 font-bold">[{log.action}]</span> {log.target} by {log.actor}
                </div>
                <div className="text-[10px] text-slate-500">IP: {log.ip} • {log.timestamp}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
