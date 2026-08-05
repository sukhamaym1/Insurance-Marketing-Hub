import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrandKit, KonvaLayer } from '../types';
import { INITIAL_BRAND_KIT } from '../data/mockData';

interface BrandKitContextType {
  brandKit: BrandKit;
  updateBrandKit: (updated: Partial<BrandKit>) => void;
  applyBrandKitToLayers: (layers: KonvaLayer[]) => KonvaLayer[];
}

const BrandKitContext = createContext<BrandKitContextType | undefined>(undefined);

export const BrandKitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [brandKit, setBrandKit] = useState<BrandKit>(() => {
    const saved = localStorage.getItem('imh_brand_kit');
    return saved ? JSON.parse(saved) : INITIAL_BRAND_KIT;
  });

  useEffect(() => {
    localStorage.setItem('imh_brand_kit', JSON.stringify(brandKit));
  }, [brandKit]);

  const updateBrandKit = (updated: Partial<BrandKit>) => {
    setBrandKit((prev) => ({
      ...prev,
      ...updated,
      socials: {
        ...prev.socials,
        ...updated.socials
      }
    }));
  };

  const applyBrandKitToLayers = (layers: KonvaLayer[]): KonvaLayer[] => {
    return layers.map((layer) => {
      if (layer.type === 'text' && layer.isBrandBinding) {
        let bindingValue = layer.text;
        if (layer.isBrandBinding === 'fullName') bindingValue = brandKit.fullName;
        if (layer.isBrandBinding === 'designation') bindingValue = brandKit.designation;
        if (layer.isBrandBinding === 'phone') bindingValue = brandKit.phone;
        if (layer.isBrandBinding === 'email') bindingValue = brandKit.email;
        if (layer.isBrandBinding === 'website') bindingValue = brandKit.website;
        if (layer.isBrandBinding === 'companyName') bindingValue = brandKit.companyName;
        if (layer.isBrandBinding === 'address') bindingValue = brandKit.address;

        return {
          ...layer,
          text: bindingValue,
          fontFamily: brandKit.fontFamily || layer.fontFamily
        };
      }

      if ((layer.type === 'photo' || layer.type === 'image') && layer.isBrandBinding === 'photo') {
        return {
          ...layer,
          url: brandKit.photoUrl || layer.url
        };
      }

      if ((layer.type === 'logo' || layer.type === 'image') && layer.isBrandBinding === 'logo') {
        return {
          ...layer,
          url: brandKit.logoUrl || layer.url
        };
      }

      if (layer.type === 'shape' && layer.isBrandColorBinding) {
        let color = layer.fill;
        if (layer.isBrandColorBinding === 'primary') color = brandKit.primaryColor;
        if (layer.isBrandColorBinding === 'secondary') color = brandKit.secondaryColor;
        if (layer.isBrandColorBinding === 'accent') color = brandKit.accentColor;
        return {
          ...layer,
          fill: color
        };
      }

      return layer;
    });
  };

  return (
    <BrandKitContext.Provider value={{ brandKit, updateBrandKit, applyBrandKitToLayers }}>
      {children}
    </BrandKitContext.Provider>
  );
};

export const useBrandKit = () => {
  const context = useContext(BrandKitContext);
  if (!context) {
    throw new Error('useBrandKit must be used within a BrandKitProvider');
  }
  return context;
};
