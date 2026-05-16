import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Settings, Leaf, Share2, Mic, Droplets, Bug, Sprout, TrendingUp, Bell, AlertTriangle, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MOCK_ORCHARD = [
  {
    id: 't1',
    name: "Mango Magic",
    photoUrl: "https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=500&q=80",
    stage: 40,
    harvestDays: 120,
    health: { soil: 82, leaf: 94, pest: 12 }
  },
  {
    id: 't2',
    name: "Papaya Petal",
    photoUrl: "https://images.unsplash.com/photo-1614088924036-7c918a36c965?w=500&q=80",
    stage: 80,
    harvestDays: 20,
    health: { soil: 45, leaf: 76, pest: 35 }
  }
];

const HISTORICAL_DATA = [
  { month: 'Jan', soilMoisture: 65, overallHealth: 80 },
  { month: 'Feb', soilMoisture: 70, overallHealth: 82 },
  { month: 'Mar', soilMoisture: 58, overallHealth: 79 },
  { month: 'Apr', soilMoisture: 75, overallHealth: 85 },
  { month: 'May', soilMoisture: 82, overallHealth: 88 },
  { month: 'Jun', soilMoisture: 78, overallHealth: 90 },
];

export default function Orchard() {
  const { user } = useStore();
  const navigate = useNavigate();
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'critical', title: 'Low Moisture Alert', message: 'Tree "Papaya Petal" soil moisture dropped below 50%.', read: false, time: '10m ago' },
    { id: 2, type: 'warning', title: 'High Pest Risk', message: 'Seasonal pests detected near your sector. Applying organic neem oil.', read: false, time: '2h ago' }
  ]);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="relative w-full h-full pb-20 overflow-x-hidden">
      {/* Header */}
      <div className="bg-[#FCF9F2]/80 backdrop-blur-md pt-12 pb-6 px-6 sticky top-0 z-30">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-[#6B6B6B] text-[10px] uppercase tracking-widest font-bold">Welcome back,</h2>
            <h1 className="text-3xl font-bold font-heading text-[#1A5F5A] leading-none mt-1">{user?.name || 'Tree Parent'}</h1>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-stone-200 text-[#1A5F5A] hover:bg-stone-50 transition-colors"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
              )}
            </button>
            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-stone-200 text-[#1A5F5A] hover:bg-stone-50 transition-colors">
              <Settings size={20} />
            </button>
          </div>
        </div>
        
        {/* Notifications Panel */}
        {showNotifications && (
          <div className="absolute top-28 left-4 right-4 bg-white rounded-[24px] shadow-2xl border border-stone-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="p-4 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
              <h3 className="font-bold text-[#2D2D2D] text-sm">Notifications</h3>
              {unreadCount > 0 && (
                <button onClick={markAllAsRead} className="text-[10px] text-[#1A5F5A] font-bold uppercase tracking-widest hover:underline">
                  Mark all read
                </button>
              )}
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-stone-500 text-sm">No new notifications</div>
              ) : (
                notifications.map(n => (
                  <div 
                    key={n.id} 
                    onClick={() => markAsRead(n.id)}
                    className={cn(
                      "p-4 border-b border-stone-50 flex gap-3 transition-colors cursor-pointer",
                      !n.read ? "bg-blue-50/30" : "opacity-75"
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                      n.type === 'critical' ? "bg-red-100 text-red-600" : "bg-orange-100 text-orange-600"
                    )}>
                      {n.type === 'critical' ? <AlertTriangle size={16} /> : <Bug size={16} />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className={cn("text-xs font-bold", !n.read ? "text-[#2D2D2D]" : "text-[#6B6B6B]")}>{n.title}</h4>
                        <span className="text-[9px] text-[#6B6B6B] font-mono">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-[#6B6B6B] mt-1 leading-snug">{n.message}</p>
                    </div>
                    {!n.read && (
                      <div className="w-2 h-2 rounded-full bg-[#1A5F5A] mt-1 shrink-0" />
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
        
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
          ))}
        </div>

        {/* Historical Trends Section */}
        <div className="mt-8 mb-4">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#6B6B6B]">Orchard Health Trends</h3>
            <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-[#1A5F5A] bg-[#1A5F5A]/10 px-2 py-1 rounded-full">
              <TrendingUp size={12} />
              <span>Past 6 Months</span>
            </div>
          </div>
          
          <div className="bg-white rounded-[24px] p-5 border border-stone-100 shadow-sm w-full">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={HISTORICAL_DATA} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1A5F5A" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#1A5F5A" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2E7D32" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8EAE0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B6B6B' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B6B6B' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                    labelStyle={{ fontSize: '10px', color: '#6B6B6B', textTransform: 'uppercase', marginBottom: '4px' }}
                  />
                  <Area type="monotone" dataKey="overallHealth" name="Overall Health" stroke="#1A5F5A" strokeWidth={3} fillOpacity={1} fill="url(#colorHealth)" />
                  <Area type="monotone" dataKey="soilMoisture" name="Soil Moisture" stroke="#2E7D32" strokeWidth={2} fillOpacity={1} fill="url(#colorMoisture)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#1A5F5A]"></div>
                <span className="text-[10px] uppercase font-bold text-[#6B6B6B]">Overall Health</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#2E7D32]"></div>
                <span className="text-[10px] uppercase font-bold text-[#6B6B6B]">Soil Moisture</span>
              </div>
            </div>
          </div>
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
