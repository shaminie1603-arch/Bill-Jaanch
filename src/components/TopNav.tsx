import React from 'react';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { ShieldCheck, RotateCcw, Sparkles } from 'lucide-react';

interface TopNavProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onLoadDemo: () => void;
  onReset: () => void;
  isLanding: boolean;
  onToggleLanding: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentTab,
  onTabChange,
  language,
  onLanguageChange,
  onLoadDemo,
  onReset,
  isLanding,
  onToggleLanding,
}) => {
  const t = TRANSLATIONS[language];

  const navLinks = [
    { id: 'dashboard', label: t.tabs.dashboard },
    { id: 'documents', label: t.tabs.documents },
    { id: 'billAudit', label: t.tabs.billAudit },
    { id: 'deductions', label: t.tabs.deductions },
    { id: 'findings', label: t.tabs.findings },
    { id: 'appeal', label: t.tabs.appeal },
    { id: 'timeline', label: t.tabs.timeline },
    { id: 'preAdmission', label: t.tabs.preAdmission },
    { id: 'mcpToolkit', label: t.tabs.mcpToolkit },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleLanding}
              className="flex items-center gap-2 text-left group"
              title="Toggle Overview Landing"
            >
              <div className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                Bill Jaanch
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  if (isLanding) onToggleLanding();
                  onTabChange(link.id);
                }}
                className={`whitespace-nowrap transition-colors relative py-1 ${
                  !isLanding && currentTab === link.id
                    ? 'text-slate-900 font-semibold'
                    : 'hover:text-slate-900'
                }`}
              >
                {link.label}
                {!isLanding && currentTab === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Zone 3: Primary Actions & Utilities */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center text-xs font-medium bg-slate-100 rounded p-0.5 border border-slate-200">
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-1 rounded transition-colors ${
                  language === 'en' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="English"
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange('hi')}
                className={`px-2 py-1 rounded transition-colors ${
                  language === 'hi' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Hindi"
              >
                हिन्दी
              </button>
              <button
                onClick={() => onLanguageChange('ta')}
                className={`px-2 py-1 rounded transition-colors ${
                  language === 'ta' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Tamil"
              >
                தமிழ்
              </button>
            </div>

            {/* Load Demo Claim Button */}
            <button
              onClick={onLoadDemo}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-300 rounded hover:bg-emerald-100 transition-colors whitespace-nowrap"
              title="Populate complete synthetic case"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Load Demo Claim</span>
            </button>

            {/* Reset Button */}
            <button
              onClick={onReset}
              className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
              title="Reset state"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto py-2 border-t border-slate-100 text-xs no-scrollbar">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                if (isLanding) onToggleLanding();
                onTabChange(link.id);
              }}
              className={`px-2.5 py-1 rounded whitespace-nowrap transition-colors ${
                !isLanding && currentTab === link.id
                  ? 'bg-slate-900 text-white font-medium'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
