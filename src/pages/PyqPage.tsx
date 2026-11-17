import React, { useState, useMemo, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { GlassCard } from '@/ui/GlassCard';
import {
  ArrowLeft,
  Search,
  Download,
  FileText,
  Calendar,
  Sparkles,
  BookOpen,
  Eye,
  X,
  Upload,
  CheckCircle2,
  GraduationCap,
  ShieldAlert,
  Layers,
  ChevronRight,
  Clock,
  Award
} from 'lucide-react';

interface QuestionPaper {
  id: string;
  year: string;
  session: string;
  semester: string;
  examType: 'End-Semester Regular' | 'Back Examination' | 'Mid-Semester';
  qCode: string;
  courseCode: string;
  maxMarks: number;
  timeAllowed: string;
  branches: string[];
  pdfUrl: string;
  fileSize: string;
  sectionsSummary: string;
}

interface SubjectRecord {
  id: string;
  name: string;
  shortCode: string;
  department: string;
  semester: string;
  credits: number;
  description: string;
  papers: QuestionPaper[];
  available: boolean;
}

export const PyqPage: React.FC = () => {
  const navigateTo = useStore((state) => state.navigateTo);
  const toggleSupport = useStore((state) => state.toggleSupport);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const [selectedExamType, setSelectedExamType] = useState<string>('all');
  const [activeSubjectId, setActiveSubjectId] = useState<string>('bee');
  const [previewPdfUrl, setPreviewPdfUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string>('');
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Database of University Question Papers
  const subjects: SubjectRecord[] = useMemo(
    () => [
      {
        id: 'bee',
        name: 'Basic Electrical Engineering',
        shortCode: 'BEE',
        department: 'Electrical Sciences',
        semester: '1st & 2nd Sem',
        credits: 4,
        description:
          'AC/DC circuit theorems, single & 3-phase transformers, DC machines, magnetic circuits, and resonance fundamentals.',
        available: true,
        papers: [
          {
            id: 'bee-2024-25-reg',
            year: '2024-25',
            session: 'Winter 2024',
            semester: '1st Semester',
            examType: 'End-Semester Regular',
            qCode: 'S189',
            courseCode: 'EEE-100',
            maxMarks: 50,
            timeAllowed: '2 Hours 30 Min',
            branches: ['CAI', 'CDS', 'CST', 'CVL', 'ECE', 'EEE', 'ELE', 'ITG', 'MEC'],
            pdfUrl: '/pyqs/basic-electrical-engineering-pyqs.pdf',
            fileSize: '1.7 MB',
            sectionsSummary: 'Section A (Short Questions 10×1) + Section B (Long Answer 8×5)',
          },
          {
            id: 'bee-2022-23-reg',
            year: '2022-23',
            session: 'Winter 2022',
            semester: '1st Semester',
            examType: 'End-Semester Regular',
            qCode: 'L152',
            courseCode: '22FY1ES01T',
            maxMarks: 100,
            timeAllowed: '3 Hours',
            branches: ['CE', 'CSE', 'CST', 'ECE', 'E&CE', 'EE', 'EEE', 'IT', 'ME'],
            pdfUrl: '/pyqs/basic-electrical-engineering-pyqs.pdf',
            fileSize: '1.7 MB',
            sectionsSummary: 'Part-I (Short 10×2) + Part-II (Focused 8×6) + Part-III (Long 2×16)',
          },
          {
            id: 'bee-2021-22-reg-2nd',
            year: '2021-22',
            session: 'Spring 2022',
            semester: '2nd Semester',
            examType: 'End-Semester Regular',
            qCode: 'J063',
            courseCode: '19FY2ES01T',
            maxMarks: 100,
            timeAllowed: '3 Hours',
            branches: ['CE', 'CSE', 'ECE', 'EE', 'EEE', 'IT', 'ME'],
            pdfUrl: '/pyqs/basic-electrical-engineering-pyqs.pdf',
            fileSize: '1.7 MB',
            sectionsSummary: 'Short Answer (20 marks) + Focused (48 marks) + Long (32 marks)',
          },
          {
            id: 'bee-2021-22-reg-1st',
            year: '2021-22',
            session: 'Winter 2021',
            semester: '1st Semester',
            examType: 'Back Examination',
            qCode: '1186',
            courseCode: '19FY1ES01T',
            maxMarks: 100,
            timeAllowed: '3 Hours',
            branches: ['CE', 'CSE', 'ECE', 'EE', 'EEE', 'IT', 'ME'],
            pdfUrl: '/pyqs/basic-electrical-engineering-pyqs.pdf',
            fileSize: '1.7 MB',
            sectionsSummary: 'Superposition, Thevenin, 3-Phase Star/Delta & Transformers',
          },
        ],
      },
      {
        id: 'psuc',
        name: 'Problem Solving Using C Programming',
        shortCode: 'PSUC',
        department: 'Computer Science',
        semester: '1st & 2nd Sem',
        credits: 4,
        description:
          'C fundamentals, conditional logic, arrays, pointers, dynamic memory allocation (malloc/calloc), recursion, and file handling.',
        available: true,
        papers: [
          {
            id: 'psuc-2024-25-reg',
            year: '2024-25',
            session: 'Winter 2024',
            semester: '1st Semester',
            examType: 'End-Semester Regular',
            qCode: 'S214',
            courseCode: 'CSE-100',
            maxMarks: 50,
            timeAllowed: '2 Hours 30 Min',
            branches: ['CAI', 'CDS', 'CSE', 'CST', 'CVL', 'ECE', 'EEE', 'ELE', 'ITG', 'MEC'],
            pdfUrl: '/pyqs/problem-solving-using-c-pyqs.pdf',
            fileSize: '623 KB',
            sectionsSummary: 'Section A (Short Questions 10×1) + Section B (C Code & Algorithms 8×5)',
          },
          {
            id: 'psuc-2021-22-reg',
            year: '2021-22',
            session: 'Spring 2022',
            semester: '2nd Semester',
            examType: 'End-Semester Regular',
            qCode: 'J105',
            courseCode: '19FY2ES05T',
            maxMarks: 100,
            timeAllowed: '3 Hours',
            branches: ['CE', 'CSE', 'ECE', 'EE', 'EEE', 'IT', 'ME'],
            pdfUrl: '/pyqs/problem-solving-using-c-pyqs.pdf',
            fileSize: '623 KB',
            sectionsSummary: 'Data representation, pointers, sorting/searching, and file I/O operations',
          },
        ],
      },
      {
        id: 'math-1',
        name: 'Engineering Mathematics - I & II',
        shortCode: 'MATH',
        department: 'Mathematics',
        semester: '1st & 2nd Sem',
        credits: 4,
        description:
          'Differential calculus, matrices, eigenvalues, multi-variable optimization, multiple integrals, and vector calculus.',
        available: false,
        papers: [],
      },
      {
        id: 'physics',
        name: 'Engineering Physics & Electromagnetics',
        shortCode: 'PHY',
        department: 'Basic Sciences',
        semester: '1st & 2nd Sem',
        credits: 3,
        description:
          'Optics, lasers, quantum mechanics basics, electromagnetic theory, Maxwell equations, and crystallography.',
        available: false,
        papers: [],
      },
      {
        id: 'dsa',
        name: 'Data Structures & Algorithms',
        shortCode: 'DSA',
        department: 'Computer Science',
        semester: '3rd Sem',
        credits: 4,
        description:
          'Stacks, queues, linked lists, trees, graphs, sorting complexities, and dynamic programming.',
        available: false,
        papers: [],
      },
    ],
    []
  );

  // Active selected subject
  const currentSubject = subjects.find((s) => s.id === activeSubjectId) || subjects[0];

  // Filtered papers inside active subject
  const filteredPapers = useMemo(() => {
    return currentSubject.papers.filter((p) => {
      // Semester filter
      if (selectedSemester !== 'all') {
        if (!p.semester.toLowerCase().includes(selectedSemester.toLowerCase())) return false;
      }

      // Exam type filter
      if (selectedExamType !== 'all') {
        if (p.examType !== selectedExamType) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesYear = p.year.toLowerCase().includes(q);
        const matchesQCode = p.qCode.toLowerCase().includes(q);
        const matchesCourse = p.courseCode.toLowerCase().includes(q);
        const matchesSummary = p.sectionsSummary.toLowerCase().includes(q);
        const matchesBranches = p.branches.some((b) => b.toLowerCase().includes(q));
        return matchesYear || matchesQCode || matchesCourse || matchesSummary || matchesBranches;
      }

      return true;
    });
  }, [currentSubject, selectedSemester, selectedExamType, searchQuery]);

  return (
    <div className="min-h-screen bg-[#EBF3FA] text-paper transition-colors">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 px-4 py-3 md:px-8 backdrop-blur-md bg-white/85 border-b border-slate-900/10 transition-colors">
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
                Academic Support & PYQ Vault
              </span>
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowUploadModal(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl border border-royal/30 text-royal hover:bg-royal/10 text-xs font-semibold transition-all active:scale-95"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Contribute Paper</span>
            </button>

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
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-10">
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-royal/20 text-xs font-bold text-royal uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-royal" />
            <span>NIST University · Official Previous Year Exam Archive</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-paper">
            University PYQ & Midsem Vault
          </h1>

          <p className="text-xs sm:text-base text-lavender leading-relaxed max-w-2xl mx-auto">
            Official question papers from 2021 to 2025 across semester regular and back exams. Verified by Team NCS guides to help you master patterns and excel without exam stress.
          </p>
        </div>

        {/* Global Search & Filter Bar */}
        <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-900/10 bg-white/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-lavender absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search year, Q-code (e.g. S189, L152), branch..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-slate-900/10 text-xs sm:text-sm text-paper placeholder:text-lavender/60 focus:outline-none focus:ring-2 focus:ring-royal/40"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-lavender hover:text-paper"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-2.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs font-semibold text-lavender shrink-0 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-royal" /> Filter:
            </span>

            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-900/10 text-xs font-medium text-paper focus:outline-none focus:ring-2 focus:ring-royal/30"
            >
              <option value="all">All Semesters</option>
              <option value="1st">1st Semester</option>
              <option value="2nd">2nd Semester</option>
            </select>

            <select
              value={selectedExamType}
              onChange={(e) => setSelectedExamType(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-900/10 text-xs font-medium text-paper focus:outline-none focus:ring-2 focus:ring-royal/30"
            >
              <option value="all">All Exam Types</option>
              <option value="End-Semester Regular">End-Sem Regular</option>
              <option value="Back Examination">Back Exam</option>
              <option value="Mid-Semester">Mid-Semester</option>
            </select>
          </div>
        </div>

        {/* 2-Column Layout: Subjects Navigation (Left) + Question Papers Archive (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Subjects Directory (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="font-display text-lg font-bold text-paper flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-royal" />
                <span>Subject Directory</span>
              </h2>
              <span className="text-xs font-bold text-royal bg-royal/10 px-2 py-0.5 rounded-full">
                {subjects.filter((s) => s.available).length} Live
              </span>
            </div>

            <div className="space-y-2.5">
              {subjects.map((sub) => {
                const isActive = activeSubjectId === sub.id;

                return (
                  <button
                    key={sub.id}
                    onClick={() => {
                      setActiveSubjectId(sub.id);
                      setSearchQuery('');
                    }}
                    className={`w-full text-left p-4 rounded-2xl transition-all duration-200 border flex items-center justify-between gap-3 ${
                      isActive
                        ? 'bg-royal text-white shadow-lg shadow-royal/25 border-royal'
                        : 'bg-white/80 hover:bg-white text-paper border-slate-900/10 hover:border-royal/30'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-royal/10 text-royal'
                          }`}
                        >
                          {sub.shortCode}
                        </span>
                        <span
                          className={`text-[11px] font-medium ${
                            isActive ? 'text-white/80' : 'text-lavender'
                          }`}
                        >
                          {sub.semester}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-sm leading-snug">
                        {sub.name}
                      </h3>

                      <p
                        className={`text-[11px] leading-tight line-clamp-1 ${
                          isActive ? 'text-white/70' : 'text-lavender/80'
                        }`}
                      >
                        {sub.available
                          ? `${sub.papers.length} Papers Available`
                          : 'Under Digitization'}
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center">
                      {sub.available ? (
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                            isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-royal'
                          }`}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      ) : (
                        <span className="text-[10px] font-medium px-2 py-1 rounded bg-slate-200/80 text-lavender">
                          Soon
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Guide Tip Card */}
            <div className="glass-panel p-5 rounded-2xl border border-teal/30 bg-teal/5 space-y-2.5">
              <div className="flex items-center gap-2 text-teal-800 font-bold text-xs">
                <Award className="w-4 h-4 text-teal" />
                <span>NCS Guide Exam Strategy</span>
              </div>
              <p className="text-xs text-lavender leading-relaxed">
                Analyzing the last 3-4 years of end-semester papers helps identify repeated numerical patterns in circuit theorems, transformers, and dynamic pointer allocations.
              </p>
            </div>
          </div>

          {/* Right Column: Question Papers List for Selected Subject (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Subject Overview Banner */}
            <div className="glass-panel p-6 rounded-3xl border border-royal/20 bg-white/90 shadow-sm space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="inline-flex items-center gap-2">
                  <span className="text-xs font-bold text-royal bg-royal/10 px-2.5 py-1 rounded-lg">
                    {currentSubject.shortCode}
                  </span>
                  <span className="text-xs text-lavender font-medium">
                    {currentSubject.department} · {currentSubject.credits} Credits
                  </span>
                </div>

                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Official NIST Papers Verified
                </span>
              </div>

              <h2 className="font-display text-2xl font-bold text-paper">
                {currentSubject.name}
              </h2>

              <p className="text-xs sm:text-sm text-lavender leading-relaxed">
                {currentSubject.description}
              </p>
            </div>

            {/* Papers List */}
            {currentSubject.available ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-bold text-lavender uppercase tracking-wider">
                    Question Papers Archive ({filteredPapers.length})
                  </span>
                  <span className="text-xs text-lavender">Instant PDF Download</span>
                </div>

                {filteredPapers.length > 0 ? (
                  filteredPapers.map((paper) => (
                    <div
                      key={paper.id}
                      className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-900/10 hover:border-royal/40 bg-white/85 shadow-sm transition-all duration-200 hover:shadow-md space-y-4"
                    >
                      {/* Top Header of Paper */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-royal text-white text-[10px] font-bold uppercase tracking-wider">
                              {paper.year}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold">
                              {paper.semester}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-semibold">
                              Q Code: {paper.qCode}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-teal/15 text-teal-800 text-[11px] font-semibold">
                              {paper.courseCode}
                            </span>
                          </div>

                          <h3 className="font-display text-base sm:text-lg font-bold text-paper pt-1">
                            {paper.examType} ({paper.session})
                          </h3>
                        </div>

                        {/* Actions: Download & Preview */}
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => {
                              setPreviewPdfUrl(paper.pdfUrl);
                              setPreviewTitle(`${currentSubject.name} (${paper.year} - Q Code: ${paper.qCode})`);
                            }}
                            className="px-3 py-2 rounded-xl border border-slate-900/15 hover:border-royal text-paper hover:text-royal text-xs font-semibold flex items-center gap-1.5 transition-colors active:scale-95 bg-white"
                          >
                            <Eye className="w-3.5 h-3.5 text-royal" />
                            <span>Preview</span>
                          </button>

                          <a
                            href={paper.pdfUrl}
                            download={`${currentSubject.shortCode}-${paper.year}-Q${paper.qCode}.pdf`}
                            className="px-4 py-2 rounded-xl bg-royal hover:bg-royal/90 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-royal/20 transition-all active:scale-95"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download PDF ({paper.fileSize})</span>
                          </a>
                        </div>
                      </div>

                      {/* Paper Metadata & Syllabus Summary */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-900/5 text-xs text-lavender">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-royal shrink-0" />
                          <span>Duration: <strong>{paper.timeAllowed}</strong></span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-teal shrink-0" />
                          <span>Max Marks: <strong>{paper.maxMarks} Marks</strong></span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:col-span-1">
                          <FileText className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                          <span className="truncate">{paper.sectionsSummary}</span>
                        </div>
                      </div>

                      {/* Applicable Branches */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[11px] font-semibold text-lavender mr-1">
                          Branches:
                        </span>
                        {paper.branches.map((b) => (
                          <span
                            key={b}
                            className="text-[10px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded"
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="glass-panel p-10 rounded-2xl text-center space-y-3 bg-white/70">
                    <FileText className="w-8 h-8 text-lavender mx-auto" />
                    <h4 className="font-display text-base font-bold text-paper">
                      No question papers matched your filter
                    </h4>
                    <p className="text-xs text-lavender">
                      Try resetting your semester filter or search keywords.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedSemester('all');
                        setSelectedExamType('all');
                      }}
                      className="px-4 py-1.5 rounded-xl bg-royal text-white text-xs font-semibold"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="glass-panel p-12 rounded-3xl text-center space-y-4 bg-white/75 border border-dashed border-royal/30">
                <div className="w-12 h-12 rounded-2xl bg-royal/10 text-royal flex items-center justify-center mx-auto">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-paper">
                  {currentSubject.name} Papers Coming Soon
                </h3>
                <p className="text-xs sm:text-sm text-lavender max-w-md mx-auto leading-relaxed">
                  Our 3rd-year guides are currently digitizing, verifying question codes, and compiling answer keys for this subject.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setShowUploadModal(true)}
                    className="px-4 py-2 rounded-xl bg-royal text-white text-xs font-semibold shadow-md shadow-royal/20 hover:bg-royal/90"
                  >
                    Contribute Your Papers for {currentSubject.shortCode}
                  </button>
                </div>
              </div>
            )}

            {/* Community Contribution Notice Card */}
            <div className="glass-panel p-6 rounded-3xl border border-royal/20 bg-gradient-to-r from-royal/5 via-blue-50/50 to-white shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="font-display text-base font-bold text-paper flex items-center gap-2 justify-center sm:justify-start">
                  <Upload className="w-4 h-4 text-royal" />
                  <span>Have Recent Midsem or Endsem Question Papers?</span>
                </h4>
                <p className="text-xs text-lavender max-w-xl leading-relaxed">
                  Team NCS welcomes paper contributions from all departments. Uploading helps hundreds of fellow students prepare with confidence.
                </p>
              </div>

              <button
                onClick={() => setShowUploadModal(true)}
                className="px-4 py-2 rounded-xl bg-royal hover:bg-royal/90 text-white text-xs font-bold transition-all shrink-0 active:scale-95 shadow-md shadow-royal/20"
              >
                Upload Paper Portal
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* PDF In-Page Preview Modal */}
      {previewPdfUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl h-[88vh] flex flex-col overflow-hidden border border-slate-900/10">
            {/* Modal Header */}
            <div className="p-4 sm:px-6 border-b border-slate-900/10 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-royal shrink-0" />
                <div>
                  <h3 className="font-display font-bold text-sm sm:text-base text-paper leading-tight">
                    {previewTitle}
                  </h3>
                  <span className="text-[11px] text-lavender">Official PDF Document Viewer</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={previewPdfUrl}
                  download
                  className="px-3 py-1.5 rounded-xl bg-royal text-white text-xs font-bold flex items-center gap-1.5 hover:bg-royal/90 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>

                <button
                  onClick={() => setPreviewPdfUrl(null)}
                  className="p-1.5 rounded-xl hover:bg-slate-200 text-paper transition-colors"
                  aria-label="Close Preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* PDF Viewer Frame */}
            <div className="flex-1 bg-slate-100 p-1 overflow-hidden">
              <iframe
                src={`${previewPdfUrl}#toolbar=1`}
                title={previewTitle}
                className="w-full h-full rounded-2xl border border-slate-900/10"
              />
            </div>
          </div>
        </div>
      )}

      {/* Upload Feature Preview Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 border border-slate-900/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royal/10 text-royal text-xs font-bold uppercase">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Question Paper</span>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-paper"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h3 className="font-display text-xl font-bold text-paper">
              Community Upload Portal
            </h3>

            <p className="text-xs text-lavender leading-relaxed">
              We are actively developing the direct student upload pipeline! In the upcoming update, you will be able to snap clear photos or upload PDF scans of question papers directly from your phone or PC.
            </p>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-lavender">
              <div className="font-semibold text-paper flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal" />
                <span>What can you share?</span>
              </div>
              <ul className="list-disc list-inside space-y-1 pl-1">
                <li>End-Semester regular and back examination papers</li>
                <li>Mid-Semester surprise and class tests</li>
                <li>Official solution keys and guide formula sheets</li>
              </ul>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 rounded-xl bg-royal text-white text-xs font-bold"
              >
                Understood, Got It
              </button>
            </div>
          </div>
        </div>
      )}

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
        <p>Curated by 3rd-Year Guides & Coordinators · Room ATR 303</p>
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
