import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PAPAYA_GUIDE = [
  { step: 1, title: 'Soil Preparation', desc: 'Adding Jeevamrut to enrich soil naturally without chemicals.' },
  { step: 2, title: 'Planting Sapling', desc: 'Careful placement during the monsoon for optimal root growth.' },
  { step: 3, title: 'Pest Control', desc: 'Neem-based sprays to deter insects safely.' },
];

export default function Learn() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'papaya' | 'mango'>('papaya');
  return (
    <div className="min-h-screen bg-bg-base relative pb-20">
      <div className="bg-primary text-surface pt-12 pb-6 px-4 rounded-b-[40px] shadow-md z-10 relative">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white/10 active:bg-white/20 transition-colors">
            <ArrowLeft className="text-white" size={24} />
          </button>
          <h1 className="text-xl font-bold font-heading text-white">Organic Grow Guide</h1>
        </div>
        <p className="text-white/90 text-sm">How your tree grows – 100% Organic, Zero Chemicals.</p>
        
        <div className="flex gap-2 mt-6">
          <button 
            className={`flex-1 py-2.5 rounded-full font-semibold text-sm transition-colors ${activeTab === 'papaya' ? 'bg-white text-primary' : 'bg-white/10 text-white'}`}
            onClick={() => setActiveTab('papaya')}
          >
            Papaya
          </button>
          <button 
            className={`flex-1 py-2.5 rounded-full font-semibold text-sm transition-colors ${activeTab === 'mango' ? 'bg-white text-primary' : 'bg-white/10 text-white'}`}
            onClick={() => setActiveTab('mango')}
          >
            Mango
          </button>
        </div>
      </div>
      
      <div className="p-4 pt-6">
        <h2 className="font-heading font-semibold text-lg text-text-main mb-4">Lifecycle Timeline</h2>
        <div className="relative border-l-2 border-primary/20 ml-3 pl-6 pb-4 space-y-6">
          {PAPAYA_GUIDE.map((item, idx) => (
            <div key={idx} className="relative">
              <div className="absolute -left-[31px] w-4 h-4 bg-primary rounded-full border-4 border-bg-base" />
              <h3 className="font-semibold text-primary mb-1">Step {item.step}: {item.title}</h3>
              <p className="text-text-sub text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
        
        <h2 className="font-heading font-semibold text-lg text-text-main mt-8 mb-4">DIY Recipes</h2>
        <div className="space-y-3">
          <details className="bg-surface rounded-2xl border border-gray-100 p-4 group">
            <summary className="font-semibold text-text-main flex justify-between items-center cursor-pointer list-none">
              Jeevamrut (Liquid Manure)
              <ChevronDown size={16} className="text-text-sub group-open:rotate-180 transition-transform" />
            </summary>
            <div className="mt-4 text-sm text-text-sub">
              <strong>Ingredients:</strong> Cow dung, cow urine, jaggery, pulse flour, soil.<br/>
              <strong>Method:</strong> Mix in a barrel with 200L water. Ferment for 48 hours. Stir twice daily.
            </div>
          </details>
          <details className="bg-surface rounded-2xl border border-gray-100 p-4 group">
            <summary className="font-semibold text-text-main flex justify-between items-center cursor-pointer list-none">
              Neemastra (Pest Control)
              <ChevronDown size={16} className="text-text-sub group-open:rotate-180 transition-transform" />
            </summary>
            <div className="mt-4 text-sm text-text-sub">
              <strong>Ingredients:</strong> Neem leaves, cow urine, cow dung.<br/>
              <strong>Method:</strong> Boil neem leaves in cow urine and dung. Dilute in water and spray on plants.
            </div>
          </details>
        </div>
        
        <div className="mt-8 p-5 bg-[#F2F7F2] rounded-3xl border border-[#E6F0E6] flex gap-4 items-center">
          <div className="w-12 h-12 bg-success text-white rounded-full flex items-center justify-center shrink-0">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <h3 className="font-bold text-success mb-1">PGS-India Certified</h3>
            <p className="text-xs text-success/80">Our farms meet rigorous organic standards. Zero synthetic chemicals guaranteed.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
