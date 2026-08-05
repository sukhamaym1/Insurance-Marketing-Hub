import React from 'react';
import { KonvaLayer, TextLayer, ShapeLayer, ImageLayer } from '../../types';
import {
  Sliders,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  ArrowUp,
  ArrowDown,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Trash2
} from 'lucide-react';

interface RightSidebarProps {
  selectedLayer: KonvaLayer | null;
  onUpdateLayer: (id: string, updated: Partial<KonvaLayer>) => void;
  onDeleteLayer: (id: string) => void;
  onBringToFront: (id: string) => void;
  onSendToBack: (id: string) => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  selectedLayer,
  onUpdateLayer,
  onDeleteLayer,
  onBringToFront,
  onSendToBack
}) => {
  if (!selectedLayer) {
    return (
      <div className="w-72 bg-[#0E1626] border-l border-slate-800 p-6 flex flex-col items-center justify-center text-center text-slate-500 z-10">
        <Sliders className="w-8 h-8 text-slate-600 mb-3" />
        <h4 className="text-sm font-semibold text-slate-300 mb-1">No Layer Selected</h4>
        <p className="text-xs text-slate-500">
          Click on any text, photo, logo, or shape layer on the canvas to customize its properties.
        </p>
      </div>
    );
  }

  return (
    <div className="w-72 bg-[#0E1626] border-l border-slate-800 p-4 flex flex-col h-full overflow-y-auto space-y-5 z-10 text-slate-300">
      {/* Layer Header Info */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">
            {selectedLayer.type} Layer
          </span>
          <h3 className="text-sm font-bold text-white truncate max-w-[160px]">
            {selectedLayer.name}
          </h3>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onUpdateLayer(selectedLayer.id, { locked: !selectedLayer.locked })}
            className={`p-1.5 rounded-lg border ${
              selectedLayer.locked ? 'bg-amber-950 border-amber-800 text-amber-400' : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
            title="Toggle Lock"
          >
            {selectedLayer.locked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => onDeleteLayer(selectedLayer.id)}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400"
            title="Delete Layer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* TEXT LAYER CONTROLS */}
      {selectedLayer.type === 'text' && (
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-semibold text-slate-400 block mb-1">Text Content</label>
            <textarea
              rows={3}
              value={(selectedLayer as TextLayer).text}
              onChange={(e) => onUpdateLayer(selectedLayer.id, { text: e.target.value })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white font-medium outline-none focus:border-blue-500 text-xs resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-semibold text-slate-400 block mb-1">Font Size</label>
              <input
                type="number"
                value={(selectedLayer as TextLayer).fontSize}
                onChange={(e) => onUpdateLayer(selectedLayer.id, { fontSize: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white font-medium outline-none text-xs"
              />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-slate-400 block mb-1">Font Family</label>
              <select
                value={(selectedLayer as TextLayer).fontFamily || 'Inter'}
                onChange={(e) => onUpdateLayer(selectedLayer.id, { fontFamily: e.target.value })}
                className="w-full px-2 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white font-medium outline-none text-xs"
              >
                <option value="Inter">Inter</option>
                <option value="Outfit">Outfit</option>
                <option value="Roboto">Roboto</option>
                <option value="Poppins">Poppins</option>
              </select>
            </div>
          </div>

          {/* Color & Alignment */}
          <div className="space-y-2">
            <label className="text-[10px] font-semibold text-slate-400 block">Text Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={(selectedLayer as TextLayer).fill}
                onChange={(e) => onUpdateLayer(selectedLayer.id, { fill: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
              />
              <span className="text-xs font-mono text-slate-300">{(selectedLayer as TextLayer).fill}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => onUpdateLayer(selectedLayer.id, { align: 'left' })}
              className={`p-2 rounded-lg border ${
                (selectedLayer as TextLayer).align === 'left' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <AlignLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => onUpdateLayer(selectedLayer.id, { align: 'center' })}
              className={`p-2 rounded-lg border ${
                (selectedLayer as TextLayer).align === 'center' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <AlignCenter className="w-4 h-4" />
            </button>
            <button
              onClick={() => onUpdateLayer(selectedLayer.id, { align: 'right' })}
              className={`p-2 rounded-lg border ${
                (selectedLayer as TextLayer).align === 'right' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <AlignRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* SHAPE LAYER CONTROLS */}
      {selectedLayer.type === 'shape' && (
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-semibold text-slate-400 block mb-1">Fill Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={(selectedLayer as ShapeLayer).fill}
                onChange={(e) => onUpdateLayer(selectedLayer.id, { fill: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
              />
              <span className="text-xs font-mono text-slate-300">{(selectedLayer as ShapeLayer).fill}</span>
            </div>
          </div>
        </div>
      )}

      {/* POSITION & OPACITY (Common to all layers) */}
      <div className="pt-4 border-t border-slate-800 space-y-3">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          Layer Arrangement & Position
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onBringToFront(selectedLayer.id)}
            className="flex-1 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold flex items-center justify-center gap-1"
          >
            <ArrowUp className="w-3.5 h-3.5 text-blue-400" /> Bring Front
          </button>
          <button
            onClick={() => onSendToBack(selectedLayer.id)}
            className="flex-1 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold flex items-center justify-center gap-1"
          >
            <ArrowDown className="w-3.5 h-3.5 text-blue-400" /> Send Back
          </button>
        </div>
      </div>
    </div>
  );
};
