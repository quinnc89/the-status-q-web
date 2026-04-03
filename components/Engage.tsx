// contact form — headline and form slide up on scroll
"use client";

export default function Engage() {
  return (
    <section id="contact" data-engage className="py-28 lg:py-40 px-6 md:px-10 lg:px-16">
      <div className="max-w-[1400px] mx-auto">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <div data-engage-left className="lg:col-span-5 mb-12 lg:mb-0 lg:sticky lg:top-28 lg:self-start">
            <p className="text-[11px] font-semibold tracking-[0.35em] uppercase text-gold mb-6" data-gold-drift="0.1">Contact</p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-[4rem] font-bold leading-[0.95] tracking-tight">
              <span className="text-ivory">Let&apos;s build</span><br />
              <span className="text-ivory">something that</span><br />
              <span className="gold-shine italic font-normal">performs.</span>
            </h2>
            <p className="mt-6 text-[15px] text-silver leading-[1.75] max-w-sm">
              We take on a limited number of clients each month. If you&apos;re serious about results, start here.
            </p>
          </div>

          <div data-engage-right className="lg:col-span-6 lg:col-start-7">
            <form onSubmit={(e) => e.preventDefault()} className="border border-white/[0.06] p-8 lg:p-10 space-y-7">
              <div>
                <label htmlFor="name" className="block text-[10px] font-semibold tracking-[0.25em] uppercase text-slate mb-2.5">Name</label>
                <input type="text" id="name" name="name" placeholder="Your name" className="w-full bg-transparent border-b border-white/[0.08] pb-3 text-[15px] text-ivory placeholder:text-ash focus:border-gold/40 focus:outline-none transition-colors duration-300" />
              </div>
              <div>
                <label htmlFor="email" className="block text-[10px] font-semibold tracking-[0.25em] uppercase text-slate mb-2.5">Email</label>
                <input type="email" id="email" name="email" placeholder="you@company.com" className="w-full bg-transparent border-b border-white/[0.08] pb-3 text-[15px] text-ivory placeholder:text-ash focus:border-gold/40 focus:outline-none transition-colors duration-300" />
              </div>
              <div>
                <label htmlFor="service" className="block text-[10px] font-semibold tracking-[0.25em] uppercase text-slate mb-2.5">Service</label>
                <select id="service" name="service" className="w-full bg-transparent border-b border-white/[0.08] pb-3 text-[15px] text-ash focus:border-gold/40 focus:outline-none transition-colors duration-300 appearance-none cursor-pointer">
                  <option value="" className="bg-deep">Select a service</option>
                  <option value="email" className="bg-deep">Email Copy</option>
                  <option value="vsl" className="bg-deep">VSL Scripts</option>
                  <option value="web" className="bg-deep">Website Design</option>
                  <option value="full" className="bg-deep">Full Package</option>
                </select>
              </div>
              <div>
                <label htmlFor="details" className="block text-[10px] font-semibold tracking-[0.25em] uppercase text-slate mb-2.5">Project Details</label>
                <textarea id="details" name="details" rows={4} placeholder="What are you working on?" className="w-full bg-transparent border-b border-white/[0.08] pb-3 text-[15px] text-ivory placeholder:text-ash focus:border-gold/40 focus:outline-none transition-colors duration-300 resize-none" />
              </div>
              <button type="submit" className="group w-full flex items-center justify-center gap-3 py-4 bg-gold text-deep text-[14px] font-semibold tracking-wide hover:bg-gold-light transition-all duration-300 mt-4">
                Submit Inquiry
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
