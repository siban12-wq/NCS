import React, { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { siteConfig } from '@/content/site';
import { X, PhoneCall, HeartHandshake, ShieldCheck, Instagram } from 'lucide-react';

export const SupportPanel: React.FC = () => {
  const supportOpen = useStore((state) => state.supportOpen);
  const setSupportOpen = useStore((state) => state.setSupportOpen);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && supportOpen) {
        setSupportOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [supportOpen, setSupportOpen]);

  if (!supportOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="support-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-all animate-fadeIn"
    >
      <div
        className="glass-panel bg-indigo-900/95 max-w-xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 relative max-h-[90vh] overflow-y-auto text-paper"
      >
        {/* Close Button */}
        <button
          onClick={() => setSupportOpen(false)}
          aria-label="Close support panel"
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 text-paper/70 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-royal/40 border border-royal flex items-center justify-center text-teal">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <h2 id="support-title" className="font-display text-2xl font-bold text-paper">
              We are here with you.
            </h2>
            <p className="text-xs text-lavender">
              Confidential, empathetic peer support at NIST
            </p>
          </div>
        </div>

        <p className="text-sm text-paper/85 mb-6 leading-relaxed">
          Whether you are dealing with exam pressure, feeling overwhelmed by college life, or just need someone to listen, you don&apos;t have to figure it out alone. TEAM NCS is here to guide and support you.
        </p>

        {/* Immediate National Helplines */}
        <div className="space-y-3 mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-teal flex items-center gap-1.5">
            <PhoneCall className="w-3.5 h-3.5" />
            24/7 Verified Crisis Helplines (Toll-Free)
          </h3>

          <div className="space-y-2">
            {siteConfig.crisisHotlines.map((line, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 hover:bg-white/10 transition-colors"
              >
                <div>
                  <div className="font-semibold text-sm text-paper">{line.name}</div>
                  <div className="text-[11px] text-lavender/80">{line.description}</div>
                </div>
                <a
                  href={`tel:${line.number.split('/')[0].trim().replace(/[^0-9+]/g, '')}`}
                  className="inline-flex items-center gap-1 text-xs font-mono font-bold text-gold hover:text-white bg-royal/30 px-3 py-1.5 rounded-lg border border-royal/40 w-fit"
                >
                  {line.number}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* On-Campus Peer & Counselling Help */}
        <div className="bg-indigo-700/30 border border-indigo-700/50 rounded-2xl p-4 mb-6 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-peach flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Campus Support Desk
          </h3>
          <p className="text-xs text-paper/80">
            <strong>Club Advisor:</strong> {siteConfig.advisor.name} ({siteConfig.advisor.designation})
          </p>
          <p className="text-xs text-paper/80">
            <strong>Location:</strong> {siteConfig.contact.officeLocation}
          </p>
          <p className="text-xs text-paper/80">
            <strong>Direct Instagram:</strong>{' '}
            <a
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal hover:underline inline-flex items-center gap-1"
            >
              <Instagram className="w-3 h-3" />
              {siteConfig.instagram.handle}
            </a>
          </p>
          <p className="text-[11px] text-lavender/70 italic mt-2">
            * All conversations with peer volunteers and counsellors are treated with the highest degree of privacy and empathy.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setSupportOpen(false)}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-paper text-sm font-medium transition-colors"
          >
            Close
          </button>
          <a
            href={siteConfig.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-royal hover:bg-royal/90 text-white text-sm font-semibold transition-all shadow-lg flex items-center gap-2"
          >
            <span>Message @the_team_ncs</span>
          </a>
        </div>
      </div>
    </div>
  );
};
