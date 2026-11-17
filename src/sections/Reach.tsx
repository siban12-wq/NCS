import React, { useState, useEffect, useRef } from 'react';
import { siteConfig } from '@/content/site';
import { Reveal } from '@/ui/Reveal';
import { GlassCard } from '@/ui/GlassCard';
import {
  Instagram,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldAlert,
  MessageSquareHeart,
} from 'lucide-react';
import { useStore } from '@/store/useStore';

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          'error-callback'?: () => void;
          'expired-callback'?: () => void;
          theme?: 'light' | 'dark' | 'auto';
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

const CATEGORIES = [
  { value: 'general', label: 'General Counselling Query' },
  { value: 'academic', label: 'Academic Stress & Workload' },
  { value: 'hostel', label: 'Hostel & Campus Adjustment' },
  { value: 'peer', label: 'Peer Relationships & Social' },
  { value: 'other', label: 'Other Support Topic' },
];

export const Reach: React.FC = () => {
  const toggleSupport = useStore((state) => state.toggleSupport);

  const [note, setNote] = useState('');
  const [category, setCategory] = useState('general');
  const [honeypot, setHoneypot] = useState('');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 30-second client cooldown timer
  const [cooldown, setCooldown] = useState(0);

  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;

  // Handle Turnstile script injection and widget rendering
  useEffect(() => {
    if (!turnstileSiteKey || typeof window === 'undefined') return;

    let script = document.getElementById('cloudflare-turnstile-script') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'cloudflare-turnstile-script';
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    const initTurnstile = () => {
      if (window.turnstile && turnstileContainerRef.current && !widgetIdRef.current) {
        try {
          const id = window.turnstile.render(turnstileContainerRef.current, {
            sitekey: turnstileSiteKey,
            callback: (token: string) => setTurnstileToken(token),
            'expired-callback': () => setTurnstileToken(null),
            'error-callback': () => setTurnstileToken(null),
            theme: 'light',
          });
          widgetIdRef.current = id;
        } catch {
          // Graceful ignore
        }
      }
    };

    if (window.turnstile) {
      initTurnstile();
    } else {
      script.addEventListener('load', initTurnstile);
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [turnstileSiteKey]);

  // Cooldown countdown
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmed = note.trim();
    if (!trimmed) {
      setErrorMessage('Please type a message before submitting.');
      return;
    }

    if (trimmed.length > 600) {
      setErrorMessage('Message must not exceed 600 characters.');
      return;
    }

    if (cooldown > 0) {
      setErrorMessage(`Please wait ${cooldown}s before submitting again.`);
      return;
    }

    // Bot honeypot detection
    if (honeypot.trim()) {
      setErrorMessage('Submission rejected.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/.netlify/functions/submit-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Sec-Fetch-Site': 'same-origin',
        },
        body: JSON.stringify({
          message: trimmed,
          category,
          website_url: honeypot, // Honeypot field
          turnstileToken,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || `Server returned ${response.status}`);
      }

      setFormSent(true);
      setCooldown(30); // 30-second cooldown
      setNote('');
    } catch (err: unknown) {
      const errText = err instanceof Error ? err.message : 'Unable to submit question';
      setErrorMessage(errText);
    } finally {
      setIsSubmitting(false);
    }
  };

  const mailtoFallbackUrl = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
    `[TEAM NCS Query] ${category.toUpperCase()}`
  )}&body=${encodeURIComponent(note)}`;

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

          {/* Hardened Anonymous Question Box */}
          <Reveal delay={300}>
            <GlassCard className="h-full p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquareHeart className="w-5 h-5 text-teal" />
                  <h3 className="font-display text-2xl font-bold text-paper">
                    Ask a Question or Share Feedback
                  </h3>
                </div>

                {/* Visible Safety & Non-24/7 Notice */}
                <div className="p-3.5 mb-5 rounded-2xl bg-peach/10 border border-peach/30 text-xs text-paper/90 leading-relaxed flex items-start gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-peach shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-peach block mb-0.5">
                      Not Monitored 24/7
                    </span>
                    Submissions are forwarded to the team inbox and checked periodically. If you or someone you know is in immediate crisis, please open the{' '}
                    <button
                      type="button"
                      onClick={toggleSupport}
                      className="text-peach underline font-semibold hover:text-white"
                    >
                      Support Panel
                    </button>{' '}
                    for 24/7 crisis hotlines.
                  </div>
                </div>

                {!formSent ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Bot Honeypot field (hidden from legitimate users & screen readers) */}
                    <div
                      aria-hidden="true"
                      style={{
                        opacity: 0,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: 0,
                        width: 0,
                        zIndex: -1,
                        pointerEvents: 'none',
                      }}
                    >
                      <label htmlFor="website_url_hp">Leave empty</label>
                      <input
                        id="website_url_hp"
                        type="text"
                        name="website_url"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </div>

                    {/* Category Selector */}
                    <div>
                      <label className="block text-xs font-semibold text-lavender mb-1.5">
                        Topic Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full rounded-xl bg-black/30 border border-white/15 px-3 py-2 text-xs text-paper outline-none focus:border-teal"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat.value} value={cat.value} className="bg-indigo-900 text-paper">
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message Area */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-semibold text-lavender">
                          Your Question (Confidential)
                        </label>
                        <span
                          className={`text-[11px] font-mono ${
                            note.length > 550 ? 'text-peach font-bold' : 'text-lavender/60'
                          }`}
                        >
                          {note.length} / 600
                        </span>
                      </div>
                      <textarea
                        rows={4}
                        required
                        maxLength={600}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Write your question, worry, or suggestion here..."
                        className="w-full rounded-2xl bg-black/20 border border-white/15 p-4 text-sm text-paper placeholder-lavender/40 outline-none focus:border-teal transition-all resize-none"
                      />
                    </div>

                    {/* Cloudflare Turnstile Container */}
                    {turnstileSiteKey && (
                      <div className="my-2 flex justify-center">
                        <div ref={turnstileContainerRef} />
                      </div>
                    )}

                    {/* Error Notice & Mailto Fallback */}
                    {errorMessage && (
                      <div className="p-3 rounded-xl bg-red-900/30 border border-red-500/40 text-xs text-red-200 flex flex-col gap-1.5">
                        <div className="flex items-center gap-1.5 font-semibold">
                          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                          <span>{errorMessage}</span>
                        </div>
                        <div className="text-[11px] text-red-200/80">
                          Function unavailable?{' '}
                          <a
                            href={mailtoFallbackUrl}
                            className="text-white underline font-bold hover:text-teal"
                          >
                            Click here to send directly via email client →
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting || cooldown > 0 || !note.trim()}
                      className="w-full py-3 rounded-xl bg-royal hover:bg-royal/90 disabled:opacity-50 text-white font-semibold text-sm transition-all shadow-lg flex items-center justify-center gap-2 border border-white/20 active:scale-98"
                    >
                      {isSubmitting ? (
                        <span>Sending securely...</span>
                      ) : cooldown > 0 ? (
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          Cooldown ({cooldown}s)
                        </span>
                      ) : (
                        <>
                          <span>Submit Question</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="py-10 flex flex-col items-center justify-center text-center space-y-3 animate-fadeIn">
                    <CheckCircle2 className="w-12 h-12 text-teal" />
                    <h4 className="font-display text-xl font-bold text-paper">
                      Question Received
                    </h4>
                    <p className="text-xs text-lavender max-w-xs leading-relaxed">
                      Your query has been forwarded to the team inbox. No data or IP is stored on our servers.
                    </p>
                    <button
                      type="button"
                      onClick={() => setFormSent(false)}
                      className="mt-3 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-paper transition-colors"
                    >
                      Ask another question
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-lavender/60 flex items-center justify-between">
                <span>Zero database storage · Ephemeral forwarding</span>
                {cooldown > 0 && <span className="text-teal font-mono">Cooldown active ({cooldown}s)</span>}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
