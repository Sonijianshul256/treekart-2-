import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Plus } from 'lucide-react';
import { cn } from '../lib/utils';
import { useStore } from '../store/useStore';

const POSTS = [
  {
    id: 1,
    author: "Ravi Sharma",
    avatar: "https://i.pravatar.cc/150?u=1",
    treeType: "Papaya",
    time: "2 hours ago",
    content: "Look at this beauty! My first harvest is almost ready. Can't wait! 🌾",
    image: "https://images.unsplash.com/photo-1614088924036-7c918a36c965?w=500&q=80",
    likes: 24,
    comments: 5
  },
  {
    id: 2,
    author: "Anita Patel",
    avatar: "https://i.pravatar.cc/150?u=2",
    treeType: "Mango",
    time: "5 hours ago",
    content: "Made the best raw mango chutney today using my first batch! Check out the recipe in the Recipes tab. 🥭",
    image: "https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=500&q=80",
    likes: 112,
    comments: 14
  }
];

export default function Community() {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Harvests', 'Recipes', 'Challenges'];

  return (
    <div className="relative w-full h-full pb-20 bg-[#F5F5F3]">
      {/* Header */}
      <div className="bg-surface pt-12 pb-4 px-4 sticky top-0 z-30 shadow-sm">
        <h1 className="text-2xl font-bold font-heading mb-4 text-primary">Community Feed</h1>
        
        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 snap-x">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap snap-center transition-colors",
                activeTab === tab ? "bg-primary text-white shadow-md" : "bg-gray-100 text-text-sub hover:bg-gray-200"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Feed Content */}
      <div className="p-4 space-y-4">
        {POSTS.map(post => (
          <div key={post.id} className="bg-surface rounded-3xl p-4 shadow-sm border border-gray-100">
            {/* Post Header */}
            <div className="flex items-center gap-3 mb-3">
              <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h3 className="font-semibold text-sm text-text-main">{post.author}</h3>
                <div className="text-[10px] text-text-sub flex items-center gap-1.5">
                  <span>{post.time}</span>
                  <span>•</span>
                  <span className="bg-orange-50 text-orange-600 px-1.5 rounded-md font-medium tracking-wide border border-orange-100">{post.treeType}</span>
                </div>
              </div>
            </div>

            {/* Post Content */}
            <p className="text-sm text-text-main mb-3 leading-relaxed">{post.content}</p>
            
            {/* Post Image */}
            <div className="rounded-2xl overflow-hidden mb-4 border border-gray-50">
              <img src={post.image} alt="Post content" className="w-full h-[200px] object-cover" />
            </div>

            {/* Post Actions */}
            <div className="flex items-center gap-6 border-t border-gray-100 pt-3 text-text-sub">
              <button className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors">
                <Heart size={18} />
                <span className="font-medium text-xs">{post.likes}</span>
              </button>
              <button className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors">
                <MessageCircle size={18} />
                <span className="font-medium text-xs">{post.comments}</span>
              </button>
              <button className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors ml-auto">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Post FAB */}
      <button className="fixed bottom-[85px] right-4 w-14 h-14 bg-secondary text-white rounded-full shadow-xl shadow-secondary/30 flex items-center justify-center z-50 hover:scale-105 transition-transform active:scale-95">
        <Plus size={28} />
      </button>
    </div>
  );
}
