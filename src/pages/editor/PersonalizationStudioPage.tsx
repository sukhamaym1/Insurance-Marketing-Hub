import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CanvasStage } from '../../components/editor/CanvasStage';
import { Toolbar, SIZE_PRESETS } from '../../components/editor/Toolbar';
import { LeftSidebar } from '../../components/editor/LeftSidebar';
import { RightSidebar } from '../../components/editor/RightSidebar';
import { MOCK_TEMPLATES } from '../../data/mockData';
import { KonvaLayer, TemplateSizePreset } from '../../types';
import { useBrandKit } from '../../context/BrandKitContext';
import { useTemplateContext } from '../../context/TemplateContext';
import { SlidersHorizontal, Settings2, X } from 'lucide-react';
import jsPDF from 'jspdf';

export const PersonalizationStudioPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const templateId = searchParams.get('templateId') || 'tpl-life-01';

  const { brandKit, applyBrandKitToLayers } = useBrandKit();
  const { recordDownload, saveDraft, addToast } = useTemplateContext();

  const targetTemplate = MOCK_TEMPLATES.find((t) => t.id === templateId) || MOCK_TEMPLATES[0];

  // Stage & Layers State
  const [layers, setLayers] = useState<KonvaLayer[]>(targetTemplate.layers);
  const [history, setHistory] = useState<KonvaLayer[][]>([targetTemplate.layers]);
  const [historyStep, setHistoryStep] = useState(0);

  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(0.8);
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [activePreset, setActivePreset] = useState<TemplateSizePreset>(SIZE_PRESETS.find(p => p.id === 'insta-story') || SIZE_PRESETS[1]);
  
  // Mobile Sidebar State
  const [mobileSidebar, setMobileSidebar] = useState<'none' | 'left' | 'right'>('none');

  const stageRef = useRef<any>(null);

  // Auto-fit zoom on mount and when preset changes
  useEffect(() => {
    const computeFitZoom = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      
      // Calculate available space
      // Left sidebar: 320px, Right sidebar: 288px (only on lg: 1024px+)
      const availableWidth = screenWidth >= 1024 ? screenWidth - 320 - 288 - 64 : screenWidth - 32;
      
      // Top navbar: 64px, Toolbar: ~64px, padding: ~64px
      // Mobile bottom nav: ~64px (only on < 1024px)
      const verticalPadding = screenWidth >= 1024 ? 128 : 192;
      const availableHeight = screenHeight - verticalPadding;
      
      const scaleX = availableWidth / activePreset.width;
      const scaleY = availableHeight / activePreset.height;
      
      const fitZoom = Math.min(scaleX, scaleY) * 0.95; // 95% of available space
      
      // Keep it within reasonable bounds
      setZoomLevel(Math.min(Math.max(fitZoom, 0.1), 1.5));
    };
    
    computeFitZoom();
    window.addEventListener('resize', computeFitZoom);
    return () => window.removeEventListener('resize', computeFitZoom);
  }, [activePreset.width, activePreset.height]);

  // Sync layers when templateId changes
  useEffect(() => {
    let fresh = targetTemplate.layers;
    
    // Auto-apply brand kit right away to save the agent time!
    fresh = applyBrandKitToLayers(fresh);
    
    setLayers(fresh);
    setHistory([fresh]);
    setHistoryStep(0);
  }, [templateId]);

  // Auto-apply brand kit when brand kit changes
  useEffect(() => {
    if (layers.length > 0) {
      const personalized = applyBrandKitToLayers(layers);
      if (JSON.stringify(personalized) !== JSON.stringify(layers)) {
        setLayers(personalized);
        setHistory(prev => {
          const newHistory = [...prev];
          newHistory[historyStep] = personalized;
          return newHistory;
        });
      }
    }
  }, [brandKit]);

  const pushHistory = (newLayers: KonvaLayer[]) => {
    const nextHistory = history.slice(0, historyStep + 1);
    nextHistory.push(newLayers);
    setHistory(nextHistory);
    setHistoryStep(nextHistory.length - 1);
    setLayers(newLayers);
  };

  const handleUndo = () => {
    if (historyStep > 0) {
      const prevStep = historyStep - 1;
      setHistoryStep(prevStep);
      setLayers(history[prevStep]);
    }
  };

  const handleRedo = () => {
    if (historyStep < history.length - 1) {
      const nextStep = historyStep + 1;
      setHistoryStep(nextStep);
      setLayers(history[nextStep]);
    }
  };

  const handleUpdateLayer = (id: string, updated: Partial<KonvaLayer>) => {
    const updatedLayers = layers.map((layer) => {
      if (layer.id === id) {
        return { ...layer, ...updated } as KonvaLayer;
      }
      return layer;
    });
    pushHistory(updatedLayers);
  };

  const handleAddLayer = (newLayer: KonvaLayer) => {
    pushHistory([...layers, newLayer]);
    setSelectedLayerId(newLayer.id);
    setMobileSidebar('none');
  };

  const handleDeleteLayer = (id: string) => {
    pushHistory(layers.filter((l) => l.id !== id));
    if (selectedLayerId === id) setSelectedLayerId(null);
  };

  const handleApplyBrandKit = () => {
    const personalized = applyBrandKitToLayers(layers);
    pushHistory(personalized);
    addToast('Brand Kit credentials applied to canvas!', 'success');
    setMobileSidebar('none');
  };

  const handleBringToFront = (id: string) => {
    const maxZ = Math.max(...layers.map((l) => l.zIndex), 0);
    handleUpdateLayer(id, { zIndex: maxZ + 1 });
  };

  const handleSendToBack = (id: string) => {
    handleUpdateLayer(id, { zIndex: 1 });
  };

  // High DPI Export Logic
  const handleExport = (format: 'PNG' | 'JPG' | 'PDF') => {
    if (!stageRef.current) return;

    // Deselect transformers before export
    setSelectedLayerId(null);

    setTimeout(() => {
      const dataUrl = stageRef.current.toDataURL({
        pixelRatio: 2 // High Resolution export
      });

      if (format === 'PDF') {
        const pdf = new jsPDF({
          orientation: activePreset.height > activePreset.width ? 'portrait' : 'landscape',
          unit: 'px',
          format: [activePreset.width, activePreset.height]
        });
        pdf.addImage(dataUrl, 'PNG', 0, 0, activePreset.width, activePreset.height);
        pdf.save(`${targetTemplate.slug}-export.pdf`);
      } else {
        const link = document.createElement('a');
        link.download = `${targetTemplate.slug}-export.${format.toLowerCase()}`;
        link.href = dataUrl;
        link.click();
      }

      recordDownload(targetTemplate, format);
    }, 100);
  };

  const handleSaveDraft = () => {
    saveDraft({
      templateId: targetTemplate.id,
      templateTitle: targetTemplate.title,
      thumbnail: targetTemplate.thumbnail,
      layers
    });
  };

  const selectedLayer = layers.find((l) => l.id === selectedLayerId) || null;

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col bg-[#0B1220] overflow-hidden">
      {/* Top Studio Toolbar */}
      <Toolbar
        canUndo={historyStep > 0}
        canRedo={historyStep < history.length - 1}
        onUndo={handleUndo}
        onRedo={handleRedo}
        zoomLevel={zoomLevel}
        setZoomLevel={setZoomLevel}
        showGrid={showGrid}
        setShowGrid={setShowGrid}
        activePreset={activePreset}
        onSelectPreset={setActivePreset}
        onSaveDraft={handleSaveDraft}
        onExport={handleExport}
        templateTitle={targetTemplate.title}
      />

      {/* Main Studio Editor Workspace Layout */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile Sidebar Overlay Backdrop */}
        {mobileSidebar !== 'none' && (
          <div 
            className="absolute inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm transition-opacity" 
            onClick={() => setMobileSidebar('none')} 
          />
        )}

        {/* Left Toolbar Sidebar */}
        <div className={`absolute lg:relative inset-y-0 left-0 z-40 transition-transform duration-300 transform lg:translate-x-0 ${mobileSidebar === 'left' ? 'translate-x-0' : '-translate-x-full'} h-full flex flex-col bg-[#0E1626]`}>
          <div className="lg:hidden flex justify-between items-center p-3 border-b border-slate-800 bg-slate-950/60 shrink-0">
            <span className="text-sm font-semibold text-white">Tools & Elements</span>
            <button onClick={() => setMobileSidebar('none')} className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            <LeftSidebar
              layers={layers}
              selectedLayerId={selectedLayerId}
              onSelectLayer={setSelectedLayerId}
              onUpdateLayer={handleUpdateLayer}
              onAddLayer={handleAddLayer}
              onDeleteLayer={handleDeleteLayer}
              onApplyBrandKit={handleApplyBrandKit}
            />
          </div>
        </div>

        {/* Center Canvas Stage viewport */}
        <div className="flex-1 overflow-auto flex items-center justify-center p-4 lg:p-8 bg-[#090F1B]">
          <CanvasStage
            layers={layers}
            selectedLayerId={selectedLayerId}
            onSelectLayer={setSelectedLayerId}
            onUpdateLayer={handleUpdateLayer}
            canvasWidth={activePreset.width}
            canvasHeight={activePreset.height}
            zoomLevel={zoomLevel}
            showGrid={showGrid}
            stageRef={stageRef}
          />
        </div>

        {/* Right Properties Inspector */}
        <div className={`absolute lg:relative inset-y-0 right-0 z-40 transition-transform duration-300 transform lg:translate-x-0 ${mobileSidebar === 'right' ? 'translate-x-0' : 'translate-x-full'} h-full flex flex-col bg-[#0E1626]`}>
          <div className="lg:hidden flex justify-between items-center p-3 border-b border-slate-800 bg-slate-950/60 shrink-0">
            <span className="text-sm font-semibold text-white">Properties</span>
            <button onClick={() => setMobileSidebar('none')} className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            <RightSidebar
              selectedLayer={selectedLayer}
              onUpdateLayer={handleUpdateLayer}
              onDeleteLayer={handleDeleteLayer}
              onBringToFront={handleBringToFront}
              onSendToBack={handleSendToBack}
            />
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden flex bg-[#0E1626] border-t border-slate-800 p-2 z-20 gap-2 shrink-0">
        <button 
          onClick={() => setMobileSidebar('left')} 
          className={`flex-1 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition ${mobileSidebar === 'left' ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-300 border border-slate-800'}`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Tools
        </button>
        <button 
          onClick={() => setMobileSidebar('right')} 
          className={`flex-1 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition ${mobileSidebar === 'right' ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-300 border border-slate-800'}`}
        >
          <Settings2 className="w-4 h-4" />
          Properties
        </button>
      </div>
    </div>
  );
};
