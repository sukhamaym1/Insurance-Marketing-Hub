import React from 'react';
import { Template } from '../../types';
import { Heart, Eye, Download, Edit3, Crown, Sparkles, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTemplateContext } from '../../context/TemplateContext';

interface TemplateCardProps {
  template: Template;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite, recordDownload } = useTemplateContext();
  const favorite = isFavorite(template.id);

  return (
    <div className="group relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-blue-500/50 hover:shadow-glow transition-all duration-300 flex flex-col justify-between">
      {/* Top Image Container */}
      <div className="relative aspect-square w-full bg-slate-950 overflow-hidden cursor-pointer">
        <img
          src={template.thumbnail}
          alt={template.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {template.isPremium && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/90 text-amber-950 shadow-md backdrop-blur-sm">
              <Crown className="w-3 h-3 fill-current" />
              PRO
            </span>
          )}
          {template.isNew && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-600/90 text-white shadow-md backdrop-blur-sm">
              <Sparkles className="w-3 h-3" />
              NEW
            </span>
          )}
          {template.isTrending && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-600/90 text-white shadow-md backdrop-blur-sm">
              <Flame className="w-3 h-3" />
              HOT
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(template.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
            favorite
              ? 'bg-rose-500 text-white scale-110 shadow-lg'
              : 'bg-slate-900/60 text-slate-300 hover:bg-slate-900 hover:text-white'
          }`}
          title={favorite ? 'Remove Favorite' : 'Add to Favorites'}
        >
          <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
        </button>

        {/* Hover Quick Action Buttons Overlay */}
        <div className="absolute inset-0 bg-slate-950/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4">
          <button
            onClick={() => navigate(`/template/${template.slug}`)}
            className="p-3 rounded-xl bg-slate-800/90 text-slate-200 hover:bg-slate-700 hover:text-white transition shadow-lg flex items-center gap-2 text-xs font-semibold"
          >
            <Eye className="w-4 h-4 text-blue-400" />
            Preview
          </button>
          <button
            onClick={() => navigate(`/editor?templateId=${template.id}`)}
            className="px-4 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition shadow-lg flex items-center gap-2 text-xs font-semibold"
          >
            <Edit3 className="w-4 h-4" />
            Personalize
          </button>
        </div>
      </div>

      {/* Card Metadata Footer */}
      <div className="p-4 bg-slate-900/90 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-medium text-blue-400">{template.category}</span>
            <span className="text-slate-500">{template.downloadsCount} DLs</span>
          </div>
          <h3
            onClick={() => navigate(`/template/${template.slug}`)}
            className="text-sm font-semibold text-slate-100 line-clamp-1 hover:text-blue-400 cursor-pointer transition"
          >
            {template.title}
          </h3>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between">
          <button
            onClick={() => navigate(`/editor?templateId=${template.id}`)}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Quick Personalize
          </button>
          <button
            onClick={() => recordDownload(template, 'PNG')}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white transition"
            title="Quick Download HD"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
