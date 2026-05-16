import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { Filter, User } from 'lucide-react';
import { Link } from 'react-router-dom';

// Farm boundaries in Rajasthan (dummy coords near Jaipur)
const farmPolygon: {lat: number, lng: number}[] = [
  {lat: 26.91, lng: 75.8},
  {lat: 26.92, lng: 75.8},
  {lat: 26.92, lng: 75.82},
  {lat: 26.91, lng: 75.82},
];

// Mock Data
const TREES = [
  { id: '1', lat: 26.912, lng: 75.805, type: 'Papaya', status: 'available', price: 1500, harvest: 'Oct 2026' },
  { id: '2', lat: 26.915, lng: 75.81, type: 'Mango', status: 'available', price: 3000, harvest: 'May 2027' },
  { id: '3', lat: 26.918, lng: 75.812, type: 'Papaya', status: 'rented_others', price: 1500, harvest: 'Oct 2026' },
  { id: '4', lat: 26.914, lng: 75.816, type: 'Mango', status: 'rented_user', price: 3000, harvest: 'May 2027' },
];

export default function Explore() {
  const [selectedTree, setSelectedTree] = useState<any>(null);

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''}>
      <div className="relative w-full h-full flex flex-col">
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 z-[400] p-4 flex justify-between items-center bg-gradient-to-b from-white/80 to-transparent backdrop-blur-sm pt-12 text-primary pointer-events-none">
          <h1 className="text-2xl font-heading font-bold pointer-events-auto">Find your tree</h1>
          <div className="flex gap-3 pointer-events-auto">
            <button className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-primary">
              <Filter size={20} />
            </button>
            <Link to="/profile" className="w-10 h-10 bg-primary/10 rounded-full shadow-sm flex items-center justify-center text-primary border-2 border-white">
              <User size={20} />
            </Link>
          </div>
        </div>

        {/* Map Content */}
        <div className="flex-1 w-full bg-[#E5E3DF] z-0">
          <Map
            defaultCenter={{lat: 26.915, lng: 75.81}}
            defaultZoom={14}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
            mapId="DEMO_MAP_ID"
            className="w-full h-full"
          >
            {TREES.map(tree => {
              let emoji = '🟢';
              let classes = 'bg-white rounded-full shadow-md flex items-center justify-center text-xl w-8 h-8';
              
              if (tree.status === 'rented_others') {
                emoji = '🔒';
                classes += ' opacity-60';
              } else if (tree.status === 'rented_user') {
                emoji = '🌳';
                classes += ' ring-4 ring-blue-400 animate-pulse';
              } else {
                emoji = tree.type === 'Papaya' ? '🌿' : '🥭';
              }

              return (
                <AdvancedMarker 
                  key={tree.id} 
                  position={{lat: tree.lat, lng: tree.lng}}
                  onClick={() => setSelectedTree(tree)}
                >
                  <div className={classes}>{emoji}</div>
                </AdvancedMarker>
              );
            })}
          </Map>
        </div>

        {/* Bottom Sheet - Collapsed initially */}
        <div className="absolute bottom-0 left-0 right-0 z-[400] bg-surface rounded-t-[30px] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-6 transition-transform">
          <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-4" />
          
          {selectedTree ? (
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-heading font-bold">{selectedTree.type} Tree</h3>
                  <p className="text-text-sub text-sm">Harvest: {selectedTree.harvest}</p>
                </div>
                <div className="text-xl font-mono font-bold text-primary">₹{selectedTree.price}</div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mb-6">
                <div className="p-3 bg-blue-50 text-blue-700 rounded-xl text-center">
                  <div className="text-sm font-semibold">45%</div>
                  <div className="text-[10px] uppercase">Moisture</div>
                </div>
                <div className="p-3 bg-green-50 text-green-700 rounded-xl text-center">
                  <div className="text-sm font-semibold">Low</div>
                  <div className="text-[10px] uppercase">Pest Risk</div>
                </div>
                <div className="p-3 bg-orange-50 text-orange-700 rounded-xl text-center">
                  <div className="text-sm font-semibold">12kg</div>
                  <div className="text-[10px] uppercase">Est. Yield</div>
                </div>
              </div>

              <button 
                className="w-full py-4 bg-primary text-white rounded-xl font-semibold shadow-lg shadow-primary/20 hover:bg-primary-light transition-colors"
                onClick={() => setSelectedTree(null)}
              >
                Close Quick View
              </button>
            </div>
          ) : (
            <div>
              <h3 className="font-heading font-semibold text-lg mb-4">Available trees: 2</h3>
              <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2 snap-x">
                {TREES.filter(t => t.status === 'available').map(tree => (
                  <button 
                    key={tree.id}
                    onClick={() => setSelectedTree(tree)}
                    className="min-w-[140px] snap-center bg-gray-50 rounded-2xl p-3 border border-gray-100 text-left active:scale-95 transition-transform"
                  >
                    <div className="h-20 bg-gray-200 rounded-xl mb-3 flex items-center justify-center text-3xl">
                      {tree.type === 'Papaya' ? '🌿' : '🥭'}
                    </div>
                    <h4 className="font-medium text-sm">{tree.type}</h4>
                    <p className="text-xs text-text-sub font-mono tracking-tight">₹{tree.price}</p>
                  </button>
                ))}
              </div>
              
              <div 
                onClick={() => { window.location.href = '/learn'; }}
                className="mt-4 p-4 bg-[#F2F7F2] rounded-2xl flex items-center justify-between shadow-sm cursor-pointer border border-[#E6F0E6] hover:bg-green-50 transition-colors"
              >
                <div>
                  <h4 className="font-semibold text-[#2E7D32] text-sm">How are they grown?</h4>
                  <p className="text-xs text-[#2E7D32]/80 mt-0.5">100% Organic, Zero Chemicals</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#2E7D32]">
                  →
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </APIProvider>
  );
}
