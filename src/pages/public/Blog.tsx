import React, { useState } from 'react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { BookOpen, Clock, User, ArrowRight, X } from 'lucide-react';
import { MOCK_BLOGS } from '../../data/mockData';
import { BlogPost } from '../../types';

export const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumbs />

      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Insurance Marketing <span className="text-gradient">Blog & Insights</span>
        </h1>
        <p className="text-sm text-slate-300">
          Learn proven lead generation tactics, branding secrets, and social media growth strategies for insurance agents.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {MOCK_BLOGS.map((post) => (
          <div
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="group bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-blue-500/50 cursor-pointer transition flex flex-col justify-between"
          >
            <div className="aspect-video w-full overflow-hidden bg-slate-950">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-600/20 text-blue-400 font-semibold">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {post.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={post.author.avatar} alt={post.author.name} className="w-7 h-7 rounded-full object-cover" />
                  <span className="text-xs font-semibold text-slate-300">{post.author.name}</span>
                </div>
                <span className="text-xs font-bold text-blue-400 flex items-center gap-1">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for full blog reader */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-[#0B1220] border border-slate-800 rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">{selectedPost.category}</span>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 className="text-2xl font-extrabold text-white">{selectedPost.title}</h2>
            <img src={selectedPost.coverImage} alt={selectedPost.title} className="w-full h-64 object-cover rounded-2xl" />

            <div className="text-sm text-slate-300 leading-relaxed space-y-4 font-normal">
              <p>{selectedPost.content}</p>
              <p>
                By maintaining a consistent visual identity on WhatsApp status, Instagram stories, and Facebook groups, advisors build unmatched brand authority over time.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
