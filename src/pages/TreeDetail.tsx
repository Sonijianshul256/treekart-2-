import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mic, ShieldCheck, Droplets, Bug, Sprout, Calendar, Cuboid, X, Share2 } from 'lucide-react';
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
    farmer: 'Ramesh Singh',
    health: { soil: 82, leaf: 94, pest: 12 }
  },
  {
    id: 't2',
    name: "Papaya Petal",
    photoUrl: "https://images.unsplash.com/photo-1614088924036-7c918a36c965?w=500&q=80",
    stage: 80,
    harvestDays: 20,
    harvestMonth: 9, // Oct
    plantedDate: 'Jun 2023',
    farmer: 'Sunita Devi',
    health: { soil: 45, leaf: 76, pest: 35 }
  }
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function ARModal({ tree, onClose }: any) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    let stream: MediaStream | null = null;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(s => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
          }
        })
        .catch(err => console.error("Camera access error", err));
    }

    // Simulate scanning analysis delay
    const timer = setTimeout(() => {
      setIsScanning(false);
    }, 2500);

    return () => {
      clearTimeout(timer);
      if (stream) {
         stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center" style={{overscrollBehavior: 'none'}}>
      {/* Camera Feed Background */}
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        muted 
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />
      
      <div className="absolute top-12 right-6 z-10">
        <button onClick={onClose} className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
          <X size={24} />
        </button>
      </div>

      {isScanning && (
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center">
          <div className="w-64 h-64 border-2 border-green-400/50 rounded-3xl relative">
            <div className="absolute inset-0 bg-green-400/10 animate-pulse rounded-3xl"></div>
            {/* Scanning line */}
            <div className="w-full h-1 bg-green-400 absolute top-0 left-0 animate-[scan_2s_ease-in-out_infinite] shadow-[0_0_8px_rgba(74,222,128,1)]"></div>
            
            {/* Corner markers */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-500 rounded-tl-xl"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-500 rounded-tr-xl"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-500 rounded-bl-xl"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-500 rounded-br-xl"></div>
          </div>
          <div className="mt-8 text-white font-mono bg-black/40 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 animate-pulse">
            Analyzing {tree.name} via computer vision...
          </div>
        </div>
      )}

      {!isScanning && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          {/* AR Floating Marker 1 - Leaves */}
          <div className="absolute top-[25%] right-[20%] flex items-center animate-in zoom-in duration-500">
            <div className="w-24 h-[1px] bg-white/50 -mr-1"></div>
            <div className="bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl shadow-lg border-l-4 border-green-500">
              <div className="flex items-center gap-2 mb-1">
                <Sprout size={14} className="text-green-600" />
                <span className="text-xs font-bold font-mono text-gray-800">Leaves: {tree.health.leaf}%</span>
              </div>
              <p className="text-[9px] text-gray-500">Chlorophyll levels optimal.<br/>No signs of nutrient deficiency.</p>
            </div>
          </div>

          {/* AR Floating Marker 2 - Pest */}
          <div className="absolute top-[50%] left-[10%] flex items-center animate-in zoom-in delay-150 duration-500 fill-mode-both">
            <div className="bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl shadow-lg border-l-4 border-amber-500 z-10">
              <div className="flex items-center gap-2 mb-1">
                <Bug size={14} className="text-amber-600" />
                <span className="text-xs font-bold font-mono text-gray-800">Pest Risk: {tree.health.pest}%</span>
              </div>
              <p className="text-[9px] text-gray-500">Minimal insect damage detected.<br/>Stem structure is sound.</p>
            </div>
            <div className="w-16 h-[1px] bg-white/50 -ml-1"></div>
            {/* Target Ring */}
            <div className="w-8 h-8 rounded-full border-2 border-amber-400 border-dashed animate-[spin_4s_linear_infinite]"></div>
          </div>

          {/* AR Floating Marker 3 - Soil */}
          <div className="absolute bottom-[20%] right-[30%] flex items-center flex-col animate-in zoom-in delay-300 duration-500 fill-mode-both">
            {/* Target Ring */}
            <div className="w-12 h-12 rounded-[50%] border-2 border-blue-400 transform rotate-X-60 mb-2 skeleton ring-4 ring-blue-400/20"></div>
            <div className="h-8 w-[1px] bg-white/50 mb-1"></div>
            <div className="bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl shadow-lg border-t-4 border-blue-500">
              <div className="flex items-center gap-2 mb-1">
                <Droplets size={14} className="text-blue-600" />
                <span className="text-xs font-bold font-mono text-gray-800">Moisture: {tree.health.soil}%</span>
              </div>
              <p className="text-[9px] text-gray-500">Soil moisture is at good levels.</p>
            </div>
          </div>

          <div className="absolute bottom-10 left-10 right-10 text-center">
            <div className="inline-block bg-black/50 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 text-white shadow-xl">
              <ShieldCheck className="w-5 h-5 inline-block mr-2 text-green-400" />
              <span className="font-heading font-medium tracking-wide">Analysis Complete: Tree is Healthy</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TreeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tree = MOCK_ORCHARD.find(t => t.id === id) || MOCK_ORCHARD[0];
  const [showAR, setShowAR] = useState(false);
  const [showRentModal, setShowRentModal] = useState(false);

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
          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: `Rent ${tree.name}`,
                    text: `Check out ${tree.name} on the farm!`,
                    url: window.location.href,
                  }).catch(console.error);
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }
              }}
              className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white"
            >
              <Share2 size={18} />
            </button>
            <button 
              onClick={() => setShowAR(true)} 
              className="px-4 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white font-semibold text-sm gap-2"
            >
              <Cuboid size={16} />
              View in AR
            </button>
          </div>
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
             <div className="bg-white rounded-[20px] p-3 border border-stone-100 shadow-sm flex flex-col items-center justify-center">
               <div className={`w-12 h-12 rounded-full border-4 ${tree.health.soil < 50 ? 'border-[#F4B942]/20' : 'border-[#2E7D32]/20'} flex items-center justify-center relative`}>
                 <svg className="absolute inset-[-4px] -rotate-90" viewBox="0 0 100 100">
                   <circle cx="50" cy="50" r="40" fill="transparent" stroke={tree.health.soil < 50 ? "#F4B942" : "#2E7D32"} strokeWidth="8" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * tree.health.soil) / 100} strokeLinecap="round" />
                 </svg>
                 <span className="text-xs font-mono font-bold leading-none">{tree.health.soil}%</span>
               </div>
               <span className="text-[9px] mt-2 uppercase tracking-widest text-[#6B6B6B] font-bold text-center">Moisture</span>
             </div>
             <div className="bg-white rounded-[20px] p-3 border border-stone-100 shadow-sm flex flex-col items-center justify-center">
               <div className={`w-12 h-12 rounded-full border-4 ${tree.health.pest > 30 ? 'border-[#FF8C42]/20' : 'border-[#1A5F5A]/20'} flex items-center justify-center relative`}>
                  <svg className="absolute inset-[-4px] -rotate-90" viewBox="0 0 100 100">
                   <circle cx="50" cy="50" r="40" fill="transparent" stroke={tree.health.pest > 30 ? "#FF8C42" : "#1A5F5A"} strokeWidth="8" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * tree.health.pest) / 100} strokeLinecap="round" />
                 </svg>
                 <span className="text-xs font-mono font-bold leading-none">{tree.health.pest}%</span>
               </div>
               <span className="text-[9px] mt-2 uppercase tracking-widest text-[#6B6B6B] font-bold text-center">Pest Risk</span>
             </div>
             <div className="bg-white rounded-[20px] p-3 border border-stone-100 shadow-sm flex flex-col items-center justify-center">
               <div className={`w-12 h-12 rounded-full border-4 border-[#2E7D32]/20 flex items-center justify-center relative`}>
                 <svg className="absolute inset-[-4px] -rotate-90" viewBox="0 0 100 100">
                   <circle cx="50" cy="50" r="40" fill="transparent" stroke="#2E7D32" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * tree.health.leaf) / 100} strokeLinecap="round" />
                 </svg>
                 <span className="text-xs font-mono font-bold leading-none">{tree.health.leaf}%</span>
               </div>
               <span className="text-[9px] mt-2 uppercase tracking-widest text-[#6B6B6B] font-bold text-center">Vitality</span>
             </div>
           </div>
        </div>

        {/* Rent Tree Action */}
        <div>
          <button 
            onClick={() => setShowRentModal(true)}
            className="w-full py-4 bg-gradient-to-r from-[#2E7D32] to-[#1A5F5A] text-white rounded-2xl font-bold shadow-lg shadow-[#1A5F5A]/20 flex items-center justify-center gap-2 transform active:scale-[0.98] transition-all"
          >
            <Sprout size={20} />
            Rent {tree.name}
          </button>
        </div>

        {/* Farmer's Voice Note */}
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

        {/* Daily Photos & Updates */}
        <div>
          <h3 className="font-heading font-semibold text-lg mb-4 text-[#2D2D2D]">Daily Photos & Updates</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-16 flex flex-col items-center">
                <div className="text-xs font-bold text-[#2D2D2D]">Today</div>
                <div className="text-[10px] text-[#6B6B6B]">10:00 AM</div>
                <div className="w-0.5 h-full bg-stone-200 mt-2"></div>
              </div>
              <div className="flex-1 bg-white p-3 rounded-2xl border border-stone-100 shadow-sm mb-2">
                <div className="h-32 rounded-xl bg-stone-100 mb-2 overflow-hidden relative">
                  <img src={tree.photoUrl} alt="Tree today" className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md px-2 py-1 rounded-md text-[10px] text-white">New Leaves 🌿</div>
                </div>
                <p className="text-xs text-[#6B6B6B]">Good morning! We noticed some fresh leaf growth today. The recent watering schedule is working perfectly.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-16 flex flex-col items-center">
                <div className="text-xs font-bold text-[#6B6B6B]">Yesterday</div>
                <div className="text-[10px] text-[#6B6B6B]">04:30 PM</div>
                <div className="w-0.5 h-8 bg-stone-200 mt-2"></div>
              </div>
              <div className="flex-1 bg-blue-50/50 p-3 rounded-2xl border border-blue-100 shadow-sm mb-2">
                <div className="flex items-center gap-2 mb-1">
                  <Droplets size={14} className="text-blue-500" />
                  <span className="text-xs font-bold text-blue-700">Irrigation Completed</span>
                </div>
                <p className="text-xs text-[#6B6B6B]">Applied 5 liters of water mixed with organic nutrient compost.</p>
              </div>
            </div>
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
        <ARModal tree={tree} onClose={() => setShowAR(false)} />
      )}

      {/* Rent Confirmation Modal Overlay */}
      {showRentModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm shadow-2xl animate-in fade-in duration-300">
          <div className="bg-white rounded-[24px] w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="relative h-32 bg-stone-100">
              <div 
                className="absolute inset-0 opacity-40 blur-[2px]" 
                style={{backgroundImage: `url(${tree.photoUrl})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
              <div className="absolute top-4 right-4">
                <button onClick={() => setShowRentModal(false)} className="w-8 h-8 bg-white/50 rounded-full flex items-center justify-center text-stone-600">
                  <X size={18} />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 w-full p-4 flex justify-center">
                <div className="w-16 h-16 bg-white rounded-full border-4 border-white shadow-sm flex items-center justify-center text-[#2E7D32]">
                  <Sprout size={28} />
                </div>
              </div>
            </div>
            
            <div className="p-6 text-center">
              <h2 className="text-xl font-heading font-bold text-[#2D2D2D] mb-2">Rent {tree.name}?</h2>
              <p className="text-sm text-[#6B6B6B] mb-6">You will become the remote caretaker of this tree. Receive regular health updates, a share of the harvest, and direct access to farmer {tree.farmer}.</p>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => {
                    // Logic to proceed with renting
                    setShowRentModal(false);
                    // Could navigate to payment page here
                  }}
                  className="w-full py-4 bg-[#1A5F5A] text-white rounded-2xl font-bold shadow-md active:scale-95 transition-transform"
                >
                  Proceed to Payment
                </button>
                <button 
                  onClick={() => setShowRentModal(false)}
                  className="w-full py-4 bg-stone-100 text-[#6B6B6B] rounded-2xl font-bold active:scale-95 transition-transform"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
