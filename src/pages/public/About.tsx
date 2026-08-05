import React from 'react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Shield, Target, Eye, Award, Users, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      <Breadcrumbs />

      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-600/10 text-blue-400 border border-blue-500/30 text-xs font-bold">
          <Shield className="w-4 h-4 text-blue-400" /> About Insurance Marketing Hub
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Empowering Insurance Advisors with <span className="text-gradient">World-Class Marketing</span>
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          Insurance Marketing Hub (IMH) was created to bridge the digital gap for insurance advisors, agents, and branch managers. We turn complex design into a single-click personalization experience.
        </p>
      </div>

      {/* Story, Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Our Mission</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            To provide every insurance professional with high-converting, branded marketing designs in under 30 seconds.
          </p>
        </div>

        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600/10 text-purple-400 flex items-center justify-center">
            <Eye className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Our Vision</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            To become the global standard marketing operating system for financial consultants and agency teams.
          </p>
        </div>

        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/10 text-emerald-400 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Core Values</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Simplicity, speed, security, and enterprise-grade reliability in every template we publish.
          </p>
        </div>
      </div>
    </div>
  );
};
