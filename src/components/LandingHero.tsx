import React from 'react';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { ShieldCheck, FileSearch, ArrowRight, Lock, CheckCircle2, AlertCircle, Sparkles, Scale, HeartHandshake } from 'lucide-react';

interface LandingHeroProps {
  language: SupportedLanguage;
  onStartAudit: () => void;
  onLoadDemo: () => void;
  onNavigateToTab: (tab: string) => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  language,
  onStartAudit,
  onLoadDemo,
  onNavigateToTab,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="space-y-16 py-8">
      {/* Hero Header Section */}
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded text-xs font-semibold text-slate-800 border border-slate-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>India’s First Agentic Claim Forensic System</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          {t.tagline}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {t.subheadline}
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={onStartAudit}
            className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <span>{t.analyzeClaim}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onLoadDemo}
            className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>{t.loadDemoClaim}</span>
          </button>
        </div>

        {/* Synthetic Case Stat Preview Callout */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500 font-mono">
          <span>Active Demo: Claim BJ-1042</span>
          <span>·</span>
          <span>Bill: ₹1,84,000</span>
          <span>·</span>
          <span>Deducted: ₹52,000</span>
          <span>·</span>
          <span className="text-amber-800 font-semibold">Potentially Challengeable: ₹34,000</span>
        </div>
      </div>

      {/* 3 Core Workflow Steps */}
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
            Methodical Resolution Architecture
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            Three Steps from Mystery Deduction to Evidence-Backed Appeal
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="p-6 bg-white rounded-lg border border-slate-200 shadow-xs space-y-3">
            <div className="w-8 h-8 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-xs font-mono">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900">1. Upload Documents</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Upload your hospital itemized bill, health insurance policy schedule, and TPA settlement rejection letter. The agent extracts structured line items, exclusions, and cited reasons simultaneously.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-6 bg-white rounded-lg border border-slate-200 shadow-xs space-y-3">
            <div className="w-8 h-8 rounded bg-emerald-700 text-white flex items-center justify-center font-bold text-xs font-mono">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900">2. Cross-Check & Understand</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every deduction is mapped to the exact policy clause and IRDAI master circular standards. The engine identifies deductions that appear challengeable and computes an evidence-based recoverable estimate.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-6 bg-white rounded-lg border border-slate-200 shadow-xs space-y-3">
            <div className="w-8 h-8 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-xs font-mono">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900">3. Challenge & Track</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Generate a formal point-by-point grievance letter with zero legalistic aggression. Maintain an autonomous case timeline with automated reminder prompts and escalation paths to the Insurance Ombudsman.
            </p>
          </div>
        </div>
      </div>

      {/* Security & Regulatory Compliance Notice Card */}
      <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Lock className="w-4 h-4 text-slate-700" />
          <h3 className="text-sm font-bold text-slate-900">
            Security, Privacy & DPDP Compliance Architecture
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600">
          <div className="space-y-2">
            <div className="font-semibold text-slate-800">Demo Sandbox Safety</div>
            <p className="leading-relaxed">
              <strong>Notice:</strong> This prototype is preloaded with realistic synthetic hospital invoices and policy data. Never upload real patient medical records, personal identity cards, or sensitive health data to public environments.
            </p>
          </div>

          <div className="space-y-2">
            <div className="font-semibold text-slate-800">Production Technical Architecture</div>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              <li>AES-256 encryption at rest and TLS 1.3 in transit</li>
              <li>Strict audit trails for all document access operations</li>
              <li>Zero retention of health data without explicit cryptographic user consent</li>
              <li>Conforming to Digital Personal Data Protection (DPDP) Act standards</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Prominent Legal / Safety Disclaimer */}
      <div className="max-w-4xl mx-auto p-4 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {t.safetyDisclaimer}
        </p>
      </div>

      {/* Philosophical Closer Quote */}
      <div className="max-w-2xl mx-auto text-center py-6 border-t border-slate-200">
        <p className="text-base font-semibold text-slate-800 italic leading-relaxed">
          {t.finalQuote}
        </p>
        <span className="text-xs text-slate-400 mt-2 block font-mono">
          Bill Jaanch · Empowering Indian Patients & Families
        </span>
      </div>
    </div>
  );
};
