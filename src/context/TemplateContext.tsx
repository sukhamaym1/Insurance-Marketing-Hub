import React, { createContext, useContext, useState, useEffect } from 'react';
import { Template, SavedPersonalization, DownloadHistory } from '../types';
import { MOCK_TEMPLATES } from '../data/mockData';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface TemplateContextType {
  templates: Template[];
  favorites: string[];
  toggleFavorite: (templateId: string) => void;
  isFavorite: (templateId: string) => boolean;
  downloads: DownloadHistory[];
  recordDownload: (template: Template, format: 'PNG' | 'JPG' | 'PDF') => void;
  savedDrafts: SavedPersonalization[];
  saveDraft: (draft: Omit<SavedPersonalization, 'id' | 'updatedAt'>) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  toasts: Toast[];
  addToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

export const TemplateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [templates] = useState<Template[]>(MOCK_TEMPLATES);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('imh_favorites');
    return saved ? JSON.parse(saved) : ['tpl-life-01', 'tpl-health-01'];
  });

  const [downloads, setDownloads] = useState<DownloadHistory[]>(() => {
    const saved = localStorage.getItem('imh_downloads');
    return saved ? JSON.parse(saved) : [
      {
        id: 'dl-1',
        templateId: 'tpl-life-01',
        templateTitle: 'Life Insurance - Family Security Promise',
        format: 'PNG',
        downloadedAt: '2026-02-12 11:30 AM',
        thumbnailUrl: MOCK_TEMPLATES[0].thumbnail
      }
    ];
  });

  const [savedDrafts, setSavedDrafts] = useState<SavedPersonalization[]>(() => {
    const saved = localStorage.getItem('imh_drafts');
    return saved ? JSON.parse(saved) : [
      {
        id: 'draft-1',
        templateId: 'tpl-life-01',
        templateTitle: 'My Family Security Poster Draft',
        thumbnail: MOCK_TEMPLATES[0].thumbnail,
        layers: MOCK_TEMPLATES[0].layers,
        updatedAt: '2 hours ago'
      }
    ];
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    localStorage.setItem('imh_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('imh_downloads', JSON.stringify(downloads));
  }, [downloads]);

  useEffect(() => {
    localStorage.setItem('imh_drafts', JSON.stringify(savedDrafts));
  }, [savedDrafts]);

  const toggleFavorite = (templateId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(templateId);
      const next = exists ? prev.filter((id) => id !== templateId) : [...prev, templateId];
      addToast(exists ? 'Removed from Favorites' : 'Added to Favorites!', exists ? 'info' : 'success');
      return next;
    });
  };

  const isFavorite = (templateId: string) => favorites.includes(templateId);

  const recordDownload = (template: Template, format: 'PNG' | 'JPG' | 'PDF') => {
    const newEntry: DownloadHistory = {
      id: 'dl-' + Date.now(),
      templateId: template.id,
      templateTitle: template.title,
      format,
      downloadedAt: new Date().toLocaleString(),
      thumbnailUrl: template.thumbnail
    };
    setDownloads((prev) => [newEntry, ...prev]);
    addToast(`Downloaded ${template.title} in HD ${format}!`, 'success');
  };

  const saveDraft = (draftData: Omit<SavedPersonalization, 'id' | 'updatedAt'>) => {
    const newDraft: SavedPersonalization = {
      ...draftData,
      id: 'draft-' + Date.now(),
      updatedAt: 'Just now'
    };
    setSavedDrafts((prev) => [newDraft, ...prev.filter((d) => d.templateId !== draftData.templateId)]);
    addToast('Personalization draft saved successfully!', 'success');
  };

  const addToast = (message: string, type: Toast['type'] = 'success') => {
    const id = 'toast-' + Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TemplateContext.Provider
      value={{
        templates,
        favorites,
        toggleFavorite,
        isFavorite,
        downloads,
        recordDownload,
        savedDrafts,
        saveDraft,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
};

export const useTemplateContext = () => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error('useTemplateContext must be used within a TemplateProvider');
  }
  return context;
};
