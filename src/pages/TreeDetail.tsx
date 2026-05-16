import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mic, ShieldCheck, Droplets, Bug, Sprout, Calendar, Cuboid, X } from 'lucide-react';
import { cn } from '../lib/utils';

const MOCK_ORCHARD = [
  {
    id: 't1',
    name: "Mango Magic",
    photoUrl: "https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=500&q=80",
    stage: 40,
    harvestDays: 120,
    harvestMonth: 4, // 0-indexed, May
    plantedDate: 'Jan 2023',
    health: { soil: 'Good', leaf: 'Perfect', pest: 'Low' }
  },
  {
    id: 't2',
    name: "Papaya Petal",
    photoUrl: "https://images.unsplash.com/photo-1614088924036-7c918a36c965?w=500&q=80",
    stage: 80,
    harvestDays: 20,
    harvestMonth: 9, // Oct
    plantedDate: 'Jun 2023',
    health: { soil: 'Dry', leaf: 'Good', pest: 'None' }
  }
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function TreeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tree = MOCK_ORCHARD.find(t => t.id === id) || MOCK_ORCHARD[0];
  const [showAR, setShowAR] = useState(false);
  const [growthMonth, setGrowthMonth] = useState<3 | 6 | 12>(3);

  return (
    <div className="relative w-full h-full pb-20 bg-[#F5F5F3] overflow-y-auto">
      {/* Header / Parallax Image */}
      <div className="relative h-72 w-full bg-stone-200">
        <div className="absolute inset-0" style={{backgroundImage: `url(${tree.photoUrl})`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        <div className="absolute top-0 left-0 right-0 p-4 pt-12 flex justify-between items-center z-10">
          <button 
            onClick={() => navigate(-1)} 
            className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <button 
            onClick={() => setShowAR(true)} 
            className="px-4 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white font-semibold text-sm gap-2"
          >
            <Cuboid size={16} />
            View in AR
          </button>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <span className="bg-[#FF8C42] text-white text-[10px] px-3 py-1.5 rounded-full uppercase tracking-widest font-bold mb-3 inline-block">Planted {tree.plantedDate}</span>
          <h1 className="text-4xl font-bold leading-tight font-heading text-white">{tree.name}</h1>
        </div>
      </div>

      <div className="p-6 -mt-4 relative z-20 bg-surface rounded-t-[30px] flex flex-col space-y-8">
        
        {/* Harvest Countdown */}
        <div className="flex justify-between items-center bg-[#1A5F5A] p-6 rounded-[24px] text-white shadow-lg shadow-[#1A5F5A]/20">
          <div>
            <p className="text-[10px] uppercase tracking-widest opacity-70 font-bold mb-1">Time to Harvest</p>
            <p className="text-4xl font-bold font-mono text-[#FF8C42]">{tree.harvestDays}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest opacity-70 font-bold mb-1">Growth</p>
            <p className="text-2xl font-bold font-mono">{tree.stage}%</p>
          </div>
        </div>

        {/* Harvest Calendar */}
        <div>
          <h3 className="font-heading font-semibold text-lg mb-4 text-[#2D2D2D] flex items-center gap-2">
            <Calendar size={20} className="text-[#1A5F5A]" />
            Harvest Calendar
          </h3>
          <div className="bg-white p-6 rounded-[24px] border border-stone-100 shadow-sm">
            <p className="text-xs text-[#6B6B6B] mb-4">Estimated harvest month highlighted below.</p>
            <div className="grid grid-cols-4 gap-3">
              {MONTHS.map((month, idx) => (
                <div 
                  key={month}
                  className={cn(
                    "py-3 rounded-2xl text-center text-sm font-semibold transition-colors",
                    idx === tree.harvestMonth 
                      ? "bg-[#FF8C42] text-white shadow-md shadow-[#FF8C42]/30" 
                      : "bg-stone-50 text-[#6B6B6B] border border-stone-100"
                  )}
                >
                  {month}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Health Gauges */}
        <div>
           <h3 className="font-heading font-semibold text-lg mb-4 text-[#2D2D2D]">Tree Health</h3>
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

        {/* Voice Note */}
        <div>
          <h3 className="font-heading font-semibold text-lg mb-4 text-[#2D2D2D]">Farmer's Voice Note</h3>
          <div className="flex items-center space-x-4 bg-stone-50 p-4 rounded-3xl border border-stone-100">
            <div className="w-12 h-12 rounded-full bg-stone-200 overflow-hidden border border-white flex-shrink-0">
              <div className="w-full h-full bg-[#1A5F5A]/20"></div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[12px] font-bold text-[#2D2D2D]">Ram Singh</span>
                <span className="text-[10px] text-[#6B6B6B]">Oct 12</span>
              </div>
              <div className="flex space-x-1 items-end h-8">
                  <div className="w-1.5 h-3 bg-[#1A5F5A] rounded-full opacity-60"></div>
                  <div className="w-1.5 h-6 bg-[#1A5F5A] rounded-full"></div>
                  <div className="w-1.5 h-4 bg-[#1A5F5A] rounded-full opacity-80"></div>
                  <div className="w-1.5 h-8 bg-[#1A5F5A] rounded-full"></div>
                  <div className="w-1.5 h-5 bg-[#1A5F5A] rounded-full opacity-70"></div>
                  <div className="w-1.5 h-7 bg-[#1A5F5A] rounded-full"></div>
                  <div className="w-1.5 h-3 bg-[#1A5F5A] rounded-full opacity-50"></div>
                  <div className="w-1.5 h-6 bg-[#1A5F5A] rounded-full opacity-90"></div>
                  <div className="w-1.5 h-2 bg-[#1A5F5A] rounded-full opacity-40"></div>
                  <div className="w-1.5 h-4 bg-[#1A5F5A] rounded-full opacity-80"></div>
              </div>
            </div>
            <button className="w-10 h-10 rounded-full bg-[#1A5F5A] text-white flex items-center justify-center shadow-md flex-shrink-0">
              <Mic size={16} />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col gap-3">
          <button className="w-full py-4 bg-[#1A5F5A] text-white rounded-full font-bold shadow-sm shadow-[#1A5F5A]/20 flex items-center justify-center gap-2" onClick={() => setShowAR(true)}>
            <Cuboid size={18} />
            View in AR
          </button>
          <button className="w-full py-4 bg-white border border-stone-200 rounded-full text-[#1A5F5A] font-bold shadow-sm flex items-center justify-center gap-2">
            <ShieldCheck size={18} />
            View Blockchain Log
          </button>
          <button 
            onClick={() => navigate('/learn')}
            className="w-full py-4 bg-[#F2F7F2] text-[#2E7D32] rounded-full font-bold shadow-sm"
          >
            See How It's Grown
          </button>
        </div>

      </div>

      {/* AR Modal Overlay */}
      {showAR && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center backdrop-blur-md" style={{overscrollBehavior: 'none'}}>
          <div className="absolute top-12 right-6">
            <button onClick={() => setShowAR(false)} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white">
              <X size={24} />
            </button>
          </div>
          
          <div className="flex-1 w-full relative flex items-center justify-center">
            {/* Fake AR Camera View / 3D Model placeholder */}
            <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden">
               {/* Ground plane */}
               <div className="absolute bottom-1/4 w-64 h-16 bg-white/10 rounded-[100%] blur-sm transform perspective-1000 rotateX-60"></div>
               
               {/* Fake 3D Tree representation depending on growth month */}
               <div className="relative flex flex-col items-center transition-all duration-700 ease-in-out" 
                    style={{
                      transform: `scale(${growthMonth === 3 ? 0.6 : growthMonth === 6 ? 0.8 : 1})`,
                    }}>
                 {/* Leaves */}
                 <div className="w-48 h-48 bg-gradient-to-br from-[#2E7D32] to-[#1A5F5A] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] shadow-2xl relative animate-pulse flex items-center justify-center">
                   <div className="absolute w-32 h-32 bg-gradient-to-tl from-[#2E7D32] to-[#4CAF50] rounded-[60%_40%_30%_70%/60%_30%_70%_40%] left-[-20px] top-[10px]"></div>
                   <div className="absolute w-36 h-36 bg-gradient-to-tr from-[#1A5F5A] to-[#388E3C] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] right-[-10px] top-[-20px]"></div>
                   
                   {/* Fruits (Mango/Papaya) showing at 12 months */}
                   {growthMonth >= 6 && tree.name.includes('Mango') && (
                     <>
                        <div className="absolute w-6 h-8 bg-gradient-to-b from-[#FFC107] to-[#FF9800] rounded-[50%_50%_50%_50%/60%_60%_40%_40%] right-8 bottom-8 shadow-inner z-10 transition-all"></div>
                        <div className="absolute w-5 h-7 bg-gradient-to-b from-[#FFC107] to-[#FF9800] rounded-[50%_50%_50%_50%/60%_60%_40%_40%] left-10 bottom-12 shadow-inner z-10 transition-all"></div>
                     </>
                   )}
                 </div>
                 {/* Trunk */}
                 <div className="w-8 h-32 bg-gradient-to-b from-[#795548] to-[#5D4037] mt-[-20px] z-[-1] rounded-sm shadow-inner relative"></div>
               </div>

               <div className="mt-8 text-white text-center">
                 <h2 className="text-xl font-heading font-bold tracking-wider">{tree.name} <span className="opacity-70 font-normal">in AR</span></h2>
                 <p className="text-sm opacity-70">Point camera at flat surface</p>
               </div>
            </div>
          </div>

          {/* Growth Slider Controls */}
          <div className="w-full p-8 bg-gradient-to-t from-black to-transparent">
            <div className="mb-4 text-center">
               <span className="text-white text-sm font-semibold uppercase tracking-widest opacity-80">Growth Preview</span>
            </div>
            <div className="flex bg-white/20 p-1.5 rounded-full backdrop-blur-md relative overflow-hidden">
              <div 
                className="absolute top-1.5 bottom-1.5 bg-white rounded-full transition-all duration-300 shadow-md"
                style={{
                  width: 'calc(33.333% - 4px)',
                  transform: `translateX(${growthMonth === 3 ? '0' : growthMonth === 6 ? '100%' : '200%'})`,
                  left: growthMonth === 3 ? '6px' : growthMonth === 6 ? '8px' : '10px'
                }}
              />
              <button 
                onClick={() => setGrowthMonth(3)} 
                className={`flex-1 py-3 text-center text-sm font-semibold rounded-full relative z-10 transition-colors ${growthMonth === 3 ? 'text-black' : 'text-white'}`}
              >
                3 Months
              </button>
              <button 
                onClick={() => setGrowthMonth(6)} 
                className={`flex-1 py-3 text-center text-sm font-semibold rounded-full relative z-10 transition-colors ${growthMonth === 6 ? 'text-black' : 'text-white'}`}
              >
                6 Months
              </button>
              <button 
                onClick={() => setGrowthMonth(12)} 
                className={`flex-1 py-3 text-center text-sm font-semibold rounded-full relative z-10 transition-colors ${growthMonth === 12 ? 'text-black' : 'text-white'}`}
              >
                12 Months
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
