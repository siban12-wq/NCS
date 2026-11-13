import React from 'react';
import { siteConfig } from '@/content/site';
import { ArrowUp, Instagram, Heart } from 'lucide-react';
import { useStore } from '@/store/useStore';

export const Footer: React.FC = () => {
  const toggleSupport = useStore((state) => state.toggleSupport);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="footer"
      aria-label="Footer and Crisis Resources"
      className="relative z-20 bg-indigo-900/90 border-t border-white/10 text-paper py-16 px-4 sm:px-8 pointer-events-auto"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Urgent Crisis Disclaimer Banner */}
        <div className="glass-panel p-6 rounded-3xl border border-peach/30 bg-peach/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-peach shrink-0" />
            <div>
              <h4 className="font-display font-bold text-sm text-paper">
                Immediate Crisis Notice
              </h4>
              <p className="text-xs text-lavender/90">
                If you or someone you know is in immediate psychological danger, please reach out to national emergency lines immediately.
              </p>
            </div>
          </div>
          <button
            onClick={toggleSupport}
            className="shrink-0 px-4 py-2 rounded-xl bg-peach/20 hover:bg-peach/30 border border-peach/40 text-peach text-xs font-bold transition-colors"
          >
            View 24/7 Helplines
          </button>
        </div>

        {/* Links & Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-royal to-teal flex items-center justify-center text-[10px] font-bold text-white">
                NCS
              </div>
              <h3 className="font-display text-xl font-bold tracking-wide">
                {siteConfig.name}
              </h3>
            </div>
            <p className="text-xs text-lavender max-w-sm leading-relaxed">
              {siteConfig.tagline} {siteConfig.subtagline}.
            </p>
            <p className="text-xs text-lavender/70 max-w-sm">
              Working hand-in-hand with NIST Counselling Services to ensure mental wellness is an open, supportive part of campus culture.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-teal mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-lavender">
              <li><a href="#about" className="hover:text-paper transition-colors">About NCS</a></li>
              <li><a href="#breathe" className="hover:text-paper transition-colors">Breathing Reset</a></li>
              <li><a href="#events" className="hover:text-paper transition-colors">SANGAM 2026</a></li>
              <li><a href="#memories" className="hover:text-paper transition-colors">Memories Gallery</a></li>
              <li><a href="#resources" className="hover:text-paper transition-colors">Self-Help Guides</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-teal mb-3">
              Connect
            </h4>
            <ul className="space-y-2 text-xs text-lavender">
              <li>
                <a
                  href={siteConfig.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-paper transition-colors flex items-center gap-1.5"
                >
                  <Instagram className="w-3.5 h-3.5 text-peach" />
                  {siteConfig.instagram.handle}
                </a>
              </li>
              <li><span className="text-lavender/80">{siteConfig.contact.officeLocation}</span></li>
              <li><span className="text-lavender/80">{siteConfig.contact.email}</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Consent Note */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-lavender/60">
          <div>
            © {new Date().getFullYear()} {siteConfig.name} · NIST Counselling Services. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-lavender/50">
              Photographs published with student consent.
            </span>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-paper transition-colors flex items-center gap-1 text-xs"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-teal" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
