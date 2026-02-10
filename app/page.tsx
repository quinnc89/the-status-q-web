import React from 'react';

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#1A1A1B] font-serif selection:bg-[#004B50] selection:text-white">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">Status Q Copy</h1>
        <p className="text-xl font-sans text-gray-600 mb-10">High-Converting Scripts & Tech Strategy for Real Estate Professionals.</p>
        <div className="h-1 w-20 bg-[#004B50] mx-auto mb-10"></div>
      </section>

      {/* Services for Stripe Compliance */}
      <section className="max-w-4xl mx-auto px-6 py-10 font-sans">
        <h2 className="text-2xl font-serif font-bold mb-8 text-[#004B50]">Our Services</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="border-b border-gray-200 pb-6">
            <h3 className="font-bold text-lg">AI Script Audit</h3>
            <p className="text-gray-600 text-sm mt-2">A comprehensive analysis of your current sales scripts using our proprietary AI model.</p>
          </div>
          <div className="border-b border-gray-200 pb-6">
            <h3 className="font-bold text-lg">Fractional Tech Strategy</h3>
            <p className="text-gray-600 text-sm mt-2">Scaling your operations without breaking your tech stack. Specialized for 7-figure earners.</p>
          </div>
        </div>
      </section>

      {/* Contact / Stripe Compliance */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center font-sans">
        <p className="text-gray-500 mb-4 text-sm">Ready to begin?</p>
        <a href="mailto:your-email@example.com" className="text-2xl font-bold text-[#004B50] underline">Check My Availability</a>
      </section>

      {/* Footer (Crucial for Stripe) */}
      <footer className="max-w-5xl mx-auto px-6 py-10 border-t border-gray-200 font-sans text-xs text-gray-400 flex justify-between">
        <p>© 2026 Status Q Copy. All rights reserved.</p>
        <div className="space-x-4">
          <a href="#" className="hover:text-[#004B50]">Privacy Policy</a>
          <a href="#" className="hover:text-[#004B50]">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}