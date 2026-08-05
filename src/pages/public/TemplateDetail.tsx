import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Heart,
  Download,
  Edit3,
  Share2,
  CheckCircle2,
  Maximize2,
  ZoomIn,
  ZoomOut,
  HelpCircle,
  Shield
} from 'lucide-react';
import { MOCK_TEMPLATES } from '../../data/mockData';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { useTemplateContext } from '../../context/TemplateContext';
import { TemplateCard } from '../../components/templates/TemplateCard';

export const TemplateDetail: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite, recordDownload } = useTemplateContext();

  const template = MOCK_TEMPLATES.find((t) => t.slug === slug) || MOCK_TEMPLATES[0];
  const favorite = isFavorite(template.id);

  const [zoomLevel, setZoomLevel] = useState(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumbs />

      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/templates')}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 flex items-center gap-2 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Templates
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Metadata Specs */}
        <div className="lg:col-span-3 space-y-6">
          <div className="space-y-3">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-600/20 text-blue-400 border border-blue-500/30">
              {template.category}
            </span>
            <h1 className="text-2xl font-extrabold text-white">{template.title}</h1>
            <p className="text-xs text-slate-400 leading-relaxed">{template.description}</p>
          </div>

          {/* Specs List */}
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              <span>1080 x 1080 px</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              <span>Canva Size Standard</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              <span>Fully Editable Layers</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              <span>High Quality Vector</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              <span>Free Download Available</span>
            </div>
          </div>

          {/* Add to Favorites Toggle Button */}
          <button
            onClick={() => toggleFavorite(template.id)}
            className={`w-full py-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
              favorite
                ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
            {favorite ? 'Added to Favorites' : 'Add to Favorites'}
          </button>
        </div>

        {/* CENTER COLUMN: Main Large Canvas Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative aspect-square w-full bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl flex items-center justify-center p-4">
            <img
              src={template.thumbnail}
              alt={template.title}
              className="max-w-full max-h-full object-contain rounded-2xl shadow-lg transition-transform duration-200"
              style={{ transform: `scale(${zoomLevel})` }}
            />
          </div>

          {/* Zoom & Fit Bar */}
          <div className="flex items-center justify-center gap-3 py-2 bg-slate-900/60 rounded-xl border border-slate-800/80">
            <button
              onClick={() => setZoomLevel(Math.max(0.7, zoomLevel - 0.1))}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-medium text-slate-300">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel(Math.min(1.4, zoomLevel + 0.1))}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              title="Reset Zoom"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Personalize & Download Actions */}
        <div className="lg:col-span-4 space-y-5">
          {/* Personalize This Post Card */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Personalize This Post</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Add your photo, logo, name, and contact details to personalize this post with your brand instantly.
            </p>
            <button
              onClick={() => navigate(`/editor?templateId=${template.id}`)}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-glow flex items-center justify-center gap-2 transition"
            >
              <Edit3 className="w-4 h-4" /> Personalize Now
            </button>
          </div>

          {/* Quick Download Card */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
            <h3 className="text-sm font-bold text-white mb-2">Quick Download</h3>

            <button
              onClick={() => recordDownload(template, 'PNG')}
              className="w-full p-3 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center justify-between transition"
            >
              <div>
                <div className="font-bold text-white">Download HD</div>
                <div className="text-[10px] text-slate-500">1080 x 1080 px PNG</div>
              </div>
              <Download className="w-4 h-4 text-blue-400" />
            </button>

            <button
              onClick={() => recordDownload(template, 'JPG')}
              className="w-full p-3 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center justify-between transition"
            >
              <div>
                <div className="font-bold text-white">Download SD</div>
                <div className="text-[10px] text-slate-500">720 x 720 px JPG</div>
              </div>
              <Download className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Share This Post */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
            <h3 className="text-sm font-bold text-white">Share This Post</h3>
            <p className="text-xs text-slate-400">Share directly to social media</p>
            <div className="grid grid-cols-4 gap-2 pt-2 text-center">
              {['WhatsApp', 'Facebook', 'Telegram', 'More'].map((platform) => (
                <button
                  key={platform}
                  className="p-3 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 flex flex-col items-center gap-1.5 transition"
                >
                  <Share2 className="w-4 h-4 text-blue-400" />
                  <span className="text-[10px]">{platform}</span>
                </button>
              ))}
            </div>
          </div>

          {/* How Personalization Works Tip */}
          <div className="p-4 bg-blue-950/30 border border-blue-900/60 rounded-xl flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300">
              <span className="font-bold text-white block mb-0.5">How Personalization Works?</span>
              Add your logo, name, contact number and details. We'll automatically replace default content with your info.
            </div>
          </div>
        </div>
      </div>

      {/* SIMILAR TEMPLATES CAROUSEL / GRID */}
      <div className="pt-10 border-t border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Similar Templates</h2>
          <Link to="/templates" className="text-xs font-semibold text-blue-400 hover:text-blue-300">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_TEMPLATES.slice(1, 5).map((tpl) => (
            <TemplateCard key={tpl.id} template={tpl} />
          ))}
        </div>
      </div>
    </div>
  );
};
