import React, { useState } from 'react';
import {
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Grid,
  Download,
  Save,
  ChevronDown,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { TemplateSizePreset } from '../../types';

interface ToolbarProps {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  zoomLevel: number;
  setZoomLevel: (zoom: number) => void;
  showGrid: boolean;
  setShowGrid: (grid: boolean) => void;
  activePreset: TemplateSizePreset;
  onSelectPreset: (preset: TemplateSizePreset) => void;
  onSaveDraft: () => void;
  onExport: (format: 'PNG' | 'JPG' | 'PDF') => void;
  templateTitle: string;
}

export const SIZE_PRESETS: TemplateSizePreset[] = [
  { id: 'insta-square', label: 'Instagram Post (1:1)', width: 1080, height: 1080, aspectRatio: '1:1' },
  { id: 'insta-story', label: 'Instagram / WhatsApp Story (9:16)', width: 1080, height: 1920, aspectRatio: '9:16' },
  { id: 'fb-post', label: 'Facebook Post (1.91:1)', width: 1200, height: 630, aspectRatio: '1.91:1' },
  { id: 'linkedin-banner', label: 'LinkedIn Post (4:5)', width: 1080, height: 1350, aspectRatio: '4:5' }
];

export const Toolbar: React.FC<ToolbarProps> = ({
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  zoomLevel,
  setZoomLevel,
  showGrid,
  setShowGrid,
  activePreset,
  onSelectPreset,
  onSaveDraft,
  onExport,
  templateTitle
}) => {
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isPresetOpen, setIsPresetOpen] = useState(false);

  return (
    <div className="w-full bg-[#0E1626] border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-4 z-20">
      {/* Title & Size Preset Dropdown */}
      <div className="flex items-center gap-3">
        <h2 className="text-sm font-bold text-white max-w-[200px] sm:max-w-xs truncate">
          {templateTitle}
        </h2>

        {/* Size Presets Picker */}
        <div className="relative">
          <button
            onClick={() => setIsPresetOpen(!isPresetOpen)}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center gap-1.5 transition"
          >
            <span>{activePreset.label}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isPresetOpen && (
            <div className="absolute left-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95">
              <span className="px-3 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Select Social Export Size
              </span>
              {SIZE_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => {
                    onSelectPreset(preset);
                    setIsPresetOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-800 transition ${
                    activePreset.id === preset.id ? 'text-blue-400 font-semibold bg-blue-500/10' : 'text-slate-300'
                  }`}
                >
                  <span>{preset.label}</span>
                  <span className="text-[10px] text-slate-500">{preset.width}x{preset.height}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Canvas Editing Tools (Undo, Redo, Zoom, Grid) */}
      <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-40 transition"
          title="Undo (Ctrl+Z)"
        >
          <Undo className="w-4 h-4" />
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-40 transition"
          title="Redo (Ctrl+Y)"
        >
          <Redo className="w-4 h-4" />
        </button>

        <div className="w-px h-4 bg-slate-800 mx-1" />

        <button
          onClick={() => setZoomLevel(Math.max(0.1, zoomLevel - 0.1))}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <span className="text-xs font-medium text-slate-300 min-w-[40px] text-center">
          {Math.round(zoomLevel * 100)}%
        </span>
        <button
          onClick={() => setZoomLevel(Math.min(1.5, zoomLevel + 0.1))}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoomLevel(0.8)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          title="Reset Zoom"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>

        <div className="w-px h-4 bg-slate-800 mx-1" />

        <button
          onClick={() => setShowGrid(!showGrid)}
          className={`p-1.5 rounded-lg transition ${
            showGrid ? 'bg-blue-600/20 text-blue-400 font-semibold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
          title="Toggle Grid Overlay"
        >
          <Grid className="w-4 h-4" />
        </button>
      </div>

      {/* Action Buttons (Save Draft, Export Dropdown) */}
      <div className="flex items-center gap-3">
        <button
          onClick={onSaveDraft}
          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition"
        >
          <Save className="w-4 h-4 text-blue-400" />
          Save Draft
        </button>

        <div className="relative">
          <button
            onClick={() => setIsExportOpen(!isExportOpen)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-glow transition"
          >
            <Download className="w-4 h-4" />
            Download HD
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {isExportOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95">
              <span className="px-3 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Select Export Format
              </span>
              <button
                onClick={() => {
                  onExport('PNG');
                  setIsExportOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-slate-800 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                HD PNG (Recommended)
              </button>
              <button
                onClick={() => {
                  onExport('JPG');
                  setIsExportOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-slate-800 flex items-center gap-2"
              >
                High Quality JPG
              </button>
              <button
                onClick={() => {
                  onExport('PDF');
                  setIsExportOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-slate-800 flex items-center gap-2"
              >
                Print Ready PDF
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
