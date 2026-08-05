import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Type,
  Image as ImageIcon,
  Square,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Trash2,
  Upload,
  Check,
  User,
  Phone,
  Briefcase,
  Globe,
  Palette
} from 'lucide-react';
import { KonvaLayer } from '../../types';
import { useBrandKit } from '../../context/BrandKitContext';

interface LeftSidebarProps {
  layers: KonvaLayer[];
  selectedLayerId: string | null;
  onSelectLayer: (id: string | null) => void;
  onUpdateLayer: (id: string, updated: Partial<KonvaLayer>) => void;
  onAddLayer: (layer: KonvaLayer) => void;
  onDeleteLayer: (id: string) => void;
  onApplyBrandKit: () => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  layers,
  selectedLayerId,
  onSelectLayer,
  onUpdateLayer,
  onAddLayer,
  onDeleteLayer,
  onApplyBrandKit
}) => {
  const [activeTab, setActiveTab] = useState<'brand' | 'layers' | 'text' | 'media' | 'shapes'>('brand');
  const { brandKit, updateBrandKit } = useBrandKit();

  const sortedLayers = [...layers].sort((a, b) => b.zIndex - a.zIndex);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'photo' | 'logo') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        if (field === 'photo') {
          updateBrandKit({ photoUrl: result });
        } else {
          updateBrandKit({ logoUrl: result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-80 bg-[#0E1626] border-r border-slate-800 flex flex-col h-full z-10">
      {/* Sidebar Navigation Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-950/60 p-1">
        <button
          onClick={() => setActiveTab('brand')}
          className={`flex-1 py-2.5 rounded-lg text-xs font-semibold flex flex-col items-center gap-1 transition ${
            activeTab === 'brand' ? 'bg-blue-600 text-white shadow-glow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Brand Kit
        </button>
        <button
          onClick={() => setActiveTab('layers')}
          className={`flex-1 py-2.5 rounded-lg text-xs font-semibold flex flex-col items-center gap-1 transition ${
            activeTab === 'layers' ? 'bg-blue-600 text-white shadow-glow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          Layers
        </button>
        <button
          onClick={() => setActiveTab('text')}
          className={`flex-1 py-2.5 rounded-lg text-xs font-semibold flex flex-col items-center gap-1 transition ${
            activeTab === 'text' ? 'bg-blue-600 text-white shadow-glow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Type className="w-4 h-4" />
          Text
        </button>
        <button
          onClick={() => setActiveTab('media')}
          className={`flex-1 py-2.5 rounded-lg text-xs font-semibold flex flex-col items-center gap-1 transition ${
            activeTab === 'media' ? 'bg-blue-600 text-white shadow-glow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          Media
        </button>
        <button
          onClick={() => setActiveTab('shapes')}
          className={`flex-1 py-2.5 rounded-lg text-xs font-semibold flex flex-col items-center gap-1 transition ${
            activeTab === 'shapes' ? 'bg-blue-600 text-white shadow-glow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Square className="w-4 h-4" />
          Shapes
        </button>
      </div>

      {/* Tab Content Panels */}
      <div className="p-4 flex-grow overflow-y-auto space-y-5">
        {/* TAB 1: BRAND KIT AUTO-APPLY */}
        {activeTab === 'brand' && (
          <div className="space-y-4">
            <div className="p-3 bg-blue-950/40 border border-blue-800/60 rounded-xl">
              <h4 className="text-xs font-bold text-blue-300 flex items-center gap-1.5 mb-1">
                <Sparkles className="w-4 h-4 text-blue-400" /> Auto-Personalized
              </h4>
              <p className="text-[11px] text-slate-400 leading-normal">
                Your profile photo, logo, contact details, and brand colors have been automatically injected into this template.
              </p>
              <button
                onClick={onApplyBrandKit}
                className="mt-3 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center justify-center gap-1.5 transition"
              >
                <Check className="w-4 h-4" /> Re-apply Brand Kit
              </button>
            </div>

            {/* Profile Photos & Upload */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Agent Photos & Logo
              </span>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-center">
                  <span className="text-[10px] font-semibold text-slate-400 block mb-2">Agent Photo</span>
                  <img src={brandKit.photoUrl} alt="Photo" className="w-16 h-16 rounded-full mx-auto object-cover mb-2" />
                  <label className="cursor-pointer text-[10px] font-semibold text-blue-400 hover:text-blue-300 flex items-center justify-center gap-1">
                    <Upload className="w-3 h-3" /> Replace
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'photo')} className="hidden" />
                  </label>
                </div>

                <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-center">
                  <span className="text-[10px] font-semibold text-slate-400 block mb-2">Company Logo</span>
                  <img src={brandKit.logoUrl} alt="Logo" className="w-16 h-16 rounded-xl mx-auto object-cover mb-2" />
                  <label className="cursor-pointer text-[10px] font-semibold text-blue-400 hover:text-blue-300 flex items-center justify-center gap-1">
                    <Upload className="w-3 h-3" /> Replace
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'logo')} className="hidden" />
                  </label>
                </div>
              </div>
            </div>

            {/* Field Inputs */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Personal Credentials
              </span>

              <div className="space-y-2 text-xs">
                <div>
                  <label className="text-[10px] font-medium text-slate-400 flex items-center gap-1 mb-1">
                    <User className="w-3 h-3 text-blue-400" /> Full Name
                  </label>
                  <input
                    type="text"
                    value={brandKit.fullName}
                    onChange={(e) => updateBrandKit({ fullName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white font-medium outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-medium text-slate-400 flex items-center gap-1 mb-1">
                    <Briefcase className="w-3 h-3 text-blue-400" /> Designation
                  </label>
                  <input
                    type="text"
                    value={brandKit.designation}
                    onChange={(e) => updateBrandKit({ designation: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white font-medium outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-medium text-slate-400 flex items-center gap-1 mb-1">
                    <Phone className="w-3 h-3 text-blue-400" /> Phone Number
                  </label>
                  <input
                    type="text"
                    value={brandKit.phone}
                    onChange={(e) => updateBrandKit({ phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white font-medium outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-medium text-slate-400 flex items-center gap-1 mb-1">
                    <Globe className="w-3 h-3 text-blue-400" /> Website
                  </label>
                  <input
                    type="text"
                    value={brandKit.website}
                    onChange={(e) => updateBrandKit({ website: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white font-medium outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Brand Colors */}
            <div className="pt-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                Brand Palette
              </span>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={brandKit.primaryColor}
                    onChange={(e) => updateBrandKit({ primaryColor: e.target.value })}
                    className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <span className="text-[10px] text-slate-300 font-mono">Primary</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={brandKit.secondaryColor}
                    onChange={(e) => updateBrandKit({ secondaryColor: e.target.value })}
                    className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <span className="text-[10px] text-slate-300 font-mono">Card BG</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LAYERS LIST & CONTROLS */}
        {activeTab === 'layers' && (
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
              Canvas Layers ({layers.length})
            </span>
            <div className="space-y-1.5">
              {sortedLayers.map((layer) => {
                const isSelected = selectedLayerId === layer.id;
                return (
                  <div
                    key={layer.id}
                    onClick={() => onSelectLayer(layer.id)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600/20 border-blue-500 text-white font-semibold'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-xs font-mono text-slate-500">#{layer.zIndex}</span>
                      <span className="text-xs truncate">{layer.name || layer.type}</span>
                    </div>

                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onUpdateLayer(layer.id, { visible: layer.visible === false ? true : false })}
                        className="p-1 rounded text-slate-400 hover:text-white"
                        title="Toggle Visibility"
                      >
                        {layer.visible === false ? <EyeOff className="w-3.5 h-3.5 text-rose-400" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() => onUpdateLayer(layer.id, { locked: !layer.locked })}
                        className="p-1 rounded text-slate-400 hover:text-white"
                        title="Toggle Lock"
                      >
                        {layer.locked ? <Lock className="w-3.5 h-3.5 text-amber-400" /> : <Unlock className="w-3.5 h-3.5" />}
                      </button>

                      {layer.type !== 'background' && (
                        <button
                          onClick={() => onDeleteLayer(layer.id)}
                          className="p-1 rounded text-slate-400 hover:text-rose-400"
                          title="Delete Layer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: ADD TEXT */}
        {activeTab === 'text' && (
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
              Add Text Overlay
            </span>

            <button
              onClick={() =>
                onAddLayer({
                  id: 'txt-' + Date.now(),
                  name: 'Headline',
                  type: 'text',
                  text: 'Your Custom Insurance Headline',
                  fontSize: 40,
                  fontFamily: 'Outfit',
                  fill: '#FFFFFF',
                  fontStyle: 'bold',
                  x: 100,
                  y: 200,
                  width: 800,
                  height: 60,
                  zIndex: layers.length + 1
                })
              }
              className="w-full p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left transition"
            >
              <div className="text-sm font-bold text-white">Add Large Headline</div>
              <div className="text-[10px] text-slate-400">40px Outfit Bold</div>
            </button>

            <button
              onClick={() =>
                onAddLayer({
                  id: 'txt-' + Date.now(),
                  name: 'Subtitle',
                  type: 'text',
                  text: 'Add detailed insurance explanation message here.',
                  fontSize: 24,
                  fontFamily: 'Inter',
                  fill: '#94A3B8',
                  x: 100,
                  y: 280,
                  width: 800,
                  height: 50,
                  zIndex: layers.length + 1
                })
              }
              className="w-full p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left transition"
            >
              <div className="text-sm font-medium text-slate-200">Add Subtitle Text</div>
              <div className="text-[10px] text-slate-400">24px Inter Normal</div>
            </button>
          </div>
        )}

        {/* TAB 4: MEDIA & IMAGES */}
        {activeTab === 'media' && (
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
              Insert Media Element
            </span>
            <label className="w-full p-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-dashed border-slate-700 text-center cursor-pointer block transition">
              <Upload className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <span className="text-xs font-semibold text-white block">Upload Custom Graphic</span>
              <span className="text-[10px] text-slate-400">PNG, JPG, SVG up to 10MB</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      onAddLayer({
                        id: 'img-' + Date.now(),
                        name: file.name,
                        type: 'image',
                        url: reader.result as string,
                        x: 200,
                        y: 200,
                        width: 300,
                        height: 300,
                        zIndex: layers.length + 1
                      });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </label>
          </div>
        )}

        {/* TAB 5: SHAPES & BADGES */}
        {activeTab === 'shapes' && (
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
              Add Containers & Badges
            </span>

            <button
              onClick={() =>
                onAddLayer({
                  id: 'shape-' + Date.now(),
                  name: 'Card Box',
                  type: 'shape',
                  shapeType: 'rect',
                  fill: '#1E293B',
                  stroke: '#2563EB',
                  strokeWidth: 2,
                  x: 100,
                  y: 400,
                  width: 880,
                  height: 140,
                  zIndex: layers.length + 1
                })
              }
              className="w-full p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left transition flex items-center justify-between"
            >
              <div>
                <div className="text-sm font-semibold text-white">Footer Card Box</div>
                <div className="text-[10px] text-slate-400">Rectangular banner with border</div>
              </div>
              <Square className="w-5 h-5 text-blue-400" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
