import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { ArrowRight, CheckCircle2, Zap, Shield, BarChart3 } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
export default function Page() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
          <div className="font-bold text-2xl tracking-tight text-blue-600">Status Q</div>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition-all">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Stop <span className="text-blue-600">Scaling Past</span> Your Tech.
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            High-level earners like Chris Jefferson are building 7-figure businesses. 
            Don't let a 5-figure website be your bottleneck. Bridge the Gap with Status Q.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-slate-800 transition-all">
              Analyze My Gap <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center text-blue-600">
                  <Zap size={24} />
                </div>
                <h3 className="text-xl font-bold">Speed to Lead</h3>
                <p className="text-slate-600">Infrastructure built for the high-velocity demands of 7-figure operations.</p>
              </div>
              <div className="space-y-4">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center text-blue-600">
                  <Shield size={24} />
                </div>
                <h3 className="text-xl font-bold">Ironclad Reliability</h3>
                <p className="text-slate-600">Zero-downtime architecture. Your business never sleeps; neither does your tech.</p>
              </div>
              <div className="space-y-4">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center text-blue-600">
                  <BarChart3 size={24} />
                </div>
                <h3 className="text-xl font-bold">Precision Analytics</h3>
                <p className="text-slate-600">Deep-dive data that reveals exactly where your technical gaps are costing you money.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          © 2026 Status Q. All rights reserved.
        </div>
      </footer>
      
      <Analytics />
    </div>
  );
}

