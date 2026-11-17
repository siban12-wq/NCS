import React, { useState, useMemo, useEffect } from 'react';
import { siteConfig } from '@/content/site';
import { useStore } from '@/store/useStore';
import { GlassCard } from '@/ui/GlassCard';
import {
  MapPin,
  GraduationCap,
  Users,
  Search,
  ShieldCheck,
  ArrowLeft,
  Sparkles,
  BookOpen,
  ShieldAlert,
} from 'lucide-react';

type MemberTab = 'all' | 'guides' | 'coordinators' | 'trainees';

export const MembersPage: React.FC = () => {
  const toggleSupport = useStore((state) => state.toggleSupport);
  const navigateTo = useStore((state) => state.navigateTo);

  const [activeTab, setActiveTab] = useState<MemberTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<string>('all');

  const { guides, coordinators, trainees } = siteConfig.members;

  // Scroll to top on page mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Format names with proper capitalization
  const formatName = (str: string) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  };

  // Combine all members without phone numbers
  const allMembers = useMemo(() => {
    const list: Array<{
      id: string;
      name: string;
      roleType: 'guide' | 'coordinator' | 'trainee';
      roleLabel: string;
      rollNo?: string;
      year?: string;
      branch?: string;
    }> = [];

    guides.forEach((g) => {
      list.push({
        id: `guide-${g.sNo}`,
        name: formatName(g.name),
        roleType: 'guide',
        roleLabel: `Guide · ${g.year}`,
        rollNo: g.rollNo,
        year: g.year,
        branch: g.branch,
      });
    });

    coordinators.forEach((c) => {
      list.push({
        id: `coord-${c.sNo}`,
        name: formatName(c.name),
        roleType: 'coordinator',
        roleLabel: 'Coordinator 2026',
      });
    });

    trainees.forEach((t) => {
      list.push({
        id: `trainee-${t.sNo}`,
        name: formatName(t.name),
        roleType: 'trainee',
        roleLabel: 'Trainee 2026',
        rollNo: t.rollNo,
      });
    });

    return list;
  }, [guides, coordinators, trainees]);

  // Extract unique branches
  const availableBranches = useMemo(() => {
    const set = new Set<string>();
    guides.forEach((g) => {
      if (g.branch) set.add(g.branch);
    });
    return Array.from(set);
  }, [guides]);

  // Filtered members based on tab, search, and branch
  const filteredMembers = useMemo(() => {
    return allMembers.filter((m) => {
      // Tab filter
      if (activeTab === 'guides' && m.roleType !== 'guide') return false;
      if (activeTab === 'coordinators' && m.roleType !== 'coordinator') return false;
      if (activeTab === 'trainees' && m.roleType !== 'trainee') return false;

      // Branch filter
      if (selectedBranch !== 'all' && m.branch !== selectedBranch) {
        if (activeTab === 'guides' || m.branch) return false;
      }

      // Search query filter (matches name, roll number, or branch)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = m.name.toLowerCase().includes(q);
        const matchesRoll = m.rollNo ? m.rollNo.includes(q) : false;
        const matchesBranch = m.branch ? m.branch.toLowerCase().includes(q) : false;
        return matchesName || matchesRoll || matchesBranch;
      }

      return true;
    });
  }, [allMembers, activeTab, selectedBranch, searchQuery]);

  return (
    <div className="min-h-screen bg-[#EBF3FA] text-paper transition-colors">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 px-4 py-3 md:px-8 backdrop-blur-md bg-white/80 border-b border-slate-900/10 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Back to Home Button */}
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl glass-panel hover:bg-white/20 text-xs sm:text-sm font-semibold text-royal transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          {/* Brand lockup */}
          <div
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0">
              <img
                src="/brand/logo.png"
                alt="TEAM NCS Logo"
                className="w-full h-full object-contain drop-shadow group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="text-left hidden sm:block">
              <span className="block font-display font-semibold text-base leading-tight text-paper">
                TEAM NCS
              </span>
              <span className="block text-[10px] text-lavender tracking-wider uppercase font-medium">
                NIST Counselling Services
              </span>
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleSupport}
              className="bg-royal hover:bg-royal/90 text-white font-medium text-xs px-3.5 py-2 rounded-xl shadow-md transition-all flex items-center gap-1.5 active:scale-95"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-peach" />
              <span>Need Support?</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-12">
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-royal/20 text-xs font-bold text-royal uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-royal" />
            <span>NIST Counselling Services · Official Directory 2026</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-paper">
            TEAM NCS Members
          </h1>

          <p className="text-sm sm:text-base text-lavender leading-relaxed">
            United we stand, divided we fall. Meet our faculty club advisor, 3rd-year guides, student coordinators, and 2026 trainees dedicated to campus peer guidance.
          </p>
        </div>

        {/* Leadership & Location Cards (Top Highlight) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Club Advisor Card */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-royal/30 bg-gradient-to-br from-royal/10 via-white/60 to-blue-50/40 flex items-start gap-4 shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-royal text-white flex items-center justify-center shrink-0 shadow-md shadow-royal/30">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div className="space-y-1.5 flex-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-royal/15 text-royal font-bold text-[11px] uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                Faculty Club Advisor
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-paper">
                {siteConfig.advisor.name}
              </h2>
              <p className="text-xs text-lavender font-medium">
                {siteConfig.advisor.designation} · {siteConfig.advisor.department}
              </p>
              <div className="pt-2 text-xs text-lavender/90 flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-royal shrink-0" />
                <span>Office Location: <strong>{siteConfig.contact.officeLocation}</strong></span>
              </div>
            </div>
          </div>

          {/* Campus Location Card */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-teal/30 bg-gradient-to-br from-teal/10 via-white/60 to-emerald-50/40 flex items-start gap-4 shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-teal text-white flex items-center justify-center shrink-0 shadow-md shadow-teal/30">
              <MapPin className="w-7 h-7" />
            </div>
            <div className="space-y-1.5 flex-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal/20 text-teal-800 font-bold text-[11px] uppercase tracking-wider">
                <ShieldCheck className="w-3 h-3" />
                Campus Headquarters
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-paper">
                {siteConfig.contact.officeLocation}
              </h2>
              <p className="text-xs text-lavender leading-relaxed">
                Open for walk-in peer counselling, mental wellness resources, and friendly conversations with volunteers in signature royal-blue polos.
              </p>
            </div>
          </div>
        </div>

        {/* Directory Filter Bar & Search */}
        <div className="glass-panel p-4 sm:p-6 rounded-3xl border border-slate-900/10 dark:border-white/10 space-y-4 shadow-sm">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-white/10 p-1.5 rounded-2xl">
              <button
                onClick={() => {
                  setActiveTab('all');
                  setSelectedBranch('all');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'all'
                    ? 'bg-royal text-white shadow-md shadow-royal/30'
                    : 'text-slate-700 dark:text-paper/70 hover:text-paper'
                }`}
              >
                All Members ({allMembers.length})
              </button>

              <button
                onClick={() => setActiveTab('guides')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'guides'
                    ? 'bg-royal text-white shadow-md shadow-royal/30'
                    : 'text-slate-700 dark:text-paper/70 hover:text-paper'
                }`}
              >
                Guides ({guides.length})
              </button>

              <button
                onClick={() => {
                  setActiveTab('coordinators');
                  setSelectedBranch('all');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'coordinators'
                    ? 'bg-royal text-white shadow-md shadow-royal/30'
                    : 'text-slate-700 dark:text-paper/70 hover:text-paper'
                }`}
              >
                Coordinators ({coordinators.length})
              </button>

              <button
                onClick={() => {
                  setActiveTab('trainees');
                  setSelectedBranch('all');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'trainees'
                    ? 'bg-royal text-white shadow-md shadow-royal/30'
                    : 'text-slate-700 dark:text-paper/70 hover:text-paper'
                }`}
              >
                Trainees ({trainees.length})
              </button>
            </div>

            {/* Live Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, roll no, or branch..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-black/20 border border-slate-900/10 dark:border-white/10 text-xs sm:text-sm text-paper placeholder-slate-400 outline-none focus:border-royal transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-paper"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Branch Filter Pills */}
          {activeTab === 'guides' && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-900/10 dark:border-white/10 text-xs">
              <span className="text-lavender font-semibold flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" />
                Branch:
              </span>
              <button
                onClick={() => setSelectedBranch('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedBranch === 'all'
                    ? 'bg-royal/20 text-royal font-bold'
                    : 'text-lavender hover:text-paper'
                }`}
              >
                All Branches
              </button>
              {availableBranches.map((br) => (
                <button
                  key={br}
                  onClick={() => setSelectedBranch(br)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    selectedBranch === br
                      ? 'bg-royal/20 text-royal font-bold'
                      : 'text-lavender hover:text-paper'
                  }`}
                >
                  {br}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 66 Member Cards Grid (Zero Phone Numbers) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMembers.map((member) => {
            const initials = member.name
              .split(' ')
              .map((n) => n[0])
              .slice(0, 2)
              .join('');

            return (
              <GlassCard
                key={member.id}
                className="p-4 sm:p-5 rounded-2xl flex flex-col justify-between h-full hover:scale-[1.02] transition-all border border-slate-900/10 dark:border-white/10 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-royal to-blue-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                      {initials}
                    </div>

                    {/* Role Badge */}
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        member.roleType === 'guide'
                          ? 'bg-royal/15 text-royal'
                          : member.roleType === 'coordinator'
                          ? 'bg-teal/20 text-teal-800 dark:text-teal'
                          : 'bg-indigo-100 text-indigo-700 dark:bg-white/10 dark:text-lavender'
                      }`}
                    >
                      {member.roleType === 'guide'
                        ? 'Guide'
                        : member.roleType === 'coordinator'
                        ? 'Coordinator'
                        : 'Trainee'}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-sm text-paper group-hover:text-royal transition-colors leading-tight">
                      {member.name}
                    </h3>

                    {/* Roll & Branch Information */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-2 text-[11px] text-lavender font-mono">
                      {member.rollNo && (
                        <span className="bg-slate-100 dark:bg-black/30 px-1.5 py-0.5 rounded">
                          {member.rollNo}
                        </span>
                      )}
                      {member.branch && (
                        <span className="bg-blue-50 dark:bg-royal/20 text-royal px-1.5 py-0.5 rounded font-sans font-bold">
                          {member.branch}
                        </span>
                      )}
                      {member.year && (
                        <span className="text-[10px] text-lavender/80 font-sans">
                          {member.year}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Empty Search Result */}
        {filteredMembers.length === 0 && (
          <div className="text-center py-12 glass-panel rounded-3xl max-w-md mx-auto">
            <Users className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h4 className="font-bold text-sm text-paper">No members found</h4>
            <p className="text-xs text-lavender mt-1">
              Try adjusting your search query or clear the filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedBranch('all');
                setActiveTab('all');
              }}
              className="mt-3 px-4 py-1.5 rounded-xl bg-royal text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* Page Footer */}
      <footer className="border-t border-slate-900/10 py-12 px-4 sm:px-8 mt-20 text-center text-xs text-lavender/80 space-y-4">
        <div className="flex items-center justify-center gap-2">
          <img
            src="/brand/logo.png"
            alt="TEAM NCS"
            className="w-5 h-5 object-contain"
          />
          <span className="font-semibold text-paper">TEAM NCS · NIST Counselling Services</span>
        </div>
        <p>Headquarters: {siteConfig.contact.officeLocation} · Faculty Advisor: {siteConfig.advisor.name}</p>
        <div>
          <button
            onClick={() => navigateTo('home')}
            className="text-royal font-bold hover:underline"
          >
            ← Back to Home / The Confluence
          </button>
        </div>
      </footer>
    </div>
  );
};
