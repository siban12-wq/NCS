import React, { useState } from 'react';
import { siteConfig } from '@/content/site';
import { Reveal } from '@/ui/Reveal';
import { GlassCard } from '@/ui/GlassCard';
import { Instagram, Mail, MapPin, Send, CheckCircle2, MessageSquareHeart } from 'lucide-react';

export const Reach: React.FC = () => {
  const [formSent, setFormSent] = useState(false);
  const [note, setNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;
    setFormSent(true);
  };

  return (
    <section
      id="reach"
      aria-label="Reach Out and Connect"
      className="relative min-h-screen flex items-center justify-center py-24 px-4 sm:px-8 pointer-events-none"
    >
      <div className="max-w-6xl mx-auto w-full pointer-events-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal>
            <span className="text-xs uppercase tracking-widest text-teal font-bold block mb-2">
              Get in Touch
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-paper mb-4">
              We are only a message away.
            </h2>
            <p className="text-sm sm:text-base text-lavender leading-relaxed">
              Whether you want to drop by the counselling room, send a quick question over Instagram, or share an anonymous query, our door is always open.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Direct Channels */}
          <Reveal delay={150}>
            <GlassCard className="h-full p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-2xl font-bold text-paper mb-6">
                  Direct Channels
                </h3>

                <div className="space-y-6">
                  {/* Instagram */}
                  <a
                    href={siteConfig.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-peach via-lavender to-royal flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                      <Instagram className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs text-lavender">Follow &amp; Message on Instagram</div>
                      <div className="text-base font-bold text-paper group-hover:text-teal transition-colors">
                        {siteConfig.instagram.handle}
                      </div>
                    </div>
                  </a>

                  {/* Campus Location */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="w-12 h-12 rounded-xl bg-royal/40 flex items-center justify-center text-teal shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs text-lavender">On-Campus Counselling Room</div>
                      <div className="text-sm font-semibold text-paper">
                        {siteConfig.contact.officeLocation}
                      </div>
                    </div>
                  </div>

                  {/* Email Support */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="w-12 h-12 rounded-xl bg-royal/40 flex items-center justify-center text-gold shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs text-lavender">Official Counselling Email</div>
                      <div className="text-sm font-semibold text-paper">
                        {siteConfig.contact.email}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 text-xs text-lavender/70">
                You are also welcome to approach any TEAM NCS member on duty during campus events.
              </div>
            </GlassCard>
          </Reveal>

          {/* Quick Confidential Note Form */}
          <Reveal delay={300}>
            <GlassCard className="h-full p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquareHeart className="w-5 h-5 text-teal" />
                  <h3 className="font-display text-2xl font-bold text-paper">
                    Send a Gentle Note
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-lavender mb-6 leading-relaxed">
                  Have a suggestion for our next campus gathering, or want to share feedback about Counselling Services? Drop a note below.
                </p>

                {!formSent ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-lavender mb-1.5">
                        Your Message or Question
                      </label>
                      <textarea
                        rows={5}
                        required
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Write your thoughts here..."
                        className="w-full rounded-2xl bg-black/20 border border-white/15 p-4 text-sm text-paper placeholder-lavender/40 outline-none focus:border-teal transition-all resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-royal hover:bg-royal/90 text-white font-semibold text-sm transition-all shadow-lg flex items-center justify-center gap-2 border border-white/20 active:scale-98"
                    >
                      <span>Send to TEAM NCS</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                ) : (
                  <div className="py-12 flex flex-col items-center justify-center text-center space-y-3 animate-fadeIn">
                    <CheckCircle2 className="w-12 h-12 text-teal" />
                    <h4 className="font-display text-xl font-bold text-paper">
                      Thank you for sharing.
                    </h4>
                    <p className="text-xs text-lavender max-w-xs">
                      Your note has been received in spirit. To chat in real time, please connect with us directly on Instagram!
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-lavender/60">
                For urgent emotional distress, please use the 24/7 crisis hotlines in the Support panel.
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
