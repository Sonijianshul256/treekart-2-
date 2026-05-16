import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Settings, Leaf, Share2, Mic, Droplets, Bug, Sprout } from 'lucide-react';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

const MOCK_ORCHARD = [
  {
    id: 't1',
    name: "Mango Magic",
    photoUrl: "https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=500&q=80",
    stage: 40,
    harvestDays: 120,
    health: { soil: 'Good', leaf: 'Perfect', pest: 'Low' }
  },
  {
    id: 't2',
    name: "Papaya Petal",
    photoUrl: "https://images.unsplash.com/photo-1614088924036-7c918a36c965?w=500&q=80",
    stage: 80,
    harvestDays: 20,
    health: { soil: 'Dry', leaf: 'Good', pest: 'None' }
  }
];

export default function Orchard() {
  const { user } = useStore();
  const navigate = useNavigate();
  const [showQRScanner, setShowQRScanner] = useState(false);

  return (
    <div className="relative w-full h-full pb-20">
      {/* Header */}
      <div className="bg-[#FCF9F2]/80 backdrop-blur-md pt-12 pb-6 px-6 sticky top-0 z-30">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-[#6B6B6B] text-[10px] uppercase tracking-widest font-bold">Welcome back,</h2>
            <h1 className="text-3xl font-bold font-heading text-[#1A5F5A] leading-none mt-1">{user?.name || 'Tree Parent'}</h1>
          </div>
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-stone-200 text-[#1A5F5A]">
            <Settings size={20} />
          </button>
        </div>
        
        <div className="bg-white rounded-[24px] border border-stone-100 p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#2E7D32]/10 rounded-full flex items-center justify-center text-[#2E7D32]">
              <Leaf size={20} />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-[#6B6B6B] font-bold mb-1">Carbon Saved</div>
              <div className="text-2xl font-mono font-bold text-[#2D2D2D]">24.5 <span className="text-sm font-sans font-normal text-[#6B6B6B]">kg</span></div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-widest text-[#6B6B6B] font-bold mb-1">Equivalents</div>
            <div className="text-sm font-medium text-[#2D2D2D]">🚗 -80 km</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 pt-6">
        <h3 className="font-heading font-semibold text-lg mb-4 text-text-main">Your Trees</h3>
        
        {/* Horizontal Scroll */}
        <div className="flex gap-6 overflow-x-auto pb-6 snap-x -mx-4 px-4 scrollbar-hide">
          {MOCK_ORCHARD.map(tree => (
            <div 
              key={tree.id} 
              onClick={() => navigate(`/orchard/${tree.id}`)}
              className="min-w-[280px] w-[85vw] max-w-[340px] flex flex-col space-y-5 snap-center flex-shrink-0 cursor-pointer group"
              // In reality we would navigate to specific tree details
            >
              {/* Card Top / Hero */}
              <div className="relative h-[280px] w-full bg-white rounded-[40px] shadow-sm border border-stone-100 overflow-hidden">
                <div className="absolute inset-0 bg-[#E8EAE0] overflow-hidden">
                   <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(#1A5F5A 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
                   <div className="absolute inset-0" style={{backgroundImage: `url(${tree.photoUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.8}}></div>
                   <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-[#1A5F5A]/90 to-transparent mix-blend-multiply"></div>
                </div>
                
                <div className="relative h-full p-6 flex flex-col justify-end text-white">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <span className="bg-[#FF8C42] text-white text-[10px] px-3 py-1.5 rounded-full uppercase tracking-widest font-bold mb-3 inline-block">Planted 2023</span>
                      <h1 className="text-3xl font-bold leading-tight font-heading shadow-sm">{tree.name}</h1>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-mono font-light leading-none">{tree.harvestDays}</div>
                      <div className="text-[9px] uppercase tracking-tighter opacity-90 font-mono mt-1">Days to Harvest</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden mt-2">
                    <div className="h-full bg-[#FF8C42] rounded-full shadow-[0_0_10px_rgba(255,140,66,0.5)] transition-all duration-500" style={{width: `${tree.stage}%`}}></div>
                  </div>
                  <div className="flex justify-between text-[10px] mt-2 font-mono opacity-80">
                    <span>Growth stage</span>
                    <span>{tree.stage}%</span>
                  </div>
                </div>
              </div>

              {/* Health Gauges Row */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white rounded-3xl p-4 border border-stone-100 shadow-sm flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center relative ${tree.health.soil === 'Dry' ? 'border-[#F4B942]/40 text-[#F4B942]' : 'border-[#2E7D32]/20 text-[#2E7D32]'}`}>
                    <span className="text-xs font-mono font-bold leading-none">{tree.health.soil === 'Dry' ? 'Dry' : 'OK'}</span>
                  </div>
                  <span className="text-[9px] mt-3 uppercase tracking-widest text-[#6B6B6B] font-bold text-center">Soil Moisture</span>
                </div>
                <div className="bg-white rounded-3xl p-4 border border-stone-100 shadow-sm flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border-4 border-[#1A5F5A]/20 flex items-center justify-center relative text-[#1A5F5A]">
                    <span className="text-xs font-mono font-bold leading-none">{tree.health.pest}</span>
                  </div>
                  <span className="text-[9px] mt-3 uppercase tracking-widest text-[#6B6B6B] font-bold text-center">Pest Risk</span>
                </div>
                <div className="bg-white rounded-3xl p-4 border border-stone-100 shadow-sm flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#1A5F5A]/10 flex items-center justify-center text-[#1A5F5A]">
                    <Sprout size={18} />
                  </div>
                  <span className="text-[9px] mt-3 uppercase tracking-widest text-[#6B6B6B] font-bold text-center">Leaf Health</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Farm Updates Section */}
        <div className="mt-8 mb-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#6B6B6B] mb-4 pl-2">Farmer's Voice</h3>
          <div className="flex-1 bg-white rounded-[24px] p-6 border border-stone-100 shadow-sm overflow-hidden">
            <div className="flex items-center space-x-4 bg-stone-50 p-4 rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-stone-200 overflow-hidden border border-white">
                <div className="w-full h-full bg-[#1A5F5A]/20"></div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[11px] font-bold text-[#2D2D2D]">Ram Singh • Farm Manager</span>
                  <span className="text-[9px] text-[#6B6B6B]">2h ago</span>
                </div>
                <div className="flex space-x-0.5 items-end h-6">
                  <div className="w-1 h-3 bg-[#1A5F5A] rounded-full"></div>
                  <div className="w-1 h-5 bg-[#1A5F5A] rounded-full"></div>
                  <div className="w-1 h-4 bg-[#1A5F5A] rounded-full"></div>
                  <div className="w-1 h-2 bg-[#1A5F5A] rounded-full"></div>
                  <div className="w-1 h-6 bg-[#1A5F5A] rounded-full"></div>
                  <div className="w-1 h-3 bg-[#1A5F5A] rounded-full"></div>
                  <div className="w-1 h-5 bg-[#1A5F5A] rounded-full"></div>
                  <div className="w-1 h-2 bg-[#1A5F5A] rounded-full"></div>
                  <div className="w-1 h-4 bg-[#1A5F5A] rounded-full"></div>
                  <div className="w-1 h-3 bg-[#1A5F5A] rounded-full"></div>
                </div>
              </div>
              <button className="w-8 h-8 rounded-full bg-[#1A5F5A] text-white flex items-center justify-center shadow-md">
                <Mic size={14} />
              </button>
            </div>
            <p className="mt-4 text-xs text-[#6B6B6B] italic leading-relaxed">"Today the blossoms are reaching full potential. The organic mulch is doing wonders for moisture retention in this heat. We spotted some mealybugs but the neem spray handled it."</p>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={() => setShowQRScanner(true)}
        className="fixed bottom-[85px] right-4 w-14 h-14 bg-primary text-white rounded-full shadow-xl flex items-center justify-center z-50 hover:bg-primary-light transition-colors active:scale-95 border-[3px] border-surface"
      >
        <Leaf size={24} />
      </button>

      {/* Fake QR Scanner Modal */}
      {showQRScanner && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col">
          <div className="flex-1 border-4 border-dashed border-white/20 m-12 relative flex items-center justify-center">
            <div className="w-48 h-48 border-2 border-primary border-t-0 border-l-0 absolute bottom-0 right-0" />
            <div className="w-48 h-48 border-2 border-primary border-t-0 border-r-0 absolute bottom-0 left-0" />
            <div className="w-48 h-48 border-2 border-primary border-b-0 border-l-0 absolute top-0 left-0" />
            <div className="w-48 h-48 border-2 border-primary border-b-0 border-r-0 absolute top-0 right-0" />
            <p className="text-white bg-black/50 px-4 py-2 rounded-full">Scanning farm tag...</p>
          </div>
          <button 
            onClick={() => setShowQRScanner(false)}
            className="mb-safe pb-8 pt-4 text-white hover:text-gray-300"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
