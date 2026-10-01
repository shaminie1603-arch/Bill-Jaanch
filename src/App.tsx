/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ClaimData, ClaimDeduction, SupportedLanguage } from './types';
import { INITIAL_DEMO_CLAIM, DEMO_TIMELINE } from './data/demoClaim';
import { TRANSLATIONS } from './utils/translations';
import { TopNav } from './components/TopNav';
import { ClaimSummaryCards } from './components/ClaimSummaryCards';
import { CaseStatusBar } from './components/CaseStatusBar';
import { DocumentManager } from './components/DocumentManager';
import { BillAuditTable } from './components/BillAuditTable';
import { DeductionClauseMap } from './components/DeductionClauseMap';
import { EvidenceModal } from './components/EvidenceModal';
import { FindingsPage } from './components/FindingsPage';
import { AppealGenerator } from './components/AppealGenerator';
import { TimelineSection } from './components/TimelineSection';
import { PreAdmissionPlanner } from './components/PreAdmissionPlanner';
import { MCPToolkitInspector } from './components/MCPToolkitInspector';
import { LandingHero } from './components/LandingHero';
import { AlertCircle, ShieldAlert, Sparkles, Check, ArrowRight } from 'lucide-react';

export default function App() {
  const [claim, setClaim] = useState<ClaimData>(INITIAL_DEMO_CLAIM);
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [isLanding, setIsLanding] = useState<boolean>(false);
  const [evidenceModalDeduction, setEvidenceModalDeduction] = useState<ClaimDeduction | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const t = TRANSLATIONS[language];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Simulation Handlers
  const handleSimulate7Days = () => {
    setClaim((prev) => {
      const updatedTimeline = prev.timeline.map((evt) => {
        if (evt.id === 'TL-06') return { ...evt, status: 'completed' as const };
        if (evt.id === 'TL-07') return { ...evt, status: 'action_required' as const };
        return evt;
      });
      return {
        ...prev,
        status: 'REMINDER_DUE',
        timeline: updatedTimeline,
        reminderSentCount: prev.reminderSentCount + 1,
      };
    });
    showToast('Simulated 7 days: Day 8 reached. Star Health TPA reminder is now due.');
  };

  const handleSimulate14Days = () => {
    setClaim((prev) => {
      const updatedTimeline = prev.timeline.map((evt) => {
        if (evt.id === 'TL-06' || evt.id === 'TL-07') return { ...evt, status: 'completed' as const };
        if (evt.id === 'TL-08') return { ...evt, status: 'action_required' as const };
        return evt;
      });
      return {
        ...prev,
        status: 'ESCALATION_REVIEW',
        timeline: updatedTimeline,
      };
    });
    showToast('Simulated 14 days: 15-day statutory limit reached. Escalation to GRO active.');
  };

  const handleResetSimulation = () => {
    setClaim({
      ...INITIAL_DEMO_CLAIM,
      timeline: DEMO_TIMELINE,
      status: 'APPEAL_READY',
    });
    showToast('Case reset to baseline state.');
  };

  const handleLoadDemo = () => {
    setClaim({
      ...INITIAL_DEMO_CLAIM,
      timeline: DEMO_TIMELINE,
      status: 'APPEAL_READY',
    });
    setIsLanding(false);
    setCurrentTab('dashboard');
    showToast('Loaded Apollo & Star Health synthetic demo claim (BJ-1042).');
  };

  const handleApproveAndSend = () => {
    setClaim((prev) => {
      const updatedTimeline = prev.timeline.map((evt) => {
        if (evt.id === 'TL-05') return { ...evt, status: 'completed' as const };
        if (evt.id === 'TL-06') return { ...evt, status: 'current' as const };
        return evt;
      });
      return {
        ...prev,
        status: 'WAITING_FOR_INSURER',
        appealApprovedByUser: true,
        timeline: updatedTimeline,
      };
    });
    showToast('Appeal approved and dispatched to TPA. Statutory clock initiated.');
  };

  const handleSendReminder = () => {
    showToast('Reminder formally dispatched to Insurer Grievance Desk.');
  };

  const handleSendEscalation = () => {
    showToast('Grievance dossier prepared for IRDAI Bima Bharosa & Insurance Ombudsman.');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top Navigation */}
      <TopNav
        currentTab={currentTab}
        onTabChange={(tab) => {
          setIsLanding(false);
          setCurrentTab(tab);
        }}
        language={language}
        onLanguageChange={setLanguage}
        onLoadDemo={handleLoadDemo}
        onReset={handleResetSimulation}
        isLanding={isLanding}
        onToggleLanding={() => setIsLanding(!isLanding)}
      />

      {/* Safety & Demo Mode Banner */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-semibold text-white">Bill Jaanch Active Demo:</span>
            <span>Synthetic Case #BJ-1042 · Apollo Hospitals / Star Health · No real patient data.</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span>Decision Support Only</span>
            <span>·</span>
            <button
              onClick={() => setIsLanding(!isLanding)}
              className="text-emerald-400 hover:underline font-medium"
            >
              {isLanding ? 'View Active Claim Dashboard →' : 'View Product Vision & Architecture →'}
            </button>
          </div>
        </div>
      </div>

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-lg shadow-xl border border-slate-700 flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {isLanding ? (
          <LandingHero
            language={language}
            onStartAudit={() => {
              setIsLanding(false);
              setCurrentTab('documents');
            }}
            onLoadDemo={handleLoadDemo}
            onNavigateToTab={(tab) => {
              setIsLanding(false);
              setCurrentTab(tab);
            }}
          />
        ) : (
          <div className="space-y-6">
            {/* Dashboard View */}
            {currentTab === 'dashboard' && (
              <div className="space-y-6">
                <ClaimSummaryCards
                  claim={claim}
                  language={language}
                  onNavigateToAudit={() => setCurrentTab('billAudit')}
                  onNavigateToDeductions={() => setCurrentTab('deductions')}
                />

                <CaseStatusBar
                  status={claim.status}
                  onAdvanceTimeline={handleSimulate7Days}
                  onNavigateTab={setCurrentTab}
                />

                {/* Quick Shortcuts to Deep Dive Modules */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div
                    onClick={() => setCurrentTab('billAudit')}
                    className="p-4 bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-all cursor-pointer shadow-xs group"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-semibold text-slate-500">Forensic Audit</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 transition-colors" />
                    </div>
                    <div className="font-bold text-sm text-slate-900">Hospital Bill Audit (28 Items)</div>
                    <p className="text-xs text-slate-600 mt-1">
                      Inspect 3 billing patterns flagged for clarification: surgical gloves reference benchmark, duplicate sensor lead, and unbundled PAC fee.
                    </p>
                  </div>

                  <div
                    onClick={() => setCurrentTab('deductions')}
                    className="p-4 bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-all cursor-pointer shadow-xs group"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-semibold text-slate-500">Cross-Check Engine</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 transition-colors" />
                    </div>
                    <div className="font-bold text-sm text-slate-900">Clause-to-Deduction Map</div>
                    <p className="text-xs text-slate-600 mt-1">
                      Side-by-side mapping of ₹52,000 deductions against Star Health Policy Clauses 4.2, 6.1, 8.3 and IRDAI standards.
                    </p>
                  </div>

                  <div
                    onClick={() => setCurrentTab('appeal')}
                    className="p-4 bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-all cursor-pointer shadow-xs group"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-semibold text-emerald-700">Appeal Drafting</span>
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-600 group-hover:text-emerald-800 transition-colors" />
                    </div>
                    <div className="font-bold text-sm text-slate-900">Review Appeal Letter</div>
                    <p className="text-xs text-slate-600 mt-1">
                      Formal, professional point-by-point rebuttal ready for patient approval and dispatch to the TPA Grievance Desk.
                    </p>
                  </div>
                </div>

                {/* Final Quote Footer from Section 29 */}
                <div className="text-center py-6 border-t border-slate-200">
                  <p className="text-sm font-semibold text-slate-700 italic">
                    {t.finalQuote}
                  </p>
                </div>
              </div>
            )}

            {/* Documents View */}
            {currentTab === 'documents' && (
              <DocumentManager
                claim={claim}
                onRefreshExtraction={() => showToast('Re-extracted structured data from synthetic documents.')}
              />
            )}

            {/* Bill Audit View */}
            {currentTab === 'billAudit' && (
              <BillAuditTable
                claim={claim}
                onOpenFinding={(findingId) => setCurrentTab('findings')}
              />
            )}

            {/* Deductions & Clause Map View */}
            {currentTab === 'deductions' && (
              <DeductionClauseMap
                claim={claim}
                onOpenEvidenceModal={(ded) => setEvidenceModalDeduction(ded)}
              />
            )}

            {/* Findings View */}
            {currentTab === 'findings' && (
              <FindingsPage
                claim={claim}
                onNavigateToAppeal={() => setCurrentTab('appeal')}
              />
            )}

            {/* Appeal Generator View */}
            {currentTab === 'appeal' && (
              <AppealGenerator
                claim={claim}
                onUpdateAppealLetter={(newText) => {
                  setClaim((prev) => ({ ...prev, appealLetterText: newText }));
                  showToast('Appeal draft updated.');
                }}
                onApproveAndSend={handleApproveAndSend}
              />
            )}

            {/* Timeline View */}
            {currentTab === 'timeline' && (
              <TimelineSection
                claim={claim}
                onSimulate7Days={handleSimulate7Days}
                onSimulate14Days={handleSimulate14Days}
                onResetSimulation={handleResetSimulation}
                onSendReminder={handleSendReminder}
                onSendEscalation={handleSendEscalation}
              />
            )}

            {/* Pre-Admission Mode View */}
            {currentTab === 'preAdmission' && <PreAdmissionPlanner />}

            {/* MCP Toolkit Inspector View */}
            {currentTab === 'mcpToolkit' && <MCPToolkitInspector />}
          </div>
        )}
      </main>

      {/* Side-by-Side Evidence Inspection Modal */}
      {evidenceModalDeduction && (
        <EvidenceModal
          deduction={evidenceModalDeduction}
          claim={claim}
          onClose={() => setEvidenceModalDeduction(null)}
        />
      )}

      {/* Global Safety Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Bill Jaanch © 2026 · AI Insurance Claim Auditing & Decision Support System
          </span>
          <span className="text-slate-400">
            For Hackathon Demo · Synthetic Data Only · Not Medical, Legal, or Financial Advice
          </span>
        </div>
      </footer>
    </div>
  );
}
