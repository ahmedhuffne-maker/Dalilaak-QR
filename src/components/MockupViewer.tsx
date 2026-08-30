import React, { useState } from 'react';
import { Sparkles, Eye, LayoutGrid } from 'lucide-react';

interface MockupViewerProps {
  canvasDataUrl: string;
  format: string;
}

type MockupScene = 'acrylic-stand' | 'wall-frame' | 'store-window' | 'desk-tent';

export const MockupViewer: React.FC<MockupViewerProps> = ({ canvasDataUrl, format }) => {
  const [scene, setScene] = useState<MockupScene>('acrylic-stand');

  const scenes = [
    { id: 'acrylic-stand', label: 'ستاند طاولة أكريليك' },
    { id: 'wall-frame', label: 'إطار جداري فخم' },
    { id: 'store-window', label: 'واجهة زجاجية' },
    { id: 'desk-tent', label: 'كاونتر استقبال وكاشير' }
  ];

  return (
    <div className="flex flex-col h-full items-center justify-between">
      
      {/* Bento Scene Switcher */}
      <div className="flex items-center justify-center flex-wrap gap-1.5 p-1.5 bg-slate-850/90 backdrop-blur-md rounded-2xl border border-slate-750 mb-4 z-10 shadow-lg max-w-full">
        {scenes.map((s) => (
          <button
            key={s.id}
            onClick={() => setScene(s.id as MockupScene)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              scene === s.id
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-extrabold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Mockup Canvas Rendering Stage */}
      <div className="relative w-full flex-1 flex items-center justify-center overflow-hidden rounded-2xl border border-slate-800 shadow-2xl p-6 min-h-[480px]">
        
        {/* Scene 1: Acrylic Table Stand on Wood Table */}
        {scene === 'acrylic-stand' && (
          <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-amber-950/20 to-stone-900">
            {/* Ambient Background Light */}
            <div className="absolute top-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* The Acrylic Stand Container */}
            <div className="relative flex flex-col items-center group transition-transform duration-500 hover:scale-105">
              
              {/* Acrylic Glass Reflections & Outer Frame */}
              <div className="relative p-2.5 bg-gradient-to-b from-white/30 to-white/10 backdrop-blur-md rounded-xl border border-white/40 shadow-2xl shadow-black/80 ring-1 ring-white/20">
                {/* Diagonal Glass Sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent rounded-xl pointer-events-none" />
                
                {/* Screws on Acrylic Stand */}
                <div className="absolute top-1.5 left-1.5 w-2 h-2 rounded-full bg-slate-300 shadow-inner" />
                <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-slate-300 shadow-inner" />
                
                {/* Poster Image */}
                <img
                  src={canvasDataUrl}
                  alt="Poster Acrylic Stand"
                  className="max-h-[380px] w-auto object-contain rounded-lg shadow-md"
                />
              </div>

              {/* Wooden Base of the Stand */}
              <div className="w-56 h-6 bg-gradient-to-r from-stone-800 via-amber-900 to-stone-800 rounded-b-xl shadow-2xl border-t border-amber-600/30 -mt-1 flex items-center justify-center">
                <div className="w-40 h-1 bg-amber-500/40 rounded-full shadow-glow" />
              </div>

              {/* Floor Shadow */}
              <div className="w-72 h-4 bg-black/70 blur-md rounded-full mt-1" />
            </div>

            {/* Table Surface */}
            <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-stone-950 to-stone-900/90 border-t border-stone-800" />
          </div>
        )}

        {/* Scene 2: Modern Wall Frame with Studio Lighting */}
        {scene === 'wall-frame' && (
          <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-850 to-stone-950">
            {/* Spotlight from top */}
            <div className="absolute -top-10 w-96 h-96 bg-amber-300/10 rounded-full blur-3xl pointer-events-none" />

            {/* Frame Container */}
            <div className="relative p-5 bg-gradient-to-b from-stone-900 to-black rounded-lg border-2 border-stone-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] ring-1 ring-amber-500/20">
              
              {/* White Passe-partout / Mat board */}
              <div className="p-3 bg-stone-100 rounded-sm shadow-inner">
                <img
                  src={canvasDataUrl}
                  alt="Poster Wall Frame"
                  className="max-h-[360px] w-auto object-contain shadow-inner"
                />
              </div>

              {/* Frame inner bevel shadow */}
              <div className="absolute inset-0 border border-white/5 pointer-events-none rounded-lg" />
            </div>
          </div>
        )}

        {/* Scene 3: Storefront Glass Window */}
        {scene === 'store-window' && (
          <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950">
            {/* Street reflection background blur */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Glass Container */}
            <div className="relative p-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/20 shadow-2xl">
              {/* Suction Cups on glass corners */}
              <div className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-white/40 backdrop-blur border border-white/60 shadow" />
              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white/40 backdrop-blur border border-white/60 shadow" />
              <div className="absolute -bottom-2 -left-2 w-5 h-5 rounded-full bg-white/40 backdrop-blur border border-white/60 shadow" />
              <div className="absolute -bottom-2 -right-2 w-5 h-5 rounded-full bg-white/40 backdrop-blur border border-white/60 shadow" />

              <img
                src={canvasDataUrl}
                alt="Store Glass Poster"
                className="max-h-[380px] w-auto object-contain rounded-xl shadow-2xl"
              />
            </div>
          </div>
        )}

        {/* Scene 4: Desk Counter Tent */}
        {scene === 'desk-tent' && (
          <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-950 to-stone-900">
            {/* Tent 3D perspective */}
            <div className="relative flex flex-col items-center transition-all duration-300 hover:rotate-1">
              <div className="relative p-2 bg-gradient-to-b from-stone-200 to-stone-300 rounded-t-xl shadow-2xl border border-stone-400">
                <img
                  src={canvasDataUrl}
                  alt="Desk Tent Poster"
                  className="max-h-[350px] w-auto object-contain rounded-lg"
                />
              </div>
              {/* Tent Base Slope */}
              <div className="w-52 h-5 bg-stone-400 rounded-b-md shadow-lg border-t border-stone-500" />
              <div className="w-64 h-3 bg-black/60 blur-sm rounded-full mt-0.5" />
            </div>

            {/* Desk Counter Surface */}
            <div className="absolute bottom-0 inset-x-0 h-10 bg-stone-950 border-t border-stone-800" />
          </div>
        )}

      </div>

      <div className="mt-3 text-center text-xs text-slate-400">
        ✨ معاينة تفاعلية واقعية لمظهر الملصق عند وضعه في المحل أو على الطاولات
      </div>

    </div>
  );
};
